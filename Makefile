# Use sub-shells to run npm scripts

server:
	(cd src && npm run dev)

import:
	(cd scripts && npx ts-node test.ts)