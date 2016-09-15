/** @test {Sample} */
describe('sample', () => {

  /** @test {Sample#say} */
  it('Hellow World', () => {
    const sample = new Sample();
    expect(sample.say()).toEqual('Hellow World');
  });

});

// describe('click', () => {
//
//   beforeEach(() => {
//     document.body.innerHTML = window.__html__['htdocs/index.html'];
//   });
//
//   it('click-1', () => {
//     const $btn = document.getElementsByTagName('button')[0];
//     const $txt = document.getElementsByClassName('txt')[0];
//     $btn.dispatchEvent(new Event('click'));
//     $btn.addEventListener('click', () => {
//       expect($txt.text()).toEqual('ok');
//     }, false);
//   });
//
// });
