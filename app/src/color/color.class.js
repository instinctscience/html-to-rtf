const RTF_COLOR_TABLE_OPENING = '{\\colortbl ;';
const RTF_COLOR_TABLE_CLOSING = '}';
import MyString from '../string/my-string.class.js';
var colorTable = [{ amount: 0 }, []];

class Color {
  static getRtfColorTable() {
    return RTF_COLOR_TABLE_OPENING + this.getAllColorsDeclaredInColorTable() + RTF_COLOR_TABLE_CLOSING;
  }

  static getRtfReferenceColor(color) {
    if (color.includes('rgb'))
      return this.getColorInColorTable(this.getRgbValues(color));

    if(color.includes('#'))
      return this.getColorInColorTable(this.convertColorInHexToRgb(color));
      
    return undefined;
  }

  static getRgbValues(color) {
    color = color.replace(/[\])}[{(rgb:; ]/g, '');
    return color.split(',');
  }

  static convertColorInHexToRgb(hexColor) {
    let rgb = [];
    hexColor = hexColor.replace(/[#; ]/g, '');
    hexColor = (hexColor.length == 3) ? hexColor[0]+''+hexColor[0]+''+hexColor[1]+''+hexColor[1]+''+hexColor[2]+''+hexColor[2] : hexColor;
    rgb[2] = Math.pow(16, 1) * MyString.convertOneCharInHexToDec(hexColor[4]) + Math.pow(16, 0) * MyString.convertOneCharInHexToDec(hexColor[5]);
    rgb[1] = Math.pow(16, 1) * MyString.convertOneCharInHexToDec(hexColor[2]) + Math.pow(16, 0) * MyString.convertOneCharInHexToDec(hexColor[3]);
    rgb[0] = Math.pow(16, 1) * MyString.convertOneCharInHexToDec(hexColor[0]) + Math.pow(16, 0) * MyString.convertOneCharInHexToDec(hexColor[1]);
    return rgb;
  }

  static getColorInColorTable(rgb) {
    if (this.verifyIfColorExistsInColorTable(rgb))
      return this.getRtfReferenceColorInColorTable(rgb);
    else {
      this.addColorInColorTable(rgb);
      return this.getRtfReferenceColorInColorTable(rgb);
    }
  }

  static verifyIfColorExistsInColorTable(rgb) {
    let hasThisColor = false, colorsPosition = 1;
    colorTable[colorsPosition].forEach(value => {
      if (value.red == rgb[0] && value.green == rgb[1] && value.blue == rgb[2])
        hasThisColor = true;
    });
    return hasThisColor;
  }

  static addColorInColorTable(rgb) {
    let rtfReferenceColor, amountColorPosition = 0, colorsPosition = 1;
    colorTable[amountColorPosition].amount++;
    rtfReferenceColor = '\\cf' + colorTable[amountColorPosition].amount;
    colorTable[colorsPosition].push({ red: rgb[0], green: rgb[1], blue: rgb[2], reference: rtfReferenceColor });
  }

  static getRtfReferenceColorInColorTable(rgb) {
    let rtfReferenceColor;
    colorTable[1].forEach(value => {
      if (value.red == rgb[0] && value.green == rgb[1] && value.blue == rgb[2])
        rtfReferenceColor = value.reference;
    });
    return rtfReferenceColor;
  }

  static getAllColorsDeclaredInColorTable() {
    let colorTableContent = '';
    colorTable[1].forEach(value => colorTableContent += '\\red' + value.red + '\\green' + value.green + '\\blue' + value.blue + ';');
    return colorTableContent;
  }

  static cleanColorTable() {
    colorTable[0].amount = 0;
    colorTable[1] = [];
  }

  static getColorTable() {
    return colorTable;
  }
}
export default Color;