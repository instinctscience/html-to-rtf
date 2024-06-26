import should from 'should';
import Color from './color.class.js';

describe('ColorTest', () => {
  describe('getRtfReferenceColor()', () => {
    before(() => Color.cleanColorTable());
    it('RGB', () => {
      should(Color.getRtfReferenceColor('rgb(255,0,0)')).be.equal('\\cf1');
      should(Color.getRtfReferenceColor('rgb(255,0,0)')).be.equal('\\cf1');
      should(Color.getRtfReferenceColor('rgb(255,25,0)')).be.equal('\\cf2');
      should(Color.getRtfReferenceColor('rgb:(255,25,0);')).be.equal('\\cf2');
    });

    it('HEX', () => {
      should(Color.getRtfReferenceColor('#333')).be.equal('\\cf3');
      should(Color.getRtfReferenceColor('#333333')).be.equal('\\cf3');
      should(Color.getRtfReferenceColor('#eee')).be.equal('\\cf4');
      should(Color.getRtfReferenceColor('#333;')).be.equal('\\cf3');
    });
  });

  describe('getRgbValues()', () => {
    it('Should return an valid rgb', () => {
      should(Color.getRgbValues('rgb(255,0,0)')).be.a.Array().and.length(3);
      should(Color.getRgbValues('rgb: (255,0,0) ;')).be.a.Array().and.length(3);
    });
  });

  describe('convertColorInHexToRgb()', () => {
    it('Should return an valid rgb', () => {
      should(Color.convertColorInHexToRgb('#39c')).be.a.Array().and.length(3);
      should(Color.convertColorInHexToRgb('#39c')[0]).be.equal(51);
      should(Color.convertColorInHexToRgb('#39c')[1]).be.equal(153);
      should(Color.convertColorInHexToRgb('#39c')[2]).be.equal(204);
    });
  });

  describe('getColorInColorTable()', () => {
    before(() => Color.cleanColorTable());
    it('Should return rtf reference color', () => {
      should(Color.getColorInColorTable(['255', '188', '0'])).be.equal('\\cf1');
      should(Color.getColorInColorTable(['238', '238', '238'])).be.equal('\\cf2');
    });
  });

  describe('verifyIfColorExistsInColorTable()', () => {
    before(() => {
      Color.cleanColorTable();
      Color.addColorInColorTable(['255', '188', '0']);
    });

    it('Should return true or false', () => {
      should(Color.verifyIfColorExistsInColorTable(['0', '55', '55'])).be.Boolean().and.equal(false);
      should(Color.verifyIfColorExistsInColorTable(['255', '188', '0'])).be.Boolean().and.equal(true);
    });
  });

  describe('addColorInColorTable()', () => {
    before(() => {
      Color.cleanColorTable();
      Color.addColorInColorTable(['255', '255', '255']);
    });

    it('Add color and check if was saved', () => {
      should(Color.verifyIfColorExistsInColorTable(['255', '255', '255'])).be.Boolean().and.equal(true);
    });
  });

  describe('Color.getRtfReferenceColorInColorTable()', () => {
    before(() => {
      Color.cleanColorTable();
      Color.addColorInColorTable(['255', '0', '0']);
    });

    it('Should return a reference already declared', () => {
      should(Color.getRtfReferenceColorInColorTable(['255', '0', '0'])).be.equal('\\cf1');
    });

    it('Reference not declared', () => {
      should(Color.getRtfReferenceColorInColorTable(['177', '15', '0'])).be.undefined();
    });
  });

  describe('getAllColorsDeclaredInColorTable()', () => {
    before(() => {
      Color.cleanColorTable();
      Color.addColorInColorTable(['255', '0', '0']);
      Color.addColorInColorTable(['255', '80', '0']);
      Color.addColorInColorTable(['255', '0', '20']);
    });

    it('Should return a list with all colors declared in all tests', () => {
      should(Color.getAllColorsDeclaredInColorTable()).be.equal('\\red255\\green0\\blue0;\\red255\\green80\\blue0;\\red255\\green0\\blue20;');
    });
  });

  describe('getRtfColorTable()', () => {
    before(() => {
      Color.cleanColorTable();
      Color.addColorInColorTable(['255', '0', '0']);
      Color.addColorInColorTable(['255', '80', '0']);
      Color.addColorInColorTable(['255', '0', '20']);
    });

    it('Should return all colors declared with opening and closing tags of rtf', () => {
      should(Color.getRtfColorTable()).be.equal('{\\colortbl ;\\red255\\green0\\blue0;\\red255\\green80\\blue0;\\red255\\green0\\blue20;}');
    });
  });

  describe('cleanColorTable()', () => {
    before(() => {
      Color.addColorInColorTable([255, 88, 10]);
      Color.cleanColorTable();
    });
    it('Should return colorTable empty', () => {
      should(Color.getColorTable()[0].amount).be.equal(0);
      should(Color.getColorTable()[1].length).be.equal(0);
    });
  });

  describe('getColorTable()', () => {
    before(() => Color.cleanColorTable());
    it('Should return colorTable default', () => {
      should(Color.getColorTable()[0].amount).be.equal(0);
      should(Color.getColorTable()[1].length).be.equal(0);
    });
  });

});