# Ideas

- [] Deploy to Vercel, route duncanmcisaac.com and duncan.lol to blog
- [] Pick a more privacy-centric analytics tool than Google (I remember seeing some options on HN)
- [] Deploy using git merge (captures code changes and new md files)

## Content

- I like the idea of adding a TIL page https://github.com/jbranchaud/til and/or something like that digital garden site I saw

## Notion thoughts

- I decided using the unofficial lib is too much of a hassle so I'm just exporting as md and styling

## Tech notes

- Move to SSG to reduce latency. I can just redeploy the site with a new build via git each time I publish a new post

https://mdxjs.com/docs/getting-started/#nextjs
https://nextjs.org/docs/advanced-features/using-mdx

todo: follow this guide for using mdx with next more effectively: https://spacejelly.dev/posts/how-to-source-mdx-content-in-next-js-to-dynamically-create-pages-for-a-blog/

## Issues

- [] .mdx files don't have target="\_blank" links; unsure if inter-post linking works
