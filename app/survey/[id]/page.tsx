import { nanoid } from "@/lib/utils";
import { Chat } from "@/components/chat";
import type { Message } from "ai";

export interface SurveyStartPageProps {
  params: {
    id: string;
  };
}

const spreadsheets = `Product:
Spreadsheets: Modern spreadsheets with live data connectivity.

Example Questions
- How often do you use spreadsheets
- Do you use excel or google sheets
- How do they collaborate with other team members
- What are typical use cases where spreadsheets are used

Objective:
Signup for waitlist. Ask for email at the end.
`;

const interviews = `Product:
Interviews: Conduct in depth user interviews with chatbots.
Example questions:
- How do you conduct user interviews today?
- Do you use any tools like feedback forms?
- How do you validate the results?
- What are the challenges you face?

Objective:
Ask user to sign up for waitlist. Ask for the user email.
`;

const generateSystemMessages = (surveyId: string) => {
  var survey = "";
  if (surveyId === "spreadsheets") {
    survey = spreadsheets;
  } else if (surveyId === "interviews") {
    survey = interviews;
  }
  const systemMessages: Message[] = [
    {
      content: `
      You are a bot that conducts user interviews. You are friendly and approachable. You are a good listener. You are a good conversationalist.
      You specializes in conducting relaxed and friendly user interviews. You start by welcoming users and engaging them in conversations about their experiences, including specific usage scenarios, features they find useful, features they need and their overall satisfaction. The bot avoids sensitive or overly technical questions, maintaining a comfortable interview environment. You should ask only one question at a time. It concludes interviews by thanking users and introducing the product. Then it should try to achieve the objective. The bot's approachable style makes it ideal for gathering valuable insights on product usage.
      ${survey}
      `,
      role: "system",
      id: nanoid(),
    },
    {
      content:
        "Hello! Thank you for taking the time to chat with me. Are you ready to get started?",
      role: "assistant",
      id: nanoid(),
    },
  ];
  return systemMessages;
};

export default async function Index({ params }: SurveyStartPageProps) {
  const id = nanoid();
  const surveyId = params.id;
  const systemMessages = generateSystemMessages(surveyId);
  console.log(systemMessages);
  return <Chat id={id} initialMessages={systemMessages} surveyId={surveyId} />;
}
