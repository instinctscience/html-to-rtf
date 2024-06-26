const FONT_SIZE_RTF_REFERENCE = '\\fs';
const ONE_PIXEL_IN_POINT = 0.75;

class FontSize {
  static getRtfFontSizeReference(value) {
    if(value.includes('px'))
      return this.getFontSizeReferenceInPx(value);
      
    return undefined;
  }

  static getFontSizeReferenceInPx(valueInPixel) {
    return FONT_SIZE_RTF_REFERENCE + Math.trunc(parseFloat(valueInPixel) * ONE_PIXEL_IN_POINT);
  }
}
export default FontSize;