The Wonders of the jQuery Migrate Plugin

- Overview
  - Why do we need this?
  - Demo application
  - API Overview
  - Source walkthrough
- Why do we need this?
  - > In making these changes, the team's goal was to fix behavior that makes
    > jQuery inconsistent or hard to use, and in the process improve both file
    > size and overall performance.
	- The plugin helps developers respond to potentially breaking changes in the
	  API (and even in some undocumented methods!)
- Demo application
  - Run it w/console
  - Upgrade to 1.9, insert the Migrate plugin
  - Re-run w/console
- API Overview
  - jQuery.migrateWarnings
  - jQuery.migrateMute
  - jQuery.migrateTrace
  - jQuery.migrateReset()
- Source walkthrough
  - Gruntfile.js
    - Aside: What is Grunt?
    - `concat` task
  - intro.js & outtro.js
    - `window` aliasing
    - `undefined` re-setting
    - `"use strict";`
  - migrate.js
    - `migrateWarn`
    - `jQuery.migrateWarnings` and `warnedAbout`
    - `migrateWarnProp`
  - core.js
    - Overriding $.fn.init
  - migratemute.js

- Resources:
	- [jQuery Migrate Plugin
	  repository](https://github.com/jquery/jquery-migrate/)
	- [jQuery 1.9 final, jQuery 2.0 beta, Migrate final released]
	  http://blog.jquery.com/2013/01/15/jquery-1-9-final-jquery-2-0-beta-migrate-final-released/
	- [jQuery Core 1.9 Upgrade Guide](http://jquery.com/upgrade-guide/1.9/)
	- [`Object.defineProperty` on
	  MDN](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/defineProperty)
	- [JavaScript Getters and
	  Setters](http://ejohn.org/blog/javascript-getters-and-setters/) by John
    Resig
	- [Easily Test jQuery Pre-Release
		Versions](http://weblog.bocoup.com/easily-test-jquery-pre-release-versions/)
    by Dan Heberdan
