class Table {
  constructor() {
    this.rtfReferenceRow = '\\clbrdrt\\brdrw15\\brdrs\\clbrdrl\\brdrw15\\brdrs\\clbrdrb\\brdrw15\\brdrs\\clbrdrr\\brdrw15\\brdrs\\cellx';
    this.amountOfColumns = 0;
    this.defaultLengthOfPageInTwips = 8503;
  }

  setAmountOfColumns(amountOfColumns) {
    this.amountOfColumns = amountOfColumns;
  }

  getAmountOfColumns() {
    return this.amountOfColumns;
  }

  getCellLength() {
    return Math.floor(this.defaultLengthOfPageInTwips/parseInt(this.amountOfColumns));
  }

  getRtfReferenceRow() {
    return this.rtfReferenceRow;
  }

  buildCellsLengthOfEachColumn() {
    let cellGroup = '';
    for(let columnNumber = 0; columnNumber < this.amountOfColumns; columnNumber++)
      cellGroup += this.rtfReferenceRow + (this.getCellLength() * columnNumber + this.getCellLength());
    return cellGroup;
  }
}
export default Table;