import { type Message } from 'ai'

export interface Chat extends Record<string, any> {
  id: string
  surveyId: string
  title: string
  createdAt: Date
  messages: Message[]
}

export type Survey = {
  id: string
  name: string
  description: string
  systemPrompt: string
  opener: string
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
    error: string
  }
>
