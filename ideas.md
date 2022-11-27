# Ideas

- [] Deploy to Vercel, route duncanmcisaac.com and duncan.lol to blog
- [] Pick a more privacy-centric analytics tool than Google (I remember seeing some options on HN)
- [] Deploy using git merge (captures code changes and new md files)
- [] Color fonts https://material.io/blog/color-fonts-are-here
- [] Look into using Chakra UI for easy formatting stuff
- [] Loading spinner: rotating fish cake emoji haha

## Content

- I like the idea of adding a TIL page https://github.com/jbranchaud/til and/or something like that digital garden site I saw

## Notion thoughts

- I decided using the unofficial lib is too much of a hassle so I'm just exporting as md and styling

## Tech notes

- Move to SSG to reduce latency. I can just redeploy the site with a new build via git each time I publish a new post
- notion-to-md package supports custom transformers: https://github.com/souvikinator/notion-to-md#custom-transformers
- things to keep in mind with next-mdx-remote: https://github.com/hashicorp/next-mdx-remote#caveats

Do I need this or does it work differently with the hashicorp lib? https://mdxjs.com/docs/extending-mdx/#using-plugins

## Bugs

- [x] .mdx files don't have target="\_blank" links
      ^ decided not to address this for now. People can command-click

## Todo

- [] Test inter-post linking
- [] Default components for styling: https://github.com/hashicorp/next-mdx-remote#replacing-default-components
- [] populate frontmatter in pipeline
