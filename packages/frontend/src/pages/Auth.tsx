import Title from "@/components/Title";
import { Page } from "../components/page";
import { useAuth } from "../hooks/useAuth";
import { Button } from "@/components/ui/button";

import XLogo from "@/assets/logo-white.png";

export const Auth = () => {
  const { login } = useAuth();

  return (
    <Page center>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <Title isTyped>Welcome to Xer™</Title>
        <Button onClick={login}>
          Login with <img src={XLogo} alt="X Logo" className="w-4 h-4" />
        </Button>
      </div>
    </Page>
  );
};
