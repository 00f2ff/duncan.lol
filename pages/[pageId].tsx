import { NotionPage } from "../components/NotionPage";
import { notionX } from "../lib/notion";
import { ExtendedRecordMap } from 'notion-types'
import { notionRootPageId, rootDomain } from "../lib/config";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const pageId = context.params.pageId as string;
  console.log(JSON.stringify(context));
  const recordMap = await notionX.getPage(pageId);

  console.log("hellloooo")
  console.log(recordMap);

  return {
    props: {
      recordMap
    },
    revalidate: 10,
  }
}

export default function BlogPost({ recordMap }: { recordMap: ExtendedRecordMap }) {
  return (
    <NotionPage
      recordMap={recordMap}
      rootDomain={rootDomain}
      rootPageId={notionRootPageId}

    />
  );
}