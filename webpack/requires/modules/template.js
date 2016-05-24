/**
 * Template
 * @class
 */
class Template {

  /**
   * @instance
   */
  constructor() {
    const $tmp_    = document.getElementsByClassName('template')[0];
    const $result_ = document.getElementsByClassName('result')[0];
    const tmp_     = _.template($tmp_.innerHTML);
    const obj_ = {
      data: [
        { class: 'class1', name: 'taro',   age: 25, },
        { class: 'class2', name: 'jiro',   age: 18, },
        { class: 'class3', name: 'saburo', age: 15, },
      ]
    };
    $result_.append(tmp_(obj));
  }

}

/**
 * class exports
 */
module.exports = Template;
