/**
 * hypertag - v0.0.4
 * 
*/

((global, h) => {

  const isNode = 'undefined' !== typeof (process) && process.versions && process.versions.node
  const isSystemjs = 'undefined' !== typeof (define);

  if (isNode) module.exports = h;
  else if (isSystemjs) define([], () => h);
  else {
    global.hypertag = h;
    if (!('h' in global)) global = h;
  }

})(this, ((global) => {

  const isTag = a => a.name && a.props && a.childs
  const isProps = a => 'object' == typeof (a) && !(Array.isArray(a) || (isTag(a)))
  const existProps = (a, ...b) => Array.isArray(a) && a.length && isProps(a[0]) && b.length == b.some(e => e in a[0]);

  class Tag {

    constructor(name, ...childs) {
      this.name = name;
      this.props = isProps(childs[0]) ? childs.shift() : {};
      this.childs = childs;
      this.props['class'] = (a => new Set(a.split(' ').filter(e => e)))(this.props['class'] || '');

      this.props['style'] = (a => {
        const o = {};
        a.forEach(e => {
          let [k, v] = e.split(':');
          o[`${k.replace(/ /g, '')}`] = v.trim();
        })
        return o;
      })('style' in this.props ? this.props['style'].split(';').filter(e => e) : []);
    }

    setProps(a) {
      Object.keys(a).forEach(k=>{
        if ('class' == k) this.addClass([a[k]]);
        else if ('style' == k) this.addStyle(a[k]);
        else this.props[k] = a[k];  
      })
      return this;
    }

    delProps(k) {
      if (k in this.props) delete this.props[k];
      return this;
    }

    addClass(...a) {
      a.forEach(b => b.split(' ').filter(e => e).forEach(e => this.props['class'].add(e)));
      return this;
    }

    delClass(...a) {
      a.forEach(b => b.split(' ').filter(e => e).forEach(e => this.props['class'].delete(e)));
      return this;
    }

    addStyle(a) {
      Object.keys(a).forEach(k => this.props['style'][k] = a[k]);
      return this;
    }

    delStyle(k) {
      delete this.props['style'][k]
      return this;
    }

    toString() {
      let [name, childs, props] = [this.name, this.childs, '']

      for (let key in this.props) {

        let [prop, val] = [this.props[key]]

        if ('class' == key) {
          if (!(prop.size)) continue
          val = [...prop].join(' ')
        }

        else if ('style' == key) {
          val = Object.keys(prop).map(k => `${k}:${prop[k].trim()}`).join(';')
          if (!(val)) continue
        }

        else val = prop

        let isBoolean = 'boolean' == typeof (val)
        if (!isBoolean || val) {
          props = `${props} ${key}`
          if (isBoolean) continue
        }

        props = `${props}="${val}"`
      }

      return (([b, c]) => `<${b}${props}${c}>`)((a => a.endsWith('/') ? [a.slice(0, -1), ''] : [a, `>${childs.join('')}</${a}`])(name))
    }

  }

  const h = (...args) => new Tag(...args)

  return {
    Tag, isTag, isProps, existProps, h,
    'input': (a) => new Tag('input/', a)
  };

})(this));

