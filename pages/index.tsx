import { ExtendedRecordMap } from 'notion-types'
import { notionRootPageId, rootDomain } from "../lib/config";
import { NotionPage } from "../components/NotionPage";
import { getPublishedPosts, notionX } from "../lib/notion";


export const getStaticProps = async () => {
  const recordMap = await notionX.getPage(notionRootPageId);

  const posts = await getPublishedPosts();
  console.log(posts);

  return {
    props: {
      recordMap
    },
    // https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
    revalidate: 10,
  }
}

export default function Home({ recordMap }: { recordMap: ExtendedRecordMap }) {
  return (
    <NotionPage
      recordMap={recordMap}
      rootDomain={rootDomain}
      rootPageId={notionRootPageId}

    />
  );
}