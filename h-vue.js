/**
 * hypertag - v0.6.0
 * 
 * dependency: systemjs
 * 
 * [0.6.0] inclui tags personalizada para vuejs
 */

define([], () => function(cb) {
  
  const cx = this;
  
  return function(h) {

    return cb((a, ...c) => {
      
      let b = (
        c.length &&
        'object' == typeof (c[0]) &&
        void 0 == c[0].tag &&
        void 0 == c[0].data &&
        void 0 == c[0].children
      ) ? c.shift() : {};
      
      return h(a, b, c);
      
    }, cx);
    
  };
  
});