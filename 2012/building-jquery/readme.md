# Composing jQuery 1.8 from Modules

First presented at Bocoup for the Boston jQuery meetup group on August 22,
2012.

## Slide outline

- Title
  - Fresh Home Made jQuery: Building jQuery based on your needs
- Who am I?
  - Mike Pennisi
  - Front end developer @bocoup
- New in jQuery 1.8
  - Sizzle re-written
  - Animations re-written
  - Automatic CSS prefixing
  - Extended $(html, props)
  - Smaller
  - Modular
- What is grunt?
  - A task-based build process written in Node.js (by our own Ben Alman)
  - Replacement for make, Ant, etc. for client-side web developers
  - Young project, impressive pedigree
  - Web: gruntjs.com, twitter: @gruntjs, freenode: #grunt
- How to build
  - grunt custom: syntax
- Dependencies
- Numbers

## Module dependencies

- ajax
  - ajax/jsonp
  - ajax/script
  - ajax/xhr
- css
  - effects
  - offset
  - dimensions
- deprecated

## Sizes

    - ALL           258393, 92585, 33114
    - ajax:         223921, 82836, 29061
      - ajax/jsonp  255794, 91738, 32814
      - ajax/xhr    252017, 91141, 32575
      - ajax/script 256509, 91755, 32886
    - css           215493, 76911, 27459
      - effects     240892, 85694, 30604
      - offset      253531, 90445, 32393
      - dimensions  256628, 92096, 32956
    - deprecated    256781, 91863, 32845
    - NONE          179409, 66440, 23227

## Links

- http://blog.jquery.com/2012/08/09/jquery-1-8-released/
- https://github.com/jquery/jquery#modules-new-in-18
- https://github.com/jquery/jquery/blob/9e246dd7fa010f2b8e112ec5a57491167556c55a/grunt.js#L68-77
