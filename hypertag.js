/**
 * hypertag - v0.0.4
 * 
*/
 
((global, h) => {

  const isNode = 'undefined' !== typeof(process) && process.versions && process.versions.node
  const isSystemjs = 'undefined' !== typeof(define);

  if (isNode) module.exports = h;
  else if (isSystemjs) define([], () => h);
  else {
    global.hypertag = h;
    if (!('h' in global)) global = h;
  }

})(this, ((global) => {

  const isTag = a => a.name && a.props && a.childs
  const isProps = a => 'object' == typeof(a) && !(Array.isArray(a) || (isTag(a)))
  const existProps = (a, ...b) => Array.isArray(a) && a.length && isProps(a[0]) && b.length == b.some(e => e in a[0]);

  class Tag {
    
    constructor(name, ...childs) {
      this.name = name;
      this.props = isProps(childs[0]) ? childs.shift() : {};
      this.childs = childs;
      this.props['class'] = (a => new Set(a.split(' ').filter(e=>e)))(this.props['class'] || '');
      
      this.props['style'] = (a => new Set(a.map(e => {
        let [k, v] = e.split(':');
        return `${k.replace(/ /g, '')}:${v}`;
      })))('style' in this.props ? this.props['style'].split(';').filter(e=>e) : []);
    }

    setProps(k, v) {
      if ('class' == k) this.addClass([v]);
      else this.props[k] = v;
      return this;
    }

    delProps(k) {
      if (k in this.props) delete this.props[k];
      return this;
    }

    addClass(...a) {
      a.forEach(b=>b.split(' ').filter(e=>e).forEach(e=>this.props['class'].add(e)));
      return this;
    }

    delClass(...a) {
      a.forEach(b=>b.split(' ').filter(e=>e).forEach(e=>this.props['class'].delete(e)));
      return this;
    }

    addStyle(k, v) {
      this.props['style'].add(`${k.replace(/ /g, '')}:${v}`);
      return this;
    }

    delStyle(k) {
      [...this.props['style']].some(a => a.startsWith(`${k}:`) && this.props['style'].delete(a));
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
          if (!(prop.size)) continue
          val = [...prop].join(';')
        }

        else val = prop

        let isBoolean = 'boolean' == typeof(val)
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
  h.isTag = isTag;
  h.isProps = isProps;
  h.existProps = existProps;

  return h;

})(this));

  