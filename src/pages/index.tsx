import { Box, Center, Heading, SimpleGrid, Stack, Text, VStack} from "@chakra-ui/react";
import Layout from "components/Layout";
// import { ThemeTypings } from '@chakra-ui/react'
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
  // const theme = useTheme<ThemeTypings>() // todo: figure out how to get typed styles
  return (
    <Layout key="index">
      <Stack direction="column" spacing={2}>
        <Heading color={"brand.spaceCadet"} size="2xl">Duncan McIsaac</Heading>
        <CaptionBar />
        <Socials />
      </Stack>
     
      {posts && posts.map((post) => PostBlockDynamic(post))}
    </Layout>
  );
}