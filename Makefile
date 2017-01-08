ORIGIN := git@github.com:jugglinmike/presentations.git

.PHONY: build
build:
	rm -rf out
	git clone . out
	cp -r out/index/* out
	cd out && ../annotate-slides.sh

.PHONY: deploy
deploy: build
	cd out && \
		git checkout -b gh-pages && \
		git add --all . && \
		git commit --message "Build pages" && \
		git push --force $(ORIGIN) gh-pages
