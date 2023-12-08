import { AnimatedTitle, RedoAnimText } from "@/components/animated-title";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default function Example() {
  const waitlist = async (formData: FormData) => {
    "use server";
    console.log("waitlist");
    const email = formData.get("email") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.from("waitlist").insert({ email });
    console.log(error);
  };

  return (
    <div>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <AnimatedTitle />
          <RedoAnimText />
          <p className="mt-6 text-lg leading-8 text-gray-300">Powered by GPT</p>
          <form className="animate-in" action={waitlist}>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Input type="email" name="email" placeholder="Enter your email" />
              <Button variant="default" type="submit">
                Signup for early access
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
