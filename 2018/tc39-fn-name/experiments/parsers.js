'use strict';

const acorn = require('acorn');
const babylon = require('babylon');
const esprima = require('esprima');
const shift = require('shift-parser');

const parsers = [
  {
    name: 'acorn  ',
    parse(code) {
      try {
        acorn.parse(code, { sourceType: 'script' });
      } catch ({}) {
        return false;
      }
      return true;
    }
  },
  {
    name: 'babylon',
    parse(code) {
      try {
        babylon.parse(code, { sourceTyle: 'script' });
      } catch ({}) {
        return false;
      }
      return true;
    }
  },
  {
    name: 'esprima',
    parse(code) {
      try {
        esprima.parseScript(code);
      } catch ({}) {
        return false;
      }
      return true;
    }
  },
  {
    name: 'shift  ',
    parse(code) {
      try {
        shift.parseScript(code);
      } catch ({}) {
        return false;
      }
      return true;
    }
  }
];

parsers.forEach(p => {
  [
    '(function static() { "use strict"; });',
    ' function static() { "use strict"; }  '
  ].forEach(code => {
    console.log(p.name, code, p.parse(code));
  });
});
