import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";

export default function Socials() {
  return (
    <div className="flex justify-left gap-3 text-xl">
      <a target="_blank" href="https://www.linkedin.com/in/dmcisaac/"><AiFillLinkedin /></a>
      <a target="_blank" href="https://github.com/00f2ff"><AiFillGithub /></a>
    </div>
  )
}