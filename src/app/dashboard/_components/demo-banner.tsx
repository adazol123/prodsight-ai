"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/shared/alert";
import { Button } from "@/components/shared/button";
import { useLoginModal } from "@/store/login-modal-context";
import { createClient } from "@/utils/supabase/client";
import { IconInfoCircleFilled } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
const DemoBanner = () => {
  const supabase = createClient();

  const { data, isLoading } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { data } = await supabase.auth.getUser();

      return data.user;
    },
  });

  const isOrganic = !data?.is_anonymous || false;
  const toggleLogin = useLoginModal().openModal;

  if (isLoading || isOrganic) {
    return null;
  }
  const description =
    "You're currently browsing as a guest, which means some features may be limited and your progress might not be saved. To enjoy the full experience and keep your data safe, we recommend logging in.";

  return (
    <Alert className="bg-orange-800/5 border-orange-800/50 backdrop-blur-md my-4 rounded-2xl text-orange-800">
      <IconInfoCircleFilled size={8} />
      <AlertTitle>Guest Mode</AlertTitle>
      <AlertDescription className=" text-orange-800/80 inline">
        {description}{" "}
        <Button
          variant="link"
          className="inline underline underline-offset-2 text-orange-800/80 p-0 h-fit"
          onClick={toggleLogin}
        >
          Click here to login.
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default DemoBanner;
