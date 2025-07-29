import GoHome from "../components/GoHome";
import Layout from "../components/Layout";
import { MarkdownRenderer } from "../components/MarkdownRenderer";

export const Disclaimer = () => {
  return (
    <Layout verticalSpacing={5} key={"disclaimer"}>
      <GoHome text="home" />
      <div className="grid grid-cols-1 gap-2">
        <h1 className="font-heading font-semibold text-5xl mt-6 mb-4">
          Disclaimer
        </h1>
      </div>
      <MarkdownRenderer
        content={`This blog is mostly [written for myself](/posts/to-those-who-wish-they-wrote-more). Each post is a snapshot of my thinking at that time. My opinions evolve and I don't always agree with my previous self, but I think it's important to keep a historical record so I can traverse my evolution as a professional and a writer.`}
      />
    </Layout>
  );
};
