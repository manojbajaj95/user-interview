import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
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
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <main className="flex items-center justify-center h-screen ">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome Back!</CardTitle>
          <CardDescription className="text-center">
            Please enter your credentials to login.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="group" htmlFor="email">
              Email Address
            </Label>
            <Input
              className="transition-all group-hover:underline"
              id="email"
              placeholder="yourname@example.com"
              required
              type="email"
            />
          </div>
          <div className="space-y-2">
            <Label className="group" htmlFor="password">
              Password
            </Label>
            <Input
              className="transition-all group-hover:underline"
              id="password"
              required
              type="password"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Link className="text-sm text-blue-600 hover:underline" href="#">
            Forgot password?
          </Link>
          <Button className="w-32">Login</Button>
        </CardFooter>
      </Card>
    </main>
    // <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">

    //   <Link
    //     href="/"
    //     className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
    //   >
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="24"
    //       height="24"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       stroke="currentColor"
    //       strokeWidth="2"
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //       className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
    //     >
    //       <polyline points="15 18 9 12 15 6" />
    //     </svg>{" "}
    //     Back
    //   </Link>

    //   <form
    //     className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
    //     action={signIn}
    //   >
    //     <label className="text-md" htmlFor="email">
    //       Email
    //     </label>
    //     <input
    //       className="rounded-md px-4 py-2 bg-inherit border mb-6"
    //       name="email"
    //       placeholder="you@example.com"
    //       required
    //     />
    //     <label className="text-md" htmlFor="password">
    //       Password
    //     </label>
    //     <input
    //       className="rounded-md px-4 py-2 bg-inherit border mb-6"
    //       type="password"
    //       name="password"
    //       placeholder="••••••••"
    //       required
    //     />
    //     <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
    //       Sign In
    //     </button>
    //     <button
    //       formAction={signUp}
    //       className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
    //     >
    //       Sign Up
    //     </button>
    //     {searchParams?.message && (
    //       <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
    //         {searchParams.message}
    //       </p>
    //     )}
    //   </form>
    // </div>
  );
}
