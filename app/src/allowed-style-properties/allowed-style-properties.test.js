import should from 'should';
import AllowedStyleProperties from './allowed-style-properties.class.js';

describe('AllowedStylePropertiesTest', () => {
  it('tagIsAllowed()', () => {
    should(AllowedStyleProperties.isTagAllowed('color')).be.true();
    should(AllowedStyleProperties.isTagAllowed('background')).be.false();
    should(AllowedStyleProperties.isTagAllowed('')).be.false();
  });
});