import type React from "react";
import { twMerge } from "tailwind-merge";

type TopicProps = {
  name: string;
  treatment: "underline" | "italic";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  fontSize?: string;
};

export function Topic({ name, treatment, onClick, fontSize }: TopicProps) {
  return (
    <button
      className={twMerge(
        `text-base ${treatment} underline-offset-3 hover:cursor-pointer`,
        fontSize ?? "text-medium",
      )}
      onClick={onClick}
    >
      {name}
    </button>
  );
}

export function Topics({
  names,
  onClick,
}: {
  names: string[];
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <div className={`flex gap-x-6`}>
      {names.map((name) => (
        <Topic
          key={`topic-${name}`}
          name={name}
          onClick={onClick}
          treatment="underline"
          fontSize="text-lg"
        />
      ))}
    </div>
  );
}
