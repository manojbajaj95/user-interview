'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { kv } from '@vercel/kv'

import { type Chat } from '@/lib/types'

export async function getChats({ surveyId }: { surveyId: string }) {

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

export async function getSharedChat(id: string) {
  const chat = await kv.hgetall<Chat>(`chat:${id}`)

  if (!chat || !chat.sharePath) {
    return null
  }

  return chat
}

export async function shareChat(id: string) {


  const chat = await kv.hgetall<Chat>(`chat:${id}`)

  if (!chat) {
    return {
      error: 'Something went wrong'
    }
  }

  const payload = {
    ...chat,
    sharePath: `/share/${chat.id}`
  }

  await kv.hmset(`chat:${chat.id}`, payload)

  return payload
}
