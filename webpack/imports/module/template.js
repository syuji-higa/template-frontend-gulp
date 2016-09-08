/**
 * Template
 * @class
 */
class Template {

  /**
   * @instance
   */
  constructor() {
    const _$tmp    = document.getElementsByClassName('template')[0];
    const _$result = document.getElementsByClassName('result')[0];
    const _tmp     = _.template(_$tmp.innerHTML);
    const _obj = {
      data: [
        { class: 'class1', name: 'taro',   age: 25, },
        { class: 'class2', name: 'jiro',   age: 18, },
        { class: 'class3', name: 'saburo', age: 15, },
      ]
    };
    _$result.append(_tmp(_obj));
  }

}

/**
 * class export
 */
export default Template;
