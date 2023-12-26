import Link from "next/link";
import { getSurveys } from "../actions";
import { nanoid } from "@/lib/utils";

const loadSurveys = async () => {
  const surveys = await getSurveys();
  return surveys;
};

export default async function ChatLayout() {
  const surveys = await loadSurveys();
  const id = nanoid();
  return (
    <>
      <Link href={`/app/${id}?mode=create`}>Create new Survey</Link>
      <p>Your surveys</p>
      <ul>
        {surveys.map((s) => {
          return (
            <Link key={s.id} href={`/app/${s.id}?mode=edit`}>
              {s.name}
            </Link>
          );
        })}
      </ul>
    </>
  );
}
