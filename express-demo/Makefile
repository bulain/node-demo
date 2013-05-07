REPORTER = dot

test:
	./node_modules/.bin/mocha \
	--reporter $(REPORTER)

r.js:
	./node_modules/.bin/r.js -o r.build.js

r.css:
	./node_modules/.bin/r.js -o r.build.css

 .PHONY: test
 
