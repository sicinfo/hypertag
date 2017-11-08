/**
 * hypertag - v0.0.4
 * 
 * dependency: systemjs
 */
 
 (function(global, isNode, isProps) {

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




        
        
        
        
    //     (a, c) => b => b)('/' == a.slice(-1)
    
    
    
    // )
      
      
      
    //   a ? b.slice(0, -1) : b))(name, props)



        
        
        
        
    //     `<${e}${c}${a ? '' : `>${d}</${e}`}>`)(a ? b.slice(0, -1) : b))('/' == name.slice(-1))
      
      
      
      
      
      
      
    //   , a && d || '') => `<${a?'/' == name.slice(-1) ? `<${name.slice(0, -1)}${props}>` : `<${name}${props}>${childs.join('')}</${name}>`
    }

  }

  const h = (...a) => new Tag(...a); 

  console.log(isNode);

  if (isNode) module.exports = h;
  else define([], () => h)

}(
  this,
  // isNode
  'undefined' !== typeof(process) && process.versions && process.versions.node,
  //isProps
  a => 'object' == typeof(a) && !(Array.isArray(a) || (a.name && a.props && a.childs))
));

  