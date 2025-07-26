import { TfiHandPointLeft } from "react-icons/tfi";

interface Props {
  text: string;
}

export default function GoHome({ text }: Props) {
  return (
    <a href="/">
      <div className="flex justify-left items-center text-2xl">
        <TfiHandPointLeft />
        <span className="ml-2 font-medium">{text}</span>
      </div>
    </a>
  );
}