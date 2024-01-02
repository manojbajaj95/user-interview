'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { kv } from '@vercel/kv'

import { Survey, type Chat } from '@/lib/types'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function getSurveys() {
  const supabase = createClient(cookies())
  await supabase.auth.getSession()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const userId = user?.id
  try {
    const pipeline = kv.pipeline()
    const surveys: string[] = await kv.zrange(`user:surveys:${userId}`, 0, -1)
    for (const survey of surveys) {
      pipeline.hgetall(survey)
    }
    const results = await pipeline.exec()
    return results as Survey[]
  } catch (error) {
    return []
  }

}


export async function addSurvey(survey: Survey) {
  const supabase = createClient(cookies())
  await supabase.auth.getSession()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const userId = user?.id
  const createdAt = Date.now()
  await kv.hset(`user:surveys:${survey.id}`, survey)
  await kv.zadd(`user:surveys:${userId}`, {
    score: createdAt,
    member: `user:surveys:${survey.id}`
  })
  revalidatePath('/app')
  revalidatePath(`/app/${survey.id}`)
}

export async function getSurvey(surveyId: string) {

  const survey = await kv.hgetall<Survey>(`user:surveys:${surveyId}`)
  if (!survey) {
    return null
  }
  return survey
}

export async function getChats(surveyId: string) {

  try {
    const pipeline = kv.pipeline()
    const chats: string[] = await kv.zrange(`user:chat:${surveyId}`, 0, -1, {
      rev: true
    })

    for (const chat of chats) {
      pipeline.hgetall(chat)
    }

    const results = await pipeline.exec()

    return results as Chat[]
  } catch (error) {
    return []
  }
}

export async function getChat(id: string) {
  const chat = await kv.hgetall<Chat>(`chat:${id}`)
  if (!chat) {
    return null
  }

  return chat
}

export async function removeChat({ id, path }: { id: string; path: string }) {

  await kv.del(`chat:${id}`)
  await kv.zrem(`user:chat`, `chat:${id}`)

  revalidatePath('/')
  return revalidatePath(path)
}

export async function clearChats({ surveyId }: { surveyId: string }) {
  const chats: string[] = await kv.zrange(`user:chat:${surveyId}`, 0, -1)
  if (!chats.length) {
    return redirect('/')
  }
  const pipeline = kv.pipeline()

  for (const chat of chats) {
    pipeline.del(chat)
    pipeline.zrem(`user:chat`, chat)
  }

  await pipeline.exec()

  revalidatePath('/')
  return redirect('/')
}
