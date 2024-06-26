import should from 'should';
import Table from './table.class.js';

describe('TableTest', () => {
  it('setAmountOfColumns()', () => {
    let _Table = new Table();
    _Table.setAmountOfColumns(4);
    should(_Table.getAmountOfColumns()).be.equal(4);
  });

  it('getAmountOfColumns()', () => {
    let _Table = new Table();
    should(_Table.getAmountOfColumns()).be.Number();
  });

  it('getCellLength()', () => {
    let _Table = new Table();
    _Table.setAmountOfColumns(5);
    should(_Table.getCellLength()).be.equal(1700);
  });

  it('getRtfReferenceRow()', () => {
    let _Table = new Table();
    should(_Table.getRtfReferenceRow()).be.equal('\\clbrdrt\\brdrw15\\brdrs\\clbrdrl\\brdrw15\\brdrs\\clbrdrb\\brdrw15\\brdrs\\clbrdrr\\brdrw15\\brdrs\\cellx');
  });

  it('buildCellsLengthOfEachColumn()', () => {
    let _Table = new Table();
    _Table.setAmountOfColumns(2);
    should(_Table.buildCellsLengthOfEachColumn()).be.equal('\\clbrdrt\\brdrw15\\brdrs\\clbrdrl\\brdrw15\\brdrs\\clbrdrb\\brdrw15\\brdrs\\clbrdrr\\brdrw15\\brdrs\\cellx4251\\clbrdrt\\brdrw15\\brdrs\\clbrdrl\\brdrw15\\brdrs\\clbrdrb\\brdrw15\\brdrs\\clbrdrr\\brdrw15\\brdrs\\cellx8502');
  });
});