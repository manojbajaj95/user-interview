import { SidebarDesktop } from "@/components/sidebar-desktop";

interface ChatLayoutProps {
  children: React.ReactNode;
  params: {
    surveyId: string;
  };
}

export default async function ChatLayout({
  children,
  params,
}: ChatLayoutProps) {
  let surveyId = params?.surveyId;
  return (
    <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
      {/* @ts-ignore */}
      <SidebarDesktop surveyId={surveyId} />
      <div className="group w-full overflow-auto pl-0 animate-in duration-300 ease-in-out peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
        {children}
      </div>
    </div>
  );
}
