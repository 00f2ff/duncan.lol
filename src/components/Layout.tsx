import React from "react";
import dayjs from "dayjs";

interface Props {
  children: React.ReactNode;
  verticalSpacing?: number;
}

export default function Layout({ children, verticalSpacing }: Props) {
  const year = dayjs().format("YYYY");
  return (
    <div
      className={`
      grid 
      grid-cols-1 
      lg:grid-cols-12 
      px-5 
      lg:px-0 
      py-20 
      gap-y-10 
      font-body 
      bg-alabaster
      text-lg 
      leading-6
    `}
    >
      <div
        className={`col-start-1 lg:col-start-4 lg:col-span-6 ${verticalSpacing ?? "gap-y-10"}`}
      >
        {children}
        <p className="mt-20">&copy; {year} Duncan McIsaac</p>
      </div>
    </div>
  );
}
