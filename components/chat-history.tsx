import * as React from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { SidebarList } from "@/components/sidebar-list";
import { buttonVariants } from "@/components/ui/button";
import { IconPlus } from "@/components/ui/icons";

export async function ChatHistory({ surveyId }: { surveyId: string }) {
  return (
    <div className="flex flex-col h-full">
      <SidebarList surveyId={surveyId} />
    </div>
  );
}
