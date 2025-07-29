import GoHome from "../components/GoHome";
import Layout from "../components/Layout";

const NotFound = () => {
  return (
    <>
      <head>
        <title>Page not found</title>
      </head>
      <Layout key="404">
        <GoHome text="home" />
        <a target="_blank" href="https://www.youtube.com/watch?v=CtWirGxV7Q8">
          <h1 className="font-heading font-semibold text-5xl mt-6">
            You know I can't grab your ghost chips
          </h1>
        </a>
      </Layout>
    </>
  );
};

export default NotFound;
