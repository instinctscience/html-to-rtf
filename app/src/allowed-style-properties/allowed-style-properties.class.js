import StyleProperties from './style-properties.module.js';

class AllowedStyleProperties {
  static isTagAllowed(propertyName) {
    let isAllowed = false;
    for(let i = 0; i < StyleProperties.length; i++) {
      if(StyleProperties[i].propertyName == propertyName)
        return (StyleProperties[i].allowed == true) ? true : false;
    }
    return isAllowed;
  }

  static getAllowedTags() {
    let allowedTags = [];
    StyleProperties.forEach((value) => {
      if(value.allowed)
        allowedTags.push(value);
    });
    return allowedTags;
  }
}
export default AllowedStyleProperties;


