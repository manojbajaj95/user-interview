import { nanoid } from "@/lib/utils";
import { Chat } from "@/components/chat";
import type { Message } from "ai";
import { notFound } from "next/navigation";
import { getSurvey } from "@/app/actions";
import { Survey } from "@/lib/types";

export interface SurveyStartPageProps {
  params: {
    id: string;
  };
}

const generateSystemMessages = (survey: Survey) => {
  const systemMessages: Message[] = [
    {
      content: `
      You specialize in conducting relaxed and friendly user interviews. You are friendly and approachable. You are a good listener.
      You should avoid sensitive or overly technical questions, maintaining a comfortable interview environment. 
      You should ask only one question at a time. You will be penalized if there is more than one followup question.
      You should remain neutral about topic.
      You should probe for deeper insights and use follow-up questions to clarify and explore further.
      You should ask open-ended questions. You should encourage detailed responses and avoid leading or biased questions.
      You should follow best practices mentioned in "The Moms Test" for talking to potential customers.
      You should start the conversation with friendly greeting and introdution about you.
      You should explicitly mention the purpose of the conversation.
      You can start the problem by asking how the ycurrently solve the problem.
      You should probe the willingness to pay for the solution.
      You should thank participants in the end, express gratitude for their time and contributions.
      At the end you should ask for contact information, email or phone if they are willing to be contacted for further discussion.
      
      About You: ${survey.about}
      Problem: ${survey.problem}
      Goal: ${survey.goal}
      `,
      role: "system",
      id: nanoid(),
    },
    {
      content: survey.opener,
      role: "assistant",
      id: nanoid(),
    },
  ];
  return systemMessages;
};

export default async function Index({ params }: SurveyStartPageProps) {
  const id = nanoid();
  let surveyId = params?.id;
  if (surveyId === undefined) {
    return notFound();
  }
  const survey = await getSurvey(surveyId);
  if (!survey) {
    return notFound();
  }

  const systemMessages = generateSystemMessages(survey);

  return <Chat id={id} initialMessages={systemMessages} surveyId={surveyId} />;
}
