deploy:
	npm install
	npm run build
	git subtree push --prefix dist origin gh-pages

