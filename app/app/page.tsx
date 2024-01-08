import Link from "next/link";
import { getSurveys } from "../actions";
import { nanoid } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Survey } from "@/lib/types";

const NewSurveyButton = () => {
  const id = nanoid();
  return (
    <Link
      className={buttonVariants({ variant: "default" })}
      href={`/app/${id}?mode=create`}
    >
      + Create New Survey
    </Link>
  );
};

const SurveyCard = ({ survey }: { survey: Survey }) => {
  return (
    <Card className="m-2">
      <CardHeader>
        <CardTitle>{survey.name || survey.id}</CardTitle>
        <CardDescription>{survey.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Total Responses: 15</p>
      </CardContent>
      <CardFooter className="space-x-1">
        <Link
          href={`/app/${survey.id}?mode=edit`}
          className={buttonVariants({ variant: "secondary" })}
        >
          Edit
        </Link>
        <Link
          href={`/app/${survey.id}`}
          className={buttonVariants({ variant: "default" })}
        >
          View Responses
        </Link>
      </CardFooter>
    </Card>
  );
};

export default async function ChatLayout() {
  const surveys = await getSurveys();

  return (
    <div className="container p-2">
      <Typography variant="h2" as="div" className="flex">
        <div className="grow">Your surveys</div>
        <NewSurveyButton />
      </Typography>
      {surveys.length ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {surveys.map((s) => {
            return <SurveyCard survey={s} key={s.id} />;
          })}
        </div>
      ) : (
        <div className="flex h-screen">
          <div className="m-auto">
            <div>No Surveys found</div>
            <NewSurveyButton />
          </div>
        </div>
      )}
    </div>
  );
}
