/**
 * verson 0.1.0
 * 
 * changelog [0.1.0]
 * - adiciona tag.input
 * 
 * changelog [0.2.1]
 * - altera caminho do arquivo hypertag
 */

const { h } = require('../hypertag');
const test = require('tape');

let a1 = h('a').setProps({'a':'a'});

let a2 = h('a', {'class': 'a c d'}).delClass('d c').addClass('a c','b');

let a3 = h('a', {'style': 'a:1;c:3;d:4'});
a3.delStyle('d');
a3.addStyle({'a':'1','e':' 5 e '});
a3.addStyle({'b':'2'});

console.log(26, a3.toString());

[
  ['1 - tag  vazia', '<a>', 'a/'],
  ['2 - tag  vazia', '<a></a>', 'a'],
  
  ['3 - tag com class', '<a class="a"></a>', 'a', {'class':'a'}],

  ['4 - tag ', '<a>a</a>', 'a', 'a'],
  ['5 - tag com tag', '<a><a></a></a>', 'a', h('a')],
  ['6 - tag com tag', '<a><a>a</a></a>', 'a', h('a', 'a')],
  ['7 - tag ', '<a><a>a</a>a</a>', 'a', h('a', 'a'), 'a'],
  ['8 - tag com prop', '<a a="a"></a>', 'a', {'a':'a'}],
  ['9 - tag com prop', '<a a="a">a</a>', 'a', {'a':'a'}, 'a'],
  ['10 - tag com prop', '<a><a a="a"></a></a>', 'a', a1],

  ['tag com prop class', '<a><a class="a c b"></a></a>', 'a', a2],
  
  ['tag com prop style', '<a><a style="a:1;c:3;e:5 e;b:2"></a></a>', 'a', a3],


  ['tag com prop', '<a><a a="a">a</a>a</a>', 'a', h('a', {'a':'a'}, 'a'), 'a'],
  ['tag com prop', '<a a="a">', 'a/', {'a':'a'}],
  ['tag com prop', '<a a="a" b="b">', 'a/', {'a':'a', 'b':'b'}]
].forEach(a => test(a[0], t => {
  t.assert(a[1] === h(...a.slice(2)).toString(), a[1]);
  t.end();
}));

// const t1 = (l, r, f) => test(l, t => {

//   (a => t.assert(r === a, `${r} - ${a}`))(f());
//   t.end();

// });
