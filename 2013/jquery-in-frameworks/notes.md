

## Angular

I was surprised to learn that Angular *does* use jQuery. Strage, because
according to the change log, it has *always* had a soft dependency on jQuery.
It has a "soft" dependency, which means that it will still function without it.
If you run Angular on a page with jQuery loaded, it will use that. Otherwise,
it will use it's own implementation of a subset of the jQuery API, named
`jqLite`.

- What is jqLite capable of? Is it really enough?
  - Maybe, but the ecosystem for jQuery plugins is such that you'll likely find
    yourself including jQuery anyway.
  - Interesting commit: "refactor(jqLite): remove jqLite show/hide support"
    https://github.com/angular/angular.js/commit/4c8eaa1eb05ba98d30ff83f4420d6fcd69045d99
- How does it detect jQuery? Will Zepto work?
  https://github.com/angular/angular.js/blob/5bc2836a0db7960621023ab3c9704222cc288317/src/Angular.js#L1030-L1049
- How does it extend jQuery?
  See http://docs.angularjs.org/api/angular.element
- Will it use jQuery for AJAX?
