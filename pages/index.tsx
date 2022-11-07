import { rootDomain } from "../lib/config";
import { getPublishedPosts } from "../lib/notion";
import { uuidToPageId } from '../lib/util';
import Link from 'next/link';

export const getStaticProps = async () => {
  const posts = await getPublishedPosts();

  // todo: do a better job of mapping these
  const pageIds = posts.map((post) => uuidToPageId(post.id));

  return {
    props: {
      pageIds
    },
    // https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
    revalidate: 10,
  }
}

export default function Home({ pageIds }: { pageIds: string[] }) {
  return (
    <>
    {
      pageIds.map((pageId) => <Link href={`${rootDomain}/${pageId}`}><a>{pageId}</a></Link>)
    }
    </>
  )
}