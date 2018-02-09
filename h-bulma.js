/**
 * hypertag - v0.0.4
 * 
 * dependency: systemjs
 * 
 * [0.3.0] inclui tags personalizada para bulma.css
 */

((global, h) => {

  const isNode = 'undefined' !== typeof (process) && process.versions && process.versions.node
  const isSystemjs = 'undefined' !== typeof (define);



  if (isNode) module.exports = h(require('./hypertag'));

  else if (isSystemjs) define(['hypertag'], hypertag => h(hypertag));

})(this, Hypertag => {

  const existProps = Hypertag.existProps;

  class Tag extends Hypertag.Tag {

    constructor(tagName, ...childs) {

      if (existProps(childs, 'tagName')) {
        tagName = childs[0].tagName;
        delete childs[0].tagName
      }

      super(tagName, ...childs);
    }
  }

  const h = (...a) => new Tag(...a);

  return {
    Tag, h,
    'input': a => h('input/', a).addClass('input'),
    'control': (...a) => h('p', ...a).addClass('control'),
    'button': (...a) => h('button', ...a).addClass('button'),
    'field': (...a) => h('div', ...a).addClass('field'),
    'column': (...a) => h('div', ...a).addClass('column'),
    'columns': (...a) => h('div', ...a).addClass('columns')
  }

});

