# Use sub-shells to run npm scripts

server:
	(cd src && npm run dev)

notion:
	(cd scripts && npx ts-node notionExport.ts)