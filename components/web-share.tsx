"use client";

import { createAbsoluteUrl } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { RWebShare } from "react-web-share";

export function ShareButton({ surveyId }: { surveyId: string }) {
  return (
    <RWebShare
      data={{
        text: "Share survey with prospective customers",
        url: createAbsoluteUrl(`/survey/${surveyId}`),
        title: "Share Survey",
      }}
      onClick={(e) => e.preventDefault()}
    >
      <Button variant="secondary" type="button">
        Share 🔗
      </Button>
    </RWebShare>
  );
}
