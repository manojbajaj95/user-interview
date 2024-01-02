import Link from "next/link";
import { getSurveys } from "../actions";
import { nanoid } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

export default async function ChatLayout() {
  const surveys = await getSurveys();
  console.log(surveys);
  const id = nanoid();
  return (
    <div className="container max-w-2xl p-2">
      <Typography variant="h2" as="div" className="flex">
        <div className="grow">Your surveys</div>
        <Link
          className={buttonVariants({ variant: "default" })}
          href={`/app/${id}?mode=create`}
        >
          + Create New Survey
        </Link>
      </Typography>
      <ul>
        {surveys.map((s) => {
          return (
            <Link key={s.id} href={`/app/${s.id}?mode=edit`}>
              {s.name}
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
