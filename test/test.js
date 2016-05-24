describe('string test', () => {

  it('string-1', () => {
    expect('ok').toEqual('ok');
  });

  it('string-2', () => {
    expect('ok2').toEqual('ok2');
  });

});

describe('click test', () => {

  beforeEach(() => {
    document.body.innerHTML = window.__html__['htdocs/index.html'];
  });

  it('click-1', () => {
    const $btn = document.getElementsByTagName('button')[0];
    const $txt = document.getElementsByClassName('txt')[0];
    $btn.dispatchEvent(new Event('click'));
    $btn.addEventListener('click', () => {
      expect($txt.text()).toEqual('ok');
    }, false);
  });

});
