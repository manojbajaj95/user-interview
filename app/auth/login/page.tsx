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
      var message = "Error in sign In";
      if (error?.status == 400) {
        message = "Invalid Credentials. Please try again";
      }
      console.log(error);
      return redirect(`/auth/login?message=${message}`);
    }

    return redirect("/app");
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
  const message = searchParams.message;
  return (
    <main className="flex items-center justify-center h-screen ">
      <Card className="w-full max-w-md mx-4">
        <form action={signIn}>
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Welcome Back!
            </CardTitle>
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
                name="email"
              />
            </div>
            <div className="space-y-2">
              <Label className="group" htmlFor="password">
                Password
              </Label>
              <Input
                className="transition-all group-hover:underline"
                id="password"
                name="password"
                required
                type="password"
              />
            </div>
          </CardContent>
          {message && <p>{message}</p>}
          <CardFooter className="flex justify-between items-center">
            <Link className="text-sm text-blue-600 hover:underline" href="#">
              Forgot password?
            </Link>
            <Button className="w-32" type="submit">
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
