import React from "react";

// todo: can I pull in frontmatter data here for titling and whatever?
export default function Layout({ children }: { children: React.ReactNode}) {
  return (
    <>
      <h1>Wow hey there</h1>
      {children}
    </>
  )
}