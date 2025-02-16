pub: publish push
publish:
	bun run build && bun publish

push:
	bun run test && git add . && git commit -m 'chore' && git push origin 