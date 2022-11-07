# Ideas

- [] Deploy to Vercel, route duncanmcisaac.com and duncan.lol to blog
- [] Pick a more privacy-centric analytics tool than Google (I remember seeing some options on HN)
- [] Deploy using CLI or git merge. Git for code changes, CLI for new posts

## Notion thoughts

- I think I'll load content from Notion in and put custom styling on it
- Image hosting, interactive code, etc will start as uploads to Notion / Codepen embeds in Notion and I'll expand from there

## Tech notes

- react-notion-x is good for rendering blocks, but doesn't have good collection/database query support, so
  I'm using the official notion client for that
- Move to SSG to reduce latency. I can just redeploy the site with a new build via CLI each time I publish a new post

## Issues

- I love the notion editing experience but it's a fucking drag to get all these libraries to work together seamlessly
- Can I build a pipeline that lets me edit in Notion and then download / copy text as Markdown? (then render with MDX)
- Yes. Can also download HTML with styling but that's annoying to handle
- I might be able to insert MDX doc comments for the metadata programmatically
- Is there a good way to call the Notion API to fetch the published posts, download as Markdown, unzip, rename, etc?
 - This looks good: https://github.com/souvikinator/notion-to-md (handles the Notion API shit for me)