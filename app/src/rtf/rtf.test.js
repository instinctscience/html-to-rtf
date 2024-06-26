import should from "should";
import Rtf from "./rtf.class.js";
import Color from "../color/color.class.js";

describe("RtfTest", () => {
  it("convertHtmlToRtf()", () => {
    var html = `
      <html>
        <head>
          <style>
            .test {
              color: rgb(20, 20, 20);
              background:#333;
            }
          </style>
        </head>
        <body>
        <div id="content">
          <p style="color:#333; margin:5px;" class="test" align="center">texto de p<b>negrito <i>italico com  negrito</i>texto final b</b><i>italico</i>texto final de p</p>
          <p style="color:rgb(255,0,0);" align="right">paragrafo vermelho => right with tag</p>
          <p style="color:rgb(0,0,255); text-align:center;">paragrafo blue => center with style</p>
          <table>
              <tbody>
                <tr>
                  <td>
                    coluna1
                  </td>
                  <td>
                    coluna2
                  </td>
                  <td>
                    coluna3
                  </td>
                  <td>
                    coluna4
                  </td>
                </tr>
                <tr>
                  <td>conteudo1</td>
                  <td>conteudo2<br></td>
                  <td>conteudo3<br></td>
                  <td>conteudo1<br></td>
                </tr>
              </tbody>
            </table>
        </div>
        </body>
      </html>`;

    // let rtf = new Rtf();
    // let rtfTest = fs.readFileSync('C:/Users/ozires.filho/Desktop/html-to-rtf-serizo/app/src/rtf/rtf-test.rtf', 'utf8');

    // should(rtf.convertHtmlToRtf(html)).be.equal(rtfTest);
  });

  it("buildRtf()", () => {
    let rtf = new Rtf();

    Color.cleanColorTable();
    rtf.addOpeningTagInRtfCode("b");
    rtf.addContentOfTagInRtfCode("test test test test");
    rtf.addClosingFatherTagInRtfCode("b");

    should(rtf.buildRtf()).be.equal(
      "{\\rtf1\\ansi\\deff0{\\fonttbl {\\f0\\fnil\\fcharset0 Calibri;}{\\f1\\fnil\\fcharset2 Symbol;}}{\\colortbl ;}{\\b test test test test }}"
    );
  });

  it("getRtfContentReferences()", () => {
    let rtf = new Rtf();

    rtf.addOpeningTagInRtfCode("b");
    rtf.addContentOfTagInRtfCode("test test test test");
    rtf.addClosingFatherTagInRtfCode("b");

    should(rtf.getRtfContentReferences()).be.equal(
      "{\\b test test test test }"
    );
  });

  it("getAmountOfColumnThroughOfFirstChildOfTbodyTag()", () => {
    let rtf = new Rtf();
    let tableChildren = [
      { name: "thead" },
      {
        name: "tbody",
        children: [
          {
            type: "tr",
            children: [
              { type: "tag" },
              { type: "tag" },
              { type: "tag" },
              { type: "text" }
            ]
          }
        ]
      }
    ];

    should(
      rtf.getAmountOfColumnThroughOfFirstChildOfTbodyTag(tableChildren)
    ).be.equal(3);
  });

  it("ifExistsAttributesAddAllReferencesInRtfCode()", () => {
    let rtf = new Rtf();
    let atributes = {};

    atributes.style =
      "background: #333; color: #333; margin: 5px; text-align: center; padding: 2px;";
    rtf.ifExistsAttributesAddAllReferencesInRtfCode(atributes);

    should(rtf.getRtfContentReferences()).be.equal("\\cf1\\qc");
  });

  it("addReferenceTagInRtfCode()", () => {
    let rtf = new Rtf();

    rtf.addOpeningTagInRtfCode("ll");
    rtf.addClosingFatherTagInRtfCode("ll");
    rtf.addOpeningTagInRtfCode("dd");
    rtf.addClosingFatherTagInRtfCode("dd");
    rtf.addOpeningTagInRtfCode("form");
    rtf.addClosingFatherTagInRtfCode("form");
    should(rtf.rtfContentReferences).be.length(0);
  });

  it("addOpeningTagInRtfCode()", () => {
    let rtf = new Rtf();

    rtf.addOpeningTagInRtfCode("p");
    should(rtf.rtfContentReferences[0].content).be.equal("{\\pard");
    should(rtf.rtfContentReferences[0].tag).be.true();
  });

  it("addClosingFatherTagInRtfCode()", () => {
    let rtf = new Rtf();

    rtf.addClosingFatherTagInRtfCode("p");
    should(rtf.rtfContentReferences[0].content).be.equal("\\sb70\\par}");
    should(rtf.rtfContentReferences[0].tag).be.true();
  });

  it("addContentOfTagInRtfCode()", () => {
    let rtf = new Rtf();

    rtf.addContentOfTagInRtfCode("string of test");
    should(rtf.rtfContentReferences[0].content).be.equal(" string of test ");
    should(rtf.rtfContentReferences[0].tag).be.false();

    rtf.addContentOfTagInRtfCode("string \nof test\t");
    should(rtf.rtfContentReferences[1].content).be.equal(" string of test ");
    should(rtf.rtfContentReferences[1].tag).be.false();
  });

  it("addSpaceAroundString()", () => {
    let rtf = new Rtf();
    should(rtf.addSpaceAroundString("string of test")).be.equal(
      " string of test "
    );
  });
});
