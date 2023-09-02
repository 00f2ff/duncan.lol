import React from "react";
import dayjs from "dayjs";

interface Props {
  children: React.ReactNode;
  verticalSpacing?: number;
}

export default function Layout({ children, verticalSpacing }: Props) {
  const year = dayjs().format("YYYY");
  return (  
    <div className={`grid grid-cols-12 my-20 gap-y-10`}>
      <div className={`col-start-4 col-span-6 ${verticalSpacing ?? "gap-y-10"}`}>
        {children}
        <p className="mt-20">&copy; {year} Duncan McIsaac</p>
      </div>
    </div>
  )
}