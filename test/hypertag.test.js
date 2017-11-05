/**
 * verson 0.0.3
 */

const h = require('../src/hypertag');
const test = require('tape');

let a1 = h('a');
a1.setProps('a','a');

let a2 = h('a', {'class': 'a c d'});
a2.delClass('d c');
a2.addClass('a c','b');

[
  ['tag  vazia', '<a>', 'a/'],
  ['tag  vazia', '<a></a>', 'a'],
  ['tag com class', '<a class="a"></a>', 'a', {'class':'a'}],
  ['tag ', '<a>a</a>', 'a', 'a'],
  ['tag com tag', '<a><a></a></a>', 'a', h('a')],
  ['tag com tag', '<a><a>a</a></a>', 'a', h('a', 'a')],
  ['tag ', '<a><a>a</a>a</a>', 'a', h('a', 'a'), 'a'],
  ['tag com prop', '<a a="a"></a>', 'a', {'a':'a'}],
  ['tag com prop', '<a a="a">a</a>', 'a', {'a':'a'}, 'a'],
  ['tag com prop', '<a><a a="a"></a></a>', 'a', a1],
  ['tag com prop', '<a><a class="a c b"></a></a>', 'a', a2],
  ['tag com prop', '<a><a a="a">a</a>a</a>', 'a', h('a', {'a':'a'}, 'a'), 'a'],
  ['tag com prop', '<a a="a">', 'a/', {'a':'a'}],
  ['tag com prop', '<a a="a" b="b">', 'a/', {'a':'a', 'b':'b'}]
].forEach(a => test(a[0], t => {
  t.assert(a[1] === h(...a.slice(2)).toString(), a[1]);
  t.end();
}));