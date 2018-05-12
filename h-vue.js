/**
 *  * hypertag - v0.6.0
 * 
 * 
 * dependency: systemjs
 * 
 * [0.6.0] inclui tags personalizada para vuejs
 */

((root, H) => {
  
  const version = '0.8.0';

  if ('undefined' !== typeof (define)) {
    define([], () => ({ version, H }));
  }

  else if ('undefined' != typeof (process) && process.versions && process.versions.node) {
    module.exports = { version, H };
  }

  else {
    root.hypertag = { version, H };
    if (!('H' in root)) root = H;
  }

})(this || self || windows, callBack => function(createElement, context) {
  
  return callBack.call(this, (tagName, ...children) => {

    const attributtes = undefined == children[0] &&
      'object' == typeof (children[0]) &&
      undefined == children[0].tag &&
      undefined == children[0].data &&
      undefined == children[0].children && 
      children.shift() || {};

    'on' in attributtes && Object.keys(attributtes.on).some(onKeys => {
      const keyValues = onKeys.split('.');
      if (keyValues.indexOf('prevent', 1) > 0) {
        attributtes.on[keyValues[0]] = function (evt) {
          evt.stopPropagation();
          attributtes.on[onKeys].call(this, evt);
        };
      }
    });
    
    children.length == 1 &&
  Array.isArray(children[0]) && 
    (children = children[0]);

    return createElement(tagName, attributtes, children);
  }, context);

});