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

      const fe = {};

      fe['text'] = (a, ...c) => {

        let cx_name = c[0];
        let b = c.length > 1 ? c[1] : {};

        b['attrs'] || (
          b['attrs'] = {}
        );

        b['attrs']['type'] || (
          b['attrs']['type'] = 'text'
        );

        b['domProps'] || (
          b['domProps'] = { 'value': cx_name }
        );

        b['on'] || (
          b['on'] = {}
        );

        b['on']['change'] || (
          b['on']['change'] = evt => { evt.stopPropagation(); cx_name = evt.target.value }
        );

        return h('input', b)
      };

      const fg = (a, ...c) => {

        let b = (
          c.length &&
          'object' == typeof (c[0]) &&
          void 0 == c[0].tag &&
          void 0 == c[0].data &&
          void 0 == c[0].children
        ) ? c.shift() : {};

        if ('on' in b) {
          'click.prevent' in b.on && (
            b.on['click'] = function(evt) { 
              evt.stopPropagation(); 
              b.on['click.prevent'].call(this, evt) 
            }           
          )
        }

        c.length == 1 && Array.isArray(c[0]) && (c = c[0])

        return h(a, b, c);
      };

      return cb((a, ...c) => (fe[a] || fg)(a, ...c), cx || this);

    };
  };

  return { version, H }

});