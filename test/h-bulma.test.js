/**
 * verson 0.1.0
 * 
 * changelog [0.1.0]
 * - adiciona tag.input
 * 
 * changelog [0.2.1]
 * - altera caminho do arquivo hypertag
 */

const h = require('../h-bulma');
const test = require('tape');

const t1 = (l, r, f) => test(l, t => {

  (a => t.assert(r === a, `${r} - ${a}`))(f());
  t.end();

});

t1('input', '<input class="input">', () => {
  return `${h.input()}`;
})

t1('input name', '<input name="input" class="input">', () => {
  return `${h.input({'name':'input'})}`;
})

t1('input name', '<input class="entrada input">', () => {
  return `${h.input({'class':'entrada'})}`;
})

t1('control', '<p class="control">a</p>', () => {
  return `${h.control('a')}`;
})

t1('control input', '<p class="control"><input class="input"></p>', () => {
  return `${h.control(h.input())}`;
})

t1('button', '<button class="button">a</button>', () => {
  return `${h.button('a')}`;
})

t1('field', '<div class="field">a</div>', () => {
  return `${h.field('a')}`;
})

t1('column', '<div class="column">a</div>', () => {
  return `${h.column('a')}`;
})

t1('columns', '<div class="columns">a</div>', () => {
  return `${h.columns('a')}`;
})

t1('columns', '<div class="columns"><div class="column">a</div><div class="column">a</div></div>', () => {
  return `${h.columns(h.column('a'), h.column('a'))}`;
})

t1('control', '<div class="control"></div>', () => {
  return `${h.control({'tagName':'div'})}`;
})




