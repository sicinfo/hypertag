/**
 * aplication: hypertag
 * module: h-vue
 * 
 * powered by Moreira
 */

((root, H) => {

  const version = '0.8.0';

  if ('undefined' !== typeof (define)) {
    define([], () => ({ version, H }));
  }

  else if ('undefined' !== typeof (process) && process.versions && process.versions.node) {
    module.exports = { version, H };
  }

  else {
    root.hypertag = { version, H };
    if (!('H' in root)) root = H;
  }

})(this || self || window, callBack => function (createElement, context) {

  return callBack.call(this, (tagName, ...children) => {

    // se primeiro elemento children for um objecto
    // de attributes
    const attributtes = children.length &&
      'object' === typeof (children[0]) &&
      ['tag', 'data', 'children'].every(key => children[0][key] === undefined) &&
      children.shift() || {};

    'on' in attributtes && Object.keys(attributtes.on).some(onKey => {
      const elems = onKey.split('.');
      if (elems.indexOf('prevent', 1) > 0) {
        attributtes.on[elems[0]] = function (evt) {
          evt.stopPropagation();
          attributtes.on[onKey].call(this, evt)
        }
      }
    });

    // compatibiliza com createElement Vue
    if (children.length == 1 && Array.isArray(children[0])) {
      children = children[0];
    }

    return createElement(tagName, attributtes, children);
  }, context);

});