# Duncan's website

Monorepo for my personal site's source code and convenience/CMS scripts.

The previous iteration of this site was a Gatsby project deployed using Netlify. I wrote posts using Google Docs and used a bespoke folder structure to indicate what should be published, what was in progress, etc. Google didn't offer convenient export options so I had to manually copy doc content into Gatsby Markdown folders, which was annoying.

My primary requirement this time around was to have an excellent writing and cataloging UX. I really like writing with Notion, and Notion databases offer the post catalog functionality I want. The `scripts/` directory contains a pipeline that uses the [official Notion client](https://www.npmjs.com/package/@notionhq/client) to fetch database record metadata, string manipulation to convert some of that metadata into frontmatter, and [`notion-to-md`](https://www.npmjs.com/package/notion-to-md) to convert the record bodies into Markdown, which is then written to `src/content` as a series of `.mdx` files. This pipeline can be executed from the top-level directory with `make notion`.

The website itself uses Next.js, React and TypeScript, and is deployed using Vercel. It uses [`next-mdx-remote`](https://github.com/hashicorp/next-mdx-remote) and [mdx-js](https://mdxjs.com/) to convert static `.mdx` files into JSX. The site uses static site generation for speediness. The other goal of using `.mdx` files is so I can insert visualization or interactivity into an individual post without needing to create a custom page.

I could have built a more reactive application that would keep the site at content parity with my Notion database, but that felt too over-engineered for the frequency at which I write/update content, so instead I use `make notion`, `npm run dev`, `tsc` and `git push origin head` which triggers a production build and deployment in Vercel. 

## Design
I use [Chakra UI](https://chakra-ui.com/) to theme raw converted JSX, and for its higher-level layout primitives. My fonts are hosted by [Adobe](https://fonts.adobe.com/). 


## Todo
- [ ] Better monorepo package/tsconfig structure

Copyright 2023 Duncan McIsaac