/**
 * hypertag - v0.0.1
 * 
 * dependency: systemjs
 */
 
define([], () => {
  
    class Tag {
      
      constructor(n, ...c) {
        this.n = n;
        this.p = '';
        this.c = c;
      }
  
      toString() {
        let n = this.n;
        let p = this.p;
        let c = this.c;
  
        return '<' + n + p + '>' + c.join('') + '</' + n + '>';
      }
  
    }
  
    return (...a) => new Tag(...a);
  })
  