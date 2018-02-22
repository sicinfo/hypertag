/**
 * hypertag - v0.6.0
 * 
 * dependency: systemjs
 * 
 * [0.6.0] inclui tags personalizada para vuejs
 */

define([], () => {

  const version = '0.7.0';

  const H = function (cb) {

    return function (h, cx) {

      cx || (cx = this);

      return cb((a, ...c) => {

        let b = (
          void 0 != c[0] &&
          'object' == typeof (c[0]) &&
          void 0 == c[0].tag &&
          void 0 == c[0].data &&
          void 0 == c[0].children
        ) ? c.shift() : {};

        'on' in b && Object.keys(b.on).some(k => {
          let e = k.split('.');
          if (e.indexOf('prevent', 1) > 0) {
            b.on[e[0]] = function(evt) {
              evt.stopPropagation();
              b.on[k].call(this, evt)
            }
          }
        });

        c.length == 1 && Array.isArray(c[0]) && (c = c[0])

        return h(a, b, c);
      }, cx );

    };
  };

  return { version, H }

});