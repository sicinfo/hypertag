/**
 * hypertag - v0.0.3
 * 
 * dependency: systemjs
 */
 
 (function(global, isNode) {

  const isBool = a => 'boolean' == typeof(a);

  class Tag {
    
    constructor(n, ...c) {
      this.name = n;
      this.props = 'object' == typeof(c[0]) &&
        !(Array.isArray(c[0]) || (c[0].name && c[0].props && c[0].childs)) &&
        c.shift() || {};
      this.props['class'] = (function(a) {
        const b = new Set();
        a.split(' ').filter(b=>b).forEach(e=>b.add(e));
        return b;
      }(this.props['class'] || ''));
      this.childs = c;
    }

    setProps(k, v) {
      this.props[k] = v;
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
      let n = this.name;
      let p = '';
      let c = this.childs;

      for (let k in this.props) {
        let v;
        if ('class' == k) {
          if (!(this.props[k].size)) continue;
          v = [...this.props[k]].join(' ');
        }
        else v = this.props[k];

        let isBoolean = isBool(v);
        if (!isBoolean || v) {
          p = p + ' ' + k;
          if (isBoolean) continue;
        }

        p = p + '="' + v + '"';
      }

      if ('/' == n.slice(-1)) return '<' + n.slice(0, -1) + p + '>';
      return '<' + n + p + '>' + c.join('') + '</' + n + '>';
    }

  }

  const h = (...a) => new Tag(...a); 

  console.log(isNode);

  if (isNode) module.exports = h;
  else define([], () => h)

}(
  this,
  // isNode
  'undefined' !== typeof(process) && process.versions && process.versions.node
));

  