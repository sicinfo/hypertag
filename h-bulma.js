/**
 * hypertag - v0.0.4
 * 
 * dependency: systemjs
 * 
 * [0.3.0] inclui tags personalizada para bulma.css
 */
 
((global, h) => {

  const isNode = 'undefined' !== typeof(process) && process.versions && process.versions.node
  const isSystemjs = 'undefined' !== typeof(define);



  if (isNode) module.exports = h(require('./hypertag'));

  else if (isSystemjs) define(['hypertag'], hypertag => h(hypertag));
  
})(this, hypertag => {

  const existProps = hypertag.existProps;

  const h = (tagName, ...a) => {

    if (existProps(a, 'tagName')) {
      tagName = a[0].tagName;
      delete a[0].tagName
    }

    return hypertag(tagName, ...a);
  };

  h.input   = a       => h('input/', a).addClass('input');
  h.control = (...a)  => h('p', ...a).addClass('control');
  h.button = (...a)   => h('button', ...a).addClass('button');
  h.field = (...a)    => h('div', ...a).addClass('field');
  h.column = (...a)   => h('div', ...a).addClass('column');
  h.columns = (...a)  => h('div', ...a).addClass('columns');

  return h;
});

  