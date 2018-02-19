/**
 * hypertag - v0.6.0
 * 
 * dependency: systemjs
 * 
 * [0.6.0] inclui tags personalizada para vuejs
 */

define([], () => {

  const version = '0.6.2'

  const H = function (cb) {

    return function (h, cx) {

      return cb((a, ...c) => {

        let b = (
          c.length &&
          'object' == typeof (c[0]) &&
          void 0 == c[0].tag &&
          void 0 == c[0].data &&
          void 0 == c[0].children
        ) ? c.shift() : {};

        c.length == 1 && Array.isArray(c[0]) && (c = c[0])

        return h(a, b, c);

      }, cx || this);

    };
  };

  return { version, H }

});