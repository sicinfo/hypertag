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

      const domProps = {
        'value': this.value.toISOString().split('T')[0].split('-').reverse().join('/')
      };

      const change = ({ target }) => {
        this.$emit('change', new Date(`${target.value.split('/').reverse().join('-')}T${TIMEZONE_OFFSET}`))
      }

      return h('input', { attrs, domProps, 'on': { change } });

    });

    const props = {
      'value': { 'type': Date, 'default': new Date() }
    };

    return { render, props };

  })();


  const InputTextdate = (() => {

    const render = H(function (h) {

      const attrs = {
        'maxlength': 10,
        'placeholder': 'dd/mm/aaaa',
        'type': 'text'
      }

      const domProps = {
        'value': this.value
      };

      const input = ({ target }) => {

        if (!(target.value)) return;

        let position = target.selectionStart;
        let length = target.value.length;

        target.value = target.value
          .replace(/[^\d]/g, '')
          .replace(/./g, (val, ind) => {

            if (2 == ind || 4 == ind) {
              length -= 2;
              val = `/${val}`;
            }
            else {
              length -= 1;
            }

            return val;
          });

        if (0 > length && (!((position - 3) % 3) || !((position - 2) % 3))) {
          position += 1;
        }

        target.selectionStart = target.selectionEnd = position;
      }

      const change = ({ target }) => {
        let value = target.value;

        if (value.length && value.length < 10) {
          const hoje = new Date().toISOString().slice(0, 10).split('-').reverse().join('/');

          if (1 == value.length) value = `0${value}`;
          else if (4 == value.length) value = `${value.slice(0, 3)}0${value.slice(3, 4)}`;
          else if (8 == value.length) value = `${value.slice(0, 6)}${hoje.slice(6, 8)}${value.slice(6, 8)}`;

          target.value = value = `${value}${hoje.slice(value.length, 10)}`;
        }

        let msg = '';
        if (value.length) {
          if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) msg = 'data inválida !';
          else {
            const [ano, mes, dia] = value.split('/').reverse();
            const _date = new Date(ano * 1, mes * 1 - 1, dia * 1);
            if ([ano, mes, dia].join('-') !== _date.toISOString().slice(0, 10)) {
              msg = 'data invalida !';
            }
          }
        }

        target.setCustomValidity(msg);
        this.$emit('change', msg ? '' : this.value = target.value);
      };

      return h('input', { attrs, domProps, 'on': { input, change } })
    });

    const props = {
      'value': {
        'type': String,
        'default': ''
      }
    };

    return { props, render }
  })();

  const InputText = (() => {

    const render = H(function (h) {

      const attrs = this.attrs || {};
      'type' in attrs || (attrs['type'] = this['type']);
      'size' in attrs || (attrs['size'] = attrs['maxlength'] || this.maxlength || 50);

      attrs.disabled || 'maxlength' in attrs || (attrs['maxlength'] = attrs['size']);

      const domProps = { 'value': this.value };

      const on = {};
      Object.keys(this.on || {}).forEach(key => on[key] = this.on[key])

      'change' in on || (on.change = event => {
        event.stopPropagation();
        this.value = event.target.value;
        this.$emit('change', event.target);
      });

      const label = 'string' === typeof (this.label) ? { 'title': this.label } : this.label;

      const input = attrs => h('span', h('input', { attrs, on, domProps }));

      if (label && label.title) {
        if (!(attrs.placeholder || this.disabled)) attrs.placeholder = `digite ${label.title}...`
        const style = label.style || { 'display': 'grid', 'row-gap': '0.2em', 'margin': '0.5em 0' };
        return h('label', { style }, label.title, input(attrs))
      }

      else return input(attrs);
    });

    const props = {
      'attrs': Object,
      'on': Object,
      'value': String,
      'label': Object
    };

    const data = () => ({
      'type': 'text'
    })

    return { props, render, data }
  })();

  const InputPassword = (() => {

    const render = InputText.render;

    const props = InputText.props;

    const data = () => ({ 'type': 'password', 'maxlength': 20 })

    return { props, render, data }
  })();

  if ('undefined' !== typeof (define)) {
    define([], () => ({ 
      H, 
      InputDate, 
      InputText, 
      InputPassword, 
      InputTextdate,
      version
    }));
  }

  else if ('undefined' !== typeof (process) && process.versions && process.versions.node) {
    module.exports = { version, H };
  }

  else {
    root.hypertag = { version, H };
    if (!('H' in root)) root = H;
  }

})(this || self || window);
