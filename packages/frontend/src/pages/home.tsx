import { Page } from "../components/Page";
import { useAuth } from "../hooks/useAuth";

export const Home = () => {
  const { logout } = useAuth()

  return (
    <Page>
      <div>home</div>
      <button onClick={logout}>
        logout
      </button>
    </Page>
  );
};
