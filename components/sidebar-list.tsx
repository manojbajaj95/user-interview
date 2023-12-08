import { clearChats, getChats } from "@/app/actions";
import { ClearHistory } from "@/components/clear-history";
import { SidebarItems } from "@/components/sidebar-items";
import { ThemeToggle } from "@/components/theme-toggle";
import { cache } from "react";

interface SidebarListProps {
  surveyId: string;
  children?: React.ReactNode;
}

const loadChats = cache(async (surveyId: string) => {
  return await getChats({ surveyId });
});

export async function SidebarList({ surveyId }: SidebarListProps) {
  const chats = await loadChats(surveyId);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">
        {chats?.length ? (
          <div className="space-y-2 px-2">
            <SidebarItems chats={chats} />
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">No chat history</p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between p-4">
        <ThemeToggle />
        {/* <ClearHistory
          clearChats={() => clearChats({ surveyId })}
          isEnabled={chats?.length > 0}
        /> */}
      </div>
    </div>
  );
}
