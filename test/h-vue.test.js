/**
 * verson 0.1.0
 * 
 * changelog [0.1.0]
 * - adiciona tag.input
 * 
 * changelog [0.2.1]
 * - altera caminho do arquivo hypertag
 */

const h = require('../h-vue');
const test = require('tape');

let count = 0;

const t1 = (l, r, f) => test(`${count} - ${l}`, t => {

  (a => t.assert(r === a, `${r} - ${a}`))(f());
  t.end();

});

t1('input', '<input v-model="a" lazy>', () => {
  return `${h.input('a')}`;
})

t1('input', '<input v-model="a" lazy @change="teste">', () => {
  return `${h.input('a').change('teste')}`;
})


