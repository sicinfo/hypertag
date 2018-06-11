/**
 * aplication: hypertag
 * module: h-vue
 * 
 * powered by Moreira
 */

(root => {

  const TIMEZONE_OFFSET = (() => {
    const offset = new Date().getTimezoneOffset() / 60;
    const minutes = `0${((offset - parseInt(offset)) * 60).toString()}`.slice(-2);
    const hours = `0${parseInt(offset).toString()}`.slice(-2);
    return `00:00:00${offset > 0 ? '-' : '+'}${hours}:${minutes}`;
  })();

  const version = '0.9.0';

  const _createElement = function (createElement) {

    const h = (tagName, ...children) => {

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
      };

      return createElement(tagName, attributtes, children);
    }

    h.container = ({ attrs = {}, section, header, footer }) => {

      if (!('attrs' in attrs)) {
        attrs.attrs = { 'class': 'container' }
      }

      return createElement('article', attrs, [
        h('header', undefined === header ? '' : header),
        h('section', undefined === section ? '' : section),
        h('footer', undefined === footer ? createElement('code', {}, [`v${this.version || '0.0.0'}`]) : footer)
      ])

    }

    return h;
  }

  const H = callBack => function (createElement, context) {

    return callBack.call(this, _createElement.call(this, createElement), context);

  };

  const InputDate = (() => {

    const render = H(function (h) {

      const attrs = { 
        'type': 'date',
        'ref': 'input'
      };

      console.log(this.value);

      const domProps = { 
        'value': this.value.toISOString().split('T')[0].split('-').reverse().join('/') 
      };

      const change = ({target}) => {
        this.$emit('change', new Date(`${target.value.split('/').reverse().join('-')}T${TIMEZONE_OFFSET}`))
      }      

      return h('input', { attrs, domProps, 'on': { change } });

    });

    const props = {
      'value': { 'type': Date, 'default': new Date() }
    };

    return { render, props };

  })();

  if ('undefined' !== typeof (define)) {
    define([], () => ({ version, H, InputDate }));
  }

  else if ('undefined' !== typeof (process) && process.versions && process.versions.node) {
    module.exports = { version, H };
  }

  else {
    root.hypertag = { version, H };
    if (!('H' in root)) root = H;
  }

})(this || self || window);
