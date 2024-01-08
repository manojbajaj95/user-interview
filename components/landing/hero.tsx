import { cookies } from "next/headers";
import { AnimatedTitle, RedoAnimText } from "../animated-title";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { createClient } from "@/utils/supabase/server";
import { Typography } from "../ui/typography";

export default function Hero() {
  return (
    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div className="text-center">
        <AnimatedTitle />
        <RedoAnimText />
        <br />
        <Typography variant="h2">
          Gather deeper insights from conversations
        </Typography>
        <Typography variant="p">
          Platform to conduct better user interviews, moderated by an AI but
          feels like human. Now you can conduct user interviews at scale.
        </Typography>
        <WaitlistForm />
      </div>
    </div>
  );
}
function WaitlistForm() {
  const waitlist = async (formData: FormData) => {
    "use server";
    console.log("waitlist");
    const email = formData.get("email") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.from("waitlist").insert({ email });
  };
  return (
    <form className="animate-in" action={waitlist}>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Input type="email" name="email" placeholder="Enter your email" />
        <Button variant="default" type="submit">
          Signup for early access
        </Button>
      </div>
    </form>
  );
}
