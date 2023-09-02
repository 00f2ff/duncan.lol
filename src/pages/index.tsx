import Layout from "components/Layout";
import { FrontmatterSchema, getFilenamesForDirectory, serializeMDX } from "util/files";
import dynamic from "next/dynamic";
import PostBlock from "components/PostBlock";
import dayjs from "dayjs";
import CaptionBar from "components/CaptionBar";
import Socials from "components/Socials";

const PostBlockDynamic = dynamic(() => import("components/PostBlock"), { ssr: false }) as typeof PostBlock;

function sortByDateDescending(a: FrontmatterSchema, b: FrontmatterSchema): number {
  return dayjs(a.updatedOn ?? a.publishedOn).isBefore(b.updatedOn ?? b.publishedOn) ? 1 : -1;
}

export async function getStaticProps() {
  const filenames = await getFilenamesForDirectory("posts");
  const mdxResults = await Promise.all(
    filenames.map((filename) => serializeMDX(filename, `posts`))
  );
  const posts = mdxResults.map((result) => {
    return result.frontmatter
  }).sort(sortByDateDescending);

  return {
    props: {
      posts
    }
  }
}

type Props = {
  posts: FrontmatterSchema[]
}

// todo: figure out a way to make React understand that the key gets passed into the dynamic import in that component
export default function Home({ posts }: Props ) {
  const year = dayjs().format("YYYY");
  return (
    <Layout key="index">
      <div className="mb-10">
        <h1 className="font-heading font-semibold text-5xl mt-6 mb-3">Duncan McIsaac</h1>
        <CaptionBar />
        <Socials />
      </div>
     
      {posts && posts.map((post) => PostBlockDynamic(post))}
    </Layout>
  );
}