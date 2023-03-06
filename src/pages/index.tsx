import { Box, Center, Heading, Link, LinkBox, LinkOverlay, SimpleGrid, Text, useTheme, VStack } from "@chakra-ui/react";
import Layout from "components/Layout";
import theme from "style/theme";
import NextLink from 'next/link'
// import { ThemeTypings } from '@chakra-ui/react'
import { FrontmatterSchema, getSlugsForDirectory, serializeMDX } from "util/files";
import dayjs from "dayjs";



export async function getStaticProps() {
  const slugs = await getSlugsForDirectory("posts");
  const mdxResults = await Promise.all(
    slugs.map((slug) => serializeMDX(slug, "posts"))
  );
  const posts = mdxResults.map((result) => {
    return result.frontmatter
  });

  return {
    props: {
      posts
    }
  }
}

function PostBlock(props: FrontmatterSchema) {
  const dateString = (() => {
    const formatString = "MMMM D, YYYY";
    const baseString = `${dayjs(props.publishedOn).format(formatString)}`
    if (props.updatedOn) {
      return `${baseString} (Updated ${dayjs(props.updatedOn).format(formatString)})`
    } else {
      return baseString;
    }
  })();

  return (
    <LinkBox 
      key={props.title} 
      textAlign="left"
    >
      <NextLink href={props.path} passHref>
        <LinkOverlay>
          <Heading size="md" mb="2">{props.title}</Heading>
          <Text fontSize="md" mb="1">{dateString}</Text>
          <Text fontSize="md">{props.excerpt}</Text>
        </LinkOverlay>
      </NextLink>        
    </LinkBox>
  );
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
        >
          <Heading color={"brand.blue"} size="2xl">Duncan McIsaac</Heading>
          {posts && posts.map((post) => PostBlock(post))}
        </SimpleGrid>
      </Center>
    </Layout>
  );
}