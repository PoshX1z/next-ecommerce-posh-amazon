import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import SeparatorWithOr from "@/components/shared/SeperatorOr";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import CredentialsSignInForm from "./CredentialsSigninForm";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import { GoogleSignInForm } from "./GoogleSignInForm";

// Defines the metadata for the page.
export const metadata: Metadata = {
  title: "Sign In",
};
// Sign in page.
const SignIn = async (props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) => {
  const searchParams = await props.searchParams;

  const { callbackUrl = "/" } = searchParams;

  const session = await auth();
  if (session) {
    return redirect(callbackUrl);
  }

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <CredentialsSignInForm />
          </div>
          <SeparatorWithOr />
          <div className="mt-4">
            <GoogleSignInForm />
          </div>
        </CardContent>
      </Card>
      <SeparatorWithOr>New to {APP_NAME}?</SeparatorWithOr>

      <Link href={`/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`}>
        <Button className="w-full" variant="outline">
          Create your {APP_NAME} account
        </Button>
      </Link>
    </div>
  );
};
export default SignIn;
