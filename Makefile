all: deploy

deploy:
	git branch -D gh-pages || true
	git checkout --orphan gh-pages
	sh ./annotate-slides.sh
	git mv --force index/* .
	git commit -am "Build pages"
	git push --force origin gh-pages
	git checkout -

.PHONY: deploy all
