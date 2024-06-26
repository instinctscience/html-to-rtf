var alignmentReferenceList = [
  { name: 'center',   reference: '\\qc' },
  { name: 'left',     reference: '\\ql' },
  { name: 'right',    reference: '\\qr' },
  { name: 'justify',  reference: '\\qj' }
];

class Alignment {
  static getRtfAlignmentReference(propertyName) {
    let alignmentReference = undefined;
    alignmentReferenceList.forEach(value => {
      if(value.name == propertyName.trim())
        alignmentReference = value.reference;
    });
    return alignmentReference;
  }
}
export default Alignment;