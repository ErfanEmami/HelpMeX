import { Page } from "../components/Page";
import { useAppContext } from "../context/app_context/AppContext";

export const Home = () => {
  const context = useAppContext()

  return (
    <Page>
      <div>home</div>
    </Page>
  );
};
