import { TypographyH2 } from "@/components/ui/typography";
import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import NYTMostPopular from "./most-popular";

export default async function NYT() {
  // Create supabase server component client and obtain user session from Supabase Auth
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/");
  }

  return (
    <>
      <TypographyH2>NYT Statistics</TypographyH2>
      <NYTMostPopular />
    </>
  );
}
