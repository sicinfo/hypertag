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

})(this || self || window, callBack => function(createElement, context) {
  
  return callBack.call(this, (tagName, ...children) => {

    // se primeiro elemento children for um objecto
    // de attributes
    const attributtes = children.length &&
      'object' == typeof (children[0]) &&
      ['tag', 'data', 'children'].every(key => children[0][key] === undefined) &&
      children.shift() || {};

    // compatibiliza com createElement Vue
    if (children.length == 1 && Array.isArray(children[0])) {
      children = children[0];
    }

    console.log(attributtes);

    return createElement(tagName, attributtes, children);
  }, context);

});