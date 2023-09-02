import { ReactNode } from "react";

export default function blockquote(props: {children: ReactNode}) {
  return (
    <>
    <div className="flex">
      <div className="flex-none bg-delftBlue rounded-sm mr-2 w-[0.175rem]" />
      <blockquote className="flex-auto font-heading italic">{props.children}</blockquote>
    </div>
    </>
  )
}