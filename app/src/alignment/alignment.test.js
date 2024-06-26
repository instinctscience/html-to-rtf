import should from 'should';
import Alignment from './alignment.class.js';

describe('AlignmentTest', function() {
  describe('getRtfAlignmentReference()', () => {
    it('Center', () => should(Alignment.getRtfAlignmentReference('center')).have.be.equal('\\qc'));
    it('Left', () => should(Alignment.getRtfAlignmentReference('left')).have.be.equal('\\ql'));
    it('Right', () => should(Alignment.getRtfAlignmentReference('right')).have.be.equal('\\qr'));
    it('Justify', () => should(Alignment.getRtfAlignmentReference('justify')).have.be.equal('\\qj'));
    it('Not exists', () => should(Alignment.getRtfAlignmentReference('')).have.be.undefined());
  });
});