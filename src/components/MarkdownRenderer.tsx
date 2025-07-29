// src/components/MarkdownRenderer.tsx
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import YouTubeEmbed from './YouTubeEmbed';
import React from 'react';
import { twMerge } from 'tailwind-merge';

interface MarkdownRendererProps {
  content: string;
}

const isYouTubeUrl = (x: string): boolean => x.includes("https://www.youtube-nocookie.com")

export const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
        h1: ({ children }) => (
          <h1 className="font-display font-semibold text-5xl mt-6 mb-3">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="font-display font-semibold text-4xl mt-6 mb-3">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="font-display font-semibold text-3xl mt-6 mb-3">{children}</h3>
        ),
        p: ({ children }) => {
          // Check if this paragraph contains only a YouTube link
          const childArray = React.Children.toArray(children);
          if (childArray.length === 1) {
            const child = childArray[0];
            
            if (React.isValidElement(child) && child.props.href) {
              const href = child.props.href;
              if (href && isYouTubeUrl(href)) {
                return <YouTubeEmbed url={href} />
              }
            }
          }
          
          // For all other paragraphs, render normally
          return <p className="my-3 leading-7 text-xl">{children}</p>;
        },
        ul: ({ children }) => (
          <ul className="leading-7 text-xl my-4 list-disc">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="leading-7 text-xl my-4 list-decimal">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="leading-7 text-xl my-1">{children}</li>
        ),
        blockquote: ({ children }) => (
          <div className="flex">
            <div className="flex-none bg-blue-500 rounded-sm mr-2 w-[0.175rem]" />
            <blockquote className="flex-auto font-heading italic">{children}</blockquote>
          </div>
        ),
        a: ({ href, children }) => {
          const anchorProps = {
            target: "_blank",
            style: {
              textDecoration: "underline"
            }
          }
          if (href && isYouTubeUrl(href)) {
            return <YouTubeEmbed url={href} />
          }
          else if (href?.startsWith("/")) {
            return <Link to={href} {...anchorProps}>{children}</Link>
          } else {
            return <a href={href} {...anchorProps}>{children}</a>
          }},
        code: ({ children, className, }) => {
          // Check if it's inline code by looking for language class or using node info
          const isInline = !className || !className.startsWith('language-');
          return isInline ? (
            <code className="font-mono text-base">
              {children}
            </code>
          ) : (
            <code className={twMerge(`font-mono text-base`, className && className)}>{children}</code>
          );
        },
        pre: ({ children, className }) => {
          const languageMatch = className?.match(/language-(\w+)/);
          const language = `language-${languageMatch ? languageMatch[1] : "plaintext"}`;

          return <pre className={twMerge(language, "font-mono text-base")}>
            {children}
          </pre>
        },
        img: ({ src, alt }) => (
          <img
            src={src}
            alt={alt}
            className="max-w-full h-auto rounded-lg shadow-md mb-4"
          />
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600">
              {children}
            </table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-100 dark:bg-gray-800 font-semibold text-left">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
            {children}
          </td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
    </div>
  );
};