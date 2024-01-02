"use client";

import { useChat, type Message } from "ai/react";

import { cn } from "@/lib/utils";
import { ChatList } from "@/components/chat-list";
import { ChatPanel } from "@/components/chat-panel";
import { ChatScrollAnchor } from "@/components/chat-scroll-anchor";
// import { useLocalStorage } from "@/lib/hooks/use-local-storage";

import { toast } from "react-hot-toast";

export interface ChatProps extends React.ComponentProps<"div"> {
  id?: string;
  surveyId?: string;
  initialMessages?: Message[];
  readonly?: boolean;
}

export function Chat({
  id,
  surveyId,
  initialMessages,
  readonly,
  className,
}: ChatProps) {
  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      api: `/api/chat/${surveyId}`,
      initialMessages,
      id,
      body: {
        id,
      },
      onResponse(response) {
        if (response.status === 401) {
          toast.error(response.statusText);
        }
      },
      onFinish() {
        // if (!path.includes("chat")) {
        //   router.push(`/chat/${id}`, { shallow: true, scroll: false });
        //   router.refresh();
        // }
      },
    });
  return (
    <>
      <div className={cn("pb-[200px] pt-4 md:pt-10", className)}>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          <></>
        )}
      </div>
      {readonly ? (
        <></>
      ) : (
        <ChatPanel
          id={id}
          isLoading={isLoading}
          stop={stop}
          append={append}
          reload={reload}
          messages={messages}
          input={input}
          setInput={setInput}
        />
      )}
    </>
  );
}
