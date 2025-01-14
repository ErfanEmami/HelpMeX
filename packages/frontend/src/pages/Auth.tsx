import { Page } from "../components/Page";
import { useAuth } from "../hooks/useAuth";

export const Auth = () => {
  const { login } = useAuth();

  return (
    <Page>
      <div>
        <button onClick={login}>Authenticate with twitter</button>
      </div>
    </Page>
  );
};
