/**
 * hypertag - v0.6.0
 * 
 * dependency: systemjs
 * 
 * [0.3.0] inclui tags personalizada para vuejs
 */

((root, h) => {

  const isNode = 'undefined' !== typeof (process) && process.versions && process.versions.node
  const isSystemjs = 'undefined' !== typeof (define);

  if (isNode) module.exports = h(require('./hypertag'));

  else if (isSystemjs) define(['hypertag'], hypertag => h(hypertag));

})(this, Hypertag => {

  class Tag extends Hypertag.Tag {

    constructor(tagName, ...childs) {
      if (Hypertag.existProps(childs, 'tagName')) {
        tagName = childs[0].tagName;
        delete childs[0].tagName;
      }
      super(tagName, ...childs)
    }

  }

  class Input extends Hypertag.Tag {
    
    constructor(model, props) {
      super('input/', props);
      this.setProps({'v-model': model, 'lazy': true});
    }

    change(arg) {
      this.setProps({'@change': arg})
      return this;
    }

  }

  return {
    Tag, Input,
    'h': (...a) => new Tag(...a),
    'input': (model, props) => new Input(model, props)
  }
});

