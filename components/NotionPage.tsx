import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { ExtendedRecordMap } from 'notion-types';
import { NotionRenderer } from 'react-notion-x';

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then((m) => m.Code)
)
const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
)

/**
 * See https://github.com/NotionX/react-notion-x#optional-components
 * for example of other dynamic imports
 * 
 * @param param0 
 * @returns 
 */
export function NotionPage({
  recordMap,
  rootDomain,
  rootPageId,
}: {
  recordMap: ExtendedRecordMap,
  rootDomain?: string,
  rootPageId?: string,
}) {
  return (
    <NotionRenderer 
      recordMap={recordMap}
      rootDomain={rootDomain}
      rootPageId={rootPageId}
      components={{
        nextImage: Image,
        nextLink: Link,
        Code,
        Collection,
      }}
    />
  );
}