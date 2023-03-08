import { Center, Heading, SimpleGrid} from "@chakra-ui/react";
import Layout from "components/Layout";
// import { ThemeTypings } from '@chakra-ui/react'
import { FrontmatterSchema, getSlugsForDirectory, serializeMDX } from "util/files";
import dynamic from "next/dynamic";
import PostBlock from "components/PostBlock";
import dayjs, { Dayjs } from "dayjs";

const PostBlockDynamic = dynamic(() => import("components/PostBlock"), { ssr: false }) as typeof PostBlock;

function sortByDateDescending(a: FrontmatterSchema, b: FrontmatterSchema): number {
  return dayjs(a.updatedOn ?? a.publishedOn).isBefore(b.updatedOn ?? b.publishedOn) ? 1 : -1;
}

export async function getStaticProps() {
  const slugs = await getSlugsForDirectory("posts");
  const mdxResults = await Promise.all(
    slugs.map((slug) => serializeMDX(slug, "posts"))
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

export default function Home({ posts }: Props ) {
  // const theme = useTheme<ThemeTypings>() // todo: figure out how to get typed styles
  return (
    <Layout>
      <Center>
        <SimpleGrid 
          columns={1} 
          spacing={10} 
          width={"50%"}
          marginTop={"50px"}
          marginBottom={"50px"}
        >
          <Heading color={"brand.blue"} size="2xl">Duncan McIsaac</Heading>
          {posts && posts.map((post) => PostBlockDynamic(post))}
        </SimpleGrid>
      </Center>
    </Layout>
  );
}