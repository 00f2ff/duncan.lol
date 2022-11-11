import React from "react";

interface Props {
  children: React.ReactNode;
}

// todo: can I pull in frontmatter data here for titling and whatever? yah needs more props
export default function Layout({ children }: Props) {
  return (
    <>
      <h1>Wow hey there</h1>
      {children}
    </>
  )
}