build:
	npm install
	npm run build

deploy: build
	git subtree push --prefix dist origin gh-pages

