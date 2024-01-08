import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button, buttonVariants } from "@/components/ui/button";
import { addSurvey, getSurvey } from "@/app/actions";
import { type Survey } from "@/lib/types";
import { redirect } from "next/navigation";
import Link from "next/link";
import { RWebShare } from "react-web-share";
import { ShareButton } from "@/components/web-share";
import { Typography } from "@/components/ui/typography";
import { createAbsoluteUrl } from "@/lib/utils";

type mode = "view" | "create" | "edit";

async function SurveyForm({
  mode,
  surveyId,
}: {
  mode: mode;
  surveyId: string;
}) {
  const createSurvey = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const problem = formData.get("problem") as string;
    const opener = formData.get("opener") as string;
    const goal = formData.get("goal") as string;
    const about = formData.get("about") as string;

    const survey = {
      id: surveyId,
      name,
      description,
      opener,
      problem,
      goal,
      about,
    } as Survey;
    await addSurvey(survey);
    redirect("/app");
  };

  const survey: Survey | null = await getSurvey(surveyId);
  return (
    <Card className="w-full mx-auto p-6 shadow-lg rounded-xl min-h-screen">
      <form action={createSurvey}>
        <CardHeader>
          <div className="flex">
            <CardTitle className="text-2xl font-semibold grow">
              {mode == "edit" ? "Update" : "Create"} Survey
            </CardTitle>

            <Link
              className={buttonVariants({ variant: "default" })}
              href={createAbsoluteUrl(`/survey/${surveyId}`)}
            >
              Try Survey
            </Link>
            <ShareButton surveyId={surveyId} />
          </div>

          <CardDescription className="text-gray-500">
            Enter the necessary details below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter name"
                name="name"
                defaultValue={survey ? survey.name : undefined}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter description"
                name="description"
                defaultValue={survey ? survey.description : undefined}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="problem">Problem Statement</Label>
              <Textarea
                id="problem"
                placeholder="Enter the problem statement"
                name="problem"
                defaultValue={survey ? survey.problem : undefined}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="goal">Goal of conversation</Label>
              <Textarea
                id="goal"
                placeholder="Enter the problem statement"
                name="goal"
                defaultValue={survey ? survey.goal : undefined}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="about">About You</Label>
              <Textarea
                id="about"
                placeholder="Enter a brief description about you. It helps buiding rapport and gather trust."
                name="about"
                defaultValue={survey ? survey.about : undefined}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="opener">Opener</Label>
              <Textarea
                id="opener"
                placeholder="Enter an opening for your customer interview"
                name="opener"
                defaultValue={survey ? survey.opener : undefined}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          <Button variant="outline">Cancel</Button>
          <Button variant="default">
            {mode == "edit" ? "Update" : "Create"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default async function Survey({
  params,
  searchParams,
}: {
  params: { surveyId: string };
  searchParams: { mode: mode };
}) {
  const mode = searchParams.mode;
  // Show created surveys here
  if (!mode) {
    return (
      <div className="flex h-screen">
        <div className="m-auto">
          <Typography variant="h3" className="align-center m-2">
            View survey responses by clicking on sidebar
          </Typography>
        </div>
      </div>
    );
  }
  return (
    <>
      <p>{}</p>
      <SurveyForm mode={mode} surveyId={params.surveyId} />
    </>
  );
}
