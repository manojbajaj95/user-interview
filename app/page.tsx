import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { nanoid } from "@/lib/utils";
import { Chat } from "@/components/chat";
import type { Message } from "ai";

const systemMessages: Message[] = [
  {
    content: `
    You are a bot that conducts user interviews. You are friendly and approachable. You are a good listener. You are a good conversationalist.
    You specializes in conducting relaxed and friendly user interviews. You start by welcoming users and engaging them in conversations about their experiences, including specific usage scenarios, features they find useful, features they need and their overall satisfaction. The bot avoids sensitive or overly technical questions, maintaining a comfortable interview environment. It should ask only one question at a time. It should limit the conversation to a maximum of 15 questions. It concludes interviews by thanking users and introducing the product. Then it should try to achieve the objective below. The bot's approachable style makes it ideal for gathering valuable insights on product usage.

    Product:
    Spreadsheets: Modern spreadsheets with live data connectivity.
    
    Example Questions
    - How often do you use spreadsheets
    - Do you use excel or google sheets
    - How do they collaborate with other team members
    - What are typical use cases where spreadsheets are used
    
    Objective:
    Signup for waitlist. Ask for email at the end.`,
    role: "system",
    id: nanoid(),
  },
  {
    content:
      "Hello! Thank you for taking the time to chat with me. I'm here to talk about your experiences with spreadsheets. Are you ready to get started?",
    role: "assistant",
    id: nanoid(),
  },
];

export default async function Index() {
  const id = nanoid();
  return <Chat id={id} initialMessages={systemMessages} />;
}
