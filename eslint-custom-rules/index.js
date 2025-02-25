/**
 * https://eslint.org/docs/v8.x/extend/custom-rule-tutorial
 * https://www.mariokandut.com/how-to-write-custom-eslint-rule/
 * */
module.exports = {
  rules: {
    'required-column-comment': require('./rules/required-column-comment'),
  },
};
