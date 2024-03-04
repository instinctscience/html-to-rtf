import should from 'should';
import AllowedHtmlTags  from './allowed-html-tags.class.js';

describe('AllowedHtmlTagsTest', () => {
  it('getRtfReferenceTag', () => {
    should(AllowedHtmlTags.getRtfReferenceTag('b')).be.equal('{\\b');
    should(AllowedHtmlTags.getRtfReferenceTag('/b')).be.equal('}');
    should(AllowedHtmlTags.getRtfReferenceTag('')).be.undefined();
    should(AllowedHtmlTags.getRtfReferenceTag('notExists')).be.undefined();
    should(AllowedHtmlTags.getRtfReferenceTag('/notExists')).be.undefined();
  });
});