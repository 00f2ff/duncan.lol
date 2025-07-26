// src/components/MarkdownRenderer.tsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
        h1: ({ children }) => (
          <h1 className="font-display text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="font-display text-2xl font-semibold mb-3 mt-8 text-gray-800 dark:text-gray-200">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="font-display text-xl font-semibold mb-2 mt-6 text-gray-800 dark:text-gray-200">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="font-copy mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="font-copy mb-4 ml-6 list-disc text-gray-700 dark:text-gray-300">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="font-copy mb-4 ml-6 list-decimal text-gray-700 dark:text-gray-300">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="mb-1">{children}</li>
        ),
        blockquote: ({ children }) => (
          <blockquote className="font-copy border-l-4 border-blue-500 pl-4 py-2 mb-4 italic text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800">
            {children}
          </blockquote>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        code: ({ children, className, }) => {
          // Check if it's inline code by looking for language class or using node info
          const isInline = !className || !className.startsWith('language-');
          return isInline ? (
            <code className="font-code bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm text-red-600 dark:text-red-400">
              {children}
            </code>
          ) : (
            <code className={`font-code ${className || ''}`}>{children}</code>
          );
        },
        pre: ({ children }) => (
          <pre className="font-code bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4 text-sm">
            {children}
          </pre>
        ),
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