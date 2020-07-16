export default {
  _render() {
    return this.renderLabel(this.label).then(label => label.addClass('anchor'));
  },

  setup() {
    if (this.textValue === '^') {
      this.label = '开始行位置';
    } else {
      this.label = '结束行位置';
    }
  }
};
