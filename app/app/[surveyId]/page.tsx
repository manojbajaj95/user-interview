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
import { Button } from "@/components/ui/button";
import { addSurvey, getSurvey } from "@/app/actions";
import { type Survey } from "@/lib/types";
import { redirect } from "next/navigation";

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
    const system = formData.get("system") as string;
    const opener = formData.get("opener") as string;

    const survey = {
      id: surveyId,
      name: name,
      description: description,
      systemPrompt: system,
      opener: opener,
    } as Survey;
    await addSurvey(survey);
    redirect("/app");
  };

  const survey: Survey | null = await getSurvey(surveyId);
  return (
    <Card className="w-full mx-auto p-6 shadow-lg rounded-xl h-screen">
      <form action={createSurvey}>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            {mode == "edit" ? "Update" : "Create"} Survey
          </CardTitle>
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
              <Label htmlFor="system-prompt">System Prompt</Label>
              <Textarea
                id="system-prompt"
                placeholder="Enter system prompt"
                name="system"
                defaultValue={survey ? survey.systemPrompt : undefined}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="opener">Opener</Label>
              <Textarea
                id="opener"
                placeholder="Enter opener"
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
    return <div>Click on chat in sidebar to review it</div>;
  }
  return (
    <>
      <SurveyForm mode={mode} surveyId={params.surveyId} />
    </>
  );
}
