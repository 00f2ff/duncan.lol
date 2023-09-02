import { TfiHandPointLeft } from "react-icons/tfi";
import NextLink from 'next/link';

interface Props {
  path: string;
  text: string;
}

export default function GoBack({ path, text }: Props) {
  const key = `go-to-${path}`;
  return (
    <NextLink href="/" passHref>
      <div className="flex justify-left items-center text-2xl">
        <TfiHandPointLeft />
        <span className="ml-2 font-medium">{text}</span>
      </div>
    </NextLink>
  );
}