/**
 * hypertag - v0.0.4
 * 
 * dependency: systemjs
 */
 
 (global => {

  const isNode = 'undefined' !== typeof(process) && process.versions && process.versions.node
  const isTag = a => a.name && a.props && a.childs
  const isProps = a => 'object' == typeof(a) && !(Array.isArray(a) || (isTag(a)))
  const existProps = (a, ...b) => Array.isArray(a) && a.length && isProps(a[0]) && b.length == b.filter(e => e in a[0]).length
  
  class Tag {
    
    constructor(name, ...childs) {
      [this.name, this.props, this.childs] = [name, isProps(childs[0]) ? childs.shift() : {}, childs]
      this.props['class'] = (a => new Set(a.split(' ').filter(e=>e)))(this.props['class'] || '')
    }
    
    setProps(k, v) {
      'class' == k ? this.addClass([v]) : (this.props[k] = v)
    }

    delProps(k) {
      if (k in this.props) delete this.props[k];
    }

    addClass(...a) {
      a.forEach(b=>b.split(' ').filter(e=>e).forEach(e=>this.props['class'].add(e)));
    }

    delClass(...a) {
      a.forEach(b=>b.split(' ').filter(e=>e).forEach(e=>this.props['class'].delete(e)));
    }

    toString() {
      let [name, childs, props] = [this.name, this.childs, '']

      for (let key in this.props) {

        let [prop, val] = [this.props[key]] 
        if ('class' == key) {
          if (!(prop.size)) continue
          val = [...prop].join(' ')
        }
        else val = prop

        let isBoolean = 'boolean' == typeof(val)
        if (!isBoolean || val) {
          props = `${props} ${key}`
          if (isBoolean) continue
        }

        props = `${props}="${val}"`
      }

      return (([b, c]) => `<${b}${props}${c}>`)((a => '/' == a.slice(-1) ? [a.slice(0, -1), ''] : [a, `>${childs.join('')}</${a}`])(name))
    }

  }

  class Input extends Tag {
    
    constructor(props) {
      super('input/', props)
    }

  }

  class Label extends Tag {
    
    constructor(label = 'label', ...args) {

      if (existProps(args)) {
        args.unshift(label);
        [args[0], args[1]] = [args[1], args[0]];
      }
      else args.unshift(label);

      super('label', ...args)
    }

  }

  const h = (...a) => new Tag(...a)
  h.input = a => new Input(a)
  h.label = (b, ...a) => new Label(b, ...a)

  console.log(isNode);

  if (isNode) module.exports = h;
  else define([], () => h)

})(this);

  