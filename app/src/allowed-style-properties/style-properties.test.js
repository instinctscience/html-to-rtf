import should from 'should';
import StyleProperties from './style-properties.module.js';

describe('StylePropertiesTest', () => {
  it('Length of module', () => {
    should(StyleProperties.length).be.equal(4);
  });
  
  StyleProperties.forEach(element => {
    if(element.propertyName == 'color')
      it('color', () => should(element.allowed).be.true());

    else if(element.propertyName == 'font-size')
      it('font-size', () => should(element.allowed).be.true());

    else if(element.propertyName == 'text-align')
      it('text-align', () => should(element.allowed).be.true());

    else if(element.propertyName == 'background')
      it('background', () => should(element.allowed).be.false());
  });
});