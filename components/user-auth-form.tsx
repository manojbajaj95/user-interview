"use client";

import { cn, createAbsoluteUrl } from "@/lib/utils";
import React, { useState } from "react";
import { Label } from "@/ui/label";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { createClient } from "@/utils/supabase/client";
import { Typography } from "@/components/ui/typography";
import { IconGoogle } from "./ui/icons";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  async function handleSignInWithGoogle(response: any) {
    const supabase = createClient();
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: createAbsoluteUrl("/auth/callback"),
      },
    });
  }

  async function signInWithEmail(e) {
    e.preventDefault();
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        // set this to false if you do not want the user to be automatically signed up
        shouldCreateUser: true,
        emailRedirectTo: createAbsoluteUrl("/auth/callback"),
      },
    });
    setSubmitted(true);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={signInWithEmail}>
        <div className="grid gap-2">
          {submitted ? (
            <Typography variant="p">
              We have sent a link to your email. Please check your email to
              continue signup.
            </Typography>
          ) : (
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button>Sign In with Email</Button>
            </div>
          )}
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button variant="outline" type="button" onClick={handleSignInWithGoogle}>
        <IconGoogle /> Sign In with Google
      </Button>
    </div>
  );
}
