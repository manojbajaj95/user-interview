import { Chat } from "@/components/chat";
import { notFound } from "next/navigation";
import { getChat } from "@/app/actions";

export default async function Index({ params }: any) {
  const id = params?.id;

  const chat = await getChat(id);
  if (!chat) {
    return notFound();
  }

  return <Chat id={id} initialMessages={chat.messages} readonly />;
}
