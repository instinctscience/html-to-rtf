const ju = {
  xml: !1,
  decodeEntities: !0
}, fc = {
  _useHtmlParser2: !0,
  xmlMode: !0
};
function Cu(t) {
  return t != null && t.xml ? typeof t.xml == "boolean" ? fc : { ...fc, ...t.xml } : t ?? void 0;
}
var Kt;
(function(t) {
  t.Root = "root", t.Text = "text", t.Directive = "directive", t.Comment = "comment", t.Script = "script", t.Style = "style", t.Tag = "tag", t.CDATA = "cdata", t.Doctype = "doctype";
})(Kt || (Kt = {}));
function z0(t) {
  return t.type === Kt.Tag || t.type === Kt.Script || t.type === Kt.Style;
}
const J0 = Kt.Root, Z0 = Kt.Text, tp = Kt.Directive, ep = Kt.Comment, np = Kt.Script, rp = Kt.Style, sp = Kt.Tag, ip = Kt.CDATA, ap = Kt.Doctype;
class Xf {
  constructor() {
    this.parent = null, this.prev = null, this.next = null, this.startIndex = null, this.endIndex = null;
  }
  // Read-write aliases for properties
  /**
   * Same as {@link parent}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get parentNode() {
    return this.parent;
  }
  set parentNode(e) {
    this.parent = e;
  }
  /**
   * Same as {@link prev}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get previousSibling() {
    return this.prev;
  }
  set previousSibling(e) {
    this.prev = e;
  }
  /**
   * Same as {@link next}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get nextSibling() {
    return this.next;
  }
  set nextSibling(e) {
    this.next = e;
  }
  /**
   * Clone this node, and optionally its children.
   *
   * @param recursive Clone child nodes as well.
   * @returns A clone of the node.
   */
  cloneNode(e = !1) {
    return ta(this, e);
  }
}
class Wu extends Xf {
  /**
   * @param data The content of the data node
   */
  constructor(e) {
    super(), this.data = e;
  }
  /**
   * Same as {@link data}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get nodeValue() {
    return this.data;
  }
  set nodeValue(e) {
    this.data = e;
  }
}
class li extends Wu {
  constructor() {
    super(...arguments), this.type = Kt.Text;
  }
  get nodeType() {
    return 3;
  }
}
class Qu extends Wu {
  constructor() {
    super(...arguments), this.type = Kt.Comment;
  }
  get nodeType() {
    return 8;
  }
}
class Ku extends Wu {
  constructor(e, n) {
    super(n), this.name = e, this.type = Kt.Directive;
  }
  get nodeType() {
    return 1;
  }
}
class Xu extends Xf {
  /**
   * @param children Children of the node. Only certain node types can have children.
   */
  constructor(e) {
    super(), this.children = e;
  }
  // Aliases
  /** First child of the node. */
  get firstChild() {
    var e;
    return (e = this.children[0]) !== null && e !== void 0 ? e : null;
  }
  /** Last child of the node. */
  get lastChild() {
    return this.children.length > 0 ? this.children[this.children.length - 1] : null;
  }
  /**
   * Same as {@link children}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get childNodes() {
    return this.children;
  }
  set childNodes(e) {
    this.children = e;
  }
}
class zf extends Xu {
  constructor() {
    super(...arguments), this.type = Kt.CDATA;
  }
  get nodeType() {
    return 4;
  }
}
class bs extends Xu {
  constructor() {
    super(...arguments), this.type = Kt.Root;
  }
  get nodeType() {
    return 9;
  }
}
let zu = class extends Xu {
  /**
   * @param name Name of the tag, eg. `div`, `span`.
   * @param attribs Object mapping attribute names to attribute values.
   * @param children Children of the node.
   */
  constructor(e, n, r = [], a = e === "script" ? Kt.Script : e === "style" ? Kt.Style : Kt.Tag) {
    super(r), this.name = e, this.attribs = n, this.type = a;
  }
  get nodeType() {
    return 1;
  }
  // DOM Level 1 aliases
  /**
   * Same as {@link name}.
   * [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
   */
  get tagName() {
    return this.name;
  }
  set tagName(e) {
    this.name = e;
  }
  get attributes() {
    return Object.keys(this.attribs).map((e) => {
      var n, r;
      return {
        name: e,
        value: this.attribs[e],
        namespace: (n = this["x-attribsNamespace"]) === null || n === void 0 ? void 0 : n[e],
        prefix: (r = this["x-attribsPrefix"]) === null || r === void 0 ? void 0 : r[e]
      };
    });
  }
};
function It(t) {
  return z0(t);
}
function _a(t) {
  return t.type === Kt.CDATA;
}
function Ur(t) {
  return t.type === Kt.Text;
}
function Ta(t) {
  return t.type === Kt.Comment;
}
function Iu(t) {
  return t.type === Kt.Directive;
}
function As(t) {
  return t.type === Kt.Root;
}
function Ze(t) {
  return Object.prototype.hasOwnProperty.call(t, "children");
}
function ta(t, e = !1) {
  let n;
  if (Ur(t))
    n = new li(t.data);
  else if (Ta(t))
    n = new Qu(t.data);
  else if (It(t)) {
    const r = e ? ja(t.children) : [], a = new zu(t.name, { ...t.attribs }, r);
    r.forEach((u) => u.parent = a), t.namespace != null && (a.namespace = t.namespace), t["x-attribsNamespace"] && (a["x-attribsNamespace"] = { ...t["x-attribsNamespace"] }), t["x-attribsPrefix"] && (a["x-attribsPrefix"] = { ...t["x-attribsPrefix"] }), n = a;
  } else if (_a(t)) {
    const r = e ? ja(t.children) : [], a = new zf(r);
    r.forEach((u) => u.parent = a), n = a;
  } else if (As(t)) {
    const r = e ? ja(t.children) : [], a = new bs(r);
    r.forEach((u) => u.parent = a), t["x-mode"] && (a["x-mode"] = t["x-mode"]), n = a;
  } else if (Iu(t)) {
    const r = new Ku(t.name, t.data);
    t["x-name"] != null && (r["x-name"] = t["x-name"], r["x-publicId"] = t["x-publicId"], r["x-systemId"] = t["x-systemId"]), n = r;
  } else
    throw new Error(`Not implemented yet: ${t.type}`);
  return n.startIndex = t.startIndex, n.endIndex = t.endIndex, t.sourceCodeLocation != null && (n.sourceCodeLocation = t.sourceCodeLocation), n;
}
function ja(t) {
  const e = t.map((n) => ta(n, !0));
  for (let n = 1; n < e.length; n++)
    e[n].prev = e[n - 1], e[n - 1].next = e[n];
  return e;
}
const lc = {
  withStartIndices: !1,
  withEndIndices: !1,
  xmlMode: !1
};
let up = class {
  /**
   * @param callback Called once parsing has completed.
   * @param options Settings for the handler.
   * @param elementCB Callback whenever a tag is closed.
   */
  constructor(e, n, r) {
    this.dom = [], this.root = new bs(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null, typeof n == "function" && (r = n, n = lc), typeof e == "object" && (n = e, e = void 0), this.callback = e ?? null, this.options = n ?? lc, this.elementCB = r ?? null;
  }
  onparserinit(e) {
    this.parser = e;
  }
  // Resets the handler back to starting state
  onreset() {
    this.dom = [], this.root = new bs(this.dom), this.done = !1, this.tagStack = [this.root], this.lastNode = null, this.parser = null;
  }
  // Signals the handler that parsing is done
  onend() {
    this.done || (this.done = !0, this.parser = null, this.handleCallback(null));
  }
  onerror(e) {
    this.handleCallback(e);
  }
  onclosetag() {
    this.lastNode = null;
    const e = this.tagStack.pop();
    this.options.withEndIndices && (e.endIndex = this.parser.endIndex), this.elementCB && this.elementCB(e);
  }
  onopentag(e, n) {
    const r = this.options.xmlMode ? Kt.Tag : void 0, a = new zu(e, n, void 0, r);
    this.addNode(a), this.tagStack.push(a);
  }
  ontext(e) {
    const { lastNode: n } = this;
    if (n && n.type === Kt.Text)
      n.data += e, this.options.withEndIndices && (n.endIndex = this.parser.endIndex);
    else {
      const r = new li(e);
      this.addNode(r), this.lastNode = r;
    }
  }
  oncomment(e) {
    if (this.lastNode && this.lastNode.type === Kt.Comment) {
      this.lastNode.data += e;
      return;
    }
    const n = new Qu(e);
    this.addNode(n), this.lastNode = n;
  }
  oncommentend() {
    this.lastNode = null;
  }
  oncdatastart() {
    const e = new li(""), n = new zf([e]);
    this.addNode(n), e.parent = n, this.lastNode = e;
  }
  oncdataend() {
    this.lastNode = null;
  }
  onprocessinginstruction(e, n) {
    const r = new Ku(e, n);
    this.addNode(r);
  }
  handleCallback(e) {
    if (typeof this.callback == "function")
      this.callback(e, this.dom);
    else if (e)
      throw e;
  }
  addNode(e) {
    const n = this.tagStack[this.tagStack.length - 1], r = n.children[n.children.length - 1];
    this.options.withStartIndices && (e.startIndex = this.parser.startIndex), this.options.withEndIndices && (e.endIndex = this.parser.endIndex), n.children.push(e), r && (e.prev = r, r.next = e), e.parent = n, this.lastNode = null;
  }
};
const jr = new Uint16Array(
  // prettier-ignore
  'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map((t) => t.charCodeAt(0))
), Jf = new Uint16Array(
  // prettier-ignore
  "Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map((t) => t.charCodeAt(0))
);
var Wa;
const op = /* @__PURE__ */ new Map([
  [0, 65533],
  // C1 Unicode control character reference replacements
  [128, 8364],
  [130, 8218],
  [131, 402],
  [132, 8222],
  [133, 8230],
  [134, 8224],
  [135, 8225],
  [136, 710],
  [137, 8240],
  [138, 352],
  [139, 8249],
  [140, 338],
  [142, 381],
  [145, 8216],
  [146, 8217],
  [147, 8220],
  [148, 8221],
  [149, 8226],
  [150, 8211],
  [151, 8212],
  [152, 732],
  [153, 8482],
  [154, 353],
  [155, 8250],
  [156, 339],
  [158, 382],
  [159, 376]
]), Su = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
  (Wa = String.fromCodePoint) !== null && Wa !== void 0 ? Wa : function(t) {
    let e = "";
    return t > 65535 && (t -= 65536, e += String.fromCharCode(t >>> 10 & 1023 | 55296), t = 56320 | t & 1023), e += String.fromCharCode(t), e;
  }
);
function Zf(t) {
  var e;
  return t >= 55296 && t <= 57343 || t > 1114111 ? 65533 : (e = op.get(t)) !== null && e !== void 0 ? e : t;
}
var Je;
(function(t) {
  t[t.NUM = 35] = "NUM", t[t.SEMI = 59] = "SEMI", t[t.EQUALS = 61] = "EQUALS", t[t.ZERO = 48] = "ZERO", t[t.NINE = 57] = "NINE", t[t.LOWER_A = 97] = "LOWER_A", t[t.LOWER_F = 102] = "LOWER_F", t[t.LOWER_X = 120] = "LOWER_X", t[t.LOWER_Z = 122] = "LOWER_Z", t[t.UPPER_A = 65] = "UPPER_A", t[t.UPPER_F = 70] = "UPPER_F", t[t.UPPER_Z = 90] = "UPPER_Z";
})(Je || (Je = {}));
const cp = 32;
var jn;
(function(t) {
  t[t.VALUE_LENGTH = 49152] = "VALUE_LENGTH", t[t.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", t[t.JUMP_TABLE = 127] = "JUMP_TABLE";
})(jn || (jn = {}));
function Nu(t) {
  return t >= Je.ZERO && t <= Je.NINE;
}
function fp(t) {
  return t >= Je.UPPER_A && t <= Je.UPPER_F || t >= Je.LOWER_A && t <= Je.LOWER_F;
}
function lp(t) {
  return t >= Je.UPPER_A && t <= Je.UPPER_Z || t >= Je.LOWER_A && t <= Je.LOWER_Z || Nu(t);
}
function hp(t) {
  return t === Je.EQUALS || lp(t);
}
var ze;
(function(t) {
  t[t.EntityStart = 0] = "EntityStart", t[t.NumericStart = 1] = "NumericStart", t[t.NumericDecimal = 2] = "NumericDecimal", t[t.NumericHex = 3] = "NumericHex", t[t.NamedEntity = 4] = "NamedEntity";
})(ze || (ze = {}));
var hs;
(function(t) {
  t[t.Legacy = 0] = "Legacy", t[t.Strict = 1] = "Strict", t[t.Attribute = 2] = "Attribute";
})(hs || (hs = {}));
class dp {
  constructor(e, n, r) {
    this.decodeTree = e, this.emitCodePoint = n, this.errors = r, this.state = ze.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = hs.Strict;
  }
  /** Resets the instance to make it reusable. */
  startEntity(e) {
    this.decodeMode = e, this.state = ze.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1;
  }
  /**
   * Write an entity to the decoder. This can be called multiple times with partial entities.
   * If the entity is incomplete, the decoder will return -1.
   *
   * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
   * entity is incomplete, and resume when the next string is written.
   *
   * @param string The string containing the entity (or a continuation of the entity).
   * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  write(e, n) {
    switch (this.state) {
      case ze.EntityStart:
        return e.charCodeAt(n) === Je.NUM ? (this.state = ze.NumericStart, this.consumed += 1, this.stateNumericStart(e, n + 1)) : (this.state = ze.NamedEntity, this.stateNamedEntity(e, n));
      case ze.NumericStart:
        return this.stateNumericStart(e, n);
      case ze.NumericDecimal:
        return this.stateNumericDecimal(e, n);
      case ze.NumericHex:
        return this.stateNumericHex(e, n);
      case ze.NamedEntity:
        return this.stateNamedEntity(e, n);
    }
  }
  /**
   * Switches between the numeric decimal and hexadecimal states.
   *
   * Equivalent to the `Numeric character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericStart(e, n) {
    return n >= e.length ? -1 : (e.charCodeAt(n) | cp) === Je.LOWER_X ? (this.state = ze.NumericHex, this.consumed += 1, this.stateNumericHex(e, n + 1)) : (this.state = ze.NumericDecimal, this.stateNumericDecimal(e, n));
  }
  addToNumericResult(e, n, r, a) {
    if (n !== r) {
      const u = r - n;
      this.result = this.result * Math.pow(a, u) + parseInt(e.substr(n, u), a), this.consumed += u;
    }
  }
  /**
   * Parses a hexadecimal numeric entity.
   *
   * Equivalent to the `Hexademical character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericHex(e, n) {
    const r = n;
    for (; n < e.length; ) {
      const a = e.charCodeAt(n);
      if (Nu(a) || fp(a))
        n += 1;
      else
        return this.addToNumericResult(e, r, n, 16), this.emitNumericEntity(a, 3);
    }
    return this.addToNumericResult(e, r, n, 16), -1;
  }
  /**
   * Parses a decimal numeric entity.
   *
   * Equivalent to the `Decimal character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericDecimal(e, n) {
    const r = n;
    for (; n < e.length; ) {
      const a = e.charCodeAt(n);
      if (Nu(a))
        n += 1;
      else
        return this.addToNumericResult(e, r, n, 10), this.emitNumericEntity(a, 2);
    }
    return this.addToNumericResult(e, r, n, 10), -1;
  }
  /**
   * Validate and emit a numeric entity.
   *
   * Implements the logic from the `Hexademical character reference start
   * state` and `Numeric character reference end state` in the HTML spec.
   *
   * @param lastCp The last code point of the entity. Used to see if the
   *               entity was terminated with a semicolon.
   * @param expectedLength The minimum number of characters that should be
   *                       consumed. Used to validate that at least one digit
   *                       was consumed.
   * @returns The number of characters that were consumed.
   */
  emitNumericEntity(e, n) {
    var r;
    if (this.consumed <= n)
      return (r = this.errors) === null || r === void 0 || r.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
    if (e === Je.SEMI)
      this.consumed += 1;
    else if (this.decodeMode === hs.Strict)
      return 0;
    return this.emitCodePoint(Zf(this.result), this.consumed), this.errors && (e !== Je.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
  }
  /**
   * Parses a named entity.
   *
   * Equivalent to the `Named character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNamedEntity(e, n) {
    const { decodeTree: r } = this;
    let a = r[this.treeIndex], u = (a & jn.VALUE_LENGTH) >> 14;
    for (; n < e.length; n++, this.excess++) {
      const o = e.charCodeAt(n);
      if (this.treeIndex = Ju(r, a, this.treeIndex + Math.max(1, u), o), this.treeIndex < 0)
        return this.result === 0 || // If we are parsing an attribute
        this.decodeMode === hs.Attribute && // We shouldn't have consumed any characters after the entity,
        (u === 0 || // And there should be no invalid characters.
        hp(o)) ? 0 : this.emitNotTerminatedNamedEntity();
      if (a = r[this.treeIndex], u = (a & jn.VALUE_LENGTH) >> 14, u !== 0) {
        if (o === Je.SEMI)
          return this.emitNamedEntityData(this.treeIndex, u, this.consumed + this.excess);
        this.decodeMode !== hs.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
      }
    }
    return -1;
  }
  /**
   * Emit a named entity that was not terminated with a semicolon.
   *
   * @returns The number of characters consumed.
   */
  emitNotTerminatedNamedEntity() {
    var e;
    const { result: n, decodeTree: r } = this, a = (r[n] & jn.VALUE_LENGTH) >> 14;
    return this.emitNamedEntityData(n, a, this.consumed), (e = this.errors) === null || e === void 0 || e.missingSemicolonAfterCharacterReference(), this.consumed;
  }
  /**
   * Emit a named entity.
   *
   * @param result The index of the entity in the decode tree.
   * @param valueLength The number of bytes in the entity.
   * @param consumed The number of characters consumed.
   *
   * @returns The number of characters consumed.
   */
  emitNamedEntityData(e, n, r) {
    const { decodeTree: a } = this;
    return this.emitCodePoint(n === 1 ? a[e] & ~jn.VALUE_LENGTH : a[e + 1], r), n === 3 && this.emitCodePoint(a[e + 2], r), r;
  }
  /**
   * Signal to the parser that the end of the input was reached.
   *
   * Remaining data will be emitted and relevant errors will be produced.
   *
   * @returns The number of characters consumed.
   */
  end() {
    var e;
    switch (this.state) {
      case ze.NamedEntity:
        return this.result !== 0 && (this.decodeMode !== hs.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
      case ze.NumericDecimal:
        return this.emitNumericEntity(0, 2);
      case ze.NumericHex:
        return this.emitNumericEntity(0, 3);
      case ze.NumericStart:
        return (e = this.errors) === null || e === void 0 || e.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
      case ze.EntityStart:
        return 0;
    }
  }
}
function tl(t) {
  let e = "";
  const n = new dp(t, (r) => e += Su(r));
  return function(a, u) {
    let o = 0, h = 0;
    for (; (h = a.indexOf("&", h)) >= 0; ) {
      e += a.slice(o, h), n.startEntity(u);
      const E = n.write(
        a,
        // Skip the "&"
        h + 1
      );
      if (E < 0) {
        o = h + n.end();
        break;
      }
      o = h + E, h = E === 0 ? o + 1 : o;
    }
    const m = e + a.slice(o);
    return e = "", m;
  };
}
function Ju(t, e, n, r) {
  const a = (e & jn.BRANCH_LENGTH) >> 7, u = e & jn.JUMP_TABLE;
  if (a === 0)
    return u !== 0 && r === u ? n : -1;
  if (u) {
    const m = r - u;
    return m < 0 || m >= a ? -1 : t[n + m] - 1;
  }
  let o = n, h = o + a - 1;
  for (; o <= h; ) {
    const m = o + h >>> 1, E = t[m];
    if (E < r)
      o = m + 1;
    else if (E > r)
      h = m - 1;
    else
      return t[m + a];
  }
  return -1;
}
tl(jr);
tl(Jf);
const hc = /["&'<>$\x80-\uFFFF]/g, pp = /* @__PURE__ */ new Map([
  [34, "&quot;"],
  [38, "&amp;"],
  [39, "&apos;"],
  [60, "&lt;"],
  [62, "&gt;"]
]), gp = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  String.prototype.codePointAt != null ? (t, e) => t.codePointAt(e) : (
    // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
    (t, e) => (t.charCodeAt(e) & 64512) === 55296 ? (t.charCodeAt(e) - 55296) * 1024 + t.charCodeAt(e + 1) - 56320 + 65536 : t.charCodeAt(e)
  )
);
function el(t) {
  let e = "", n = 0, r;
  for (; (r = hc.exec(t)) !== null; ) {
    const a = r.index, u = t.charCodeAt(a), o = pp.get(u);
    o !== void 0 ? (e += t.substring(n, a) + o, n = a + 1) : (e += `${t.substring(n, a)}&#x${gp(t, a).toString(16)};`, n = hc.lastIndex += +((u & 64512) === 55296));
  }
  return e + t.substr(n);
}
function nl(t, e) {
  return function(r) {
    let a, u = 0, o = "";
    for (; a = t.exec(r); )
      u !== a.index && (o += r.substring(u, a.index)), o += e.get(a[0].charCodeAt(0)), u = a.index + 1;
    return o + r.substring(u);
  };
}
const rl = nl(/["&\u00A0]/g, /* @__PURE__ */ new Map([
  [34, "&quot;"],
  [38, "&amp;"],
  [160, "&nbsp;"]
])), sl = nl(/[&<>\u00A0]/g, /* @__PURE__ */ new Map([
  [38, "&amp;"],
  [60, "&lt;"],
  [62, "&gt;"],
  [160, "&nbsp;"]
])), Ep = new Map([
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "glyphRef",
  "linearGradient",
  "radialGradient",
  "textPath"
].map((t) => [t.toLowerCase(), t])), mp = new Map([
  "definitionURL",
  "attributeName",
  "attributeType",
  "baseFrequency",
  "baseProfile",
  "calcMode",
  "clipPathUnits",
  "diffuseConstant",
  "edgeMode",
  "filterUnits",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "kernelMatrix",
  "kernelUnitLength",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "limitingConeAngle",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  "maskContentUnits",
  "maskUnits",
  "numOctaves",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "refX",
  "refY",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "specularConstant",
  "specularExponent",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stitchTiles",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textLength",
  "viewBox",
  "viewTarget",
  "xChannelSelector",
  "yChannelSelector",
  "zoomAndPan"
].map((t) => [t.toLowerCase(), t])), bp = /* @__PURE__ */ new Set([
  "style",
  "script",
  "xmp",
  "iframe",
  "noembed",
  "noframes",
  "plaintext",
  "noscript"
]);
function _p(t) {
  return t.replace(/"/g, "&quot;");
}
function Tp(t, e) {
  var n;
  if (!t)
    return;
  const r = ((n = e.encodeEntities) !== null && n !== void 0 ? n : e.decodeEntities) === !1 ? _p : e.xmlMode || e.encodeEntities !== "utf8" ? el : rl;
  return Object.keys(t).map((a) => {
    var u, o;
    const h = (u = t[a]) !== null && u !== void 0 ? u : "";
    return e.xmlMode === "foreign" && (a = (o = mp.get(a)) !== null && o !== void 0 ? o : a), !e.emptyAttrs && !e.xmlMode && h === "" ? a : `${a}="${r(h)}"`;
  }).join(" ");
}
const dc = /* @__PURE__ */ new Set([
  "area",
  "base",
  "basefont",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
function Aa(t, e = {}) {
  const n = "length" in t ? t : [t];
  let r = "";
  for (let a = 0; a < n.length; a++)
    r += Ap(n[a], e);
  return r;
}
function Ap(t, e) {
  switch (t.type) {
    case J0:
      return Aa(t.children, e);
    case ap:
    case tp:
      return Sp(t);
    case ep:
      return xp(t);
    case ip:
      return vp(t);
    case np:
    case rp:
    case sp:
      return Ip(t, e);
    case Z0:
      return Np(t, e);
  }
}
const yp = /* @__PURE__ */ new Set([
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "annotation-xml",
  "foreignObject",
  "desc",
  "title"
]), Cp = /* @__PURE__ */ new Set(["svg", "math"]);
function Ip(t, e) {
  var n;
  e.xmlMode === "foreign" && (t.name = (n = Ep.get(t.name)) !== null && n !== void 0 ? n : t.name, t.parent && yp.has(t.parent.name) && (e = { ...e, xmlMode: !1 })), !e.xmlMode && Cp.has(t.name) && (e = { ...e, xmlMode: "foreign" });
  let r = `<${t.name}`;
  const a = Tp(t.attribs, e);
  return a && (r += ` ${a}`), t.children.length === 0 && (e.xmlMode ? (
    // In XML mode or foreign mode, and user hasn't explicitly turned off self-closing tags
    e.selfClosingTags !== !1
  ) : (
    // User explicitly asked for self-closing tags, even in HTML mode
    e.selfClosingTags && dc.has(t.name)
  )) ? (e.xmlMode || (r += " "), r += "/>") : (r += ">", t.children.length > 0 && (r += Aa(t.children, e)), (e.xmlMode || !dc.has(t.name)) && (r += `</${t.name}>`)), r;
}
function Sp(t) {
  return `<${t.data}>`;
}
function Np(t, e) {
  var n;
  let r = t.data || "";
  return ((n = e.encodeEntities) !== null && n !== void 0 ? n : e.decodeEntities) !== !1 && !(!e.xmlMode && t.parent && bp.has(t.parent.name)) && (r = e.xmlMode || e.encodeEntities !== "utf8" ? el(r) : sl(r)), r;
}
function vp(t) {
  return `<![CDATA[${t.children[0].data}]]>`;
}
function xp(t) {
  return `<!--${t.data}-->`;
}
function il(t, e) {
  return Aa(t, e);
}
function Rp(t, e) {
  return Ze(t) ? t.children.map((n) => il(n, e)).join("") : "";
}
function Xi(t) {
  return Array.isArray(t) ? t.map(Xi).join("") : It(t) ? t.name === "br" ? `
` : Xi(t.children) : _a(t) ? Xi(t.children) : Ur(t) ? t.data : "";
}
function ks(t) {
  return Array.isArray(t) ? t.map(ks).join("") : Ze(t) && !Ta(t) ? ks(t.children) : Ur(t) ? t.data : "";
}
function ea(t) {
  return Array.isArray(t) ? t.map(ea).join("") : Ze(t) && (t.type === Kt.Tag || _a(t)) ? ea(t.children) : Ur(t) ? t.data : "";
}
function ya(t) {
  return Ze(t) ? t.children : [];
}
function al(t) {
  return t.parent || null;
}
function ul(t) {
  const e = al(t);
  if (e != null)
    return ya(e);
  const n = [t];
  let { prev: r, next: a } = t;
  for (; r != null; )
    n.unshift(r), { prev: r } = r;
  for (; a != null; )
    n.push(a), { next: a } = a;
  return n;
}
function Lp(t, e) {
  var n;
  return (n = t.attribs) === null || n === void 0 ? void 0 : n[e];
}
function Op(t, e) {
  return t.attribs != null && Object.prototype.hasOwnProperty.call(t.attribs, e) && t.attribs[e] != null;
}
function wp(t) {
  return t.name;
}
function Zu(t) {
  let { next: e } = t;
  for (; e !== null && !It(e); )
    ({ next: e } = e);
  return e;
}
function to(t) {
  let { prev: e } = t;
  for (; e !== null && !It(e); )
    ({ prev: e } = e);
  return e;
}
function ys(t) {
  if (t.prev && (t.prev.next = t.next), t.next && (t.next.prev = t.prev), t.parent) {
    const e = t.parent.children, n = e.lastIndexOf(t);
    n >= 0 && e.splice(n, 1);
  }
  t.next = null, t.prev = null, t.parent = null;
}
function Dp(t, e) {
  const n = e.prev = t.prev;
  n && (n.next = e);
  const r = e.next = t.next;
  r && (r.prev = e);
  const a = e.parent = t.parent;
  if (a) {
    const u = a.children;
    u[u.lastIndexOf(t)] = e, t.parent = null;
  }
}
function Pp(t, e) {
  if (ys(e), e.next = null, e.parent = t, t.children.push(e) > 1) {
    const n = t.children[t.children.length - 2];
    n.next = e, e.prev = n;
  } else
    e.prev = null;
}
function Bp(t, e) {
  ys(e);
  const { parent: n } = t, r = t.next;
  if (e.next = r, e.prev = t, t.next = e, e.parent = n, r) {
    if (r.prev = e, n) {
      const a = n.children;
      a.splice(a.lastIndexOf(r), 0, e);
    }
  } else
    n && n.children.push(e);
}
function Mp(t, e) {
  if (ys(e), e.parent = t, e.prev = null, t.children.unshift(e) !== 1) {
    const n = t.children[1];
    n.prev = e, e.next = n;
  } else
    e.next = null;
}
function Fp(t, e) {
  ys(e);
  const { parent: n } = t;
  if (n) {
    const r = n.children;
    r.splice(r.indexOf(t), 0, e);
  }
  t.prev && (t.prev.next = e), e.parent = n, e.prev = t.prev, e.next = t, t.prev = e;
}
function Ca(t, e, n = !0, r = 1 / 0) {
  return eo(t, Array.isArray(e) ? e : [e], n, r);
}
function eo(t, e, n, r) {
  const a = [], u = [e], o = [0];
  for (; ; ) {
    if (o[0] >= u[0].length) {
      if (o.length === 1)
        return a;
      u.shift(), o.shift();
      continue;
    }
    const h = u[0][o[0]++];
    if (t(h) && (a.push(h), --r <= 0))
      return a;
    n && Ze(h) && h.children.length > 0 && (o.unshift(0), u.unshift(h.children));
  }
}
function kp(t, e) {
  return e.find(t);
}
function no(t, e, n = !0) {
  let r = null;
  for (let a = 0; a < e.length && !r; a++) {
    const u = e[a];
    if (It(u))
      t(u) ? r = u : n && u.children.length > 0 && (r = no(t, u.children, !0));
    else
      continue;
  }
  return r;
}
function ol(t, e) {
  return e.some((n) => It(n) && (t(n) || ol(t, n.children)));
}
function Up(t, e) {
  const n = [], r = [e], a = [0];
  for (; ; ) {
    if (a[0] >= r[0].length) {
      if (r.length === 1)
        return n;
      r.shift(), a.shift();
      continue;
    }
    const u = r[0][a[0]++];
    It(u) && (t(u) && n.push(u), u.children.length > 0 && (a.unshift(0), r.unshift(u.children)));
  }
}
const na = {
  tag_name(t) {
    return typeof t == "function" ? (e) => It(e) && t(e.name) : t === "*" ? It : (e) => It(e) && e.name === t;
  },
  tag_type(t) {
    return typeof t == "function" ? (e) => t(e.type) : (e) => e.type === t;
  },
  tag_contains(t) {
    return typeof t == "function" ? (e) => Ur(e) && t(e.data) : (e) => Ur(e) && e.data === t;
  }
};
function cl(t, e) {
  return typeof e == "function" ? (n) => It(n) && e(n.attribs[t]) : (n) => It(n) && n.attribs[t] === e;
}
function Hp(t, e) {
  return (n) => t(n) || e(n);
}
function fl(t) {
  const e = Object.keys(t).map((n) => {
    const r = t[n];
    return Object.prototype.hasOwnProperty.call(na, n) ? na[n](r) : cl(n, r);
  });
  return e.length === 0 ? null : e.reduce(Hp);
}
function qp(t, e) {
  const n = fl(t);
  return n ? n(e) : !0;
}
function $p(t, e, n, r = 1 / 0) {
  const a = fl(t);
  return a ? Ca(a, e, n, r) : [];
}
function Gp(t, e, n = !0) {
  return Array.isArray(e) || (e = [e]), no(cl("id", t), e, n);
}
function $s(t, e, n = !0, r = 1 / 0) {
  return Ca(na.tag_name(t), e, n, r);
}
function Yp(t, e, n = !0, r = 1 / 0) {
  return Ca(na.tag_type(t), e, n, r);
}
function Vp(t) {
  let e = t.length;
  for (; --e >= 0; ) {
    const n = t[e];
    if (e > 0 && t.lastIndexOf(n, e - 1) >= 0) {
      t.splice(e, 1);
      continue;
    }
    for (let r = n.parent; r; r = r.parent)
      if (t.includes(r)) {
        t.splice(e, 1);
        break;
      }
  }
  return t;
}
var rr;
(function(t) {
  t[t.DISCONNECTED = 1] = "DISCONNECTED", t[t.PRECEDING = 2] = "PRECEDING", t[t.FOLLOWING = 4] = "FOLLOWING", t[t.CONTAINS = 8] = "CONTAINS", t[t.CONTAINED_BY = 16] = "CONTAINED_BY";
})(rr || (rr = {}));
function ll(t, e) {
  const n = [], r = [];
  if (t === e)
    return 0;
  let a = Ze(t) ? t : t.parent;
  for (; a; )
    n.unshift(a), a = a.parent;
  for (a = Ze(e) ? e : e.parent; a; )
    r.unshift(a), a = a.parent;
  const u = Math.min(n.length, r.length);
  let o = 0;
  for (; o < u && n[o] === r[o]; )
    o++;
  if (o === 0)
    return rr.DISCONNECTED;
  const h = n[o - 1], m = h.children, E = n[o], p = r[o];
  return m.indexOf(E) > m.indexOf(p) ? h === e ? rr.FOLLOWING | rr.CONTAINED_BY : rr.FOLLOWING : h === t ? rr.PRECEDING | rr.CONTAINS : rr.PRECEDING;
}
function Gs(t) {
  return t = t.filter((e, n, r) => !r.includes(e, n + 1)), t.sort((e, n) => {
    const r = ll(e, n);
    return r & rr.PRECEDING ? -1 : r & rr.FOLLOWING ? 1 : 0;
  }), t;
}
function jp(t) {
  const e = ra(zp, t);
  return e ? e.name === "feed" ? Wp(e) : Qp(e) : null;
}
function Wp(t) {
  var e;
  const n = t.children, r = {
    type: "atom",
    items: $s("entry", n).map((o) => {
      var h;
      const { children: m } = o, E = { media: hl(m) };
      Mn(E, "id", "id", m), Mn(E, "title", "title", m);
      const p = (h = ra("link", m)) === null || h === void 0 ? void 0 : h.attribs.href;
      p && (E.link = p);
      const N = es("summary", m) || es("content", m);
      N && (E.description = N);
      const v = es("updated", m);
      return v && (E.pubDate = new Date(v)), E;
    })
  };
  Mn(r, "id", "id", n), Mn(r, "title", "title", n);
  const a = (e = ra("link", n)) === null || e === void 0 ? void 0 : e.attribs.href;
  a && (r.link = a), Mn(r, "description", "subtitle", n);
  const u = es("updated", n);
  return u && (r.updated = new Date(u)), Mn(r, "author", "email", n, !0), r;
}
function Qp(t) {
  var e, n;
  const r = (n = (e = ra("channel", t.children)) === null || e === void 0 ? void 0 : e.children) !== null && n !== void 0 ? n : [], a = {
    type: t.name.substr(0, 3),
    id: "",
    items: $s("item", t.children).map((o) => {
      const { children: h } = o, m = { media: hl(h) };
      Mn(m, "id", "guid", h), Mn(m, "title", "title", h), Mn(m, "link", "link", h), Mn(m, "description", "description", h);
      const E = es("pubDate", h) || es("dc:date", h);
      return E && (m.pubDate = new Date(E)), m;
    })
  };
  Mn(a, "title", "title", r), Mn(a, "link", "link", r), Mn(a, "description", "description", r);
  const u = es("lastBuildDate", r);
  return u && (a.updated = new Date(u)), Mn(a, "author", "managingEditor", r, !0), a;
}
const Kp = ["url", "type", "lang"], Xp = [
  "fileSize",
  "bitrate",
  "framerate",
  "samplingrate",
  "channels",
  "duration",
  "height",
  "width"
];
function hl(t) {
  return $s("media:content", t).map((e) => {
    const { attribs: n } = e, r = {
      medium: n.medium,
      isDefault: !!n.isDefault
    };
    for (const a of Kp)
      n[a] && (r[a] = n[a]);
    for (const a of Xp)
      n[a] && (r[a] = parseInt(n[a], 10));
    return n.expression && (r.expression = n.expression), r;
  });
}
function ra(t, e) {
  return $s(t, e, !0, 1)[0];
}
function es(t, e, n = !1) {
  return ks($s(t, e, n, 1)).trim();
}
function Mn(t, e, n, r, a = !1) {
  const u = es(n, r, a);
  u && (t[e] = u);
}
function zp(t) {
  return t === "rss" || t === "feed" || t === "rdf:RDF";
}
const Ia = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get DocumentPosition() {
    return rr;
  },
  append: Bp,
  appendChild: Pp,
  compareDocumentPosition: ll,
  existsOne: ol,
  filter: Ca,
  find: eo,
  findAll: Up,
  findOne: no,
  findOneChild: kp,
  getAttributeValue: Lp,
  getChildren: ya,
  getElementById: Gp,
  getElements: $p,
  getElementsByTagName: $s,
  getElementsByTagType: Yp,
  getFeed: jp,
  getInnerHTML: Rp,
  getName: wp,
  getOuterHTML: il,
  getParent: al,
  getSiblings: ul,
  getText: Xi,
  hasAttrib: Op,
  hasChildren: Ze,
  innerText: ea,
  isCDATA: _a,
  isComment: Ta,
  isDocument: As,
  isTag: It,
  isText: Ur,
  nextElementSibling: Zu,
  prepend: Fp,
  prependChild: Mp,
  prevElementSibling: to,
  removeElement: ys,
  removeSubsets: Vp,
  replaceElement: Dp,
  testElement: qp,
  textContent: ks,
  uniqueSort: Gs
}, Symbol.toStringTag, { value: "Module" }));
function dl(t, e, n) {
  return t ? t(e ?? t._root.children, null, void 0, n).toString() : "";
}
function Jp(t, e) {
  return !e && typeof t == "object" && t != null && !("length" in t) && !("type" in t);
}
function Zp(t, e) {
  const n = Jp(t) ? (e = t, void 0) : t, r = {
    ...ju,
    ...this === null || this === void 0 ? void 0 : this._options,
    ...Cu(e ?? {})
  };
  return dl(this, n, r);
}
function tg(t) {
  const e = { ...this._options, xmlMode: !0 };
  return dl(this, t, e);
}
function hi(t) {
  const e = t || (this ? this.root() : []);
  let n = "";
  for (let r = 0; r < e.length; r++)
    n += ks(e[r]);
  return n;
}
function eg(t, e, n = typeof e == "boolean" ? e : !1) {
  if (!t || typeof t != "string")
    return null;
  typeof e == "boolean" && (n = e);
  const r = this.load(t, ju, !1);
  return n || r("script").remove(), r.root()[0].children.slice();
}
function ng() {
  return this(this._root);
}
function pl(t, e) {
  if (e === t)
    return !1;
  let n = e;
  for (; n && n !== n.parent; )
    if (n = n.parent, n === t)
      return !0;
  return !1;
}
function rg(t, e) {
  if (!pc(t) || !pc(e))
    return;
  let n = t.length;
  const r = +e.length;
  for (let a = 0; a < r; a++)
    t[n++] = e[a];
  return t.length = n, t;
}
function pc(t) {
  if (Array.isArray(t))
    return !0;
  if (typeof t != "object" || !Object.prototype.hasOwnProperty.call(t, "length") || typeof t.length != "number" || t.length < 0)
    return !1;
  for (let e = 0; e < t.length; e++)
    if (!(e in t))
      return !1;
  return !0;
}
const sg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  contains: pl,
  html: Zp,
  merge: rg,
  parseHTML: eg,
  root: ng,
  text: hi,
  xml: tg
}, Symbol.toStringTag, { value: "Module" }));
function Hr(t) {
  return t.cheerio != null;
}
function ig(t) {
  return t.replace(/[_.-](\w|$)/g, (e, n) => n.toUpperCase());
}
function ag(t) {
  return t.replace(/[A-Z]/g, "-$&").toLowerCase();
}
function Ce(t, e) {
  const n = t.length;
  for (let r = 0; r < n; r++)
    e(t[r], r);
  return t;
}
function vu(t) {
  const e = "length" in t ? Array.prototype.map.call(t, (r) => ta(r, !0)) : [ta(t, !0)], n = new bs(e);
  return e.forEach((r) => {
    r.parent = n;
  }), e;
}
var ds;
(function(t) {
  t[t.LowerA = 97] = "LowerA", t[t.LowerZ = 122] = "LowerZ", t[t.UpperA = 65] = "UpperA", t[t.UpperZ = 90] = "UpperZ", t[t.Exclamation = 33] = "Exclamation";
})(ds || (ds = {}));
function xu(t) {
  const e = t.indexOf("<");
  if (e < 0 || e > t.length - 3)
    return !1;
  const n = t.charCodeAt(e + 1);
  return (n >= ds.LowerA && n <= ds.LowerZ || n >= ds.UpperA && n <= ds.UpperZ || n === ds.Exclamation) && t.includes(">", e + 2);
}
const Ds = Object.prototype.hasOwnProperty, di = /\s+/, Qa = "data-", gc = {
  null: null,
  true: !0,
  false: !1
}, ro = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, ug = /^{[^]*}$|^\[[^]*]$/;
function sa(t, e, n) {
  var r;
  if (!(!t || !It(t))) {
    if ((r = t.attribs) !== null && r !== void 0 || (t.attribs = {}), !e)
      return t.attribs;
    if (Ds.call(t.attribs, e))
      return !n && ro.test(e) ? e : t.attribs[e];
    if (t.name === "option" && e === "value")
      return hi(t.children);
    if (t.name === "input" && (t.attribs.type === "radio" || t.attribs.type === "checkbox") && e === "value")
      return "on";
  }
}
function Ps(t, e, n) {
  n === null ? gl(t, e) : t.attribs[e] = `${n}`;
}
function og(t, e) {
  if (typeof t == "object" || e !== void 0) {
    if (typeof e == "function") {
      if (typeof t != "string")
        throw new Error("Bad combination of arguments.");
      return Ce(this, (n, r) => {
        It(n) && Ps(n, t, e.call(n, r, n.attribs[t]));
      });
    }
    return Ce(this, (n) => {
      It(n) && (typeof t == "object" ? Object.keys(t).forEach((r) => {
        const a = t[r];
        Ps(n, r, a);
      }) : Ps(n, t, e));
    });
  }
  return arguments.length > 1 ? this : sa(this[0], t, this.options.xmlMode);
}
function Ec(t, e, n) {
  return e in t ? (
    // @ts-expect-error TS doesn't like us accessing the value directly here.
    t[e]
  ) : !n && ro.test(e) ? sa(t, e, !1) !== void 0 : sa(t, e, n);
}
function Ka(t, e, n, r) {
  e in t ? t[e] = n : Ps(t, e, !r && ro.test(e) ? n ? "" : null : `${n}`);
}
function cg(t, e) {
  var n;
  if (typeof t == "string" && e === void 0) {
    const r = this[0];
    if (!r || !It(r))
      return;
    switch (t) {
      case "style": {
        const a = this.css(), u = Object.keys(a);
        return u.forEach((o, h) => {
          a[h] = o;
        }), a.length = u.length, a;
      }
      case "tagName":
      case "nodeName":
        return r.name.toUpperCase();
      case "href":
      case "src": {
        const a = (n = r.attribs) === null || n === void 0 ? void 0 : n[t];
        return typeof URL < "u" && (t === "href" && (r.tagName === "a" || r.name === "link") || t === "src" && (r.tagName === "img" || r.tagName === "iframe" || r.tagName === "audio" || r.tagName === "video" || r.tagName === "source")) && a !== void 0 && this.options.baseURI ? new URL(a, this.options.baseURI).href : a;
      }
      case "innerText":
        return ea(r);
      case "textContent":
        return ks(r);
      case "outerHTML":
        return this.clone().wrap("<container />").parent().html();
      case "innerHTML":
        return this.html();
      default:
        return Ec(r, t, this.options.xmlMode);
    }
  }
  if (typeof t == "object" || e !== void 0) {
    if (typeof e == "function") {
      if (typeof t == "object")
        throw new Error("Bad combination of arguments.");
      return Ce(this, (r, a) => {
        It(r) && Ka(r, t, e.call(r, a, Ec(r, t, this.options.xmlMode)), this.options.xmlMode);
      });
    }
    return Ce(this, (r) => {
      It(r) && (typeof t == "object" ? Object.keys(t).forEach((a) => {
        const u = t[a];
        Ka(r, a, u, this.options.xmlMode);
      }) : Ka(r, t, e, this.options.xmlMode));
    });
  }
}
function mc(t, e, n) {
  var r;
  const a = t;
  (r = a.data) !== null && r !== void 0 || (a.data = {}), typeof e == "object" ? Object.assign(a.data, e) : typeof e == "string" && n !== void 0 && (a.data[e] = n);
}
function bc(t, e) {
  let n, r, a;
  e == null ? (n = Object.keys(t.attribs).filter((u) => u.startsWith(Qa)), r = n.map((u) => ig(u.slice(Qa.length)))) : (n = [Qa + ag(e)], r = [e]);
  for (let u = 0; u < n.length; ++u) {
    const o = n[u], h = r[u];
    if (Ds.call(t.attribs, o) && !Ds.call(t.data, h)) {
      if (a = t.attribs[o], Ds.call(gc, a))
        a = gc[a];
      else if (a === String(Number(a)))
        a = Number(a);
      else if (ug.test(a))
        try {
          a = JSON.parse(a);
        } catch {
        }
      t.data[h] = a;
    }
  }
  return e == null ? t.data : a;
}
function fg(t, e) {
  var n;
  const r = this[0];
  if (!r || !It(r))
    return;
  const a = r;
  return (n = a.data) !== null && n !== void 0 || (a.data = {}), t ? typeof t == "object" || e !== void 0 ? (Ce(this, (u) => {
    It(u) && (typeof t == "object" ? mc(u, t) : mc(u, t, e));
  }), this) : Ds.call(a.data, t) ? a.data[t] : bc(a, t) : bc(a);
}
function lg(t) {
  const e = arguments.length === 0, n = this[0];
  if (!n || !It(n))
    return e ? void 0 : this;
  switch (n.name) {
    case "textarea":
      return this.text(t);
    case "select": {
      const r = this.find("option:selected");
      if (!e) {
        if (this.attr("multiple") == null && typeof t == "object")
          return this;
        this.find("option").removeAttr("selected");
        const a = typeof t != "object" ? [t] : t;
        for (let u = 0; u < a.length; u++)
          this.find(`option[value="${a[u]}"]`).attr("selected", "");
        return this;
      }
      return this.attr("multiple") ? r.toArray().map((a) => hi(a.children)) : r.attr("value");
    }
    case "input":
    case "option":
      return e ? this.attr("value") : this.attr("value", t);
  }
}
function gl(t, e) {
  !t.attribs || !Ds.call(t.attribs, e) || delete t.attribs[e];
}
function ia(t) {
  return t ? t.trim().split(di) : [];
}
function hg(t) {
  const e = ia(t);
  for (let n = 0; n < e.length; n++)
    Ce(this, (r) => {
      It(r) && gl(r, e[n]);
    });
  return this;
}
function dg(t) {
  return this.toArray().some((e) => {
    const n = It(e) && e.attribs.class;
    let r = -1;
    if (n && t.length)
      for (; (r = n.indexOf(t, r + 1)) > -1; ) {
        const a = r + t.length;
        if ((r === 0 || di.test(n[r - 1])) && (a === n.length || di.test(n[a])))
          return !0;
      }
    return !1;
  });
}
function El(t) {
  if (typeof t == "function")
    return Ce(this, (r, a) => {
      if (It(r)) {
        const u = r.attribs.class || "";
        El.call([r], t.call(r, a, u));
      }
    });
  if (!t || typeof t != "string")
    return this;
  const e = t.split(di), n = this.length;
  for (let r = 0; r < n; r++) {
    const a = this[r];
    if (!It(a))
      continue;
    const u = sa(a, "class", !1);
    if (!u)
      Ps(a, "class", e.join(" ").trim());
    else {
      let o = ` ${u} `;
      for (let h = 0; h < e.length; h++) {
        const m = `${e[h]} `;
        o.includes(` ${m}`) || (o += m);
      }
      Ps(a, "class", o.trim());
    }
  }
  return this;
}
function ml(t) {
  if (typeof t == "function")
    return Ce(this, (a, u) => {
      It(a) && ml.call([a], t.call(a, u, a.attribs.class || ""));
    });
  const e = ia(t), n = e.length, r = arguments.length === 0;
  return Ce(this, (a) => {
    if (It(a))
      if (r)
        a.attribs.class = "";
      else {
        const u = ia(a.attribs.class);
        let o = !1;
        for (let h = 0; h < n; h++) {
          const m = u.indexOf(e[h]);
          m >= 0 && (u.splice(m, 1), o = !0, h--);
        }
        o && (a.attribs.class = u.join(" "));
      }
  });
}
function bl(t, e) {
  if (typeof t == "function")
    return Ce(this, (o, h) => {
      It(o) && bl.call([o], t.call(o, h, o.attribs.class || "", e), e);
    });
  if (!t || typeof t != "string")
    return this;
  const n = t.split(di), r = n.length, a = typeof e == "boolean" ? e ? 1 : -1 : 0, u = this.length;
  for (let o = 0; o < u; o++) {
    const h = this[o];
    if (!It(h))
      continue;
    const m = ia(h.attribs.class);
    for (let E = 0; E < r; E++) {
      const p = m.indexOf(n[E]);
      a >= 0 && p < 0 ? m.push(n[E]) : a <= 0 && p >= 0 && m.splice(p, 1);
    }
    h.attribs.class = m.join(" ");
  }
  return this;
}
const pg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addClass: El,
  attr: og,
  data: fg,
  hasClass: dg,
  prop: cg,
  removeAttr: hg,
  removeClass: ml,
  toggleClass: bl,
  val: lg
}, Symbol.toStringTag, { value: "Module" }));
var _t;
(function(t) {
  t.Attribute = "attribute", t.Pseudo = "pseudo", t.PseudoElement = "pseudo-element", t.Tag = "tag", t.Universal = "universal", t.Adjacent = "adjacent", t.Child = "child", t.Descendant = "descendant", t.Parent = "parent", t.Sibling = "sibling", t.ColumnCombinator = "column-combinator";
})(_t || (_t = {}));
var Ve;
(function(t) {
  t.Any = "any", t.Element = "element", t.End = "end", t.Equals = "equals", t.Exists = "exists", t.Hyphen = "hyphen", t.Not = "not", t.Start = "start";
})(Ve || (Ve = {}));
const _c = /^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/, gg = /\\([\da-f]{1,6}\s?|(\s)|.)/gi, Eg = /* @__PURE__ */ new Map([
  [126, Ve.Element],
  [94, Ve.Start],
  [36, Ve.End],
  [42, Ve.Any],
  [33, Ve.Not],
  [124, Ve.Hyphen]
]), mg = /* @__PURE__ */ new Set([
  "has",
  "not",
  "matches",
  "is",
  "where",
  "host",
  "host-context"
]);
function ni(t) {
  switch (t.type) {
    case _t.Adjacent:
    case _t.Child:
    case _t.Descendant:
    case _t.Parent:
    case _t.Sibling:
    case _t.ColumnCombinator:
      return !0;
    default:
      return !1;
  }
}
const bg = /* @__PURE__ */ new Set(["contains", "icontains"]);
function _g(t, e, n) {
  const r = parseInt(e, 16) - 65536;
  return r !== r || n ? e : r < 0 ? (
    // BMP codepoint
    String.fromCharCode(r + 65536)
  ) : (
    // Supplemental Plane codepoint (surrogate pair)
    String.fromCharCode(r >> 10 | 55296, r & 1023 | 56320)
  );
}
function Qs(t) {
  return t.replace(gg, _g);
}
function Xa(t) {
  return t === 39 || t === 34;
}
function Tc(t) {
  return t === 32 || t === 9 || t === 10 || t === 12 || t === 13;
}
function Sa(t) {
  const e = [], n = _l(e, `${t}`, 0);
  if (n < t.length)
    throw new Error(`Unmatched selector: ${t.slice(n)}`);
  return e;
}
function _l(t, e, n) {
  let r = [];
  function a(v) {
    const S = e.slice(n + v).match(_c);
    if (!S)
      throw new Error(`Expected name, found ${e.slice(n)}`);
    const [L] = S;
    return n += v + L.length, Qs(L);
  }
  function u(v) {
    for (n += v; n < e.length && Tc(e.charCodeAt(n)); )
      n++;
  }
  function o() {
    n += 1;
    const v = n;
    let S = 1;
    for (; S > 0 && n < e.length; n++)
      e.charCodeAt(n) === 40 && !h(n) ? S++ : e.charCodeAt(n) === 41 && !h(n) && S--;
    if (S)
      throw new Error("Parenthesis not matched");
    return Qs(e.slice(v, n - 1));
  }
  function h(v) {
    let S = 0;
    for (; e.charCodeAt(--v) === 92; )
      S++;
    return (S & 1) === 1;
  }
  function m() {
    if (r.length > 0 && ni(r[r.length - 1]))
      throw new Error("Did not expect successive traversals.");
  }
  function E(v) {
    if (r.length > 0 && r[r.length - 1].type === _t.Descendant) {
      r[r.length - 1].type = v;
      return;
    }
    m(), r.push({ type: v });
  }
  function p(v, S) {
    r.push({
      type: _t.Attribute,
      name: v,
      action: S,
      value: a(1),
      namespace: null,
      ignoreCase: "quirks"
    });
  }
  function N() {
    if (r.length && r[r.length - 1].type === _t.Descendant && r.pop(), r.length === 0)
      throw new Error("Empty sub-selector");
    t.push(r);
  }
  if (u(0), e.length === n)
    return n;
  t:
    for (; n < e.length; ) {
      const v = e.charCodeAt(n);
      switch (v) {
        case 32:
        case 9:
        case 10:
        case 12:
        case 13: {
          (r.length === 0 || r[0].type !== _t.Descendant) && (m(), r.push({ type: _t.Descendant })), u(1);
          break;
        }
        case 62: {
          E(_t.Child), u(1);
          break;
        }
        case 60: {
          E(_t.Parent), u(1);
          break;
        }
        case 126: {
          E(_t.Sibling), u(1);
          break;
        }
        case 43: {
          E(_t.Adjacent), u(1);
          break;
        }
        case 46: {
          p("class", Ve.Element);
          break;
        }
        case 35: {
          p("id", Ve.Equals);
          break;
        }
        case 91: {
          u(1);
          let S, L = null;
          e.charCodeAt(n) === 124 ? S = a(1) : e.startsWith("*|", n) ? (L = "*", S = a(2)) : (S = a(0), e.charCodeAt(n) === 124 && e.charCodeAt(n + 1) !== 61 && (L = S, S = a(1))), u(0);
          let W = Ve.Exists;
          const M = Eg.get(e.charCodeAt(n));
          if (M) {
            if (W = M, e.charCodeAt(n + 1) !== 61)
              throw new Error("Expected `=`");
            u(2);
          } else
            e.charCodeAt(n) === 61 && (W = Ve.Equals, u(1));
          let O = "", F = null;
          if (W !== "exists") {
            if (Xa(e.charCodeAt(n))) {
              const U = e.charCodeAt(n);
              let P = n + 1;
              for (; P < e.length && (e.charCodeAt(P) !== U || h(P)); )
                P += 1;
              if (e.charCodeAt(P) !== U)
                throw new Error("Attribute value didn't end");
              O = Qs(e.slice(n + 1, P)), n = P + 1;
            } else {
              const U = n;
              for (; n < e.length && (!Tc(e.charCodeAt(n)) && e.charCodeAt(n) !== 93 || h(n)); )
                n += 1;
              O = Qs(e.slice(U, n));
            }
            u(0);
            const Q = e.charCodeAt(n) | 32;
            Q === 115 ? (F = !1, u(1)) : Q === 105 && (F = !0, u(1));
          }
          if (e.charCodeAt(n) !== 93)
            throw new Error("Attribute selector didn't terminate");
          n += 1;
          const Z = {
            type: _t.Attribute,
            name: S,
            action: W,
            value: O,
            namespace: L,
            ignoreCase: F
          };
          r.push(Z);
          break;
        }
        case 58: {
          if (e.charCodeAt(n + 1) === 58) {
            r.push({
              type: _t.PseudoElement,
              name: a(2).toLowerCase(),
              data: e.charCodeAt(n) === 40 ? o() : null
            });
            continue;
          }
          const S = a(1).toLowerCase();
          let L = null;
          if (e.charCodeAt(n) === 40)
            if (mg.has(S)) {
              if (Xa(e.charCodeAt(n + 1)))
                throw new Error(`Pseudo-selector ${S} cannot be quoted`);
              if (L = [], n = _l(L, e, n + 1), e.charCodeAt(n) !== 41)
                throw new Error(`Missing closing parenthesis in :${S} (${e})`);
              n += 1;
            } else {
              if (L = o(), bg.has(S)) {
                const W = L.charCodeAt(0);
                W === L.charCodeAt(L.length - 1) && Xa(W) && (L = L.slice(1, -1));
              }
              L = Qs(L);
            }
          r.push({ type: _t.Pseudo, name: S, data: L });
          break;
        }
        case 44: {
          N(), r = [], u(1);
          break;
        }
        default: {
          if (e.startsWith("/*", n)) {
            const W = e.indexOf("*/", n + 2);
            if (W < 0)
              throw new Error("Comment was not terminated");
            n = W + 2, r.length === 0 && u(0);
            break;
          }
          let S = null, L;
          if (v === 42)
            n += 1, L = "*";
          else if (v === 124) {
            if (L = "", e.charCodeAt(n + 1) === 124) {
              E(_t.ColumnCombinator), u(2);
              break;
            }
          } else if (_c.test(e.slice(n)))
            L = a(0);
          else
            break t;
          e.charCodeAt(n) === 124 && e.charCodeAt(n + 1) !== 124 && (S = L, e.charCodeAt(n + 1) === 42 ? (L = "*", n += 2) : L = a(1)), r.push(L === "*" ? { type: _t.Universal, namespace: S } : { type: _t.Tag, name: L, namespace: S });
        }
      }
    }
  return N(), n;
}
var qt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Tl(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Al(t) {
  if (t.__esModule)
    return t;
  var e = t.default;
  if (typeof e == "function") {
    var n = function r() {
      return this instanceof r ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    n.prototype = e.prototype;
  } else
    n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(t).forEach(function(r) {
    var a = Object.getOwnPropertyDescriptor(t, r);
    Object.defineProperty(n, r, a.get ? a : {
      enumerable: !0,
      get: function() {
        return t[r];
      }
    });
  }), n;
}
var Kr = {
  trueFunc: function() {
    return !0;
  },
  falseFunc: function() {
    return !1;
  }
};
const Ft = /* @__PURE__ */ Tl(Kr), yl = /* @__PURE__ */ new Map([
  [_t.Universal, 50],
  [_t.Tag, 30],
  [_t.Attribute, 1],
  [_t.Pseudo, 0]
]);
function so(t) {
  return !yl.has(t.type);
}
const Tg = /* @__PURE__ */ new Map([
  [Ve.Exists, 10],
  [Ve.Equals, 8],
  [Ve.Not, 7],
  [Ve.Start, 6],
  [Ve.End, 6],
  [Ve.Any, 5]
]);
function Ag(t) {
  const e = t.map(Cl);
  for (let n = 1; n < t.length; n++) {
    const r = e[n];
    if (!(r < 0))
      for (let a = n - 1; a >= 0 && r < e[a]; a--) {
        const u = t[a + 1];
        t[a + 1] = t[a], t[a] = u, e[a + 1] = e[a], e[a] = r;
      }
  }
}
function Cl(t) {
  var e, n;
  let r = (e = yl.get(t.type)) !== null && e !== void 0 ? e : -1;
  return t.type === _t.Attribute ? (r = (n = Tg.get(t.action)) !== null && n !== void 0 ? n : 4, t.action === Ve.Equals && t.name === "id" && (r = 9), t.ignoreCase && (r >>= 1)) : t.type === _t.Pseudo && (t.data ? t.name === "has" || t.name === "contains" ? r = 0 : Array.isArray(t.data) ? (r = Math.min(...t.data.map((a) => Math.min(...a.map(Cl)))), r < 0 && (r = 0)) : r = 2 : r = 3), r;
}
const yg = /[-[\]{}()*+?.,\\^$|#\s]/g;
function Ac(t) {
  return t.replace(yg, "\\$&");
}
const Cg = /* @__PURE__ */ new Set([
  "accept",
  "accept-charset",
  "align",
  "alink",
  "axis",
  "bgcolor",
  "charset",
  "checked",
  "clear",
  "codetype",
  "color",
  "compact",
  "declare",
  "defer",
  "dir",
  "direction",
  "disabled",
  "enctype",
  "face",
  "frame",
  "hreflang",
  "http-equiv",
  "lang",
  "language",
  "link",
  "media",
  "method",
  "multiple",
  "nohref",
  "noresize",
  "noshade",
  "nowrap",
  "readonly",
  "rel",
  "rev",
  "rules",
  "scope",
  "scrolling",
  "selected",
  "shape",
  "target",
  "text",
  "type",
  "valign",
  "valuetype",
  "vlink"
]);
function os(t, e) {
  return typeof t.ignoreCase == "boolean" ? t.ignoreCase : t.ignoreCase === "quirks" ? !!e.quirksMode : !e.xmlMode && Cg.has(t.name);
}
const Ig = {
  equals(t, e, n) {
    const { adapter: r } = n, { name: a } = e;
    let { value: u } = e;
    return os(e, n) ? (u = u.toLowerCase(), (o) => {
      const h = r.getAttributeValue(o, a);
      return h != null && h.length === u.length && h.toLowerCase() === u && t(o);
    }) : (o) => r.getAttributeValue(o, a) === u && t(o);
  },
  hyphen(t, e, n) {
    const { adapter: r } = n, { name: a } = e;
    let { value: u } = e;
    const o = u.length;
    return os(e, n) ? (u = u.toLowerCase(), function(m) {
      const E = r.getAttributeValue(m, a);
      return E != null && (E.length === o || E.charAt(o) === "-") && E.substr(0, o).toLowerCase() === u && t(m);
    }) : function(m) {
      const E = r.getAttributeValue(m, a);
      return E != null && (E.length === o || E.charAt(o) === "-") && E.substr(0, o) === u && t(m);
    };
  },
  element(t, e, n) {
    const { adapter: r } = n, { name: a, value: u } = e;
    if (/\s/.test(u))
      return Ft.falseFunc;
    const o = new RegExp(`(?:^|\\s)${Ac(u)}(?:$|\\s)`, os(e, n) ? "i" : "");
    return function(m) {
      const E = r.getAttributeValue(m, a);
      return E != null && E.length >= u.length && o.test(E) && t(m);
    };
  },
  exists(t, { name: e }, { adapter: n }) {
    return (r) => n.hasAttrib(r, e) && t(r);
  },
  start(t, e, n) {
    const { adapter: r } = n, { name: a } = e;
    let { value: u } = e;
    const o = u.length;
    return o === 0 ? Ft.falseFunc : os(e, n) ? (u = u.toLowerCase(), (h) => {
      const m = r.getAttributeValue(h, a);
      return m != null && m.length >= o && m.substr(0, o).toLowerCase() === u && t(h);
    }) : (h) => {
      var m;
      return !!(!((m = r.getAttributeValue(h, a)) === null || m === void 0) && m.startsWith(u)) && t(h);
    };
  },
  end(t, e, n) {
    const { adapter: r } = n, { name: a } = e;
    let { value: u } = e;
    const o = -u.length;
    return o === 0 ? Ft.falseFunc : os(e, n) ? (u = u.toLowerCase(), (h) => {
      var m;
      return ((m = r.getAttributeValue(h, a)) === null || m === void 0 ? void 0 : m.substr(o).toLowerCase()) === u && t(h);
    }) : (h) => {
      var m;
      return !!(!((m = r.getAttributeValue(h, a)) === null || m === void 0) && m.endsWith(u)) && t(h);
    };
  },
  any(t, e, n) {
    const { adapter: r } = n, { name: a, value: u } = e;
    if (u === "")
      return Ft.falseFunc;
    if (os(e, n)) {
      const o = new RegExp(Ac(u), "i");
      return function(m) {
        const E = r.getAttributeValue(m, a);
        return E != null && E.length >= u.length && o.test(E) && t(m);
      };
    }
    return (o) => {
      var h;
      return !!(!((h = r.getAttributeValue(o, a)) === null || h === void 0) && h.includes(u)) && t(o);
    };
  },
  not(t, e, n) {
    const { adapter: r } = n, { name: a } = e;
    let { value: u } = e;
    return u === "" ? (o) => !!r.getAttributeValue(o, a) && t(o) : os(e, n) ? (u = u.toLowerCase(), (o) => {
      const h = r.getAttributeValue(o, a);
      return (h == null || h.length !== u.length || h.toLowerCase() !== u) && t(o);
    }) : (o) => r.getAttributeValue(o, a) !== u && t(o);
  }
}, Sg = /* @__PURE__ */ new Set([9, 10, 12, 13, 32]), yc = 48, Ng = 57;
function vg(t) {
  if (t = t.trim().toLowerCase(), t === "even")
    return [2, 0];
  if (t === "odd")
    return [2, 1];
  let e = 0, n = 0, r = u(), a = o();
  if (e < t.length && t.charAt(e) === "n" && (e++, n = r * (a ?? 1), h(), e < t.length ? (r = u(), h(), a = o()) : r = a = 0), a === null || e < t.length)
    throw new Error(`n-th rule couldn't be parsed ('${t}')`);
  return [n, r * a];
  function u() {
    return t.charAt(e) === "-" ? (e++, -1) : (t.charAt(e) === "+" && e++, 1);
  }
  function o() {
    const m = e;
    let E = 0;
    for (; e < t.length && t.charCodeAt(e) >= yc && t.charCodeAt(e) <= Ng; )
      E = E * 10 + (t.charCodeAt(e) - yc), e++;
    return e === m ? null : E;
  }
  function h() {
    for (; e < t.length && Sg.has(t.charCodeAt(e)); )
      e++;
  }
}
function xg(t) {
  const e = t[0], n = t[1] - 1;
  if (n < 0 && e <= 0)
    return Ft.falseFunc;
  if (e === -1)
    return (u) => u <= n;
  if (e === 0)
    return (u) => u === n;
  if (e === 1)
    return n < 0 ? Ft.trueFunc : (u) => u >= n;
  const r = Math.abs(e), a = (n % r + r) % r;
  return e > 1 ? (u) => u >= n && u % r === a : (u) => u <= n && u % r === a;
}
function Mi(t) {
  return xg(vg(t));
}
function Fi(t, e) {
  return (n) => {
    const r = e.getParent(n);
    return r != null && e.isTag(r) && t(n);
  };
}
const Ru = {
  contains(t, e, { adapter: n }) {
    return function(a) {
      return t(a) && n.getText(a).includes(e);
    };
  },
  icontains(t, e, { adapter: n }) {
    const r = e.toLowerCase();
    return function(u) {
      return t(u) && n.getText(u).toLowerCase().includes(r);
    };
  },
  // Location specific methods
  "nth-child"(t, e, { adapter: n, equals: r }) {
    const a = Mi(e);
    return a === Ft.falseFunc ? Ft.falseFunc : a === Ft.trueFunc ? Fi(t, n) : function(o) {
      const h = n.getSiblings(o);
      let m = 0;
      for (let E = 0; E < h.length && !r(o, h[E]); E++)
        n.isTag(h[E]) && m++;
      return a(m) && t(o);
    };
  },
  "nth-last-child"(t, e, { adapter: n, equals: r }) {
    const a = Mi(e);
    return a === Ft.falseFunc ? Ft.falseFunc : a === Ft.trueFunc ? Fi(t, n) : function(o) {
      const h = n.getSiblings(o);
      let m = 0;
      for (let E = h.length - 1; E >= 0 && !r(o, h[E]); E--)
        n.isTag(h[E]) && m++;
      return a(m) && t(o);
    };
  },
  "nth-of-type"(t, e, { adapter: n, equals: r }) {
    const a = Mi(e);
    return a === Ft.falseFunc ? Ft.falseFunc : a === Ft.trueFunc ? Fi(t, n) : function(o) {
      const h = n.getSiblings(o);
      let m = 0;
      for (let E = 0; E < h.length; E++) {
        const p = h[E];
        if (r(o, p))
          break;
        n.isTag(p) && n.getName(p) === n.getName(o) && m++;
      }
      return a(m) && t(o);
    };
  },
  "nth-last-of-type"(t, e, { adapter: n, equals: r }) {
    const a = Mi(e);
    return a === Ft.falseFunc ? Ft.falseFunc : a === Ft.trueFunc ? Fi(t, n) : function(o) {
      const h = n.getSiblings(o);
      let m = 0;
      for (let E = h.length - 1; E >= 0; E--) {
        const p = h[E];
        if (r(o, p))
          break;
        n.isTag(p) && n.getName(p) === n.getName(o) && m++;
      }
      return a(m) && t(o);
    };
  },
  // TODO determine the actual root element
  root(t, e, { adapter: n }) {
    return (r) => {
      const a = n.getParent(r);
      return (a == null || !n.isTag(a)) && t(r);
    };
  },
  scope(t, e, n, r) {
    const { equals: a } = n;
    return !r || r.length === 0 ? Ru.root(t, e, n) : r.length === 1 ? (u) => a(r[0], u) && t(u) : (u) => r.includes(u) && t(u);
  },
  hover: za("isHovered"),
  visited: za("isVisited"),
  active: za("isActive")
};
function za(t) {
  return function(n, r, { adapter: a }) {
    const u = a[t];
    return typeof u != "function" ? Ft.falseFunc : function(h) {
      return u(h) && n(h);
    };
  };
}
const Cc = {
  empty(t, { adapter: e }) {
    return !e.getChildren(t).some((n) => (
      // FIXME: `getText` call is potentially expensive.
      e.isTag(n) || e.getText(n) !== ""
    ));
  },
  "first-child"(t, { adapter: e, equals: n }) {
    if (e.prevElementSibling)
      return e.prevElementSibling(t) == null;
    const r = e.getSiblings(t).find((a) => e.isTag(a));
    return r != null && n(t, r);
  },
  "last-child"(t, { adapter: e, equals: n }) {
    const r = e.getSiblings(t);
    for (let a = r.length - 1; a >= 0; a--) {
      if (n(t, r[a]))
        return !0;
      if (e.isTag(r[a]))
        break;
    }
    return !1;
  },
  "first-of-type"(t, { adapter: e, equals: n }) {
    const r = e.getSiblings(t), a = e.getName(t);
    for (let u = 0; u < r.length; u++) {
      const o = r[u];
      if (n(t, o))
        return !0;
      if (e.isTag(o) && e.getName(o) === a)
        break;
    }
    return !1;
  },
  "last-of-type"(t, { adapter: e, equals: n }) {
    const r = e.getSiblings(t), a = e.getName(t);
    for (let u = r.length - 1; u >= 0; u--) {
      const o = r[u];
      if (n(t, o))
        return !0;
      if (e.isTag(o) && e.getName(o) === a)
        break;
    }
    return !1;
  },
  "only-of-type"(t, { adapter: e, equals: n }) {
    const r = e.getName(t);
    return e.getSiblings(t).every((a) => n(t, a) || !e.isTag(a) || e.getName(a) !== r);
  },
  "only-child"(t, { adapter: e, equals: n }) {
    return e.getSiblings(t).every((r) => n(t, r) || !e.isTag(r));
  }
};
function Ic(t, e, n, r) {
  if (n === null) {
    if (t.length > r)
      throw new Error(`Pseudo-class :${e} requires an argument`);
  } else if (t.length === r)
    throw new Error(`Pseudo-class :${e} doesn't have any arguments`);
}
const Rg = {
  // Links
  "any-link": ":is(a, area, link)[href]",
  link: ":any-link:not(:visited)",
  // Forms
  // https://html.spec.whatwg.org/multipage/scripting.html#disabled-elements
  disabled: `:is(
        :is(button, input, select, textarea, optgroup, option)[disabled],
        optgroup[disabled] > option,
        fieldset[disabled]:not(fieldset[disabled] legend:first-of-type *)
    )`,
  enabled: ":not(:disabled)",
  checked: ":is(:is(input[type=radio], input[type=checkbox])[checked], option:selected)",
  required: ":is(input, select, textarea)[required]",
  optional: ":is(input, select, textarea):not([required])",
  // JQuery extensions
  // https://html.spec.whatwg.org/multipage/form-elements.html#concept-option-selectedness
  selected: "option:is([selected], select:not([multiple]):not(:has(> option[selected])) > :first-of-type)",
  checkbox: "[type=checkbox]",
  file: "[type=file]",
  password: "[type=password]",
  radio: "[type=radio]",
  reset: "[type=reset]",
  image: "[type=image]",
  submit: "[type=submit]",
  parent: ":not(:empty)",
  header: ":is(h1, h2, h3, h4, h5, h6)",
  button: ":is(button, input[type=button])",
  input: ":is(input, textarea, select, button)",
  text: "input:is(:not([type!='']), [type=text])"
}, Il = {};
function Lg(t, e) {
  return t === Ft.falseFunc ? Ft.falseFunc : (n) => e.isTag(n) && t(n);
}
function Sl(t, e) {
  const n = e.getSiblings(t);
  if (n.length <= 1)
    return [];
  const r = n.indexOf(t);
  return r < 0 || r === n.length - 1 ? [] : n.slice(r + 1).filter(e.isTag);
}
function Lu(t) {
  return {
    xmlMode: !!t.xmlMode,
    lowerCaseAttributeNames: !!t.lowerCaseAttributeNames,
    lowerCaseTags: !!t.lowerCaseTags,
    quirksMode: !!t.quirksMode,
    cacheResults: !!t.cacheResults,
    pseudos: t.pseudos,
    adapter: t.adapter,
    equals: t.equals
  };
}
const Ja = (t, e, n, r, a) => {
  const u = a(e, Lu(n), r);
  return u === Ft.trueFunc ? t : u === Ft.falseFunc ? Ft.falseFunc : (o) => u(o) && t(o);
}, Za = {
  is: Ja,
  /**
   * `:matches` and `:where` are aliases for `:is`.
   */
  matches: Ja,
  where: Ja,
  not(t, e, n, r, a) {
    const u = a(e, Lu(n), r);
    return u === Ft.falseFunc ? t : u === Ft.trueFunc ? Ft.falseFunc : (o) => !u(o) && t(o);
  },
  has(t, e, n, r, a) {
    const { adapter: u } = n, o = Lu(n);
    o.relativeSelector = !0;
    const h = e.some((p) => p.some(so)) ? (
      // Used as a placeholder. Will be replaced with the actual element.
      [Il]
    ) : void 0, m = a(e, o, h);
    if (m === Ft.falseFunc)
      return Ft.falseFunc;
    const E = Lg(m, u);
    if (h && m !== Ft.trueFunc) {
      const { shouldTestNextSiblings: p = !1 } = m;
      return (N) => {
        if (!t(N))
          return !1;
        h[0] = N;
        const v = u.getChildren(N), S = p ? [...v, ...Sl(N, u)] : v;
        return u.existsOne(E, S);
      };
    }
    return (p) => t(p) && u.existsOne(E, u.getChildren(p));
  }
};
function Og(t, e, n, r, a) {
  var u;
  const { name: o, data: h } = e;
  if (Array.isArray(h)) {
    if (!(o in Za))
      throw new Error(`Unknown pseudo-class :${o}(${h})`);
    return Za[o](t, h, n, r, a);
  }
  const m = (u = n.pseudos) === null || u === void 0 ? void 0 : u[o], E = typeof m == "string" ? m : Rg[o];
  if (typeof E == "string") {
    if (h != null)
      throw new Error(`Pseudo ${o} doesn't have any arguments`);
    const p = Sa(E);
    return Za.is(t, p, n, r, a);
  }
  if (typeof m == "function")
    return Ic(m, o, h, 1), (p) => m(p, h) && t(p);
  if (o in Ru)
    return Ru[o](t, h, n, r);
  if (o in Cc) {
    const p = Cc[o];
    return Ic(p, o, h, 2), (N) => p(N, n, h) && t(N);
  }
  throw new Error(`Unknown pseudo-class :${o}`);
}
function tu(t, e) {
  const n = e.getParent(t);
  return n && e.isTag(n) ? n : null;
}
function wg(t, e, n, r, a) {
  const { adapter: u, equals: o } = n;
  switch (e.type) {
    case _t.PseudoElement:
      throw new Error("Pseudo-elements are not supported by css-select");
    case _t.ColumnCombinator:
      throw new Error("Column combinators are not yet supported by css-select");
    case _t.Attribute: {
      if (e.namespace != null)
        throw new Error("Namespaced attributes are not yet supported by css-select");
      return (!n.xmlMode || n.lowerCaseAttributeNames) && (e.name = e.name.toLowerCase()), Ig[e.action](t, e, n);
    }
    case _t.Pseudo:
      return Og(t, e, n, r, a);
    case _t.Tag: {
      if (e.namespace != null)
        throw new Error("Namespaced tag names are not yet supported by css-select");
      let { name: h } = e;
      return (!n.xmlMode || n.lowerCaseTags) && (h = h.toLowerCase()), function(E) {
        return u.getName(E) === h && t(E);
      };
    }
    case _t.Descendant: {
      if (n.cacheResults === !1 || typeof WeakSet > "u")
        return function(E) {
          let p = E;
          for (; p = tu(p, u); )
            if (t(p))
              return !0;
          return !1;
        };
      const h = /* @__PURE__ */ new WeakSet();
      return function(E) {
        let p = E;
        for (; p = tu(p, u); )
          if (!h.has(p)) {
            if (u.isTag(p) && t(p))
              return !0;
            h.add(p);
          }
        return !1;
      };
    }
    case "_flexibleDescendant":
      return function(m) {
        let E = m;
        do
          if (t(E))
            return !0;
        while (E = tu(E, u));
        return !1;
      };
    case _t.Parent:
      return function(m) {
        return u.getChildren(m).some((E) => u.isTag(E) && t(E));
      };
    case _t.Child:
      return function(m) {
        const E = u.getParent(m);
        return E != null && u.isTag(E) && t(E);
      };
    case _t.Sibling:
      return function(m) {
        const E = u.getSiblings(m);
        for (let p = 0; p < E.length; p++) {
          const N = E[p];
          if (o(m, N))
            break;
          if (u.isTag(N) && t(N))
            return !0;
        }
        return !1;
      };
    case _t.Adjacent:
      return u.prevElementSibling ? function(m) {
        const E = u.prevElementSibling(m);
        return E != null && t(E);
      } : function(m) {
        const E = u.getSiblings(m);
        let p;
        for (let N = 0; N < E.length; N++) {
          const v = E[N];
          if (o(m, v))
            break;
          u.isTag(v) && (p = v);
        }
        return !!p && t(p);
      };
    case _t.Universal: {
      if (e.namespace != null && e.namespace !== "*")
        throw new Error("Namespaced universal selectors are not yet supported by css-select");
      return t;
    }
  }
}
function Nl(t) {
  return t.type === _t.Pseudo && (t.name === "scope" || Array.isArray(t.data) && t.data.some((e) => e.some(Nl)));
}
const Dg = { type: _t.Descendant }, Pg = {
  type: "_flexibleDescendant"
}, Bg = {
  type: _t.Pseudo,
  name: "scope",
  data: null
};
function Mg(t, { adapter: e }, n) {
  const r = !!(n != null && n.every((a) => {
    const u = e.isTag(a) && e.getParent(a);
    return a === Il || u && e.isTag(u);
  }));
  for (const a of t) {
    if (!(a.length > 0 && so(a[0]) && a[0].type !== _t.Descendant))
      if (r && !a.some(Nl))
        a.unshift(Dg);
      else
        continue;
    a.unshift(Bg);
  }
}
function vl(t, e, n) {
  var r;
  t.forEach(Ag), n = (r = e.context) !== null && r !== void 0 ? r : n;
  const a = Array.isArray(n), u = n && (Array.isArray(n) ? n : [n]);
  if (e.relativeSelector !== !1)
    Mg(t, e, u);
  else if (t.some((m) => m.length > 0 && so(m[0])))
    throw new Error("Relative selectors are not allowed when the `relativeSelector` option is disabled");
  let o = !1;
  const h = t.map((m) => {
    if (m.length >= 2) {
      const [E, p] = m;
      E.type !== _t.Pseudo || E.name !== "scope" || (a && p.type === _t.Descendant ? m[1] = Pg : (p.type === _t.Adjacent || p.type === _t.Sibling) && (o = !0));
    }
    return Fg(m, e, u);
  }).reduce(kg, Ft.falseFunc);
  return h.shouldTestNextSiblings = o, h;
}
function Fg(t, e, n) {
  var r;
  return t.reduce((a, u) => a === Ft.falseFunc ? Ft.falseFunc : wg(a, u, e, n, vl), (r = e.rootFunc) !== null && r !== void 0 ? r : Ft.trueFunc);
}
function kg(t, e) {
  return e === Ft.falseFunc || t === Ft.trueFunc ? t : t === Ft.falseFunc || e === Ft.trueFunc ? e : function(r) {
    return t(r) || e(r);
  };
}
const xl = (t, e) => t === e, Ug = {
  adapter: Ia,
  equals: xl
};
function Hg(t) {
  var e, n, r, a;
  const u = t ?? Ug;
  return (e = u.adapter) !== null && e !== void 0 || (u.adapter = Ia), (n = u.equals) !== null && n !== void 0 || (u.equals = (a = (r = u.adapter) === null || r === void 0 ? void 0 : r.equals) !== null && a !== void 0 ? a : xl), u;
}
function qg(t) {
  return function(n, r, a) {
    const u = Hg(r);
    return t(n, u, a);
  };
}
const io = qg(vl);
function Rl(t, e, n = !1) {
  return n && (t = $g(t, e)), Array.isArray(t) ? e.removeSubsets(t) : e.getChildren(t);
}
function $g(t, e) {
  const n = Array.isArray(t) ? t.slice(0) : [t], r = n.length;
  for (let a = 0; a < r; a++) {
    const u = Sl(n[a], e);
    n.push(...u);
  }
  return n;
}
const Gg = /* @__PURE__ */ new Set([
  "first",
  "last",
  "eq",
  "gt",
  "nth",
  "lt",
  "even",
  "odd"
]);
function aa(t) {
  return t.type !== "pseudo" ? !1 : Gg.has(t.name) ? !0 : t.name === "not" && Array.isArray(t.data) ? t.data.some((e) => e.some(aa)) : !1;
}
function Yg(t, e, n) {
  const r = e != null ? parseInt(e, 10) : NaN;
  switch (t) {
    case "first":
      return 1;
    case "nth":
    case "eq":
      return isFinite(r) ? r >= 0 ? r + 1 : 1 / 0 : 0;
    case "lt":
      return isFinite(r) ? r >= 0 ? Math.min(r, n) : 1 / 0 : 0;
    case "gt":
      return isFinite(r) ? 1 / 0 : 0;
    case "odd":
      return 2 * n;
    case "even":
      return 2 * n - 1;
    case "last":
    case "not":
      return 1 / 0;
  }
}
function Vg(t) {
  for (; t.parent; )
    t = t.parent;
  return t;
}
function ao(t) {
  const e = [], n = [];
  for (const r of t)
    r.some(aa) ? e.push(r) : n.push(r);
  return [n, e];
}
const jg = {
  type: _t.Universal,
  namespace: null
}, Wg = {
  type: _t.Pseudo,
  name: "scope",
  data: null
};
function Ll(t, e, n = {}) {
  return Ol([t], e, n);
}
function Ol(t, e, n = {}) {
  if (typeof e == "function")
    return t.some(e);
  const [r, a] = ao(Sa(e));
  return r.length > 0 && t.some(io(r, n)) || a.some((u) => Pl(u, t, n).length > 0);
}
function Qg(t, e, n, r) {
  const a = typeof n == "string" ? parseInt(n, 10) : NaN;
  switch (t) {
    case "first":
    case "lt":
      return e;
    case "last":
      return e.length > 0 ? [e[e.length - 1]] : e;
    case "nth":
    case "eq":
      return isFinite(a) && Math.abs(a) < e.length ? [a < 0 ? e[e.length + a] : e[a]] : [];
    case "gt":
      return isFinite(a) ? e.slice(a + 1) : [];
    case "even":
      return e.filter((u, o) => o % 2 === 0);
    case "odd":
      return e.filter((u, o) => o % 2 === 1);
    case "not": {
      const u = new Set(Dl(n, e, r));
      return e.filter((o) => !u.has(o));
    }
  }
}
function wl(t, e, n = {}) {
  return Dl(Sa(t), e, n);
}
function Dl(t, e, n) {
  if (e.length === 0)
    return [];
  const [r, a] = ao(t);
  let u;
  if (r.length) {
    const o = wu(e, r, n);
    if (a.length === 0)
      return o;
    o.length && (u = new Set(o));
  }
  for (let o = 0; o < a.length && (u == null ? void 0 : u.size) !== e.length; o++) {
    const h = a[o];
    if ((u ? e.filter((p) => It(p) && !u.has(p)) : e).length === 0)
      break;
    const E = Pl(h, e, n);
    if (E.length)
      if (u)
        E.forEach((p) => u.add(p));
      else {
        if (o === a.length - 1)
          return E;
        u = new Set(E);
      }
  }
  return typeof u < "u" ? u.size === e.length ? e : (
    // Filter elements to preserve order
    e.filter((o) => u.has(o))
  ) : [];
}
function Pl(t, e, n) {
  var r;
  if (t.some(ni)) {
    const a = (r = n.root) !== null && r !== void 0 ? r : Vg(e[0]), u = { ...n, context: e, relativeSelector: !1 };
    return t.push(Wg), ua(a, t, u, !0, e.length);
  }
  return ua(e, t, n, !1, e.length);
}
function Kg(t, e, n = {}, r = 1 / 0) {
  if (typeof t == "function")
    return Bl(e, t);
  const [a, u] = ao(Sa(t)), o = u.map((h) => ua(e, h, n, !0, r));
  return a.length && o.push(Ou(e, a, n, r)), o.length === 0 ? [] : o.length === 1 ? o[0] : Gs(o.reduce((h, m) => [...h, ...m]));
}
function ua(t, e, n, r, a) {
  const u = e.findIndex(aa), o = e.slice(0, u), h = e[u], m = e.length - 1 === u ? a : 1 / 0, E = Yg(h.name, h.data, m);
  if (E === 0)
    return [];
  const N = (o.length === 0 && !Array.isArray(t) ? ya(t).filter(It) : o.length === 0 ? (Array.isArray(t) ? t : [t]).filter(It) : r || o.some(ni) ? Ou(t, [o], n, E) : wu(t, [o], n)).slice(0, E);
  let v = Qg(h.name, N, h.data, n);
  if (v.length === 0 || e.length === u + 1)
    return v;
  const S = e.slice(u + 1), L = S.some(ni);
  if (L) {
    if (ni(S[0])) {
      const { type: W } = S[0];
      (W === _t.Sibling || W === _t.Adjacent) && (v = Rl(v, Ia, !0)), S.unshift(jg);
    }
    n = {
      ...n,
      // Avoid absolutizing the selector
      relativeSelector: !1,
      /*
       * Add a custom root func, to make sure traversals don't match elements
       * that aren't a part of the considered tree.
       */
      rootFunc: (W) => v.includes(W)
    };
  } else
    n.rootFunc && n.rootFunc !== Kr.trueFunc && (n = { ...n, rootFunc: Kr.trueFunc });
  return S.some(aa) ? ua(v, S, n, !1, a) : L ? (
    // Query existing elements to resolve traversal.
    Ou(v, [S], n, a)
  ) : (
    // If we don't have any more traversals, simply filter elements.
    wu(v, [S], n)
  );
}
function Ou(t, e, n, r) {
  const a = io(e, n, t);
  return Bl(t, a, r);
}
function Bl(t, e, n = 1 / 0) {
  const r = Rl(t, Ia, e.shouldTestNextSiblings);
  return eo((a) => It(a) && e(a), r, !0, n);
}
function wu(t, e, n) {
  const r = (Array.isArray(t) ? t : [t]).filter(It);
  if (r.length === 0)
    return r;
  const a = io(e, n);
  return a === Kr.trueFunc ? r : r.filter(a);
}
const Xg = /^\s*[~+]/;
function zg(t) {
  var e;
  if (!t)
    return this._make([]);
  const n = this.toArray();
  if (typeof t != "string") {
    const u = Hr(t) ? t.toArray() : [t];
    return this._make(u.filter((o) => n.some((h) => pl(h, o))));
  }
  const r = Xg.test(t) ? n : this.children().toArray(), a = {
    context: n,
    root: (e = this._root) === null || e === void 0 ? void 0 : e[0],
    // Pass options that are recognized by `cheerio-select`
    xmlMode: this.options.xmlMode,
    lowerCaseTags: this.options.lowerCaseTags,
    lowerCaseAttributeNames: this.options.lowerCaseAttributeNames,
    pseudos: this.options.pseudos,
    quirksMode: this.options.quirksMode
  };
  return this._make(Kg(t, r, a));
}
function uo(t) {
  return function(e, ...n) {
    return function(r) {
      var a;
      let u = t(e, this);
      return r && (u = fo(u, r, this.options.xmlMode, (a = this._root) === null || a === void 0 ? void 0 : a[0])), this._make(
        // Post processing is only necessary if there is more than one element.
        this.length > 1 && u.length > 1 ? n.reduce((o, h) => h(o), u) : u
      );
    };
  };
}
const _i = uo((t, e) => {
  const n = [];
  for (let r = 0; r < e.length; r++) {
    const a = t(e[r]);
    n.push(a);
  }
  return new Array().concat(...n);
}), oo = uo((t, e) => {
  const n = [];
  for (let r = 0; r < e.length; r++) {
    const a = t(e[r]);
    a !== null && n.push(a);
  }
  return n;
});
function co(t, ...e) {
  let n = null;
  const r = uo((a, u) => {
    const o = [];
    return Ce(u, (h) => {
      for (let m; (m = a(h)) && !(n != null && n(m, o.length)); h = m)
        o.push(m);
    }), o;
  })(t, ...e);
  return function(a, u) {
    n = typeof a == "string" ? (h) => Ll(h, a, this.options) : a ? Ti(a) : null;
    const o = r.call(this, u);
    return n = null, o;
  };
}
function Ys(t) {
  return Array.from(new Set(t));
}
const Jg = oo(({ parent: t }) => t && !As(t) ? t : null, Ys), Zg = _i((t) => {
  const e = [];
  for (; t.parent && !As(t.parent); )
    e.push(t.parent), t = t.parent;
  return e;
}, Gs, (t) => t.reverse()), t1 = co(({ parent: t }) => t && !As(t) ? t : null, Gs, (t) => t.reverse());
function e1(t) {
  var e;
  const n = [];
  if (!t)
    return this._make(n);
  const r = {
    xmlMode: this.options.xmlMode,
    root: (e = this._root) === null || e === void 0 ? void 0 : e[0]
  }, a = typeof t == "string" ? (u) => Ll(u, t, r) : Ti(t);
  return Ce(this, (u) => {
    for (; u && It(u); ) {
      if (a(u, 0)) {
        n.includes(u) || n.push(u);
        break;
      }
      u = u.parent;
    }
  }), this._make(n);
}
const n1 = oo((t) => Zu(t)), r1 = _i((t) => {
  const e = [];
  for (; t.next; )
    t = t.next, It(t) && e.push(t);
  return e;
}, Ys), s1 = co((t) => Zu(t), Ys), i1 = oo((t) => to(t)), a1 = _i((t) => {
  const e = [];
  for (; t.prev; )
    t = t.prev, It(t) && e.push(t);
  return e;
}, Ys), u1 = co((t) => to(t), Ys), o1 = _i((t) => ul(t).filter((e) => It(e) && e !== t), Gs), c1 = _i((t) => ya(t).filter(It), Ys);
function f1() {
  const t = this.toArray().reduce((e, n) => Ze(n) ? e.concat(n.children) : e, []);
  return this._make(t);
}
function l1(t) {
  let e = 0;
  const n = this.length;
  for (; e < n && t.call(this[e], e, this[e]) !== !1; )
    ++e;
  return this;
}
function h1(t) {
  let e = [];
  for (let n = 0; n < this.length; n++) {
    const r = this[n], a = t.call(r, n, r);
    a != null && (e = e.concat(a));
  }
  return this._make(e);
}
function Ti(t) {
  return typeof t == "function" ? (e, n) => t.call(e, n, e) : Hr(t) ? (e) => Array.prototype.includes.call(t, e) : function(e) {
    return t === e;
  };
}
function d1(t) {
  var e;
  return this._make(fo(this.toArray(), t, this.options.xmlMode, (e = this._root) === null || e === void 0 ? void 0 : e[0]));
}
function fo(t, e, n, r) {
  return typeof e == "string" ? wl(e, t, { xmlMode: n, root: r }) : t.filter(Ti(e));
}
function p1(t) {
  const e = this.toArray();
  return typeof t == "string" ? Ol(e.filter(It), t, this.options) : t ? e.some(Ti(t)) : !1;
}
function g1(t) {
  let e = this.toArray();
  if (typeof t == "string") {
    const n = new Set(wl(t, e, this.options));
    e = e.filter((r) => !n.has(r));
  } else {
    const n = Ti(t);
    e = e.filter((r, a) => !n(r, a));
  }
  return this._make(e);
}
function E1(t) {
  return this.filter(typeof t == "string" ? (
    // Using the `:has` selector here short-circuits searches.
    `:has(${t})`
  ) : (e, n) => this._make(n).find(t).length > 0);
}
function m1() {
  return this.length > 1 ? this._make(this[0]) : this;
}
function b1() {
  return this.length > 0 ? this._make(this[this.length - 1]) : this;
}
function _1(t) {
  var e;
  return t = +t, t === 0 && this.length <= 1 ? this : (t < 0 && (t = this.length + t), this._make((e = this[t]) !== null && e !== void 0 ? e : []));
}
function T1(t) {
  return t == null ? this.toArray() : this[t < 0 ? this.length + t : t];
}
function A1() {
  return Array.prototype.slice.call(this);
}
function y1(t) {
  let e, n;
  return t == null ? (e = this.parent().children(), n = this[0]) : typeof t == "string" ? (e = this._make(t), n = this[0]) : (e = this, n = Hr(t) ? t[0] : t), Array.prototype.indexOf.call(e, n);
}
function C1(t, e) {
  return this._make(Array.prototype.slice.call(this, t, e));
}
function I1() {
  var t;
  return (t = this.prevObject) !== null && t !== void 0 ? t : this._make([]);
}
function S1(t, e) {
  const n = this._make(t, e), r = Gs([...this.get(), ...n.get()]);
  return this._make(r);
}
function N1(t) {
  return this.prevObject ? this.add(t ? this.prevObject.filter(t) : this.prevObject) : this;
}
const v1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: S1,
  addBack: N1,
  children: c1,
  closest: e1,
  contents: f1,
  each: l1,
  end: I1,
  eq: _1,
  filter: d1,
  filterArray: fo,
  find: zg,
  first: m1,
  get: T1,
  has: E1,
  index: y1,
  is: p1,
  last: b1,
  map: h1,
  next: n1,
  nextAll: r1,
  nextUntil: s1,
  not: g1,
  parent: Jg,
  parents: Zg,
  parentsUntil: t1,
  prev: i1,
  prevAll: a1,
  prevUntil: u1,
  siblings: o1,
  slice: C1,
  toArray: A1
}, Symbol.toStringTag, { value: "Module" }));
var je = {}, Na = {};
Na.byteLength = L1;
Na.toByteArray = w1;
Na.fromByteArray = B1;
var Fr = [], nr = [], x1 = typeof Uint8Array < "u" ? Uint8Array : Array, eu = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var Rs = 0, R1 = eu.length; Rs < R1; ++Rs)
  Fr[Rs] = eu[Rs], nr[eu.charCodeAt(Rs)] = Rs;
nr[45] = 62;
nr[95] = 63;
function Ml(t) {
  var e = t.length;
  if (e % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var n = t.indexOf("=");
  n === -1 && (n = e);
  var r = n === e ? 0 : 4 - n % 4;
  return [n, r];
}
function L1(t) {
  var e = Ml(t), n = e[0], r = e[1];
  return (n + r) * 3 / 4 - r;
}
function O1(t, e, n) {
  return (e + n) * 3 / 4 - n;
}
function w1(t) {
  var e, n = Ml(t), r = n[0], a = n[1], u = new x1(O1(t, r, a)), o = 0, h = a > 0 ? r - 4 : r, m;
  for (m = 0; m < h; m += 4)
    e = nr[t.charCodeAt(m)] << 18 | nr[t.charCodeAt(m + 1)] << 12 | nr[t.charCodeAt(m + 2)] << 6 | nr[t.charCodeAt(m + 3)], u[o++] = e >> 16 & 255, u[o++] = e >> 8 & 255, u[o++] = e & 255;
  return a === 2 && (e = nr[t.charCodeAt(m)] << 2 | nr[t.charCodeAt(m + 1)] >> 4, u[o++] = e & 255), a === 1 && (e = nr[t.charCodeAt(m)] << 10 | nr[t.charCodeAt(m + 1)] << 4 | nr[t.charCodeAt(m + 2)] >> 2, u[o++] = e >> 8 & 255, u[o++] = e & 255), u;
}
function D1(t) {
  return Fr[t >> 18 & 63] + Fr[t >> 12 & 63] + Fr[t >> 6 & 63] + Fr[t & 63];
}
function P1(t, e, n) {
  for (var r, a = [], u = e; u < n; u += 3)
    r = (t[u] << 16 & 16711680) + (t[u + 1] << 8 & 65280) + (t[u + 2] & 255), a.push(D1(r));
  return a.join("");
}
function B1(t) {
  for (var e, n = t.length, r = n % 3, a = [], u = 16383, o = 0, h = n - r; o < h; o += u)
    a.push(P1(t, o, o + u > h ? h : o + u));
  return r === 1 ? (e = t[n - 1], a.push(
    Fr[e >> 2] + Fr[e << 4 & 63] + "=="
  )) : r === 2 && (e = (t[n - 2] << 8) + t[n - 1], a.push(
    Fr[e >> 10] + Fr[e >> 4 & 63] + Fr[e << 2 & 63] + "="
  )), a.join("");
}
var lo = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
lo.read = function(t, e, n, r, a) {
  var u, o, h = a * 8 - r - 1, m = (1 << h) - 1, E = m >> 1, p = -7, N = n ? a - 1 : 0, v = n ? -1 : 1, S = t[e + N];
  for (N += v, u = S & (1 << -p) - 1, S >>= -p, p += h; p > 0; u = u * 256 + t[e + N], N += v, p -= 8)
    ;
  for (o = u & (1 << -p) - 1, u >>= -p, p += r; p > 0; o = o * 256 + t[e + N], N += v, p -= 8)
    ;
  if (u === 0)
    u = 1 - E;
  else {
    if (u === m)
      return o ? NaN : (S ? -1 : 1) * (1 / 0);
    o = o + Math.pow(2, r), u = u - E;
  }
  return (S ? -1 : 1) * o * Math.pow(2, u - r);
};
lo.write = function(t, e, n, r, a, u) {
  var o, h, m, E = u * 8 - a - 1, p = (1 << E) - 1, N = p >> 1, v = a === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, S = r ? 0 : u - 1, L = r ? 1 : -1, W = e < 0 || e === 0 && 1 / e < 0 ? 1 : 0;
  for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (h = isNaN(e) ? 1 : 0, o = p) : (o = Math.floor(Math.log(e) / Math.LN2), e * (m = Math.pow(2, -o)) < 1 && (o--, m *= 2), o + N >= 1 ? e += v / m : e += v * Math.pow(2, 1 - N), e * m >= 2 && (o++, m /= 2), o + N >= p ? (h = 0, o = p) : o + N >= 1 ? (h = (e * m - 1) * Math.pow(2, a), o = o + N) : (h = e * Math.pow(2, N - 1) * Math.pow(2, a), o = 0)); a >= 8; t[n + S] = h & 255, S += L, h /= 256, a -= 8)
    ;
  for (o = o << a | h, E += a; E > 0; t[n + S] = o & 255, S += L, o /= 256, E -= 8)
    ;
  t[n + S - L] |= W * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(t) {
  const e = Na, n = lo, r = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  t.Buffer = p, t.SlowBuffer = U, t.INSPECT_MAX_BYTES = 50;
  const a = 2147483647;
  t.kMaxLength = a;
  const { Uint8Array: u, ArrayBuffer: o, SharedArrayBuffer: h } = globalThis;
  p.TYPED_ARRAY_SUPPORT = m(), !p.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
  );
  function m() {
    try {
      const b = new u(1), l = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(l, u.prototype), Object.setPrototypeOf(b, l), b.foo() === 42;
    } catch {
      return !1;
    }
  }
  Object.defineProperty(p.prototype, "parent", {
    enumerable: !0,
    get: function() {
      if (p.isBuffer(this))
        return this.buffer;
    }
  }), Object.defineProperty(p.prototype, "offset", {
    enumerable: !0,
    get: function() {
      if (p.isBuffer(this))
        return this.byteOffset;
    }
  });
  function E(b) {
    if (b > a)
      throw new RangeError('The value "' + b + '" is invalid for option "size"');
    const l = new u(b);
    return Object.setPrototypeOf(l, p.prototype), l;
  }
  function p(b, l, d) {
    if (typeof b == "number") {
      if (typeof l == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return L(b);
    }
    return N(b, l, d);
  }
  p.poolSize = 8192;
  function N(b, l, d) {
    if (typeof b == "string")
      return W(b, l);
    if (o.isView(b))
      return O(b);
    if (b == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof b
      );
    if (fe(b, o) || b && fe(b.buffer, o) || typeof h < "u" && (fe(b, h) || b && fe(b.buffer, h)))
      return F(b, l, d);
    if (typeof b == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    const A = b.valueOf && b.valueOf();
    if (A != null && A !== b)
      return p.from(A, l, d);
    const R = Z(b);
    if (R)
      return R;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof b[Symbol.toPrimitive] == "function")
      return p.from(b[Symbol.toPrimitive]("string"), l, d);
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof b
    );
  }
  p.from = function(b, l, d) {
    return N(b, l, d);
  }, Object.setPrototypeOf(p.prototype, u.prototype), Object.setPrototypeOf(p, u);
  function v(b) {
    if (typeof b != "number")
      throw new TypeError('"size" argument must be of type number');
    if (b < 0)
      throw new RangeError('The value "' + b + '" is invalid for option "size"');
  }
  function S(b, l, d) {
    return v(b), b <= 0 ? E(b) : l !== void 0 ? typeof d == "string" ? E(b).fill(l, d) : E(b).fill(l) : E(b);
  }
  p.alloc = function(b, l, d) {
    return S(b, l, d);
  };
  function L(b) {
    return v(b), E(b < 0 ? 0 : Q(b) | 0);
  }
  p.allocUnsafe = function(b) {
    return L(b);
  }, p.allocUnsafeSlow = function(b) {
    return L(b);
  };
  function W(b, l) {
    if ((typeof l != "string" || l === "") && (l = "utf8"), !p.isEncoding(l))
      throw new TypeError("Unknown encoding: " + l);
    const d = P(b, l) | 0;
    let A = E(d);
    const R = A.write(b, l);
    return R !== d && (A = A.slice(0, R)), A;
  }
  function M(b) {
    const l = b.length < 0 ? 0 : Q(b.length) | 0, d = E(l);
    for (let A = 0; A < l; A += 1)
      d[A] = b[A] & 255;
    return d;
  }
  function O(b) {
    if (fe(b, u)) {
      const l = new u(b);
      return F(l.buffer, l.byteOffset, l.byteLength);
    }
    return M(b);
  }
  function F(b, l, d) {
    if (l < 0 || b.byteLength < l)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (b.byteLength < l + (d || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let A;
    return l === void 0 && d === void 0 ? A = new u(b) : d === void 0 ? A = new u(b, l) : A = new u(b, l, d), Object.setPrototypeOf(A, p.prototype), A;
  }
  function Z(b) {
    if (p.isBuffer(b)) {
      const l = Q(b.length) | 0, d = E(l);
      return d.length === 0 || b.copy(d, 0, 0, l), d;
    }
    if (b.length !== void 0)
      return typeof b.length != "number" || bn(b.length) ? E(0) : M(b);
    if (b.type === "Buffer" && Array.isArray(b.data))
      return M(b.data);
  }
  function Q(b) {
    if (b >= a)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + a.toString(16) + " bytes");
    return b | 0;
  }
  function U(b) {
    return +b != b && (b = 0), p.alloc(+b);
  }
  p.isBuffer = function(l) {
    return l != null && l._isBuffer === !0 && l !== p.prototype;
  }, p.compare = function(l, d) {
    if (fe(l, u) && (l = p.from(l, l.offset, l.byteLength)), fe(d, u) && (d = p.from(d, d.offset, d.byteLength)), !p.isBuffer(l) || !p.isBuffer(d))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (l === d)
      return 0;
    let A = l.length, R = d.length;
    for (let B = 0, V = Math.min(A, R); B < V; ++B)
      if (l[B] !== d[B]) {
        A = l[B], R = d[B];
        break;
      }
    return A < R ? -1 : R < A ? 1 : 0;
  }, p.isEncoding = function(l) {
    switch (String(l).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return !0;
      default:
        return !1;
    }
  }, p.concat = function(l, d) {
    if (!Array.isArray(l))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (l.length === 0)
      return p.alloc(0);
    let A;
    if (d === void 0)
      for (d = 0, A = 0; A < l.length; ++A)
        d += l[A].length;
    const R = p.allocUnsafe(d);
    let B = 0;
    for (A = 0; A < l.length; ++A) {
      let V = l[A];
      if (fe(V, u))
        B + V.length > R.length ? (p.isBuffer(V) || (V = p.from(V)), V.copy(R, B)) : u.prototype.set.call(
          R,
          V,
          B
        );
      else if (p.isBuffer(V))
        V.copy(R, B);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      B += V.length;
    }
    return R;
  };
  function P(b, l) {
    if (p.isBuffer(b))
      return b.length;
    if (o.isView(b) || fe(b, o))
      return b.byteLength;
    if (typeof b != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof b
      );
    const d = b.length, A = arguments.length > 2 && arguments[2] === !0;
    if (!A && d === 0)
      return 0;
    let R = !1;
    for (; ; )
      switch (l) {
        case "ascii":
        case "latin1":
        case "binary":
          return d;
        case "utf8":
        case "utf-8":
          return Ke(b).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return d * 2;
        case "hex":
          return d >>> 1;
        case "base64":
          return ge(b).length;
        default:
          if (R)
            return A ? -1 : Ke(b).length;
          l = ("" + l).toLowerCase(), R = !0;
      }
  }
  p.byteLength = P;
  function Y(b, l, d) {
    let A = !1;
    if ((l === void 0 || l < 0) && (l = 0), l > this.length || ((d === void 0 || d > this.length) && (d = this.length), d <= 0) || (d >>>= 0, l >>>= 0, d <= l))
      return "";
    for (b || (b = "utf8"); ; )
      switch (b) {
        case "hex":
          return tn(this, l, d);
        case "utf8":
        case "utf-8":
          return Ct(this, l, d);
        case "ascii":
          return on(this, l, d);
        case "latin1":
        case "binary":
          return zt(this, l, d);
        case "base64":
          return Xt(this, l, d);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Nt(this, l, d);
        default:
          if (A)
            throw new TypeError("Unknown encoding: " + b);
          b = (b + "").toLowerCase(), A = !0;
      }
  }
  p.prototype._isBuffer = !0;
  function H(b, l, d) {
    const A = b[l];
    b[l] = b[d], b[d] = A;
  }
  p.prototype.swap16 = function() {
    const l = this.length;
    if (l % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let d = 0; d < l; d += 2)
      H(this, d, d + 1);
    return this;
  }, p.prototype.swap32 = function() {
    const l = this.length;
    if (l % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (let d = 0; d < l; d += 4)
      H(this, d, d + 3), H(this, d + 1, d + 2);
    return this;
  }, p.prototype.swap64 = function() {
    const l = this.length;
    if (l % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (let d = 0; d < l; d += 8)
      H(this, d, d + 7), H(this, d + 1, d + 6), H(this, d + 2, d + 5), H(this, d + 3, d + 4);
    return this;
  }, p.prototype.toString = function() {
    const l = this.length;
    return l === 0 ? "" : arguments.length === 0 ? Ct(this, 0, l) : Y.apply(this, arguments);
  }, p.prototype.toLocaleString = p.prototype.toString, p.prototype.equals = function(l) {
    if (!p.isBuffer(l))
      throw new TypeError("Argument must be a Buffer");
    return this === l ? !0 : p.compare(this, l) === 0;
  }, p.prototype.inspect = function() {
    let l = "";
    const d = t.INSPECT_MAX_BYTES;
    return l = this.toString("hex", 0, d).replace(/(.{2})/g, "$1 ").trim(), this.length > d && (l += " ... "), "<Buffer " + l + ">";
  }, r && (p.prototype[r] = p.prototype.inspect), p.prototype.compare = function(l, d, A, R, B) {
    if (fe(l, u) && (l = p.from(l, l.offset, l.byteLength)), !p.isBuffer(l))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof l
      );
    if (d === void 0 && (d = 0), A === void 0 && (A = l ? l.length : 0), R === void 0 && (R = 0), B === void 0 && (B = this.length), d < 0 || A > l.length || R < 0 || B > this.length)
      throw new RangeError("out of range index");
    if (R >= B && d >= A)
      return 0;
    if (R >= B)
      return -1;
    if (d >= A)
      return 1;
    if (d >>>= 0, A >>>= 0, R >>>= 0, B >>>= 0, this === l)
      return 0;
    let V = B - R, Et = A - d;
    const Pt = Math.min(V, Et), Bt = this.slice(R, B), Vt = l.slice(d, A);
    for (let xt = 0; xt < Pt; ++xt)
      if (Bt[xt] !== Vt[xt]) {
        V = Bt[xt], Et = Vt[xt];
        break;
      }
    return V < Et ? -1 : Et < V ? 1 : 0;
  };
  function z(b, l, d, A, R) {
    if (b.length === 0)
      return -1;
    if (typeof d == "string" ? (A = d, d = 0) : d > 2147483647 ? d = 2147483647 : d < -2147483648 && (d = -2147483648), d = +d, bn(d) && (d = R ? 0 : b.length - 1), d < 0 && (d = b.length + d), d >= b.length) {
      if (R)
        return -1;
      d = b.length - 1;
    } else if (d < 0)
      if (R)
        d = 0;
      else
        return -1;
    if (typeof l == "string" && (l = p.from(l, A)), p.isBuffer(l))
      return l.length === 0 ? -1 : nt(b, l, d, A, R);
    if (typeof l == "number")
      return l = l & 255, typeof u.prototype.indexOf == "function" ? R ? u.prototype.indexOf.call(b, l, d) : u.prototype.lastIndexOf.call(b, l, d) : nt(b, [l], d, A, R);
    throw new TypeError("val must be string, number or Buffer");
  }
  function nt(b, l, d, A, R) {
    let B = 1, V = b.length, Et = l.length;
    if (A !== void 0 && (A = String(A).toLowerCase(), A === "ucs2" || A === "ucs-2" || A === "utf16le" || A === "utf-16le")) {
      if (b.length < 2 || l.length < 2)
        return -1;
      B = 2, V /= 2, Et /= 2, d /= 2;
    }
    function Pt(Vt, xt) {
      return B === 1 ? Vt[xt] : Vt.readUInt16BE(xt * B);
    }
    let Bt;
    if (R) {
      let Vt = -1;
      for (Bt = d; Bt < V; Bt++)
        if (Pt(b, Bt) === Pt(l, Vt === -1 ? 0 : Bt - Vt)) {
          if (Vt === -1 && (Vt = Bt), Bt - Vt + 1 === Et)
            return Vt * B;
        } else
          Vt !== -1 && (Bt -= Bt - Vt), Vt = -1;
    } else
      for (d + Et > V && (d = V - Et), Bt = d; Bt >= 0; Bt--) {
        let Vt = !0;
        for (let xt = 0; xt < Et; xt++)
          if (Pt(b, Bt + xt) !== Pt(l, xt)) {
            Vt = !1;
            break;
          }
        if (Vt)
          return Bt;
      }
    return -1;
  }
  p.prototype.includes = function(l, d, A) {
    return this.indexOf(l, d, A) !== -1;
  }, p.prototype.indexOf = function(l, d, A) {
    return z(this, l, d, A, !0);
  }, p.prototype.lastIndexOf = function(l, d, A) {
    return z(this, l, d, A, !1);
  };
  function at(b, l, d, A) {
    d = Number(d) || 0;
    const R = b.length - d;
    A ? (A = Number(A), A > R && (A = R)) : A = R;
    const B = l.length;
    A > B / 2 && (A = B / 2);
    let V;
    for (V = 0; V < A; ++V) {
      const Et = parseInt(l.substr(V * 2, 2), 16);
      if (bn(Et))
        return V;
      b[d + V] = Et;
    }
    return V;
  }
  function gt(b, l, d, A) {
    return _e(Ke(l, b.length - d), b, d, A);
  }
  function dt(b, l, d, A) {
    return _e(mn(l), b, d, A);
  }
  function St(b, l, d, A) {
    return _e(ge(l), b, d, A);
  }
  function Ut(b, l, d, A) {
    return _e(cn(l, b.length - d), b, d, A);
  }
  p.prototype.write = function(l, d, A, R) {
    if (d === void 0)
      R = "utf8", A = this.length, d = 0;
    else if (A === void 0 && typeof d == "string")
      R = d, A = this.length, d = 0;
    else if (isFinite(d))
      d = d >>> 0, isFinite(A) ? (A = A >>> 0, R === void 0 && (R = "utf8")) : (R = A, A = void 0);
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    const B = this.length - d;
    if ((A === void 0 || A > B) && (A = B), l.length > 0 && (A < 0 || d < 0) || d > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    R || (R = "utf8");
    let V = !1;
    for (; ; )
      switch (R) {
        case "hex":
          return at(this, l, d, A);
        case "utf8":
        case "utf-8":
          return gt(this, l, d, A);
        case "ascii":
        case "latin1":
        case "binary":
          return dt(this, l, d, A);
        case "base64":
          return St(this, l, d, A);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Ut(this, l, d, A);
        default:
          if (V)
            throw new TypeError("Unknown encoding: " + R);
          R = ("" + R).toLowerCase(), V = !0;
      }
  }, p.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function Xt(b, l, d) {
    return l === 0 && d === b.length ? e.fromByteArray(b) : e.fromByteArray(b.slice(l, d));
  }
  function Ct(b, l, d) {
    d = Math.min(b.length, d);
    const A = [];
    let R = l;
    for (; R < d; ) {
      const B = b[R];
      let V = null, Et = B > 239 ? 4 : B > 223 ? 3 : B > 191 ? 2 : 1;
      if (R + Et <= d) {
        let Pt, Bt, Vt, xt;
        switch (Et) {
          case 1:
            B < 128 && (V = B);
            break;
          case 2:
            Pt = b[R + 1], (Pt & 192) === 128 && (xt = (B & 31) << 6 | Pt & 63, xt > 127 && (V = xt));
            break;
          case 3:
            Pt = b[R + 1], Bt = b[R + 2], (Pt & 192) === 128 && (Bt & 192) === 128 && (xt = (B & 15) << 12 | (Pt & 63) << 6 | Bt & 63, xt > 2047 && (xt < 55296 || xt > 57343) && (V = xt));
            break;
          case 4:
            Pt = b[R + 1], Bt = b[R + 2], Vt = b[R + 3], (Pt & 192) === 128 && (Bt & 192) === 128 && (Vt & 192) === 128 && (xt = (B & 15) << 18 | (Pt & 63) << 12 | (Bt & 63) << 6 | Vt & 63, xt > 65535 && xt < 1114112 && (V = xt));
        }
      }
      V === null ? (V = 65533, Et = 1) : V > 65535 && (V -= 65536, A.push(V >>> 10 & 1023 | 55296), V = 56320 | V & 1023), A.push(V), R += Et;
    }
    return En(A);
  }
  const Qt = 4096;
  function En(b) {
    const l = b.length;
    if (l <= Qt)
      return String.fromCharCode.apply(String, b);
    let d = "", A = 0;
    for (; A < l; )
      d += String.fromCharCode.apply(
        String,
        b.slice(A, A += Qt)
      );
    return d;
  }
  function on(b, l, d) {
    let A = "";
    d = Math.min(b.length, d);
    for (let R = l; R < d; ++R)
      A += String.fromCharCode(b[R] & 127);
    return A;
  }
  function zt(b, l, d) {
    let A = "";
    d = Math.min(b.length, d);
    for (let R = l; R < d; ++R)
      A += String.fromCharCode(b[R]);
    return A;
  }
  function tn(b, l, d) {
    const A = b.length;
    (!l || l < 0) && (l = 0), (!d || d < 0 || d > A) && (d = A);
    let R = "";
    for (let B = l; B < d; ++B)
      R += $n[b[B]];
    return R;
  }
  function Nt(b, l, d) {
    const A = b.slice(l, d);
    let R = "";
    for (let B = 0; B < A.length - 1; B += 2)
      R += String.fromCharCode(A[B] + A[B + 1] * 256);
    return R;
  }
  p.prototype.slice = function(l, d) {
    const A = this.length;
    l = ~~l, d = d === void 0 ? A : ~~d, l < 0 ? (l += A, l < 0 && (l = 0)) : l > A && (l = A), d < 0 ? (d += A, d < 0 && (d = 0)) : d > A && (d = A), d < l && (d = l);
    const R = this.subarray(l, d);
    return Object.setPrototypeOf(R, p.prototype), R;
  };
  function Wt(b, l, d) {
    if (b % 1 !== 0 || b < 0)
      throw new RangeError("offset is not uint");
    if (b + l > d)
      throw new RangeError("Trying to access beyond buffer length");
  }
  p.prototype.readUintLE = p.prototype.readUIntLE = function(l, d, A) {
    l = l >>> 0, d = d >>> 0, A || Wt(l, d, this.length);
    let R = this[l], B = 1, V = 0;
    for (; ++V < d && (B *= 256); )
      R += this[l + V] * B;
    return R;
  }, p.prototype.readUintBE = p.prototype.readUIntBE = function(l, d, A) {
    l = l >>> 0, d = d >>> 0, A || Wt(l, d, this.length);
    let R = this[l + --d], B = 1;
    for (; d > 0 && (B *= 256); )
      R += this[l + --d] * B;
    return R;
  }, p.prototype.readUint8 = p.prototype.readUInt8 = function(l, d) {
    return l = l >>> 0, d || Wt(l, 1, this.length), this[l];
  }, p.prototype.readUint16LE = p.prototype.readUInt16LE = function(l, d) {
    return l = l >>> 0, d || Wt(l, 2, this.length), this[l] | this[l + 1] << 8;
  }, p.prototype.readUint16BE = p.prototype.readUInt16BE = function(l, d) {
    return l = l >>> 0, d || Wt(l, 2, this.length), this[l] << 8 | this[l + 1];
  }, p.prototype.readUint32LE = p.prototype.readUInt32LE = function(l, d) {
    return l = l >>> 0, d || Wt(l, 4, this.length), (this[l] | this[l + 1] << 8 | this[l + 2] << 16) + this[l + 3] * 16777216;
  }, p.prototype.readUint32BE = p.prototype.readUInt32BE = function(l, d) {
    return l = l >>> 0, d || Wt(l, 4, this.length), this[l] * 16777216 + (this[l + 1] << 16 | this[l + 2] << 8 | this[l + 3]);
  }, p.prototype.readBigUInt64LE = Te(function(l) {
    l = l >>> 0, be(l, "offset");
    const d = this[l], A = this[l + 7];
    (d === void 0 || A === void 0) && Ne(l, this.length - 8);
    const R = d + this[++l] * 2 ** 8 + this[++l] * 2 ** 16 + this[++l] * 2 ** 24, B = this[++l] + this[++l] * 2 ** 8 + this[++l] * 2 ** 16 + A * 2 ** 24;
    return BigInt(R) + (BigInt(B) << BigInt(32));
  }), p.prototype.readBigUInt64BE = Te(function(l) {
    l = l >>> 0, be(l, "offset");
    const d = this[l], A = this[l + 7];
    (d === void 0 || A === void 0) && Ne(l, this.length - 8);
    const R = d * 2 ** 24 + this[++l] * 2 ** 16 + this[++l] * 2 ** 8 + this[++l], B = this[++l] * 2 ** 24 + this[++l] * 2 ** 16 + this[++l] * 2 ** 8 + A;
    return (BigInt(R) << BigInt(32)) + BigInt(B);
  }), p.prototype.readIntLE = function(l, d, A) {
    l = l >>> 0, d = d >>> 0, A || Wt(l, d, this.length);
    let R = this[l], B = 1, V = 0;
    for (; ++V < d && (B *= 256); )
      R += this[l + V] * B;
    return B *= 128, R >= B && (R -= Math.pow(2, 8 * d)), R;
  }, p.prototype.readIntBE = function(l, d, A) {
    l = l >>> 0, d = d >>> 0, A || Wt(l, d, this.length);
    let R = d, B = 1, V = this[l + --R];
    for (; R > 0 && (B *= 256); )
      V += this[l + --R] * B;
    return B *= 128, V >= B && (V -= Math.pow(2, 8 * d)), V;
  }, p.prototype.readInt8 = function(l, d) {
    return l = l >>> 0, d || Wt(l, 1, this.length), this[l] & 128 ? (255 - this[l] + 1) * -1 : this[l];
  }, p.prototype.readInt16LE = function(l, d) {
    l = l >>> 0, d || Wt(l, 2, this.length);
    const A = this[l] | this[l + 1] << 8;
    return A & 32768 ? A | 4294901760 : A;
  }, p.prototype.readInt16BE = function(l, d) {
    l = l >>> 0, d || Wt(l, 2, this.length);
    const A = this[l + 1] | this[l] << 8;
    return A & 32768 ? A | 4294901760 : A;
  }, p.prototype.readInt32LE = function(l, d) {
    return l = l >>> 0, d || Wt(l, 4, this.length), this[l] | this[l + 1] << 8 | this[l + 2] << 16 | this[l + 3] << 24;
  }, p.prototype.readInt32BE = function(l, d) {
    return l = l >>> 0, d || Wt(l, 4, this.length), this[l] << 24 | this[l + 1] << 16 | this[l + 2] << 8 | this[l + 3];
  }, p.prototype.readBigInt64LE = Te(function(l) {
    l = l >>> 0, be(l, "offset");
    const d = this[l], A = this[l + 7];
    (d === void 0 || A === void 0) && Ne(l, this.length - 8);
    const R = this[l + 4] + this[l + 5] * 2 ** 8 + this[l + 6] * 2 ** 16 + (A << 24);
    return (BigInt(R) << BigInt(32)) + BigInt(d + this[++l] * 2 ** 8 + this[++l] * 2 ** 16 + this[++l] * 2 ** 24);
  }), p.prototype.readBigInt64BE = Te(function(l) {
    l = l >>> 0, be(l, "offset");
    const d = this[l], A = this[l + 7];
    (d === void 0 || A === void 0) && Ne(l, this.length - 8);
    const R = (d << 24) + // Overflow
    this[++l] * 2 ** 16 + this[++l] * 2 ** 8 + this[++l];
    return (BigInt(R) << BigInt(32)) + BigInt(this[++l] * 2 ** 24 + this[++l] * 2 ** 16 + this[++l] * 2 ** 8 + A);
  }), p.prototype.readFloatLE = function(l, d) {
    return l = l >>> 0, d || Wt(l, 4, this.length), n.read(this, l, !0, 23, 4);
  }, p.prototype.readFloatBE = function(l, d) {
    return l = l >>> 0, d || Wt(l, 4, this.length), n.read(this, l, !1, 23, 4);
  }, p.prototype.readDoubleLE = function(l, d) {
    return l = l >>> 0, d || Wt(l, 8, this.length), n.read(this, l, !0, 52, 8);
  }, p.prototype.readDoubleBE = function(l, d) {
    return l = l >>> 0, d || Wt(l, 8, this.length), n.read(this, l, !1, 52, 8);
  };
  function Zt(b, l, d, A, R, B) {
    if (!p.isBuffer(b))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (l > R || l < B)
      throw new RangeError('"value" argument is out of bounds');
    if (d + A > b.length)
      throw new RangeError("Index out of range");
  }
  p.prototype.writeUintLE = p.prototype.writeUIntLE = function(l, d, A, R) {
    if (l = +l, d = d >>> 0, A = A >>> 0, !R) {
      const Et = Math.pow(2, 8 * A) - 1;
      Zt(this, l, d, A, Et, 0);
    }
    let B = 1, V = 0;
    for (this[d] = l & 255; ++V < A && (B *= 256); )
      this[d + V] = l / B & 255;
    return d + A;
  }, p.prototype.writeUintBE = p.prototype.writeUIntBE = function(l, d, A, R) {
    if (l = +l, d = d >>> 0, A = A >>> 0, !R) {
      const Et = Math.pow(2, 8 * A) - 1;
      Zt(this, l, d, A, Et, 0);
    }
    let B = A - 1, V = 1;
    for (this[d + B] = l & 255; --B >= 0 && (V *= 256); )
      this[d + B] = l / V & 255;
    return d + A;
  }, p.prototype.writeUint8 = p.prototype.writeUInt8 = function(l, d, A) {
    return l = +l, d = d >>> 0, A || Zt(this, l, d, 1, 255, 0), this[d] = l & 255, d + 1;
  }, p.prototype.writeUint16LE = p.prototype.writeUInt16LE = function(l, d, A) {
    return l = +l, d = d >>> 0, A || Zt(this, l, d, 2, 65535, 0), this[d] = l & 255, this[d + 1] = l >>> 8, d + 2;
  }, p.prototype.writeUint16BE = p.prototype.writeUInt16BE = function(l, d, A) {
    return l = +l, d = d >>> 0, A || Zt(this, l, d, 2, 65535, 0), this[d] = l >>> 8, this[d + 1] = l & 255, d + 2;
  }, p.prototype.writeUint32LE = p.prototype.writeUInt32LE = function(l, d, A) {
    return l = +l, d = d >>> 0, A || Zt(this, l, d, 4, 4294967295, 0), this[d + 3] = l >>> 24, this[d + 2] = l >>> 16, this[d + 1] = l >>> 8, this[d] = l & 255, d + 4;
  }, p.prototype.writeUint32BE = p.prototype.writeUInt32BE = function(l, d, A) {
    return l = +l, d = d >>> 0, A || Zt(this, l, d, 4, 4294967295, 0), this[d] = l >>> 24, this[d + 1] = l >>> 16, this[d + 2] = l >>> 8, this[d + 3] = l & 255, d + 4;
  };
  function oe(b, l, d, A, R) {
    se(l, A, R, b, d, 7);
    let B = Number(l & BigInt(4294967295));
    b[d++] = B, B = B >> 8, b[d++] = B, B = B >> 8, b[d++] = B, B = B >> 8, b[d++] = B;
    let V = Number(l >> BigInt(32) & BigInt(4294967295));
    return b[d++] = V, V = V >> 8, b[d++] = V, V = V >> 8, b[d++] = V, V = V >> 8, b[d++] = V, d;
  }
  function We(b, l, d, A, R) {
    se(l, A, R, b, d, 7);
    let B = Number(l & BigInt(4294967295));
    b[d + 7] = B, B = B >> 8, b[d + 6] = B, B = B >> 8, b[d + 5] = B, B = B >> 8, b[d + 4] = B;
    let V = Number(l >> BigInt(32) & BigInt(4294967295));
    return b[d + 3] = V, V = V >> 8, b[d + 2] = V, V = V >> 8, b[d + 1] = V, V = V >> 8, b[d] = V, d + 8;
  }
  p.prototype.writeBigUInt64LE = Te(function(l, d = 0) {
    return oe(this, l, d, BigInt(0), BigInt("0xffffffffffffffff"));
  }), p.prototype.writeBigUInt64BE = Te(function(l, d = 0) {
    return We(this, l, d, BigInt(0), BigInt("0xffffffffffffffff"));
  }), p.prototype.writeIntLE = function(l, d, A, R) {
    if (l = +l, d = d >>> 0, !R) {
      const Pt = Math.pow(2, 8 * A - 1);
      Zt(this, l, d, A, Pt - 1, -Pt);
    }
    let B = 0, V = 1, Et = 0;
    for (this[d] = l & 255; ++B < A && (V *= 256); )
      l < 0 && Et === 0 && this[d + B - 1] !== 0 && (Et = 1), this[d + B] = (l / V >> 0) - Et & 255;
    return d + A;
  }, p.prototype.writeIntBE = function(l, d, A, R) {
    if (l = +l, d = d >>> 0, !R) {
      const Pt = Math.pow(2, 8 * A - 1);
      Zt(this, l, d, A, Pt - 1, -Pt);
    }
    let B = A - 1, V = 1, Et = 0;
    for (this[d + B] = l & 255; --B >= 0 && (V *= 256); )
      l < 0 && Et === 0 && this[d + B + 1] !== 0 && (Et = 1), this[d + B] = (l / V >> 0) - Et & 255;
    return d + A;
  }, p.prototype.writeInt8 = function(l, d, A) {
    return l = +l, d = d >>> 0, A || Zt(this, l, d, 1, 127, -128), l < 0 && (l = 255 + l + 1), this[d] = l & 255, d + 1;
  }, p.prototype.writeInt16LE = function(l, d, A) {
    return l = +l, d = d >>> 0, A || Zt(this, l, d, 2, 32767, -32768), this[d] = l & 255, this[d + 1] = l >>> 8, d + 2;
  }, p.prototype.writeInt16BE = function(l, d, A) {
    return l = +l, d = d >>> 0, A || Zt(this, l, d, 2, 32767, -32768), this[d] = l >>> 8, this[d + 1] = l & 255, d + 2;
  }, p.prototype.writeInt32LE = function(l, d, A) {
    return l = +l, d = d >>> 0, A || Zt(this, l, d, 4, 2147483647, -2147483648), this[d] = l & 255, this[d + 1] = l >>> 8, this[d + 2] = l >>> 16, this[d + 3] = l >>> 24, d + 4;
  }, p.prototype.writeInt32BE = function(l, d, A) {
    return l = +l, d = d >>> 0, A || Zt(this, l, d, 4, 2147483647, -2147483648), l < 0 && (l = 4294967295 + l + 1), this[d] = l >>> 24, this[d + 1] = l >>> 16, this[d + 2] = l >>> 8, this[d + 3] = l & 255, d + 4;
  }, p.prototype.writeBigInt64LE = Te(function(l, d = 0) {
    return oe(this, l, d, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  }), p.prototype.writeBigInt64BE = Te(function(l, d = 0) {
    return We(this, l, d, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function $(b, l, d, A, R, B) {
    if (d + A > b.length)
      throw new RangeError("Index out of range");
    if (d < 0)
      throw new RangeError("Index out of range");
  }
  function Ie(b, l, d, A, R) {
    return l = +l, d = d >>> 0, R || $(b, l, d, 4), n.write(b, l, d, A, 23, 4), d + 4;
  }
  p.prototype.writeFloatLE = function(l, d, A) {
    return Ie(this, l, d, !0, A);
  }, p.prototype.writeFloatBE = function(l, d, A) {
    return Ie(this, l, d, !1, A);
  };
  function Se(b, l, d, A, R) {
    return l = +l, d = d >>> 0, R || $(b, l, d, 8), n.write(b, l, d, A, 52, 8), d + 8;
  }
  p.prototype.writeDoubleLE = function(l, d, A) {
    return Se(this, l, d, !0, A);
  }, p.prototype.writeDoubleBE = function(l, d, A) {
    return Se(this, l, d, !1, A);
  }, p.prototype.copy = function(l, d, A, R) {
    if (!p.isBuffer(l))
      throw new TypeError("argument should be a Buffer");
    if (A || (A = 0), !R && R !== 0 && (R = this.length), d >= l.length && (d = l.length), d || (d = 0), R > 0 && R < A && (R = A), R === A || l.length === 0 || this.length === 0)
      return 0;
    if (d < 0)
      throw new RangeError("targetStart out of bounds");
    if (A < 0 || A >= this.length)
      throw new RangeError("Index out of range");
    if (R < 0)
      throw new RangeError("sourceEnd out of bounds");
    R > this.length && (R = this.length), l.length - d < R - A && (R = l.length - d + A);
    const B = R - A;
    return this === l && typeof u.prototype.copyWithin == "function" ? this.copyWithin(d, A, R) : u.prototype.set.call(
      l,
      this.subarray(A, R),
      d
    ), B;
  }, p.prototype.fill = function(l, d, A, R) {
    if (typeof l == "string") {
      if (typeof d == "string" ? (R = d, d = 0, A = this.length) : typeof A == "string" && (R = A, A = this.length), R !== void 0 && typeof R != "string")
        throw new TypeError("encoding must be a string");
      if (typeof R == "string" && !p.isEncoding(R))
        throw new TypeError("Unknown encoding: " + R);
      if (l.length === 1) {
        const V = l.charCodeAt(0);
        (R === "utf8" && V < 128 || R === "latin1") && (l = V);
      }
    } else
      typeof l == "number" ? l = l & 255 : typeof l == "boolean" && (l = Number(l));
    if (d < 0 || this.length < d || this.length < A)
      throw new RangeError("Out of range index");
    if (A <= d)
      return this;
    d = d >>> 0, A = A === void 0 ? this.length : A >>> 0, l || (l = 0);
    let B;
    if (typeof l == "number")
      for (B = d; B < A; ++B)
        this[B] = l;
    else {
      const V = p.isBuffer(l) ? l : p.from(l, R), Et = V.length;
      if (Et === 0)
        throw new TypeError('The value "' + l + '" is invalid for argument "value"');
      for (B = 0; B < A - d; ++B)
        this[B + d] = V[B % Et];
    }
    return this;
  };
  const pt = {};
  function pe(b, l, d) {
    pt[b] = class extends d {
      constructor() {
        super(), Object.defineProperty(this, "message", {
          value: l.apply(this, arguments),
          writable: !0,
          configurable: !0
        }), this.name = `${this.name} [${b}]`, this.stack, delete this.name;
      }
      get code() {
        return b;
      }
      set code(R) {
        Object.defineProperty(this, "code", {
          configurable: !0,
          enumerable: !0,
          value: R,
          writable: !0
        });
      }
      toString() {
        return `${this.name} [${b}]: ${this.message}`;
      }
    };
  }
  pe(
    "ERR_BUFFER_OUT_OF_BOUNDS",
    function(b) {
      return b ? `${b} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
    },
    RangeError
  ), pe(
    "ERR_INVALID_ARG_TYPE",
    function(b, l) {
      return `The "${b}" argument must be of type number. Received type ${typeof l}`;
    },
    TypeError
  ), pe(
    "ERR_OUT_OF_RANGE",
    function(b, l, d) {
      let A = `The value of "${b}" is out of range.`, R = d;
      return Number.isInteger(d) && Math.abs(d) > 2 ** 32 ? R = Le(String(d)) : typeof d == "bigint" && (R = String(d), (d > BigInt(2) ** BigInt(32) || d < -(BigInt(2) ** BigInt(32))) && (R = Le(R)), R += "n"), A += ` It must be ${l}. Received ${R}`, A;
    },
    RangeError
  );
  function Le(b) {
    let l = "", d = b.length;
    const A = b[0] === "-" ? 1 : 0;
    for (; d >= A + 4; d -= 3)
      l = `_${b.slice(d - 3, d)}${l}`;
    return `${b.slice(0, d)}${l}`;
  }
  function Qe(b, l, d) {
    be(l, "offset"), (b[l] === void 0 || b[l + d] === void 0) && Ne(l, b.length - (d + 1));
  }
  function se(b, l, d, A, R, B) {
    if (b > d || b < l) {
      const V = typeof l == "bigint" ? "n" : "";
      let Et;
      throw B > 3 ? l === 0 || l === BigInt(0) ? Et = `>= 0${V} and < 2${V} ** ${(B + 1) * 8}${V}` : Et = `>= -(2${V} ** ${(B + 1) * 8 - 1}${V}) and < 2 ** ${(B + 1) * 8 - 1}${V}` : Et = `>= ${l}${V} and <= ${d}${V}`, new pt.ERR_OUT_OF_RANGE("value", Et, b);
    }
    Qe(A, R, B);
  }
  function be(b, l) {
    if (typeof b != "number")
      throw new pt.ERR_INVALID_ARG_TYPE(l, "number", b);
  }
  function Ne(b, l, d) {
    throw Math.floor(b) !== b ? (be(b, d), new pt.ERR_OUT_OF_RANGE(d || "offset", "an integer", b)) : l < 0 ? new pt.ERR_BUFFER_OUT_OF_BOUNDS() : new pt.ERR_OUT_OF_RANGE(
      d || "offset",
      `>= ${d ? 1 : 0} and <= ${l}`,
      b
    );
  }
  const In = /[^+/0-9A-Za-z-_]/g;
  function qn(b) {
    if (b = b.split("=")[0], b = b.trim().replace(In, ""), b.length < 2)
      return "";
    for (; b.length % 4 !== 0; )
      b = b + "=";
    return b;
  }
  function Ke(b, l) {
    l = l || 1 / 0;
    let d;
    const A = b.length;
    let R = null;
    const B = [];
    for (let V = 0; V < A; ++V) {
      if (d = b.charCodeAt(V), d > 55295 && d < 57344) {
        if (!R) {
          if (d > 56319) {
            (l -= 3) > -1 && B.push(239, 191, 189);
            continue;
          } else if (V + 1 === A) {
            (l -= 3) > -1 && B.push(239, 191, 189);
            continue;
          }
          R = d;
          continue;
        }
        if (d < 56320) {
          (l -= 3) > -1 && B.push(239, 191, 189), R = d;
          continue;
        }
        d = (R - 55296 << 10 | d - 56320) + 65536;
      } else
        R && (l -= 3) > -1 && B.push(239, 191, 189);
      if (R = null, d < 128) {
        if ((l -= 1) < 0)
          break;
        B.push(d);
      } else if (d < 2048) {
        if ((l -= 2) < 0)
          break;
        B.push(
          d >> 6 | 192,
          d & 63 | 128
        );
      } else if (d < 65536) {
        if ((l -= 3) < 0)
          break;
        B.push(
          d >> 12 | 224,
          d >> 6 & 63 | 128,
          d & 63 | 128
        );
      } else if (d < 1114112) {
        if ((l -= 4) < 0)
          break;
        B.push(
          d >> 18 | 240,
          d >> 12 & 63 | 128,
          d >> 6 & 63 | 128,
          d & 63 | 128
        );
      } else
        throw new Error("Invalid code point");
    }
    return B;
  }
  function mn(b) {
    const l = [];
    for (let d = 0; d < b.length; ++d)
      l.push(b.charCodeAt(d) & 255);
    return l;
  }
  function cn(b, l) {
    let d, A, R;
    const B = [];
    for (let V = 0; V < b.length && !((l -= 2) < 0); ++V)
      d = b.charCodeAt(V), A = d >> 8, R = d % 256, B.push(R), B.push(A);
    return B;
  }
  function ge(b) {
    return e.toByteArray(qn(b));
  }
  function _e(b, l, d, A) {
    let R;
    for (R = 0; R < A && !(R + d >= l.length || R >= b.length); ++R)
      l[R + d] = b[R];
    return R;
  }
  function fe(b, l) {
    return b instanceof l || b != null && b.constructor != null && b.constructor.name != null && b.constructor.name === l.name;
  }
  function bn(b) {
    return b !== b;
  }
  const $n = function() {
    const b = "0123456789abcdef", l = new Array(256);
    for (let d = 0; d < 16; ++d) {
      const A = d * 16;
      for (let R = 0; R < 16; ++R)
        l[A + R] = b[d] + b[R];
    }
    return l;
  }();
  function Te(b) {
    return typeof BigInt > "u" ? en : b;
  }
  function en() {
    throw new Error("BigInt not supported");
  }
})(je);
const oa = je.Buffer, M1 = je.Blob, F1 = je.BlobOptions, k1 = je.Buffer, U1 = je.File, H1 = je.FileOptions, q1 = je.INSPECT_MAX_BYTES, $1 = je.SlowBuffer, G1 = je.TranscodeEncoding, Y1 = je.atob, V1 = je.btoa, j1 = je.constants, W1 = je.isAscii, Q1 = je.isUtf8, K1 = je.kMaxLength, X1 = je.kStringMaxLength, z1 = je.resolveObjectURL, J1 = je.transcode, Z1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Blob: M1,
  BlobOptions: F1,
  Buffer: k1,
  File: U1,
  FileOptions: H1,
  INSPECT_MAX_BYTES: q1,
  SlowBuffer: $1,
  TranscodeEncoding: G1,
  atob: Y1,
  btoa: V1,
  constants: j1,
  default: oa,
  isAscii: W1,
  isUtf8: Q1,
  kMaxLength: K1,
  kStringMaxLength: X1,
  resolveObjectURL: z1,
  transcode: J1
}, Symbol.toStringTag, { value: "Module" }));
function tE(t) {
  return function(n, r, a, u) {
    if (typeof oa < "u" && oa.isBuffer(n) && (n = n.toString()), typeof n == "string")
      return t(n, r, a, u);
    const o = n;
    if (!Array.isArray(o) && As(o))
      return o;
    const h = new bs([]);
    return _s(o, h), h;
  };
}
function _s(t, e) {
  const n = Array.isArray(t) ? t : [t];
  e ? e.children = n : e = null;
  for (let r = 0; r < n.length; r++) {
    const a = n[r];
    a.parent && a.parent.children !== n && ys(a), e ? (a.prev = n[r - 1] || null, a.next = n[r + 1] || null) : a.prev = a.next = null, a.parent = e;
  }
  return e;
}
function eE(t, e) {
  return t == null ? [] : Hr(t) ? e ? vu(t.get()) : t.get() : Array.isArray(t) ? t.reduce((n, r) => n.concat(this._makeDomArray(r, e)), []) : typeof t == "string" ? this._parse(t, this.options, !1, null).children : e ? vu([t]) : [t];
}
function Fl(t) {
  return function(...e) {
    const n = this.length - 1;
    return Ce(this, (r, a) => {
      if (!Ze(r))
        return;
      const u = typeof e[0] == "function" ? e[0].call(r, a, this._render(r.children)) : e, o = this._makeDomArray(u, a < n);
      t(o, r.children, r);
    });
  };
}
function is(t, e, n, r, a) {
  var u, o;
  const h = [
    e,
    n,
    ...r
  ], m = e === 0 ? null : t[e - 1], E = e + n >= t.length ? null : t[e + n];
  for (let p = 0; p < r.length; ++p) {
    const N = r[p], v = N.parent;
    if (v) {
      const L = v.children.indexOf(N);
      L > -1 && (v.children.splice(L, 1), a === v && e > L && h[0]--);
    }
    N.parent = a, N.prev && (N.prev.next = (u = N.next) !== null && u !== void 0 ? u : null), N.next && (N.next.prev = (o = N.prev) !== null && o !== void 0 ? o : null), N.prev = p === 0 ? m : r[p - 1], N.next = p === r.length - 1 ? E : r[p + 1];
  }
  return m && (m.next = r[0]), E && (E.prev = r[r.length - 1]), t.splice(...h);
}
function nE(t) {
  return (Hr(t) ? t : this._make(t)).append(this), this;
}
function rE(t) {
  return (Hr(t) ? t : this._make(t)).prepend(this), this;
}
const sE = Fl((t, e, n) => {
  is(e, e.length, 0, t, n);
}), iE = Fl((t, e, n) => {
  is(e, 0, 0, t, n);
});
function kl(t) {
  return function(e) {
    const n = this.length - 1, r = this.parents().last();
    for (let a = 0; a < this.length; a++) {
      const u = this[a], o = typeof e == "function" ? e.call(u, a, u) : typeof e == "string" && !xu(e) ? r.find(e).clone() : e, [h] = this._makeDomArray(o, a < n);
      if (!h || !Ze(h))
        continue;
      let m = h, E = 0;
      for (; E < m.children.length; ) {
        const p = m.children[E];
        It(p) ? (m = p, E = 0) : E++;
      }
      t(u, m, [h]);
    }
    return this;
  };
}
const aE = kl((t, e, n) => {
  const { parent: r } = t;
  if (!r)
    return;
  const a = r.children, u = a.indexOf(t);
  _s([t], e), is(a, u, 0, n, r);
}), uE = kl((t, e, n) => {
  Ze(t) && (_s(t.children, e), _s(n, t));
});
function oE(t) {
  return this.parent(t).not("body").each((e, n) => {
    this._make(n).replaceWith(n.children);
  }), this;
}
function cE(t) {
  const e = this[0];
  if (e) {
    const n = this._make(typeof t == "function" ? t.call(e, 0, e) : t).insertBefore(e);
    let r;
    for (let u = 0; u < n.length; u++)
      n[u].type === "tag" && (r = n[u]);
    let a = 0;
    for (; r && a < r.children.length; ) {
      const u = r.children[a];
      u.type === "tag" ? (r = u, a = 0) : a++;
    }
    r && this._make(r).append(this);
  }
  return this;
}
function fE(...t) {
  const e = this.length - 1;
  return Ce(this, (n, r) => {
    const { parent: a } = n;
    if (!Ze(n) || !a)
      return;
    const u = a.children, o = u.indexOf(n);
    if (o < 0)
      return;
    const h = typeof t[0] == "function" ? t[0].call(n, r, this._render(n.children)) : t, m = this._makeDomArray(h, r < e);
    is(u, o + 1, 0, m, a);
  });
}
function lE(t) {
  typeof t == "string" && (t = this._make(t)), this.remove();
  const e = [];
  return this._makeDomArray(t).forEach((n) => {
    const r = this.clone().toArray(), { parent: a } = n;
    if (!a)
      return;
    const u = a.children, o = u.indexOf(n);
    o < 0 || (is(u, o + 1, 0, r, a), e.push(...r));
  }), this._make(e);
}
function hE(...t) {
  const e = this.length - 1;
  return Ce(this, (n, r) => {
    const { parent: a } = n;
    if (!Ze(n) || !a)
      return;
    const u = a.children, o = u.indexOf(n);
    if (o < 0)
      return;
    const h = typeof t[0] == "function" ? t[0].call(n, r, this._render(n.children)) : t, m = this._makeDomArray(h, r < e);
    is(u, o, 0, m, a);
  });
}
function dE(t) {
  const e = this._make(t);
  this.remove();
  const n = [];
  return Ce(e, (r) => {
    const a = this.clone().toArray(), { parent: u } = r;
    if (!u)
      return;
    const o = u.children, h = o.indexOf(r);
    h < 0 || (is(o, h, 0, a, u), n.push(...a));
  }), this._make(n);
}
function pE(t) {
  const e = t ? this.filter(t) : this;
  return Ce(e, (n) => {
    ys(n), n.prev = n.next = n.parent = null;
  }), this;
}
function gE(t) {
  return Ce(this, (e, n) => {
    const { parent: r } = e;
    if (!r)
      return;
    const a = r.children, u = typeof t == "function" ? t.call(e, n, e) : t, o = this._makeDomArray(u);
    _s(o, null);
    const h = a.indexOf(e);
    is(a, h, 1, o, r), o.includes(e) || (e.parent = e.prev = e.next = null);
  });
}
function EE() {
  return Ce(this, (t) => {
    Ze(t) && (t.children.forEach((e) => {
      e.next = e.prev = e.parent = null;
    }), t.children.length = 0);
  });
}
function mE(t) {
  if (t === void 0) {
    const e = this[0];
    return !e || !Ze(e) ? null : this._render(e.children);
  }
  return Ce(this, (e) => {
    if (!Ze(e))
      return;
    e.children.forEach((r) => {
      r.next = r.prev = r.parent = null;
    });
    const n = Hr(t) ? t.toArray() : this._parse(`${t}`, this.options, !1, e).children;
    _s(n, e);
  });
}
function bE() {
  return this._render(this);
}
function _E(t) {
  return t === void 0 ? hi(this) : typeof t == "function" ? Ce(this, (e, n) => this._make(e).text(t.call(e, n, hi([e])))) : Ce(this, (e) => {
    if (!Ze(e))
      return;
    e.children.forEach((r) => {
      r.next = r.prev = r.parent = null;
    });
    const n = new li(`${t}`);
    _s(n, e);
  });
}
function TE() {
  return this._make(vu(this.get()));
}
const AE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  _makeDomArray: eE,
  after: fE,
  append: sE,
  appendTo: nE,
  before: hE,
  clone: TE,
  empty: EE,
  html: mE,
  insertAfter: lE,
  insertBefore: dE,
  prepend: iE,
  prependTo: rE,
  remove: pE,
  replaceWith: gE,
  text: _E,
  toString: bE,
  unwrap: oE,
  wrap: aE,
  wrapAll: cE,
  wrapInner: uE
}, Symbol.toStringTag, { value: "Module" }));
function yE(t, e) {
  if (t != null && e != null || // When `prop` is a "plain" object
  typeof t == "object" && !Array.isArray(t))
    return Ce(this, (n, r) => {
      It(n) && Ul(n, t, e, r);
    });
  if (this.length !== 0)
    return Hl(this[0], t);
}
function Ul(t, e, n, r) {
  if (typeof e == "string") {
    const a = Hl(t), u = typeof n == "function" ? n.call(t, r, a[e]) : n;
    u === "" ? delete a[e] : u != null && (a[e] = u), t.attribs.style = CE(a);
  } else
    typeof e == "object" && Object.keys(e).forEach((a, u) => {
      Ul(t, a, e[a], u);
    });
}
function Hl(t, e) {
  if (!t || !It(t))
    return;
  const n = IE(t.attribs.style);
  if (typeof e == "string")
    return n[e];
  if (Array.isArray(e)) {
    const r = {};
    return e.forEach((a) => {
      n[a] != null && (r[a] = n[a]);
    }), r;
  }
  return n;
}
function CE(t) {
  return Object.keys(t).reduce((e, n) => `${e}${e ? " " : ""}${n}: ${t[n]};`, "");
}
function IE(t) {
  if (t = (t || "").trim(), !t)
    return {};
  const e = {};
  let n;
  for (const r of t.split(";")) {
    const a = r.indexOf(":");
    if (a < 1 || a === r.length - 1) {
      const u = r.trimEnd();
      u.length > 0 && n !== void 0 && (e[n] += `;${u}`);
    } else
      n = r.slice(0, a).trim(), e[n] = r.slice(a + 1).trim();
  }
  return e;
}
const SE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  css: yE
}, Symbol.toStringTag, { value: "Module" })), Sc = "input,select,textarea,keygen", NE = /%20/g, Nc = /\r?\n/g;
function vE() {
  return this.serializeArray().map((n) => `${encodeURIComponent(n.name)}=${encodeURIComponent(n.value)}`).join("&").replace(NE, "+");
}
function xE() {
  return this.map((t, e) => {
    const n = this._make(e);
    return It(e) && e.name === "form" ? n.find(Sc).toArray() : n.filter(Sc).toArray();
  }).filter(
    // Verify elements have a name (`attr.name`) and are not disabled (`:enabled`)
    '[name!=""]:enabled:not(:submit, :button, :image, :reset, :file):matches([checked], :not(:checkbox, :radio))'
    // Convert each of the elements to its value(s)
  ).map((t, e) => {
    var n;
    const r = this._make(e), a = r.attr("name"), u = (n = r.val()) !== null && n !== void 0 ? n : "";
    return Array.isArray(u) ? u.map((o) => (
      /*
       * We trim replace any line endings (e.g. `\r` or `\r\n` with `\r\n`) to guarantee consistency across platforms
       * These can occur inside of `<textarea>'s`
       */
      { name: a, value: o.replace(Nc, `\r
`) }
    )) : { name: a, value: u.replace(Nc, `\r
`) };
  }).toArray();
}
const RE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  serialize: vE,
  serializeArray: xE
}, Symbol.toStringTag, { value: "Module" }));
class Ai {
  /**
   * Instance of cheerio. Methods are specified in the modules. Usage of this
   * constructor is not recommended. Please use `$.load` instead.
   *
   * @private
   * @param elements - The new selection.
   * @param root - Sets the root node.
   * @param options - Options for the instance.
   */
  constructor(e, n, r) {
    if (this.length = 0, this.options = r, this._root = n, e) {
      for (let a = 0; a < e.length; a++)
        this[a] = e[a];
      this.length = e.length;
    }
  }
}
Ai.prototype.cheerio = "[cheerio object]";
Ai.prototype.splice = Array.prototype.splice;
Ai.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
Object.assign(Ai.prototype, pg, v1, AE, SE, RE);
function LE(t, e) {
  return function n(r, a, u = !0) {
    if (r == null)
      throw new Error("cheerio.load() expects a string");
    const o = { ...ju, ...Cu(a) }, h = t(r, o, u, null);
    class m extends Ai {
      _make(N, v) {
        const S = E(N, v);
        return S.prevObject = this, S;
      }
      _parse(N, v, S, L) {
        return t(N, v, S, L);
      }
      _render(N) {
        return e(N, this.options);
      }
    }
    function E(p, N, v = h, S) {
      if (p && Hr(p))
        return p;
      const L = {
        ...o,
        ...Cu(S)
      }, W = typeof v == "string" ? [t(v, L, !1, null)] : "length" in v ? v : [v], M = Hr(W) ? W : new m(W, null, L);
      if (M._root = M, !p)
        return new m(void 0, M, L);
      const O = typeof p == "string" && xu(p) ? (
        // $(<html>)
        t(p, L, !1, null).children
      ) : OE(p) ? (
        // $(dom)
        [p]
      ) : Array.isArray(p) ? (
        // $([dom])
        p
      ) : void 0, F = new m(O, M, L);
      if (O)
        return F;
      if (typeof p != "string")
        throw new Error("Unexpected type of selector");
      let Z = p;
      const Q = N ? typeof N == "string" ? xu(N) ? (
        // $('li', '<ul>...</ul>')
        new m([t(N, L, !1, null)], M, L)
      ) : (
        // $('li', 'ul')
        (Z = `${N} ${Z}`, M)
      ) : Hr(N) ? (
        // $('li', $)
        N
      ) : (
        // $('li', node), $('li', [nodes])
        new m(Array.isArray(N) ? N : [N], M, L)
      ) : (
        // If we don't have a context, maybe we have a root, from loading
        M
      );
      return Q ? Q.find(Z) : F;
    }
    return Object.assign(E, sg, {
      load: n,
      // `_root` and `_options` are used in static methods.
      _root: h,
      _options: o,
      // Add `fn` for plugins
      fn: m.prototype,
      // Add the prototype here to maintain `instanceof` behavior.
      prototype: m.prototype
    }), E;
  };
}
function OE(t) {
  return !!t.name || t.type === "root" || t.type === "text" || t.type === "comment";
}
const wE = /* @__PURE__ */ new Set([
  65534,
  65535,
  131070,
  131071,
  196606,
  196607,
  262142,
  262143,
  327678,
  327679,
  393214,
  393215,
  458750,
  458751,
  524286,
  524287,
  589822,
  589823,
  655358,
  655359,
  720894,
  720895,
  786430,
  786431,
  851966,
  851967,
  917502,
  917503,
  983038,
  983039,
  1048574,
  1048575,
  1114110,
  1114111
]), me = "�";
var _;
(function(t) {
  t[t.EOF = -1] = "EOF", t[t.NULL = 0] = "NULL", t[t.TABULATION = 9] = "TABULATION", t[t.CARRIAGE_RETURN = 13] = "CARRIAGE_RETURN", t[t.LINE_FEED = 10] = "LINE_FEED", t[t.FORM_FEED = 12] = "FORM_FEED", t[t.SPACE = 32] = "SPACE", t[t.EXCLAMATION_MARK = 33] = "EXCLAMATION_MARK", t[t.QUOTATION_MARK = 34] = "QUOTATION_MARK", t[t.NUMBER_SIGN = 35] = "NUMBER_SIGN", t[t.AMPERSAND = 38] = "AMPERSAND", t[t.APOSTROPHE = 39] = "APOSTROPHE", t[t.HYPHEN_MINUS = 45] = "HYPHEN_MINUS", t[t.SOLIDUS = 47] = "SOLIDUS", t[t.DIGIT_0 = 48] = "DIGIT_0", t[t.DIGIT_9 = 57] = "DIGIT_9", t[t.SEMICOLON = 59] = "SEMICOLON", t[t.LESS_THAN_SIGN = 60] = "LESS_THAN_SIGN", t[t.EQUALS_SIGN = 61] = "EQUALS_SIGN", t[t.GREATER_THAN_SIGN = 62] = "GREATER_THAN_SIGN", t[t.QUESTION_MARK = 63] = "QUESTION_MARK", t[t.LATIN_CAPITAL_A = 65] = "LATIN_CAPITAL_A", t[t.LATIN_CAPITAL_F = 70] = "LATIN_CAPITAL_F", t[t.LATIN_CAPITAL_X = 88] = "LATIN_CAPITAL_X", t[t.LATIN_CAPITAL_Z = 90] = "LATIN_CAPITAL_Z", t[t.RIGHT_SQUARE_BRACKET = 93] = "RIGHT_SQUARE_BRACKET", t[t.GRAVE_ACCENT = 96] = "GRAVE_ACCENT", t[t.LATIN_SMALL_A = 97] = "LATIN_SMALL_A", t[t.LATIN_SMALL_F = 102] = "LATIN_SMALL_F", t[t.LATIN_SMALL_X = 120] = "LATIN_SMALL_X", t[t.LATIN_SMALL_Z = 122] = "LATIN_SMALL_Z", t[t.REPLACEMENT_CHARACTER = 65533] = "REPLACEMENT_CHARACTER";
})(_ = _ || (_ = {}));
const Dn = {
  DASH_DASH: "--",
  CDATA_START: "[CDATA[",
  DOCTYPE: "doctype",
  SCRIPT: "script",
  PUBLIC: "public",
  SYSTEM: "system"
};
function ql(t) {
  return t >= 55296 && t <= 57343;
}
function DE(t) {
  return t >= 56320 && t <= 57343;
}
function PE(t, e) {
  return (t - 55296) * 1024 + 9216 + e;
}
function $l(t) {
  return t !== 32 && t !== 10 && t !== 13 && t !== 9 && t !== 12 && t >= 1 && t <= 31 || t >= 127 && t <= 159;
}
function Gl(t) {
  return t >= 64976 && t <= 65007 || wE.has(t);
}
var j;
(function(t) {
  t.controlCharacterInInputStream = "control-character-in-input-stream", t.noncharacterInInputStream = "noncharacter-in-input-stream", t.surrogateInInputStream = "surrogate-in-input-stream", t.nonVoidHtmlElementStartTagWithTrailingSolidus = "non-void-html-element-start-tag-with-trailing-solidus", t.endTagWithAttributes = "end-tag-with-attributes", t.endTagWithTrailingSolidus = "end-tag-with-trailing-solidus", t.unexpectedSolidusInTag = "unexpected-solidus-in-tag", t.unexpectedNullCharacter = "unexpected-null-character", t.unexpectedQuestionMarkInsteadOfTagName = "unexpected-question-mark-instead-of-tag-name", t.invalidFirstCharacterOfTagName = "invalid-first-character-of-tag-name", t.unexpectedEqualsSignBeforeAttributeName = "unexpected-equals-sign-before-attribute-name", t.missingEndTagName = "missing-end-tag-name", t.unexpectedCharacterInAttributeName = "unexpected-character-in-attribute-name", t.unknownNamedCharacterReference = "unknown-named-character-reference", t.missingSemicolonAfterCharacterReference = "missing-semicolon-after-character-reference", t.unexpectedCharacterAfterDoctypeSystemIdentifier = "unexpected-character-after-doctype-system-identifier", t.unexpectedCharacterInUnquotedAttributeValue = "unexpected-character-in-unquoted-attribute-value", t.eofBeforeTagName = "eof-before-tag-name", t.eofInTag = "eof-in-tag", t.missingAttributeValue = "missing-attribute-value", t.missingWhitespaceBetweenAttributes = "missing-whitespace-between-attributes", t.missingWhitespaceAfterDoctypePublicKeyword = "missing-whitespace-after-doctype-public-keyword", t.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers = "missing-whitespace-between-doctype-public-and-system-identifiers", t.missingWhitespaceAfterDoctypeSystemKeyword = "missing-whitespace-after-doctype-system-keyword", t.missingQuoteBeforeDoctypePublicIdentifier = "missing-quote-before-doctype-public-identifier", t.missingQuoteBeforeDoctypeSystemIdentifier = "missing-quote-before-doctype-system-identifier", t.missingDoctypePublicIdentifier = "missing-doctype-public-identifier", t.missingDoctypeSystemIdentifier = "missing-doctype-system-identifier", t.abruptDoctypePublicIdentifier = "abrupt-doctype-public-identifier", t.abruptDoctypeSystemIdentifier = "abrupt-doctype-system-identifier", t.cdataInHtmlContent = "cdata-in-html-content", t.incorrectlyOpenedComment = "incorrectly-opened-comment", t.eofInScriptHtmlCommentLikeText = "eof-in-script-html-comment-like-text", t.eofInDoctype = "eof-in-doctype", t.nestedComment = "nested-comment", t.abruptClosingOfEmptyComment = "abrupt-closing-of-empty-comment", t.eofInComment = "eof-in-comment", t.incorrectlyClosedComment = "incorrectly-closed-comment", t.eofInCdata = "eof-in-cdata", t.absenceOfDigitsInNumericCharacterReference = "absence-of-digits-in-numeric-character-reference", t.nullCharacterReference = "null-character-reference", t.surrogateCharacterReference = "surrogate-character-reference", t.characterReferenceOutsideUnicodeRange = "character-reference-outside-unicode-range", t.controlCharacterReference = "control-character-reference", t.noncharacterCharacterReference = "noncharacter-character-reference", t.missingWhitespaceBeforeDoctypeName = "missing-whitespace-before-doctype-name", t.missingDoctypeName = "missing-doctype-name", t.invalidCharacterSequenceAfterDoctypeName = "invalid-character-sequence-after-doctype-name", t.duplicateAttribute = "duplicate-attribute", t.nonConformingDoctype = "non-conforming-doctype", t.missingDoctype = "missing-doctype", t.misplacedDoctype = "misplaced-doctype", t.endTagWithoutMatchingOpenElement = "end-tag-without-matching-open-element", t.closingOfElementWithOpenChildElements = "closing-of-element-with-open-child-elements", t.disallowedContentInNoscriptInHead = "disallowed-content-in-noscript-in-head", t.openElementsLeftAfterEof = "open-elements-left-after-eof", t.abandonedHeadElementChild = "abandoned-head-element-child", t.misplacedStartTagForHeadElement = "misplaced-start-tag-for-head-element", t.nestedNoscriptInHead = "nested-noscript-in-head", t.eofInElementThatCanContainOnlyText = "eof-in-element-that-can-contain-only-text";
})(j = j || (j = {}));
const BE = 65536;
class ME {
  constructor(e) {
    this.handler = e, this.html = "", this.pos = -1, this.lastGapPos = -2, this.gapStack = [], this.skipNextNewLine = !1, this.lastChunkWritten = !1, this.endOfChunkHit = !1, this.bufferWaterline = BE, this.isEol = !1, this.lineStartPos = 0, this.droppedBufferSize = 0, this.line = 1, this.lastErrOffset = -1;
  }
  /** The column on the current line. If we just saw a gap (eg. a surrogate pair), return the index before. */
  get col() {
    return this.pos - this.lineStartPos + +(this.lastGapPos !== this.pos);
  }
  get offset() {
    return this.droppedBufferSize + this.pos;
  }
  getError(e) {
    const { line: n, col: r, offset: a } = this;
    return {
      code: e,
      startLine: n,
      endLine: n,
      startCol: r,
      endCol: r,
      startOffset: a,
      endOffset: a
    };
  }
  _err(e) {
    this.handler.onParseError && this.lastErrOffset !== this.offset && (this.lastErrOffset = this.offset, this.handler.onParseError(this.getError(e)));
  }
  _addGap() {
    this.gapStack.push(this.lastGapPos), this.lastGapPos = this.pos;
  }
  _processSurrogate(e) {
    if (this.pos !== this.html.length - 1) {
      const n = this.html.charCodeAt(this.pos + 1);
      if (DE(n))
        return this.pos++, this._addGap(), PE(e, n);
    } else if (!this.lastChunkWritten)
      return this.endOfChunkHit = !0, _.EOF;
    return this._err(j.surrogateInInputStream), e;
  }
  willDropParsedChunk() {
    return this.pos > this.bufferWaterline;
  }
  dropParsedChunk() {
    this.willDropParsedChunk() && (this.html = this.html.substring(this.pos), this.lineStartPos -= this.pos, this.droppedBufferSize += this.pos, this.pos = 0, this.lastGapPos = -2, this.gapStack.length = 0);
  }
  write(e, n) {
    this.html.length > 0 ? this.html += e : this.html = e, this.endOfChunkHit = !1, this.lastChunkWritten = n;
  }
  insertHtmlAtCurrentPos(e) {
    this.html = this.html.substring(0, this.pos + 1) + e + this.html.substring(this.pos + 1), this.endOfChunkHit = !1;
  }
  startsWith(e, n) {
    if (this.pos + e.length > this.html.length)
      return this.endOfChunkHit = !this.lastChunkWritten, !1;
    if (n)
      return this.html.startsWith(e, this.pos);
    for (let r = 0; r < e.length; r++)
      if ((this.html.charCodeAt(this.pos + r) | 32) !== e.charCodeAt(r))
        return !1;
    return !0;
  }
  peek(e) {
    const n = this.pos + e;
    if (n >= this.html.length)
      return this.endOfChunkHit = !this.lastChunkWritten, _.EOF;
    const r = this.html.charCodeAt(n);
    return r === _.CARRIAGE_RETURN ? _.LINE_FEED : r;
  }
  advance() {
    if (this.pos++, this.isEol && (this.isEol = !1, this.line++, this.lineStartPos = this.pos), this.pos >= this.html.length)
      return this.endOfChunkHit = !this.lastChunkWritten, _.EOF;
    let e = this.html.charCodeAt(this.pos);
    return e === _.CARRIAGE_RETURN ? (this.isEol = !0, this.skipNextNewLine = !0, _.LINE_FEED) : e === _.LINE_FEED && (this.isEol = !0, this.skipNextNewLine) ? (this.line--, this.skipNextNewLine = !1, this._addGap(), this.advance()) : (this.skipNextNewLine = !1, ql(e) && (e = this._processSurrogate(e)), this.handler.onParseError === null || e > 31 && e < 127 || e === _.LINE_FEED || e === _.CARRIAGE_RETURN || e > 159 && e < 64976 || this._checkForProblematicCharacters(e), e);
  }
  _checkForProblematicCharacters(e) {
    $l(e) ? this._err(j.controlCharacterInInputStream) : Gl(e) && this._err(j.noncharacterInInputStream);
  }
  retreat(e) {
    for (this.pos -= e; this.pos < this.lastGapPos; )
      this.lastGapPos = this.gapStack.pop(), this.pos--;
    this.isEol = !1;
  }
}
var jt;
(function(t) {
  t[t.CHARACTER = 0] = "CHARACTER", t[t.NULL_CHARACTER = 1] = "NULL_CHARACTER", t[t.WHITESPACE_CHARACTER = 2] = "WHITESPACE_CHARACTER", t[t.START_TAG = 3] = "START_TAG", t[t.END_TAG = 4] = "END_TAG", t[t.COMMENT = 5] = "COMMENT", t[t.DOCTYPE = 6] = "DOCTYPE", t[t.EOF = 7] = "EOF", t[t.HIBERNATION = 8] = "HIBERNATION";
})(jt = jt || (jt = {}));
function Yl(t, e) {
  for (let n = t.attrs.length - 1; n >= 0; n--)
    if (t.attrs[n].name === e)
      return t.attrs[n].value;
  return null;
}
var K;
(function(t) {
  t.HTML = "http://www.w3.org/1999/xhtml", t.MATHML = "http://www.w3.org/1998/Math/MathML", t.SVG = "http://www.w3.org/2000/svg", t.XLINK = "http://www.w3.org/1999/xlink", t.XML = "http://www.w3.org/XML/1998/namespace", t.XMLNS = "http://www.w3.org/2000/xmlns/";
})(K = K || (K = {}));
var ns;
(function(t) {
  t.TYPE = "type", t.ACTION = "action", t.ENCODING = "encoding", t.PROMPT = "prompt", t.NAME = "name", t.COLOR = "color", t.FACE = "face", t.SIZE = "size";
})(ns = ns || (ns = {}));
var Fn;
(function(t) {
  t.NO_QUIRKS = "no-quirks", t.QUIRKS = "quirks", t.LIMITED_QUIRKS = "limited-quirks";
})(Fn = Fn || (Fn = {}));
var k;
(function(t) {
  t.A = "a", t.ADDRESS = "address", t.ANNOTATION_XML = "annotation-xml", t.APPLET = "applet", t.AREA = "area", t.ARTICLE = "article", t.ASIDE = "aside", t.B = "b", t.BASE = "base", t.BASEFONT = "basefont", t.BGSOUND = "bgsound", t.BIG = "big", t.BLOCKQUOTE = "blockquote", t.BODY = "body", t.BR = "br", t.BUTTON = "button", t.CAPTION = "caption", t.CENTER = "center", t.CODE = "code", t.COL = "col", t.COLGROUP = "colgroup", t.DD = "dd", t.DESC = "desc", t.DETAILS = "details", t.DIALOG = "dialog", t.DIR = "dir", t.DIV = "div", t.DL = "dl", t.DT = "dt", t.EM = "em", t.EMBED = "embed", t.FIELDSET = "fieldset", t.FIGCAPTION = "figcaption", t.FIGURE = "figure", t.FONT = "font", t.FOOTER = "footer", t.FOREIGN_OBJECT = "foreignObject", t.FORM = "form", t.FRAME = "frame", t.FRAMESET = "frameset", t.H1 = "h1", t.H2 = "h2", t.H3 = "h3", t.H4 = "h4", t.H5 = "h5", t.H6 = "h6", t.HEAD = "head", t.HEADER = "header", t.HGROUP = "hgroup", t.HR = "hr", t.HTML = "html", t.I = "i", t.IMG = "img", t.IMAGE = "image", t.INPUT = "input", t.IFRAME = "iframe", t.KEYGEN = "keygen", t.LABEL = "label", t.LI = "li", t.LINK = "link", t.LISTING = "listing", t.MAIN = "main", t.MALIGNMARK = "malignmark", t.MARQUEE = "marquee", t.MATH = "math", t.MENU = "menu", t.META = "meta", t.MGLYPH = "mglyph", t.MI = "mi", t.MO = "mo", t.MN = "mn", t.MS = "ms", t.MTEXT = "mtext", t.NAV = "nav", t.NOBR = "nobr", t.NOFRAMES = "noframes", t.NOEMBED = "noembed", t.NOSCRIPT = "noscript", t.OBJECT = "object", t.OL = "ol", t.OPTGROUP = "optgroup", t.OPTION = "option", t.P = "p", t.PARAM = "param", t.PLAINTEXT = "plaintext", t.PRE = "pre", t.RB = "rb", t.RP = "rp", t.RT = "rt", t.RTC = "rtc", t.RUBY = "ruby", t.S = "s", t.SCRIPT = "script", t.SECTION = "section", t.SELECT = "select", t.SOURCE = "source", t.SMALL = "small", t.SPAN = "span", t.STRIKE = "strike", t.STRONG = "strong", t.STYLE = "style", t.SUB = "sub", t.SUMMARY = "summary", t.SUP = "sup", t.TABLE = "table", t.TBODY = "tbody", t.TEMPLATE = "template", t.TEXTAREA = "textarea", t.TFOOT = "tfoot", t.TD = "td", t.TH = "th", t.THEAD = "thead", t.TITLE = "title", t.TR = "tr", t.TRACK = "track", t.TT = "tt", t.U = "u", t.UL = "ul", t.SVG = "svg", t.VAR = "var", t.WBR = "wbr", t.XMP = "xmp";
})(k = k || (k = {}));
var f;
(function(t) {
  t[t.UNKNOWN = 0] = "UNKNOWN", t[t.A = 1] = "A", t[t.ADDRESS = 2] = "ADDRESS", t[t.ANNOTATION_XML = 3] = "ANNOTATION_XML", t[t.APPLET = 4] = "APPLET", t[t.AREA = 5] = "AREA", t[t.ARTICLE = 6] = "ARTICLE", t[t.ASIDE = 7] = "ASIDE", t[t.B = 8] = "B", t[t.BASE = 9] = "BASE", t[t.BASEFONT = 10] = "BASEFONT", t[t.BGSOUND = 11] = "BGSOUND", t[t.BIG = 12] = "BIG", t[t.BLOCKQUOTE = 13] = "BLOCKQUOTE", t[t.BODY = 14] = "BODY", t[t.BR = 15] = "BR", t[t.BUTTON = 16] = "BUTTON", t[t.CAPTION = 17] = "CAPTION", t[t.CENTER = 18] = "CENTER", t[t.CODE = 19] = "CODE", t[t.COL = 20] = "COL", t[t.COLGROUP = 21] = "COLGROUP", t[t.DD = 22] = "DD", t[t.DESC = 23] = "DESC", t[t.DETAILS = 24] = "DETAILS", t[t.DIALOG = 25] = "DIALOG", t[t.DIR = 26] = "DIR", t[t.DIV = 27] = "DIV", t[t.DL = 28] = "DL", t[t.DT = 29] = "DT", t[t.EM = 30] = "EM", t[t.EMBED = 31] = "EMBED", t[t.FIELDSET = 32] = "FIELDSET", t[t.FIGCAPTION = 33] = "FIGCAPTION", t[t.FIGURE = 34] = "FIGURE", t[t.FONT = 35] = "FONT", t[t.FOOTER = 36] = "FOOTER", t[t.FOREIGN_OBJECT = 37] = "FOREIGN_OBJECT", t[t.FORM = 38] = "FORM", t[t.FRAME = 39] = "FRAME", t[t.FRAMESET = 40] = "FRAMESET", t[t.H1 = 41] = "H1", t[t.H2 = 42] = "H2", t[t.H3 = 43] = "H3", t[t.H4 = 44] = "H4", t[t.H5 = 45] = "H5", t[t.H6 = 46] = "H6", t[t.HEAD = 47] = "HEAD", t[t.HEADER = 48] = "HEADER", t[t.HGROUP = 49] = "HGROUP", t[t.HR = 50] = "HR", t[t.HTML = 51] = "HTML", t[t.I = 52] = "I", t[t.IMG = 53] = "IMG", t[t.IMAGE = 54] = "IMAGE", t[t.INPUT = 55] = "INPUT", t[t.IFRAME = 56] = "IFRAME", t[t.KEYGEN = 57] = "KEYGEN", t[t.LABEL = 58] = "LABEL", t[t.LI = 59] = "LI", t[t.LINK = 60] = "LINK", t[t.LISTING = 61] = "LISTING", t[t.MAIN = 62] = "MAIN", t[t.MALIGNMARK = 63] = "MALIGNMARK", t[t.MARQUEE = 64] = "MARQUEE", t[t.MATH = 65] = "MATH", t[t.MENU = 66] = "MENU", t[t.META = 67] = "META", t[t.MGLYPH = 68] = "MGLYPH", t[t.MI = 69] = "MI", t[t.MO = 70] = "MO", t[t.MN = 71] = "MN", t[t.MS = 72] = "MS", t[t.MTEXT = 73] = "MTEXT", t[t.NAV = 74] = "NAV", t[t.NOBR = 75] = "NOBR", t[t.NOFRAMES = 76] = "NOFRAMES", t[t.NOEMBED = 77] = "NOEMBED", t[t.NOSCRIPT = 78] = "NOSCRIPT", t[t.OBJECT = 79] = "OBJECT", t[t.OL = 80] = "OL", t[t.OPTGROUP = 81] = "OPTGROUP", t[t.OPTION = 82] = "OPTION", t[t.P = 83] = "P", t[t.PARAM = 84] = "PARAM", t[t.PLAINTEXT = 85] = "PLAINTEXT", t[t.PRE = 86] = "PRE", t[t.RB = 87] = "RB", t[t.RP = 88] = "RP", t[t.RT = 89] = "RT", t[t.RTC = 90] = "RTC", t[t.RUBY = 91] = "RUBY", t[t.S = 92] = "S", t[t.SCRIPT = 93] = "SCRIPT", t[t.SECTION = 94] = "SECTION", t[t.SELECT = 95] = "SELECT", t[t.SOURCE = 96] = "SOURCE", t[t.SMALL = 97] = "SMALL", t[t.SPAN = 98] = "SPAN", t[t.STRIKE = 99] = "STRIKE", t[t.STRONG = 100] = "STRONG", t[t.STYLE = 101] = "STYLE", t[t.SUB = 102] = "SUB", t[t.SUMMARY = 103] = "SUMMARY", t[t.SUP = 104] = "SUP", t[t.TABLE = 105] = "TABLE", t[t.TBODY = 106] = "TBODY", t[t.TEMPLATE = 107] = "TEMPLATE", t[t.TEXTAREA = 108] = "TEXTAREA", t[t.TFOOT = 109] = "TFOOT", t[t.TD = 110] = "TD", t[t.TH = 111] = "TH", t[t.THEAD = 112] = "THEAD", t[t.TITLE = 113] = "TITLE", t[t.TR = 114] = "TR", t[t.TRACK = 115] = "TRACK", t[t.TT = 116] = "TT", t[t.U = 117] = "U", t[t.UL = 118] = "UL", t[t.SVG = 119] = "SVG", t[t.VAR = 120] = "VAR", t[t.WBR = 121] = "WBR", t[t.XMP = 122] = "XMP";
})(f = f || (f = {}));
const FE = /* @__PURE__ */ new Map([
  [k.A, f.A],
  [k.ADDRESS, f.ADDRESS],
  [k.ANNOTATION_XML, f.ANNOTATION_XML],
  [k.APPLET, f.APPLET],
  [k.AREA, f.AREA],
  [k.ARTICLE, f.ARTICLE],
  [k.ASIDE, f.ASIDE],
  [k.B, f.B],
  [k.BASE, f.BASE],
  [k.BASEFONT, f.BASEFONT],
  [k.BGSOUND, f.BGSOUND],
  [k.BIG, f.BIG],
  [k.BLOCKQUOTE, f.BLOCKQUOTE],
  [k.BODY, f.BODY],
  [k.BR, f.BR],
  [k.BUTTON, f.BUTTON],
  [k.CAPTION, f.CAPTION],
  [k.CENTER, f.CENTER],
  [k.CODE, f.CODE],
  [k.COL, f.COL],
  [k.COLGROUP, f.COLGROUP],
  [k.DD, f.DD],
  [k.DESC, f.DESC],
  [k.DETAILS, f.DETAILS],
  [k.DIALOG, f.DIALOG],
  [k.DIR, f.DIR],
  [k.DIV, f.DIV],
  [k.DL, f.DL],
  [k.DT, f.DT],
  [k.EM, f.EM],
  [k.EMBED, f.EMBED],
  [k.FIELDSET, f.FIELDSET],
  [k.FIGCAPTION, f.FIGCAPTION],
  [k.FIGURE, f.FIGURE],
  [k.FONT, f.FONT],
  [k.FOOTER, f.FOOTER],
  [k.FOREIGN_OBJECT, f.FOREIGN_OBJECT],
  [k.FORM, f.FORM],
  [k.FRAME, f.FRAME],
  [k.FRAMESET, f.FRAMESET],
  [k.H1, f.H1],
  [k.H2, f.H2],
  [k.H3, f.H3],
  [k.H4, f.H4],
  [k.H5, f.H5],
  [k.H6, f.H6],
  [k.HEAD, f.HEAD],
  [k.HEADER, f.HEADER],
  [k.HGROUP, f.HGROUP],
  [k.HR, f.HR],
  [k.HTML, f.HTML],
  [k.I, f.I],
  [k.IMG, f.IMG],
  [k.IMAGE, f.IMAGE],
  [k.INPUT, f.INPUT],
  [k.IFRAME, f.IFRAME],
  [k.KEYGEN, f.KEYGEN],
  [k.LABEL, f.LABEL],
  [k.LI, f.LI],
  [k.LINK, f.LINK],
  [k.LISTING, f.LISTING],
  [k.MAIN, f.MAIN],
  [k.MALIGNMARK, f.MALIGNMARK],
  [k.MARQUEE, f.MARQUEE],
  [k.MATH, f.MATH],
  [k.MENU, f.MENU],
  [k.META, f.META],
  [k.MGLYPH, f.MGLYPH],
  [k.MI, f.MI],
  [k.MO, f.MO],
  [k.MN, f.MN],
  [k.MS, f.MS],
  [k.MTEXT, f.MTEXT],
  [k.NAV, f.NAV],
  [k.NOBR, f.NOBR],
  [k.NOFRAMES, f.NOFRAMES],
  [k.NOEMBED, f.NOEMBED],
  [k.NOSCRIPT, f.NOSCRIPT],
  [k.OBJECT, f.OBJECT],
  [k.OL, f.OL],
  [k.OPTGROUP, f.OPTGROUP],
  [k.OPTION, f.OPTION],
  [k.P, f.P],
  [k.PARAM, f.PARAM],
  [k.PLAINTEXT, f.PLAINTEXT],
  [k.PRE, f.PRE],
  [k.RB, f.RB],
  [k.RP, f.RP],
  [k.RT, f.RT],
  [k.RTC, f.RTC],
  [k.RUBY, f.RUBY],
  [k.S, f.S],
  [k.SCRIPT, f.SCRIPT],
  [k.SECTION, f.SECTION],
  [k.SELECT, f.SELECT],
  [k.SOURCE, f.SOURCE],
  [k.SMALL, f.SMALL],
  [k.SPAN, f.SPAN],
  [k.STRIKE, f.STRIKE],
  [k.STRONG, f.STRONG],
  [k.STYLE, f.STYLE],
  [k.SUB, f.SUB],
  [k.SUMMARY, f.SUMMARY],
  [k.SUP, f.SUP],
  [k.TABLE, f.TABLE],
  [k.TBODY, f.TBODY],
  [k.TEMPLATE, f.TEMPLATE],
  [k.TEXTAREA, f.TEXTAREA],
  [k.TFOOT, f.TFOOT],
  [k.TD, f.TD],
  [k.TH, f.TH],
  [k.THEAD, f.THEAD],
  [k.TITLE, f.TITLE],
  [k.TR, f.TR],
  [k.TRACK, f.TRACK],
  [k.TT, f.TT],
  [k.U, f.U],
  [k.UL, f.UL],
  [k.SVG, f.SVG],
  [k.VAR, f.VAR],
  [k.WBR, f.WBR],
  [k.XMP, f.XMP]
]);
function va(t) {
  var e;
  return (e = FE.get(t)) !== null && e !== void 0 ? e : f.UNKNOWN;
}
const et = f, kE = {
  [K.HTML]: /* @__PURE__ */ new Set([
    et.ADDRESS,
    et.APPLET,
    et.AREA,
    et.ARTICLE,
    et.ASIDE,
    et.BASE,
    et.BASEFONT,
    et.BGSOUND,
    et.BLOCKQUOTE,
    et.BODY,
    et.BR,
    et.BUTTON,
    et.CAPTION,
    et.CENTER,
    et.COL,
    et.COLGROUP,
    et.DD,
    et.DETAILS,
    et.DIR,
    et.DIV,
    et.DL,
    et.DT,
    et.EMBED,
    et.FIELDSET,
    et.FIGCAPTION,
    et.FIGURE,
    et.FOOTER,
    et.FORM,
    et.FRAME,
    et.FRAMESET,
    et.H1,
    et.H2,
    et.H3,
    et.H4,
    et.H5,
    et.H6,
    et.HEAD,
    et.HEADER,
    et.HGROUP,
    et.HR,
    et.HTML,
    et.IFRAME,
    et.IMG,
    et.INPUT,
    et.LI,
    et.LINK,
    et.LISTING,
    et.MAIN,
    et.MARQUEE,
    et.MENU,
    et.META,
    et.NAV,
    et.NOEMBED,
    et.NOFRAMES,
    et.NOSCRIPT,
    et.OBJECT,
    et.OL,
    et.P,
    et.PARAM,
    et.PLAINTEXT,
    et.PRE,
    et.SCRIPT,
    et.SECTION,
    et.SELECT,
    et.SOURCE,
    et.STYLE,
    et.SUMMARY,
    et.TABLE,
    et.TBODY,
    et.TD,
    et.TEMPLATE,
    et.TEXTAREA,
    et.TFOOT,
    et.TH,
    et.THEAD,
    et.TITLE,
    et.TR,
    et.TRACK,
    et.UL,
    et.WBR,
    et.XMP
  ]),
  [K.MATHML]: /* @__PURE__ */ new Set([et.MI, et.MO, et.MN, et.MS, et.MTEXT, et.ANNOTATION_XML]),
  [K.SVG]: /* @__PURE__ */ new Set([et.TITLE, et.FOREIGN_OBJECT, et.DESC]),
  [K.XLINK]: /* @__PURE__ */ new Set(),
  [K.XML]: /* @__PURE__ */ new Set(),
  [K.XMLNS]: /* @__PURE__ */ new Set()
};
function Vl(t) {
  return t === et.H1 || t === et.H2 || t === et.H3 || t === et.H4 || t === et.H5 || t === et.H6;
}
const UE = /* @__PURE__ */ new Set([
  k.STYLE,
  k.SCRIPT,
  k.XMP,
  k.IFRAME,
  k.NOEMBED,
  k.NOFRAMES,
  k.PLAINTEXT
]);
function HE(t, e) {
  return UE.has(t) || e && t === k.NOSCRIPT;
}
const qE = /* @__PURE__ */ new Map([
  [128, 8364],
  [130, 8218],
  [131, 402],
  [132, 8222],
  [133, 8230],
  [134, 8224],
  [135, 8225],
  [136, 710],
  [137, 8240],
  [138, 352],
  [139, 8249],
  [140, 338],
  [142, 381],
  [145, 8216],
  [146, 8217],
  [147, 8220],
  [148, 8221],
  [149, 8226],
  [150, 8211],
  [151, 8212],
  [152, 732],
  [153, 8482],
  [154, 353],
  [155, 8250],
  [156, 339],
  [158, 382],
  [159, 376]
]);
var C;
(function(t) {
  t[t.DATA = 0] = "DATA", t[t.RCDATA = 1] = "RCDATA", t[t.RAWTEXT = 2] = "RAWTEXT", t[t.SCRIPT_DATA = 3] = "SCRIPT_DATA", t[t.PLAINTEXT = 4] = "PLAINTEXT", t[t.TAG_OPEN = 5] = "TAG_OPEN", t[t.END_TAG_OPEN = 6] = "END_TAG_OPEN", t[t.TAG_NAME = 7] = "TAG_NAME", t[t.RCDATA_LESS_THAN_SIGN = 8] = "RCDATA_LESS_THAN_SIGN", t[t.RCDATA_END_TAG_OPEN = 9] = "RCDATA_END_TAG_OPEN", t[t.RCDATA_END_TAG_NAME = 10] = "RCDATA_END_TAG_NAME", t[t.RAWTEXT_LESS_THAN_SIGN = 11] = "RAWTEXT_LESS_THAN_SIGN", t[t.RAWTEXT_END_TAG_OPEN = 12] = "RAWTEXT_END_TAG_OPEN", t[t.RAWTEXT_END_TAG_NAME = 13] = "RAWTEXT_END_TAG_NAME", t[t.SCRIPT_DATA_LESS_THAN_SIGN = 14] = "SCRIPT_DATA_LESS_THAN_SIGN", t[t.SCRIPT_DATA_END_TAG_OPEN = 15] = "SCRIPT_DATA_END_TAG_OPEN", t[t.SCRIPT_DATA_END_TAG_NAME = 16] = "SCRIPT_DATA_END_TAG_NAME", t[t.SCRIPT_DATA_ESCAPE_START = 17] = "SCRIPT_DATA_ESCAPE_START", t[t.SCRIPT_DATA_ESCAPE_START_DASH = 18] = "SCRIPT_DATA_ESCAPE_START_DASH", t[t.SCRIPT_DATA_ESCAPED = 19] = "SCRIPT_DATA_ESCAPED", t[t.SCRIPT_DATA_ESCAPED_DASH = 20] = "SCRIPT_DATA_ESCAPED_DASH", t[t.SCRIPT_DATA_ESCAPED_DASH_DASH = 21] = "SCRIPT_DATA_ESCAPED_DASH_DASH", t[t.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN = 22] = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN", t[t.SCRIPT_DATA_ESCAPED_END_TAG_OPEN = 23] = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN", t[t.SCRIPT_DATA_ESCAPED_END_TAG_NAME = 24] = "SCRIPT_DATA_ESCAPED_END_TAG_NAME", t[t.SCRIPT_DATA_DOUBLE_ESCAPE_START = 25] = "SCRIPT_DATA_DOUBLE_ESCAPE_START", t[t.SCRIPT_DATA_DOUBLE_ESCAPED = 26] = "SCRIPT_DATA_DOUBLE_ESCAPED", t[t.SCRIPT_DATA_DOUBLE_ESCAPED_DASH = 27] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH", t[t.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH = 28] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH", t[t.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN = 29] = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN", t[t.SCRIPT_DATA_DOUBLE_ESCAPE_END = 30] = "SCRIPT_DATA_DOUBLE_ESCAPE_END", t[t.BEFORE_ATTRIBUTE_NAME = 31] = "BEFORE_ATTRIBUTE_NAME", t[t.ATTRIBUTE_NAME = 32] = "ATTRIBUTE_NAME", t[t.AFTER_ATTRIBUTE_NAME = 33] = "AFTER_ATTRIBUTE_NAME", t[t.BEFORE_ATTRIBUTE_VALUE = 34] = "BEFORE_ATTRIBUTE_VALUE", t[t.ATTRIBUTE_VALUE_DOUBLE_QUOTED = 35] = "ATTRIBUTE_VALUE_DOUBLE_QUOTED", t[t.ATTRIBUTE_VALUE_SINGLE_QUOTED = 36] = "ATTRIBUTE_VALUE_SINGLE_QUOTED", t[t.ATTRIBUTE_VALUE_UNQUOTED = 37] = "ATTRIBUTE_VALUE_UNQUOTED", t[t.AFTER_ATTRIBUTE_VALUE_QUOTED = 38] = "AFTER_ATTRIBUTE_VALUE_QUOTED", t[t.SELF_CLOSING_START_TAG = 39] = "SELF_CLOSING_START_TAG", t[t.BOGUS_COMMENT = 40] = "BOGUS_COMMENT", t[t.MARKUP_DECLARATION_OPEN = 41] = "MARKUP_DECLARATION_OPEN", t[t.COMMENT_START = 42] = "COMMENT_START", t[t.COMMENT_START_DASH = 43] = "COMMENT_START_DASH", t[t.COMMENT = 44] = "COMMENT", t[t.COMMENT_LESS_THAN_SIGN = 45] = "COMMENT_LESS_THAN_SIGN", t[t.COMMENT_LESS_THAN_SIGN_BANG = 46] = "COMMENT_LESS_THAN_SIGN_BANG", t[t.COMMENT_LESS_THAN_SIGN_BANG_DASH = 47] = "COMMENT_LESS_THAN_SIGN_BANG_DASH", t[t.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH = 48] = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH", t[t.COMMENT_END_DASH = 49] = "COMMENT_END_DASH", t[t.COMMENT_END = 50] = "COMMENT_END", t[t.COMMENT_END_BANG = 51] = "COMMENT_END_BANG", t[t.DOCTYPE = 52] = "DOCTYPE", t[t.BEFORE_DOCTYPE_NAME = 53] = "BEFORE_DOCTYPE_NAME", t[t.DOCTYPE_NAME = 54] = "DOCTYPE_NAME", t[t.AFTER_DOCTYPE_NAME = 55] = "AFTER_DOCTYPE_NAME", t[t.AFTER_DOCTYPE_PUBLIC_KEYWORD = 56] = "AFTER_DOCTYPE_PUBLIC_KEYWORD", t[t.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER = 57] = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER", t[t.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED = 58] = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED", t[t.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED = 59] = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED", t[t.AFTER_DOCTYPE_PUBLIC_IDENTIFIER = 60] = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER", t[t.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS = 61] = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS", t[t.AFTER_DOCTYPE_SYSTEM_KEYWORD = 62] = "AFTER_DOCTYPE_SYSTEM_KEYWORD", t[t.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER = 63] = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER", t[t.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED = 64] = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED", t[t.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED = 65] = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED", t[t.AFTER_DOCTYPE_SYSTEM_IDENTIFIER = 66] = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER", t[t.BOGUS_DOCTYPE = 67] = "BOGUS_DOCTYPE", t[t.CDATA_SECTION = 68] = "CDATA_SECTION", t[t.CDATA_SECTION_BRACKET = 69] = "CDATA_SECTION_BRACKET", t[t.CDATA_SECTION_END = 70] = "CDATA_SECTION_END", t[t.CHARACTER_REFERENCE = 71] = "CHARACTER_REFERENCE", t[t.NAMED_CHARACTER_REFERENCE = 72] = "NAMED_CHARACTER_REFERENCE", t[t.AMBIGUOUS_AMPERSAND = 73] = "AMBIGUOUS_AMPERSAND", t[t.NUMERIC_CHARACTER_REFERENCE = 74] = "NUMERIC_CHARACTER_REFERENCE", t[t.HEXADEMICAL_CHARACTER_REFERENCE_START = 75] = "HEXADEMICAL_CHARACTER_REFERENCE_START", t[t.HEXADEMICAL_CHARACTER_REFERENCE = 76] = "HEXADEMICAL_CHARACTER_REFERENCE", t[t.DECIMAL_CHARACTER_REFERENCE = 77] = "DECIMAL_CHARACTER_REFERENCE", t[t.NUMERIC_CHARACTER_REFERENCE_END = 78] = "NUMERIC_CHARACTER_REFERENCE_END";
})(C || (C = {}));
const kn = {
  DATA: C.DATA,
  RCDATA: C.RCDATA,
  RAWTEXT: C.RAWTEXT,
  SCRIPT_DATA: C.SCRIPT_DATA,
  PLAINTEXT: C.PLAINTEXT,
  CDATA_SECTION: C.CDATA_SECTION
};
function ri(t) {
  return t >= _.DIGIT_0 && t <= _.DIGIT_9;
}
function Js(t) {
  return t >= _.LATIN_CAPITAL_A && t <= _.LATIN_CAPITAL_Z;
}
function $E(t) {
  return t >= _.LATIN_SMALL_A && t <= _.LATIN_SMALL_Z;
}
function Zr(t) {
  return $E(t) || Js(t);
}
function Du(t) {
  return Zr(t) || ri(t);
}
function jl(t) {
  return t >= _.LATIN_CAPITAL_A && t <= _.LATIN_CAPITAL_F;
}
function Wl(t) {
  return t >= _.LATIN_SMALL_A && t <= _.LATIN_SMALL_F;
}
function GE(t) {
  return ri(t) || jl(t) || Wl(t);
}
function ki(t) {
  return t + 32;
}
function Ql(t) {
  return t === _.SPACE || t === _.LINE_FEED || t === _.TABULATION || t === _.FORM_FEED;
}
function YE(t) {
  return t === _.EQUALS_SIGN || Du(t);
}
function vc(t) {
  return Ql(t) || t === _.SOLIDUS || t === _.GREATER_THAN_SIGN;
}
let VE = class {
  constructor(e, n) {
    this.options = e, this.handler = n, this.paused = !1, this.inLoop = !1, this.inForeignNode = !1, this.lastStartTagName = "", this.active = !1, this.state = C.DATA, this.returnState = C.DATA, this.charRefCode = -1, this.consumedAfterSnapshot = -1, this.currentCharacterToken = null, this.currentToken = null, this.currentAttr = { name: "", value: "" }, this.preprocessor = new ME(n), this.currentLocation = this.getCurrentLocation(-1);
  }
  //Errors
  _err(e) {
    var n, r;
    (r = (n = this.handler).onParseError) === null || r === void 0 || r.call(n, this.preprocessor.getError(e));
  }
  // NOTE: `offset` may never run across line boundaries.
  getCurrentLocation(e) {
    return this.options.sourceCodeLocationInfo ? {
      startLine: this.preprocessor.line,
      startCol: this.preprocessor.col - e,
      startOffset: this.preprocessor.offset - e,
      endLine: -1,
      endCol: -1,
      endOffset: -1
    } : null;
  }
  _runParsingLoop() {
    if (!this.inLoop) {
      for (this.inLoop = !0; this.active && !this.paused; ) {
        this.consumedAfterSnapshot = 0;
        const e = this._consume();
        this._ensureHibernation() || this._callState(e);
      }
      this.inLoop = !1;
    }
  }
  //API
  pause() {
    this.paused = !0;
  }
  resume(e) {
    if (!this.paused)
      throw new Error("Parser was already resumed");
    this.paused = !1, !this.inLoop && (this._runParsingLoop(), this.paused || e == null || e());
  }
  write(e, n, r) {
    this.active = !0, this.preprocessor.write(e, n), this._runParsingLoop(), this.paused || r == null || r();
  }
  insertHtmlAtCurrentPos(e) {
    this.active = !0, this.preprocessor.insertHtmlAtCurrentPos(e), this._runParsingLoop();
  }
  //Hibernation
  _ensureHibernation() {
    return this.preprocessor.endOfChunkHit ? (this._unconsume(this.consumedAfterSnapshot), this.active = !1, !0) : !1;
  }
  //Consumption
  _consume() {
    return this.consumedAfterSnapshot++, this.preprocessor.advance();
  }
  _unconsume(e) {
    this.consumedAfterSnapshot -= e, this.preprocessor.retreat(e);
  }
  _reconsumeInState(e, n) {
    this.state = e, this._callState(n);
  }
  _advanceBy(e) {
    this.consumedAfterSnapshot += e;
    for (let n = 0; n < e; n++)
      this.preprocessor.advance();
  }
  _consumeSequenceIfMatch(e, n) {
    return this.preprocessor.startsWith(e, n) ? (this._advanceBy(e.length - 1), !0) : !1;
  }
  //Token creation
  _createStartTagToken() {
    this.currentToken = {
      type: jt.START_TAG,
      tagName: "",
      tagID: f.UNKNOWN,
      selfClosing: !1,
      ackSelfClosing: !1,
      attrs: [],
      location: this.getCurrentLocation(1)
    };
  }
  _createEndTagToken() {
    this.currentToken = {
      type: jt.END_TAG,
      tagName: "",
      tagID: f.UNKNOWN,
      selfClosing: !1,
      ackSelfClosing: !1,
      attrs: [],
      location: this.getCurrentLocation(2)
    };
  }
  _createCommentToken(e) {
    this.currentToken = {
      type: jt.COMMENT,
      data: "",
      location: this.getCurrentLocation(e)
    };
  }
  _createDoctypeToken(e) {
    this.currentToken = {
      type: jt.DOCTYPE,
      name: e,
      forceQuirks: !1,
      publicId: null,
      systemId: null,
      location: this.currentLocation
    };
  }
  _createCharacterToken(e, n) {
    this.currentCharacterToken = {
      type: e,
      chars: n,
      location: this.currentLocation
    };
  }
  //Tag attributes
  _createAttr(e) {
    this.currentAttr = {
      name: e,
      value: ""
    }, this.currentLocation = this.getCurrentLocation(0);
  }
  _leaveAttrName() {
    var e, n;
    const r = this.currentToken;
    if (Yl(r, this.currentAttr.name) === null) {
      if (r.attrs.push(this.currentAttr), r.location && this.currentLocation) {
        const a = (e = (n = r.location).attrs) !== null && e !== void 0 ? e : n.attrs = /* @__PURE__ */ Object.create(null);
        a[this.currentAttr.name] = this.currentLocation, this._leaveAttrValue();
      }
    } else
      this._err(j.duplicateAttribute);
  }
  _leaveAttrValue() {
    this.currentLocation && (this.currentLocation.endLine = this.preprocessor.line, this.currentLocation.endCol = this.preprocessor.col, this.currentLocation.endOffset = this.preprocessor.offset);
  }
  //Token emission
  prepareToken(e) {
    this._emitCurrentCharacterToken(e.location), this.currentToken = null, e.location && (e.location.endLine = this.preprocessor.line, e.location.endCol = this.preprocessor.col + 1, e.location.endOffset = this.preprocessor.offset + 1), this.currentLocation = this.getCurrentLocation(-1);
  }
  emitCurrentTagToken() {
    const e = this.currentToken;
    this.prepareToken(e), e.tagID = va(e.tagName), e.type === jt.START_TAG ? (this.lastStartTagName = e.tagName, this.handler.onStartTag(e)) : (e.attrs.length > 0 && this._err(j.endTagWithAttributes), e.selfClosing && this._err(j.endTagWithTrailingSolidus), this.handler.onEndTag(e)), this.preprocessor.dropParsedChunk();
  }
  emitCurrentComment(e) {
    this.prepareToken(e), this.handler.onComment(e), this.preprocessor.dropParsedChunk();
  }
  emitCurrentDoctype(e) {
    this.prepareToken(e), this.handler.onDoctype(e), this.preprocessor.dropParsedChunk();
  }
  _emitCurrentCharacterToken(e) {
    if (this.currentCharacterToken) {
      switch (e && this.currentCharacterToken.location && (this.currentCharacterToken.location.endLine = e.startLine, this.currentCharacterToken.location.endCol = e.startCol, this.currentCharacterToken.location.endOffset = e.startOffset), this.currentCharacterToken.type) {
        case jt.CHARACTER: {
          this.handler.onCharacter(this.currentCharacterToken);
          break;
        }
        case jt.NULL_CHARACTER: {
          this.handler.onNullCharacter(this.currentCharacterToken);
          break;
        }
        case jt.WHITESPACE_CHARACTER: {
          this.handler.onWhitespaceCharacter(this.currentCharacterToken);
          break;
        }
      }
      this.currentCharacterToken = null;
    }
  }
  _emitEOFToken() {
    const e = this.getCurrentLocation(0);
    e && (e.endLine = e.startLine, e.endCol = e.startCol, e.endOffset = e.startOffset), this._emitCurrentCharacterToken(e), this.handler.onEof({ type: jt.EOF, location: e }), this.active = !1;
  }
  //Characters emission
  //OPTIMIZATION: specification uses only one type of character tokens (one token per character).
  //This causes a huge memory overhead and a lot of unnecessary parser loops. parse5 uses 3 groups of characters.
  //If we have a sequence of characters that belong to the same group, the parser can process it
  //as a single solid character token.
  //So, there are 3 types of character tokens in parse5:
  //1)TokenType.NULL_CHARACTER - \u0000-character sequences (e.g. '\u0000\u0000\u0000')
  //2)TokenType.WHITESPACE_CHARACTER - any whitespace/new-line character sequences (e.g. '\n  \r\t   \f')
  //3)TokenType.CHARACTER - any character sequence which don't belong to groups 1 and 2 (e.g. 'abcdef1234@@#$%^')
  _appendCharToCurrentCharacterToken(e, n) {
    if (this.currentCharacterToken)
      if (this.currentCharacterToken.type !== e)
        this.currentLocation = this.getCurrentLocation(0), this._emitCurrentCharacterToken(this.currentLocation), this.preprocessor.dropParsedChunk();
      else {
        this.currentCharacterToken.chars += n;
        return;
      }
    this._createCharacterToken(e, n);
  }
  _emitCodePoint(e) {
    const n = Ql(e) ? jt.WHITESPACE_CHARACTER : e === _.NULL ? jt.NULL_CHARACTER : jt.CHARACTER;
    this._appendCharToCurrentCharacterToken(n, String.fromCodePoint(e));
  }
  //NOTE: used when we emit characters explicitly.
  //This is always for non-whitespace and non-null characters, which allows us to avoid additional checks.
  _emitChars(e) {
    this._appendCharToCurrentCharacterToken(jt.CHARACTER, e);
  }
  // Character reference helpers
  _matchNamedCharacterReference(e) {
    let n = null, r = 0, a = !1;
    for (let u = 0, o = jr[0]; u >= 0 && (u = Ju(jr, o, u + 1, e), !(u < 0)); e = this._consume()) {
      r += 1, o = jr[u];
      const h = o & jn.VALUE_LENGTH;
      if (h) {
        const m = (h >> 14) - 1;
        if (e !== _.SEMICOLON && this._isCharacterReferenceInAttribute() && YE(this.preprocessor.peek(1)) ? (n = [_.AMPERSAND], u += m) : (n = m === 0 ? [jr[u] & ~jn.VALUE_LENGTH] : m === 1 ? [jr[++u]] : [jr[++u], jr[++u]], r = 0, a = e !== _.SEMICOLON), m === 0) {
          this._consume();
          break;
        }
      }
    }
    return this._unconsume(r), a && !this.preprocessor.endOfChunkHit && this._err(j.missingSemicolonAfterCharacterReference), this._unconsume(1), n;
  }
  _isCharacterReferenceInAttribute() {
    return this.returnState === C.ATTRIBUTE_VALUE_DOUBLE_QUOTED || this.returnState === C.ATTRIBUTE_VALUE_SINGLE_QUOTED || this.returnState === C.ATTRIBUTE_VALUE_UNQUOTED;
  }
  _flushCodePointConsumedAsCharacterReference(e) {
    this._isCharacterReferenceInAttribute() ? this.currentAttr.value += String.fromCodePoint(e) : this._emitCodePoint(e);
  }
  // Calling states this way turns out to be much faster than any other approach.
  _callState(e) {
    switch (this.state) {
      case C.DATA: {
        this._stateData(e);
        break;
      }
      case C.RCDATA: {
        this._stateRcdata(e);
        break;
      }
      case C.RAWTEXT: {
        this._stateRawtext(e);
        break;
      }
      case C.SCRIPT_DATA: {
        this._stateScriptData(e);
        break;
      }
      case C.PLAINTEXT: {
        this._statePlaintext(e);
        break;
      }
      case C.TAG_OPEN: {
        this._stateTagOpen(e);
        break;
      }
      case C.END_TAG_OPEN: {
        this._stateEndTagOpen(e);
        break;
      }
      case C.TAG_NAME: {
        this._stateTagName(e);
        break;
      }
      case C.RCDATA_LESS_THAN_SIGN: {
        this._stateRcdataLessThanSign(e);
        break;
      }
      case C.RCDATA_END_TAG_OPEN: {
        this._stateRcdataEndTagOpen(e);
        break;
      }
      case C.RCDATA_END_TAG_NAME: {
        this._stateRcdataEndTagName(e);
        break;
      }
      case C.RAWTEXT_LESS_THAN_SIGN: {
        this._stateRawtextLessThanSign(e);
        break;
      }
      case C.RAWTEXT_END_TAG_OPEN: {
        this._stateRawtextEndTagOpen(e);
        break;
      }
      case C.RAWTEXT_END_TAG_NAME: {
        this._stateRawtextEndTagName(e);
        break;
      }
      case C.SCRIPT_DATA_LESS_THAN_SIGN: {
        this._stateScriptDataLessThanSign(e);
        break;
      }
      case C.SCRIPT_DATA_END_TAG_OPEN: {
        this._stateScriptDataEndTagOpen(e);
        break;
      }
      case C.SCRIPT_DATA_END_TAG_NAME: {
        this._stateScriptDataEndTagName(e);
        break;
      }
      case C.SCRIPT_DATA_ESCAPE_START: {
        this._stateScriptDataEscapeStart(e);
        break;
      }
      case C.SCRIPT_DATA_ESCAPE_START_DASH: {
        this._stateScriptDataEscapeStartDash(e);
        break;
      }
      case C.SCRIPT_DATA_ESCAPED: {
        this._stateScriptDataEscaped(e);
        break;
      }
      case C.SCRIPT_DATA_ESCAPED_DASH: {
        this._stateScriptDataEscapedDash(e);
        break;
      }
      case C.SCRIPT_DATA_ESCAPED_DASH_DASH: {
        this._stateScriptDataEscapedDashDash(e);
        break;
      }
      case C.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN: {
        this._stateScriptDataEscapedLessThanSign(e);
        break;
      }
      case C.SCRIPT_DATA_ESCAPED_END_TAG_OPEN: {
        this._stateScriptDataEscapedEndTagOpen(e);
        break;
      }
      case C.SCRIPT_DATA_ESCAPED_END_TAG_NAME: {
        this._stateScriptDataEscapedEndTagName(e);
        break;
      }
      case C.SCRIPT_DATA_DOUBLE_ESCAPE_START: {
        this._stateScriptDataDoubleEscapeStart(e);
        break;
      }
      case C.SCRIPT_DATA_DOUBLE_ESCAPED: {
        this._stateScriptDataDoubleEscaped(e);
        break;
      }
      case C.SCRIPT_DATA_DOUBLE_ESCAPED_DASH: {
        this._stateScriptDataDoubleEscapedDash(e);
        break;
      }
      case C.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH: {
        this._stateScriptDataDoubleEscapedDashDash(e);
        break;
      }
      case C.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN: {
        this._stateScriptDataDoubleEscapedLessThanSign(e);
        break;
      }
      case C.SCRIPT_DATA_DOUBLE_ESCAPE_END: {
        this._stateScriptDataDoubleEscapeEnd(e);
        break;
      }
      case C.BEFORE_ATTRIBUTE_NAME: {
        this._stateBeforeAttributeName(e);
        break;
      }
      case C.ATTRIBUTE_NAME: {
        this._stateAttributeName(e);
        break;
      }
      case C.AFTER_ATTRIBUTE_NAME: {
        this._stateAfterAttributeName(e);
        break;
      }
      case C.BEFORE_ATTRIBUTE_VALUE: {
        this._stateBeforeAttributeValue(e);
        break;
      }
      case C.ATTRIBUTE_VALUE_DOUBLE_QUOTED: {
        this._stateAttributeValueDoubleQuoted(e);
        break;
      }
      case C.ATTRIBUTE_VALUE_SINGLE_QUOTED: {
        this._stateAttributeValueSingleQuoted(e);
        break;
      }
      case C.ATTRIBUTE_VALUE_UNQUOTED: {
        this._stateAttributeValueUnquoted(e);
        break;
      }
      case C.AFTER_ATTRIBUTE_VALUE_QUOTED: {
        this._stateAfterAttributeValueQuoted(e);
        break;
      }
      case C.SELF_CLOSING_START_TAG: {
        this._stateSelfClosingStartTag(e);
        break;
      }
      case C.BOGUS_COMMENT: {
        this._stateBogusComment(e);
        break;
      }
      case C.MARKUP_DECLARATION_OPEN: {
        this._stateMarkupDeclarationOpen(e);
        break;
      }
      case C.COMMENT_START: {
        this._stateCommentStart(e);
        break;
      }
      case C.COMMENT_START_DASH: {
        this._stateCommentStartDash(e);
        break;
      }
      case C.COMMENT: {
        this._stateComment(e);
        break;
      }
      case C.COMMENT_LESS_THAN_SIGN: {
        this._stateCommentLessThanSign(e);
        break;
      }
      case C.COMMENT_LESS_THAN_SIGN_BANG: {
        this._stateCommentLessThanSignBang(e);
        break;
      }
      case C.COMMENT_LESS_THAN_SIGN_BANG_DASH: {
        this._stateCommentLessThanSignBangDash(e);
        break;
      }
      case C.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH: {
        this._stateCommentLessThanSignBangDashDash(e);
        break;
      }
      case C.COMMENT_END_DASH: {
        this._stateCommentEndDash(e);
        break;
      }
      case C.COMMENT_END: {
        this._stateCommentEnd(e);
        break;
      }
      case C.COMMENT_END_BANG: {
        this._stateCommentEndBang(e);
        break;
      }
      case C.DOCTYPE: {
        this._stateDoctype(e);
        break;
      }
      case C.BEFORE_DOCTYPE_NAME: {
        this._stateBeforeDoctypeName(e);
        break;
      }
      case C.DOCTYPE_NAME: {
        this._stateDoctypeName(e);
        break;
      }
      case C.AFTER_DOCTYPE_NAME: {
        this._stateAfterDoctypeName(e);
        break;
      }
      case C.AFTER_DOCTYPE_PUBLIC_KEYWORD: {
        this._stateAfterDoctypePublicKeyword(e);
        break;
      }
      case C.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER: {
        this._stateBeforeDoctypePublicIdentifier(e);
        break;
      }
      case C.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED: {
        this._stateDoctypePublicIdentifierDoubleQuoted(e);
        break;
      }
      case C.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED: {
        this._stateDoctypePublicIdentifierSingleQuoted(e);
        break;
      }
      case C.AFTER_DOCTYPE_PUBLIC_IDENTIFIER: {
        this._stateAfterDoctypePublicIdentifier(e);
        break;
      }
      case C.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS: {
        this._stateBetweenDoctypePublicAndSystemIdentifiers(e);
        break;
      }
      case C.AFTER_DOCTYPE_SYSTEM_KEYWORD: {
        this._stateAfterDoctypeSystemKeyword(e);
        break;
      }
      case C.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER: {
        this._stateBeforeDoctypeSystemIdentifier(e);
        break;
      }
      case C.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED: {
        this._stateDoctypeSystemIdentifierDoubleQuoted(e);
        break;
      }
      case C.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED: {
        this._stateDoctypeSystemIdentifierSingleQuoted(e);
        break;
      }
      case C.AFTER_DOCTYPE_SYSTEM_IDENTIFIER: {
        this._stateAfterDoctypeSystemIdentifier(e);
        break;
      }
      case C.BOGUS_DOCTYPE: {
        this._stateBogusDoctype(e);
        break;
      }
      case C.CDATA_SECTION: {
        this._stateCdataSection(e);
        break;
      }
      case C.CDATA_SECTION_BRACKET: {
        this._stateCdataSectionBracket(e);
        break;
      }
      case C.CDATA_SECTION_END: {
        this._stateCdataSectionEnd(e);
        break;
      }
      case C.CHARACTER_REFERENCE: {
        this._stateCharacterReference(e);
        break;
      }
      case C.NAMED_CHARACTER_REFERENCE: {
        this._stateNamedCharacterReference(e);
        break;
      }
      case C.AMBIGUOUS_AMPERSAND: {
        this._stateAmbiguousAmpersand(e);
        break;
      }
      case C.NUMERIC_CHARACTER_REFERENCE: {
        this._stateNumericCharacterReference(e);
        break;
      }
      case C.HEXADEMICAL_CHARACTER_REFERENCE_START: {
        this._stateHexademicalCharacterReferenceStart(e);
        break;
      }
      case C.HEXADEMICAL_CHARACTER_REFERENCE: {
        this._stateHexademicalCharacterReference(e);
        break;
      }
      case C.DECIMAL_CHARACTER_REFERENCE: {
        this._stateDecimalCharacterReference(e);
        break;
      }
      case C.NUMERIC_CHARACTER_REFERENCE_END: {
        this._stateNumericCharacterReferenceEnd(e);
        break;
      }
      default:
        throw new Error("Unknown state");
    }
  }
  // State machine
  // Data state
  //------------------------------------------------------------------
  _stateData(e) {
    switch (e) {
      case _.LESS_THAN_SIGN: {
        this.state = C.TAG_OPEN;
        break;
      }
      case _.AMPERSAND: {
        this.returnState = C.DATA, this.state = C.CHARACTER_REFERENCE;
        break;
      }
      case _.NULL: {
        this._err(j.unexpectedNullCharacter), this._emitCodePoint(e);
        break;
      }
      case _.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(e);
    }
  }
  //  RCDATA state
  //------------------------------------------------------------------
  _stateRcdata(e) {
    switch (e) {
      case _.AMPERSAND: {
        this.returnState = C.RCDATA, this.state = C.CHARACTER_REFERENCE;
        break;
      }
      case _.LESS_THAN_SIGN: {
        this.state = C.RCDATA_LESS_THAN_SIGN;
        break;
      }
      case _.NULL: {
        this._err(j.unexpectedNullCharacter), this._emitChars(me);
        break;
      }
      case _.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(e);
    }
  }
  // RAWTEXT state
  //------------------------------------------------------------------
  _stateRawtext(e) {
    switch (e) {
      case _.LESS_THAN_SIGN: {
        this.state = C.RAWTEXT_LESS_THAN_SIGN;
        break;
      }
      case _.NULL: {
        this._err(j.unexpectedNullCharacter), this._emitChars(me);
        break;
      }
      case _.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(e);
    }
  }
  // Script data state
  //------------------------------------------------------------------
  _stateScriptData(e) {
    switch (e) {
      case _.LESS_THAN_SIGN: {
        this.state = C.SCRIPT_DATA_LESS_THAN_SIGN;
        break;
      }
      case _.NULL: {
        this._err(j.unexpectedNullCharacter), this._emitChars(me);
        break;
      }
      case _.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(e);
    }
  }
  // PLAINTEXT state
  //------------------------------------------------------------------
  _statePlaintext(e) {
    switch (e) {
      case _.NULL: {
        this._err(j.unexpectedNullCharacter), this._emitChars(me);
        break;
      }
      case _.EOF: {
        this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(e);
    }
  }
  // Tag open state
  //------------------------------------------------------------------
  _stateTagOpen(e) {
    if (Zr(e))
      this._createStartTagToken(), this.state = C.TAG_NAME, this._stateTagName(e);
    else
      switch (e) {
        case _.EXCLAMATION_MARK: {
          this.state = C.MARKUP_DECLARATION_OPEN;
          break;
        }
        case _.SOLIDUS: {
          this.state = C.END_TAG_OPEN;
          break;
        }
        case _.QUESTION_MARK: {
          this._err(j.unexpectedQuestionMarkInsteadOfTagName), this._createCommentToken(1), this.state = C.BOGUS_COMMENT, this._stateBogusComment(e);
          break;
        }
        case _.EOF: {
          this._err(j.eofBeforeTagName), this._emitChars("<"), this._emitEOFToken();
          break;
        }
        default:
          this._err(j.invalidFirstCharacterOfTagName), this._emitChars("<"), this.state = C.DATA, this._stateData(e);
      }
  }
  // End tag open state
  //------------------------------------------------------------------
  _stateEndTagOpen(e) {
    if (Zr(e))
      this._createEndTagToken(), this.state = C.TAG_NAME, this._stateTagName(e);
    else
      switch (e) {
        case _.GREATER_THAN_SIGN: {
          this._err(j.missingEndTagName), this.state = C.DATA;
          break;
        }
        case _.EOF: {
          this._err(j.eofBeforeTagName), this._emitChars("</"), this._emitEOFToken();
          break;
        }
        default:
          this._err(j.invalidFirstCharacterOfTagName), this._createCommentToken(2), this.state = C.BOGUS_COMMENT, this._stateBogusComment(e);
      }
  }
  // Tag name state
  //------------------------------------------------------------------
  _stateTagName(e) {
    const n = this.currentToken;
    switch (e) {
      case _.SPACE:
      case _.LINE_FEED:
      case _.TABULATION:
      case _.FORM_FEED: {
        this.state = C.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case _.SOLIDUS: {
        this.state = C.SELF_CLOSING_START_TAG;
        break;
      }
      case _.GREATER_THAN_SIGN: {
        this.state = C.DATA, this.emitCurrentTagToken();
        break;
      }
      case _.NULL: {
        this._err(j.unexpectedNullCharacter), n.tagName += me;
        break;
      }
      case _.EOF: {
        this._err(j.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        n.tagName += String.fromCodePoint(Js(e) ? ki(e) : e);
    }
  }
  // RCDATA less-than sign state
  //------------------------------------------------------------------
  _stateRcdataLessThanSign(e) {
    e === _.SOLIDUS ? this.state = C.RCDATA_END_TAG_OPEN : (this._emitChars("<"), this.state = C.RCDATA, this._stateRcdata(e));
  }
  // RCDATA end tag open state
  //------------------------------------------------------------------
  _stateRcdataEndTagOpen(e) {
    Zr(e) ? (this.state = C.RCDATA_END_TAG_NAME, this._stateRcdataEndTagName(e)) : (this._emitChars("</"), this.state = C.RCDATA, this._stateRcdata(e));
  }
  handleSpecialEndTag(e) {
    if (!this.preprocessor.startsWith(this.lastStartTagName, !1))
      return !this._ensureHibernation();
    this._createEndTagToken();
    const n = this.currentToken;
    switch (n.tagName = this.lastStartTagName, this.preprocessor.peek(this.lastStartTagName.length)) {
      case _.SPACE:
      case _.LINE_FEED:
      case _.TABULATION:
      case _.FORM_FEED:
        return this._advanceBy(this.lastStartTagName.length), this.state = C.BEFORE_ATTRIBUTE_NAME, !1;
      case _.SOLIDUS:
        return this._advanceBy(this.lastStartTagName.length), this.state = C.SELF_CLOSING_START_TAG, !1;
      case _.GREATER_THAN_SIGN:
        return this._advanceBy(this.lastStartTagName.length), this.emitCurrentTagToken(), this.state = C.DATA, !1;
      default:
        return !this._ensureHibernation();
    }
  }
  // RCDATA end tag name state
  //------------------------------------------------------------------
  _stateRcdataEndTagName(e) {
    this.handleSpecialEndTag(e) && (this._emitChars("</"), this.state = C.RCDATA, this._stateRcdata(e));
  }
  // RAWTEXT less-than sign state
  //------------------------------------------------------------------
  _stateRawtextLessThanSign(e) {
    e === _.SOLIDUS ? this.state = C.RAWTEXT_END_TAG_OPEN : (this._emitChars("<"), this.state = C.RAWTEXT, this._stateRawtext(e));
  }
  // RAWTEXT end tag open state
  //------------------------------------------------------------------
  _stateRawtextEndTagOpen(e) {
    Zr(e) ? (this.state = C.RAWTEXT_END_TAG_NAME, this._stateRawtextEndTagName(e)) : (this._emitChars("</"), this.state = C.RAWTEXT, this._stateRawtext(e));
  }
  // RAWTEXT end tag name state
  //------------------------------------------------------------------
  _stateRawtextEndTagName(e) {
    this.handleSpecialEndTag(e) && (this._emitChars("</"), this.state = C.RAWTEXT, this._stateRawtext(e));
  }
  // Script data less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataLessThanSign(e) {
    switch (e) {
      case _.SOLIDUS: {
        this.state = C.SCRIPT_DATA_END_TAG_OPEN;
        break;
      }
      case _.EXCLAMATION_MARK: {
        this.state = C.SCRIPT_DATA_ESCAPE_START, this._emitChars("<!");
        break;
      }
      default:
        this._emitChars("<"), this.state = C.SCRIPT_DATA, this._stateScriptData(e);
    }
  }
  // Script data end tag open state
  //------------------------------------------------------------------
  _stateScriptDataEndTagOpen(e) {
    Zr(e) ? (this.state = C.SCRIPT_DATA_END_TAG_NAME, this._stateScriptDataEndTagName(e)) : (this._emitChars("</"), this.state = C.SCRIPT_DATA, this._stateScriptData(e));
  }
  // Script data end tag name state
  //------------------------------------------------------------------
  _stateScriptDataEndTagName(e) {
    this.handleSpecialEndTag(e) && (this._emitChars("</"), this.state = C.SCRIPT_DATA, this._stateScriptData(e));
  }
  // Script data escape start state
  //------------------------------------------------------------------
  _stateScriptDataEscapeStart(e) {
    e === _.HYPHEN_MINUS ? (this.state = C.SCRIPT_DATA_ESCAPE_START_DASH, this._emitChars("-")) : (this.state = C.SCRIPT_DATA, this._stateScriptData(e));
  }
  // Script data escape start dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapeStartDash(e) {
    e === _.HYPHEN_MINUS ? (this.state = C.SCRIPT_DATA_ESCAPED_DASH_DASH, this._emitChars("-")) : (this.state = C.SCRIPT_DATA, this._stateScriptData(e));
  }
  // Script data escaped state
  //------------------------------------------------------------------
  _stateScriptDataEscaped(e) {
    switch (e) {
      case _.HYPHEN_MINUS: {
        this.state = C.SCRIPT_DATA_ESCAPED_DASH, this._emitChars("-");
        break;
      }
      case _.LESS_THAN_SIGN: {
        this.state = C.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case _.NULL: {
        this._err(j.unexpectedNullCharacter), this._emitChars(me);
        break;
      }
      case _.EOF: {
        this._err(j.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(e);
    }
  }
  // Script data escaped dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapedDash(e) {
    switch (e) {
      case _.HYPHEN_MINUS: {
        this.state = C.SCRIPT_DATA_ESCAPED_DASH_DASH, this._emitChars("-");
        break;
      }
      case _.LESS_THAN_SIGN: {
        this.state = C.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case _.NULL: {
        this._err(j.unexpectedNullCharacter), this.state = C.SCRIPT_DATA_ESCAPED, this._emitChars(me);
        break;
      }
      case _.EOF: {
        this._err(j.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = C.SCRIPT_DATA_ESCAPED, this._emitCodePoint(e);
    }
  }
  // Script data escaped dash dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapedDashDash(e) {
    switch (e) {
      case _.HYPHEN_MINUS: {
        this._emitChars("-");
        break;
      }
      case _.LESS_THAN_SIGN: {
        this.state = C.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case _.GREATER_THAN_SIGN: {
        this.state = C.SCRIPT_DATA, this._emitChars(">");
        break;
      }
      case _.NULL: {
        this._err(j.unexpectedNullCharacter), this.state = C.SCRIPT_DATA_ESCAPED, this._emitChars(me);
        break;
      }
      case _.EOF: {
        this._err(j.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = C.SCRIPT_DATA_ESCAPED, this._emitCodePoint(e);
    }
  }
  // Script data escaped less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataEscapedLessThanSign(e) {
    e === _.SOLIDUS ? this.state = C.SCRIPT_DATA_ESCAPED_END_TAG_OPEN : Zr(e) ? (this._emitChars("<"), this.state = C.SCRIPT_DATA_DOUBLE_ESCAPE_START, this._stateScriptDataDoubleEscapeStart(e)) : (this._emitChars("<"), this.state = C.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(e));
  }
  // Script data escaped end tag open state
  //------------------------------------------------------------------
  _stateScriptDataEscapedEndTagOpen(e) {
    Zr(e) ? (this.state = C.SCRIPT_DATA_ESCAPED_END_TAG_NAME, this._stateScriptDataEscapedEndTagName(e)) : (this._emitChars("</"), this.state = C.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(e));
  }
  // Script data escaped end tag name state
  //------------------------------------------------------------------
  _stateScriptDataEscapedEndTagName(e) {
    this.handleSpecialEndTag(e) && (this._emitChars("</"), this.state = C.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(e));
  }
  // Script data double escape start state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapeStart(e) {
    if (this.preprocessor.startsWith(Dn.SCRIPT, !1) && vc(this.preprocessor.peek(Dn.SCRIPT.length))) {
      this._emitCodePoint(e);
      for (let n = 0; n < Dn.SCRIPT.length; n++)
        this._emitCodePoint(this._consume());
      this.state = C.SCRIPT_DATA_DOUBLE_ESCAPED;
    } else
      this._ensureHibernation() || (this.state = C.SCRIPT_DATA_ESCAPED, this._stateScriptDataEscaped(e));
  }
  // Script data double escaped state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscaped(e) {
    switch (e) {
      case _.HYPHEN_MINUS: {
        this.state = C.SCRIPT_DATA_DOUBLE_ESCAPED_DASH, this._emitChars("-");
        break;
      }
      case _.LESS_THAN_SIGN: {
        this.state = C.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
        break;
      }
      case _.NULL: {
        this._err(j.unexpectedNullCharacter), this._emitChars(me);
        break;
      }
      case _.EOF: {
        this._err(j.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(e);
    }
  }
  // Script data double escaped dash state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedDash(e) {
    switch (e) {
      case _.HYPHEN_MINUS: {
        this.state = C.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH, this._emitChars("-");
        break;
      }
      case _.LESS_THAN_SIGN: {
        this.state = C.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
        break;
      }
      case _.NULL: {
        this._err(j.unexpectedNullCharacter), this.state = C.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars(me);
        break;
      }
      case _.EOF: {
        this._err(j.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = C.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitCodePoint(e);
    }
  }
  // Script data double escaped dash dash state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedDashDash(e) {
    switch (e) {
      case _.HYPHEN_MINUS: {
        this._emitChars("-");
        break;
      }
      case _.LESS_THAN_SIGN: {
        this.state = C.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN, this._emitChars("<");
        break;
      }
      case _.GREATER_THAN_SIGN: {
        this.state = C.SCRIPT_DATA, this._emitChars(">");
        break;
      }
      case _.NULL: {
        this._err(j.unexpectedNullCharacter), this.state = C.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitChars(me);
        break;
      }
      case _.EOF: {
        this._err(j.eofInScriptHtmlCommentLikeText), this._emitEOFToken();
        break;
      }
      default:
        this.state = C.SCRIPT_DATA_DOUBLE_ESCAPED, this._emitCodePoint(e);
    }
  }
  // Script data double escaped less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedLessThanSign(e) {
    e === _.SOLIDUS ? (this.state = C.SCRIPT_DATA_DOUBLE_ESCAPE_END, this._emitChars("/")) : (this.state = C.SCRIPT_DATA_DOUBLE_ESCAPED, this._stateScriptDataDoubleEscaped(e));
  }
  // Script data double escape end state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapeEnd(e) {
    if (this.preprocessor.startsWith(Dn.SCRIPT, !1) && vc(this.preprocessor.peek(Dn.SCRIPT.length))) {
      this._emitCodePoint(e);
      for (let n = 0; n < Dn.SCRIPT.length; n++)
        this._emitCodePoint(this._consume());
      this.state = C.SCRIPT_DATA_ESCAPED;
    } else
      this._ensureHibernation() || (this.state = C.SCRIPT_DATA_DOUBLE_ESCAPED, this._stateScriptDataDoubleEscaped(e));
  }
  // Before attribute name state
  //------------------------------------------------------------------
  _stateBeforeAttributeName(e) {
    switch (e) {
      case _.SPACE:
      case _.LINE_FEED:
      case _.TABULATION:
      case _.FORM_FEED:
        break;
      case _.SOLIDUS:
      case _.GREATER_THAN_SIGN:
      case _.EOF: {
        this.state = C.AFTER_ATTRIBUTE_NAME, this._stateAfterAttributeName(e);
        break;
      }
      case _.EQUALS_SIGN: {
        this._err(j.unexpectedEqualsSignBeforeAttributeName), this._createAttr("="), this.state = C.ATTRIBUTE_NAME;
        break;
      }
      default:
        this._createAttr(""), this.state = C.ATTRIBUTE_NAME, this._stateAttributeName(e);
    }
  }
  // Attribute name state
  //------------------------------------------------------------------
  _stateAttributeName(e) {
    switch (e) {
      case _.SPACE:
      case _.LINE_FEED:
      case _.TABULATION:
      case _.FORM_FEED:
      case _.SOLIDUS:
      case _.GREATER_THAN_SIGN:
      case _.EOF: {
        this._leaveAttrName(), this.state = C.AFTER_ATTRIBUTE_NAME, this._stateAfterAttributeName(e);
        break;
      }
      case _.EQUALS_SIGN: {
        this._leaveAttrName(), this.state = C.BEFORE_ATTRIBUTE_VALUE;
        break;
      }
      case _.QUOTATION_MARK:
      case _.APOSTROPHE:
      case _.LESS_THAN_SIGN: {
        this._err(j.unexpectedCharacterInAttributeName), this.currentAttr.name += String.fromCodePoint(e);
        break;
      }
      case _.NULL: {
        this._err(j.unexpectedNullCharacter), this.currentAttr.name += me;
        break;
      }
      default:
        this.currentAttr.name += String.fromCodePoint(Js(e) ? ki(e) : e);
    }
  }
  // After attribute name state
  //------------------------------------------------------------------
  _stateAfterAttributeName(e) {
    switch (e) {
      case _.SPACE:
      case _.LINE_FEED:
      case _.TABULATION:
      case _.FORM_FEED:
        break;
      case _.SOLIDUS: {
        this.state = C.SELF_CLOSING_START_TAG;
        break;
      }
      case _.EQUALS_SIGN: {
        this.state = C.BEFORE_ATTRIBUTE_VALUE;
        break;
      }
      case _.GREATER_THAN_SIGN: {
        this.state = C.DATA, this.emitCurrentTagToken();
        break;
      }
      case _.EOF: {
        this._err(j.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._createAttr(""), this.state = C.ATTRIBUTE_NAME, this._stateAttributeName(e);
    }
  }
  // Before attribute value state
  //------------------------------------------------------------------
  _stateBeforeAttributeValue(e) {
    switch (e) {
      case _.SPACE:
      case _.LINE_FEED:
      case _.TABULATION:
      case _.FORM_FEED:
        break;
      case _.QUOTATION_MARK: {
        this.state = C.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
        break;
      }
      case _.APOSTROPHE: {
        this.state = C.ATTRIBUTE_VALUE_SINGLE_QUOTED;
        break;
      }
      case _.GREATER_THAN_SIGN: {
        this._err(j.missingAttributeValue), this.state = C.DATA, this.emitCurrentTagToken();
        break;
      }
      default:
        this.state = C.ATTRIBUTE_VALUE_UNQUOTED, this._stateAttributeValueUnquoted(e);
    }
  }
  // Attribute value (double-quoted) state
  //------------------------------------------------------------------
  _stateAttributeValueDoubleQuoted(e) {
    switch (e) {
      case _.QUOTATION_MARK: {
        this.state = C.AFTER_ATTRIBUTE_VALUE_QUOTED;
        break;
      }
      case _.AMPERSAND: {
        this.returnState = C.ATTRIBUTE_VALUE_DOUBLE_QUOTED, this.state = C.CHARACTER_REFERENCE;
        break;
      }
      case _.NULL: {
        this._err(j.unexpectedNullCharacter), this.currentAttr.value += me;
        break;
      }
      case _.EOF: {
        this._err(j.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this.currentAttr.value += String.fromCodePoint(e);
    }
  }
  // Attribute value (single-quoted) state
  //------------------------------------------------------------------
  _stateAttributeValueSingleQuoted(e) {
    switch (e) {
      case _.APOSTROPHE: {
        this.state = C.AFTER_ATTRIBUTE_VALUE_QUOTED;
        break;
      }
      case _.AMPERSAND: {
        this.returnState = C.ATTRIBUTE_VALUE_SINGLE_QUOTED, this.state = C.CHARACTER_REFERENCE;
        break;
      }
      case _.NULL: {
        this._err(j.unexpectedNullCharacter), this.currentAttr.value += me;
        break;
      }
      case _.EOF: {
        this._err(j.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this.currentAttr.value += String.fromCodePoint(e);
    }
  }
  // Attribute value (unquoted) state
  //------------------------------------------------------------------
  _stateAttributeValueUnquoted(e) {
    switch (e) {
      case _.SPACE:
      case _.LINE_FEED:
      case _.TABULATION:
      case _.FORM_FEED: {
        this._leaveAttrValue(), this.state = C.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case _.AMPERSAND: {
        this.returnState = C.ATTRIBUTE_VALUE_UNQUOTED, this.state = C.CHARACTER_REFERENCE;
        break;
      }
      case _.GREATER_THAN_SIGN: {
        this._leaveAttrValue(), this.state = C.DATA, this.emitCurrentTagToken();
        break;
      }
      case _.NULL: {
        this._err(j.unexpectedNullCharacter), this.currentAttr.value += me;
        break;
      }
      case _.QUOTATION_MARK:
      case _.APOSTROPHE:
      case _.LESS_THAN_SIGN:
      case _.EQUALS_SIGN:
      case _.GRAVE_ACCENT: {
        this._err(j.unexpectedCharacterInUnquotedAttributeValue), this.currentAttr.value += String.fromCodePoint(e);
        break;
      }
      case _.EOF: {
        this._err(j.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this.currentAttr.value += String.fromCodePoint(e);
    }
  }
  // After attribute value (quoted) state
  //------------------------------------------------------------------
  _stateAfterAttributeValueQuoted(e) {
    switch (e) {
      case _.SPACE:
      case _.LINE_FEED:
      case _.TABULATION:
      case _.FORM_FEED: {
        this._leaveAttrValue(), this.state = C.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case _.SOLIDUS: {
        this._leaveAttrValue(), this.state = C.SELF_CLOSING_START_TAG;
        break;
      }
      case _.GREATER_THAN_SIGN: {
        this._leaveAttrValue(), this.state = C.DATA, this.emitCurrentTagToken();
        break;
      }
      case _.EOF: {
        this._err(j.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._err(j.missingWhitespaceBetweenAttributes), this.state = C.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(e);
    }
  }
  // Self-closing start tag state
  //------------------------------------------------------------------
  _stateSelfClosingStartTag(e) {
    switch (e) {
      case _.GREATER_THAN_SIGN: {
        const n = this.currentToken;
        n.selfClosing = !0, this.state = C.DATA, this.emitCurrentTagToken();
        break;
      }
      case _.EOF: {
        this._err(j.eofInTag), this._emitEOFToken();
        break;
      }
      default:
        this._err(j.unexpectedSolidusInTag), this.state = C.BEFORE_ATTRIBUTE_NAME, this._stateBeforeAttributeName(e);
    }
  }
  // Bogus comment state
  //------------------------------------------------------------------
  _stateBogusComment(e) {
    const n = this.currentToken;
    switch (e) {
      case _.GREATER_THAN_SIGN: {
        this.state = C.DATA, this.emitCurrentComment(n);
        break;
      }
      case _.EOF: {
        this.emitCurrentComment(n), this._emitEOFToken();
        break;
      }
      case _.NULL: {
        this._err(j.unexpectedNullCharacter), n.data += me;
        break;
      }
      default:
        n.data += String.fromCodePoint(e);
    }
  }
  // Markup declaration open state
  //------------------------------------------------------------------
  _stateMarkupDeclarationOpen(e) {
    this._consumeSequenceIfMatch(Dn.DASH_DASH, !0) ? (this._createCommentToken(Dn.DASH_DASH.length + 1), this.state = C.COMMENT_START) : this._consumeSequenceIfMatch(Dn.DOCTYPE, !1) ? (this.currentLocation = this.getCurrentLocation(Dn.DOCTYPE.length + 1), this.state = C.DOCTYPE) : this._consumeSequenceIfMatch(Dn.CDATA_START, !0) ? this.inForeignNode ? this.state = C.CDATA_SECTION : (this._err(j.cdataInHtmlContent), this._createCommentToken(Dn.CDATA_START.length + 1), this.currentToken.data = "[CDATA[", this.state = C.BOGUS_COMMENT) : this._ensureHibernation() || (this._err(j.incorrectlyOpenedComment), this._createCommentToken(2), this.state = C.BOGUS_COMMENT, this._stateBogusComment(e));
  }
  // Comment start state
  //------------------------------------------------------------------
  _stateCommentStart(e) {
    switch (e) {
      case _.HYPHEN_MINUS: {
        this.state = C.COMMENT_START_DASH;
        break;
      }
      case _.GREATER_THAN_SIGN: {
        this._err(j.abruptClosingOfEmptyComment), this.state = C.DATA;
        const n = this.currentToken;
        this.emitCurrentComment(n);
        break;
      }
      default:
        this.state = C.COMMENT, this._stateComment(e);
    }
  }
  // Comment start dash state
  //------------------------------------------------------------------
  _stateCommentStartDash(e) {
    const n = this.currentToken;
    switch (e) {
      case _.HYPHEN_MINUS: {
        this.state = C.COMMENT_END;
        break;
      }
      case _.GREATER_THAN_SIGN: {
        this._err(j.abruptClosingOfEmptyComment), this.state = C.DATA, this.emitCurrentComment(n);
        break;
      }
      case _.EOF: {
        this._err(j.eofInComment), this.emitCurrentComment(n), this._emitEOFToken();
        break;
      }
      default:
        n.data += "-", this.state = C.COMMENT, this._stateComment(e);
    }
  }
  // Comment state
  //------------------------------------------------------------------
  _stateComment(e) {
    const n = this.currentToken;
    switch (e) {
      case _.HYPHEN_MINUS: {
        this.state = C.COMMENT_END_DASH;
        break;
      }
      case _.LESS_THAN_SIGN: {
        n.data += "<", this.state = C.COMMENT_LESS_THAN_SIGN;
        break;
      }
      case _.NULL: {
        this._err(j.unexpectedNullCharacter), n.data += me;
        break;
      }
      case _.EOF: {
        this._err(j.eofInComment), this.emitCurrentComment(n), this._emitEOFToken();
        break;
      }
      default:
        n.data += String.fromCodePoint(e);
    }
  }
  // Comment less-than sign state
  //------------------------------------------------------------------
  _stateCommentLessThanSign(e) {
    const n = this.currentToken;
    switch (e) {
      case _.EXCLAMATION_MARK: {
        n.data += "!", this.state = C.COMMENT_LESS_THAN_SIGN_BANG;
        break;
      }
      case _.LESS_THAN_SIGN: {
        n.data += "<";
        break;
      }
      default:
        this.state = C.COMMENT, this._stateComment(e);
    }
  }
  // Comment less-than sign bang state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBang(e) {
    e === _.HYPHEN_MINUS ? this.state = C.COMMENT_LESS_THAN_SIGN_BANG_DASH : (this.state = C.COMMENT, this._stateComment(e));
  }
  // Comment less-than sign bang dash state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBangDash(e) {
    e === _.HYPHEN_MINUS ? this.state = C.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH : (this.state = C.COMMENT_END_DASH, this._stateCommentEndDash(e));
  }
  // Comment less-than sign bang dash dash state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBangDashDash(e) {
    e !== _.GREATER_THAN_SIGN && e !== _.EOF && this._err(j.nestedComment), this.state = C.COMMENT_END, this._stateCommentEnd(e);
  }
  // Comment end dash state
  //------------------------------------------------------------------
  _stateCommentEndDash(e) {
    const n = this.currentToken;
    switch (e) {
      case _.HYPHEN_MINUS: {
        this.state = C.COMMENT_END;
        break;
      }
      case _.EOF: {
        this._err(j.eofInComment), this.emitCurrentComment(n), this._emitEOFToken();
        break;
      }
      default:
        n.data += "-", this.state = C.COMMENT, this._stateComment(e);
    }
  }
  // Comment end state
  //------------------------------------------------------------------
  _stateCommentEnd(e) {
    const n = this.currentToken;
    switch (e) {
      case _.GREATER_THAN_SIGN: {
        this.state = C.DATA, this.emitCurrentComment(n);
        break;
      }
      case _.EXCLAMATION_MARK: {
        this.state = C.COMMENT_END_BANG;
        break;
      }
      case _.HYPHEN_MINUS: {
        n.data += "-";
        break;
      }
      case _.EOF: {
        this._err(j.eofInComment), this.emitCurrentComment(n), this._emitEOFToken();
        break;
      }
      default:
        n.data += "--", this.state = C.COMMENT, this._stateComment(e);
    }
  }
  // Comment end bang state
  //------------------------------------------------------------------
  _stateCommentEndBang(e) {
    const n = this.currentToken;
    switch (e) {
      case _.HYPHEN_MINUS: {
        n.data += "--!", this.state = C.COMMENT_END_DASH;
        break;
      }
      case _.GREATER_THAN_SIGN: {
        this._err(j.incorrectlyClosedComment), this.state = C.DATA, this.emitCurrentComment(n);
        break;
      }
      case _.EOF: {
        this._err(j.eofInComment), this.emitCurrentComment(n), this._emitEOFToken();
        break;
      }
      default:
        n.data += "--!", this.state = C.COMMENT, this._stateComment(e);
    }
  }
  // DOCTYPE state
  //------------------------------------------------------------------
  _stateDoctype(e) {
    switch (e) {
      case _.SPACE:
      case _.LINE_FEED:
      case _.TABULATION:
      case _.FORM_FEED: {
        this.state = C.BEFORE_DOCTYPE_NAME;
        break;
      }
      case _.GREATER_THAN_SIGN: {
        this.state = C.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(e);
        break;
      }
      case _.EOF: {
        this._err(j.eofInDoctype), this._createDoctypeToken(null);
        const n = this.currentToken;
        n.forceQuirks = !0, this.emitCurrentDoctype(n), this._emitEOFToken();
        break;
      }
      default:
        this._err(j.missingWhitespaceBeforeDoctypeName), this.state = C.BEFORE_DOCTYPE_NAME, this._stateBeforeDoctypeName(e);
    }
  }
  // Before DOCTYPE name state
  //------------------------------------------------------------------
  _stateBeforeDoctypeName(e) {
    if (Js(e))
      this._createDoctypeToken(String.fromCharCode(ki(e))), this.state = C.DOCTYPE_NAME;
    else
      switch (e) {
        case _.SPACE:
        case _.LINE_FEED:
        case _.TABULATION:
        case _.FORM_FEED:
          break;
        case _.NULL: {
          this._err(j.unexpectedNullCharacter), this._createDoctypeToken(me), this.state = C.DOCTYPE_NAME;
          break;
        }
        case _.GREATER_THAN_SIGN: {
          this._err(j.missingDoctypeName), this._createDoctypeToken(null);
          const n = this.currentToken;
          n.forceQuirks = !0, this.emitCurrentDoctype(n), this.state = C.DATA;
          break;
        }
        case _.EOF: {
          this._err(j.eofInDoctype), this._createDoctypeToken(null);
          const n = this.currentToken;
          n.forceQuirks = !0, this.emitCurrentDoctype(n), this._emitEOFToken();
          break;
        }
        default:
          this._createDoctypeToken(String.fromCodePoint(e)), this.state = C.DOCTYPE_NAME;
      }
  }
  // DOCTYPE name state
  //------------------------------------------------------------------
  _stateDoctypeName(e) {
    const n = this.currentToken;
    switch (e) {
      case _.SPACE:
      case _.LINE_FEED:
      case _.TABULATION:
      case _.FORM_FEED: {
        this.state = C.AFTER_DOCTYPE_NAME;
        break;
      }
      case _.GREATER_THAN_SIGN: {
        this.state = C.DATA, this.emitCurrentDoctype(n);
        break;
      }
      case _.NULL: {
        this._err(j.unexpectedNullCharacter), n.name += me;
        break;
      }
      case _.EOF: {
        this._err(j.eofInDoctype), n.forceQuirks = !0, this.emitCurrentDoctype(n), this._emitEOFToken();
        break;
      }
      default:
        n.name += String.fromCodePoint(Js(e) ? ki(e) : e);
    }
  }
  // After DOCTYPE name state
  //------------------------------------------------------------------
  _stateAfterDoctypeName(e) {
    const n = this.currentToken;
    switch (e) {
      case _.SPACE:
      case _.LINE_FEED:
      case _.TABULATION:
      case _.FORM_FEED:
        break;
      case _.GREATER_THAN_SIGN: {
        this.state = C.DATA, this.emitCurrentDoctype(n);
        break;
      }
      case _.EOF: {
        this._err(j.eofInDoctype), n.forceQuirks = !0, this.emitCurrentDoctype(n), this._emitEOFToken();
        break;
      }
      default:
        this._consumeSequenceIfMatch(Dn.PUBLIC, !1) ? this.state = C.AFTER_DOCTYPE_PUBLIC_KEYWORD : this._consumeSequenceIfMatch(Dn.SYSTEM, !1) ? this.state = C.AFTER_DOCTYPE_SYSTEM_KEYWORD : this._ensureHibernation() || (this._err(j.invalidCharacterSequenceAfterDoctypeName), n.forceQuirks = !0, this.state = C.BOGUS_DOCTYPE, this._stateBogusDoctype(e));
    }
  }
  // After DOCTYPE public keyword state
  //------------------------------------------------------------------
  _stateAfterDoctypePublicKeyword(e) {
    const n = this.currentToken;
    switch (e) {
      case _.SPACE:
      case _.LINE_FEED:
      case _.TABULATION:
      case _.FORM_FEED: {
        this.state = C.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case _.QUOTATION_MARK: {
        this._err(j.missingWhitespaceAfterDoctypePublicKeyword), n.publicId = "", this.state = C.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case _.APOSTROPHE: {
        this._err(j.missingWhitespaceAfterDoctypePublicKeyword), n.publicId = "", this.state = C.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case _.GREATER_THAN_SIGN: {
        this._err(j.missingDoctypePublicIdentifier), n.forceQuirks = !0, this.state = C.DATA, this.emitCurrentDoctype(n);
        break;
      }
      case _.EOF: {
        this._err(j.eofInDoctype), n.forceQuirks = !0, this.emitCurrentDoctype(n), this._emitEOFToken();
        break;
      }
      default:
        this._err(j.missingQuoteBeforeDoctypePublicIdentifier), n.forceQuirks = !0, this.state = C.BOGUS_DOCTYPE, this._stateBogusDoctype(e);
    }
  }
  // Before DOCTYPE public identifier state
  //------------------------------------------------------------------
  _stateBeforeDoctypePublicIdentifier(e) {
    const n = this.currentToken;
    switch (e) {
      case _.SPACE:
      case _.LINE_FEED:
      case _.TABULATION:
      case _.FORM_FEED:
        break;
      case _.QUOTATION_MARK: {
        n.publicId = "", this.state = C.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case _.APOSTROPHE: {
        n.publicId = "", this.state = C.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case _.GREATER_THAN_SIGN: {
        this._err(j.missingDoctypePublicIdentifier), n.forceQuirks = !0, this.state = C.DATA, this.emitCurrentDoctype(n);
        break;
      }
      case _.EOF: {
        this._err(j.eofInDoctype), n.forceQuirks = !0, this.emitCurrentDoctype(n), this._emitEOFToken();
        break;
      }
      default:
        this._err(j.missingQuoteBeforeDoctypePublicIdentifier), n.forceQuirks = !0, this.state = C.BOGUS_DOCTYPE, this._stateBogusDoctype(e);
    }
  }
  // DOCTYPE public identifier (double-quoted) state
  //------------------------------------------------------------------
  _stateDoctypePublicIdentifierDoubleQuoted(e) {
    const n = this.currentToken;
    switch (e) {
      case _.QUOTATION_MARK: {
        this.state = C.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case _.NULL: {
        this._err(j.unexpectedNullCharacter), n.publicId += me;
        break;
      }
      case _.GREATER_THAN_SIGN: {
        this._err(j.abruptDoctypePublicIdentifier), n.forceQuirks = !0, this.emitCurrentDoctype(n), this.state = C.DATA;
        break;
      }
      case _.EOF: {
        this._err(j.eofInDoctype), n.forceQuirks = !0, this.emitCurrentDoctype(n), this._emitEOFToken();
        break;
      }
      default:
        n.publicId += String.fromCodePoint(e);
    }
  }
  // DOCTYPE public identifier (single-quoted) state
  //------------------------------------------------------------------
  _stateDoctypePublicIdentifierSingleQuoted(e) {
    const n = this.currentToken;
    switch (e) {
      case _.APOSTROPHE: {
        this.state = C.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case _.NULL: {
        this._err(j.unexpectedNullCharacter), n.publicId += me;
        break;
      }
      case _.GREATER_THAN_SIGN: {
        this._err(j.abruptDoctypePublicIdentifier), n.forceQuirks = !0, this.emitCurrentDoctype(n), this.state = C.DATA;
        break;
      }
      case _.EOF: {
        this._err(j.eofInDoctype), n.forceQuirks = !0, this.emitCurrentDoctype(n), this._emitEOFToken();
        break;
      }
      default:
        n.publicId += String.fromCodePoint(e);
    }
  }
  // After DOCTYPE public identifier state
  //------------------------------------------------------------------
  _stateAfterDoctypePublicIdentifier(e) {
    const n = this.currentToken;
    switch (e) {
      case _.SPACE:
      case _.LINE_FEED:
      case _.TABULATION:
      case _.FORM_FEED: {
        this.state = C.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
        break;
      }
      case _.GREATER_THAN_SIGN: {
        this.state = C.DATA, this.emitCurrentDoctype(n);
        break;
      }
      case _.QUOTATION_MARK: {
        this._err(j.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), n.systemId = "", this.state = C.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case _.APOSTROPHE: {
        this._err(j.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers), n.systemId = "", this.state = C.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case _.EOF: {
        this._err(j.eofInDoctype), n.forceQuirks = !0, this.emitCurrentDoctype(n), this._emitEOFToken();
        break;
      }
      default:
        this._err(j.missingQuoteBeforeDoctypeSystemIdentifier), n.forceQuirks = !0, this.state = C.BOGUS_DOCTYPE, this._stateBogusDoctype(e);
    }
  }
  // Between DOCTYPE public and system identifiers state
  //------------------------------------------------------------------
  _stateBetweenDoctypePublicAndSystemIdentifiers(e) {
    const n = this.currentToken;
    switch (e) {
      case _.SPACE:
      case _.LINE_FEED:
      case _.TABULATION:
      case _.FORM_FEED:
        break;
      case _.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(n), this.state = C.DATA;
        break;
      }
      case _.QUOTATION_MARK: {
        n.systemId = "", this.state = C.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case _.APOSTROPHE: {
        n.systemId = "", this.state = C.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case _.EOF: {
        this._err(j.eofInDoctype), n.forceQuirks = !0, this.emitCurrentDoctype(n), this._emitEOFToken();
        break;
      }
      default:
        this._err(j.missingQuoteBeforeDoctypeSystemIdentifier), n.forceQuirks = !0, this.state = C.BOGUS_DOCTYPE, this._stateBogusDoctype(e);
    }
  }
  // After DOCTYPE system keyword state
  //------------------------------------------------------------------
  _stateAfterDoctypeSystemKeyword(e) {
    const n = this.currentToken;
    switch (e) {
      case _.SPACE:
      case _.LINE_FEED:
      case _.TABULATION:
      case _.FORM_FEED: {
        this.state = C.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case _.QUOTATION_MARK: {
        this._err(j.missingWhitespaceAfterDoctypeSystemKeyword), n.systemId = "", this.state = C.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case _.APOSTROPHE: {
        this._err(j.missingWhitespaceAfterDoctypeSystemKeyword), n.systemId = "", this.state = C.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case _.GREATER_THAN_SIGN: {
        this._err(j.missingDoctypeSystemIdentifier), n.forceQuirks = !0, this.state = C.DATA, this.emitCurrentDoctype(n);
        break;
      }
      case _.EOF: {
        this._err(j.eofInDoctype), n.forceQuirks = !0, this.emitCurrentDoctype(n), this._emitEOFToken();
        break;
      }
      default:
        this._err(j.missingQuoteBeforeDoctypeSystemIdentifier), n.forceQuirks = !0, this.state = C.BOGUS_DOCTYPE, this._stateBogusDoctype(e);
    }
  }
  // Before DOCTYPE system identifier state
  //------------------------------------------------------------------
  _stateBeforeDoctypeSystemIdentifier(e) {
    const n = this.currentToken;
    switch (e) {
      case _.SPACE:
      case _.LINE_FEED:
      case _.TABULATION:
      case _.FORM_FEED:
        break;
      case _.QUOTATION_MARK: {
        n.systemId = "", this.state = C.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case _.APOSTROPHE: {
        n.systemId = "", this.state = C.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case _.GREATER_THAN_SIGN: {
        this._err(j.missingDoctypeSystemIdentifier), n.forceQuirks = !0, this.state = C.DATA, this.emitCurrentDoctype(n);
        break;
      }
      case _.EOF: {
        this._err(j.eofInDoctype), n.forceQuirks = !0, this.emitCurrentDoctype(n), this._emitEOFToken();
        break;
      }
      default:
        this._err(j.missingQuoteBeforeDoctypeSystemIdentifier), n.forceQuirks = !0, this.state = C.BOGUS_DOCTYPE, this._stateBogusDoctype(e);
    }
  }
  // DOCTYPE system identifier (double-quoted) state
  //------------------------------------------------------------------
  _stateDoctypeSystemIdentifierDoubleQuoted(e) {
    const n = this.currentToken;
    switch (e) {
      case _.QUOTATION_MARK: {
        this.state = C.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case _.NULL: {
        this._err(j.unexpectedNullCharacter), n.systemId += me;
        break;
      }
      case _.GREATER_THAN_SIGN: {
        this._err(j.abruptDoctypeSystemIdentifier), n.forceQuirks = !0, this.emitCurrentDoctype(n), this.state = C.DATA;
        break;
      }
      case _.EOF: {
        this._err(j.eofInDoctype), n.forceQuirks = !0, this.emitCurrentDoctype(n), this._emitEOFToken();
        break;
      }
      default:
        n.systemId += String.fromCodePoint(e);
    }
  }
  // DOCTYPE system identifier (single-quoted) state
  //------------------------------------------------------------------
  _stateDoctypeSystemIdentifierSingleQuoted(e) {
    const n = this.currentToken;
    switch (e) {
      case _.APOSTROPHE: {
        this.state = C.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case _.NULL: {
        this._err(j.unexpectedNullCharacter), n.systemId += me;
        break;
      }
      case _.GREATER_THAN_SIGN: {
        this._err(j.abruptDoctypeSystemIdentifier), n.forceQuirks = !0, this.emitCurrentDoctype(n), this.state = C.DATA;
        break;
      }
      case _.EOF: {
        this._err(j.eofInDoctype), n.forceQuirks = !0, this.emitCurrentDoctype(n), this._emitEOFToken();
        break;
      }
      default:
        n.systemId += String.fromCodePoint(e);
    }
  }
  // After DOCTYPE system identifier state
  //------------------------------------------------------------------
  _stateAfterDoctypeSystemIdentifier(e) {
    const n = this.currentToken;
    switch (e) {
      case _.SPACE:
      case _.LINE_FEED:
      case _.TABULATION:
      case _.FORM_FEED:
        break;
      case _.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(n), this.state = C.DATA;
        break;
      }
      case _.EOF: {
        this._err(j.eofInDoctype), n.forceQuirks = !0, this.emitCurrentDoctype(n), this._emitEOFToken();
        break;
      }
      default:
        this._err(j.unexpectedCharacterAfterDoctypeSystemIdentifier), this.state = C.BOGUS_DOCTYPE, this._stateBogusDoctype(e);
    }
  }
  // Bogus DOCTYPE state
  //------------------------------------------------------------------
  _stateBogusDoctype(e) {
    const n = this.currentToken;
    switch (e) {
      case _.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(n), this.state = C.DATA;
        break;
      }
      case _.NULL: {
        this._err(j.unexpectedNullCharacter);
        break;
      }
      case _.EOF: {
        this.emitCurrentDoctype(n), this._emitEOFToken();
        break;
      }
    }
  }
  // CDATA section state
  //------------------------------------------------------------------
  _stateCdataSection(e) {
    switch (e) {
      case _.RIGHT_SQUARE_BRACKET: {
        this.state = C.CDATA_SECTION_BRACKET;
        break;
      }
      case _.EOF: {
        this._err(j.eofInCdata), this._emitEOFToken();
        break;
      }
      default:
        this._emitCodePoint(e);
    }
  }
  // CDATA section bracket state
  //------------------------------------------------------------------
  _stateCdataSectionBracket(e) {
    e === _.RIGHT_SQUARE_BRACKET ? this.state = C.CDATA_SECTION_END : (this._emitChars("]"), this.state = C.CDATA_SECTION, this._stateCdataSection(e));
  }
  // CDATA section end state
  //------------------------------------------------------------------
  _stateCdataSectionEnd(e) {
    switch (e) {
      case _.GREATER_THAN_SIGN: {
        this.state = C.DATA;
        break;
      }
      case _.RIGHT_SQUARE_BRACKET: {
        this._emitChars("]");
        break;
      }
      default:
        this._emitChars("]]"), this.state = C.CDATA_SECTION, this._stateCdataSection(e);
    }
  }
  // Character reference state
  //------------------------------------------------------------------
  _stateCharacterReference(e) {
    e === _.NUMBER_SIGN ? this.state = C.NUMERIC_CHARACTER_REFERENCE : Du(e) ? (this.state = C.NAMED_CHARACTER_REFERENCE, this._stateNamedCharacterReference(e)) : (this._flushCodePointConsumedAsCharacterReference(_.AMPERSAND), this._reconsumeInState(this.returnState, e));
  }
  // Named character reference state
  //------------------------------------------------------------------
  _stateNamedCharacterReference(e) {
    const n = this._matchNamedCharacterReference(e);
    if (!this._ensureHibernation())
      if (n) {
        for (let r = 0; r < n.length; r++)
          this._flushCodePointConsumedAsCharacterReference(n[r]);
        this.state = this.returnState;
      } else
        this._flushCodePointConsumedAsCharacterReference(_.AMPERSAND), this.state = C.AMBIGUOUS_AMPERSAND;
  }
  // Ambiguos ampersand state
  //------------------------------------------------------------------
  _stateAmbiguousAmpersand(e) {
    Du(e) ? this._flushCodePointConsumedAsCharacterReference(e) : (e === _.SEMICOLON && this._err(j.unknownNamedCharacterReference), this._reconsumeInState(this.returnState, e));
  }
  // Numeric character reference state
  //------------------------------------------------------------------
  _stateNumericCharacterReference(e) {
    this.charRefCode = 0, e === _.LATIN_SMALL_X || e === _.LATIN_CAPITAL_X ? this.state = C.HEXADEMICAL_CHARACTER_REFERENCE_START : ri(e) ? (this.state = C.DECIMAL_CHARACTER_REFERENCE, this._stateDecimalCharacterReference(e)) : (this._err(j.absenceOfDigitsInNumericCharacterReference), this._flushCodePointConsumedAsCharacterReference(_.AMPERSAND), this._flushCodePointConsumedAsCharacterReference(_.NUMBER_SIGN), this._reconsumeInState(this.returnState, e));
  }
  // Hexademical character reference start state
  //------------------------------------------------------------------
  _stateHexademicalCharacterReferenceStart(e) {
    GE(e) ? (this.state = C.HEXADEMICAL_CHARACTER_REFERENCE, this._stateHexademicalCharacterReference(e)) : (this._err(j.absenceOfDigitsInNumericCharacterReference), this._flushCodePointConsumedAsCharacterReference(_.AMPERSAND), this._flushCodePointConsumedAsCharacterReference(_.NUMBER_SIGN), this._unconsume(2), this.state = this.returnState);
  }
  // Hexademical character reference state
  //------------------------------------------------------------------
  _stateHexademicalCharacterReference(e) {
    jl(e) ? this.charRefCode = this.charRefCode * 16 + e - 55 : Wl(e) ? this.charRefCode = this.charRefCode * 16 + e - 87 : ri(e) ? this.charRefCode = this.charRefCode * 16 + e - 48 : e === _.SEMICOLON ? this.state = C.NUMERIC_CHARACTER_REFERENCE_END : (this._err(j.missingSemicolonAfterCharacterReference), this.state = C.NUMERIC_CHARACTER_REFERENCE_END, this._stateNumericCharacterReferenceEnd(e));
  }
  // Decimal character reference state
  //------------------------------------------------------------------
  _stateDecimalCharacterReference(e) {
    ri(e) ? this.charRefCode = this.charRefCode * 10 + e - 48 : e === _.SEMICOLON ? this.state = C.NUMERIC_CHARACTER_REFERENCE_END : (this._err(j.missingSemicolonAfterCharacterReference), this.state = C.NUMERIC_CHARACTER_REFERENCE_END, this._stateNumericCharacterReferenceEnd(e));
  }
  // Numeric character reference end state
  //------------------------------------------------------------------
  _stateNumericCharacterReferenceEnd(e) {
    if (this.charRefCode === _.NULL)
      this._err(j.nullCharacterReference), this.charRefCode = _.REPLACEMENT_CHARACTER;
    else if (this.charRefCode > 1114111)
      this._err(j.characterReferenceOutsideUnicodeRange), this.charRefCode = _.REPLACEMENT_CHARACTER;
    else if (ql(this.charRefCode))
      this._err(j.surrogateCharacterReference), this.charRefCode = _.REPLACEMENT_CHARACTER;
    else if (Gl(this.charRefCode))
      this._err(j.noncharacterCharacterReference);
    else if ($l(this.charRefCode) || this.charRefCode === _.CARRIAGE_RETURN) {
      this._err(j.controlCharacterReference);
      const n = qE.get(this.charRefCode);
      n !== void 0 && (this.charRefCode = n);
    }
    this._flushCodePointConsumedAsCharacterReference(this.charRefCode), this._reconsumeInState(this.returnState, e);
  }
};
const Kl = /* @__PURE__ */ new Set([f.DD, f.DT, f.LI, f.OPTGROUP, f.OPTION, f.P, f.RB, f.RP, f.RT, f.RTC]), xc = /* @__PURE__ */ new Set([
  ...Kl,
  f.CAPTION,
  f.COLGROUP,
  f.TBODY,
  f.TD,
  f.TFOOT,
  f.TH,
  f.THEAD,
  f.TR
]), Ui = /* @__PURE__ */ new Map([
  [f.APPLET, K.HTML],
  [f.CAPTION, K.HTML],
  [f.HTML, K.HTML],
  [f.MARQUEE, K.HTML],
  [f.OBJECT, K.HTML],
  [f.TABLE, K.HTML],
  [f.TD, K.HTML],
  [f.TEMPLATE, K.HTML],
  [f.TH, K.HTML],
  [f.ANNOTATION_XML, K.MATHML],
  [f.MI, K.MATHML],
  [f.MN, K.MATHML],
  [f.MO, K.MATHML],
  [f.MS, K.MATHML],
  [f.MTEXT, K.MATHML],
  [f.DESC, K.SVG],
  [f.FOREIGN_OBJECT, K.SVG],
  [f.TITLE, K.SVG]
]), jE = [f.H1, f.H2, f.H3, f.H4, f.H5, f.H6], WE = [f.TR, f.TEMPLATE, f.HTML], QE = [f.TBODY, f.TFOOT, f.THEAD, f.TEMPLATE, f.HTML], KE = [f.TABLE, f.TEMPLATE, f.HTML], XE = [f.TD, f.TH];
class zE {
  get currentTmplContentOrNode() {
    return this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : this.current;
  }
  constructor(e, n, r) {
    this.treeAdapter = n, this.handler = r, this.items = [], this.tagIDs = [], this.stackTop = -1, this.tmplCount = 0, this.currentTagId = f.UNKNOWN, this.current = e;
  }
  //Index of element
  _indexOf(e) {
    return this.items.lastIndexOf(e, this.stackTop);
  }
  //Update current element
  _isInTemplate() {
    return this.currentTagId === f.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === K.HTML;
  }
  _updateCurrentElement() {
    this.current = this.items[this.stackTop], this.currentTagId = this.tagIDs[this.stackTop];
  }
  //Mutations
  push(e, n) {
    this.stackTop++, this.items[this.stackTop] = e, this.current = e, this.tagIDs[this.stackTop] = n, this.currentTagId = n, this._isInTemplate() && this.tmplCount++, this.handler.onItemPush(e, n, !0);
  }
  pop() {
    const e = this.current;
    this.tmplCount > 0 && this._isInTemplate() && this.tmplCount--, this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(e, !0);
  }
  replace(e, n) {
    const r = this._indexOf(e);
    this.items[r] = n, r === this.stackTop && (this.current = n);
  }
  insertAfter(e, n, r) {
    const a = this._indexOf(e) + 1;
    this.items.splice(a, 0, n), this.tagIDs.splice(a, 0, r), this.stackTop++, a === this.stackTop && this._updateCurrentElement(), this.handler.onItemPush(this.current, this.currentTagId, a === this.stackTop);
  }
  popUntilTagNamePopped(e) {
    let n = this.stackTop + 1;
    do
      n = this.tagIDs.lastIndexOf(e, n - 1);
    while (n > 0 && this.treeAdapter.getNamespaceURI(this.items[n]) !== K.HTML);
    this.shortenToLength(n < 0 ? 0 : n);
  }
  shortenToLength(e) {
    for (; this.stackTop >= e; ) {
      const n = this.current;
      this.tmplCount > 0 && this._isInTemplate() && (this.tmplCount -= 1), this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(n, this.stackTop < e);
    }
  }
  popUntilElementPopped(e) {
    const n = this._indexOf(e);
    this.shortenToLength(n < 0 ? 0 : n);
  }
  popUntilPopped(e, n) {
    const r = this._indexOfTagNames(e, n);
    this.shortenToLength(r < 0 ? 0 : r);
  }
  popUntilNumberedHeaderPopped() {
    this.popUntilPopped(jE, K.HTML);
  }
  popUntilTableCellPopped() {
    this.popUntilPopped(XE, K.HTML);
  }
  popAllUpToHtmlElement() {
    this.tmplCount = 0, this.shortenToLength(1);
  }
  _indexOfTagNames(e, n) {
    for (let r = this.stackTop; r >= 0; r--)
      if (e.includes(this.tagIDs[r]) && this.treeAdapter.getNamespaceURI(this.items[r]) === n)
        return r;
    return -1;
  }
  clearBackTo(e, n) {
    const r = this._indexOfTagNames(e, n);
    this.shortenToLength(r + 1);
  }
  clearBackToTableContext() {
    this.clearBackTo(KE, K.HTML);
  }
  clearBackToTableBodyContext() {
    this.clearBackTo(QE, K.HTML);
  }
  clearBackToTableRowContext() {
    this.clearBackTo(WE, K.HTML);
  }
  remove(e) {
    const n = this._indexOf(e);
    n >= 0 && (n === this.stackTop ? this.pop() : (this.items.splice(n, 1), this.tagIDs.splice(n, 1), this.stackTop--, this._updateCurrentElement(), this.handler.onItemPop(e, !1)));
  }
  //Search
  tryPeekProperlyNestedBodyElement() {
    return this.stackTop >= 1 && this.tagIDs[1] === f.BODY ? this.items[1] : null;
  }
  contains(e) {
    return this._indexOf(e) > -1;
  }
  getCommonAncestor(e) {
    const n = this._indexOf(e) - 1;
    return n >= 0 ? this.items[n] : null;
  }
  isRootHtmlElementCurrent() {
    return this.stackTop === 0 && this.tagIDs[0] === f.HTML;
  }
  //Element in scope
  hasInScope(e) {
    for (let n = this.stackTop; n >= 0; n--) {
      const r = this.tagIDs[n], a = this.treeAdapter.getNamespaceURI(this.items[n]);
      if (r === e && a === K.HTML)
        return !0;
      if (Ui.get(r) === a)
        return !1;
    }
    return !0;
  }
  hasNumberedHeaderInScope() {
    for (let e = this.stackTop; e >= 0; e--) {
      const n = this.tagIDs[e], r = this.treeAdapter.getNamespaceURI(this.items[e]);
      if (Vl(n) && r === K.HTML)
        return !0;
      if (Ui.get(n) === r)
        return !1;
    }
    return !0;
  }
  hasInListItemScope(e) {
    for (let n = this.stackTop; n >= 0; n--) {
      const r = this.tagIDs[n], a = this.treeAdapter.getNamespaceURI(this.items[n]);
      if (r === e && a === K.HTML)
        return !0;
      if ((r === f.UL || r === f.OL) && a === K.HTML || Ui.get(r) === a)
        return !1;
    }
    return !0;
  }
  hasInButtonScope(e) {
    for (let n = this.stackTop; n >= 0; n--) {
      const r = this.tagIDs[n], a = this.treeAdapter.getNamespaceURI(this.items[n]);
      if (r === e && a === K.HTML)
        return !0;
      if (r === f.BUTTON && a === K.HTML || Ui.get(r) === a)
        return !1;
    }
    return !0;
  }
  hasInTableScope(e) {
    for (let n = this.stackTop; n >= 0; n--) {
      const r = this.tagIDs[n];
      if (this.treeAdapter.getNamespaceURI(this.items[n]) === K.HTML) {
        if (r === e)
          return !0;
        if (r === f.TABLE || r === f.TEMPLATE || r === f.HTML)
          return !1;
      }
    }
    return !0;
  }
  hasTableBodyContextInTableScope() {
    for (let e = this.stackTop; e >= 0; e--) {
      const n = this.tagIDs[e];
      if (this.treeAdapter.getNamespaceURI(this.items[e]) === K.HTML) {
        if (n === f.TBODY || n === f.THEAD || n === f.TFOOT)
          return !0;
        if (n === f.TABLE || n === f.HTML)
          return !1;
      }
    }
    return !0;
  }
  hasInSelectScope(e) {
    for (let n = this.stackTop; n >= 0; n--) {
      const r = this.tagIDs[n];
      if (this.treeAdapter.getNamespaceURI(this.items[n]) === K.HTML) {
        if (r === e)
          return !0;
        if (r !== f.OPTION && r !== f.OPTGROUP)
          return !1;
      }
    }
    return !0;
  }
  //Implied end tags
  generateImpliedEndTags() {
    for (; Kl.has(this.currentTagId); )
      this.pop();
  }
  generateImpliedEndTagsThoroughly() {
    for (; xc.has(this.currentTagId); )
      this.pop();
  }
  generateImpliedEndTagsWithExclusion(e) {
    for (; this.currentTagId !== e && xc.has(this.currentTagId); )
      this.pop();
  }
}
const nu = 3;
var Rr;
(function(t) {
  t[t.Marker = 0] = "Marker", t[t.Element = 1] = "Element";
})(Rr = Rr || (Rr = {}));
const Rc = { type: Rr.Marker };
class JE {
  constructor(e) {
    this.treeAdapter = e, this.entries = [], this.bookmark = null;
  }
  //Noah Ark's condition
  //OPTIMIZATION: at first we try to find possible candidates for exclusion using
  //lightweight heuristics without thorough attributes check.
  _getNoahArkConditionCandidates(e, n) {
    const r = [], a = n.length, u = this.treeAdapter.getTagName(e), o = this.treeAdapter.getNamespaceURI(e);
    for (let h = 0; h < this.entries.length; h++) {
      const m = this.entries[h];
      if (m.type === Rr.Marker)
        break;
      const { element: E } = m;
      if (this.treeAdapter.getTagName(E) === u && this.treeAdapter.getNamespaceURI(E) === o) {
        const p = this.treeAdapter.getAttrList(E);
        p.length === a && r.push({ idx: h, attrs: p });
      }
    }
    return r;
  }
  _ensureNoahArkCondition(e) {
    if (this.entries.length < nu)
      return;
    const n = this.treeAdapter.getAttrList(e), r = this._getNoahArkConditionCandidates(e, n);
    if (r.length < nu)
      return;
    const a = new Map(n.map((o) => [o.name, o.value]));
    let u = 0;
    for (let o = 0; o < r.length; o++) {
      const h = r[o];
      h.attrs.every((m) => a.get(m.name) === m.value) && (u += 1, u >= nu && this.entries.splice(h.idx, 1));
    }
  }
  //Mutations
  insertMarker() {
    this.entries.unshift(Rc);
  }
  pushElement(e, n) {
    this._ensureNoahArkCondition(e), this.entries.unshift({
      type: Rr.Element,
      element: e,
      token: n
    });
  }
  insertElementAfterBookmark(e, n) {
    const r = this.entries.indexOf(this.bookmark);
    this.entries.splice(r, 0, {
      type: Rr.Element,
      element: e,
      token: n
    });
  }
  removeEntry(e) {
    const n = this.entries.indexOf(e);
    n >= 0 && this.entries.splice(n, 1);
  }
  /**
   * Clears the list of formatting elements up to the last marker.
   *
   * @see https://html.spec.whatwg.org/multipage/parsing.html#clear-the-list-of-active-formatting-elements-up-to-the-last-marker
   */
  clearToLastMarker() {
    const e = this.entries.indexOf(Rc);
    e >= 0 ? this.entries.splice(0, e + 1) : this.entries.length = 0;
  }
  //Search
  getElementEntryInScopeWithTagName(e) {
    const n = this.entries.find((r) => r.type === Rr.Marker || this.treeAdapter.getTagName(r.element) === e);
    return n && n.type === Rr.Element ? n : null;
  }
  getElementEntry(e) {
    return this.entries.find((n) => n.type === Rr.Element && n.element === e);
  }
}
function Lc(t) {
  return {
    nodeName: "#text",
    value: t,
    parentNode: null
  };
}
const ps = {
  //Node construction
  createDocument() {
    return {
      nodeName: "#document",
      mode: Fn.NO_QUIRKS,
      childNodes: []
    };
  },
  createDocumentFragment() {
    return {
      nodeName: "#document-fragment",
      childNodes: []
    };
  },
  createElement(t, e, n) {
    return {
      nodeName: t,
      tagName: t,
      attrs: n,
      namespaceURI: e,
      childNodes: [],
      parentNode: null
    };
  },
  createCommentNode(t) {
    return {
      nodeName: "#comment",
      data: t,
      parentNode: null
    };
  },
  //Tree mutation
  appendChild(t, e) {
    t.childNodes.push(e), e.parentNode = t;
  },
  insertBefore(t, e, n) {
    const r = t.childNodes.indexOf(n);
    t.childNodes.splice(r, 0, e), e.parentNode = t;
  },
  setTemplateContent(t, e) {
    t.content = e;
  },
  getTemplateContent(t) {
    return t.content;
  },
  setDocumentType(t, e, n, r) {
    const a = t.childNodes.find((u) => u.nodeName === "#documentType");
    if (a)
      a.name = e, a.publicId = n, a.systemId = r;
    else {
      const u = {
        nodeName: "#documentType",
        name: e,
        publicId: n,
        systemId: r,
        parentNode: null
      };
      ps.appendChild(t, u);
    }
  },
  setDocumentMode(t, e) {
    t.mode = e;
  },
  getDocumentMode(t) {
    return t.mode;
  },
  detachNode(t) {
    if (t.parentNode) {
      const e = t.parentNode.childNodes.indexOf(t);
      t.parentNode.childNodes.splice(e, 1), t.parentNode = null;
    }
  },
  insertText(t, e) {
    if (t.childNodes.length > 0) {
      const n = t.childNodes[t.childNodes.length - 1];
      if (ps.isTextNode(n)) {
        n.value += e;
        return;
      }
    }
    ps.appendChild(t, Lc(e));
  },
  insertTextBefore(t, e, n) {
    const r = t.childNodes[t.childNodes.indexOf(n) - 1];
    r && ps.isTextNode(r) ? r.value += e : ps.insertBefore(t, Lc(e), n);
  },
  adoptAttributes(t, e) {
    const n = new Set(t.attrs.map((r) => r.name));
    for (let r = 0; r < e.length; r++)
      n.has(e[r].name) || t.attrs.push(e[r]);
  },
  //Tree traversing
  getFirstChild(t) {
    return t.childNodes[0];
  },
  getChildNodes(t) {
    return t.childNodes;
  },
  getParentNode(t) {
    return t.parentNode;
  },
  getAttrList(t) {
    return t.attrs;
  },
  //Node data
  getTagName(t) {
    return t.tagName;
  },
  getNamespaceURI(t) {
    return t.namespaceURI;
  },
  getTextNodeContent(t) {
    return t.value;
  },
  getCommentNodeContent(t) {
    return t.data;
  },
  getDocumentTypeNodeName(t) {
    return t.name;
  },
  getDocumentTypeNodePublicId(t) {
    return t.publicId;
  },
  getDocumentTypeNodeSystemId(t) {
    return t.systemId;
  },
  //Node types
  isTextNode(t) {
    return t.nodeName === "#text";
  },
  isCommentNode(t) {
    return t.nodeName === "#comment";
  },
  isDocumentTypeNode(t) {
    return t.nodeName === "#documentType";
  },
  isElementNode(t) {
    return Object.prototype.hasOwnProperty.call(t, "tagName");
  },
  // Source code location
  setNodeSourceCodeLocation(t, e) {
    t.sourceCodeLocation = e;
  },
  getNodeSourceCodeLocation(t) {
    return t.sourceCodeLocation;
  },
  updateNodeSourceCodeLocation(t, e) {
    t.sourceCodeLocation = { ...t.sourceCodeLocation, ...e };
  }
}, Xl = "html", ZE = "about:legacy-compat", tm = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd", zl = [
  "+//silmaril//dtd html pro v0r11 19970101//",
  "-//as//dtd html 3.0 aswedit + extensions//",
  "-//advasoft ltd//dtd html 3.0 aswedit + extensions//",
  "-//ietf//dtd html 2.0 level 1//",
  "-//ietf//dtd html 2.0 level 2//",
  "-//ietf//dtd html 2.0 strict level 1//",
  "-//ietf//dtd html 2.0 strict level 2//",
  "-//ietf//dtd html 2.0 strict//",
  "-//ietf//dtd html 2.0//",
  "-//ietf//dtd html 2.1e//",
  "-//ietf//dtd html 3.0//",
  "-//ietf//dtd html 3.2 final//",
  "-//ietf//dtd html 3.2//",
  "-//ietf//dtd html 3//",
  "-//ietf//dtd html level 0//",
  "-//ietf//dtd html level 1//",
  "-//ietf//dtd html level 2//",
  "-//ietf//dtd html level 3//",
  "-//ietf//dtd html strict level 0//",
  "-//ietf//dtd html strict level 1//",
  "-//ietf//dtd html strict level 2//",
  "-//ietf//dtd html strict level 3//",
  "-//ietf//dtd html strict//",
  "-//ietf//dtd html//",
  "-//metrius//dtd metrius presentational//",
  "-//microsoft//dtd internet explorer 2.0 html strict//",
  "-//microsoft//dtd internet explorer 2.0 html//",
  "-//microsoft//dtd internet explorer 2.0 tables//",
  "-//microsoft//dtd internet explorer 3.0 html strict//",
  "-//microsoft//dtd internet explorer 3.0 html//",
  "-//microsoft//dtd internet explorer 3.0 tables//",
  "-//netscape comm. corp.//dtd html//",
  "-//netscape comm. corp.//dtd strict html//",
  "-//o'reilly and associates//dtd html 2.0//",
  "-//o'reilly and associates//dtd html extended 1.0//",
  "-//o'reilly and associates//dtd html extended relaxed 1.0//",
  "-//sq//dtd html 2.0 hotmetal + extensions//",
  "-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//",
  "-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//",
  "-//spyglass//dtd html 2.0 extended//",
  "-//sun microsystems corp.//dtd hotjava html//",
  "-//sun microsystems corp.//dtd hotjava strict html//",
  "-//w3c//dtd html 3 1995-03-24//",
  "-//w3c//dtd html 3.2 draft//",
  "-//w3c//dtd html 3.2 final//",
  "-//w3c//dtd html 3.2//",
  "-//w3c//dtd html 3.2s draft//",
  "-//w3c//dtd html 4.0 frameset//",
  "-//w3c//dtd html 4.0 transitional//",
  "-//w3c//dtd html experimental 19960712//",
  "-//w3c//dtd html experimental 970421//",
  "-//w3c//dtd w3 html//",
  "-//w3o//dtd w3 html 3.0//",
  "-//webtechs//dtd mozilla html 2.0//",
  "-//webtechs//dtd mozilla html//"
], em = [
  ...zl,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
], nm = /* @__PURE__ */ new Set([
  "-//w3o//dtd w3 html strict 3.0//en//",
  "-/w3c/dtd html 4.0 transitional/en",
  "html"
]), Jl = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"], rm = [
  ...Jl,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
];
function Oc(t, e) {
  return e.some((n) => t.startsWith(n));
}
function sm(t) {
  return t.name === Xl && t.publicId === null && (t.systemId === null || t.systemId === ZE);
}
function im(t) {
  if (t.name !== Xl)
    return Fn.QUIRKS;
  const { systemId: e } = t;
  if (e && e.toLowerCase() === tm)
    return Fn.QUIRKS;
  let { publicId: n } = t;
  if (n !== null) {
    if (n = n.toLowerCase(), nm.has(n))
      return Fn.QUIRKS;
    let r = e === null ? em : zl;
    if (Oc(n, r))
      return Fn.QUIRKS;
    if (r = e === null ? Jl : rm, Oc(n, r))
      return Fn.LIMITED_QUIRKS;
  }
  return Fn.NO_QUIRKS;
}
const wc = {
  TEXT_HTML: "text/html",
  APPLICATION_XML: "application/xhtml+xml"
}, am = "definitionurl", um = "definitionURL", om = new Map([
  "attributeName",
  "attributeType",
  "baseFrequency",
  "baseProfile",
  "calcMode",
  "clipPathUnits",
  "diffuseConstant",
  "edgeMode",
  "filterUnits",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "kernelMatrix",
  "kernelUnitLength",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "limitingConeAngle",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  "maskContentUnits",
  "maskUnits",
  "numOctaves",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "refX",
  "refY",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "specularConstant",
  "specularExponent",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stitchTiles",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textLength",
  "viewBox",
  "viewTarget",
  "xChannelSelector",
  "yChannelSelector",
  "zoomAndPan"
].map((t) => [t.toLowerCase(), t])), cm = /* @__PURE__ */ new Map([
  ["xlink:actuate", { prefix: "xlink", name: "actuate", namespace: K.XLINK }],
  ["xlink:arcrole", { prefix: "xlink", name: "arcrole", namespace: K.XLINK }],
  ["xlink:href", { prefix: "xlink", name: "href", namespace: K.XLINK }],
  ["xlink:role", { prefix: "xlink", name: "role", namespace: K.XLINK }],
  ["xlink:show", { prefix: "xlink", name: "show", namespace: K.XLINK }],
  ["xlink:title", { prefix: "xlink", name: "title", namespace: K.XLINK }],
  ["xlink:type", { prefix: "xlink", name: "type", namespace: K.XLINK }],
  ["xml:base", { prefix: "xml", name: "base", namespace: K.XML }],
  ["xml:lang", { prefix: "xml", name: "lang", namespace: K.XML }],
  ["xml:space", { prefix: "xml", name: "space", namespace: K.XML }],
  ["xmlns", { prefix: "", name: "xmlns", namespace: K.XMLNS }],
  ["xmlns:xlink", { prefix: "xmlns", name: "xlink", namespace: K.XMLNS }]
]), fm = new Map([
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "glyphRef",
  "linearGradient",
  "radialGradient",
  "textPath"
].map((t) => [t.toLowerCase(), t])), lm = /* @__PURE__ */ new Set([
  f.B,
  f.BIG,
  f.BLOCKQUOTE,
  f.BODY,
  f.BR,
  f.CENTER,
  f.CODE,
  f.DD,
  f.DIV,
  f.DL,
  f.DT,
  f.EM,
  f.EMBED,
  f.H1,
  f.H2,
  f.H3,
  f.H4,
  f.H5,
  f.H6,
  f.HEAD,
  f.HR,
  f.I,
  f.IMG,
  f.LI,
  f.LISTING,
  f.MENU,
  f.META,
  f.NOBR,
  f.OL,
  f.P,
  f.PRE,
  f.RUBY,
  f.S,
  f.SMALL,
  f.SPAN,
  f.STRONG,
  f.STRIKE,
  f.SUB,
  f.SUP,
  f.TABLE,
  f.TT,
  f.U,
  f.UL,
  f.VAR
]);
function hm(t) {
  const e = t.tagID;
  return e === f.FONT && t.attrs.some(({ name: r }) => r === ns.COLOR || r === ns.SIZE || r === ns.FACE) || lm.has(e);
}
function Zl(t) {
  for (let e = 0; e < t.attrs.length; e++)
    if (t.attrs[e].name === am) {
      t.attrs[e].name = um;
      break;
    }
}
function th(t) {
  for (let e = 0; e < t.attrs.length; e++) {
    const n = om.get(t.attrs[e].name);
    n != null && (t.attrs[e].name = n);
  }
}
function ho(t) {
  for (let e = 0; e < t.attrs.length; e++) {
    const n = cm.get(t.attrs[e].name);
    n && (t.attrs[e].prefix = n.prefix, t.attrs[e].name = n.name, t.attrs[e].namespace = n.namespace);
  }
}
function dm(t) {
  const e = fm.get(t.tagName);
  e != null && (t.tagName = e, t.tagID = va(t.tagName));
}
function pm(t, e) {
  return e === K.MATHML && (t === f.MI || t === f.MO || t === f.MN || t === f.MS || t === f.MTEXT);
}
function gm(t, e, n) {
  if (e === K.MATHML && t === f.ANNOTATION_XML) {
    for (let r = 0; r < n.length; r++)
      if (n[r].name === ns.ENCODING) {
        const a = n[r].value.toLowerCase();
        return a === wc.TEXT_HTML || a === wc.APPLICATION_XML;
      }
  }
  return e === K.SVG && (t === f.FOREIGN_OBJECT || t === f.DESC || t === f.TITLE);
}
function Em(t, e, n, r) {
  return (!r || r === K.HTML) && gm(t, e, n) || (!r || r === K.MATHML) && pm(t, e);
}
const mm = "hidden", bm = 8, _m = 3;
var x;
(function(t) {
  t[t.INITIAL = 0] = "INITIAL", t[t.BEFORE_HTML = 1] = "BEFORE_HTML", t[t.BEFORE_HEAD = 2] = "BEFORE_HEAD", t[t.IN_HEAD = 3] = "IN_HEAD", t[t.IN_HEAD_NO_SCRIPT = 4] = "IN_HEAD_NO_SCRIPT", t[t.AFTER_HEAD = 5] = "AFTER_HEAD", t[t.IN_BODY = 6] = "IN_BODY", t[t.TEXT = 7] = "TEXT", t[t.IN_TABLE = 8] = "IN_TABLE", t[t.IN_TABLE_TEXT = 9] = "IN_TABLE_TEXT", t[t.IN_CAPTION = 10] = "IN_CAPTION", t[t.IN_COLUMN_GROUP = 11] = "IN_COLUMN_GROUP", t[t.IN_TABLE_BODY = 12] = "IN_TABLE_BODY", t[t.IN_ROW = 13] = "IN_ROW", t[t.IN_CELL = 14] = "IN_CELL", t[t.IN_SELECT = 15] = "IN_SELECT", t[t.IN_SELECT_IN_TABLE = 16] = "IN_SELECT_IN_TABLE", t[t.IN_TEMPLATE = 17] = "IN_TEMPLATE", t[t.AFTER_BODY = 18] = "AFTER_BODY", t[t.IN_FRAMESET = 19] = "IN_FRAMESET", t[t.AFTER_FRAMESET = 20] = "AFTER_FRAMESET", t[t.AFTER_AFTER_BODY = 21] = "AFTER_AFTER_BODY", t[t.AFTER_AFTER_FRAMESET = 22] = "AFTER_AFTER_FRAMESET";
})(x || (x = {}));
const Tm = {
  startLine: -1,
  startCol: -1,
  startOffset: -1,
  endLine: -1,
  endCol: -1,
  endOffset: -1
}, eh = /* @__PURE__ */ new Set([f.TABLE, f.TBODY, f.TFOOT, f.THEAD, f.TR]), Dc = {
  scriptingEnabled: !0,
  sourceCodeLocationInfo: !1,
  treeAdapter: ps,
  onParseError: null
};
let nh = class {
  constructor(e, n, r = null, a = null) {
    this.fragmentContext = r, this.scriptHandler = a, this.currentToken = null, this.stopped = !1, this.insertionMode = x.INITIAL, this.originalInsertionMode = x.INITIAL, this.headElement = null, this.formElement = null, this.currentNotInHTML = !1, this.tmplInsertionModeStack = [], this.pendingCharacterTokens = [], this.hasNonWhitespacePendingCharacterToken = !1, this.framesetOk = !0, this.skipNextNewLine = !1, this.fosterParentingEnabled = !1, this.options = {
      ...Dc,
      ...e
    }, this.treeAdapter = this.options.treeAdapter, this.onParseError = this.options.onParseError, this.onParseError && (this.options.sourceCodeLocationInfo = !0), this.document = n ?? this.treeAdapter.createDocument(), this.tokenizer = new VE(this.options, this), this.activeFormattingElements = new JE(this.treeAdapter), this.fragmentContextID = r ? va(this.treeAdapter.getTagName(r)) : f.UNKNOWN, this._setContextModes(r ?? this.document, this.fragmentContextID), this.openElements = new zE(this.document, this.treeAdapter, this);
  }
  // API
  static parse(e, n) {
    const r = new this(n);
    return r.tokenizer.write(e, !0), r.document;
  }
  static getFragmentParser(e, n) {
    const r = {
      ...Dc,
      ...n
    };
    e ?? (e = r.treeAdapter.createElement(k.TEMPLATE, K.HTML, []));
    const a = r.treeAdapter.createElement("documentmock", K.HTML, []), u = new this(r, a, e);
    return u.fragmentContextID === f.TEMPLATE && u.tmplInsertionModeStack.unshift(x.IN_TEMPLATE), u._initTokenizerForFragmentParsing(), u._insertFakeRootElement(), u._resetInsertionMode(), u._findFormInFragmentContext(), u;
  }
  getFragment() {
    const e = this.treeAdapter.getFirstChild(this.document), n = this.treeAdapter.createDocumentFragment();
    return this._adoptNodes(e, n), n;
  }
  //Errors
  _err(e, n, r) {
    var a;
    if (!this.onParseError)
      return;
    const u = (a = e.location) !== null && a !== void 0 ? a : Tm, o = {
      code: n,
      startLine: u.startLine,
      startCol: u.startCol,
      startOffset: u.startOffset,
      endLine: r ? u.startLine : u.endLine,
      endCol: r ? u.startCol : u.endCol,
      endOffset: r ? u.startOffset : u.endOffset
    };
    this.onParseError(o);
  }
  //Stack events
  onItemPush(e, n, r) {
    var a, u;
    (u = (a = this.treeAdapter).onItemPush) === null || u === void 0 || u.call(a, e), r && this.openElements.stackTop > 0 && this._setContextModes(e, n);
  }
  onItemPop(e, n) {
    var r, a;
    if (this.options.sourceCodeLocationInfo && this._setEndLocation(e, this.currentToken), (a = (r = this.treeAdapter).onItemPop) === null || a === void 0 || a.call(r, e, this.openElements.current), n) {
      let u, o;
      this.openElements.stackTop === 0 && this.fragmentContext ? (u = this.fragmentContext, o = this.fragmentContextID) : { current: u, currentTagId: o } = this.openElements, this._setContextModes(u, o);
    }
  }
  _setContextModes(e, n) {
    const r = e === this.document || this.treeAdapter.getNamespaceURI(e) === K.HTML;
    this.currentNotInHTML = !r, this.tokenizer.inForeignNode = !r && !this._isIntegrationPoint(n, e);
  }
  _switchToTextParsing(e, n) {
    this._insertElement(e, K.HTML), this.tokenizer.state = n, this.originalInsertionMode = this.insertionMode, this.insertionMode = x.TEXT;
  }
  switchToPlaintextParsing() {
    this.insertionMode = x.TEXT, this.originalInsertionMode = x.IN_BODY, this.tokenizer.state = kn.PLAINTEXT;
  }
  //Fragment parsing
  _getAdjustedCurrentElement() {
    return this.openElements.stackTop === 0 && this.fragmentContext ? this.fragmentContext : this.openElements.current;
  }
  _findFormInFragmentContext() {
    let e = this.fragmentContext;
    for (; e; ) {
      if (this.treeAdapter.getTagName(e) === k.FORM) {
        this.formElement = e;
        break;
      }
      e = this.treeAdapter.getParentNode(e);
    }
  }
  _initTokenizerForFragmentParsing() {
    if (!(!this.fragmentContext || this.treeAdapter.getNamespaceURI(this.fragmentContext) !== K.HTML))
      switch (this.fragmentContextID) {
        case f.TITLE:
        case f.TEXTAREA: {
          this.tokenizer.state = kn.RCDATA;
          break;
        }
        case f.STYLE:
        case f.XMP:
        case f.IFRAME:
        case f.NOEMBED:
        case f.NOFRAMES:
        case f.NOSCRIPT: {
          this.tokenizer.state = kn.RAWTEXT;
          break;
        }
        case f.SCRIPT: {
          this.tokenizer.state = kn.SCRIPT_DATA;
          break;
        }
        case f.PLAINTEXT: {
          this.tokenizer.state = kn.PLAINTEXT;
          break;
        }
      }
  }
  //Tree mutation
  _setDocumentType(e) {
    const n = e.name || "", r = e.publicId || "", a = e.systemId || "";
    if (this.treeAdapter.setDocumentType(this.document, n, r, a), e.location) {
      const o = this.treeAdapter.getChildNodes(this.document).find((h) => this.treeAdapter.isDocumentTypeNode(h));
      o && this.treeAdapter.setNodeSourceCodeLocation(o, e.location);
    }
  }
  _attachElementToTree(e, n) {
    if (this.options.sourceCodeLocationInfo) {
      const r = n && {
        ...n,
        startTag: n
      };
      this.treeAdapter.setNodeSourceCodeLocation(e, r);
    }
    if (this._shouldFosterParentOnInsertion())
      this._fosterParentElement(e);
    else {
      const r = this.openElements.currentTmplContentOrNode;
      this.treeAdapter.appendChild(r, e);
    }
  }
  _appendElement(e, n) {
    const r = this.treeAdapter.createElement(e.tagName, n, e.attrs);
    this._attachElementToTree(r, e.location);
  }
  _insertElement(e, n) {
    const r = this.treeAdapter.createElement(e.tagName, n, e.attrs);
    this._attachElementToTree(r, e.location), this.openElements.push(r, e.tagID);
  }
  _insertFakeElement(e, n) {
    const r = this.treeAdapter.createElement(e, K.HTML, []);
    this._attachElementToTree(r, null), this.openElements.push(r, n);
  }
  _insertTemplate(e) {
    const n = this.treeAdapter.createElement(e.tagName, K.HTML, e.attrs), r = this.treeAdapter.createDocumentFragment();
    this.treeAdapter.setTemplateContent(n, r), this._attachElementToTree(n, e.location), this.openElements.push(n, e.tagID), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(r, null);
  }
  _insertFakeRootElement() {
    const e = this.treeAdapter.createElement(k.HTML, K.HTML, []);
    this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(e, null), this.treeAdapter.appendChild(this.openElements.current, e), this.openElements.push(e, f.HTML);
  }
  _appendCommentNode(e, n) {
    const r = this.treeAdapter.createCommentNode(e.data);
    this.treeAdapter.appendChild(n, r), this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(r, e.location);
  }
  _insertCharacters(e) {
    let n, r;
    if (this._shouldFosterParentOnInsertion() ? ({ parent: n, beforeElement: r } = this._findFosterParentingLocation(), r ? this.treeAdapter.insertTextBefore(n, e.chars, r) : this.treeAdapter.insertText(n, e.chars)) : (n = this.openElements.currentTmplContentOrNode, this.treeAdapter.insertText(n, e.chars)), !e.location)
      return;
    const a = this.treeAdapter.getChildNodes(n), u = r ? a.lastIndexOf(r) : a.length, o = a[u - 1];
    if (this.treeAdapter.getNodeSourceCodeLocation(o)) {
      const { endLine: m, endCol: E, endOffset: p } = e.location;
      this.treeAdapter.updateNodeSourceCodeLocation(o, { endLine: m, endCol: E, endOffset: p });
    } else
      this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(o, e.location);
  }
  _adoptNodes(e, n) {
    for (let r = this.treeAdapter.getFirstChild(e); r; r = this.treeAdapter.getFirstChild(e))
      this.treeAdapter.detachNode(r), this.treeAdapter.appendChild(n, r);
  }
  _setEndLocation(e, n) {
    if (this.treeAdapter.getNodeSourceCodeLocation(e) && n.location) {
      const r = n.location, a = this.treeAdapter.getTagName(e), u = (
        // NOTE: For cases like <p> <p> </p> - First 'p' closes without a closing
        // tag and for cases like <td> <p> </td> - 'p' closes without a closing tag.
        n.type === jt.END_TAG && a === n.tagName ? {
          endTag: { ...r },
          endLine: r.endLine,
          endCol: r.endCol,
          endOffset: r.endOffset
        } : {
          endLine: r.startLine,
          endCol: r.startCol,
          endOffset: r.startOffset
        }
      );
      this.treeAdapter.updateNodeSourceCodeLocation(e, u);
    }
  }
  //Token processing
  shouldProcessStartTagTokenInForeignContent(e) {
    if (!this.currentNotInHTML)
      return !1;
    let n, r;
    return this.openElements.stackTop === 0 && this.fragmentContext ? (n = this.fragmentContext, r = this.fragmentContextID) : { current: n, currentTagId: r } = this.openElements, e.tagID === f.SVG && this.treeAdapter.getTagName(n) === k.ANNOTATION_XML && this.treeAdapter.getNamespaceURI(n) === K.MATHML ? !1 : (
      // Check that `current` is not an integration point for HTML or MathML elements.
      this.tokenizer.inForeignNode || // If it _is_ an integration point, then we might have to check that it is not an HTML
      // integration point.
      (e.tagID === f.MGLYPH || e.tagID === f.MALIGNMARK) && !this._isIntegrationPoint(r, n, K.HTML)
    );
  }
  _processToken(e) {
    switch (e.type) {
      case jt.CHARACTER: {
        this.onCharacter(e);
        break;
      }
      case jt.NULL_CHARACTER: {
        this.onNullCharacter(e);
        break;
      }
      case jt.COMMENT: {
        this.onComment(e);
        break;
      }
      case jt.DOCTYPE: {
        this.onDoctype(e);
        break;
      }
      case jt.START_TAG: {
        this._processStartTag(e);
        break;
      }
      case jt.END_TAG: {
        this.onEndTag(e);
        break;
      }
      case jt.EOF: {
        this.onEof(e);
        break;
      }
      case jt.WHITESPACE_CHARACTER: {
        this.onWhitespaceCharacter(e);
        break;
      }
    }
  }
  //Integration points
  _isIntegrationPoint(e, n, r) {
    const a = this.treeAdapter.getNamespaceURI(n), u = this.treeAdapter.getAttrList(n);
    return Em(e, a, u, r);
  }
  //Active formatting elements reconstruction
  _reconstructActiveFormattingElements() {
    const e = this.activeFormattingElements.entries.length;
    if (e) {
      const n = this.activeFormattingElements.entries.findIndex((a) => a.type === Rr.Marker || this.openElements.contains(a.element)), r = n < 0 ? e - 1 : n - 1;
      for (let a = r; a >= 0; a--) {
        const u = this.activeFormattingElements.entries[a];
        this._insertElement(u.token, this.treeAdapter.getNamespaceURI(u.element)), u.element = this.openElements.current;
      }
    }
  }
  //Close elements
  _closeTableCell() {
    this.openElements.generateImpliedEndTags(), this.openElements.popUntilTableCellPopped(), this.activeFormattingElements.clearToLastMarker(), this.insertionMode = x.IN_ROW;
  }
  _closePElement() {
    this.openElements.generateImpliedEndTagsWithExclusion(f.P), this.openElements.popUntilTagNamePopped(f.P);
  }
  //Insertion modes
  _resetInsertionMode() {
    for (let e = this.openElements.stackTop; e >= 0; e--)
      switch (e === 0 && this.fragmentContext ? this.fragmentContextID : this.openElements.tagIDs[e]) {
        case f.TR: {
          this.insertionMode = x.IN_ROW;
          return;
        }
        case f.TBODY:
        case f.THEAD:
        case f.TFOOT: {
          this.insertionMode = x.IN_TABLE_BODY;
          return;
        }
        case f.CAPTION: {
          this.insertionMode = x.IN_CAPTION;
          return;
        }
        case f.COLGROUP: {
          this.insertionMode = x.IN_COLUMN_GROUP;
          return;
        }
        case f.TABLE: {
          this.insertionMode = x.IN_TABLE;
          return;
        }
        case f.BODY: {
          this.insertionMode = x.IN_BODY;
          return;
        }
        case f.FRAMESET: {
          this.insertionMode = x.IN_FRAMESET;
          return;
        }
        case f.SELECT: {
          this._resetInsertionModeForSelect(e);
          return;
        }
        case f.TEMPLATE: {
          this.insertionMode = this.tmplInsertionModeStack[0];
          return;
        }
        case f.HTML: {
          this.insertionMode = this.headElement ? x.AFTER_HEAD : x.BEFORE_HEAD;
          return;
        }
        case f.TD:
        case f.TH: {
          if (e > 0) {
            this.insertionMode = x.IN_CELL;
            return;
          }
          break;
        }
        case f.HEAD: {
          if (e > 0) {
            this.insertionMode = x.IN_HEAD;
            return;
          }
          break;
        }
      }
    this.insertionMode = x.IN_BODY;
  }
  _resetInsertionModeForSelect(e) {
    if (e > 0)
      for (let n = e - 1; n > 0; n--) {
        const r = this.openElements.tagIDs[n];
        if (r === f.TEMPLATE)
          break;
        if (r === f.TABLE) {
          this.insertionMode = x.IN_SELECT_IN_TABLE;
          return;
        }
      }
    this.insertionMode = x.IN_SELECT;
  }
  //Foster parenting
  _isElementCausesFosterParenting(e) {
    return eh.has(e);
  }
  _shouldFosterParentOnInsertion() {
    return this.fosterParentingEnabled && this._isElementCausesFosterParenting(this.openElements.currentTagId);
  }
  _findFosterParentingLocation() {
    for (let e = this.openElements.stackTop; e >= 0; e--) {
      const n = this.openElements.items[e];
      switch (this.openElements.tagIDs[e]) {
        case f.TEMPLATE: {
          if (this.treeAdapter.getNamespaceURI(n) === K.HTML)
            return { parent: this.treeAdapter.getTemplateContent(n), beforeElement: null };
          break;
        }
        case f.TABLE: {
          const r = this.treeAdapter.getParentNode(n);
          return r ? { parent: r, beforeElement: n } : { parent: this.openElements.items[e - 1], beforeElement: null };
        }
      }
    }
    return { parent: this.openElements.items[0], beforeElement: null };
  }
  _fosterParentElement(e) {
    const n = this._findFosterParentingLocation();
    n.beforeElement ? this.treeAdapter.insertBefore(n.parent, e, n.beforeElement) : this.treeAdapter.appendChild(n.parent, e);
  }
  //Special elements
  _isSpecialElement(e, n) {
    const r = this.treeAdapter.getNamespaceURI(e);
    return kE[r].has(n);
  }
  onCharacter(e) {
    if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) {
      Xb(this, e);
      return;
    }
    switch (this.insertionMode) {
      case x.INITIAL: {
        Ks(this, e);
        break;
      }
      case x.BEFORE_HTML: {
        si(this, e);
        break;
      }
      case x.BEFORE_HEAD: {
        ii(this, e);
        break;
      }
      case x.IN_HEAD: {
        ai(this, e);
        break;
      }
      case x.IN_HEAD_NO_SCRIPT: {
        ui(this, e);
        break;
      }
      case x.AFTER_HEAD: {
        oi(this, e);
        break;
      }
      case x.IN_BODY:
      case x.IN_CAPTION:
      case x.IN_CELL:
      case x.IN_TEMPLATE: {
        sh(this, e);
        break;
      }
      case x.TEXT:
      case x.IN_SELECT:
      case x.IN_SELECT_IN_TABLE: {
        this._insertCharacters(e);
        break;
      }
      case x.IN_TABLE:
      case x.IN_TABLE_BODY:
      case x.IN_ROW: {
        ru(this, e);
        break;
      }
      case x.IN_TABLE_TEXT: {
        fh(this, e);
        break;
      }
      case x.IN_COLUMN_GROUP: {
        ca(this, e);
        break;
      }
      case x.AFTER_BODY: {
        fa(this, e);
        break;
      }
      case x.AFTER_AFTER_BODY: {
        zi(this, e);
        break;
      }
    }
  }
  onNullCharacter(e) {
    if (this.skipNextNewLine = !1, this.tokenizer.inForeignNode) {
      Kb(this, e);
      return;
    }
    switch (this.insertionMode) {
      case x.INITIAL: {
        Ks(this, e);
        break;
      }
      case x.BEFORE_HTML: {
        si(this, e);
        break;
      }
      case x.BEFORE_HEAD: {
        ii(this, e);
        break;
      }
      case x.IN_HEAD: {
        ai(this, e);
        break;
      }
      case x.IN_HEAD_NO_SCRIPT: {
        ui(this, e);
        break;
      }
      case x.AFTER_HEAD: {
        oi(this, e);
        break;
      }
      case x.TEXT: {
        this._insertCharacters(e);
        break;
      }
      case x.IN_TABLE:
      case x.IN_TABLE_BODY:
      case x.IN_ROW: {
        ru(this, e);
        break;
      }
      case x.IN_COLUMN_GROUP: {
        ca(this, e);
        break;
      }
      case x.AFTER_BODY: {
        fa(this, e);
        break;
      }
      case x.AFTER_AFTER_BODY: {
        zi(this, e);
        break;
      }
    }
  }
  onComment(e) {
    if (this.skipNextNewLine = !1, this.currentNotInHTML) {
      Pu(this, e);
      return;
    }
    switch (this.insertionMode) {
      case x.INITIAL:
      case x.BEFORE_HTML:
      case x.BEFORE_HEAD:
      case x.IN_HEAD:
      case x.IN_HEAD_NO_SCRIPT:
      case x.AFTER_HEAD:
      case x.IN_BODY:
      case x.IN_TABLE:
      case x.IN_CAPTION:
      case x.IN_COLUMN_GROUP:
      case x.IN_TABLE_BODY:
      case x.IN_ROW:
      case x.IN_CELL:
      case x.IN_SELECT:
      case x.IN_SELECT_IN_TABLE:
      case x.IN_TEMPLATE:
      case x.IN_FRAMESET:
      case x.AFTER_FRAMESET: {
        Pu(this, e);
        break;
      }
      case x.IN_TABLE_TEXT: {
        Xs(this, e);
        break;
      }
      case x.AFTER_BODY: {
        vm(this, e);
        break;
      }
      case x.AFTER_AFTER_BODY:
      case x.AFTER_AFTER_FRAMESET: {
        xm(this, e);
        break;
      }
    }
  }
  onDoctype(e) {
    switch (this.skipNextNewLine = !1, this.insertionMode) {
      case x.INITIAL: {
        Rm(this, e);
        break;
      }
      case x.BEFORE_HEAD:
      case x.IN_HEAD:
      case x.IN_HEAD_NO_SCRIPT:
      case x.AFTER_HEAD: {
        this._err(e, j.misplacedDoctype);
        break;
      }
      case x.IN_TABLE_TEXT: {
        Xs(this, e);
        break;
      }
    }
  }
  onStartTag(e) {
    this.skipNextNewLine = !1, this.currentToken = e, this._processStartTag(e), e.selfClosing && !e.ackSelfClosing && this._err(e, j.nonVoidHtmlElementStartTagWithTrailingSolidus);
  }
  /**
   * Processes a given start tag.
   *
   * `onStartTag` checks if a self-closing tag was recognized. When a token
   * is moved inbetween multiple insertion modes, this check for self-closing
   * could lead to false positives. To avoid this, `_processStartTag` is used
   * for nested calls.
   *
   * @param token The token to process.
   */
  _processStartTag(e) {
    this.shouldProcessStartTagTokenInForeignContent(e) ? zb(this, e) : this._startTagOutsideForeignContent(e);
  }
  _startTagOutsideForeignContent(e) {
    switch (this.insertionMode) {
      case x.INITIAL: {
        Ks(this, e);
        break;
      }
      case x.BEFORE_HTML: {
        Lm(this, e);
        break;
      }
      case x.BEFORE_HEAD: {
        wm(this, e);
        break;
      }
      case x.IN_HEAD: {
        Or(this, e);
        break;
      }
      case x.IN_HEAD_NO_SCRIPT: {
        Bm(this, e);
        break;
      }
      case x.AFTER_HEAD: {
        Fm(this, e);
        break;
      }
      case x.IN_BODY: {
        gn(this, e);
        break;
      }
      case x.IN_TABLE: {
        Us(this, e);
        break;
      }
      case x.IN_TABLE_TEXT: {
        Xs(this, e);
        break;
      }
      case x.IN_CAPTION: {
        Db(this, e);
        break;
      }
      case x.IN_COLUMN_GROUP: {
        Eo(this, e);
        break;
      }
      case x.IN_TABLE_BODY: {
        La(this, e);
        break;
      }
      case x.IN_ROW: {
        Oa(this, e);
        break;
      }
      case x.IN_CELL: {
        Mb(this, e);
        break;
      }
      case x.IN_SELECT: {
        dh(this, e);
        break;
      }
      case x.IN_SELECT_IN_TABLE: {
        kb(this, e);
        break;
      }
      case x.IN_TEMPLATE: {
        Hb(this, e);
        break;
      }
      case x.AFTER_BODY: {
        $b(this, e);
        break;
      }
      case x.IN_FRAMESET: {
        Gb(this, e);
        break;
      }
      case x.AFTER_FRAMESET: {
        Vb(this, e);
        break;
      }
      case x.AFTER_AFTER_BODY: {
        Wb(this, e);
        break;
      }
      case x.AFTER_AFTER_FRAMESET: {
        Qb(this, e);
        break;
      }
    }
  }
  onEndTag(e) {
    this.skipNextNewLine = !1, this.currentToken = e, this.currentNotInHTML ? Jb(this, e) : this._endTagOutsideForeignContent(e);
  }
  _endTagOutsideForeignContent(e) {
    switch (this.insertionMode) {
      case x.INITIAL: {
        Ks(this, e);
        break;
      }
      case x.BEFORE_HTML: {
        Om(this, e);
        break;
      }
      case x.BEFORE_HEAD: {
        Dm(this, e);
        break;
      }
      case x.IN_HEAD: {
        Pm(this, e);
        break;
      }
      case x.IN_HEAD_NO_SCRIPT: {
        Mm(this, e);
        break;
      }
      case x.AFTER_HEAD: {
        km(this, e);
        break;
      }
      case x.IN_BODY: {
        Ra(this, e);
        break;
      }
      case x.TEXT: {
        Cb(this, e);
        break;
      }
      case x.IN_TABLE: {
        pi(this, e);
        break;
      }
      case x.IN_TABLE_TEXT: {
        Xs(this, e);
        break;
      }
      case x.IN_CAPTION: {
        Pb(this, e);
        break;
      }
      case x.IN_COLUMN_GROUP: {
        Bb(this, e);
        break;
      }
      case x.IN_TABLE_BODY: {
        Bu(this, e);
        break;
      }
      case x.IN_ROW: {
        hh(this, e);
        break;
      }
      case x.IN_CELL: {
        Fb(this, e);
        break;
      }
      case x.IN_SELECT: {
        ph(this, e);
        break;
      }
      case x.IN_SELECT_IN_TABLE: {
        Ub(this, e);
        break;
      }
      case x.IN_TEMPLATE: {
        qb(this, e);
        break;
      }
      case x.AFTER_BODY: {
        Eh(this, e);
        break;
      }
      case x.IN_FRAMESET: {
        Yb(this, e);
        break;
      }
      case x.AFTER_FRAMESET: {
        jb(this, e);
        break;
      }
      case x.AFTER_AFTER_BODY: {
        zi(this, e);
        break;
      }
    }
  }
  onEof(e) {
    switch (this.insertionMode) {
      case x.INITIAL: {
        Ks(this, e);
        break;
      }
      case x.BEFORE_HTML: {
        si(this, e);
        break;
      }
      case x.BEFORE_HEAD: {
        ii(this, e);
        break;
      }
      case x.IN_HEAD: {
        ai(this, e);
        break;
      }
      case x.IN_HEAD_NO_SCRIPT: {
        ui(this, e);
        break;
      }
      case x.AFTER_HEAD: {
        oi(this, e);
        break;
      }
      case x.IN_BODY:
      case x.IN_TABLE:
      case x.IN_CAPTION:
      case x.IN_COLUMN_GROUP:
      case x.IN_TABLE_BODY:
      case x.IN_ROW:
      case x.IN_CELL:
      case x.IN_SELECT:
      case x.IN_SELECT_IN_TABLE: {
        oh(this, e);
        break;
      }
      case x.TEXT: {
        Ib(this, e);
        break;
      }
      case x.IN_TABLE_TEXT: {
        Xs(this, e);
        break;
      }
      case x.IN_TEMPLATE: {
        gh(this, e);
        break;
      }
      case x.AFTER_BODY:
      case x.IN_FRAMESET:
      case x.AFTER_FRAMESET:
      case x.AFTER_AFTER_BODY:
      case x.AFTER_AFTER_FRAMESET: {
        go(this, e);
        break;
      }
    }
  }
  onWhitespaceCharacter(e) {
    if (this.skipNextNewLine && (this.skipNextNewLine = !1, e.chars.charCodeAt(0) === _.LINE_FEED)) {
      if (e.chars.length === 1)
        return;
      e.chars = e.chars.substr(1);
    }
    if (this.tokenizer.inForeignNode) {
      this._insertCharacters(e);
      return;
    }
    switch (this.insertionMode) {
      case x.IN_HEAD:
      case x.IN_HEAD_NO_SCRIPT:
      case x.AFTER_HEAD:
      case x.TEXT:
      case x.IN_COLUMN_GROUP:
      case x.IN_SELECT:
      case x.IN_SELECT_IN_TABLE:
      case x.IN_FRAMESET:
      case x.AFTER_FRAMESET: {
        this._insertCharacters(e);
        break;
      }
      case x.IN_BODY:
      case x.IN_CAPTION:
      case x.IN_CELL:
      case x.IN_TEMPLATE:
      case x.AFTER_BODY:
      case x.AFTER_AFTER_BODY:
      case x.AFTER_AFTER_FRAMESET: {
        rh(this, e);
        break;
      }
      case x.IN_TABLE:
      case x.IN_TABLE_BODY:
      case x.IN_ROW: {
        ru(this, e);
        break;
      }
      case x.IN_TABLE_TEXT: {
        ch(this, e);
        break;
      }
    }
  }
};
function Am(t, e) {
  let n = t.activeFormattingElements.getElementEntryInScopeWithTagName(e.tagName);
  return n ? t.openElements.contains(n.element) ? t.openElements.hasInScope(e.tagID) || (n = null) : (t.activeFormattingElements.removeEntry(n), n = null) : uh(t, e), n;
}
function ym(t, e) {
  let n = null, r = t.openElements.stackTop;
  for (; r >= 0; r--) {
    const a = t.openElements.items[r];
    if (a === e.element)
      break;
    t._isSpecialElement(a, t.openElements.tagIDs[r]) && (n = a);
  }
  return n || (t.openElements.shortenToLength(r < 0 ? 0 : r), t.activeFormattingElements.removeEntry(e)), n;
}
function Cm(t, e, n) {
  let r = e, a = t.openElements.getCommonAncestor(e);
  for (let u = 0, o = a; o !== n; u++, o = a) {
    a = t.openElements.getCommonAncestor(o);
    const h = t.activeFormattingElements.getElementEntry(o), m = h && u >= _m;
    !h || m ? (m && t.activeFormattingElements.removeEntry(h), t.openElements.remove(o)) : (o = Im(t, h), r === e && (t.activeFormattingElements.bookmark = h), t.treeAdapter.detachNode(r), t.treeAdapter.appendChild(o, r), r = o);
  }
  return r;
}
function Im(t, e) {
  const n = t.treeAdapter.getNamespaceURI(e.element), r = t.treeAdapter.createElement(e.token.tagName, n, e.token.attrs);
  return t.openElements.replace(e.element, r), e.element = r, r;
}
function Sm(t, e, n) {
  const r = t.treeAdapter.getTagName(e), a = va(r);
  if (t._isElementCausesFosterParenting(a))
    t._fosterParentElement(n);
  else {
    const u = t.treeAdapter.getNamespaceURI(e);
    a === f.TEMPLATE && u === K.HTML && (e = t.treeAdapter.getTemplateContent(e)), t.treeAdapter.appendChild(e, n);
  }
}
function Nm(t, e, n) {
  const r = t.treeAdapter.getNamespaceURI(n.element), { token: a } = n, u = t.treeAdapter.createElement(a.tagName, r, a.attrs);
  t._adoptNodes(e, u), t.treeAdapter.appendChild(e, u), t.activeFormattingElements.insertElementAfterBookmark(u, a), t.activeFormattingElements.removeEntry(n), t.openElements.remove(n.element), t.openElements.insertAfter(e, u, a.tagID);
}
function po(t, e) {
  for (let n = 0; n < bm; n++) {
    const r = Am(t, e);
    if (!r)
      break;
    const a = ym(t, r);
    if (!a)
      break;
    t.activeFormattingElements.bookmark = r;
    const u = Cm(t, a, r.element), o = t.openElements.getCommonAncestor(r.element);
    t.treeAdapter.detachNode(u), o && Sm(t, o, u), Nm(t, a, r);
  }
}
function Pu(t, e) {
  t._appendCommentNode(e, t.openElements.currentTmplContentOrNode);
}
function vm(t, e) {
  t._appendCommentNode(e, t.openElements.items[0]);
}
function xm(t, e) {
  t._appendCommentNode(e, t.document);
}
function go(t, e) {
  if (t.stopped = !0, e.location) {
    const n = t.fragmentContext ? 0 : 2;
    for (let r = t.openElements.stackTop; r >= n; r--)
      t._setEndLocation(t.openElements.items[r], e);
    if (!t.fragmentContext && t.openElements.stackTop >= 0) {
      const r = t.openElements.items[0], a = t.treeAdapter.getNodeSourceCodeLocation(r);
      if (a && !a.endTag && (t._setEndLocation(r, e), t.openElements.stackTop >= 1)) {
        const u = t.openElements.items[1], o = t.treeAdapter.getNodeSourceCodeLocation(u);
        o && !o.endTag && t._setEndLocation(u, e);
      }
    }
  }
}
function Rm(t, e) {
  t._setDocumentType(e);
  const n = e.forceQuirks ? Fn.QUIRKS : im(e);
  sm(e) || t._err(e, j.nonConformingDoctype), t.treeAdapter.setDocumentMode(t.document, n), t.insertionMode = x.BEFORE_HTML;
}
function Ks(t, e) {
  t._err(e, j.missingDoctype, !0), t.treeAdapter.setDocumentMode(t.document, Fn.QUIRKS), t.insertionMode = x.BEFORE_HTML, t._processToken(e);
}
function Lm(t, e) {
  e.tagID === f.HTML ? (t._insertElement(e, K.HTML), t.insertionMode = x.BEFORE_HEAD) : si(t, e);
}
function Om(t, e) {
  const n = e.tagID;
  (n === f.HTML || n === f.HEAD || n === f.BODY || n === f.BR) && si(t, e);
}
function si(t, e) {
  t._insertFakeRootElement(), t.insertionMode = x.BEFORE_HEAD, t._processToken(e);
}
function wm(t, e) {
  switch (e.tagID) {
    case f.HTML: {
      gn(t, e);
      break;
    }
    case f.HEAD: {
      t._insertElement(e, K.HTML), t.headElement = t.openElements.current, t.insertionMode = x.IN_HEAD;
      break;
    }
    default:
      ii(t, e);
  }
}
function Dm(t, e) {
  const n = e.tagID;
  n === f.HEAD || n === f.BODY || n === f.HTML || n === f.BR ? ii(t, e) : t._err(e, j.endTagWithoutMatchingOpenElement);
}
function ii(t, e) {
  t._insertFakeElement(k.HEAD, f.HEAD), t.headElement = t.openElements.current, t.insertionMode = x.IN_HEAD, t._processToken(e);
}
function Or(t, e) {
  switch (e.tagID) {
    case f.HTML: {
      gn(t, e);
      break;
    }
    case f.BASE:
    case f.BASEFONT:
    case f.BGSOUND:
    case f.LINK:
    case f.META: {
      t._appendElement(e, K.HTML), e.ackSelfClosing = !0;
      break;
    }
    case f.TITLE: {
      t._switchToTextParsing(e, kn.RCDATA);
      break;
    }
    case f.NOSCRIPT: {
      t.options.scriptingEnabled ? t._switchToTextParsing(e, kn.RAWTEXT) : (t._insertElement(e, K.HTML), t.insertionMode = x.IN_HEAD_NO_SCRIPT);
      break;
    }
    case f.NOFRAMES:
    case f.STYLE: {
      t._switchToTextParsing(e, kn.RAWTEXT);
      break;
    }
    case f.SCRIPT: {
      t._switchToTextParsing(e, kn.SCRIPT_DATA);
      break;
    }
    case f.TEMPLATE: {
      t._insertTemplate(e), t.activeFormattingElements.insertMarker(), t.framesetOk = !1, t.insertionMode = x.IN_TEMPLATE, t.tmplInsertionModeStack.unshift(x.IN_TEMPLATE);
      break;
    }
    case f.HEAD: {
      t._err(e, j.misplacedStartTagForHeadElement);
      break;
    }
    default:
      ai(t, e);
  }
}
function Pm(t, e) {
  switch (e.tagID) {
    case f.HEAD: {
      t.openElements.pop(), t.insertionMode = x.AFTER_HEAD;
      break;
    }
    case f.BODY:
    case f.BR:
    case f.HTML: {
      ai(t, e);
      break;
    }
    case f.TEMPLATE: {
      Cs(t, e);
      break;
    }
    default:
      t._err(e, j.endTagWithoutMatchingOpenElement);
  }
}
function Cs(t, e) {
  t.openElements.tmplCount > 0 ? (t.openElements.generateImpliedEndTagsThoroughly(), t.openElements.currentTagId !== f.TEMPLATE && t._err(e, j.closingOfElementWithOpenChildElements), t.openElements.popUntilTagNamePopped(f.TEMPLATE), t.activeFormattingElements.clearToLastMarker(), t.tmplInsertionModeStack.shift(), t._resetInsertionMode()) : t._err(e, j.endTagWithoutMatchingOpenElement);
}
function ai(t, e) {
  t.openElements.pop(), t.insertionMode = x.AFTER_HEAD, t._processToken(e);
}
function Bm(t, e) {
  switch (e.tagID) {
    case f.HTML: {
      gn(t, e);
      break;
    }
    case f.BASEFONT:
    case f.BGSOUND:
    case f.HEAD:
    case f.LINK:
    case f.META:
    case f.NOFRAMES:
    case f.STYLE: {
      Or(t, e);
      break;
    }
    case f.NOSCRIPT: {
      t._err(e, j.nestedNoscriptInHead);
      break;
    }
    default:
      ui(t, e);
  }
}
function Mm(t, e) {
  switch (e.tagID) {
    case f.NOSCRIPT: {
      t.openElements.pop(), t.insertionMode = x.IN_HEAD;
      break;
    }
    case f.BR: {
      ui(t, e);
      break;
    }
    default:
      t._err(e, j.endTagWithoutMatchingOpenElement);
  }
}
function ui(t, e) {
  const n = e.type === jt.EOF ? j.openElementsLeftAfterEof : j.disallowedContentInNoscriptInHead;
  t._err(e, n), t.openElements.pop(), t.insertionMode = x.IN_HEAD, t._processToken(e);
}
function Fm(t, e) {
  switch (e.tagID) {
    case f.HTML: {
      gn(t, e);
      break;
    }
    case f.BODY: {
      t._insertElement(e, K.HTML), t.framesetOk = !1, t.insertionMode = x.IN_BODY;
      break;
    }
    case f.FRAMESET: {
      t._insertElement(e, K.HTML), t.insertionMode = x.IN_FRAMESET;
      break;
    }
    case f.BASE:
    case f.BASEFONT:
    case f.BGSOUND:
    case f.LINK:
    case f.META:
    case f.NOFRAMES:
    case f.SCRIPT:
    case f.STYLE:
    case f.TEMPLATE:
    case f.TITLE: {
      t._err(e, j.abandonedHeadElementChild), t.openElements.push(t.headElement, f.HEAD), Or(t, e), t.openElements.remove(t.headElement);
      break;
    }
    case f.HEAD: {
      t._err(e, j.misplacedStartTagForHeadElement);
      break;
    }
    default:
      oi(t, e);
  }
}
function km(t, e) {
  switch (e.tagID) {
    case f.BODY:
    case f.HTML:
    case f.BR: {
      oi(t, e);
      break;
    }
    case f.TEMPLATE: {
      Cs(t, e);
      break;
    }
    default:
      t._err(e, j.endTagWithoutMatchingOpenElement);
  }
}
function oi(t, e) {
  t._insertFakeElement(k.BODY, f.BODY), t.insertionMode = x.IN_BODY, xa(t, e);
}
function xa(t, e) {
  switch (e.type) {
    case jt.CHARACTER: {
      sh(t, e);
      break;
    }
    case jt.WHITESPACE_CHARACTER: {
      rh(t, e);
      break;
    }
    case jt.COMMENT: {
      Pu(t, e);
      break;
    }
    case jt.START_TAG: {
      gn(t, e);
      break;
    }
    case jt.END_TAG: {
      Ra(t, e);
      break;
    }
    case jt.EOF: {
      oh(t, e);
      break;
    }
  }
}
function rh(t, e) {
  t._reconstructActiveFormattingElements(), t._insertCharacters(e);
}
function sh(t, e) {
  t._reconstructActiveFormattingElements(), t._insertCharacters(e), t.framesetOk = !1;
}
function Um(t, e) {
  t.openElements.tmplCount === 0 && t.treeAdapter.adoptAttributes(t.openElements.items[0], e.attrs);
}
function Hm(t, e) {
  const n = t.openElements.tryPeekProperlyNestedBodyElement();
  n && t.openElements.tmplCount === 0 && (t.framesetOk = !1, t.treeAdapter.adoptAttributes(n, e.attrs));
}
function qm(t, e) {
  const n = t.openElements.tryPeekProperlyNestedBodyElement();
  t.framesetOk && n && (t.treeAdapter.detachNode(n), t.openElements.popAllUpToHtmlElement(), t._insertElement(e, K.HTML), t.insertionMode = x.IN_FRAMESET);
}
function $m(t, e) {
  t.openElements.hasInButtonScope(f.P) && t._closePElement(), t._insertElement(e, K.HTML);
}
function Gm(t, e) {
  t.openElements.hasInButtonScope(f.P) && t._closePElement(), Vl(t.openElements.currentTagId) && t.openElements.pop(), t._insertElement(e, K.HTML);
}
function Ym(t, e) {
  t.openElements.hasInButtonScope(f.P) && t._closePElement(), t._insertElement(e, K.HTML), t.skipNextNewLine = !0, t.framesetOk = !1;
}
function Vm(t, e) {
  const n = t.openElements.tmplCount > 0;
  (!t.formElement || n) && (t.openElements.hasInButtonScope(f.P) && t._closePElement(), t._insertElement(e, K.HTML), n || (t.formElement = t.openElements.current));
}
function jm(t, e) {
  t.framesetOk = !1;
  const n = e.tagID;
  for (let r = t.openElements.stackTop; r >= 0; r--) {
    const a = t.openElements.tagIDs[r];
    if (n === f.LI && a === f.LI || (n === f.DD || n === f.DT) && (a === f.DD || a === f.DT)) {
      t.openElements.generateImpliedEndTagsWithExclusion(a), t.openElements.popUntilTagNamePopped(a);
      break;
    }
    if (a !== f.ADDRESS && a !== f.DIV && a !== f.P && t._isSpecialElement(t.openElements.items[r], a))
      break;
  }
  t.openElements.hasInButtonScope(f.P) && t._closePElement(), t._insertElement(e, K.HTML);
}
function Wm(t, e) {
  t.openElements.hasInButtonScope(f.P) && t._closePElement(), t._insertElement(e, K.HTML), t.tokenizer.state = kn.PLAINTEXT;
}
function Qm(t, e) {
  t.openElements.hasInScope(f.BUTTON) && (t.openElements.generateImpliedEndTags(), t.openElements.popUntilTagNamePopped(f.BUTTON)), t._reconstructActiveFormattingElements(), t._insertElement(e, K.HTML), t.framesetOk = !1;
}
function Km(t, e) {
  const n = t.activeFormattingElements.getElementEntryInScopeWithTagName(k.A);
  n && (po(t, e), t.openElements.remove(n.element), t.activeFormattingElements.removeEntry(n)), t._reconstructActiveFormattingElements(), t._insertElement(e, K.HTML), t.activeFormattingElements.pushElement(t.openElements.current, e);
}
function Xm(t, e) {
  t._reconstructActiveFormattingElements(), t._insertElement(e, K.HTML), t.activeFormattingElements.pushElement(t.openElements.current, e);
}
function zm(t, e) {
  t._reconstructActiveFormattingElements(), t.openElements.hasInScope(f.NOBR) && (po(t, e), t._reconstructActiveFormattingElements()), t._insertElement(e, K.HTML), t.activeFormattingElements.pushElement(t.openElements.current, e);
}
function Jm(t, e) {
  t._reconstructActiveFormattingElements(), t._insertElement(e, K.HTML), t.activeFormattingElements.insertMarker(), t.framesetOk = !1;
}
function Zm(t, e) {
  t.treeAdapter.getDocumentMode(t.document) !== Fn.QUIRKS && t.openElements.hasInButtonScope(f.P) && t._closePElement(), t._insertElement(e, K.HTML), t.framesetOk = !1, t.insertionMode = x.IN_TABLE;
}
function ih(t, e) {
  t._reconstructActiveFormattingElements(), t._appendElement(e, K.HTML), t.framesetOk = !1, e.ackSelfClosing = !0;
}
function ah(t) {
  const e = Yl(t, ns.TYPE);
  return e != null && e.toLowerCase() === mm;
}
function tb(t, e) {
  t._reconstructActiveFormattingElements(), t._appendElement(e, K.HTML), ah(e) || (t.framesetOk = !1), e.ackSelfClosing = !0;
}
function eb(t, e) {
  t._appendElement(e, K.HTML), e.ackSelfClosing = !0;
}
function nb(t, e) {
  t.openElements.hasInButtonScope(f.P) && t._closePElement(), t._appendElement(e, K.HTML), t.framesetOk = !1, e.ackSelfClosing = !0;
}
function rb(t, e) {
  e.tagName = k.IMG, e.tagID = f.IMG, ih(t, e);
}
function sb(t, e) {
  t._insertElement(e, K.HTML), t.skipNextNewLine = !0, t.tokenizer.state = kn.RCDATA, t.originalInsertionMode = t.insertionMode, t.framesetOk = !1, t.insertionMode = x.TEXT;
}
function ib(t, e) {
  t.openElements.hasInButtonScope(f.P) && t._closePElement(), t._reconstructActiveFormattingElements(), t.framesetOk = !1, t._switchToTextParsing(e, kn.RAWTEXT);
}
function ab(t, e) {
  t.framesetOk = !1, t._switchToTextParsing(e, kn.RAWTEXT);
}
function Pc(t, e) {
  t._switchToTextParsing(e, kn.RAWTEXT);
}
function ub(t, e) {
  t._reconstructActiveFormattingElements(), t._insertElement(e, K.HTML), t.framesetOk = !1, t.insertionMode = t.insertionMode === x.IN_TABLE || t.insertionMode === x.IN_CAPTION || t.insertionMode === x.IN_TABLE_BODY || t.insertionMode === x.IN_ROW || t.insertionMode === x.IN_CELL ? x.IN_SELECT_IN_TABLE : x.IN_SELECT;
}
function ob(t, e) {
  t.openElements.currentTagId === f.OPTION && t.openElements.pop(), t._reconstructActiveFormattingElements(), t._insertElement(e, K.HTML);
}
function cb(t, e) {
  t.openElements.hasInScope(f.RUBY) && t.openElements.generateImpliedEndTags(), t._insertElement(e, K.HTML);
}
function fb(t, e) {
  t.openElements.hasInScope(f.RUBY) && t.openElements.generateImpliedEndTagsWithExclusion(f.RTC), t._insertElement(e, K.HTML);
}
function lb(t, e) {
  t._reconstructActiveFormattingElements(), Zl(e), ho(e), e.selfClosing ? t._appendElement(e, K.MATHML) : t._insertElement(e, K.MATHML), e.ackSelfClosing = !0;
}
function hb(t, e) {
  t._reconstructActiveFormattingElements(), th(e), ho(e), e.selfClosing ? t._appendElement(e, K.SVG) : t._insertElement(e, K.SVG), e.ackSelfClosing = !0;
}
function Bc(t, e) {
  t._reconstructActiveFormattingElements(), t._insertElement(e, K.HTML);
}
function gn(t, e) {
  switch (e.tagID) {
    case f.I:
    case f.S:
    case f.B:
    case f.U:
    case f.EM:
    case f.TT:
    case f.BIG:
    case f.CODE:
    case f.FONT:
    case f.SMALL:
    case f.STRIKE:
    case f.STRONG: {
      Xm(t, e);
      break;
    }
    case f.A: {
      Km(t, e);
      break;
    }
    case f.H1:
    case f.H2:
    case f.H3:
    case f.H4:
    case f.H5:
    case f.H6: {
      Gm(t, e);
      break;
    }
    case f.P:
    case f.DL:
    case f.OL:
    case f.UL:
    case f.DIV:
    case f.DIR:
    case f.NAV:
    case f.MAIN:
    case f.MENU:
    case f.ASIDE:
    case f.CENTER:
    case f.FIGURE:
    case f.FOOTER:
    case f.HEADER:
    case f.HGROUP:
    case f.DIALOG:
    case f.DETAILS:
    case f.ADDRESS:
    case f.ARTICLE:
    case f.SECTION:
    case f.SUMMARY:
    case f.FIELDSET:
    case f.BLOCKQUOTE:
    case f.FIGCAPTION: {
      $m(t, e);
      break;
    }
    case f.LI:
    case f.DD:
    case f.DT: {
      jm(t, e);
      break;
    }
    case f.BR:
    case f.IMG:
    case f.WBR:
    case f.AREA:
    case f.EMBED:
    case f.KEYGEN: {
      ih(t, e);
      break;
    }
    case f.HR: {
      nb(t, e);
      break;
    }
    case f.RB:
    case f.RTC: {
      cb(t, e);
      break;
    }
    case f.RT:
    case f.RP: {
      fb(t, e);
      break;
    }
    case f.PRE:
    case f.LISTING: {
      Ym(t, e);
      break;
    }
    case f.XMP: {
      ib(t, e);
      break;
    }
    case f.SVG: {
      hb(t, e);
      break;
    }
    case f.HTML: {
      Um(t, e);
      break;
    }
    case f.BASE:
    case f.LINK:
    case f.META:
    case f.STYLE:
    case f.TITLE:
    case f.SCRIPT:
    case f.BGSOUND:
    case f.BASEFONT:
    case f.TEMPLATE: {
      Or(t, e);
      break;
    }
    case f.BODY: {
      Hm(t, e);
      break;
    }
    case f.FORM: {
      Vm(t, e);
      break;
    }
    case f.NOBR: {
      zm(t, e);
      break;
    }
    case f.MATH: {
      lb(t, e);
      break;
    }
    case f.TABLE: {
      Zm(t, e);
      break;
    }
    case f.INPUT: {
      tb(t, e);
      break;
    }
    case f.PARAM:
    case f.TRACK:
    case f.SOURCE: {
      eb(t, e);
      break;
    }
    case f.IMAGE: {
      rb(t, e);
      break;
    }
    case f.BUTTON: {
      Qm(t, e);
      break;
    }
    case f.APPLET:
    case f.OBJECT:
    case f.MARQUEE: {
      Jm(t, e);
      break;
    }
    case f.IFRAME: {
      ab(t, e);
      break;
    }
    case f.SELECT: {
      ub(t, e);
      break;
    }
    case f.OPTION:
    case f.OPTGROUP: {
      ob(t, e);
      break;
    }
    case f.NOEMBED: {
      Pc(t, e);
      break;
    }
    case f.FRAMESET: {
      qm(t, e);
      break;
    }
    case f.TEXTAREA: {
      sb(t, e);
      break;
    }
    case f.NOSCRIPT: {
      t.options.scriptingEnabled ? Pc(t, e) : Bc(t, e);
      break;
    }
    case f.PLAINTEXT: {
      Wm(t, e);
      break;
    }
    case f.COL:
    case f.TH:
    case f.TD:
    case f.TR:
    case f.HEAD:
    case f.FRAME:
    case f.TBODY:
    case f.TFOOT:
    case f.THEAD:
    case f.CAPTION:
    case f.COLGROUP:
      break;
    default:
      Bc(t, e);
  }
}
function db(t, e) {
  if (t.openElements.hasInScope(f.BODY) && (t.insertionMode = x.AFTER_BODY, t.options.sourceCodeLocationInfo)) {
    const n = t.openElements.tryPeekProperlyNestedBodyElement();
    n && t._setEndLocation(n, e);
  }
}
function pb(t, e) {
  t.openElements.hasInScope(f.BODY) && (t.insertionMode = x.AFTER_BODY, Eh(t, e));
}
function gb(t, e) {
  const n = e.tagID;
  t.openElements.hasInScope(n) && (t.openElements.generateImpliedEndTags(), t.openElements.popUntilTagNamePopped(n));
}
function Eb(t) {
  const e = t.openElements.tmplCount > 0, { formElement: n } = t;
  e || (t.formElement = null), (n || e) && t.openElements.hasInScope(f.FORM) && (t.openElements.generateImpliedEndTags(), e ? t.openElements.popUntilTagNamePopped(f.FORM) : n && t.openElements.remove(n));
}
function mb(t) {
  t.openElements.hasInButtonScope(f.P) || t._insertFakeElement(k.P, f.P), t._closePElement();
}
function bb(t) {
  t.openElements.hasInListItemScope(f.LI) && (t.openElements.generateImpliedEndTagsWithExclusion(f.LI), t.openElements.popUntilTagNamePopped(f.LI));
}
function _b(t, e) {
  const n = e.tagID;
  t.openElements.hasInScope(n) && (t.openElements.generateImpliedEndTagsWithExclusion(n), t.openElements.popUntilTagNamePopped(n));
}
function Tb(t) {
  t.openElements.hasNumberedHeaderInScope() && (t.openElements.generateImpliedEndTags(), t.openElements.popUntilNumberedHeaderPopped());
}
function Ab(t, e) {
  const n = e.tagID;
  t.openElements.hasInScope(n) && (t.openElements.generateImpliedEndTags(), t.openElements.popUntilTagNamePopped(n), t.activeFormattingElements.clearToLastMarker());
}
function yb(t) {
  t._reconstructActiveFormattingElements(), t._insertFakeElement(k.BR, f.BR), t.openElements.pop(), t.framesetOk = !1;
}
function uh(t, e) {
  const n = e.tagName, r = e.tagID;
  for (let a = t.openElements.stackTop; a > 0; a--) {
    const u = t.openElements.items[a], o = t.openElements.tagIDs[a];
    if (r === o && (r !== f.UNKNOWN || t.treeAdapter.getTagName(u) === n)) {
      t.openElements.generateImpliedEndTagsWithExclusion(r), t.openElements.stackTop >= a && t.openElements.shortenToLength(a);
      break;
    }
    if (t._isSpecialElement(u, o))
      break;
  }
}
function Ra(t, e) {
  switch (e.tagID) {
    case f.A:
    case f.B:
    case f.I:
    case f.S:
    case f.U:
    case f.EM:
    case f.TT:
    case f.BIG:
    case f.CODE:
    case f.FONT:
    case f.NOBR:
    case f.SMALL:
    case f.STRIKE:
    case f.STRONG: {
      po(t, e);
      break;
    }
    case f.P: {
      mb(t);
      break;
    }
    case f.DL:
    case f.UL:
    case f.OL:
    case f.DIR:
    case f.DIV:
    case f.NAV:
    case f.PRE:
    case f.MAIN:
    case f.MENU:
    case f.ASIDE:
    case f.BUTTON:
    case f.CENTER:
    case f.FIGURE:
    case f.FOOTER:
    case f.HEADER:
    case f.HGROUP:
    case f.DIALOG:
    case f.ADDRESS:
    case f.ARTICLE:
    case f.DETAILS:
    case f.SECTION:
    case f.SUMMARY:
    case f.LISTING:
    case f.FIELDSET:
    case f.BLOCKQUOTE:
    case f.FIGCAPTION: {
      gb(t, e);
      break;
    }
    case f.LI: {
      bb(t);
      break;
    }
    case f.DD:
    case f.DT: {
      _b(t, e);
      break;
    }
    case f.H1:
    case f.H2:
    case f.H3:
    case f.H4:
    case f.H5:
    case f.H6: {
      Tb(t);
      break;
    }
    case f.BR: {
      yb(t);
      break;
    }
    case f.BODY: {
      db(t, e);
      break;
    }
    case f.HTML: {
      pb(t, e);
      break;
    }
    case f.FORM: {
      Eb(t);
      break;
    }
    case f.APPLET:
    case f.OBJECT:
    case f.MARQUEE: {
      Ab(t, e);
      break;
    }
    case f.TEMPLATE: {
      Cs(t, e);
      break;
    }
    default:
      uh(t, e);
  }
}
function oh(t, e) {
  t.tmplInsertionModeStack.length > 0 ? gh(t, e) : go(t, e);
}
function Cb(t, e) {
  var n;
  e.tagID === f.SCRIPT && ((n = t.scriptHandler) === null || n === void 0 || n.call(t, t.openElements.current)), t.openElements.pop(), t.insertionMode = t.originalInsertionMode;
}
function Ib(t, e) {
  t._err(e, j.eofInElementThatCanContainOnlyText), t.openElements.pop(), t.insertionMode = t.originalInsertionMode, t.onEof(e);
}
function ru(t, e) {
  if (eh.has(t.openElements.currentTagId))
    switch (t.pendingCharacterTokens.length = 0, t.hasNonWhitespacePendingCharacterToken = !1, t.originalInsertionMode = t.insertionMode, t.insertionMode = x.IN_TABLE_TEXT, e.type) {
      case jt.CHARACTER: {
        fh(t, e);
        break;
      }
      case jt.WHITESPACE_CHARACTER: {
        ch(t, e);
        break;
      }
    }
  else
    yi(t, e);
}
function Sb(t, e) {
  t.openElements.clearBackToTableContext(), t.activeFormattingElements.insertMarker(), t._insertElement(e, K.HTML), t.insertionMode = x.IN_CAPTION;
}
function Nb(t, e) {
  t.openElements.clearBackToTableContext(), t._insertElement(e, K.HTML), t.insertionMode = x.IN_COLUMN_GROUP;
}
function vb(t, e) {
  t.openElements.clearBackToTableContext(), t._insertFakeElement(k.COLGROUP, f.COLGROUP), t.insertionMode = x.IN_COLUMN_GROUP, Eo(t, e);
}
function xb(t, e) {
  t.openElements.clearBackToTableContext(), t._insertElement(e, K.HTML), t.insertionMode = x.IN_TABLE_BODY;
}
function Rb(t, e) {
  t.openElements.clearBackToTableContext(), t._insertFakeElement(k.TBODY, f.TBODY), t.insertionMode = x.IN_TABLE_BODY, La(t, e);
}
function Lb(t, e) {
  t.openElements.hasInTableScope(f.TABLE) && (t.openElements.popUntilTagNamePopped(f.TABLE), t._resetInsertionMode(), t._processStartTag(e));
}
function Ob(t, e) {
  ah(e) ? t._appendElement(e, K.HTML) : yi(t, e), e.ackSelfClosing = !0;
}
function wb(t, e) {
  !t.formElement && t.openElements.tmplCount === 0 && (t._insertElement(e, K.HTML), t.formElement = t.openElements.current, t.openElements.pop());
}
function Us(t, e) {
  switch (e.tagID) {
    case f.TD:
    case f.TH:
    case f.TR: {
      Rb(t, e);
      break;
    }
    case f.STYLE:
    case f.SCRIPT:
    case f.TEMPLATE: {
      Or(t, e);
      break;
    }
    case f.COL: {
      vb(t, e);
      break;
    }
    case f.FORM: {
      wb(t, e);
      break;
    }
    case f.TABLE: {
      Lb(t, e);
      break;
    }
    case f.TBODY:
    case f.TFOOT:
    case f.THEAD: {
      xb(t, e);
      break;
    }
    case f.INPUT: {
      Ob(t, e);
      break;
    }
    case f.CAPTION: {
      Sb(t, e);
      break;
    }
    case f.COLGROUP: {
      Nb(t, e);
      break;
    }
    default:
      yi(t, e);
  }
}
function pi(t, e) {
  switch (e.tagID) {
    case f.TABLE: {
      t.openElements.hasInTableScope(f.TABLE) && (t.openElements.popUntilTagNamePopped(f.TABLE), t._resetInsertionMode());
      break;
    }
    case f.TEMPLATE: {
      Cs(t, e);
      break;
    }
    case f.BODY:
    case f.CAPTION:
    case f.COL:
    case f.COLGROUP:
    case f.HTML:
    case f.TBODY:
    case f.TD:
    case f.TFOOT:
    case f.TH:
    case f.THEAD:
    case f.TR:
      break;
    default:
      yi(t, e);
  }
}
function yi(t, e) {
  const n = t.fosterParentingEnabled;
  t.fosterParentingEnabled = !0, xa(t, e), t.fosterParentingEnabled = n;
}
function ch(t, e) {
  t.pendingCharacterTokens.push(e);
}
function fh(t, e) {
  t.pendingCharacterTokens.push(e), t.hasNonWhitespacePendingCharacterToken = !0;
}
function Xs(t, e) {
  let n = 0;
  if (t.hasNonWhitespacePendingCharacterToken)
    for (; n < t.pendingCharacterTokens.length; n++)
      yi(t, t.pendingCharacterTokens[n]);
  else
    for (; n < t.pendingCharacterTokens.length; n++)
      t._insertCharacters(t.pendingCharacterTokens[n]);
  t.insertionMode = t.originalInsertionMode, t._processToken(e);
}
const lh = /* @__PURE__ */ new Set([f.CAPTION, f.COL, f.COLGROUP, f.TBODY, f.TD, f.TFOOT, f.TH, f.THEAD, f.TR]);
function Db(t, e) {
  const n = e.tagID;
  lh.has(n) ? t.openElements.hasInTableScope(f.CAPTION) && (t.openElements.generateImpliedEndTags(), t.openElements.popUntilTagNamePopped(f.CAPTION), t.activeFormattingElements.clearToLastMarker(), t.insertionMode = x.IN_TABLE, Us(t, e)) : gn(t, e);
}
function Pb(t, e) {
  const n = e.tagID;
  switch (n) {
    case f.CAPTION:
    case f.TABLE: {
      t.openElements.hasInTableScope(f.CAPTION) && (t.openElements.generateImpliedEndTags(), t.openElements.popUntilTagNamePopped(f.CAPTION), t.activeFormattingElements.clearToLastMarker(), t.insertionMode = x.IN_TABLE, n === f.TABLE && pi(t, e));
      break;
    }
    case f.BODY:
    case f.COL:
    case f.COLGROUP:
    case f.HTML:
    case f.TBODY:
    case f.TD:
    case f.TFOOT:
    case f.TH:
    case f.THEAD:
    case f.TR:
      break;
    default:
      Ra(t, e);
  }
}
function Eo(t, e) {
  switch (e.tagID) {
    case f.HTML: {
      gn(t, e);
      break;
    }
    case f.COL: {
      t._appendElement(e, K.HTML), e.ackSelfClosing = !0;
      break;
    }
    case f.TEMPLATE: {
      Or(t, e);
      break;
    }
    default:
      ca(t, e);
  }
}
function Bb(t, e) {
  switch (e.tagID) {
    case f.COLGROUP: {
      t.openElements.currentTagId === f.COLGROUP && (t.openElements.pop(), t.insertionMode = x.IN_TABLE);
      break;
    }
    case f.TEMPLATE: {
      Cs(t, e);
      break;
    }
    case f.COL:
      break;
    default:
      ca(t, e);
  }
}
function ca(t, e) {
  t.openElements.currentTagId === f.COLGROUP && (t.openElements.pop(), t.insertionMode = x.IN_TABLE, t._processToken(e));
}
function La(t, e) {
  switch (e.tagID) {
    case f.TR: {
      t.openElements.clearBackToTableBodyContext(), t._insertElement(e, K.HTML), t.insertionMode = x.IN_ROW;
      break;
    }
    case f.TH:
    case f.TD: {
      t.openElements.clearBackToTableBodyContext(), t._insertFakeElement(k.TR, f.TR), t.insertionMode = x.IN_ROW, Oa(t, e);
      break;
    }
    case f.CAPTION:
    case f.COL:
    case f.COLGROUP:
    case f.TBODY:
    case f.TFOOT:
    case f.THEAD: {
      t.openElements.hasTableBodyContextInTableScope() && (t.openElements.clearBackToTableBodyContext(), t.openElements.pop(), t.insertionMode = x.IN_TABLE, Us(t, e));
      break;
    }
    default:
      Us(t, e);
  }
}
function Bu(t, e) {
  const n = e.tagID;
  switch (e.tagID) {
    case f.TBODY:
    case f.TFOOT:
    case f.THEAD: {
      t.openElements.hasInTableScope(n) && (t.openElements.clearBackToTableBodyContext(), t.openElements.pop(), t.insertionMode = x.IN_TABLE);
      break;
    }
    case f.TABLE: {
      t.openElements.hasTableBodyContextInTableScope() && (t.openElements.clearBackToTableBodyContext(), t.openElements.pop(), t.insertionMode = x.IN_TABLE, pi(t, e));
      break;
    }
    case f.BODY:
    case f.CAPTION:
    case f.COL:
    case f.COLGROUP:
    case f.HTML:
    case f.TD:
    case f.TH:
    case f.TR:
      break;
    default:
      pi(t, e);
  }
}
function Oa(t, e) {
  switch (e.tagID) {
    case f.TH:
    case f.TD: {
      t.openElements.clearBackToTableRowContext(), t._insertElement(e, K.HTML), t.insertionMode = x.IN_CELL, t.activeFormattingElements.insertMarker();
      break;
    }
    case f.CAPTION:
    case f.COL:
    case f.COLGROUP:
    case f.TBODY:
    case f.TFOOT:
    case f.THEAD:
    case f.TR: {
      t.openElements.hasInTableScope(f.TR) && (t.openElements.clearBackToTableRowContext(), t.openElements.pop(), t.insertionMode = x.IN_TABLE_BODY, La(t, e));
      break;
    }
    default:
      Us(t, e);
  }
}
function hh(t, e) {
  switch (e.tagID) {
    case f.TR: {
      t.openElements.hasInTableScope(f.TR) && (t.openElements.clearBackToTableRowContext(), t.openElements.pop(), t.insertionMode = x.IN_TABLE_BODY);
      break;
    }
    case f.TABLE: {
      t.openElements.hasInTableScope(f.TR) && (t.openElements.clearBackToTableRowContext(), t.openElements.pop(), t.insertionMode = x.IN_TABLE_BODY, Bu(t, e));
      break;
    }
    case f.TBODY:
    case f.TFOOT:
    case f.THEAD: {
      (t.openElements.hasInTableScope(e.tagID) || t.openElements.hasInTableScope(f.TR)) && (t.openElements.clearBackToTableRowContext(), t.openElements.pop(), t.insertionMode = x.IN_TABLE_BODY, Bu(t, e));
      break;
    }
    case f.BODY:
    case f.CAPTION:
    case f.COL:
    case f.COLGROUP:
    case f.HTML:
    case f.TD:
    case f.TH:
      break;
    default:
      pi(t, e);
  }
}
function Mb(t, e) {
  const n = e.tagID;
  lh.has(n) ? (t.openElements.hasInTableScope(f.TD) || t.openElements.hasInTableScope(f.TH)) && (t._closeTableCell(), Oa(t, e)) : gn(t, e);
}
function Fb(t, e) {
  const n = e.tagID;
  switch (n) {
    case f.TD:
    case f.TH: {
      t.openElements.hasInTableScope(n) && (t.openElements.generateImpliedEndTags(), t.openElements.popUntilTagNamePopped(n), t.activeFormattingElements.clearToLastMarker(), t.insertionMode = x.IN_ROW);
      break;
    }
    case f.TABLE:
    case f.TBODY:
    case f.TFOOT:
    case f.THEAD:
    case f.TR: {
      t.openElements.hasInTableScope(n) && (t._closeTableCell(), hh(t, e));
      break;
    }
    case f.BODY:
    case f.CAPTION:
    case f.COL:
    case f.COLGROUP:
    case f.HTML:
      break;
    default:
      Ra(t, e);
  }
}
function dh(t, e) {
  switch (e.tagID) {
    case f.HTML: {
      gn(t, e);
      break;
    }
    case f.OPTION: {
      t.openElements.currentTagId === f.OPTION && t.openElements.pop(), t._insertElement(e, K.HTML);
      break;
    }
    case f.OPTGROUP: {
      t.openElements.currentTagId === f.OPTION && t.openElements.pop(), t.openElements.currentTagId === f.OPTGROUP && t.openElements.pop(), t._insertElement(e, K.HTML);
      break;
    }
    case f.INPUT:
    case f.KEYGEN:
    case f.TEXTAREA:
    case f.SELECT: {
      t.openElements.hasInSelectScope(f.SELECT) && (t.openElements.popUntilTagNamePopped(f.SELECT), t._resetInsertionMode(), e.tagID !== f.SELECT && t._processStartTag(e));
      break;
    }
    case f.SCRIPT:
    case f.TEMPLATE: {
      Or(t, e);
      break;
    }
  }
}
function ph(t, e) {
  switch (e.tagID) {
    case f.OPTGROUP: {
      t.openElements.stackTop > 0 && t.openElements.currentTagId === f.OPTION && t.openElements.tagIDs[t.openElements.stackTop - 1] === f.OPTGROUP && t.openElements.pop(), t.openElements.currentTagId === f.OPTGROUP && t.openElements.pop();
      break;
    }
    case f.OPTION: {
      t.openElements.currentTagId === f.OPTION && t.openElements.pop();
      break;
    }
    case f.SELECT: {
      t.openElements.hasInSelectScope(f.SELECT) && (t.openElements.popUntilTagNamePopped(f.SELECT), t._resetInsertionMode());
      break;
    }
    case f.TEMPLATE: {
      Cs(t, e);
      break;
    }
  }
}
function kb(t, e) {
  const n = e.tagID;
  n === f.CAPTION || n === f.TABLE || n === f.TBODY || n === f.TFOOT || n === f.THEAD || n === f.TR || n === f.TD || n === f.TH ? (t.openElements.popUntilTagNamePopped(f.SELECT), t._resetInsertionMode(), t._processStartTag(e)) : dh(t, e);
}
function Ub(t, e) {
  const n = e.tagID;
  n === f.CAPTION || n === f.TABLE || n === f.TBODY || n === f.TFOOT || n === f.THEAD || n === f.TR || n === f.TD || n === f.TH ? t.openElements.hasInTableScope(n) && (t.openElements.popUntilTagNamePopped(f.SELECT), t._resetInsertionMode(), t.onEndTag(e)) : ph(t, e);
}
function Hb(t, e) {
  switch (e.tagID) {
    case f.BASE:
    case f.BASEFONT:
    case f.BGSOUND:
    case f.LINK:
    case f.META:
    case f.NOFRAMES:
    case f.SCRIPT:
    case f.STYLE:
    case f.TEMPLATE:
    case f.TITLE: {
      Or(t, e);
      break;
    }
    case f.CAPTION:
    case f.COLGROUP:
    case f.TBODY:
    case f.TFOOT:
    case f.THEAD: {
      t.tmplInsertionModeStack[0] = x.IN_TABLE, t.insertionMode = x.IN_TABLE, Us(t, e);
      break;
    }
    case f.COL: {
      t.tmplInsertionModeStack[0] = x.IN_COLUMN_GROUP, t.insertionMode = x.IN_COLUMN_GROUP, Eo(t, e);
      break;
    }
    case f.TR: {
      t.tmplInsertionModeStack[0] = x.IN_TABLE_BODY, t.insertionMode = x.IN_TABLE_BODY, La(t, e);
      break;
    }
    case f.TD:
    case f.TH: {
      t.tmplInsertionModeStack[0] = x.IN_ROW, t.insertionMode = x.IN_ROW, Oa(t, e);
      break;
    }
    default:
      t.tmplInsertionModeStack[0] = x.IN_BODY, t.insertionMode = x.IN_BODY, gn(t, e);
  }
}
function qb(t, e) {
  e.tagID === f.TEMPLATE && Cs(t, e);
}
function gh(t, e) {
  t.openElements.tmplCount > 0 ? (t.openElements.popUntilTagNamePopped(f.TEMPLATE), t.activeFormattingElements.clearToLastMarker(), t.tmplInsertionModeStack.shift(), t._resetInsertionMode(), t.onEof(e)) : go(t, e);
}
function $b(t, e) {
  e.tagID === f.HTML ? gn(t, e) : fa(t, e);
}
function Eh(t, e) {
  var n;
  if (e.tagID === f.HTML) {
    if (t.fragmentContext || (t.insertionMode = x.AFTER_AFTER_BODY), t.options.sourceCodeLocationInfo && t.openElements.tagIDs[0] === f.HTML) {
      t._setEndLocation(t.openElements.items[0], e);
      const r = t.openElements.items[1];
      r && !(!((n = t.treeAdapter.getNodeSourceCodeLocation(r)) === null || n === void 0) && n.endTag) && t._setEndLocation(r, e);
    }
  } else
    fa(t, e);
}
function fa(t, e) {
  t.insertionMode = x.IN_BODY, xa(t, e);
}
function Gb(t, e) {
  switch (e.tagID) {
    case f.HTML: {
      gn(t, e);
      break;
    }
    case f.FRAMESET: {
      t._insertElement(e, K.HTML);
      break;
    }
    case f.FRAME: {
      t._appendElement(e, K.HTML), e.ackSelfClosing = !0;
      break;
    }
    case f.NOFRAMES: {
      Or(t, e);
      break;
    }
  }
}
function Yb(t, e) {
  e.tagID === f.FRAMESET && !t.openElements.isRootHtmlElementCurrent() && (t.openElements.pop(), !t.fragmentContext && t.openElements.currentTagId !== f.FRAMESET && (t.insertionMode = x.AFTER_FRAMESET));
}
function Vb(t, e) {
  switch (e.tagID) {
    case f.HTML: {
      gn(t, e);
      break;
    }
    case f.NOFRAMES: {
      Or(t, e);
      break;
    }
  }
}
function jb(t, e) {
  e.tagID === f.HTML && (t.insertionMode = x.AFTER_AFTER_FRAMESET);
}
function Wb(t, e) {
  e.tagID === f.HTML ? gn(t, e) : zi(t, e);
}
function zi(t, e) {
  t.insertionMode = x.IN_BODY, xa(t, e);
}
function Qb(t, e) {
  switch (e.tagID) {
    case f.HTML: {
      gn(t, e);
      break;
    }
    case f.NOFRAMES: {
      Or(t, e);
      break;
    }
  }
}
function Kb(t, e) {
  e.chars = me, t._insertCharacters(e);
}
function Xb(t, e) {
  t._insertCharacters(e), t.framesetOk = !1;
}
function mh(t) {
  for (; t.treeAdapter.getNamespaceURI(t.openElements.current) !== K.HTML && !t._isIntegrationPoint(t.openElements.currentTagId, t.openElements.current); )
    t.openElements.pop();
}
function zb(t, e) {
  if (hm(e))
    mh(t), t._startTagOutsideForeignContent(e);
  else {
    const n = t._getAdjustedCurrentElement(), r = t.treeAdapter.getNamespaceURI(n);
    r === K.MATHML ? Zl(e) : r === K.SVG && (dm(e), th(e)), ho(e), e.selfClosing ? t._appendElement(e, r) : t._insertElement(e, r), e.ackSelfClosing = !0;
  }
}
function Jb(t, e) {
  if (e.tagID === f.P || e.tagID === f.BR) {
    mh(t), t._endTagOutsideForeignContent(e);
    return;
  }
  for (let n = t.openElements.stackTop; n > 0; n--) {
    const r = t.openElements.items[n];
    if (t.treeAdapter.getNamespaceURI(r) === K.HTML) {
      t._endTagOutsideForeignContent(e);
      break;
    }
    const a = t.treeAdapter.getTagName(r);
    if (a.toLowerCase() === e.tagName) {
      e.tagName = a, t.openElements.shortenToLength(n);
      break;
    }
  }
}
const Zb = /* @__PURE__ */ new Set([
  k.AREA,
  k.BASE,
  k.BASEFONT,
  k.BGSOUND,
  k.BR,
  k.COL,
  k.EMBED,
  k.FRAME,
  k.HR,
  k.IMG,
  k.INPUT,
  k.KEYGEN,
  k.LINK,
  k.META,
  k.PARAM,
  k.SOURCE,
  k.TRACK,
  k.WBR
]);
function t_(t, e) {
  return e.treeAdapter.isElementNode(t) && e.treeAdapter.getNamespaceURI(t) === K.HTML && Zb.has(e.treeAdapter.getTagName(t));
}
const e_ = { treeAdapter: ps, scriptingEnabled: !0 };
function n_(t, e) {
  const n = { ...e_, ...e };
  return bh(t, n);
}
function r_(t, e) {
  let n = "";
  const r = e.treeAdapter.isElementNode(t) && e.treeAdapter.getTagName(t) === k.TEMPLATE && e.treeAdapter.getNamespaceURI(t) === K.HTML ? e.treeAdapter.getTemplateContent(t) : t, a = e.treeAdapter.getChildNodes(r);
  if (a)
    for (const u of a)
      n += bh(u, e);
  return n;
}
function bh(t, e) {
  return e.treeAdapter.isElementNode(t) ? s_(t, e) : e.treeAdapter.isTextNode(t) ? a_(t, e) : e.treeAdapter.isCommentNode(t) ? u_(t, e) : e.treeAdapter.isDocumentTypeNode(t) ? o_(t, e) : "";
}
function s_(t, e) {
  const n = e.treeAdapter.getTagName(t);
  return `<${n}${i_(t, e)}>${t_(t, e) ? "" : `${r_(t, e)}</${n}>`}`;
}
function i_(t, { treeAdapter: e }) {
  let n = "";
  for (const r of e.getAttrList(t)) {
    if (n += " ", !r.namespace)
      n += r.name;
    else
      switch (r.namespace) {
        case K.XML: {
          n += `xml:${r.name}`;
          break;
        }
        case K.XMLNS: {
          r.name !== "xmlns" && (n += "xmlns:"), n += r.name;
          break;
        }
        case K.XLINK: {
          n += `xlink:${r.name}`;
          break;
        }
        default:
          n += `${r.prefix}:${r.name}`;
      }
    n += `="${rl(r.value)}"`;
  }
  return n;
}
function a_(t, e) {
  const { treeAdapter: n } = e, r = n.getTextNodeContent(t), a = n.getParentNode(t), u = a && n.isElementNode(a) && n.getTagName(a);
  return u && n.getNamespaceURI(a) === K.HTML && HE(u, e.scriptingEnabled) ? r : sl(r);
}
function u_(t, { treeAdapter: e }) {
  return `<!--${e.getCommentNodeContent(t)}-->`;
}
function o_(t, { treeAdapter: e }) {
  return `<!DOCTYPE ${e.getDocumentTypeNodeName(t)}>`;
}
function c_(t, e) {
  return nh.parse(t, e);
}
function f_(t, e, n) {
  typeof t == "string" && (n = e, e = t, t = null);
  const r = nh.getFragmentParser(t, n);
  return r.tokenizer.write(e, !0), r.getFragment();
}
function Mc(t) {
  return new li(t);
}
function Fc(t) {
  const e = t.includes('"') ? "'" : '"';
  return e + t + e;
}
function l_(t, e, n) {
  let r = "!DOCTYPE ";
  return t && (r += t), e ? r += ` PUBLIC ${Fc(e)}` : n && (r += " SYSTEM"), n && (r += ` ${Fc(n)}`), r;
}
const ws = {
  // Re-exports from domhandler
  isCommentNode: Ta,
  isElementNode: It,
  isTextNode: Ur,
  //Node construction
  createDocument() {
    const t = new bs([]);
    return t["x-mode"] = Fn.NO_QUIRKS, t;
  },
  createDocumentFragment() {
    return new bs([]);
  },
  createElement(t, e, n) {
    const r = /* @__PURE__ */ Object.create(null), a = /* @__PURE__ */ Object.create(null), u = /* @__PURE__ */ Object.create(null);
    for (let h = 0; h < n.length; h++) {
      const m = n[h].name;
      r[m] = n[h].value, a[m] = n[h].namespace, u[m] = n[h].prefix;
    }
    const o = new zu(t, r, []);
    return o.namespace = e, o["x-attribsNamespace"] = a, o["x-attribsPrefix"] = u, o;
  },
  createCommentNode(t) {
    return new Qu(t);
  },
  //Tree mutation
  appendChild(t, e) {
    const n = t.children[t.children.length - 1];
    n && (n.next = e, e.prev = n), t.children.push(e), e.parent = t;
  },
  insertBefore(t, e, n) {
    const r = t.children.indexOf(n), { prev: a } = n;
    a && (a.next = e, e.prev = a), n.prev = e, e.next = n, t.children.splice(r, 0, e), e.parent = t;
  },
  setTemplateContent(t, e) {
    ws.appendChild(t, e);
  },
  getTemplateContent(t) {
    return t.children[0];
  },
  setDocumentType(t, e, n, r) {
    const a = l_(e, n, r);
    let u = t.children.find((o) => Iu(o) && o.name === "!doctype");
    u ? u.data = a ?? null : (u = new Ku("!doctype", a), ws.appendChild(t, u)), u["x-name"] = e ?? void 0, u["x-publicId"] = n ?? void 0, u["x-systemId"] = r ?? void 0;
  },
  setDocumentMode(t, e) {
    t["x-mode"] = e;
  },
  getDocumentMode(t) {
    return t["x-mode"];
  },
  detachNode(t) {
    if (t.parent) {
      const e = t.parent.children.indexOf(t), { prev: n, next: r } = t;
      t.prev = null, t.next = null, n && (n.next = r), r && (r.prev = n), t.parent.children.splice(e, 1), t.parent = null;
    }
  },
  insertText(t, e) {
    const n = t.children[t.children.length - 1];
    n && Ur(n) ? n.data += e : ws.appendChild(t, Mc(e));
  },
  insertTextBefore(t, e, n) {
    const r = t.children[t.children.indexOf(n) - 1];
    r && Ur(r) ? r.data += e : ws.insertBefore(t, Mc(e), n);
  },
  adoptAttributes(t, e) {
    for (let n = 0; n < e.length; n++) {
      const r = e[n].name;
      typeof t.attribs[r] > "u" && (t.attribs[r] = e[n].value, t["x-attribsNamespace"][r] = e[n].namespace, t["x-attribsPrefix"][r] = e[n].prefix);
    }
  },
  //Tree traversing
  getFirstChild(t) {
    return t.children[0];
  },
  getChildNodes(t) {
    return t.children;
  },
  getParentNode(t) {
    return t.parent;
  },
  getAttrList(t) {
    return t.attributes;
  },
  //Node data
  getTagName(t) {
    return t.name;
  },
  getNamespaceURI(t) {
    return t.namespace;
  },
  getTextNodeContent(t) {
    return t.data;
  },
  getCommentNodeContent(t) {
    return t.data;
  },
  getDocumentTypeNodeName(t) {
    var e;
    return (e = t["x-name"]) !== null && e !== void 0 ? e : "";
  },
  getDocumentTypeNodePublicId(t) {
    var e;
    return (e = t["x-publicId"]) !== null && e !== void 0 ? e : "";
  },
  getDocumentTypeNodeSystemId(t) {
    var e;
    return (e = t["x-systemId"]) !== null && e !== void 0 ? e : "";
  },
  //Node types
  isDocumentTypeNode(t) {
    return Iu(t) && t.name === "!doctype";
  },
  // Source code location
  setNodeSourceCodeLocation(t, e) {
    e && (t.startIndex = e.startOffset, t.endIndex = e.endOffset), t.sourceCodeLocation = e;
  },
  getNodeSourceCodeLocation(t) {
    return t.sourceCodeLocation;
  },
  updateNodeSourceCodeLocation(t, e) {
    e.endOffset != null && (t.endIndex = e.endOffset), t.sourceCodeLocation = {
      ...t.sourceCodeLocation,
      ...e
    };
  }
};
function h_(t, e, n, r) {
  const a = {
    scriptingEnabled: typeof e.scriptingEnabled == "boolean" ? e.scriptingEnabled : !0,
    treeAdapter: ws,
    sourceCodeLocationInfo: e.sourceCodeLocationInfo
  };
  return n ? c_(t, a) : f_(r, t, a);
}
const d_ = { treeAdapter: ws };
function p_(t) {
  const e = "length" in t ? t : [t];
  for (let r = 0; r < e.length; r += 1) {
    const a = e[r];
    As(a) && Array.prototype.splice.call(e, r, 1, ...a.children);
  }
  let n = "";
  for (let r = 0; r < e.length; r += 1) {
    const a = e[r];
    n += n_(a, d_);
  }
  return n;
}
var lt;
(function(t) {
  t[t.Tab = 9] = "Tab", t[t.NewLine = 10] = "NewLine", t[t.FormFeed = 12] = "FormFeed", t[t.CarriageReturn = 13] = "CarriageReturn", t[t.Space = 32] = "Space", t[t.ExclamationMark = 33] = "ExclamationMark", t[t.Number = 35] = "Number", t[t.Amp = 38] = "Amp", t[t.SingleQuote = 39] = "SingleQuote", t[t.DoubleQuote = 34] = "DoubleQuote", t[t.Dash = 45] = "Dash", t[t.Slash = 47] = "Slash", t[t.Zero = 48] = "Zero", t[t.Nine = 57] = "Nine", t[t.Semi = 59] = "Semi", t[t.Lt = 60] = "Lt", t[t.Eq = 61] = "Eq", t[t.Gt = 62] = "Gt", t[t.Questionmark = 63] = "Questionmark", t[t.UpperA = 65] = "UpperA", t[t.LowerA = 97] = "LowerA", t[t.UpperF = 70] = "UpperF", t[t.LowerF = 102] = "LowerF", t[t.UpperZ = 90] = "UpperZ", t[t.LowerZ = 122] = "LowerZ", t[t.LowerX = 120] = "LowerX", t[t.OpeningSquareBracket = 91] = "OpeningSquareBracket";
})(lt || (lt = {}));
var J;
(function(t) {
  t[t.Text = 1] = "Text", t[t.BeforeTagName = 2] = "BeforeTagName", t[t.InTagName = 3] = "InTagName", t[t.InSelfClosingTag = 4] = "InSelfClosingTag", t[t.BeforeClosingTagName = 5] = "BeforeClosingTagName", t[t.InClosingTagName = 6] = "InClosingTagName", t[t.AfterClosingTagName = 7] = "AfterClosingTagName", t[t.BeforeAttributeName = 8] = "BeforeAttributeName", t[t.InAttributeName = 9] = "InAttributeName", t[t.AfterAttributeName = 10] = "AfterAttributeName", t[t.BeforeAttributeValue = 11] = "BeforeAttributeValue", t[t.InAttributeValueDq = 12] = "InAttributeValueDq", t[t.InAttributeValueSq = 13] = "InAttributeValueSq", t[t.InAttributeValueNq = 14] = "InAttributeValueNq", t[t.BeforeDeclaration = 15] = "BeforeDeclaration", t[t.InDeclaration = 16] = "InDeclaration", t[t.InProcessingInstruction = 17] = "InProcessingInstruction", t[t.BeforeComment = 18] = "BeforeComment", t[t.CDATASequence = 19] = "CDATASequence", t[t.InSpecialComment = 20] = "InSpecialComment", t[t.InCommentLike = 21] = "InCommentLike", t[t.BeforeSpecialS = 22] = "BeforeSpecialS", t[t.SpecialStartSequence = 23] = "SpecialStartSequence", t[t.InSpecialTag = 24] = "InSpecialTag", t[t.BeforeEntity = 25] = "BeforeEntity", t[t.BeforeNumericEntity = 26] = "BeforeNumericEntity", t[t.InNamedEntity = 27] = "InNamedEntity", t[t.InNumericEntity = 28] = "InNumericEntity", t[t.InHexEntity = 29] = "InHexEntity";
})(J || (J = {}));
function Vr(t) {
  return t === lt.Space || t === lt.NewLine || t === lt.Tab || t === lt.FormFeed || t === lt.CarriageReturn;
}
function Hi(t) {
  return t === lt.Slash || t === lt.Gt || Vr(t);
}
function kc(t) {
  return t >= lt.Zero && t <= lt.Nine;
}
function g_(t) {
  return t >= lt.LowerA && t <= lt.LowerZ || t >= lt.UpperA && t <= lt.UpperZ;
}
function E_(t) {
  return t >= lt.UpperA && t <= lt.UpperF || t >= lt.LowerA && t <= lt.LowerF;
}
var kr;
(function(t) {
  t[t.NoValue = 0] = "NoValue", t[t.Unquoted = 1] = "Unquoted", t[t.Single = 2] = "Single", t[t.Double = 3] = "Double";
})(kr || (kr = {}));
const Pn = {
  Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
  CdataEnd: new Uint8Array([93, 93, 62]),
  CommentEnd: new Uint8Array([45, 45, 62]),
  ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
  StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
  TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101])
  // `</title`
};
let m_ = class {
  constructor({ xmlMode: e = !1, decodeEntities: n = !0 }, r) {
    this.cbs = r, this.state = J.Text, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = J.Text, this.isSpecial = !1, this.running = !0, this.offset = 0, this.currentSequence = void 0, this.sequenceIndex = 0, this.trieIndex = 0, this.trieCurrent = 0, this.entityResult = 0, this.entityExcess = 0, this.xmlMode = e, this.decodeEntities = n, this.entityTrie = e ? Jf : jr;
  }
  reset() {
    this.state = J.Text, this.buffer = "", this.sectionStart = 0, this.index = 0, this.baseState = J.Text, this.currentSequence = void 0, this.running = !0, this.offset = 0;
  }
  write(e) {
    this.offset += this.buffer.length, this.buffer = e, this.parse();
  }
  end() {
    this.running && this.finish();
  }
  pause() {
    this.running = !1;
  }
  resume() {
    this.running = !0, this.index < this.buffer.length + this.offset && this.parse();
  }
  /**
   * The current index within all of the written data.
   */
  getIndex() {
    return this.index;
  }
  /**
   * The start of the current section.
   */
  getSectionStart() {
    return this.sectionStart;
  }
  stateText(e) {
    e === lt.Lt || !this.decodeEntities && this.fastForwardTo(lt.Lt) ? (this.index > this.sectionStart && this.cbs.ontext(this.sectionStart, this.index), this.state = J.BeforeTagName, this.sectionStart = this.index) : this.decodeEntities && e === lt.Amp && (this.state = J.BeforeEntity);
  }
  stateSpecialStartSequence(e) {
    const n = this.sequenceIndex === this.currentSequence.length;
    if (!(n ? (
      // If we are at the end of the sequence, make sure the tag name has ended
      Hi(e)
    ) : (
      // Otherwise, do a case-insensitive comparison
      (e | 32) === this.currentSequence[this.sequenceIndex]
    )))
      this.isSpecial = !1;
    else if (!n) {
      this.sequenceIndex++;
      return;
    }
    this.sequenceIndex = 0, this.state = J.InTagName, this.stateInTagName(e);
  }
  /** Look for an end tag. For <title> tags, also decode entities. */
  stateInSpecialTag(e) {
    if (this.sequenceIndex === this.currentSequence.length) {
      if (e === lt.Gt || Vr(e)) {
        const n = this.index - this.currentSequence.length;
        if (this.sectionStart < n) {
          const r = this.index;
          this.index = n, this.cbs.ontext(this.sectionStart, n), this.index = r;
        }
        this.isSpecial = !1, this.sectionStart = n + 2, this.stateInClosingTagName(e);
        return;
      }
      this.sequenceIndex = 0;
    }
    (e | 32) === this.currentSequence[this.sequenceIndex] ? this.sequenceIndex += 1 : this.sequenceIndex === 0 ? this.currentSequence === Pn.TitleEnd ? this.decodeEntities && e === lt.Amp && (this.state = J.BeforeEntity) : this.fastForwardTo(lt.Lt) && (this.sequenceIndex = 1) : this.sequenceIndex = +(e === lt.Lt);
  }
  stateCDATASequence(e) {
    e === Pn.Cdata[this.sequenceIndex] ? ++this.sequenceIndex === Pn.Cdata.length && (this.state = J.InCommentLike, this.currentSequence = Pn.CdataEnd, this.sequenceIndex = 0, this.sectionStart = this.index + 1) : (this.sequenceIndex = 0, this.state = J.InDeclaration, this.stateInDeclaration(e));
  }
  /**
   * When we wait for one specific character, we can speed things up
   * by skipping through the buffer until we find it.
   *
   * @returns Whether the character was found.
   */
  fastForwardTo(e) {
    for (; ++this.index < this.buffer.length + this.offset; )
      if (this.buffer.charCodeAt(this.index - this.offset) === e)
        return !0;
    return this.index = this.buffer.length + this.offset - 1, !1;
  }
  /**
   * Comments and CDATA end with `-->` and `]]>`.
   *
   * Their common qualities are:
   * - Their end sequences have a distinct character they start with.
   * - That character is then repeated, so we have to check multiple repeats.
   * - All characters but the start character of the sequence can be skipped.
   */
  stateInCommentLike(e) {
    e === this.currentSequence[this.sequenceIndex] ? ++this.sequenceIndex === this.currentSequence.length && (this.currentSequence === Pn.CdataEnd ? this.cbs.oncdata(this.sectionStart, this.index, 2) : this.cbs.oncomment(this.sectionStart, this.index, 2), this.sequenceIndex = 0, this.sectionStart = this.index + 1, this.state = J.Text) : this.sequenceIndex === 0 ? this.fastForwardTo(this.currentSequence[0]) && (this.sequenceIndex = 1) : e !== this.currentSequence[this.sequenceIndex - 1] && (this.sequenceIndex = 0);
  }
  /**
   * HTML only allows ASCII alpha characters (a-z and A-Z) at the beginning of a tag name.
   *
   * XML allows a lot more characters here (@see https://www.w3.org/TR/REC-xml/#NT-NameStartChar).
   * We allow anything that wouldn't end the tag.
   */
  isTagStartChar(e) {
    return this.xmlMode ? !Hi(e) : g_(e);
  }
  startSpecial(e, n) {
    this.isSpecial = !0, this.currentSequence = e, this.sequenceIndex = n, this.state = J.SpecialStartSequence;
  }
  stateBeforeTagName(e) {
    if (e === lt.ExclamationMark)
      this.state = J.BeforeDeclaration, this.sectionStart = this.index + 1;
    else if (e === lt.Questionmark)
      this.state = J.InProcessingInstruction, this.sectionStart = this.index + 1;
    else if (this.isTagStartChar(e)) {
      const n = e | 32;
      this.sectionStart = this.index, !this.xmlMode && n === Pn.TitleEnd[2] ? this.startSpecial(Pn.TitleEnd, 3) : this.state = !this.xmlMode && n === Pn.ScriptEnd[2] ? J.BeforeSpecialS : J.InTagName;
    } else
      e === lt.Slash ? this.state = J.BeforeClosingTagName : (this.state = J.Text, this.stateText(e));
  }
  stateInTagName(e) {
    Hi(e) && (this.cbs.onopentagname(this.sectionStart, this.index), this.sectionStart = -1, this.state = J.BeforeAttributeName, this.stateBeforeAttributeName(e));
  }
  stateBeforeClosingTagName(e) {
    Vr(e) || (e === lt.Gt ? this.state = J.Text : (this.state = this.isTagStartChar(e) ? J.InClosingTagName : J.InSpecialComment, this.sectionStart = this.index));
  }
  stateInClosingTagName(e) {
    (e === lt.Gt || Vr(e)) && (this.cbs.onclosetag(this.sectionStart, this.index), this.sectionStart = -1, this.state = J.AfterClosingTagName, this.stateAfterClosingTagName(e));
  }
  stateAfterClosingTagName(e) {
    (e === lt.Gt || this.fastForwardTo(lt.Gt)) && (this.state = J.Text, this.baseState = J.Text, this.sectionStart = this.index + 1);
  }
  stateBeforeAttributeName(e) {
    e === lt.Gt ? (this.cbs.onopentagend(this.index), this.isSpecial ? (this.state = J.InSpecialTag, this.sequenceIndex = 0) : this.state = J.Text, this.baseState = this.state, this.sectionStart = this.index + 1) : e === lt.Slash ? this.state = J.InSelfClosingTag : Vr(e) || (this.state = J.InAttributeName, this.sectionStart = this.index);
  }
  stateInSelfClosingTag(e) {
    e === lt.Gt ? (this.cbs.onselfclosingtag(this.index), this.state = J.Text, this.baseState = J.Text, this.sectionStart = this.index + 1, this.isSpecial = !1) : Vr(e) || (this.state = J.BeforeAttributeName, this.stateBeforeAttributeName(e));
  }
  stateInAttributeName(e) {
    (e === lt.Eq || Hi(e)) && (this.cbs.onattribname(this.sectionStart, this.index), this.sectionStart = -1, this.state = J.AfterAttributeName, this.stateAfterAttributeName(e));
  }
  stateAfterAttributeName(e) {
    e === lt.Eq ? this.state = J.BeforeAttributeValue : e === lt.Slash || e === lt.Gt ? (this.cbs.onattribend(kr.NoValue, this.index), this.state = J.BeforeAttributeName, this.stateBeforeAttributeName(e)) : Vr(e) || (this.cbs.onattribend(kr.NoValue, this.index), this.state = J.InAttributeName, this.sectionStart = this.index);
  }
  stateBeforeAttributeValue(e) {
    e === lt.DoubleQuote ? (this.state = J.InAttributeValueDq, this.sectionStart = this.index + 1) : e === lt.SingleQuote ? (this.state = J.InAttributeValueSq, this.sectionStart = this.index + 1) : Vr(e) || (this.sectionStart = this.index, this.state = J.InAttributeValueNq, this.stateInAttributeValueNoQuotes(e));
  }
  handleInAttributeValue(e, n) {
    e === n || !this.decodeEntities && this.fastForwardTo(n) ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(n === lt.DoubleQuote ? kr.Double : kr.Single, this.index), this.state = J.BeforeAttributeName) : this.decodeEntities && e === lt.Amp && (this.baseState = this.state, this.state = J.BeforeEntity);
  }
  stateInAttributeValueDoubleQuotes(e) {
    this.handleInAttributeValue(e, lt.DoubleQuote);
  }
  stateInAttributeValueSingleQuotes(e) {
    this.handleInAttributeValue(e, lt.SingleQuote);
  }
  stateInAttributeValueNoQuotes(e) {
    Vr(e) || e === lt.Gt ? (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = -1, this.cbs.onattribend(kr.Unquoted, this.index), this.state = J.BeforeAttributeName, this.stateBeforeAttributeName(e)) : this.decodeEntities && e === lt.Amp && (this.baseState = this.state, this.state = J.BeforeEntity);
  }
  stateBeforeDeclaration(e) {
    e === lt.OpeningSquareBracket ? (this.state = J.CDATASequence, this.sequenceIndex = 0) : this.state = e === lt.Dash ? J.BeforeComment : J.InDeclaration;
  }
  stateInDeclaration(e) {
    (e === lt.Gt || this.fastForwardTo(lt.Gt)) && (this.cbs.ondeclaration(this.sectionStart, this.index), this.state = J.Text, this.sectionStart = this.index + 1);
  }
  stateInProcessingInstruction(e) {
    (e === lt.Gt || this.fastForwardTo(lt.Gt)) && (this.cbs.onprocessinginstruction(this.sectionStart, this.index), this.state = J.Text, this.sectionStart = this.index + 1);
  }
  stateBeforeComment(e) {
    e === lt.Dash ? (this.state = J.InCommentLike, this.currentSequence = Pn.CommentEnd, this.sequenceIndex = 2, this.sectionStart = this.index + 1) : this.state = J.InDeclaration;
  }
  stateInSpecialComment(e) {
    (e === lt.Gt || this.fastForwardTo(lt.Gt)) && (this.cbs.oncomment(this.sectionStart, this.index, 0), this.state = J.Text, this.sectionStart = this.index + 1);
  }
  stateBeforeSpecialS(e) {
    const n = e | 32;
    n === Pn.ScriptEnd[3] ? this.startSpecial(Pn.ScriptEnd, 4) : n === Pn.StyleEnd[3] ? this.startSpecial(Pn.StyleEnd, 4) : (this.state = J.InTagName, this.stateInTagName(e));
  }
  stateBeforeEntity(e) {
    this.entityExcess = 1, this.entityResult = 0, e === lt.Number ? this.state = J.BeforeNumericEntity : e === lt.Amp || (this.trieIndex = 0, this.trieCurrent = this.entityTrie[0], this.state = J.InNamedEntity, this.stateInNamedEntity(e));
  }
  stateInNamedEntity(e) {
    if (this.entityExcess += 1, this.trieIndex = Ju(this.entityTrie, this.trieCurrent, this.trieIndex + 1, e), this.trieIndex < 0) {
      this.emitNamedEntity(), this.index--;
      return;
    }
    this.trieCurrent = this.entityTrie[this.trieIndex];
    const n = this.trieCurrent & jn.VALUE_LENGTH;
    if (n) {
      const r = (n >> 14) - 1;
      if (!this.allowLegacyEntity() && e !== lt.Semi)
        this.trieIndex += r;
      else {
        const a = this.index - this.entityExcess + 1;
        a > this.sectionStart && this.emitPartial(this.sectionStart, a), this.entityResult = this.trieIndex, this.trieIndex += r, this.entityExcess = 0, this.sectionStart = this.index + 1, r === 0 && this.emitNamedEntity();
      }
    }
  }
  emitNamedEntity() {
    if (this.state = this.baseState, this.entityResult === 0)
      return;
    switch ((this.entityTrie[this.entityResult] & jn.VALUE_LENGTH) >> 14) {
      case 1: {
        this.emitCodePoint(this.entityTrie[this.entityResult] & ~jn.VALUE_LENGTH);
        break;
      }
      case 2: {
        this.emitCodePoint(this.entityTrie[this.entityResult + 1]);
        break;
      }
      case 3:
        this.emitCodePoint(this.entityTrie[this.entityResult + 1]), this.emitCodePoint(this.entityTrie[this.entityResult + 2]);
    }
  }
  stateBeforeNumericEntity(e) {
    (e | 32) === lt.LowerX ? (this.entityExcess++, this.state = J.InHexEntity) : (this.state = J.InNumericEntity, this.stateInNumericEntity(e));
  }
  emitNumericEntity(e) {
    const n = this.index - this.entityExcess - 1;
    n + 2 + +(this.state === J.InHexEntity) !== this.index && (n > this.sectionStart && this.emitPartial(this.sectionStart, n), this.sectionStart = this.index + Number(e), this.emitCodePoint(Zf(this.entityResult))), this.state = this.baseState;
  }
  stateInNumericEntity(e) {
    e === lt.Semi ? this.emitNumericEntity(!0) : kc(e) ? (this.entityResult = this.entityResult * 10 + (e - lt.Zero), this.entityExcess++) : (this.allowLegacyEntity() ? this.emitNumericEntity(!1) : this.state = this.baseState, this.index--);
  }
  stateInHexEntity(e) {
    e === lt.Semi ? this.emitNumericEntity(!0) : kc(e) ? (this.entityResult = this.entityResult * 16 + (e - lt.Zero), this.entityExcess++) : E_(e) ? (this.entityResult = this.entityResult * 16 + ((e | 32) - lt.LowerA + 10), this.entityExcess++) : (this.allowLegacyEntity() ? this.emitNumericEntity(!1) : this.state = this.baseState, this.index--);
  }
  allowLegacyEntity() {
    return !this.xmlMode && (this.baseState === J.Text || this.baseState === J.InSpecialTag);
  }
  /**
   * Remove data that has already been consumed from the buffer.
   */
  cleanup() {
    this.running && this.sectionStart !== this.index && (this.state === J.Text || this.state === J.InSpecialTag && this.sequenceIndex === 0 ? (this.cbs.ontext(this.sectionStart, this.index), this.sectionStart = this.index) : (this.state === J.InAttributeValueDq || this.state === J.InAttributeValueSq || this.state === J.InAttributeValueNq) && (this.cbs.onattribdata(this.sectionStart, this.index), this.sectionStart = this.index));
  }
  shouldContinue() {
    return this.index < this.buffer.length + this.offset && this.running;
  }
  /**
   * Iterates through the buffer, calling the function corresponding to the current state.
   *
   * States that are more likely to be hit are higher up, as a performance improvement.
   */
  parse() {
    for (; this.shouldContinue(); ) {
      const e = this.buffer.charCodeAt(this.index - this.offset);
      switch (this.state) {
        case J.Text: {
          this.stateText(e);
          break;
        }
        case J.SpecialStartSequence: {
          this.stateSpecialStartSequence(e);
          break;
        }
        case J.InSpecialTag: {
          this.stateInSpecialTag(e);
          break;
        }
        case J.CDATASequence: {
          this.stateCDATASequence(e);
          break;
        }
        case J.InAttributeValueDq: {
          this.stateInAttributeValueDoubleQuotes(e);
          break;
        }
        case J.InAttributeName: {
          this.stateInAttributeName(e);
          break;
        }
        case J.InCommentLike: {
          this.stateInCommentLike(e);
          break;
        }
        case J.InSpecialComment: {
          this.stateInSpecialComment(e);
          break;
        }
        case J.BeforeAttributeName: {
          this.stateBeforeAttributeName(e);
          break;
        }
        case J.InTagName: {
          this.stateInTagName(e);
          break;
        }
        case J.InClosingTagName: {
          this.stateInClosingTagName(e);
          break;
        }
        case J.BeforeTagName: {
          this.stateBeforeTagName(e);
          break;
        }
        case J.AfterAttributeName: {
          this.stateAfterAttributeName(e);
          break;
        }
        case J.InAttributeValueSq: {
          this.stateInAttributeValueSingleQuotes(e);
          break;
        }
        case J.BeforeAttributeValue: {
          this.stateBeforeAttributeValue(e);
          break;
        }
        case J.BeforeClosingTagName: {
          this.stateBeforeClosingTagName(e);
          break;
        }
        case J.AfterClosingTagName: {
          this.stateAfterClosingTagName(e);
          break;
        }
        case J.BeforeSpecialS: {
          this.stateBeforeSpecialS(e);
          break;
        }
        case J.InAttributeValueNq: {
          this.stateInAttributeValueNoQuotes(e);
          break;
        }
        case J.InSelfClosingTag: {
          this.stateInSelfClosingTag(e);
          break;
        }
        case J.InDeclaration: {
          this.stateInDeclaration(e);
          break;
        }
        case J.BeforeDeclaration: {
          this.stateBeforeDeclaration(e);
          break;
        }
        case J.BeforeComment: {
          this.stateBeforeComment(e);
          break;
        }
        case J.InProcessingInstruction: {
          this.stateInProcessingInstruction(e);
          break;
        }
        case J.InNamedEntity: {
          this.stateInNamedEntity(e);
          break;
        }
        case J.BeforeEntity: {
          this.stateBeforeEntity(e);
          break;
        }
        case J.InHexEntity: {
          this.stateInHexEntity(e);
          break;
        }
        case J.InNumericEntity: {
          this.stateInNumericEntity(e);
          break;
        }
        default:
          this.stateBeforeNumericEntity(e);
      }
      this.index++;
    }
    this.cleanup();
  }
  finish() {
    this.state === J.InNamedEntity && this.emitNamedEntity(), this.sectionStart < this.index && this.handleTrailingData(), this.cbs.onend();
  }
  /** Handle any trailing data. */
  handleTrailingData() {
    const e = this.buffer.length + this.offset;
    this.state === J.InCommentLike ? this.currentSequence === Pn.CdataEnd ? this.cbs.oncdata(this.sectionStart, e, 0) : this.cbs.oncomment(this.sectionStart, e, 0) : this.state === J.InNumericEntity && this.allowLegacyEntity() ? this.emitNumericEntity(!1) : this.state === J.InHexEntity && this.allowLegacyEntity() ? this.emitNumericEntity(!1) : this.state === J.InTagName || this.state === J.BeforeAttributeName || this.state === J.BeforeAttributeValue || this.state === J.AfterAttributeName || this.state === J.InAttributeName || this.state === J.InAttributeValueSq || this.state === J.InAttributeValueDq || this.state === J.InAttributeValueNq || this.state === J.InClosingTagName || this.cbs.ontext(this.sectionStart, e);
  }
  emitPartial(e, n) {
    this.baseState !== J.Text && this.baseState !== J.InSpecialTag ? this.cbs.onattribdata(e, n) : this.cbs.ontext(e, n);
  }
  emitCodePoint(e) {
    this.baseState !== J.Text && this.baseState !== J.InSpecialTag ? this.cbs.onattribentity(e) : this.cbs.ontextentity(e);
  }
};
const Ls = /* @__PURE__ */ new Set([
  "input",
  "option",
  "optgroup",
  "select",
  "button",
  "datalist",
  "textarea"
]), ne = /* @__PURE__ */ new Set(["p"]), Uc = /* @__PURE__ */ new Set(["thead", "tbody"]), Hc = /* @__PURE__ */ new Set(["dd", "dt"]), qc = /* @__PURE__ */ new Set(["rt", "rp"]), b_ = /* @__PURE__ */ new Map([
  ["tr", /* @__PURE__ */ new Set(["tr", "th", "td"])],
  ["th", /* @__PURE__ */ new Set(["th"])],
  ["td", /* @__PURE__ */ new Set(["thead", "th", "td"])],
  ["body", /* @__PURE__ */ new Set(["head", "link", "script"])],
  ["li", /* @__PURE__ */ new Set(["li"])],
  ["p", ne],
  ["h1", ne],
  ["h2", ne],
  ["h3", ne],
  ["h4", ne],
  ["h5", ne],
  ["h6", ne],
  ["select", Ls],
  ["input", Ls],
  ["output", Ls],
  ["button", Ls],
  ["datalist", Ls],
  ["textarea", Ls],
  ["option", /* @__PURE__ */ new Set(["option"])],
  ["optgroup", /* @__PURE__ */ new Set(["optgroup", "option"])],
  ["dd", Hc],
  ["dt", Hc],
  ["address", ne],
  ["article", ne],
  ["aside", ne],
  ["blockquote", ne],
  ["details", ne],
  ["div", ne],
  ["dl", ne],
  ["fieldset", ne],
  ["figcaption", ne],
  ["figure", ne],
  ["footer", ne],
  ["form", ne],
  ["header", ne],
  ["hr", ne],
  ["main", ne],
  ["nav", ne],
  ["ol", ne],
  ["pre", ne],
  ["section", ne],
  ["table", ne],
  ["ul", ne],
  ["rt", qc],
  ["rp", qc],
  ["tbody", Uc],
  ["tfoot", Uc]
]), __ = /* @__PURE__ */ new Set([
  "area",
  "base",
  "basefont",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]), $c = /* @__PURE__ */ new Set(["math", "svg"]), Gc = /* @__PURE__ */ new Set([
  "mi",
  "mo",
  "mn",
  "ms",
  "mtext",
  "annotation-xml",
  "foreignobject",
  "desc",
  "title"
]), T_ = /\s|\//;
let A_ = class {
  constructor(e, n = {}) {
    var r, a, u, o, h;
    this.options = n, this.startIndex = 0, this.endIndex = 0, this.openTagStart = 0, this.tagname = "", this.attribname = "", this.attribvalue = "", this.attribs = null, this.stack = [], this.foreignContext = [], this.buffers = [], this.bufferOffset = 0, this.writeIndex = 0, this.ended = !1, this.cbs = e ?? {}, this.lowerCaseTagNames = (r = n.lowerCaseTags) !== null && r !== void 0 ? r : !n.xmlMode, this.lowerCaseAttributeNames = (a = n.lowerCaseAttributeNames) !== null && a !== void 0 ? a : !n.xmlMode, this.tokenizer = new ((u = n.Tokenizer) !== null && u !== void 0 ? u : m_)(this.options, this), (h = (o = this.cbs).onparserinit) === null || h === void 0 || h.call(o, this);
  }
  // Tokenizer event handlers
  /** @internal */
  ontext(e, n) {
    var r, a;
    const u = this.getSlice(e, n);
    this.endIndex = n - 1, (a = (r = this.cbs).ontext) === null || a === void 0 || a.call(r, u), this.startIndex = n;
  }
  /** @internal */
  ontextentity(e) {
    var n, r;
    const a = this.tokenizer.getSectionStart();
    this.endIndex = a - 1, (r = (n = this.cbs).ontext) === null || r === void 0 || r.call(n, Su(e)), this.startIndex = a;
  }
  isVoidElement(e) {
    return !this.options.xmlMode && __.has(e);
  }
  /** @internal */
  onopentagname(e, n) {
    this.endIndex = n;
    let r = this.getSlice(e, n);
    this.lowerCaseTagNames && (r = r.toLowerCase()), this.emitOpenTag(r);
  }
  emitOpenTag(e) {
    var n, r, a, u;
    this.openTagStart = this.startIndex, this.tagname = e;
    const o = !this.options.xmlMode && b_.get(e);
    if (o)
      for (; this.stack.length > 0 && o.has(this.stack[this.stack.length - 1]); ) {
        const h = this.stack.pop();
        (r = (n = this.cbs).onclosetag) === null || r === void 0 || r.call(n, h, !0);
      }
    this.isVoidElement(e) || (this.stack.push(e), $c.has(e) ? this.foreignContext.push(!0) : Gc.has(e) && this.foreignContext.push(!1)), (u = (a = this.cbs).onopentagname) === null || u === void 0 || u.call(a, e), this.cbs.onopentag && (this.attribs = {});
  }
  endOpenTag(e) {
    var n, r;
    this.startIndex = this.openTagStart, this.attribs && ((r = (n = this.cbs).onopentag) === null || r === void 0 || r.call(n, this.tagname, this.attribs, e), this.attribs = null), this.cbs.onclosetag && this.isVoidElement(this.tagname) && this.cbs.onclosetag(this.tagname, !0), this.tagname = "";
  }
  /** @internal */
  onopentagend(e) {
    this.endIndex = e, this.endOpenTag(!1), this.startIndex = e + 1;
  }
  /** @internal */
  onclosetag(e, n) {
    var r, a, u, o, h, m;
    this.endIndex = n;
    let E = this.getSlice(e, n);
    if (this.lowerCaseTagNames && (E = E.toLowerCase()), ($c.has(E) || Gc.has(E)) && this.foreignContext.pop(), this.isVoidElement(E))
      !this.options.xmlMode && E === "br" && ((a = (r = this.cbs).onopentagname) === null || a === void 0 || a.call(r, "br"), (o = (u = this.cbs).onopentag) === null || o === void 0 || o.call(u, "br", {}, !0), (m = (h = this.cbs).onclosetag) === null || m === void 0 || m.call(h, "br", !1));
    else {
      const p = this.stack.lastIndexOf(E);
      if (p !== -1)
        if (this.cbs.onclosetag) {
          let N = this.stack.length - p;
          for (; N--; )
            this.cbs.onclosetag(this.stack.pop(), N !== 0);
        } else
          this.stack.length = p;
      else
        !this.options.xmlMode && E === "p" && (this.emitOpenTag("p"), this.closeCurrentTag(!0));
    }
    this.startIndex = n + 1;
  }
  /** @internal */
  onselfclosingtag(e) {
    this.endIndex = e, this.options.xmlMode || this.options.recognizeSelfClosing || this.foreignContext[this.foreignContext.length - 1] ? (this.closeCurrentTag(!1), this.startIndex = e + 1) : this.onopentagend(e);
  }
  closeCurrentTag(e) {
    var n, r;
    const a = this.tagname;
    this.endOpenTag(e), this.stack[this.stack.length - 1] === a && ((r = (n = this.cbs).onclosetag) === null || r === void 0 || r.call(n, a, !e), this.stack.pop());
  }
  /** @internal */
  onattribname(e, n) {
    this.startIndex = e;
    const r = this.getSlice(e, n);
    this.attribname = this.lowerCaseAttributeNames ? r.toLowerCase() : r;
  }
  /** @internal */
  onattribdata(e, n) {
    this.attribvalue += this.getSlice(e, n);
  }
  /** @internal */
  onattribentity(e) {
    this.attribvalue += Su(e);
  }
  /** @internal */
  onattribend(e, n) {
    var r, a;
    this.endIndex = n, (a = (r = this.cbs).onattribute) === null || a === void 0 || a.call(r, this.attribname, this.attribvalue, e === kr.Double ? '"' : e === kr.Single ? "'" : e === kr.NoValue ? void 0 : null), this.attribs && !Object.prototype.hasOwnProperty.call(this.attribs, this.attribname) && (this.attribs[this.attribname] = this.attribvalue), this.attribvalue = "";
  }
  getInstructionName(e) {
    const n = e.search(T_);
    let r = n < 0 ? e : e.substr(0, n);
    return this.lowerCaseTagNames && (r = r.toLowerCase()), r;
  }
  /** @internal */
  ondeclaration(e, n) {
    this.endIndex = n;
    const r = this.getSlice(e, n);
    if (this.cbs.onprocessinginstruction) {
      const a = this.getInstructionName(r);
      this.cbs.onprocessinginstruction(`!${a}`, `!${r}`);
    }
    this.startIndex = n + 1;
  }
  /** @internal */
  onprocessinginstruction(e, n) {
    this.endIndex = n;
    const r = this.getSlice(e, n);
    if (this.cbs.onprocessinginstruction) {
      const a = this.getInstructionName(r);
      this.cbs.onprocessinginstruction(`?${a}`, `?${r}`);
    }
    this.startIndex = n + 1;
  }
  /** @internal */
  oncomment(e, n, r) {
    var a, u, o, h;
    this.endIndex = n, (u = (a = this.cbs).oncomment) === null || u === void 0 || u.call(a, this.getSlice(e, n - r)), (h = (o = this.cbs).oncommentend) === null || h === void 0 || h.call(o), this.startIndex = n + 1;
  }
  /** @internal */
  oncdata(e, n, r) {
    var a, u, o, h, m, E, p, N, v, S;
    this.endIndex = n;
    const L = this.getSlice(e, n - r);
    this.options.xmlMode || this.options.recognizeCDATA ? ((u = (a = this.cbs).oncdatastart) === null || u === void 0 || u.call(a), (h = (o = this.cbs).ontext) === null || h === void 0 || h.call(o, L), (E = (m = this.cbs).oncdataend) === null || E === void 0 || E.call(m)) : ((N = (p = this.cbs).oncomment) === null || N === void 0 || N.call(p, `[CDATA[${L}]]`), (S = (v = this.cbs).oncommentend) === null || S === void 0 || S.call(v)), this.startIndex = n + 1;
  }
  /** @internal */
  onend() {
    var e, n;
    if (this.cbs.onclosetag) {
      this.endIndex = this.startIndex;
      for (let r = this.stack.length; r > 0; this.cbs.onclosetag(this.stack[--r], !0))
        ;
    }
    (n = (e = this.cbs).onend) === null || n === void 0 || n.call(e);
  }
  /**
   * Resets the parser to a blank state, ready to parse a new HTML document
   */
  reset() {
    var e, n, r, a;
    (n = (e = this.cbs).onreset) === null || n === void 0 || n.call(e), this.tokenizer.reset(), this.tagname = "", this.attribname = "", this.attribs = null, this.stack.length = 0, this.startIndex = 0, this.endIndex = 0, (a = (r = this.cbs).onparserinit) === null || a === void 0 || a.call(r, this), this.buffers.length = 0, this.bufferOffset = 0, this.writeIndex = 0, this.ended = !1;
  }
  /**
   * Resets the parser, then parses a complete document and
   * pushes it to the handler.
   *
   * @param data Document to parse.
   */
  parseComplete(e) {
    this.reset(), this.end(e);
  }
  getSlice(e, n) {
    for (; e - this.bufferOffset >= this.buffers[0].length; )
      this.shiftBuffer();
    let r = this.buffers[0].slice(e - this.bufferOffset, n - this.bufferOffset);
    for (; n - this.bufferOffset > this.buffers[0].length; )
      this.shiftBuffer(), r += this.buffers[0].slice(0, n - this.bufferOffset);
    return r;
  }
  shiftBuffer() {
    this.bufferOffset += this.buffers[0].length, this.writeIndex--, this.buffers.shift();
  }
  /**
   * Parses a chunk of data and calls the corresponding callbacks.
   *
   * @param chunk Chunk to parse.
   */
  write(e) {
    var n, r;
    if (this.ended) {
      (r = (n = this.cbs).onerror) === null || r === void 0 || r.call(n, new Error(".write() after done!"));
      return;
    }
    this.buffers.push(e), this.tokenizer.running && (this.tokenizer.write(e), this.writeIndex++);
  }
  /**
   * Parses the end of the buffer and clears the stack, calls onend.
   *
   * @param chunk Optional final chunk to parse.
   */
  end(e) {
    var n, r;
    if (this.ended) {
      (r = (n = this.cbs).onerror) === null || r === void 0 || r.call(n, new Error(".end() after done!"));
      return;
    }
    e && this.write(e), this.ended = !0, this.tokenizer.end();
  }
  /**
   * Pauses parsing. The parser won't emit events until `resume` is called.
   */
  pause() {
    this.tokenizer.pause();
  }
  /**
   * Resumes parsing after `pause` was called.
   */
  resume() {
    for (this.tokenizer.resume(); this.tokenizer.running && this.writeIndex < this.buffers.length; )
      this.tokenizer.write(this.buffers[this.writeIndex++]);
    this.ended && this.tokenizer.end();
  }
  /**
   * Alias of `write`, for backwards compatibility.
   *
   * @param chunk Chunk to parse.
   * @deprecated
   */
  parseChunk(e) {
    this.write(e);
  }
  /**
   * Alias of `end`, for backwards compatibility.
   *
   * @param chunk Optional final chunk to parse.
   * @deprecated
   */
  done(e) {
    this.end(e);
  }
};
function y_(t, e) {
  const n = new up(void 0, e);
  return new A_(n, e).end(t), n.root;
}
const C_ = tE((t, e, n, r) => e.xmlMode || e._useHtmlParser2 ? y_(t, e) : h_(t, e, n, r)), I_ = LE(C_, (t, e) => e.xmlMode || e._useHtmlParser2 ? Aa(t, e) : p_(t)), _h = I_([]);
class ts {
  static removeCharacterOfEscapeInAllString(e, n) {
    let r = this.removeCharacterOfEscapeNotAllowed(n), a = "";
    return r == null ? e : (Array.from(e).forEach((u) => {
      r.includes(u) || (a += u);
    }), a);
  }
  static convertOneCharInHexToDec(e) {
    if (e.length == 1) {
      if (e >= "0" && e <= "9")
        return e;
      if (e.toUpperCase() >= "A" && e.toUpperCase() <= "F") {
        e = e.toUpperCase();
        let n;
        switch (e) {
          case "A":
            n = "10";
            break;
          case "B":
            n = "11";
            break;
          case "C":
            n = "12";
            break;
          case "D":
            n = "13";
            break;
          case "E":
            n = "14";
            break;
          case "F":
            n = "15";
            break;
        }
        return n;
      } else
        return;
    }
  }
  static removeCharacterOfEscapeNotAllowed(e) {
    let n = [`
`, "\r", "	", "\f"], r = [];
    return Array.from(e).forEach((a) => {
      n.includes(a) && r.push(a);
    }), r.length > 0 ? r : void 0;
  }
  static hasOnlyWhiteSpace(e) {
    return e.replace(/\s/g, "").length == 0;
  }
}
const S_ = "{\\colortbl ;", N_ = "}";
var Gr = [{ amount: 0 }, []];
class Yc {
  static getRtfColorTable() {
    return S_ + this.getAllColorsDeclaredInColorTable() + N_;
  }
  static getRtfReferenceColor(e) {
    if (e.includes("rgb"))
      return this.getColorInColorTable(this.getRgbValues(e));
    if (e.includes("#"))
      return this.getColorInColorTable(this.convertColorInHexToRgb(e));
  }
  static getRgbValues(e) {
    return e = e.replace(/[\])}[{(rgb:; ]/g, ""), e.split(",");
  }
  static convertColorInHexToRgb(e) {
    let n = [];
    return e = e.replace(/[#; ]/g, ""), e = e.length == 3 ? e[0] + "" + e[0] + e[1] + e[1] + e[2] + e[2] : e, n[2] = Math.pow(16, 1) * ts.convertOneCharInHexToDec(e[4]) + Math.pow(16, 0) * ts.convertOneCharInHexToDec(e[5]), n[1] = Math.pow(16, 1) * ts.convertOneCharInHexToDec(e[2]) + Math.pow(16, 0) * ts.convertOneCharInHexToDec(e[3]), n[0] = Math.pow(16, 1) * ts.convertOneCharInHexToDec(e[0]) + Math.pow(16, 0) * ts.convertOneCharInHexToDec(e[1]), n;
  }
  static getColorInColorTable(e) {
    return this.verifyIfColorExistsInColorTable(e) ? this.getRtfReferenceColorInColorTable(e) : (this.addColorInColorTable(e), this.getRtfReferenceColorInColorTable(e));
  }
  static verifyIfColorExistsInColorTable(e) {
    let n = !1;
    return Gr[1].forEach((a) => {
      a.red == e[0] && a.green == e[1] && a.blue == e[2] && (n = !0);
    }), n;
  }
  static addColorInColorTable(e) {
    let n, r = 0, a = 1;
    Gr[r].amount++, n = "\\cf" + Gr[r].amount, Gr[a].push({ red: e[0], green: e[1], blue: e[2], reference: n });
  }
  static getRtfReferenceColorInColorTable(e) {
    let n;
    return Gr[1].forEach((r) => {
      r.red == e[0] && r.green == e[1] && r.blue == e[2] && (n = r.reference);
    }), n;
  }
  static getAllColorsDeclaredInColorTable() {
    let e = "";
    return Gr[1].forEach((n) => e += "\\red" + n.red + "\\green" + n.green + "\\blue" + n.blue + ";"), e;
  }
  static cleanColorTable() {
    Gr[0].amount = 0, Gr[1] = [];
  }
  static getColorTable() {
    return Gr;
  }
}
var v_ = [
  { name: "center", reference: "\\qc" },
  { name: "left", reference: "\\ql" },
  { name: "right", reference: "\\qr" },
  { name: "justify", reference: "\\qj" }
];
class x_ {
  static getRtfAlignmentReference(e) {
    let n;
    return v_.forEach((r) => {
      r.name == e.trim() && (n = r.reference);
    }), n;
  }
}
const R_ = "\\fs", L_ = 0.75;
class O_ {
  static getRtfFontSizeReference(e) {
    if (e.includes("px"))
      return this.getFontSizeReferenceInPx(e);
  }
  static getFontSizeReferenceInPx(e) {
    return R_ + Math.trunc(parseFloat(e) * L_);
  }
}
const qi = [
  { propertyName: "color", allowed: !0 },
  { propertyName: "font-size", allowed: !0 },
  { propertyName: "text-align", allowed: !0 },
  { propertyName: "background", allowed: !1 }
];
class w_ {
  static isTagAllowed(e) {
    let n = !1;
    for (let r = 0; r < qi.length; r++)
      if (qi[r].propertyName == e)
        return qi[r].allowed == !0;
    return n;
  }
  static getAllowedTags() {
    let e = [];
    return qi.forEach((n) => {
      n.allowed && e.push(n);
    }), e;
  }
}
const $i = _h.load("");
class Gi {
  static getRtfReferenceColor(e) {
    return Yc.getRtfReferenceColor(e);
  }
  static getRtfColorTable() {
    return Yc.getRtfColorTable();
  }
  static getRtfAlignmentReference(e) {
    return x_.getRtfAlignmentReference(e);
  }
  static getRtfFontSizeReference(e) {
    return O_.getRtfFontSizeReference(e);
  }
  static getRtfReferencesInStyleProperty(e) {
    if (e == "")
      return;
    let n = "<span style='" + e + "'></span>", r = "";
    if (w_.getAllowedTags().forEach((a) => {
      if ($i(n).css(a.propertyName) != null)
        switch (a.propertyName) {
          case "color":
            r += this.getRtfReferenceColor($i(n).css(a.propertyName));
            break;
          case "font-size":
            r += this.getRtfFontSizeReference($i(n).css(a.propertyName));
            break;
          case "text-align":
            r += this.getRtfAlignmentReference($i(n).css(a.propertyName));
            break;
        }
    }), r != "")
      return r;
  }
}
const zs = [
  { opening: "b", openingRtf: "{\\b", closing: "/b", closingRtf: "}" },
  { opening: "br", openingRtf: "\\line", closing: "br/", closingRtf: "\\line" },
  { opening: "center", openingRtf: "{\\pard\\qr", closing: "/center", closingRtf: "\\par}" },
  { opening: "div", openingRtf: "{\\pard", closing: "/div", closingRtf: "\\sb70\\par}" },
  { opening: "em", openingRtf: "{\\b", closing: "/em", closingRtf: "}" },
  { opening: "font", openingRtf: "{", closing: "/font", closingRtf: "}" },
  { opening: "h1", openingRtf: "{\\pard", closing: "/h1", closingRtf: "\\sb70\\par}" },
  { opening: "h2", openingRtf: "{\\pard", closing: "/h2", closingRtf: "\\sb70\\par}" },
  { opening: "h3", openingRtf: "{\\pard", closing: "/h3", closingRtf: "\\sb70\\par}" },
  { opening: "h4", openingRtf: "{\\pard", closing: "/h4", closingRtf: "\\sb70\\par}" },
  { opening: "h5", openingRtf: "{\\pard", closing: "/h5", closingRtf: "\\sb70\\par}" },
  { opening: "h6", openingRtf: "{\\pard", closing: "/h6", closingRtf: "\\sb70\\par}" },
  { opening: "i", openingRtf: "{\\i", closing: "/i", closingRtf: "}" },
  { opening: "li", openingRtf: "{\\pntext\\tab}", closing: "/li", closingRtf: "\\par" },
  { opening: "mark", openingRtf: "{", closing: "/mark", closingRtf: "}" },
  { opening: "p", openingRtf: "{\\pard", closing: "/p", closingRtf: "\\sb70\\par}" },
  { opening: "ol", openingRtf: "{{\\*\\pn\\pnlvlbody\\pnf0\\pnindent0\\pnstart1\\pndec{\\pntxta.}}\\fi-360\\li720\\sa200\\sl276\\slmult1", closing: "/ol", closingRtf: "}" },
  { opening: "s", openingRtf: "{\\strike", closing: "/s", closingRtf: "}" },
  { opening: "span", openingRtf: "{", closing: "/span", closingRtf: "}" },
  { opening: "sub", openingRtf: "{\\sub", closing: "/sub", closingRtf: "}" },
  { opening: "sup", openingRtf: "{\\super", closing: "/sup", closingRtf: "}" },
  { opening: "strong", openingRtf: "{\\b", closing: "/strong", closingRtf: "}" },
  { opening: "table", openingRtf: "{", closing: "/table", closingRtf: "}" },
  { opening: "td", openingRtf: "{\\pard\\intbl\\qc", closing: "/td", closingRtf: "\\cell}" },
  { opening: "th", openingRtf: "{\\pard\\intbl\\qc", closing: "/th", closingRtf: "\\cell}" },
  { opening: "tr", openingRtf: "{\\trowd\\trgaph10", closing: "/tr", closingRtf: "\\row}" },
  { opening: "u", openingRtf: "{\\ul", closing: "/u", closingRtf: "}" },
  { opening: "ul", openingRtf: "{{\\*\\pn\\pnlvlblt\\pnf1\\pnindent0{\\pntxtb\\'B7}}\\fi-360\\li720\\sa200\\sl276\\slmult1\\lang22\\f0\\fs22", closing: "/ul", closingRtf: "}" }
];
class Vc {
  static getRtfReferenceTag(e) {
    e = e.toLowerCase();
    for (let n = 0; n < zs.length; n++) {
      if (zs[n].opening == e)
        return zs[n].openingRtf;
      if (zs[n].closing == e)
        return zs[n].closingRtf;
    }
  }
}
class D_ {
  constructor() {
    this.rtfReferenceRow = "\\clbrdrt\\brdrw15\\brdrs\\clbrdrl\\brdrw15\\brdrs\\clbrdrb\\brdrw15\\brdrs\\clbrdrr\\brdrw15\\brdrs\\cellx", this.amountOfColumns = 0, this.defaultLengthOfPageInTwips = 8503;
  }
  setAmountOfColumns(e) {
    this.amountOfColumns = e;
  }
  getAmountOfColumns() {
    return this.amountOfColumns;
  }
  getCellLength() {
    return Math.floor(this.defaultLengthOfPageInTwips / parseInt(this.amountOfColumns));
  }
  getRtfReferenceRow() {
    return this.rtfReferenceRow;
  }
  buildCellsLengthOfEachColumn() {
    let e = "";
    for (let n = 0; n < this.amountOfColumns; n++)
      e += this.rtfReferenceRow + (this.getCellLength() * n + this.getCellLength());
    return e;
  }
}
var Th = { exports: {} }, Mu = { exports: {} }, su = { exports: {} }, Fu = { exports: {} }, iu = { exports: {} };
const P_ = {
  0: 65533,
  128: 8364,
  130: 8218,
  131: 402,
  132: 8222,
  133: 8230,
  134: 8224,
  135: 8225,
  136: 710,
  137: 8240,
  138: 352,
  139: 8249,
  140: 338,
  142: 381,
  145: 8216,
  146: 8217,
  147: 8220,
  148: 8221,
  149: 8226,
  150: 8211,
  151: 8212,
  152: 732,
  153: 8482,
  154: 353,
  155: 8250,
  156: 339,
  158: 382,
  159: 376
};
var jc = P_, Ah = B_;
function B_(t) {
  if (t >= 55296 && t <= 57343 || t > 1114111)
    return "�";
  t in jc && (t = jc[t]);
  var e = "";
  return t > 65535 && (t -= 65536, e += String.fromCharCode(t >>> 10 & 1023 | 55296), t = 56320 | t & 1023), e += String.fromCharCode(t), e;
}
const M_ = "Á", F_ = "á", k_ = "Ă", U_ = "ă", H_ = "∾", q_ = "∿", $_ = "∾̳", G_ = "Â", Y_ = "â", V_ = "´", j_ = "А", W_ = "а", Q_ = "Æ", K_ = "æ", X_ = "⁡", z_ = "𝔄", J_ = "𝔞", Z_ = "À", tT = "à", eT = "ℵ", nT = "ℵ", rT = "Α", sT = "α", iT = "Ā", aT = "ā", uT = "⨿", oT = "&", cT = "&", fT = "⩕", lT = "⩓", hT = "∧", dT = "⩜", pT = "⩘", gT = "⩚", ET = "∠", mT = "⦤", bT = "∠", _T = "⦨", TT = "⦩", AT = "⦪", yT = "⦫", CT = "⦬", IT = "⦭", ST = "⦮", NT = "⦯", vT = "∡", xT = "∟", RT = "⊾", LT = "⦝", OT = "∢", wT = "Å", DT = "⍼", PT = "Ą", BT = "ą", MT = "𝔸", FT = "𝕒", kT = "⩯", UT = "≈", HT = "⩰", qT = "≊", $T = "≋", GT = "'", YT = "⁡", VT = "≈", jT = "≊", WT = "Å", QT = "å", KT = "𝒜", XT = "𝒶", zT = "≔", JT = "*", ZT = "≈", tA = "≍", eA = "Ã", nA = "ã", rA = "Ä", sA = "ä", iA = "∳", aA = "⨑", uA = "≌", oA = "϶", cA = "‵", fA = "∽", lA = "⋍", hA = "∖", dA = "⫧", pA = "⊽", gA = "⌅", EA = "⌆", mA = "⌅", bA = "⎵", _A = "⎶", TA = "≌", AA = "Б", yA = "б", CA = "„", IA = "∵", SA = "∵", NA = "∵", vA = "⦰", xA = "϶", RA = "ℬ", LA = "ℬ", OA = "Β", wA = "β", DA = "ℶ", PA = "≬", BA = "𝔅", MA = "𝔟", FA = "⋂", kA = "◯", UA = "⋃", HA = "⨀", qA = "⨁", $A = "⨂", GA = "⨆", YA = "★", VA = "▽", jA = "△", WA = "⨄", QA = "⋁", KA = "⋀", XA = "⤍", zA = "⧫", JA = "▪", ZA = "▴", t2 = "▾", e2 = "◂", n2 = "▸", r2 = "␣", s2 = "▒", i2 = "░", a2 = "▓", u2 = "█", o2 = "=⃥", c2 = "≡⃥", f2 = "⫭", l2 = "⌐", h2 = "𝔹", d2 = "𝕓", p2 = "⊥", g2 = "⊥", E2 = "⋈", m2 = "⧉", b2 = "┐", _2 = "╕", T2 = "╖", A2 = "╗", y2 = "┌", C2 = "╒", I2 = "╓", S2 = "╔", N2 = "─", v2 = "═", x2 = "┬", R2 = "╤", L2 = "╥", O2 = "╦", w2 = "┴", D2 = "╧", P2 = "╨", B2 = "╩", M2 = "⊟", F2 = "⊞", k2 = "⊠", U2 = "┘", H2 = "╛", q2 = "╜", $2 = "╝", G2 = "└", Y2 = "╘", V2 = "╙", j2 = "╚", W2 = "│", Q2 = "║", K2 = "┼", X2 = "╪", z2 = "╫", J2 = "╬", Z2 = "┤", ty = "╡", ey = "╢", ny = "╣", ry = "├", sy = "╞", iy = "╟", ay = "╠", uy = "‵", oy = "˘", cy = "˘", fy = "¦", ly = "𝒷", hy = "ℬ", dy = "⁏", py = "∽", gy = "⋍", Ey = "⧅", my = "\\", by = "⟈", _y = "•", Ty = "•", Ay = "≎", yy = "⪮", Cy = "≏", Iy = "≎", Sy = "≏", Ny = "Ć", vy = "ć", xy = "⩄", Ry = "⩉", Ly = "⩋", Oy = "∩", wy = "⋒", Dy = "⩇", Py = "⩀", By = "ⅅ", My = "∩︀", Fy = "⁁", ky = "ˇ", Uy = "ℭ", Hy = "⩍", qy = "Č", $y = "č", Gy = "Ç", Yy = "ç", Vy = "Ĉ", jy = "ĉ", Wy = "∰", Qy = "⩌", Ky = "⩐", Xy = "Ċ", zy = "ċ", Jy = "¸", Zy = "¸", tC = "⦲", eC = "¢", nC = "·", rC = "·", sC = "𝔠", iC = "ℭ", aC = "Ч", uC = "ч", oC = "✓", cC = "✓", fC = "Χ", lC = "χ", hC = "ˆ", dC = "≗", pC = "↺", gC = "↻", EC = "⊛", mC = "⊚", bC = "⊝", _C = "⊙", TC = "®", AC = "Ⓢ", yC = "⊖", CC = "⊕", IC = "⊗", SC = "○", NC = "⧃", vC = "≗", xC = "⨐", RC = "⫯", LC = "⧂", OC = "∲", wC = "”", DC = "’", PC = "♣", BC = "♣", MC = ":", FC = "∷", kC = "⩴", UC = "≔", HC = "≔", qC = ",", $C = "@", GC = "∁", YC = "∘", VC = "∁", jC = "ℂ", WC = "≅", QC = "⩭", KC = "≡", XC = "∮", zC = "∯", JC = "∮", ZC = "𝕔", tI = "ℂ", eI = "∐", nI = "∐", rI = "©", sI = "©", iI = "℗", aI = "∳", uI = "↵", oI = "✗", cI = "⨯", fI = "𝒞", lI = "𝒸", hI = "⫏", dI = "⫑", pI = "⫐", gI = "⫒", EI = "⋯", mI = "⤸", bI = "⤵", _I = "⋞", TI = "⋟", AI = "↶", yI = "⤽", CI = "⩈", II = "⩆", SI = "≍", NI = "∪", vI = "⋓", xI = "⩊", RI = "⊍", LI = "⩅", OI = "∪︀", wI = "↷", DI = "⤼", PI = "⋞", BI = "⋟", MI = "⋎", FI = "⋏", kI = "¤", UI = "↶", HI = "↷", qI = "⋎", $I = "⋏", GI = "∲", YI = "∱", VI = "⌭", jI = "†", WI = "‡", QI = "ℸ", KI = "↓", XI = "↡", zI = "⇓", JI = "‐", ZI = "⫤", tS = "⊣", eS = "⤏", nS = "˝", rS = "Ď", sS = "ď", iS = "Д", aS = "д", uS = "‡", oS = "⇊", cS = "ⅅ", fS = "ⅆ", lS = "⤑", hS = "⩷", dS = "°", pS = "∇", gS = "Δ", ES = "δ", mS = "⦱", bS = "⥿", _S = "𝔇", TS = "𝔡", AS = "⥥", yS = "⇃", CS = "⇂", IS = "´", SS = "˙", NS = "˝", vS = "`", xS = "˜", RS = "⋄", LS = "⋄", OS = "⋄", wS = "♦", DS = "♦", PS = "¨", BS = "ⅆ", MS = "ϝ", FS = "⋲", kS = "÷", US = "÷", HS = "⋇", qS = "⋇", $S = "Ђ", GS = "ђ", YS = "⌞", VS = "⌍", jS = "$", WS = "𝔻", QS = "𝕕", KS = "¨", XS = "˙", zS = "⃜", JS = "≐", ZS = "≑", tN = "≐", eN = "∸", nN = "∔", rN = "⊡", sN = "⌆", iN = "∯", aN = "¨", uN = "⇓", oN = "⇐", cN = "⇔", fN = "⫤", lN = "⟸", hN = "⟺", dN = "⟹", pN = "⇒", gN = "⊨", EN = "⇑", mN = "⇕", bN = "∥", _N = "⤓", TN = "↓", AN = "↓", yN = "⇓", CN = "⇵", IN = "̑", SN = "⇊", NN = "⇃", vN = "⇂", xN = "⥐", RN = "⥞", LN = "⥖", ON = "↽", wN = "⥟", DN = "⥗", PN = "⇁", BN = "↧", MN = "⊤", FN = "⤐", kN = "⌟", UN = "⌌", HN = "𝒟", qN = "𝒹", $N = "Ѕ", GN = "ѕ", YN = "⧶", VN = "Đ", jN = "đ", WN = "⋱", QN = "▿", KN = "▾", XN = "⇵", zN = "⥯", JN = "⦦", ZN = "Џ", t3 = "џ", e3 = "⟿", n3 = "É", r3 = "é", s3 = "⩮", i3 = "Ě", a3 = "ě", u3 = "Ê", o3 = "ê", c3 = "≖", f3 = "≕", l3 = "Э", h3 = "э", d3 = "⩷", p3 = "Ė", g3 = "ė", E3 = "≑", m3 = "ⅇ", b3 = "≒", _3 = "𝔈", T3 = "𝔢", A3 = "⪚", y3 = "È", C3 = "è", I3 = "⪖", S3 = "⪘", N3 = "⪙", v3 = "∈", x3 = "⏧", R3 = "ℓ", L3 = "⪕", O3 = "⪗", w3 = "Ē", D3 = "ē", P3 = "∅", B3 = "∅", M3 = "◻", F3 = "∅", k3 = "▫", U3 = " ", H3 = " ", q3 = " ", $3 = "Ŋ", G3 = "ŋ", Y3 = " ", V3 = "Ę", j3 = "ę", W3 = "𝔼", Q3 = "𝕖", K3 = "⋕", X3 = "⧣", z3 = "⩱", J3 = "ε", Z3 = "Ε", tv = "ε", ev = "ϵ", nv = "≖", rv = "≕", sv = "≂", iv = "⪖", av = "⪕", uv = "⩵", ov = "=", cv = "≂", fv = "≟", lv = "⇌", hv = "≡", dv = "⩸", pv = "⧥", gv = "⥱", Ev = "≓", mv = "ℯ", bv = "ℰ", _v = "≐", Tv = "⩳", Av = "≂", yv = "Η", Cv = "η", Iv = "Ð", Sv = "ð", Nv = "Ë", vv = "ë", xv = "€", Rv = "!", Lv = "∃", Ov = "∃", wv = "ℰ", Dv = "ⅇ", Pv = "ⅇ", Bv = "≒", Mv = "Ф", Fv = "ф", kv = "♀", Uv = "ﬃ", Hv = "ﬀ", qv = "ﬄ", $v = "𝔉", Gv = "𝔣", Yv = "ﬁ", Vv = "◼", jv = "▪", Wv = "fj", Qv = "♭", Kv = "ﬂ", Xv = "▱", zv = "ƒ", Jv = "𝔽", Zv = "𝕗", tx = "∀", ex = "∀", nx = "⋔", rx = "⫙", sx = "ℱ", ix = "⨍", ax = "½", ux = "⅓", ox = "¼", cx = "⅕", fx = "⅙", lx = "⅛", hx = "⅔", dx = "⅖", px = "¾", gx = "⅗", Ex = "⅜", mx = "⅘", bx = "⅚", _x = "⅝", Tx = "⅞", Ax = "⁄", yx = "⌢", Cx = "𝒻", Ix = "ℱ", Sx = "ǵ", Nx = "Γ", vx = "γ", xx = "Ϝ", Rx = "ϝ", Lx = "⪆", Ox = "Ğ", wx = "ğ", Dx = "Ģ", Px = "Ĝ", Bx = "ĝ", Mx = "Г", Fx = "г", kx = "Ġ", Ux = "ġ", Hx = "≥", qx = "≧", $x = "⪌", Gx = "⋛", Yx = "≥", Vx = "≧", jx = "⩾", Wx = "⪩", Qx = "⩾", Kx = "⪀", Xx = "⪂", zx = "⪄", Jx = "⋛︀", Zx = "⪔", tR = "𝔊", eR = "𝔤", nR = "≫", rR = "⋙", sR = "⋙", iR = "ℷ", aR = "Ѓ", uR = "ѓ", oR = "⪥", cR = "≷", fR = "⪒", lR = "⪤", hR = "⪊", dR = "⪊", pR = "⪈", gR = "≩", ER = "⪈", mR = "≩", bR = "⋧", _R = "𝔾", TR = "𝕘", AR = "`", yR = "≥", CR = "⋛", IR = "≧", SR = "⪢", NR = "≷", vR = "⩾", xR = "≳", RR = "𝒢", LR = "ℊ", OR = "≳", wR = "⪎", DR = "⪐", PR = "⪧", BR = "⩺", MR = ">", FR = ">", kR = "≫", UR = "⋗", HR = "⦕", qR = "⩼", $R = "⪆", GR = "⥸", YR = "⋗", VR = "⋛", jR = "⪌", WR = "≷", QR = "≳", KR = "≩︀", XR = "≩︀", zR = "ˇ", JR = " ", ZR = "½", tL = "ℋ", eL = "Ъ", nL = "ъ", rL = "⥈", sL = "↔", iL = "⇔", aL = "↭", uL = "^", oL = "ℏ", cL = "Ĥ", fL = "ĥ", lL = "♥", hL = "♥", dL = "…", pL = "⊹", gL = "𝔥", EL = "ℌ", mL = "ℋ", bL = "⤥", _L = "⤦", TL = "⇿", AL = "∻", yL = "↩", CL = "↪", IL = "𝕙", SL = "ℍ", NL = "―", vL = "─", xL = "𝒽", RL = "ℋ", LL = "ℏ", OL = "Ħ", wL = "ħ", DL = "≎", PL = "≏", BL = "⁃", ML = "‐", FL = "Í", kL = "í", UL = "⁣", HL = "Î", qL = "î", $L = "И", GL = "и", YL = "İ", VL = "Е", jL = "е", WL = "¡", QL = "⇔", KL = "𝔦", XL = "ℑ", zL = "Ì", JL = "ì", ZL = "ⅈ", tO = "⨌", eO = "∭", nO = "⧜", rO = "℩", sO = "Ĳ", iO = "ĳ", aO = "Ī", uO = "ī", oO = "ℑ", cO = "ⅈ", fO = "ℐ", lO = "ℑ", hO = "ı", dO = "ℑ", pO = "⊷", gO = "Ƶ", EO = "⇒", mO = "℅", bO = "∞", _O = "⧝", TO = "ı", AO = "⊺", yO = "∫", CO = "∬", IO = "ℤ", SO = "∫", NO = "⊺", vO = "⋂", xO = "⨗", RO = "⨼", LO = "⁣", OO = "⁢", wO = "Ё", DO = "ё", PO = "Į", BO = "į", MO = "𝕀", FO = "𝕚", kO = "Ι", UO = "ι", HO = "⨼", qO = "¿", $O = "𝒾", GO = "ℐ", YO = "∈", VO = "⋵", jO = "⋹", WO = "⋴", QO = "⋳", KO = "∈", XO = "⁢", zO = "Ĩ", JO = "ĩ", ZO = "І", t6 = "і", e6 = "Ï", n6 = "ï", r6 = "Ĵ", s6 = "ĵ", i6 = "Й", a6 = "й", u6 = "𝔍", o6 = "𝔧", c6 = "ȷ", f6 = "𝕁", l6 = "𝕛", h6 = "𝒥", d6 = "𝒿", p6 = "Ј", g6 = "ј", E6 = "Є", m6 = "є", b6 = "Κ", _6 = "κ", T6 = "ϰ", A6 = "Ķ", y6 = "ķ", C6 = "К", I6 = "к", S6 = "𝔎", N6 = "𝔨", v6 = "ĸ", x6 = "Х", R6 = "х", L6 = "Ќ", O6 = "ќ", w6 = "𝕂", D6 = "𝕜", P6 = "𝒦", B6 = "𝓀", M6 = "⇚", F6 = "Ĺ", k6 = "ĺ", U6 = "⦴", H6 = "ℒ", q6 = "Λ", $6 = "λ", G6 = "⟨", Y6 = "⟪", V6 = "⦑", j6 = "⟨", W6 = "⪅", Q6 = "ℒ", K6 = "«", X6 = "⇤", z6 = "⤟", J6 = "←", Z6 = "↞", tw = "⇐", ew = "⤝", nw = "↩", rw = "↫", sw = "⤹", iw = "⥳", aw = "↢", uw = "⤙", ow = "⤛", cw = "⪫", fw = "⪭", lw = "⪭︀", hw = "⤌", dw = "⤎", pw = "❲", gw = "{", Ew = "[", mw = "⦋", bw = "⦏", _w = "⦍", Tw = "Ľ", Aw = "ľ", yw = "Ļ", Cw = "ļ", Iw = "⌈", Sw = "{", Nw = "Л", vw = "л", xw = "⤶", Rw = "“", Lw = "„", Ow = "⥧", ww = "⥋", Dw = "↲", Pw = "≤", Bw = "≦", Mw = "⟨", Fw = "⇤", kw = "←", Uw = "←", Hw = "⇐", qw = "⇆", $w = "↢", Gw = "⌈", Yw = "⟦", Vw = "⥡", jw = "⥙", Ww = "⇃", Qw = "⌊", Kw = "↽", Xw = "↼", zw = "⇇", Jw = "↔", Zw = "↔", tD = "⇔", eD = "⇆", nD = "⇋", rD = "↭", sD = "⥎", iD = "↤", aD = "⊣", uD = "⥚", oD = "⋋", cD = "⧏", fD = "⊲", lD = "⊴", hD = "⥑", dD = "⥠", pD = "⥘", gD = "↿", ED = "⥒", mD = "↼", bD = "⪋", _D = "⋚", TD = "≤", AD = "≦", yD = "⩽", CD = "⪨", ID = "⩽", SD = "⩿", ND = "⪁", vD = "⪃", xD = "⋚︀", RD = "⪓", LD = "⪅", OD = "⋖", wD = "⋚", DD = "⪋", PD = "⋚", BD = "≦", MD = "≶", FD = "≶", kD = "⪡", UD = "≲", HD = "⩽", qD = "≲", $D = "⥼", GD = "⌊", YD = "𝔏", VD = "𝔩", jD = "≶", WD = "⪑", QD = "⥢", KD = "↽", XD = "↼", zD = "⥪", JD = "▄", ZD = "Љ", t4 = "љ", e4 = "⇇", n4 = "≪", r4 = "⋘", s4 = "⌞", i4 = "⇚", a4 = "⥫", u4 = "◺", o4 = "Ŀ", c4 = "ŀ", f4 = "⎰", l4 = "⎰", h4 = "⪉", d4 = "⪉", p4 = "⪇", g4 = "≨", E4 = "⪇", m4 = "≨", b4 = "⋦", _4 = "⟬", T4 = "⇽", A4 = "⟦", y4 = "⟵", C4 = "⟵", I4 = "⟸", S4 = "⟷", N4 = "⟷", v4 = "⟺", x4 = "⟼", R4 = "⟶", L4 = "⟶", O4 = "⟹", w4 = "↫", D4 = "↬", P4 = "⦅", B4 = "𝕃", M4 = "𝕝", F4 = "⨭", k4 = "⨴", U4 = "∗", H4 = "_", q4 = "↙", $4 = "↘", G4 = "◊", Y4 = "◊", V4 = "⧫", j4 = "(", W4 = "⦓", Q4 = "⇆", K4 = "⌟", X4 = "⇋", z4 = "⥭", J4 = "‎", Z4 = "⊿", t8 = "‹", e8 = "𝓁", n8 = "ℒ", r8 = "↰", s8 = "↰", i8 = "≲", a8 = "⪍", u8 = "⪏", o8 = "[", c8 = "‘", f8 = "‚", l8 = "Ł", h8 = "ł", d8 = "⪦", p8 = "⩹", g8 = "<", E8 = "<", m8 = "≪", b8 = "⋖", _8 = "⋋", T8 = "⋉", A8 = "⥶", y8 = "⩻", C8 = "◃", I8 = "⊴", S8 = "◂", N8 = "⦖", v8 = "⥊", x8 = "⥦", R8 = "≨︀", L8 = "≨︀", O8 = "¯", w8 = "♂", D8 = "✠", P8 = "✠", B8 = "↦", M8 = "↦", F8 = "↧", k8 = "↤", U8 = "↥", H8 = "▮", q8 = "⨩", $8 = "М", G8 = "м", Y8 = "—", V8 = "∺", j8 = "∡", W8 = " ", Q8 = "ℳ", K8 = "𝔐", X8 = "𝔪", z8 = "℧", J8 = "µ", Z8 = "*", tP = "⫰", eP = "∣", nP = "·", rP = "⊟", sP = "−", iP = "∸", aP = "⨪", uP = "∓", oP = "⫛", cP = "…", fP = "∓", lP = "⊧", hP = "𝕄", dP = "𝕞", pP = "∓", gP = "𝓂", EP = "ℳ", mP = "∾", bP = "Μ", _P = "μ", TP = "⊸", AP = "⊸", yP = "∇", CP = "Ń", IP = "ń", SP = "∠⃒", NP = "≉", vP = "⩰̸", xP = "≋̸", RP = "ŉ", LP = "≉", OP = "♮", wP = "ℕ", DP = "♮", PP = " ", BP = "≎̸", MP = "≏̸", FP = "⩃", kP = "Ň", UP = "ň", HP = "Ņ", qP = "ņ", $P = "≇", GP = "⩭̸", YP = "⩂", VP = "Н", jP = "н", WP = "–", QP = "⤤", KP = "↗", XP = "⇗", zP = "↗", JP = "≠", ZP = "≐̸", tB = "​", eB = "​", nB = "​", rB = "​", sB = "≢", iB = "⤨", aB = "≂̸", uB = "≫", oB = "≪", cB = `
`, fB = "∄", lB = "∄", hB = "𝔑", dB = "𝔫", pB = "≧̸", gB = "≱", EB = "≱", mB = "≧̸", bB = "⩾̸", _B = "⩾̸", TB = "⋙̸", AB = "≵", yB = "≫⃒", CB = "≯", IB = "≯", SB = "≫̸", NB = "↮", vB = "⇎", xB = "⫲", RB = "∋", LB = "⋼", OB = "⋺", wB = "∋", DB = "Њ", PB = "њ", BB = "↚", MB = "⇍", FB = "‥", kB = "≦̸", UB = "≰", HB = "↚", qB = "⇍", $B = "↮", GB = "⇎", YB = "≰", VB = "≦̸", jB = "⩽̸", WB = "⩽̸", QB = "≮", KB = "⋘̸", XB = "≴", zB = "≪⃒", JB = "≮", ZB = "⋪", tM = "⋬", eM = "≪̸", nM = "∤", rM = "⁠", sM = " ", iM = "𝕟", aM = "ℕ", uM = "⫬", oM = "¬", cM = "≢", fM = "≭", lM = "∦", hM = "∉", dM = "≠", pM = "≂̸", gM = "∄", EM = "≯", mM = "≱", bM = "≧̸", _M = "≫̸", TM = "≹", AM = "⩾̸", yM = "≵", CM = "≎̸", IM = "≏̸", SM = "∉", NM = "⋵̸", vM = "⋹̸", xM = "∉", RM = "⋷", LM = "⋶", OM = "⧏̸", wM = "⋪", DM = "⋬", PM = "≮", BM = "≰", MM = "≸", FM = "≪̸", kM = "⩽̸", UM = "≴", HM = "⪢̸", qM = "⪡̸", $M = "∌", GM = "∌", YM = "⋾", VM = "⋽", jM = "⊀", WM = "⪯̸", QM = "⋠", KM = "∌", XM = "⧐̸", zM = "⋫", JM = "⋭", ZM = "⊏̸", t5 = "⋢", e5 = "⊐̸", n5 = "⋣", r5 = "⊂⃒", s5 = "⊈", i5 = "⊁", a5 = "⪰̸", u5 = "⋡", o5 = "≿̸", c5 = "⊃⃒", f5 = "⊉", l5 = "≁", h5 = "≄", d5 = "≇", p5 = "≉", g5 = "∤", E5 = "∦", m5 = "∦", b5 = "⫽⃥", _5 = "∂̸", T5 = "⨔", A5 = "⊀", y5 = "⋠", C5 = "⊀", I5 = "⪯̸", S5 = "⪯̸", N5 = "⤳̸", v5 = "↛", x5 = "⇏", R5 = "↝̸", L5 = "↛", O5 = "⇏", w5 = "⋫", D5 = "⋭", P5 = "⊁", B5 = "⋡", M5 = "⪰̸", F5 = "𝒩", k5 = "𝓃", U5 = "∤", H5 = "∦", q5 = "≁", $5 = "≄", G5 = "≄", Y5 = "∤", V5 = "∦", j5 = "⋢", W5 = "⋣", Q5 = "⊄", K5 = "⫅̸", X5 = "⊈", z5 = "⊂⃒", J5 = "⊈", Z5 = "⫅̸", tF = "⊁", eF = "⪰̸", nF = "⊅", rF = "⫆̸", sF = "⊉", iF = "⊃⃒", aF = "⊉", uF = "⫆̸", oF = "≹", cF = "Ñ", fF = "ñ", lF = "≸", hF = "⋪", dF = "⋬", pF = "⋫", gF = "⋭", EF = "Ν", mF = "ν", bF = "#", _F = "№", TF = " ", AF = "≍⃒", yF = "⊬", CF = "⊭", IF = "⊮", SF = "⊯", NF = "≥⃒", vF = ">⃒", xF = "⤄", RF = "⧞", LF = "⤂", OF = "≤⃒", wF = "<⃒", DF = "⊴⃒", PF = "⤃", BF = "⊵⃒", MF = "∼⃒", FF = "⤣", kF = "↖", UF = "⇖", HF = "↖", qF = "⤧", $F = "Ó", GF = "ó", YF = "⊛", VF = "Ô", jF = "ô", WF = "⊚", QF = "О", KF = "о", XF = "⊝", zF = "Ő", JF = "ő", ZF = "⨸", t9 = "⊙", e9 = "⦼", n9 = "Œ", r9 = "œ", s9 = "⦿", i9 = "𝔒", a9 = "𝔬", u9 = "˛", o9 = "Ò", c9 = "ò", f9 = "⧁", l9 = "⦵", h9 = "Ω", d9 = "∮", p9 = "↺", g9 = "⦾", E9 = "⦻", m9 = "‾", b9 = "⧀", _9 = "Ō", T9 = "ō", A9 = "Ω", y9 = "ω", C9 = "Ο", I9 = "ο", S9 = "⦶", N9 = "⊖", v9 = "𝕆", x9 = "𝕠", R9 = "⦷", L9 = "“", O9 = "‘", w9 = "⦹", D9 = "⊕", P9 = "↻", B9 = "⩔", M9 = "∨", F9 = "⩝", k9 = "ℴ", U9 = "ℴ", H9 = "ª", q9 = "º", $9 = "⊶", G9 = "⩖", Y9 = "⩗", V9 = "⩛", j9 = "Ⓢ", W9 = "𝒪", Q9 = "ℴ", K9 = "Ø", X9 = "ø", z9 = "⊘", J9 = "Õ", Z9 = "õ", tk = "⨶", ek = "⨷", nk = "⊗", rk = "Ö", sk = "ö", ik = "⌽", ak = "‾", uk = "⏞", ok = "⎴", ck = "⏜", fk = "¶", lk = "∥", hk = "∥", dk = "⫳", pk = "⫽", gk = "∂", Ek = "∂", mk = "П", bk = "п", _k = "%", Tk = ".", Ak = "‰", yk = "⊥", Ck = "‱", Ik = "𝔓", Sk = "𝔭", Nk = "Φ", vk = "φ", xk = "ϕ", Rk = "ℳ", Lk = "☎", Ok = "Π", wk = "π", Dk = "⋔", Pk = "ϖ", Bk = "ℏ", Mk = "ℎ", Fk = "ℏ", kk = "⨣", Uk = "⊞", Hk = "⨢", qk = "+", $k = "∔", Gk = "⨥", Yk = "⩲", Vk = "±", jk = "±", Wk = "⨦", Qk = "⨧", Kk = "±", Xk = "ℌ", zk = "⨕", Jk = "𝕡", Zk = "ℙ", tU = "£", eU = "⪷", nU = "⪻", rU = "≺", sU = "≼", iU = "⪷", aU = "≺", uU = "≼", oU = "≺", cU = "⪯", fU = "≼", lU = "≾", hU = "⪯", dU = "⪹", pU = "⪵", gU = "⋨", EU = "⪯", mU = "⪳", bU = "≾", _U = "′", TU = "″", AU = "ℙ", yU = "⪹", CU = "⪵", IU = "⋨", SU = "∏", NU = "∏", vU = "⌮", xU = "⌒", RU = "⌓", LU = "∝", OU = "∝", wU = "∷", DU = "∝", PU = "≾", BU = "⊰", MU = "𝒫", FU = "𝓅", kU = "Ψ", UU = "ψ", HU = " ", qU = "𝔔", $U = "𝔮", GU = "⨌", YU = "𝕢", VU = "ℚ", jU = "⁗", WU = "𝒬", QU = "𝓆", KU = "ℍ", XU = "⨖", zU = "?", JU = "≟", ZU = '"', tH = '"', eH = "⇛", nH = "∽̱", rH = "Ŕ", sH = "ŕ", iH = "√", aH = "⦳", uH = "⟩", oH = "⟫", cH = "⦒", fH = "⦥", lH = "⟩", hH = "»", dH = "⥵", pH = "⇥", gH = "⤠", EH = "⤳", mH = "→", bH = "↠", _H = "⇒", TH = "⤞", AH = "↪", yH = "↬", CH = "⥅", IH = "⥴", SH = "⤖", NH = "↣", vH = "↝", xH = "⤚", RH = "⤜", LH = "∶", OH = "ℚ", wH = "⤍", DH = "⤏", PH = "⤐", BH = "❳", MH = "}", FH = "]", kH = "⦌", UH = "⦎", HH = "⦐", qH = "Ř", $H = "ř", GH = "Ŗ", YH = "ŗ", VH = "⌉", jH = "}", WH = "Р", QH = "р", KH = "⤷", XH = "⥩", zH = "”", JH = "”", ZH = "↳", t7 = "ℜ", e7 = "ℛ", n7 = "ℜ", r7 = "ℝ", s7 = "ℜ", i7 = "▭", a7 = "®", u7 = "®", o7 = "∋", c7 = "⇋", f7 = "⥯", l7 = "⥽", h7 = "⌋", d7 = "𝔯", p7 = "ℜ", g7 = "⥤", E7 = "⇁", m7 = "⇀", b7 = "⥬", _7 = "Ρ", T7 = "ρ", A7 = "ϱ", y7 = "⟩", C7 = "⇥", I7 = "→", S7 = "→", N7 = "⇒", v7 = "⇄", x7 = "↣", R7 = "⌉", L7 = "⟧", O7 = "⥝", w7 = "⥕", D7 = "⇂", P7 = "⌋", B7 = "⇁", M7 = "⇀", F7 = "⇄", k7 = "⇌", U7 = "⇉", H7 = "↝", q7 = "↦", $7 = "⊢", G7 = "⥛", Y7 = "⋌", V7 = "⧐", j7 = "⊳", W7 = "⊵", Q7 = "⥏", K7 = "⥜", X7 = "⥔", z7 = "↾", J7 = "⥓", Z7 = "⇀", tq = "˚", eq = "≓", nq = "⇄", rq = "⇌", sq = "‏", iq = "⎱", aq = "⎱", uq = "⫮", oq = "⟭", cq = "⇾", fq = "⟧", lq = "⦆", hq = "𝕣", dq = "ℝ", pq = "⨮", gq = "⨵", Eq = "⥰", mq = ")", bq = "⦔", _q = "⨒", Tq = "⇉", Aq = "⇛", yq = "›", Cq = "𝓇", Iq = "ℛ", Sq = "↱", Nq = "↱", vq = "]", xq = "’", Rq = "’", Lq = "⋌", Oq = "⋊", wq = "▹", Dq = "⊵", Pq = "▸", Bq = "⧎", Mq = "⧴", Fq = "⥨", kq = "℞", Uq = "Ś", Hq = "ś", qq = "‚", $q = "⪸", Gq = "Š", Yq = "š", Vq = "⪼", jq = "≻", Wq = "≽", Qq = "⪰", Kq = "⪴", Xq = "Ş", zq = "ş", Jq = "Ŝ", Zq = "ŝ", t$ = "⪺", e$ = "⪶", n$ = "⋩", r$ = "⨓", s$ = "≿", i$ = "С", a$ = "с", u$ = "⊡", o$ = "⋅", c$ = "⩦", f$ = "⤥", l$ = "↘", h$ = "⇘", d$ = "↘", p$ = "§", g$ = ";", E$ = "⤩", m$ = "∖", b$ = "∖", _$ = "✶", T$ = "𝔖", A$ = "𝔰", y$ = "⌢", C$ = "♯", I$ = "Щ", S$ = "щ", N$ = "Ш", v$ = "ш", x$ = "↓", R$ = "←", L$ = "∣", O$ = "∥", w$ = "→", D$ = "↑", P$ = "­", B$ = "Σ", M$ = "σ", F$ = "ς", k$ = "ς", U$ = "∼", H$ = "⩪", q$ = "≃", $$ = "≃", G$ = "⪞", Y$ = "⪠", V$ = "⪝", j$ = "⪟", W$ = "≆", Q$ = "⨤", K$ = "⥲", X$ = "←", z$ = "∘", J$ = "∖", Z$ = "⨳", tG = "⧤", eG = "∣", nG = "⌣", rG = "⪪", sG = "⪬", iG = "⪬︀", aG = "Ь", uG = "ь", oG = "⌿", cG = "⧄", fG = "/", lG = "𝕊", hG = "𝕤", dG = "♠", pG = "♠", gG = "∥", EG = "⊓", mG = "⊓︀", bG = "⊔", _G = "⊔︀", TG = "√", AG = "⊏", yG = "⊑", CG = "⊏", IG = "⊑", SG = "⊐", NG = "⊒", vG = "⊐", xG = "⊒", RG = "□", LG = "□", OG = "⊓", wG = "⊏", DG = "⊑", PG = "⊐", BG = "⊒", MG = "⊔", FG = "▪", kG = "□", UG = "▪", HG = "→", qG = "𝒮", $G = "𝓈", GG = "∖", YG = "⌣", VG = "⋆", jG = "⋆", WG = "☆", QG = "★", KG = "ϵ", XG = "ϕ", zG = "¯", JG = "⊂", ZG = "⋐", tY = "⪽", eY = "⫅", nY = "⊆", rY = "⫃", sY = "⫁", iY = "⫋", aY = "⊊", uY = "⪿", oY = "⥹", cY = "⊂", fY = "⋐", lY = "⊆", hY = "⫅", dY = "⊆", pY = "⊊", gY = "⫋", EY = "⫇", mY = "⫕", bY = "⫓", _Y = "⪸", TY = "≻", AY = "≽", yY = "≻", CY = "⪰", IY = "≽", SY = "≿", NY = "⪰", vY = "⪺", xY = "⪶", RY = "⋩", LY = "≿", OY = "∋", wY = "∑", DY = "∑", PY = "♪", BY = "¹", MY = "²", FY = "³", kY = "⊃", UY = "⋑", HY = "⪾", qY = "⫘", $Y = "⫆", GY = "⊇", YY = "⫄", VY = "⊃", jY = "⊇", WY = "⟉", QY = "⫗", KY = "⥻", XY = "⫂", zY = "⫌", JY = "⊋", ZY = "⫀", tV = "⊃", eV = "⋑", nV = "⊇", rV = "⫆", sV = "⊋", iV = "⫌", aV = "⫈", uV = "⫔", oV = "⫖", cV = "⤦", fV = "↙", lV = "⇙", hV = "↙", dV = "⤪", pV = "ß", gV = "	", EV = "⌖", mV = "Τ", bV = "τ", _V = "⎴", TV = "Ť", AV = "ť", yV = "Ţ", CV = "ţ", IV = "Т", SV = "т", NV = "⃛", vV = "⌕", xV = "𝔗", RV = "𝔱", LV = "∴", OV = "∴", wV = "∴", DV = "Θ", PV = "θ", BV = "ϑ", MV = "ϑ", FV = "≈", kV = "∼", UV = "  ", HV = " ", qV = " ", $V = "≈", GV = "∼", YV = "Þ", VV = "þ", jV = "˜", WV = "∼", QV = "≃", KV = "≅", XV = "≈", zV = "⨱", JV = "⊠", ZV = "×", tj = "⨰", ej = "∭", nj = "⤨", rj = "⌶", sj = "⫱", ij = "⊤", aj = "𝕋", uj = "𝕥", oj = "⫚", cj = "⤩", fj = "‴", lj = "™", hj = "™", dj = "▵", pj = "▿", gj = "◃", Ej = "⊴", mj = "≜", bj = "▹", _j = "⊵", Tj = "◬", Aj = "≜", yj = "⨺", Cj = "⃛", Ij = "⨹", Sj = "⧍", Nj = "⨻", vj = "⏢", xj = "𝒯", Rj = "𝓉", Lj = "Ц", Oj = "ц", wj = "Ћ", Dj = "ћ", Pj = "Ŧ", Bj = "ŧ", Mj = "≬", Fj = "↞", kj = "↠", Uj = "Ú", Hj = "ú", qj = "↑", $j = "↟", Gj = "⇑", Yj = "⥉", Vj = "Ў", jj = "ў", Wj = "Ŭ", Qj = "ŭ", Kj = "Û", Xj = "û", zj = "У", Jj = "у", Zj = "⇅", tW = "Ű", eW = "ű", nW = "⥮", rW = "⥾", sW = "𝔘", iW = "𝔲", aW = "Ù", uW = "ù", oW = "⥣", cW = "↿", fW = "↾", lW = "▀", hW = "⌜", dW = "⌜", pW = "⌏", gW = "◸", EW = "Ū", mW = "ū", bW = "¨", _W = "_", TW = "⏟", AW = "⎵", yW = "⏝", CW = "⋃", IW = "⊎", SW = "Ų", NW = "ų", vW = "𝕌", xW = "𝕦", RW = "⤒", LW = "↑", OW = "↑", wW = "⇑", DW = "⇅", PW = "↕", BW = "↕", MW = "⇕", FW = "⥮", kW = "↿", UW = "↾", HW = "⊎", qW = "↖", $W = "↗", GW = "υ", YW = "ϒ", VW = "ϒ", jW = "Υ", WW = "υ", QW = "↥", KW = "⊥", XW = "⇈", zW = "⌝", JW = "⌝", ZW = "⌎", tQ = "Ů", eQ = "ů", nQ = "◹", rQ = "𝒰", sQ = "𝓊", iQ = "⋰", aQ = "Ũ", uQ = "ũ", oQ = "▵", cQ = "▴", fQ = "⇈", lQ = "Ü", hQ = "ü", dQ = "⦧", pQ = "⦜", gQ = "ϵ", EQ = "ϰ", mQ = "∅", bQ = "ϕ", _Q = "ϖ", TQ = "∝", AQ = "↕", yQ = "⇕", CQ = "ϱ", IQ = "ς", SQ = "⊊︀", NQ = "⫋︀", vQ = "⊋︀", xQ = "⫌︀", RQ = "ϑ", LQ = "⊲", OQ = "⊳", wQ = "⫨", DQ = "⫫", PQ = "⫩", BQ = "В", MQ = "в", FQ = "⊢", kQ = "⊨", UQ = "⊩", HQ = "⊫", qQ = "⫦", $Q = "⊻", GQ = "∨", YQ = "⋁", VQ = "≚", jQ = "⋮", WQ = "|", QQ = "‖", KQ = "|", XQ = "‖", zQ = "∣", JQ = "|", ZQ = "❘", tK = "≀", eK = " ", nK = "𝔙", rK = "𝔳", sK = "⊲", iK = "⊂⃒", aK = "⊃⃒", uK = "𝕍", oK = "𝕧", cK = "∝", fK = "⊳", lK = "𝒱", hK = "𝓋", dK = "⫋︀", pK = "⊊︀", gK = "⫌︀", EK = "⊋︀", mK = "⊪", bK = "⦚", _K = "Ŵ", TK = "ŵ", AK = "⩟", yK = "∧", CK = "⋀", IK = "≙", SK = "℘", NK = "𝔚", vK = "𝔴", xK = "𝕎", RK = "𝕨", LK = "℘", OK = "≀", wK = "≀", DK = "𝒲", PK = "𝓌", BK = "⋂", MK = "◯", FK = "⋃", kK = "▽", UK = "𝔛", HK = "𝔵", qK = "⟷", $K = "⟺", GK = "Ξ", YK = "ξ", VK = "⟵", jK = "⟸", WK = "⟼", QK = "⋻", KK = "⨀", XK = "𝕏", zK = "𝕩", JK = "⨁", ZK = "⨂", tX = "⟶", eX = "⟹", nX = "𝒳", rX = "𝓍", sX = "⨆", iX = "⨄", aX = "△", uX = "⋁", oX = "⋀", cX = "Ý", fX = "ý", lX = "Я", hX = "я", dX = "Ŷ", pX = "ŷ", gX = "Ы", EX = "ы", mX = "¥", bX = "𝔜", _X = "𝔶", TX = "Ї", AX = "ї", yX = "𝕐", CX = "𝕪", IX = "𝒴", SX = "𝓎", NX = "Ю", vX = "ю", xX = "ÿ", RX = "Ÿ", LX = "Ź", OX = "ź", wX = "Ž", DX = "ž", PX = "З", BX = "з", MX = "Ż", FX = "ż", kX = "ℨ", UX = "​", HX = "Ζ", qX = "ζ", $X = "𝔷", GX = "ℨ", YX = "Ж", VX = "ж", jX = "⇝", WX = "𝕫", QX = "ℤ", KX = "𝒵", XX = "𝓏", zX = "‍", JX = "‌", mo = {
  Aacute: M_,
  aacute: F_,
  Abreve: k_,
  abreve: U_,
  ac: H_,
  acd: q_,
  acE: $_,
  Acirc: G_,
  acirc: Y_,
  acute: V_,
  Acy: j_,
  acy: W_,
  AElig: Q_,
  aelig: K_,
  af: X_,
  Afr: z_,
  afr: J_,
  Agrave: Z_,
  agrave: tT,
  alefsym: eT,
  aleph: nT,
  Alpha: rT,
  alpha: sT,
  Amacr: iT,
  amacr: aT,
  amalg: uT,
  amp: oT,
  AMP: cT,
  andand: fT,
  And: lT,
  and: hT,
  andd: dT,
  andslope: pT,
  andv: gT,
  ang: ET,
  ange: mT,
  angle: bT,
  angmsdaa: _T,
  angmsdab: TT,
  angmsdac: AT,
  angmsdad: yT,
  angmsdae: CT,
  angmsdaf: IT,
  angmsdag: ST,
  angmsdah: NT,
  angmsd: vT,
  angrt: xT,
  angrtvb: RT,
  angrtvbd: LT,
  angsph: OT,
  angst: wT,
  angzarr: DT,
  Aogon: PT,
  aogon: BT,
  Aopf: MT,
  aopf: FT,
  apacir: kT,
  ap: UT,
  apE: HT,
  ape: qT,
  apid: $T,
  apos: GT,
  ApplyFunction: YT,
  approx: VT,
  approxeq: jT,
  Aring: WT,
  aring: QT,
  Ascr: KT,
  ascr: XT,
  Assign: zT,
  ast: JT,
  asymp: ZT,
  asympeq: tA,
  Atilde: eA,
  atilde: nA,
  Auml: rA,
  auml: sA,
  awconint: iA,
  awint: aA,
  backcong: uA,
  backepsilon: oA,
  backprime: cA,
  backsim: fA,
  backsimeq: lA,
  Backslash: hA,
  Barv: dA,
  barvee: pA,
  barwed: gA,
  Barwed: EA,
  barwedge: mA,
  bbrk: bA,
  bbrktbrk: _A,
  bcong: TA,
  Bcy: AA,
  bcy: yA,
  bdquo: CA,
  becaus: IA,
  because: SA,
  Because: NA,
  bemptyv: vA,
  bepsi: xA,
  bernou: RA,
  Bernoullis: LA,
  Beta: OA,
  beta: wA,
  beth: DA,
  between: PA,
  Bfr: BA,
  bfr: MA,
  bigcap: FA,
  bigcirc: kA,
  bigcup: UA,
  bigodot: HA,
  bigoplus: qA,
  bigotimes: $A,
  bigsqcup: GA,
  bigstar: YA,
  bigtriangledown: VA,
  bigtriangleup: jA,
  biguplus: WA,
  bigvee: QA,
  bigwedge: KA,
  bkarow: XA,
  blacklozenge: zA,
  blacksquare: JA,
  blacktriangle: ZA,
  blacktriangledown: t2,
  blacktriangleleft: e2,
  blacktriangleright: n2,
  blank: r2,
  blk12: s2,
  blk14: i2,
  blk34: a2,
  block: u2,
  bne: o2,
  bnequiv: c2,
  bNot: f2,
  bnot: l2,
  Bopf: h2,
  bopf: d2,
  bot: p2,
  bottom: g2,
  bowtie: E2,
  boxbox: m2,
  boxdl: b2,
  boxdL: _2,
  boxDl: T2,
  boxDL: A2,
  boxdr: y2,
  boxdR: C2,
  boxDr: I2,
  boxDR: S2,
  boxh: N2,
  boxH: v2,
  boxhd: x2,
  boxHd: R2,
  boxhD: L2,
  boxHD: O2,
  boxhu: w2,
  boxHu: D2,
  boxhU: P2,
  boxHU: B2,
  boxminus: M2,
  boxplus: F2,
  boxtimes: k2,
  boxul: U2,
  boxuL: H2,
  boxUl: q2,
  boxUL: $2,
  boxur: G2,
  boxuR: Y2,
  boxUr: V2,
  boxUR: j2,
  boxv: W2,
  boxV: Q2,
  boxvh: K2,
  boxvH: X2,
  boxVh: z2,
  boxVH: J2,
  boxvl: Z2,
  boxvL: ty,
  boxVl: ey,
  boxVL: ny,
  boxvr: ry,
  boxvR: sy,
  boxVr: iy,
  boxVR: ay,
  bprime: uy,
  breve: oy,
  Breve: cy,
  brvbar: fy,
  bscr: ly,
  Bscr: hy,
  bsemi: dy,
  bsim: py,
  bsime: gy,
  bsolb: Ey,
  bsol: my,
  bsolhsub: by,
  bull: _y,
  bullet: Ty,
  bump: Ay,
  bumpE: yy,
  bumpe: Cy,
  Bumpeq: Iy,
  bumpeq: Sy,
  Cacute: Ny,
  cacute: vy,
  capand: xy,
  capbrcup: Ry,
  capcap: Ly,
  cap: Oy,
  Cap: wy,
  capcup: Dy,
  capdot: Py,
  CapitalDifferentialD: By,
  caps: My,
  caret: Fy,
  caron: ky,
  Cayleys: Uy,
  ccaps: Hy,
  Ccaron: qy,
  ccaron: $y,
  Ccedil: Gy,
  ccedil: Yy,
  Ccirc: Vy,
  ccirc: jy,
  Cconint: Wy,
  ccups: Qy,
  ccupssm: Ky,
  Cdot: Xy,
  cdot: zy,
  cedil: Jy,
  Cedilla: Zy,
  cemptyv: tC,
  cent: eC,
  centerdot: nC,
  CenterDot: rC,
  cfr: sC,
  Cfr: iC,
  CHcy: aC,
  chcy: uC,
  check: oC,
  checkmark: cC,
  Chi: fC,
  chi: lC,
  circ: hC,
  circeq: dC,
  circlearrowleft: pC,
  circlearrowright: gC,
  circledast: EC,
  circledcirc: mC,
  circleddash: bC,
  CircleDot: _C,
  circledR: TC,
  circledS: AC,
  CircleMinus: yC,
  CirclePlus: CC,
  CircleTimes: IC,
  cir: SC,
  cirE: NC,
  cire: vC,
  cirfnint: xC,
  cirmid: RC,
  cirscir: LC,
  ClockwiseContourIntegral: OC,
  CloseCurlyDoubleQuote: wC,
  CloseCurlyQuote: DC,
  clubs: PC,
  clubsuit: BC,
  colon: MC,
  Colon: FC,
  Colone: kC,
  colone: UC,
  coloneq: HC,
  comma: qC,
  commat: $C,
  comp: GC,
  compfn: YC,
  complement: VC,
  complexes: jC,
  cong: WC,
  congdot: QC,
  Congruent: KC,
  conint: XC,
  Conint: zC,
  ContourIntegral: JC,
  copf: ZC,
  Copf: tI,
  coprod: eI,
  Coproduct: nI,
  copy: rI,
  COPY: sI,
  copysr: iI,
  CounterClockwiseContourIntegral: aI,
  crarr: uI,
  cross: oI,
  Cross: cI,
  Cscr: fI,
  cscr: lI,
  csub: hI,
  csube: dI,
  csup: pI,
  csupe: gI,
  ctdot: EI,
  cudarrl: mI,
  cudarrr: bI,
  cuepr: _I,
  cuesc: TI,
  cularr: AI,
  cularrp: yI,
  cupbrcap: CI,
  cupcap: II,
  CupCap: SI,
  cup: NI,
  Cup: vI,
  cupcup: xI,
  cupdot: RI,
  cupor: LI,
  cups: OI,
  curarr: wI,
  curarrm: DI,
  curlyeqprec: PI,
  curlyeqsucc: BI,
  curlyvee: MI,
  curlywedge: FI,
  curren: kI,
  curvearrowleft: UI,
  curvearrowright: HI,
  cuvee: qI,
  cuwed: $I,
  cwconint: GI,
  cwint: YI,
  cylcty: VI,
  dagger: jI,
  Dagger: WI,
  daleth: QI,
  darr: KI,
  Darr: XI,
  dArr: zI,
  dash: JI,
  Dashv: ZI,
  dashv: tS,
  dbkarow: eS,
  dblac: nS,
  Dcaron: rS,
  dcaron: sS,
  Dcy: iS,
  dcy: aS,
  ddagger: uS,
  ddarr: oS,
  DD: cS,
  dd: fS,
  DDotrahd: lS,
  ddotseq: hS,
  deg: dS,
  Del: pS,
  Delta: gS,
  delta: ES,
  demptyv: mS,
  dfisht: bS,
  Dfr: _S,
  dfr: TS,
  dHar: AS,
  dharl: yS,
  dharr: CS,
  DiacriticalAcute: IS,
  DiacriticalDot: SS,
  DiacriticalDoubleAcute: NS,
  DiacriticalGrave: vS,
  DiacriticalTilde: xS,
  diam: RS,
  diamond: LS,
  Diamond: OS,
  diamondsuit: wS,
  diams: DS,
  die: PS,
  DifferentialD: BS,
  digamma: MS,
  disin: FS,
  div: kS,
  divide: US,
  divideontimes: HS,
  divonx: qS,
  DJcy: $S,
  djcy: GS,
  dlcorn: YS,
  dlcrop: VS,
  dollar: jS,
  Dopf: WS,
  dopf: QS,
  Dot: KS,
  dot: XS,
  DotDot: zS,
  doteq: JS,
  doteqdot: ZS,
  DotEqual: tN,
  dotminus: eN,
  dotplus: nN,
  dotsquare: rN,
  doublebarwedge: sN,
  DoubleContourIntegral: iN,
  DoubleDot: aN,
  DoubleDownArrow: uN,
  DoubleLeftArrow: oN,
  DoubleLeftRightArrow: cN,
  DoubleLeftTee: fN,
  DoubleLongLeftArrow: lN,
  DoubleLongLeftRightArrow: hN,
  DoubleLongRightArrow: dN,
  DoubleRightArrow: pN,
  DoubleRightTee: gN,
  DoubleUpArrow: EN,
  DoubleUpDownArrow: mN,
  DoubleVerticalBar: bN,
  DownArrowBar: _N,
  downarrow: TN,
  DownArrow: AN,
  Downarrow: yN,
  DownArrowUpArrow: CN,
  DownBreve: IN,
  downdownarrows: SN,
  downharpoonleft: NN,
  downharpoonright: vN,
  DownLeftRightVector: xN,
  DownLeftTeeVector: RN,
  DownLeftVectorBar: LN,
  DownLeftVector: ON,
  DownRightTeeVector: wN,
  DownRightVectorBar: DN,
  DownRightVector: PN,
  DownTeeArrow: BN,
  DownTee: MN,
  drbkarow: FN,
  drcorn: kN,
  drcrop: UN,
  Dscr: HN,
  dscr: qN,
  DScy: $N,
  dscy: GN,
  dsol: YN,
  Dstrok: VN,
  dstrok: jN,
  dtdot: WN,
  dtri: QN,
  dtrif: KN,
  duarr: XN,
  duhar: zN,
  dwangle: JN,
  DZcy: ZN,
  dzcy: t3,
  dzigrarr: e3,
  Eacute: n3,
  eacute: r3,
  easter: s3,
  Ecaron: i3,
  ecaron: a3,
  Ecirc: u3,
  ecirc: o3,
  ecir: c3,
  ecolon: f3,
  Ecy: l3,
  ecy: h3,
  eDDot: d3,
  Edot: p3,
  edot: g3,
  eDot: E3,
  ee: m3,
  efDot: b3,
  Efr: _3,
  efr: T3,
  eg: A3,
  Egrave: y3,
  egrave: C3,
  egs: I3,
  egsdot: S3,
  el: N3,
  Element: v3,
  elinters: x3,
  ell: R3,
  els: L3,
  elsdot: O3,
  Emacr: w3,
  emacr: D3,
  empty: P3,
  emptyset: B3,
  EmptySmallSquare: M3,
  emptyv: F3,
  EmptyVerySmallSquare: k3,
  emsp13: U3,
  emsp14: H3,
  emsp: q3,
  ENG: $3,
  eng: G3,
  ensp: Y3,
  Eogon: V3,
  eogon: j3,
  Eopf: W3,
  eopf: Q3,
  epar: K3,
  eparsl: X3,
  eplus: z3,
  epsi: J3,
  Epsilon: Z3,
  epsilon: tv,
  epsiv: ev,
  eqcirc: nv,
  eqcolon: rv,
  eqsim: sv,
  eqslantgtr: iv,
  eqslantless: av,
  Equal: uv,
  equals: ov,
  EqualTilde: cv,
  equest: fv,
  Equilibrium: lv,
  equiv: hv,
  equivDD: dv,
  eqvparsl: pv,
  erarr: gv,
  erDot: Ev,
  escr: mv,
  Escr: bv,
  esdot: _v,
  Esim: Tv,
  esim: Av,
  Eta: yv,
  eta: Cv,
  ETH: Iv,
  eth: Sv,
  Euml: Nv,
  euml: vv,
  euro: xv,
  excl: Rv,
  exist: Lv,
  Exists: Ov,
  expectation: wv,
  exponentiale: Dv,
  ExponentialE: Pv,
  fallingdotseq: Bv,
  Fcy: Mv,
  fcy: Fv,
  female: kv,
  ffilig: Uv,
  fflig: Hv,
  ffllig: qv,
  Ffr: $v,
  ffr: Gv,
  filig: Yv,
  FilledSmallSquare: Vv,
  FilledVerySmallSquare: jv,
  fjlig: Wv,
  flat: Qv,
  fllig: Kv,
  fltns: Xv,
  fnof: zv,
  Fopf: Jv,
  fopf: Zv,
  forall: tx,
  ForAll: ex,
  fork: nx,
  forkv: rx,
  Fouriertrf: sx,
  fpartint: ix,
  frac12: ax,
  frac13: ux,
  frac14: ox,
  frac15: cx,
  frac16: fx,
  frac18: lx,
  frac23: hx,
  frac25: dx,
  frac34: px,
  frac35: gx,
  frac38: Ex,
  frac45: mx,
  frac56: bx,
  frac58: _x,
  frac78: Tx,
  frasl: Ax,
  frown: yx,
  fscr: Cx,
  Fscr: Ix,
  gacute: Sx,
  Gamma: Nx,
  gamma: vx,
  Gammad: xx,
  gammad: Rx,
  gap: Lx,
  Gbreve: Ox,
  gbreve: wx,
  Gcedil: Dx,
  Gcirc: Px,
  gcirc: Bx,
  Gcy: Mx,
  gcy: Fx,
  Gdot: kx,
  gdot: Ux,
  ge: Hx,
  gE: qx,
  gEl: $x,
  gel: Gx,
  geq: Yx,
  geqq: Vx,
  geqslant: jx,
  gescc: Wx,
  ges: Qx,
  gesdot: Kx,
  gesdoto: Xx,
  gesdotol: zx,
  gesl: Jx,
  gesles: Zx,
  Gfr: tR,
  gfr: eR,
  gg: nR,
  Gg: rR,
  ggg: sR,
  gimel: iR,
  GJcy: aR,
  gjcy: uR,
  gla: oR,
  gl: cR,
  glE: fR,
  glj: lR,
  gnap: hR,
  gnapprox: dR,
  gne: pR,
  gnE: gR,
  gneq: ER,
  gneqq: mR,
  gnsim: bR,
  Gopf: _R,
  gopf: TR,
  grave: AR,
  GreaterEqual: yR,
  GreaterEqualLess: CR,
  GreaterFullEqual: IR,
  GreaterGreater: SR,
  GreaterLess: NR,
  GreaterSlantEqual: vR,
  GreaterTilde: xR,
  Gscr: RR,
  gscr: LR,
  gsim: OR,
  gsime: wR,
  gsiml: DR,
  gtcc: PR,
  gtcir: BR,
  gt: MR,
  GT: FR,
  Gt: kR,
  gtdot: UR,
  gtlPar: HR,
  gtquest: qR,
  gtrapprox: $R,
  gtrarr: GR,
  gtrdot: YR,
  gtreqless: VR,
  gtreqqless: jR,
  gtrless: WR,
  gtrsim: QR,
  gvertneqq: KR,
  gvnE: XR,
  Hacek: zR,
  hairsp: JR,
  half: ZR,
  hamilt: tL,
  HARDcy: eL,
  hardcy: nL,
  harrcir: rL,
  harr: sL,
  hArr: iL,
  harrw: aL,
  Hat: uL,
  hbar: oL,
  Hcirc: cL,
  hcirc: fL,
  hearts: lL,
  heartsuit: hL,
  hellip: dL,
  hercon: pL,
  hfr: gL,
  Hfr: EL,
  HilbertSpace: mL,
  hksearow: bL,
  hkswarow: _L,
  hoarr: TL,
  homtht: AL,
  hookleftarrow: yL,
  hookrightarrow: CL,
  hopf: IL,
  Hopf: SL,
  horbar: NL,
  HorizontalLine: vL,
  hscr: xL,
  Hscr: RL,
  hslash: LL,
  Hstrok: OL,
  hstrok: wL,
  HumpDownHump: DL,
  HumpEqual: PL,
  hybull: BL,
  hyphen: ML,
  Iacute: FL,
  iacute: kL,
  ic: UL,
  Icirc: HL,
  icirc: qL,
  Icy: $L,
  icy: GL,
  Idot: YL,
  IEcy: VL,
  iecy: jL,
  iexcl: WL,
  iff: QL,
  ifr: KL,
  Ifr: XL,
  Igrave: zL,
  igrave: JL,
  ii: ZL,
  iiiint: tO,
  iiint: eO,
  iinfin: nO,
  iiota: rO,
  IJlig: sO,
  ijlig: iO,
  Imacr: aO,
  imacr: uO,
  image: oO,
  ImaginaryI: cO,
  imagline: fO,
  imagpart: lO,
  imath: hO,
  Im: dO,
  imof: pO,
  imped: gO,
  Implies: EO,
  incare: mO,
  in: "∈",
  infin: bO,
  infintie: _O,
  inodot: TO,
  intcal: AO,
  int: yO,
  Int: CO,
  integers: IO,
  Integral: SO,
  intercal: NO,
  Intersection: vO,
  intlarhk: xO,
  intprod: RO,
  InvisibleComma: LO,
  InvisibleTimes: OO,
  IOcy: wO,
  iocy: DO,
  Iogon: PO,
  iogon: BO,
  Iopf: MO,
  iopf: FO,
  Iota: kO,
  iota: UO,
  iprod: HO,
  iquest: qO,
  iscr: $O,
  Iscr: GO,
  isin: YO,
  isindot: VO,
  isinE: jO,
  isins: WO,
  isinsv: QO,
  isinv: KO,
  it: XO,
  Itilde: zO,
  itilde: JO,
  Iukcy: ZO,
  iukcy: t6,
  Iuml: e6,
  iuml: n6,
  Jcirc: r6,
  jcirc: s6,
  Jcy: i6,
  jcy: a6,
  Jfr: u6,
  jfr: o6,
  jmath: c6,
  Jopf: f6,
  jopf: l6,
  Jscr: h6,
  jscr: d6,
  Jsercy: p6,
  jsercy: g6,
  Jukcy: E6,
  jukcy: m6,
  Kappa: b6,
  kappa: _6,
  kappav: T6,
  Kcedil: A6,
  kcedil: y6,
  Kcy: C6,
  kcy: I6,
  Kfr: S6,
  kfr: N6,
  kgreen: v6,
  KHcy: x6,
  khcy: R6,
  KJcy: L6,
  kjcy: O6,
  Kopf: w6,
  kopf: D6,
  Kscr: P6,
  kscr: B6,
  lAarr: M6,
  Lacute: F6,
  lacute: k6,
  laemptyv: U6,
  lagran: H6,
  Lambda: q6,
  lambda: $6,
  lang: G6,
  Lang: Y6,
  langd: V6,
  langle: j6,
  lap: W6,
  Laplacetrf: Q6,
  laquo: K6,
  larrb: X6,
  larrbfs: z6,
  larr: J6,
  Larr: Z6,
  lArr: tw,
  larrfs: ew,
  larrhk: nw,
  larrlp: rw,
  larrpl: sw,
  larrsim: iw,
  larrtl: aw,
  latail: uw,
  lAtail: ow,
  lat: cw,
  late: fw,
  lates: lw,
  lbarr: hw,
  lBarr: dw,
  lbbrk: pw,
  lbrace: gw,
  lbrack: Ew,
  lbrke: mw,
  lbrksld: bw,
  lbrkslu: _w,
  Lcaron: Tw,
  lcaron: Aw,
  Lcedil: yw,
  lcedil: Cw,
  lceil: Iw,
  lcub: Sw,
  Lcy: Nw,
  lcy: vw,
  ldca: xw,
  ldquo: Rw,
  ldquor: Lw,
  ldrdhar: Ow,
  ldrushar: ww,
  ldsh: Dw,
  le: Pw,
  lE: Bw,
  LeftAngleBracket: Mw,
  LeftArrowBar: Fw,
  leftarrow: kw,
  LeftArrow: Uw,
  Leftarrow: Hw,
  LeftArrowRightArrow: qw,
  leftarrowtail: $w,
  LeftCeiling: Gw,
  LeftDoubleBracket: Yw,
  LeftDownTeeVector: Vw,
  LeftDownVectorBar: jw,
  LeftDownVector: Ww,
  LeftFloor: Qw,
  leftharpoondown: Kw,
  leftharpoonup: Xw,
  leftleftarrows: zw,
  leftrightarrow: Jw,
  LeftRightArrow: Zw,
  Leftrightarrow: tD,
  leftrightarrows: eD,
  leftrightharpoons: nD,
  leftrightsquigarrow: rD,
  LeftRightVector: sD,
  LeftTeeArrow: iD,
  LeftTee: aD,
  LeftTeeVector: uD,
  leftthreetimes: oD,
  LeftTriangleBar: cD,
  LeftTriangle: fD,
  LeftTriangleEqual: lD,
  LeftUpDownVector: hD,
  LeftUpTeeVector: dD,
  LeftUpVectorBar: pD,
  LeftUpVector: gD,
  LeftVectorBar: ED,
  LeftVector: mD,
  lEg: bD,
  leg: _D,
  leq: TD,
  leqq: AD,
  leqslant: yD,
  lescc: CD,
  les: ID,
  lesdot: SD,
  lesdoto: ND,
  lesdotor: vD,
  lesg: xD,
  lesges: RD,
  lessapprox: LD,
  lessdot: OD,
  lesseqgtr: wD,
  lesseqqgtr: DD,
  LessEqualGreater: PD,
  LessFullEqual: BD,
  LessGreater: MD,
  lessgtr: FD,
  LessLess: kD,
  lesssim: UD,
  LessSlantEqual: HD,
  LessTilde: qD,
  lfisht: $D,
  lfloor: GD,
  Lfr: YD,
  lfr: VD,
  lg: jD,
  lgE: WD,
  lHar: QD,
  lhard: KD,
  lharu: XD,
  lharul: zD,
  lhblk: JD,
  LJcy: ZD,
  ljcy: t4,
  llarr: e4,
  ll: n4,
  Ll: r4,
  llcorner: s4,
  Lleftarrow: i4,
  llhard: a4,
  lltri: u4,
  Lmidot: o4,
  lmidot: c4,
  lmoustache: f4,
  lmoust: l4,
  lnap: h4,
  lnapprox: d4,
  lne: p4,
  lnE: g4,
  lneq: E4,
  lneqq: m4,
  lnsim: b4,
  loang: _4,
  loarr: T4,
  lobrk: A4,
  longleftarrow: y4,
  LongLeftArrow: C4,
  Longleftarrow: I4,
  longleftrightarrow: S4,
  LongLeftRightArrow: N4,
  Longleftrightarrow: v4,
  longmapsto: x4,
  longrightarrow: R4,
  LongRightArrow: L4,
  Longrightarrow: O4,
  looparrowleft: w4,
  looparrowright: D4,
  lopar: P4,
  Lopf: B4,
  lopf: M4,
  loplus: F4,
  lotimes: k4,
  lowast: U4,
  lowbar: H4,
  LowerLeftArrow: q4,
  LowerRightArrow: $4,
  loz: G4,
  lozenge: Y4,
  lozf: V4,
  lpar: j4,
  lparlt: W4,
  lrarr: Q4,
  lrcorner: K4,
  lrhar: X4,
  lrhard: z4,
  lrm: J4,
  lrtri: Z4,
  lsaquo: t8,
  lscr: e8,
  Lscr: n8,
  lsh: r8,
  Lsh: s8,
  lsim: i8,
  lsime: a8,
  lsimg: u8,
  lsqb: o8,
  lsquo: c8,
  lsquor: f8,
  Lstrok: l8,
  lstrok: h8,
  ltcc: d8,
  ltcir: p8,
  lt: g8,
  LT: E8,
  Lt: m8,
  ltdot: b8,
  lthree: _8,
  ltimes: T8,
  ltlarr: A8,
  ltquest: y8,
  ltri: C8,
  ltrie: I8,
  ltrif: S8,
  ltrPar: N8,
  lurdshar: v8,
  luruhar: x8,
  lvertneqq: R8,
  lvnE: L8,
  macr: O8,
  male: w8,
  malt: D8,
  maltese: P8,
  Map: "⤅",
  map: B8,
  mapsto: M8,
  mapstodown: F8,
  mapstoleft: k8,
  mapstoup: U8,
  marker: H8,
  mcomma: q8,
  Mcy: $8,
  mcy: G8,
  mdash: Y8,
  mDDot: V8,
  measuredangle: j8,
  MediumSpace: W8,
  Mellintrf: Q8,
  Mfr: K8,
  mfr: X8,
  mho: z8,
  micro: J8,
  midast: Z8,
  midcir: tP,
  mid: eP,
  middot: nP,
  minusb: rP,
  minus: sP,
  minusd: iP,
  minusdu: aP,
  MinusPlus: uP,
  mlcp: oP,
  mldr: cP,
  mnplus: fP,
  models: lP,
  Mopf: hP,
  mopf: dP,
  mp: pP,
  mscr: gP,
  Mscr: EP,
  mstpos: mP,
  Mu: bP,
  mu: _P,
  multimap: TP,
  mumap: AP,
  nabla: yP,
  Nacute: CP,
  nacute: IP,
  nang: SP,
  nap: NP,
  napE: vP,
  napid: xP,
  napos: RP,
  napprox: LP,
  natural: OP,
  naturals: wP,
  natur: DP,
  nbsp: PP,
  nbump: BP,
  nbumpe: MP,
  ncap: FP,
  Ncaron: kP,
  ncaron: UP,
  Ncedil: HP,
  ncedil: qP,
  ncong: $P,
  ncongdot: GP,
  ncup: YP,
  Ncy: VP,
  ncy: jP,
  ndash: WP,
  nearhk: QP,
  nearr: KP,
  neArr: XP,
  nearrow: zP,
  ne: JP,
  nedot: ZP,
  NegativeMediumSpace: tB,
  NegativeThickSpace: eB,
  NegativeThinSpace: nB,
  NegativeVeryThinSpace: rB,
  nequiv: sB,
  nesear: iB,
  nesim: aB,
  NestedGreaterGreater: uB,
  NestedLessLess: oB,
  NewLine: cB,
  nexist: fB,
  nexists: lB,
  Nfr: hB,
  nfr: dB,
  ngE: pB,
  nge: gB,
  ngeq: EB,
  ngeqq: mB,
  ngeqslant: bB,
  nges: _B,
  nGg: TB,
  ngsim: AB,
  nGt: yB,
  ngt: CB,
  ngtr: IB,
  nGtv: SB,
  nharr: NB,
  nhArr: vB,
  nhpar: xB,
  ni: RB,
  nis: LB,
  nisd: OB,
  niv: wB,
  NJcy: DB,
  njcy: PB,
  nlarr: BB,
  nlArr: MB,
  nldr: FB,
  nlE: kB,
  nle: UB,
  nleftarrow: HB,
  nLeftarrow: qB,
  nleftrightarrow: $B,
  nLeftrightarrow: GB,
  nleq: YB,
  nleqq: VB,
  nleqslant: jB,
  nles: WB,
  nless: QB,
  nLl: KB,
  nlsim: XB,
  nLt: zB,
  nlt: JB,
  nltri: ZB,
  nltrie: tM,
  nLtv: eM,
  nmid: nM,
  NoBreak: rM,
  NonBreakingSpace: sM,
  nopf: iM,
  Nopf: aM,
  Not: uM,
  not: oM,
  NotCongruent: cM,
  NotCupCap: fM,
  NotDoubleVerticalBar: lM,
  NotElement: hM,
  NotEqual: dM,
  NotEqualTilde: pM,
  NotExists: gM,
  NotGreater: EM,
  NotGreaterEqual: mM,
  NotGreaterFullEqual: bM,
  NotGreaterGreater: _M,
  NotGreaterLess: TM,
  NotGreaterSlantEqual: AM,
  NotGreaterTilde: yM,
  NotHumpDownHump: CM,
  NotHumpEqual: IM,
  notin: SM,
  notindot: NM,
  notinE: vM,
  notinva: xM,
  notinvb: RM,
  notinvc: LM,
  NotLeftTriangleBar: OM,
  NotLeftTriangle: wM,
  NotLeftTriangleEqual: DM,
  NotLess: PM,
  NotLessEqual: BM,
  NotLessGreater: MM,
  NotLessLess: FM,
  NotLessSlantEqual: kM,
  NotLessTilde: UM,
  NotNestedGreaterGreater: HM,
  NotNestedLessLess: qM,
  notni: $M,
  notniva: GM,
  notnivb: YM,
  notnivc: VM,
  NotPrecedes: jM,
  NotPrecedesEqual: WM,
  NotPrecedesSlantEqual: QM,
  NotReverseElement: KM,
  NotRightTriangleBar: XM,
  NotRightTriangle: zM,
  NotRightTriangleEqual: JM,
  NotSquareSubset: ZM,
  NotSquareSubsetEqual: t5,
  NotSquareSuperset: e5,
  NotSquareSupersetEqual: n5,
  NotSubset: r5,
  NotSubsetEqual: s5,
  NotSucceeds: i5,
  NotSucceedsEqual: a5,
  NotSucceedsSlantEqual: u5,
  NotSucceedsTilde: o5,
  NotSuperset: c5,
  NotSupersetEqual: f5,
  NotTilde: l5,
  NotTildeEqual: h5,
  NotTildeFullEqual: d5,
  NotTildeTilde: p5,
  NotVerticalBar: g5,
  nparallel: E5,
  npar: m5,
  nparsl: b5,
  npart: _5,
  npolint: T5,
  npr: A5,
  nprcue: y5,
  nprec: C5,
  npreceq: I5,
  npre: S5,
  nrarrc: N5,
  nrarr: v5,
  nrArr: x5,
  nrarrw: R5,
  nrightarrow: L5,
  nRightarrow: O5,
  nrtri: w5,
  nrtrie: D5,
  nsc: P5,
  nsccue: B5,
  nsce: M5,
  Nscr: F5,
  nscr: k5,
  nshortmid: U5,
  nshortparallel: H5,
  nsim: q5,
  nsime: $5,
  nsimeq: G5,
  nsmid: Y5,
  nspar: V5,
  nsqsube: j5,
  nsqsupe: W5,
  nsub: Q5,
  nsubE: K5,
  nsube: X5,
  nsubset: z5,
  nsubseteq: J5,
  nsubseteqq: Z5,
  nsucc: tF,
  nsucceq: eF,
  nsup: nF,
  nsupE: rF,
  nsupe: sF,
  nsupset: iF,
  nsupseteq: aF,
  nsupseteqq: uF,
  ntgl: oF,
  Ntilde: cF,
  ntilde: fF,
  ntlg: lF,
  ntriangleleft: hF,
  ntrianglelefteq: dF,
  ntriangleright: pF,
  ntrianglerighteq: gF,
  Nu: EF,
  nu: mF,
  num: bF,
  numero: _F,
  numsp: TF,
  nvap: AF,
  nvdash: yF,
  nvDash: CF,
  nVdash: IF,
  nVDash: SF,
  nvge: NF,
  nvgt: vF,
  nvHarr: xF,
  nvinfin: RF,
  nvlArr: LF,
  nvle: OF,
  nvlt: wF,
  nvltrie: DF,
  nvrArr: PF,
  nvrtrie: BF,
  nvsim: MF,
  nwarhk: FF,
  nwarr: kF,
  nwArr: UF,
  nwarrow: HF,
  nwnear: qF,
  Oacute: $F,
  oacute: GF,
  oast: YF,
  Ocirc: VF,
  ocirc: jF,
  ocir: WF,
  Ocy: QF,
  ocy: KF,
  odash: XF,
  Odblac: zF,
  odblac: JF,
  odiv: ZF,
  odot: t9,
  odsold: e9,
  OElig: n9,
  oelig: r9,
  ofcir: s9,
  Ofr: i9,
  ofr: a9,
  ogon: u9,
  Ograve: o9,
  ograve: c9,
  ogt: f9,
  ohbar: l9,
  ohm: h9,
  oint: d9,
  olarr: p9,
  olcir: g9,
  olcross: E9,
  oline: m9,
  olt: b9,
  Omacr: _9,
  omacr: T9,
  Omega: A9,
  omega: y9,
  Omicron: C9,
  omicron: I9,
  omid: S9,
  ominus: N9,
  Oopf: v9,
  oopf: x9,
  opar: R9,
  OpenCurlyDoubleQuote: L9,
  OpenCurlyQuote: O9,
  operp: w9,
  oplus: D9,
  orarr: P9,
  Or: B9,
  or: M9,
  ord: F9,
  order: k9,
  orderof: U9,
  ordf: H9,
  ordm: q9,
  origof: $9,
  oror: G9,
  orslope: Y9,
  orv: V9,
  oS: j9,
  Oscr: W9,
  oscr: Q9,
  Oslash: K9,
  oslash: X9,
  osol: z9,
  Otilde: J9,
  otilde: Z9,
  otimesas: tk,
  Otimes: ek,
  otimes: nk,
  Ouml: rk,
  ouml: sk,
  ovbar: ik,
  OverBar: ak,
  OverBrace: uk,
  OverBracket: ok,
  OverParenthesis: ck,
  para: fk,
  parallel: lk,
  par: hk,
  parsim: dk,
  parsl: pk,
  part: gk,
  PartialD: Ek,
  Pcy: mk,
  pcy: bk,
  percnt: _k,
  period: Tk,
  permil: Ak,
  perp: yk,
  pertenk: Ck,
  Pfr: Ik,
  pfr: Sk,
  Phi: Nk,
  phi: vk,
  phiv: xk,
  phmmat: Rk,
  phone: Lk,
  Pi: Ok,
  pi: wk,
  pitchfork: Dk,
  piv: Pk,
  planck: Bk,
  planckh: Mk,
  plankv: Fk,
  plusacir: kk,
  plusb: Uk,
  pluscir: Hk,
  plus: qk,
  plusdo: $k,
  plusdu: Gk,
  pluse: Yk,
  PlusMinus: Vk,
  plusmn: jk,
  plussim: Wk,
  plustwo: Qk,
  pm: Kk,
  Poincareplane: Xk,
  pointint: zk,
  popf: Jk,
  Popf: Zk,
  pound: tU,
  prap: eU,
  Pr: nU,
  pr: rU,
  prcue: sU,
  precapprox: iU,
  prec: aU,
  preccurlyeq: uU,
  Precedes: oU,
  PrecedesEqual: cU,
  PrecedesSlantEqual: fU,
  PrecedesTilde: lU,
  preceq: hU,
  precnapprox: dU,
  precneqq: pU,
  precnsim: gU,
  pre: EU,
  prE: mU,
  precsim: bU,
  prime: _U,
  Prime: TU,
  primes: AU,
  prnap: yU,
  prnE: CU,
  prnsim: IU,
  prod: SU,
  Product: NU,
  profalar: vU,
  profline: xU,
  profsurf: RU,
  prop: LU,
  Proportional: OU,
  Proportion: wU,
  propto: DU,
  prsim: PU,
  prurel: BU,
  Pscr: MU,
  pscr: FU,
  Psi: kU,
  psi: UU,
  puncsp: HU,
  Qfr: qU,
  qfr: $U,
  qint: GU,
  qopf: YU,
  Qopf: VU,
  qprime: jU,
  Qscr: WU,
  qscr: QU,
  quaternions: KU,
  quatint: XU,
  quest: zU,
  questeq: JU,
  quot: ZU,
  QUOT: tH,
  rAarr: eH,
  race: nH,
  Racute: rH,
  racute: sH,
  radic: iH,
  raemptyv: aH,
  rang: uH,
  Rang: oH,
  rangd: cH,
  range: fH,
  rangle: lH,
  raquo: hH,
  rarrap: dH,
  rarrb: pH,
  rarrbfs: gH,
  rarrc: EH,
  rarr: mH,
  Rarr: bH,
  rArr: _H,
  rarrfs: TH,
  rarrhk: AH,
  rarrlp: yH,
  rarrpl: CH,
  rarrsim: IH,
  Rarrtl: SH,
  rarrtl: NH,
  rarrw: vH,
  ratail: xH,
  rAtail: RH,
  ratio: LH,
  rationals: OH,
  rbarr: wH,
  rBarr: DH,
  RBarr: PH,
  rbbrk: BH,
  rbrace: MH,
  rbrack: FH,
  rbrke: kH,
  rbrksld: UH,
  rbrkslu: HH,
  Rcaron: qH,
  rcaron: $H,
  Rcedil: GH,
  rcedil: YH,
  rceil: VH,
  rcub: jH,
  Rcy: WH,
  rcy: QH,
  rdca: KH,
  rdldhar: XH,
  rdquo: zH,
  rdquor: JH,
  rdsh: ZH,
  real: t7,
  realine: e7,
  realpart: n7,
  reals: r7,
  Re: s7,
  rect: i7,
  reg: a7,
  REG: u7,
  ReverseElement: o7,
  ReverseEquilibrium: c7,
  ReverseUpEquilibrium: f7,
  rfisht: l7,
  rfloor: h7,
  rfr: d7,
  Rfr: p7,
  rHar: g7,
  rhard: E7,
  rharu: m7,
  rharul: b7,
  Rho: _7,
  rho: T7,
  rhov: A7,
  RightAngleBracket: y7,
  RightArrowBar: C7,
  rightarrow: I7,
  RightArrow: S7,
  Rightarrow: N7,
  RightArrowLeftArrow: v7,
  rightarrowtail: x7,
  RightCeiling: R7,
  RightDoubleBracket: L7,
  RightDownTeeVector: O7,
  RightDownVectorBar: w7,
  RightDownVector: D7,
  RightFloor: P7,
  rightharpoondown: B7,
  rightharpoonup: M7,
  rightleftarrows: F7,
  rightleftharpoons: k7,
  rightrightarrows: U7,
  rightsquigarrow: H7,
  RightTeeArrow: q7,
  RightTee: $7,
  RightTeeVector: G7,
  rightthreetimes: Y7,
  RightTriangleBar: V7,
  RightTriangle: j7,
  RightTriangleEqual: W7,
  RightUpDownVector: Q7,
  RightUpTeeVector: K7,
  RightUpVectorBar: X7,
  RightUpVector: z7,
  RightVectorBar: J7,
  RightVector: Z7,
  ring: tq,
  risingdotseq: eq,
  rlarr: nq,
  rlhar: rq,
  rlm: sq,
  rmoustache: iq,
  rmoust: aq,
  rnmid: uq,
  roang: oq,
  roarr: cq,
  robrk: fq,
  ropar: lq,
  ropf: hq,
  Ropf: dq,
  roplus: pq,
  rotimes: gq,
  RoundImplies: Eq,
  rpar: mq,
  rpargt: bq,
  rppolint: _q,
  rrarr: Tq,
  Rrightarrow: Aq,
  rsaquo: yq,
  rscr: Cq,
  Rscr: Iq,
  rsh: Sq,
  Rsh: Nq,
  rsqb: vq,
  rsquo: xq,
  rsquor: Rq,
  rthree: Lq,
  rtimes: Oq,
  rtri: wq,
  rtrie: Dq,
  rtrif: Pq,
  rtriltri: Bq,
  RuleDelayed: Mq,
  ruluhar: Fq,
  rx: kq,
  Sacute: Uq,
  sacute: Hq,
  sbquo: qq,
  scap: $q,
  Scaron: Gq,
  scaron: Yq,
  Sc: Vq,
  sc: jq,
  sccue: Wq,
  sce: Qq,
  scE: Kq,
  Scedil: Xq,
  scedil: zq,
  Scirc: Jq,
  scirc: Zq,
  scnap: t$,
  scnE: e$,
  scnsim: n$,
  scpolint: r$,
  scsim: s$,
  Scy: i$,
  scy: a$,
  sdotb: u$,
  sdot: o$,
  sdote: c$,
  searhk: f$,
  searr: l$,
  seArr: h$,
  searrow: d$,
  sect: p$,
  semi: g$,
  seswar: E$,
  setminus: m$,
  setmn: b$,
  sext: _$,
  Sfr: T$,
  sfr: A$,
  sfrown: y$,
  sharp: C$,
  SHCHcy: I$,
  shchcy: S$,
  SHcy: N$,
  shcy: v$,
  ShortDownArrow: x$,
  ShortLeftArrow: R$,
  shortmid: L$,
  shortparallel: O$,
  ShortRightArrow: w$,
  ShortUpArrow: D$,
  shy: P$,
  Sigma: B$,
  sigma: M$,
  sigmaf: F$,
  sigmav: k$,
  sim: U$,
  simdot: H$,
  sime: q$,
  simeq: $$,
  simg: G$,
  simgE: Y$,
  siml: V$,
  simlE: j$,
  simne: W$,
  simplus: Q$,
  simrarr: K$,
  slarr: X$,
  SmallCircle: z$,
  smallsetminus: J$,
  smashp: Z$,
  smeparsl: tG,
  smid: eG,
  smile: nG,
  smt: rG,
  smte: sG,
  smtes: iG,
  SOFTcy: aG,
  softcy: uG,
  solbar: oG,
  solb: cG,
  sol: fG,
  Sopf: lG,
  sopf: hG,
  spades: dG,
  spadesuit: pG,
  spar: gG,
  sqcap: EG,
  sqcaps: mG,
  sqcup: bG,
  sqcups: _G,
  Sqrt: TG,
  sqsub: AG,
  sqsube: yG,
  sqsubset: CG,
  sqsubseteq: IG,
  sqsup: SG,
  sqsupe: NG,
  sqsupset: vG,
  sqsupseteq: xG,
  square: RG,
  Square: LG,
  SquareIntersection: OG,
  SquareSubset: wG,
  SquareSubsetEqual: DG,
  SquareSuperset: PG,
  SquareSupersetEqual: BG,
  SquareUnion: MG,
  squarf: FG,
  squ: kG,
  squf: UG,
  srarr: HG,
  Sscr: qG,
  sscr: $G,
  ssetmn: GG,
  ssmile: YG,
  sstarf: VG,
  Star: jG,
  star: WG,
  starf: QG,
  straightepsilon: KG,
  straightphi: XG,
  strns: zG,
  sub: JG,
  Sub: ZG,
  subdot: tY,
  subE: eY,
  sube: nY,
  subedot: rY,
  submult: sY,
  subnE: iY,
  subne: aY,
  subplus: uY,
  subrarr: oY,
  subset: cY,
  Subset: fY,
  subseteq: lY,
  subseteqq: hY,
  SubsetEqual: dY,
  subsetneq: pY,
  subsetneqq: gY,
  subsim: EY,
  subsub: mY,
  subsup: bY,
  succapprox: _Y,
  succ: TY,
  succcurlyeq: AY,
  Succeeds: yY,
  SucceedsEqual: CY,
  SucceedsSlantEqual: IY,
  SucceedsTilde: SY,
  succeq: NY,
  succnapprox: vY,
  succneqq: xY,
  succnsim: RY,
  succsim: LY,
  SuchThat: OY,
  sum: wY,
  Sum: DY,
  sung: PY,
  sup1: BY,
  sup2: MY,
  sup3: FY,
  sup: kY,
  Sup: UY,
  supdot: HY,
  supdsub: qY,
  supE: $Y,
  supe: GY,
  supedot: YY,
  Superset: VY,
  SupersetEqual: jY,
  suphsol: WY,
  suphsub: QY,
  suplarr: KY,
  supmult: XY,
  supnE: zY,
  supne: JY,
  supplus: ZY,
  supset: tV,
  Supset: eV,
  supseteq: nV,
  supseteqq: rV,
  supsetneq: sV,
  supsetneqq: iV,
  supsim: aV,
  supsub: uV,
  supsup: oV,
  swarhk: cV,
  swarr: fV,
  swArr: lV,
  swarrow: hV,
  swnwar: dV,
  szlig: pV,
  Tab: gV,
  target: EV,
  Tau: mV,
  tau: bV,
  tbrk: _V,
  Tcaron: TV,
  tcaron: AV,
  Tcedil: yV,
  tcedil: CV,
  Tcy: IV,
  tcy: SV,
  tdot: NV,
  telrec: vV,
  Tfr: xV,
  tfr: RV,
  there4: LV,
  therefore: OV,
  Therefore: wV,
  Theta: DV,
  theta: PV,
  thetasym: BV,
  thetav: MV,
  thickapprox: FV,
  thicksim: kV,
  ThickSpace: UV,
  ThinSpace: HV,
  thinsp: qV,
  thkap: $V,
  thksim: GV,
  THORN: YV,
  thorn: VV,
  tilde: jV,
  Tilde: WV,
  TildeEqual: QV,
  TildeFullEqual: KV,
  TildeTilde: XV,
  timesbar: zV,
  timesb: JV,
  times: ZV,
  timesd: tj,
  tint: ej,
  toea: nj,
  topbot: rj,
  topcir: sj,
  top: ij,
  Topf: aj,
  topf: uj,
  topfork: oj,
  tosa: cj,
  tprime: fj,
  trade: lj,
  TRADE: hj,
  triangle: dj,
  triangledown: pj,
  triangleleft: gj,
  trianglelefteq: Ej,
  triangleq: mj,
  triangleright: bj,
  trianglerighteq: _j,
  tridot: Tj,
  trie: Aj,
  triminus: yj,
  TripleDot: Cj,
  triplus: Ij,
  trisb: Sj,
  tritime: Nj,
  trpezium: vj,
  Tscr: xj,
  tscr: Rj,
  TScy: Lj,
  tscy: Oj,
  TSHcy: wj,
  tshcy: Dj,
  Tstrok: Pj,
  tstrok: Bj,
  twixt: Mj,
  twoheadleftarrow: Fj,
  twoheadrightarrow: kj,
  Uacute: Uj,
  uacute: Hj,
  uarr: qj,
  Uarr: $j,
  uArr: Gj,
  Uarrocir: Yj,
  Ubrcy: Vj,
  ubrcy: jj,
  Ubreve: Wj,
  ubreve: Qj,
  Ucirc: Kj,
  ucirc: Xj,
  Ucy: zj,
  ucy: Jj,
  udarr: Zj,
  Udblac: tW,
  udblac: eW,
  udhar: nW,
  ufisht: rW,
  Ufr: sW,
  ufr: iW,
  Ugrave: aW,
  ugrave: uW,
  uHar: oW,
  uharl: cW,
  uharr: fW,
  uhblk: lW,
  ulcorn: hW,
  ulcorner: dW,
  ulcrop: pW,
  ultri: gW,
  Umacr: EW,
  umacr: mW,
  uml: bW,
  UnderBar: _W,
  UnderBrace: TW,
  UnderBracket: AW,
  UnderParenthesis: yW,
  Union: CW,
  UnionPlus: IW,
  Uogon: SW,
  uogon: NW,
  Uopf: vW,
  uopf: xW,
  UpArrowBar: RW,
  uparrow: LW,
  UpArrow: OW,
  Uparrow: wW,
  UpArrowDownArrow: DW,
  updownarrow: PW,
  UpDownArrow: BW,
  Updownarrow: MW,
  UpEquilibrium: FW,
  upharpoonleft: kW,
  upharpoonright: UW,
  uplus: HW,
  UpperLeftArrow: qW,
  UpperRightArrow: $W,
  upsi: GW,
  Upsi: YW,
  upsih: VW,
  Upsilon: jW,
  upsilon: WW,
  UpTeeArrow: QW,
  UpTee: KW,
  upuparrows: XW,
  urcorn: zW,
  urcorner: JW,
  urcrop: ZW,
  Uring: tQ,
  uring: eQ,
  urtri: nQ,
  Uscr: rQ,
  uscr: sQ,
  utdot: iQ,
  Utilde: aQ,
  utilde: uQ,
  utri: oQ,
  utrif: cQ,
  uuarr: fQ,
  Uuml: lQ,
  uuml: hQ,
  uwangle: dQ,
  vangrt: pQ,
  varepsilon: gQ,
  varkappa: EQ,
  varnothing: mQ,
  varphi: bQ,
  varpi: _Q,
  varpropto: TQ,
  varr: AQ,
  vArr: yQ,
  varrho: CQ,
  varsigma: IQ,
  varsubsetneq: SQ,
  varsubsetneqq: NQ,
  varsupsetneq: vQ,
  varsupsetneqq: xQ,
  vartheta: RQ,
  vartriangleleft: LQ,
  vartriangleright: OQ,
  vBar: wQ,
  Vbar: DQ,
  vBarv: PQ,
  Vcy: BQ,
  vcy: MQ,
  vdash: FQ,
  vDash: kQ,
  Vdash: UQ,
  VDash: HQ,
  Vdashl: qQ,
  veebar: $Q,
  vee: GQ,
  Vee: YQ,
  veeeq: VQ,
  vellip: jQ,
  verbar: WQ,
  Verbar: QQ,
  vert: KQ,
  Vert: XQ,
  VerticalBar: zQ,
  VerticalLine: JQ,
  VerticalSeparator: ZQ,
  VerticalTilde: tK,
  VeryThinSpace: eK,
  Vfr: nK,
  vfr: rK,
  vltri: sK,
  vnsub: iK,
  vnsup: aK,
  Vopf: uK,
  vopf: oK,
  vprop: cK,
  vrtri: fK,
  Vscr: lK,
  vscr: hK,
  vsubnE: dK,
  vsubne: pK,
  vsupnE: gK,
  vsupne: EK,
  Vvdash: mK,
  vzigzag: bK,
  Wcirc: _K,
  wcirc: TK,
  wedbar: AK,
  wedge: yK,
  Wedge: CK,
  wedgeq: IK,
  weierp: SK,
  Wfr: NK,
  wfr: vK,
  Wopf: xK,
  wopf: RK,
  wp: LK,
  wr: OK,
  wreath: wK,
  Wscr: DK,
  wscr: PK,
  xcap: BK,
  xcirc: MK,
  xcup: FK,
  xdtri: kK,
  Xfr: UK,
  xfr: HK,
  xharr: qK,
  xhArr: $K,
  Xi: GK,
  xi: YK,
  xlarr: VK,
  xlArr: jK,
  xmap: WK,
  xnis: QK,
  xodot: KK,
  Xopf: XK,
  xopf: zK,
  xoplus: JK,
  xotime: ZK,
  xrarr: tX,
  xrArr: eX,
  Xscr: nX,
  xscr: rX,
  xsqcup: sX,
  xuplus: iX,
  xutri: aX,
  xvee: uX,
  xwedge: oX,
  Yacute: cX,
  yacute: fX,
  YAcy: lX,
  yacy: hX,
  Ycirc: dX,
  ycirc: pX,
  Ycy: gX,
  ycy: EX,
  yen: mX,
  Yfr: bX,
  yfr: _X,
  YIcy: TX,
  yicy: AX,
  Yopf: yX,
  yopf: CX,
  Yscr: IX,
  yscr: SX,
  YUcy: NX,
  yucy: vX,
  yuml: xX,
  Yuml: RX,
  Zacute: LX,
  zacute: OX,
  Zcaron: wX,
  zcaron: DX,
  Zcy: PX,
  zcy: BX,
  Zdot: MX,
  zdot: FX,
  zeetrf: kX,
  ZeroWidthSpace: UX,
  Zeta: HX,
  zeta: qX,
  zfr: $X,
  Zfr: GX,
  ZHcy: YX,
  zhcy: VX,
  zigrarr: jX,
  zopf: WX,
  Zopf: QX,
  Zscr: KX,
  zscr: XX,
  zwj: zX,
  zwnj: JX
}, ZX = "Á", tz = "á", ez = "Â", nz = "â", rz = "´", sz = "Æ", iz = "æ", az = "À", uz = "à", oz = "&", cz = "&", fz = "Å", lz = "å", hz = "Ã", dz = "ã", pz = "Ä", gz = "ä", Ez = "¦", mz = "Ç", bz = "ç", _z = "¸", Tz = "¢", Az = "©", yz = "©", Cz = "¤", Iz = "°", Sz = "÷", Nz = "É", vz = "é", xz = "Ê", Rz = "ê", Lz = "È", Oz = "è", wz = "Ð", Dz = "ð", Pz = "Ë", Bz = "ë", Mz = "½", Fz = "¼", kz = "¾", Uz = ">", Hz = ">", qz = "Í", $z = "í", Gz = "Î", Yz = "î", Vz = "¡", jz = "Ì", Wz = "ì", Qz = "¿", Kz = "Ï", Xz = "ï", zz = "«", Jz = "<", Zz = "<", tJ = "¯", eJ = "µ", nJ = "·", rJ = " ", sJ = "¬", iJ = "Ñ", aJ = "ñ", uJ = "Ó", oJ = "ó", cJ = "Ô", fJ = "ô", lJ = "Ò", hJ = "ò", dJ = "ª", pJ = "º", gJ = "Ø", EJ = "ø", mJ = "Õ", bJ = "õ", _J = "Ö", TJ = "ö", AJ = "¶", yJ = "±", CJ = "£", IJ = '"', SJ = '"', NJ = "»", vJ = "®", xJ = "®", RJ = "§", LJ = "­", OJ = "¹", wJ = "²", DJ = "³", PJ = "ß", BJ = "Þ", MJ = "þ", FJ = "×", kJ = "Ú", UJ = "ú", HJ = "Û", qJ = "û", $J = "Ù", GJ = "ù", YJ = "¨", VJ = "Ü", jJ = "ü", WJ = "Ý", QJ = "ý", KJ = "¥", XJ = "ÿ", yh = {
  Aacute: ZX,
  aacute: tz,
  Acirc: ez,
  acirc: nz,
  acute: rz,
  AElig: sz,
  aelig: iz,
  Agrave: az,
  agrave: uz,
  amp: oz,
  AMP: cz,
  Aring: fz,
  aring: lz,
  Atilde: hz,
  atilde: dz,
  Auml: pz,
  auml: gz,
  brvbar: Ez,
  Ccedil: mz,
  ccedil: bz,
  cedil: _z,
  cent: Tz,
  copy: Az,
  COPY: yz,
  curren: Cz,
  deg: Iz,
  divide: Sz,
  Eacute: Nz,
  eacute: vz,
  Ecirc: xz,
  ecirc: Rz,
  Egrave: Lz,
  egrave: Oz,
  ETH: wz,
  eth: Dz,
  Euml: Pz,
  euml: Bz,
  frac12: Mz,
  frac14: Fz,
  frac34: kz,
  gt: Uz,
  GT: Hz,
  Iacute: qz,
  iacute: $z,
  Icirc: Gz,
  icirc: Yz,
  iexcl: Vz,
  Igrave: jz,
  igrave: Wz,
  iquest: Qz,
  Iuml: Kz,
  iuml: Xz,
  laquo: zz,
  lt: Jz,
  LT: Zz,
  macr: tJ,
  micro: eJ,
  middot: nJ,
  nbsp: rJ,
  not: sJ,
  Ntilde: iJ,
  ntilde: aJ,
  Oacute: uJ,
  oacute: oJ,
  Ocirc: cJ,
  ocirc: fJ,
  Ograve: lJ,
  ograve: hJ,
  ordf: dJ,
  ordm: pJ,
  Oslash: gJ,
  oslash: EJ,
  Otilde: mJ,
  otilde: bJ,
  Ouml: _J,
  ouml: TJ,
  para: AJ,
  plusmn: yJ,
  pound: CJ,
  quot: IJ,
  QUOT: SJ,
  raquo: NJ,
  reg: vJ,
  REG: xJ,
  sect: RJ,
  shy: LJ,
  sup1: OJ,
  sup2: wJ,
  sup3: DJ,
  szlig: PJ,
  THORN: BJ,
  thorn: MJ,
  times: FJ,
  Uacute: kJ,
  uacute: UJ,
  Ucirc: HJ,
  ucirc: qJ,
  Ugrave: $J,
  ugrave: GJ,
  uml: YJ,
  Uuml: VJ,
  uuml: jJ,
  Yacute: WJ,
  yacute: QJ,
  yen: KJ,
  yuml: XJ
}, zJ = "&", JJ = "'", ZJ = ">", tZ = "<", eZ = '"', bo = {
  amp: zJ,
  apos: JJ,
  gt: ZJ,
  lt: tZ,
  quot: eZ
};
var Ch = ct, nZ = Ah, rZ = mo, Wc = yh, sZ = bo, mt = 0, ue = mt++, Ih = mt++, Is = mt++, Sh = mt++, Nh = mt++, Ci = mt++, vh = mt++, as = mt++, wa = mt++, _o = mt++, To = mt++, Ao = mt++, yo = mt++, Co = mt++, xh = mt++, Xr = mt++, Rh = mt++, Lh = mt++, Ii = mt++, Io = mt++, So = mt++, Oh = mt++, wh = mt++, Dh = mt++, Ph = mt++, Bh = mt++, Mh = mt++, Si = mt++, No = mt++, vo = mt++, Fh = mt++, kh = mt++, Uh = mt++, Hh = mt++, qh = mt++, $h = mt++, Gh = mt++, Yh = mt++, Vh = mt++, jh = mt++, Wh = mt++, Qh = mt++, Kh = mt++, Xh = mt++, zh = mt++, Jh = mt++, Zh = mt++, td = mt++, ed = mt++, nd = mt++, Ni = mt++, rd = mt++, xo = mt++, Ro = mt++, Lo = mt++, Oo = 0, Vs = Oo++, sd = Oo++, id = Oo++;
function Un(t) {
  return t === " " || t === `
` || t === "	" || t === "\f" || t === "\r";
}
function Hn(t, e, n) {
  var r = t.toLowerCase();
  return t === r ? function(a) {
    a === r ? this._state = e : (this._state = n, this._index--);
  } : function(a) {
    a === r || a === t ? this._state = e : (this._state = n, this._index--);
  };
}
function Ss(t, e) {
  var n = t.toLowerCase();
  return function(r) {
    r === n || r === t ? this._state = e : (this._state = Is, this._index--);
  };
}
function ct(t, e) {
  this._state = ue, this._buffer = "", this._sectionStart = 0, this._index = 0, this._bufferOffset = 0, this._baseState = ue, this._special = Vs, this._cbs = e, this._running = !0, this._ended = !1, this._xmlMode = !!(t && t.xmlMode), this._decodeEntities = !!(t && t.decodeEntities);
}
ct.prototype._stateText = function(t) {
  t === "<" ? (this._index > this._sectionStart && this._cbs.ontext(this._getSection()), this._state = Ih, this._sectionStart = this._index) : this._decodeEntities && this._special === Vs && t === "&" && (this._index > this._sectionStart && this._cbs.ontext(this._getSection()), this._baseState = ue, this._state = Ni, this._sectionStart = this._index);
};
ct.prototype._stateBeforeTagName = function(t) {
  t === "/" ? this._state = Nh : t === "<" ? (this._cbs.ontext(this._getSection()), this._sectionStart = this._index) : t === ">" || this._special !== Vs || Un(t) ? this._state = ue : t === "!" ? (this._state = xh, this._sectionStart = this._index + 1) : t === "?" ? (this._state = Rh, this._sectionStart = this._index + 1) : (this._state = !this._xmlMode && (t === "s" || t === "S") ? Fh : Is, this._sectionStart = this._index);
};
ct.prototype._stateInTagName = function(t) {
  (t === "/" || t === ">" || Un(t)) && (this._emitToken("onopentagname"), this._state = as, this._index--);
};
ct.prototype._stateBeforeCloseingTagName = function(t) {
  Un(t) || (t === ">" ? this._state = ue : this._special !== Vs ? t === "s" || t === "S" ? this._state = kh : (this._state = ue, this._index--) : (this._state = Ci, this._sectionStart = this._index));
};
ct.prototype._stateInCloseingTagName = function(t) {
  (t === ">" || Un(t)) && (this._emitToken("onclosetag"), this._state = vh, this._index--);
};
ct.prototype._stateAfterCloseingTagName = function(t) {
  t === ">" && (this._state = ue, this._sectionStart = this._index + 1);
};
ct.prototype._stateBeforeAttributeName = function(t) {
  t === ">" ? (this._cbs.onopentagend(), this._state = ue, this._sectionStart = this._index + 1) : t === "/" ? this._state = Sh : Un(t) || (this._state = wa, this._sectionStart = this._index);
};
ct.prototype._stateInSelfClosingTag = function(t) {
  t === ">" ? (this._cbs.onselfclosingtag(), this._state = ue, this._sectionStart = this._index + 1) : Un(t) || (this._state = as, this._index--);
};
ct.prototype._stateInAttributeName = function(t) {
  (t === "=" || t === "/" || t === ">" || Un(t)) && (this._cbs.onattribname(this._getSection()), this._sectionStart = -1, this._state = _o, this._index--);
};
ct.prototype._stateAfterAttributeName = function(t) {
  t === "=" ? this._state = To : t === "/" || t === ">" ? (this._cbs.onattribend(), this._state = as, this._index--) : Un(t) || (this._cbs.onattribend(), this._state = wa, this._sectionStart = this._index);
};
ct.prototype._stateBeforeAttributeValue = function(t) {
  t === '"' ? (this._state = Ao, this._sectionStart = this._index + 1) : t === "'" ? (this._state = yo, this._sectionStart = this._index + 1) : Un(t) || (this._state = Co, this._sectionStart = this._index, this._index--);
};
ct.prototype._stateInAttributeValueDoubleQuotes = function(t) {
  t === '"' ? (this._emitToken("onattribdata"), this._cbs.onattribend(), this._state = as) : this._decodeEntities && t === "&" && (this._emitToken("onattribdata"), this._baseState = this._state, this._state = Ni, this._sectionStart = this._index);
};
ct.prototype._stateInAttributeValueSingleQuotes = function(t) {
  t === "'" ? (this._emitToken("onattribdata"), this._cbs.onattribend(), this._state = as) : this._decodeEntities && t === "&" && (this._emitToken("onattribdata"), this._baseState = this._state, this._state = Ni, this._sectionStart = this._index);
};
ct.prototype._stateInAttributeValueNoQuotes = function(t) {
  Un(t) || t === ">" ? (this._emitToken("onattribdata"), this._cbs.onattribend(), this._state = as, this._index--) : this._decodeEntities && t === "&" && (this._emitToken("onattribdata"), this._baseState = this._state, this._state = Ni, this._sectionStart = this._index);
};
ct.prototype._stateBeforeDeclaration = function(t) {
  this._state = t === "[" ? Oh : t === "-" ? Lh : Xr;
};
ct.prototype._stateInDeclaration = function(t) {
  t === ">" && (this._cbs.ondeclaration(this._getSection()), this._state = ue, this._sectionStart = this._index + 1);
};
ct.prototype._stateInProcessingInstruction = function(t) {
  t === ">" && (this._cbs.onprocessinginstruction(this._getSection()), this._state = ue, this._sectionStart = this._index + 1);
};
ct.prototype._stateBeforeComment = function(t) {
  t === "-" ? (this._state = Ii, this._sectionStart = this._index + 1) : this._state = Xr;
};
ct.prototype._stateInComment = function(t) {
  t === "-" && (this._state = Io);
};
ct.prototype._stateAfterComment1 = function(t) {
  t === "-" ? this._state = So : this._state = Ii;
};
ct.prototype._stateAfterComment2 = function(t) {
  t === ">" ? (this._cbs.oncomment(
    this._buffer.substring(this._sectionStart, this._index - 2)
  ), this._state = ue, this._sectionStart = this._index + 1) : t !== "-" && (this._state = Ii);
};
ct.prototype._stateBeforeCdata1 = Hn(
  "C",
  wh,
  Xr
);
ct.prototype._stateBeforeCdata2 = Hn(
  "D",
  Dh,
  Xr
);
ct.prototype._stateBeforeCdata3 = Hn(
  "A",
  Ph,
  Xr
);
ct.prototype._stateBeforeCdata4 = Hn(
  "T",
  Bh,
  Xr
);
ct.prototype._stateBeforeCdata5 = Hn(
  "A",
  Mh,
  Xr
);
ct.prototype._stateBeforeCdata6 = function(t) {
  t === "[" ? (this._state = Si, this._sectionStart = this._index + 1) : (this._state = Xr, this._index--);
};
ct.prototype._stateInCdata = function(t) {
  t === "]" && (this._state = No);
};
ct.prototype._stateAfterCdata1 = function(t) {
  t === "]" ? this._state = vo : this._state = Si;
};
ct.prototype._stateAfterCdata2 = function(t) {
  t === ">" ? (this._cbs.oncdata(
    this._buffer.substring(this._sectionStart, this._index - 2)
  ), this._state = ue, this._sectionStart = this._index + 1) : t !== "]" && (this._state = Si);
};
ct.prototype._stateBeforeSpecial = function(t) {
  t === "c" || t === "C" ? this._state = Uh : t === "t" || t === "T" ? this._state = Kh : (this._state = Is, this._index--);
};
ct.prototype._stateBeforeSpecialEnd = function(t) {
  this._special === sd && (t === "c" || t === "C") ? this._state = Yh : this._special === id && (t === "t" || t === "T") ? this._state = Zh : this._state = ue;
};
ct.prototype._stateBeforeScript1 = Ss(
  "R",
  Hh
);
ct.prototype._stateBeforeScript2 = Ss(
  "I",
  qh
);
ct.prototype._stateBeforeScript3 = Ss(
  "P",
  $h
);
ct.prototype._stateBeforeScript4 = Ss(
  "T",
  Gh
);
ct.prototype._stateBeforeScript5 = function(t) {
  (t === "/" || t === ">" || Un(t)) && (this._special = sd), this._state = Is, this._index--;
};
ct.prototype._stateAfterScript1 = Hn("R", Vh, ue);
ct.prototype._stateAfterScript2 = Hn("I", jh, ue);
ct.prototype._stateAfterScript3 = Hn("P", Wh, ue);
ct.prototype._stateAfterScript4 = Hn("T", Qh, ue);
ct.prototype._stateAfterScript5 = function(t) {
  t === ">" || Un(t) ? (this._special = Vs, this._state = Ci, this._sectionStart = this._index - 6, this._index--) : this._state = ue;
};
ct.prototype._stateBeforeStyle1 = Ss(
  "Y",
  Xh
);
ct.prototype._stateBeforeStyle2 = Ss(
  "L",
  zh
);
ct.prototype._stateBeforeStyle3 = Ss(
  "E",
  Jh
);
ct.prototype._stateBeforeStyle4 = function(t) {
  (t === "/" || t === ">" || Un(t)) && (this._special = id), this._state = Is, this._index--;
};
ct.prototype._stateAfterStyle1 = Hn("Y", td, ue);
ct.prototype._stateAfterStyle2 = Hn("L", ed, ue);
ct.prototype._stateAfterStyle3 = Hn("E", nd, ue);
ct.prototype._stateAfterStyle4 = function(t) {
  t === ">" || Un(t) ? (this._special = Vs, this._state = Ci, this._sectionStart = this._index - 5, this._index--) : this._state = ue;
};
ct.prototype._stateBeforeEntity = Hn(
  "#",
  rd,
  xo
);
ct.prototype._stateBeforeNumericEntity = Hn(
  "X",
  Lo,
  Ro
);
ct.prototype._parseNamedEntityStrict = function() {
  if (this._sectionStart + 1 < this._index) {
    var t = this._buffer.substring(
      this._sectionStart + 1,
      this._index
    ), e = this._xmlMode ? sZ : rZ;
    e.hasOwnProperty(t) && (this._emitPartial(e[t]), this._sectionStart = this._index + 1);
  }
};
ct.prototype._parseLegacyEntity = function() {
  var t = this._sectionStart + 1, e = this._index - t;
  for (e > 6 && (e = 6); e >= 2; ) {
    var n = this._buffer.substr(t, e);
    if (Wc.hasOwnProperty(n)) {
      this._emitPartial(Wc[n]), this._sectionStart += e + 1;
      return;
    } else
      e--;
  }
};
ct.prototype._stateInNamedEntity = function(t) {
  t === ";" ? (this._parseNamedEntityStrict(), this._sectionStart + 1 < this._index && !this._xmlMode && this._parseLegacyEntity(), this._state = this._baseState) : (t < "a" || t > "z") && (t < "A" || t > "Z") && (t < "0" || t > "9") && (this._xmlMode || this._sectionStart + 1 === this._index || (this._baseState !== ue ? t !== "=" && this._parseNamedEntityStrict() : this._parseLegacyEntity()), this._state = this._baseState, this._index--);
};
ct.prototype._decodeNumericEntity = function(t, e) {
  var n = this._sectionStart + t;
  if (n !== this._index) {
    var r = this._buffer.substring(n, this._index), a = parseInt(r, e);
    this._emitPartial(nZ(a)), this._sectionStart = this._index;
  } else
    this._sectionStart--;
  this._state = this._baseState;
};
ct.prototype._stateInNumericEntity = function(t) {
  t === ";" ? (this._decodeNumericEntity(2, 10), this._sectionStart++) : (t < "0" || t > "9") && (this._xmlMode ? this._state = this._baseState : this._decodeNumericEntity(2, 10), this._index--);
};
ct.prototype._stateInHexEntity = function(t) {
  t === ";" ? (this._decodeNumericEntity(3, 16), this._sectionStart++) : (t < "a" || t > "f") && (t < "A" || t > "F") && (t < "0" || t > "9") && (this._xmlMode ? this._state = this._baseState : this._decodeNumericEntity(3, 16), this._index--);
};
ct.prototype._cleanup = function() {
  this._sectionStart < 0 ? (this._buffer = "", this._bufferOffset += this._index, this._index = 0) : this._running && (this._state === ue ? (this._sectionStart !== this._index && this._cbs.ontext(this._buffer.substr(this._sectionStart)), this._buffer = "", this._bufferOffset += this._index, this._index = 0) : this._sectionStart === this._index ? (this._buffer = "", this._bufferOffset += this._index, this._index = 0) : (this._buffer = this._buffer.substr(this._sectionStart), this._index -= this._sectionStart, this._bufferOffset += this._sectionStart), this._sectionStart = 0);
};
ct.prototype.write = function(t) {
  this._ended && this._cbs.onerror(Error(".write() after done!")), this._buffer += t, this._parse();
};
ct.prototype._parse = function() {
  for (; this._index < this._buffer.length && this._running; ) {
    var t = this._buffer.charAt(this._index);
    this._state === ue ? this._stateText(t) : this._state === Ih ? this._stateBeforeTagName(t) : this._state === Is ? this._stateInTagName(t) : this._state === Nh ? this._stateBeforeCloseingTagName(t) : this._state === Ci ? this._stateInCloseingTagName(t) : this._state === vh ? this._stateAfterCloseingTagName(t) : this._state === Sh ? this._stateInSelfClosingTag(t) : this._state === as ? this._stateBeforeAttributeName(t) : this._state === wa ? this._stateInAttributeName(t) : this._state === _o ? this._stateAfterAttributeName(t) : this._state === To ? this._stateBeforeAttributeValue(t) : this._state === Ao ? this._stateInAttributeValueDoubleQuotes(t) : this._state === yo ? this._stateInAttributeValueSingleQuotes(t) : this._state === Co ? this._stateInAttributeValueNoQuotes(t) : this._state === xh ? this._stateBeforeDeclaration(t) : this._state === Xr ? this._stateInDeclaration(t) : this._state === Rh ? this._stateInProcessingInstruction(t) : this._state === Lh ? this._stateBeforeComment(t) : this._state === Ii ? this._stateInComment(t) : this._state === Io ? this._stateAfterComment1(t) : this._state === So ? this._stateAfterComment2(t) : this._state === Oh ? this._stateBeforeCdata1(t) : this._state === wh ? this._stateBeforeCdata2(t) : this._state === Dh ? this._stateBeforeCdata3(t) : this._state === Ph ? this._stateBeforeCdata4(t) : this._state === Bh ? this._stateBeforeCdata5(t) : this._state === Mh ? this._stateBeforeCdata6(t) : this._state === Si ? this._stateInCdata(t) : this._state === No ? this._stateAfterCdata1(t) : this._state === vo ? this._stateAfterCdata2(t) : this._state === Fh ? this._stateBeforeSpecial(t) : this._state === kh ? this._stateBeforeSpecialEnd(t) : this._state === Uh ? this._stateBeforeScript1(t) : this._state === Hh ? this._stateBeforeScript2(t) : this._state === qh ? this._stateBeforeScript3(t) : this._state === $h ? this._stateBeforeScript4(t) : this._state === Gh ? this._stateBeforeScript5(t) : this._state === Yh ? this._stateAfterScript1(t) : this._state === Vh ? this._stateAfterScript2(t) : this._state === jh ? this._stateAfterScript3(t) : this._state === Wh ? this._stateAfterScript4(t) : this._state === Qh ? this._stateAfterScript5(t) : this._state === Kh ? this._stateBeforeStyle1(t) : this._state === Xh ? this._stateBeforeStyle2(t) : this._state === zh ? this._stateBeforeStyle3(t) : this._state === Jh ? this._stateBeforeStyle4(t) : this._state === Zh ? this._stateAfterStyle1(t) : this._state === td ? this._stateAfterStyle2(t) : this._state === ed ? this._stateAfterStyle3(t) : this._state === nd ? this._stateAfterStyle4(t) : this._state === Ni ? this._stateBeforeEntity(t) : this._state === rd ? this._stateBeforeNumericEntity(t) : this._state === xo ? this._stateInNamedEntity(t) : this._state === Ro ? this._stateInNumericEntity(t) : this._state === Lo ? this._stateInHexEntity(t) : this._cbs.onerror(Error("unknown _state"), this._state), this._index++;
  }
  this._cleanup();
};
ct.prototype.pause = function() {
  this._running = !1;
};
ct.prototype.resume = function() {
  this._running = !0, this._index < this._buffer.length && this._parse(), this._ended && this._finish();
};
ct.prototype.end = function(t) {
  this._ended && this._cbs.onerror(Error(".end() after done!")), t && this.write(t), this._ended = !0, this._running && this._finish();
};
ct.prototype._finish = function() {
  this._sectionStart < this._index && this._handleTrailingData(), this._cbs.onend();
};
ct.prototype._handleTrailingData = function() {
  var t = this._buffer.substr(this._sectionStart);
  this._state === Si || this._state === No || this._state === vo ? this._cbs.oncdata(t) : this._state === Ii || this._state === Io || this._state === So ? this._cbs.oncomment(t) : this._state === xo && !this._xmlMode ? (this._parseLegacyEntity(), this._sectionStart < this._index && (this._state = this._baseState, this._handleTrailingData())) : this._state === Ro && !this._xmlMode ? (this._decodeNumericEntity(2, 10), this._sectionStart < this._index && (this._state = this._baseState, this._handleTrailingData())) : this._state === Lo && !this._xmlMode ? (this._decodeNumericEntity(3, 16), this._sectionStart < this._index && (this._state = this._baseState, this._handleTrailingData())) : this._state !== Is && this._state !== as && this._state !== To && this._state !== _o && this._state !== wa && this._state !== yo && this._state !== Ao && this._state !== Co && this._state !== Ci && this._cbs.ontext(t);
};
ct.prototype.reset = function() {
  ct.call(
    this,
    { xmlMode: this._xmlMode, decodeEntities: this._decodeEntities },
    this._cbs
  );
};
ct.prototype.getAbsoluteIndex = function() {
  return this._bufferOffset + this._index;
};
ct.prototype._getSection = function() {
  return this._buffer.substring(this._sectionStart, this._index);
};
ct.prototype._emitToken = function(t) {
  this._cbs[t](this._getSection()), this._sectionStart = -1;
};
ct.prototype._emitPartial = function(t) {
  this._baseState !== ue ? this._cbs.onattribdata(t) : this._cbs.ontext(t);
};
var ku = { exports: {} };
typeof Object.create == "function" ? ku.exports = function(e, n) {
  n && (e.super_ = n, e.prototype = Object.create(n.prototype, {
    constructor: {
      value: e,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }));
} : ku.exports = function(e, n) {
  if (n) {
    e.super_ = n;
    var r = function() {
    };
    r.prototype = n.prototype, e.prototype = new r(), e.prototype.constructor = e;
  }
};
var Da = ku.exports, wo = { exports: {} }, Bs = typeof Reflect == "object" ? Reflect : null, Qc = Bs && typeof Bs.apply == "function" ? Bs.apply : function(e, n, r) {
  return Function.prototype.apply.call(e, n, r);
}, Ji;
Bs && typeof Bs.ownKeys == "function" ? Ji = Bs.ownKeys : Object.getOwnPropertySymbols ? Ji = function(e) {
  return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
} : Ji = function(e) {
  return Object.getOwnPropertyNames(e);
};
function iZ(t) {
  console && console.warn && console.warn(t);
}
var ad = Number.isNaN || function(e) {
  return e !== e;
};
function re() {
  re.init.call(this);
}
wo.exports = re;
wo.exports.once = cZ;
re.EventEmitter = re;
re.prototype._events = void 0;
re.prototype._eventsCount = 0;
re.prototype._maxListeners = void 0;
var Kc = 10;
function Pa(t) {
  if (typeof t != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t);
}
Object.defineProperty(re, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return Kc;
  },
  set: function(t) {
    if (typeof t != "number" || t < 0 || ad(t))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + t + ".");
    Kc = t;
  }
});
re.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
re.prototype.setMaxListeners = function(e) {
  if (typeof e != "number" || e < 0 || ad(e))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
  return this._maxListeners = e, this;
};
function ud(t) {
  return t._maxListeners === void 0 ? re.defaultMaxListeners : t._maxListeners;
}
re.prototype.getMaxListeners = function() {
  return ud(this);
};
re.prototype.emit = function(e) {
  for (var n = [], r = 1; r < arguments.length; r++)
    n.push(arguments[r]);
  var a = e === "error", u = this._events;
  if (u !== void 0)
    a = a && u.error === void 0;
  else if (!a)
    return !1;
  if (a) {
    var o;
    if (n.length > 0 && (o = n[0]), o instanceof Error)
      throw o;
    var h = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
    throw h.context = o, h;
  }
  var m = u[e];
  if (m === void 0)
    return !1;
  if (typeof m == "function")
    Qc(m, this, n);
  else
    for (var E = m.length, p = hd(m, E), r = 0; r < E; ++r)
      Qc(p[r], this, n);
  return !0;
};
function od(t, e, n, r) {
  var a, u, o;
  if (Pa(n), u = t._events, u === void 0 ? (u = t._events = /* @__PURE__ */ Object.create(null), t._eventsCount = 0) : (u.newListener !== void 0 && (t.emit(
    "newListener",
    e,
    n.listener ? n.listener : n
  ), u = t._events), o = u[e]), o === void 0)
    o = u[e] = n, ++t._eventsCount;
  else if (typeof o == "function" ? o = u[e] = r ? [n, o] : [o, n] : r ? o.unshift(n) : o.push(n), a = ud(t), a > 0 && o.length > a && !o.warned) {
    o.warned = !0;
    var h = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    h.name = "MaxListenersExceededWarning", h.emitter = t, h.type = e, h.count = o.length, iZ(h);
  }
  return t;
}
re.prototype.addListener = function(e, n) {
  return od(this, e, n, !1);
};
re.prototype.on = re.prototype.addListener;
re.prototype.prependListener = function(e, n) {
  return od(this, e, n, !0);
};
function aZ() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function cd(t, e, n) {
  var r = { fired: !1, wrapFn: void 0, target: t, type: e, listener: n }, a = aZ.bind(r);
  return a.listener = n, r.wrapFn = a, a;
}
re.prototype.once = function(e, n) {
  return Pa(n), this.on(e, cd(this, e, n)), this;
};
re.prototype.prependOnceListener = function(e, n) {
  return Pa(n), this.prependListener(e, cd(this, e, n)), this;
};
re.prototype.removeListener = function(e, n) {
  var r, a, u, o, h;
  if (Pa(n), a = this._events, a === void 0)
    return this;
  if (r = a[e], r === void 0)
    return this;
  if (r === n || r.listener === n)
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete a[e], a.removeListener && this.emit("removeListener", e, r.listener || n));
  else if (typeof r != "function") {
    for (u = -1, o = r.length - 1; o >= 0; o--)
      if (r[o] === n || r[o].listener === n) {
        h = r[o].listener, u = o;
        break;
      }
    if (u < 0)
      return this;
    u === 0 ? r.shift() : uZ(r, u), r.length === 1 && (a[e] = r[0]), a.removeListener !== void 0 && this.emit("removeListener", e, h || n);
  }
  return this;
};
re.prototype.off = re.prototype.removeListener;
re.prototype.removeAllListeners = function(e) {
  var n, r, a;
  if (r = this._events, r === void 0)
    return this;
  if (r.removeListener === void 0)
    return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : r[e] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete r[e]), this;
  if (arguments.length === 0) {
    var u = Object.keys(r), o;
    for (a = 0; a < u.length; ++a)
      o = u[a], o !== "removeListener" && this.removeAllListeners(o);
    return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
  }
  if (n = r[e], typeof n == "function")
    this.removeListener(e, n);
  else if (n !== void 0)
    for (a = n.length - 1; a >= 0; a--)
      this.removeListener(e, n[a]);
  return this;
};
function fd(t, e, n) {
  var r = t._events;
  if (r === void 0)
    return [];
  var a = r[e];
  return a === void 0 ? [] : typeof a == "function" ? n ? [a.listener || a] : [a] : n ? oZ(a) : hd(a, a.length);
}
re.prototype.listeners = function(e) {
  return fd(this, e, !0);
};
re.prototype.rawListeners = function(e) {
  return fd(this, e, !1);
};
re.listenerCount = function(t, e) {
  return typeof t.listenerCount == "function" ? t.listenerCount(e) : ld.call(t, e);
};
re.prototype.listenerCount = ld;
function ld(t) {
  var e = this._events;
  if (e !== void 0) {
    var n = e[t];
    if (typeof n == "function")
      return 1;
    if (n !== void 0)
      return n.length;
  }
  return 0;
}
re.prototype.eventNames = function() {
  return this._eventsCount > 0 ? Ji(this._events) : [];
};
function hd(t, e) {
  for (var n = new Array(e), r = 0; r < e; ++r)
    n[r] = t[r];
  return n;
}
function uZ(t, e) {
  for (; e + 1 < t.length; e++)
    t[e] = t[e + 1];
  t.pop();
}
function oZ(t) {
  for (var e = new Array(t.length), n = 0; n < e.length; ++n)
    e[n] = t[n].listener || t[n];
  return e;
}
function cZ(t, e) {
  return new Promise(function(n, r) {
    function a(o) {
      t.removeListener(e, u), r(o);
    }
    function u() {
      typeof t.removeListener == "function" && t.removeListener("error", a), n([].slice.call(arguments));
    }
    dd(t, e, u, { once: !0 }), e !== "error" && fZ(t, a, { once: !0 });
  });
}
function fZ(t, e, n) {
  typeof t.on == "function" && dd(t, "error", e, n);
}
function dd(t, e, n, r) {
  if (typeof t.on == "function")
    r.once ? t.once(e, n) : t.on(e, n);
  else if (typeof t.addEventListener == "function")
    t.addEventListener(e, function a(u) {
      r.once && t.removeEventListener(e, a), n(u);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof t);
}
var lZ = wo.exports, Xc = Ch, Os = {
  input: !0,
  option: !0,
  optgroup: !0,
  select: !0,
  button: !0,
  datalist: !0,
  textarea: !0
}, zc = {
  tr: { tr: !0, th: !0, td: !0 },
  th: { th: !0 },
  td: { thead: !0, th: !0, td: !0 },
  body: { head: !0, link: !0, script: !0 },
  li: { li: !0 },
  p: { p: !0 },
  h1: { p: !0 },
  h2: { p: !0 },
  h3: { p: !0 },
  h4: { p: !0 },
  h5: { p: !0 },
  h6: { p: !0 },
  select: Os,
  input: Os,
  output: Os,
  button: Os,
  datalist: Os,
  textarea: Os,
  option: { option: !0 },
  optgroup: { optgroup: !0 }
}, Do = {
  __proto__: null,
  area: !0,
  base: !0,
  basefont: !0,
  br: !0,
  col: !0,
  command: !0,
  embed: !0,
  frame: !0,
  hr: !0,
  img: !0,
  input: !0,
  isindex: !0,
  keygen: !0,
  link: !0,
  meta: !0,
  param: !0,
  source: !0,
  track: !0,
  wbr: !0
}, pd = {
  __proto__: null,
  math: !0,
  svg: !0
}, gd = {
  __proto__: null,
  mi: !0,
  mo: !0,
  mn: !0,
  ms: !0,
  mtext: !0,
  "annotation-xml": !0,
  foreignObject: !0,
  desc: !0,
  title: !0
}, hZ = /\s|\//;
function ee(t, e) {
  this._options = e || {}, this._cbs = t || {}, this._tagname = "", this._attribname = "", this._attribvalue = "", this._attribs = null, this._stack = [], this._foreignContext = [], this.startIndex = 0, this.endIndex = null, this._lowerCaseTagNames = "lowerCaseTags" in this._options ? !!this._options.lowerCaseTags : !this._options.xmlMode, this._lowerCaseAttributeNames = "lowerCaseAttributeNames" in this._options ? !!this._options.lowerCaseAttributeNames : !this._options.xmlMode, this._options.Tokenizer && (Xc = this._options.Tokenizer), this._tokenizer = new Xc(this._options, this), this._cbs.onparserinit && this._cbs.onparserinit(this);
}
Da(ee, lZ.EventEmitter);
ee.prototype._updatePosition = function(t) {
  this.endIndex === null ? this._tokenizer._sectionStart <= t ? this.startIndex = 0 : this.startIndex = this._tokenizer._sectionStart - t : this.startIndex = this.endIndex + 1, this.endIndex = this._tokenizer.getAbsoluteIndex();
};
ee.prototype.ontext = function(t) {
  this._updatePosition(1), this.endIndex--, this._cbs.ontext && this._cbs.ontext(t);
};
ee.prototype.onopentagname = function(t) {
  if (this._lowerCaseTagNames && (t = t.toLowerCase()), this._tagname = t, !this._options.xmlMode && t in zc)
    for (var e; (e = this._stack[this._stack.length - 1]) in zc[t]; this.onclosetag(e))
      ;
  (this._options.xmlMode || !(t in Do)) && (this._stack.push(t), t in pd ? this._foreignContext.push(!0) : t in gd && this._foreignContext.push(!1)), this._cbs.onopentagname && this._cbs.onopentagname(t), this._cbs.onopentag && (this._attribs = {});
};
ee.prototype.onopentagend = function() {
  this._updatePosition(1), this._attribs && (this._cbs.onopentag && this._cbs.onopentag(this._tagname, this._attribs), this._attribs = null), !this._options.xmlMode && this._cbs.onclosetag && this._tagname in Do && this._cbs.onclosetag(this._tagname), this._tagname = "";
};
ee.prototype.onclosetag = function(t) {
  if (this._updatePosition(1), this._lowerCaseTagNames && (t = t.toLowerCase()), (t in pd || t in gd) && this._foreignContext.pop(), this._stack.length && (!(t in Do) || this._options.xmlMode)) {
    var e = this._stack.lastIndexOf(t);
    if (e !== -1)
      if (this._cbs.onclosetag)
        for (e = this._stack.length - e; e--; )
          this._cbs.onclosetag(this._stack.pop());
      else
        this._stack.length = e;
    else
      t === "p" && !this._options.xmlMode && (this.onopentagname(t), this._closeCurrentTag());
  } else
    !this._options.xmlMode && (t === "br" || t === "p") && (this.onopentagname(t), this._closeCurrentTag());
};
ee.prototype.onselfclosingtag = function() {
  this._options.xmlMode || this._options.recognizeSelfClosing || this._foreignContext[this._foreignContext.length - 1] ? this._closeCurrentTag() : this.onopentagend();
};
ee.prototype._closeCurrentTag = function() {
  var t = this._tagname;
  this.onopentagend(), this._stack[this._stack.length - 1] === t && (this._cbs.onclosetag && this._cbs.onclosetag(t), this._stack.pop());
};
ee.prototype.onattribname = function(t) {
  this._lowerCaseAttributeNames && (t = t.toLowerCase()), this._attribname = t;
};
ee.prototype.onattribdata = function(t) {
  this._attribvalue += t;
};
ee.prototype.onattribend = function() {
  this._cbs.onattribute && this._cbs.onattribute(this._attribname, this._attribvalue), this._attribs && !Object.prototype.hasOwnProperty.call(this._attribs, this._attribname) && (this._attribs[this._attribname] = this._attribvalue), this._attribname = "", this._attribvalue = "";
};
ee.prototype._getInstructionName = function(t) {
  var e = t.search(hZ), n = e < 0 ? t : t.substr(0, e);
  return this._lowerCaseTagNames && (n = n.toLowerCase()), n;
};
ee.prototype.ondeclaration = function(t) {
  if (this._cbs.onprocessinginstruction) {
    var e = this._getInstructionName(t);
    this._cbs.onprocessinginstruction("!" + e, "!" + t);
  }
};
ee.prototype.onprocessinginstruction = function(t) {
  if (this._cbs.onprocessinginstruction) {
    var e = this._getInstructionName(t);
    this._cbs.onprocessinginstruction("?" + e, "?" + t);
  }
};
ee.prototype.oncomment = function(t) {
  this._updatePosition(4), this._cbs.oncomment && this._cbs.oncomment(t), this._cbs.oncommentend && this._cbs.oncommentend();
};
ee.prototype.oncdata = function(t) {
  this._updatePosition(1), this._options.xmlMode || this._options.recognizeCDATA ? (this._cbs.oncdatastart && this._cbs.oncdatastart(), this._cbs.ontext && this._cbs.ontext(t), this._cbs.oncdataend && this._cbs.oncdataend()) : this.oncomment("[CDATA[" + t + "]]");
};
ee.prototype.onerror = function(t) {
  this._cbs.onerror && this._cbs.onerror(t);
};
ee.prototype.onend = function() {
  if (this._cbs.onclosetag)
    for (var t = this._stack.length; t > 0; this._cbs.onclosetag(this._stack[--t]))
      ;
  this._cbs.onend && this._cbs.onend();
};
ee.prototype.reset = function() {
  this._cbs.onreset && this._cbs.onreset(), this._tokenizer.reset(), this._tagname = "", this._attribname = "", this._attribs = null, this._stack = [], this._cbs.onparserinit && this._cbs.onparserinit(this);
};
ee.prototype.parseComplete = function(t) {
  this.reset(), this.end(t);
};
ee.prototype.write = function(t) {
  this._tokenizer.write(t);
};
ee.prototype.end = function(t) {
  this._tokenizer.end(t);
};
ee.prototype.pause = function() {
  this._tokenizer.pause();
};
ee.prototype.resume = function() {
  this._tokenizer.resume();
};
ee.prototype.parseChunk = ee.prototype.write;
ee.prototype.done = ee.prototype.end;
var Ed = ee, js = {
  Text: "text",
  //Text
  Directive: "directive",
  //<? ... ?>
  Comment: "comment",
  //<!-- ... -->
  Script: "script",
  //<script> tags
  Style: "style",
  //<style> tags
  Tag: "tag",
  //Any tag
  CDATA: "cdata",
  //<![CDATA[ ... ]]>
  Doctype: "doctype",
  isTag: function(t) {
    return t.type === "tag" || t.type === "script" || t.type === "style";
  }
}, md = { exports: {} };
md.exports = {
  get firstChild() {
    var t = this.children;
    return t && t[0] || null;
  },
  get lastChild() {
    var t = this.children;
    return t && t[t.length - 1] || null;
  },
  get nodeType() {
    return Jc[this.type] || Jc.element;
  }
};
var dZ = {
  tagName: "name",
  childNodes: "children",
  parentNode: "parent",
  previousSibling: "prev",
  nextSibling: "next",
  nodeValue: "data"
}, Jc = {
  element: 1,
  text: 3,
  cdata: 4,
  comment: 8
};
Object.keys(dZ).forEach(function(t) {
});
var bd = md.exports, _d = { exports: {} }, pZ = bd, gZ = _d.exports = Object.create(pZ), Zc = {
  tagName: "name"
};
Object.keys(Zc).forEach(function(t) {
  var e = Zc[t];
  Object.defineProperty(gZ, t, {
    get: function() {
      return this[e] || null;
    },
    set: function(n) {
      return this[e] = n, n;
    }
  });
});
var EZ = _d.exports, Lr = js, au = /\s+/g, mZ = bd, bZ = EZ;
function un(t, e, n) {
  typeof t == "object" ? (n = e, e = t, t = null) : typeof e == "function" && (n = e, e = tf), this._callback = t, this._options = e || tf, this._elementCB = n, this.dom = [], this._done = !1, this._tagStack = [], this._parser = this._parser || null;
}
var tf = {
  normalizeWhitespace: !1,
  //Replace all whitespace with single spaces
  withStartIndices: !1,
  //Add startIndex properties to nodes
  withEndIndices: !1
  //Add endIndex properties to nodes
};
un.prototype.onparserinit = function(t) {
  this._parser = t;
};
un.prototype.onreset = function() {
  un.call(this, this._callback, this._options, this._elementCB);
};
un.prototype.onend = function() {
  this._done || (this._done = !0, this._parser = null, this._handleCallback(null));
};
un.prototype._handleCallback = un.prototype.onerror = function(t) {
  if (typeof this._callback == "function")
    this._callback(t, this.dom);
  else if (t)
    throw t;
};
un.prototype.onclosetag = function() {
  var t = this._tagStack.pop();
  this._options.withEndIndices && t && (t.endIndex = this._parser.endIndex), this._elementCB && this._elementCB(t);
};
un.prototype._createDomElement = function(t) {
  if (!this._options.withDomLvl1)
    return t;
  var e;
  t.type === "tag" ? e = Object.create(bZ) : e = Object.create(mZ);
  for (var n in t)
    t.hasOwnProperty(n) && (e[n] = t[n]);
  return e;
};
un.prototype._addDomElement = function(t) {
  var e = this._tagStack[this._tagStack.length - 1], n = e ? e.children : this.dom, r = n[n.length - 1];
  t.next = null, this._options.withStartIndices && (t.startIndex = this._parser.startIndex), this._options.withEndIndices && (t.endIndex = this._parser.endIndex), r ? (t.prev = r, r.next = t) : t.prev = null, n.push(t), t.parent = e || null;
};
un.prototype.onopentag = function(t, e) {
  var n = {
    type: t === "script" ? Lr.Script : t === "style" ? Lr.Style : Lr.Tag,
    name: t,
    attribs: e,
    children: []
  }, r = this._createDomElement(n);
  this._addDomElement(r), this._tagStack.push(r);
};
un.prototype.ontext = function(t) {
  var e = this._options.normalizeWhitespace || this._options.ignoreWhitespace, n;
  if (!this._tagStack.length && this.dom.length && (n = this.dom[this.dom.length - 1]).type === Lr.Text)
    e ? n.data = (n.data + t).replace(au, " ") : n.data += t;
  else if (this._tagStack.length && (n = this._tagStack[this._tagStack.length - 1]) && (n = n.children[n.children.length - 1]) && n.type === Lr.Text)
    e ? n.data = (n.data + t).replace(au, " ") : n.data += t;
  else {
    e && (t = t.replace(au, " "));
    var r = this._createDomElement({
      data: t,
      type: Lr.Text
    });
    this._addDomElement(r);
  }
};
un.prototype.oncomment = function(t) {
  var e = this._tagStack[this._tagStack.length - 1];
  if (e && e.type === Lr.Comment) {
    e.data += t;
    return;
  }
  var n = {
    data: t,
    type: Lr.Comment
  }, r = this._createDomElement(n);
  this._addDomElement(r), this._tagStack.push(r);
};
un.prototype.oncdatastart = function() {
  var t = {
    children: [{
      data: "",
      type: Lr.Text
    }],
    type: Lr.CDATA
  }, e = this._createDomElement(t);
  this._addDomElement(e), this._tagStack.push(e);
};
un.prototype.oncommentend = un.prototype.oncdataend = function() {
  this._tagStack.pop();
};
un.prototype.onprocessinginstruction = function(t, e) {
  var n = this._createDomElement({
    name: t,
    data: e,
    type: Lr.Directive
  });
  this._addDomElement(n);
};
var Td = un, Ad = { exports: {} }, yd = { exports: {} }, an = {}, Ba = {}, Po = Id(bo), _Z = Bo(Po);
Ba.XML = xd(Po, _Z);
var Cd = Id(mo), TZ = Bo(Cd);
Ba.HTML = xd(Cd, TZ);
function Id(t) {
  return Object.keys(t).sort().reduce(function(e, n) {
    return e[t[n]] = "&" + n + ";", e;
  }, {});
}
function Bo(t) {
  var e = [], n = [];
  return Object.keys(t).forEach(function(r) {
    r.length === 1 ? e.push("\\" + r) : n.push(r);
  }), n.unshift("[" + e.join("") + "]"), new RegExp(n.join("|"), "g");
}
var Sd = /[^\0-\x7F]/g, Nd = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
function Uu(t) {
  return "&#x" + t.charCodeAt(0).toString(16).toUpperCase() + ";";
}
function vd(t) {
  var e = t.charCodeAt(0), n = t.charCodeAt(1), r = (e - 55296) * 1024 + n - 56320 + 65536;
  return "&#x" + r.toString(16).toUpperCase() + ";";
}
function xd(t, e) {
  function n(r) {
    return t[r];
  }
  return function(r) {
    return r.replace(e, n).replace(Nd, vd).replace(Sd, Uu);
  };
}
var AZ = Bo(Po);
function yZ(t) {
  return t.replace(AZ, Uu).replace(Nd, vd).replace(Sd, Uu);
}
Ba.escape = yZ;
var Hu = mo, CZ = yh, IZ = bo, ef = Ah, SZ = Rd(IZ), NZ = Rd(Hu);
function Rd(t) {
  var e = Object.keys(t).join("|"), n = Ld(t);
  e += "|#[xX][\\da-fA-F]+|#\\d+";
  var r = new RegExp("&(?:" + e + ");", "g");
  return function(a) {
    return String(a).replace(r, n);
  };
}
var vZ = function() {
  for (var t = Object.keys(CZ).sort(nf), e = Object.keys(Hu).sort(nf), n = 0, r = 0; n < e.length; n++)
    t[r] === e[n] ? (e[n] += ";?", r++) : e[n] += ";";
  var a = new RegExp("&(?:" + e.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)", "g"), u = Ld(Hu);
  function o(h) {
    return h.substr(-1) !== ";" && (h += ";"), u(h);
  }
  return function(h) {
    return String(h).replace(a, o);
  };
}();
function nf(t, e) {
  return t < e ? 1 : -1;
}
function Ld(t) {
  return function(n) {
    return n.charAt(1) === "#" ? n.charAt(2) === "X" || n.charAt(2) === "x" ? ef(parseInt(n.substr(3), 16)) : ef(parseInt(n.substr(2), 10)) : t[n.slice(1, -1)];
  };
}
var xZ = {
  XML: SZ,
  HTML: vZ,
  HTMLStrict: NZ
}, gi = Ba, Ts = xZ;
an.decode = function(t, e) {
  return (!e || e <= 0 ? Ts.XML : Ts.HTML)(t);
};
an.decodeStrict = function(t, e) {
  return (!e || e <= 0 ? Ts.XML : Ts.HTMLStrict)(t);
};
an.encode = function(t, e) {
  return (!e || e <= 0 ? gi.XML : gi.HTML)(t);
};
an.encodeXML = gi.XML;
an.encodeHTML4 = an.encodeHTML5 = an.encodeHTML = gi.HTML;
an.decodeXML = an.decodeXMLStrict = Ts.XML;
an.decodeHTML4 = an.decodeHTML5 = an.decodeHTML = Ts.HTML;
an.decodeHTML4Strict = an.decodeHTML5Strict = an.decodeHTMLStrict = Ts.HTMLStrict;
an.escape = gi.escape;
var Yi = js, Od = an, RZ = {
  __proto__: null,
  style: !0,
  script: !0,
  xmp: !0,
  iframe: !0,
  noembed: !0,
  noframes: !0,
  plaintext: !0,
  noscript: !0
};
function LZ(t, e) {
  if (t) {
    var n = "", r;
    for (var a in t)
      r = t[a], n && (n += " "), n += a, (r !== null && r !== "" || e.xmlMode) && (n += '="' + (e.decodeEntities ? Od.encodeXML(r) : r) + '"');
    return n;
  }
}
var OZ = {
  __proto__: null,
  area: !0,
  base: !0,
  basefont: !0,
  br: !0,
  col: !0,
  command: !0,
  embed: !0,
  frame: !0,
  hr: !0,
  img: !0,
  input: !0,
  isindex: !0,
  keygen: !0,
  link: !0,
  meta: !0,
  param: !0,
  source: !0,
  track: !0,
  wbr: !0
}, wd = yd.exports = function(t, e) {
  !Array.isArray(t) && !t.cheerio && (t = [t]), e = e || {};
  for (var n = "", r = 0; r < t.length; r++) {
    var a = t[r];
    a.type === "root" ? n += wd(a.children, e) : Yi.isTag(a) ? n += wZ(a, e) : a.type === Yi.Directive ? n += DZ(a) : a.type === Yi.Comment ? n += MZ(a) : a.type === Yi.CDATA ? n += BZ(a) : n += PZ(a, e);
  }
  return n;
};
function wZ(t, e) {
  t.name === "svg" && (e = { decodeEntities: e.decodeEntities, xmlMode: !0 });
  var n = "<" + t.name, r = LZ(t.attribs, e);
  return r && (n += " " + r), e.xmlMode && (!t.children || t.children.length === 0) ? n += "/>" : (n += ">", t.children && (n += wd(t.children, e)), (!OZ[t.name] || e.xmlMode) && (n += "</" + t.name + ">")), n;
}
function DZ(t) {
  return "<" + t.data + ">";
}
function PZ(t, e) {
  var n = t.data || "";
  return e.decodeEntities && !(t.parent && t.parent.name in RZ) && (n = Od.encodeXML(n)), n;
}
function BZ(t) {
  return "<![CDATA[" + t.children[0].data + "]]>";
}
function MZ(t) {
  return "<!--" + t.data + "-->";
}
var Mo = yd.exports, qu = js, Dd = Mo, FZ = qu.isTag, kZ = {
  getInnerHTML: UZ,
  getOuterHTML: Dd,
  getText: $u
};
function UZ(t, e) {
  return t.children ? t.children.map(function(n) {
    return Dd(n, e);
  }).join("") : "";
}
function $u(t) {
  return Array.isArray(t) ? t.map($u).join("") : FZ(t) || t.type === qu.CDATA ? $u(t.children) : t.type === qu.Text ? t.data : "";
}
var Ns = {}, HZ = Ns.getChildren = function(t) {
  return t.children;
}, qZ = Ns.getParent = function(t) {
  return t.parent;
};
Ns.getSiblings = function(t) {
  var e = qZ(t);
  return e ? HZ(e) : [t];
};
Ns.getAttributeValue = function(t, e) {
  return t.attribs && t.attribs[e];
};
Ns.hasAttrib = function(t, e) {
  return !!t.attribs && hasOwnProperty.call(t.attribs, e);
};
Ns.getName = function(t) {
  return t.name;
};
var Ws = {};
Ws.removeElement = function(t) {
  if (t.prev && (t.prev.next = t.next), t.next && (t.next.prev = t.prev), t.parent) {
    var e = t.parent.children;
    e.splice(e.lastIndexOf(t), 1);
  }
};
Ws.replaceElement = function(t, e) {
  var n = e.prev = t.prev;
  n && (n.next = e);
  var r = e.next = t.next;
  r && (r.prev = e);
  var a = e.parent = t.parent;
  if (a) {
    var u = a.children;
    u[u.lastIndexOf(t)] = e;
  }
};
Ws.appendChild = function(t, e) {
  if (e.parent = t, t.children.push(e) !== 1) {
    var n = t.children[t.children.length - 2];
    n.next = e, e.prev = n, e.next = null;
  }
};
Ws.append = function(t, e) {
  var n = t.parent, r = t.next;
  if (e.next = r, e.prev = t, t.next = e, e.parent = n, r) {
    if (r.prev = e, n) {
      var a = n.children;
      a.splice(a.lastIndexOf(r), 0, e);
    }
  } else
    n && n.children.push(e);
};
Ws.prepend = function(t, e) {
  var n = t.parent;
  if (n) {
    var r = n.children;
    r.splice(r.lastIndexOf(t), 0, e);
  }
  t.prev && (t.prev.next = e), e.parent = n, e.prev = t.prev, e.next = t, t.prev = e;
};
var Fo = js.isTag, $Z = {
  filter: GZ,
  find: ko,
  findOneChild: YZ,
  findOne: Pd,
  existsOne: Bd,
  findAll: Md
};
function GZ(t, e, n, r) {
  return Array.isArray(e) || (e = [e]), (typeof r != "number" || !isFinite(r)) && (r = 1 / 0), ko(t, e, n !== !1, r);
}
function ko(t, e, n, r) {
  for (var a = [], u, o = 0, h = e.length; o < h && !(t(e[o]) && (a.push(e[o]), --r <= 0) || (u = e[o].children, n && u && u.length > 0 && (u = ko(t, u, n, r), a = a.concat(u), r -= u.length, r <= 0))); o++)
    ;
  return a;
}
function YZ(t, e) {
  for (var n = 0, r = e.length; n < r; n++)
    if (t(e[n]))
      return e[n];
  return null;
}
function Pd(t, e) {
  for (var n = null, r = 0, a = e.length; r < a && !n; r++)
    if (Fo(e[r]))
      t(e[r]) ? n = e[r] : e[r].children.length > 0 && (n = Pd(t, e[r].children));
    else
      continue;
  return n;
}
function Bd(t, e) {
  for (var n = 0, r = e.length; n < r; n++)
    if (Fo(e[n]) && (t(e[n]) || e[n].children.length > 0 && Bd(t, e[n].children)))
      return !0;
  return !1;
}
function Md(t, e) {
  for (var n = [], r = 0, a = e.length; r < a; r++)
    Fo(e[r]) && (t(e[r]) && n.push(e[r]), e[r].children.length > 0 && (n = n.concat(Md(t, e[r].children))));
  return n;
}
var vs = {}, VZ = js, gs = vs.isTag = VZ.isTag;
vs.testElement = function(t, e) {
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      if (n === "tag_name") {
        if (!gs(e) || !t.tag_name(e.name))
          return !1;
      } else if (n === "tag_type") {
        if (!t.tag_type(e.type))
          return !1;
      } else if (n === "tag_contains") {
        if (gs(e) || !t.tag_contains(e.data))
          return !1;
      } else if (!e.attribs || !t[n](e.attribs[n]))
        return !1;
    }
  return !0;
};
var la = {
  tag_name: function(t) {
    return typeof t == "function" ? function(e) {
      return gs(e) && t(e.name);
    } : t === "*" ? gs : function(e) {
      return gs(e) && e.name === t;
    };
  },
  tag_type: function(t) {
    return typeof t == "function" ? function(e) {
      return t(e.type);
    } : function(e) {
      return e.type === t;
    };
  },
  tag_contains: function(t) {
    return typeof t == "function" ? function(e) {
      return !gs(e) && t(e.data);
    } : function(e) {
      return !gs(e) && e.data === t;
    };
  }
};
function Fd(t, e) {
  return typeof e == "function" ? function(n) {
    return n.attribs && e(n.attribs[t]);
  } : function(n) {
    return n.attribs && n.attribs[t] === e;
  };
}
function jZ(t, e) {
  return function(n) {
    return t(n) || e(n);
  };
}
vs.getElements = function(t, e, n, r) {
  var a = Object.keys(t).map(function(u) {
    var o = t[u];
    return u in la ? la[u](o) : Fd(u, o);
  });
  return a.length === 0 ? [] : this.filter(
    a.reduce(jZ),
    e,
    n,
    r
  );
};
vs.getElementById = function(t, e, n) {
  return Array.isArray(e) || (e = [e]), this.findOne(Fd("id", t), e, n !== !1);
};
vs.getElementsByTagName = function(t, e, n, r) {
  return this.filter(la.tag_name(t), e, n, r);
};
vs.getElementsByTagType = function(t, e, n, r) {
  return this.filter(la.tag_type(t), e, n, r);
};
var Ma = {};
Ma.removeSubsets = function(t) {
  for (var e = t.length, n, r, a; --e > -1; ) {
    for (n = r = t[e], t[e] = null, a = !0; r; ) {
      if (t.indexOf(r) > -1) {
        a = !1, t.splice(e, 1);
        break;
      }
      r = r.parent;
    }
    a && (t[e] = n);
  }
  return t;
};
var Wr = {
  DISCONNECTED: 1,
  PRECEDING: 2,
  FOLLOWING: 4,
  CONTAINS: 8,
  CONTAINED_BY: 16
}, WZ = Ma.compareDocumentPosition = function(t, e) {
  var n = [], r = [], a, u, o, h, m, E;
  if (t === e)
    return 0;
  for (a = t; a; )
    n.unshift(a), a = a.parent;
  for (a = e; a; )
    r.unshift(a), a = a.parent;
  for (E = 0; n[E] === r[E]; )
    E++;
  return E === 0 ? Wr.DISCONNECTED : (u = n[E - 1], o = u.children, h = n[E], m = r[E], o.indexOf(h) > o.indexOf(m) ? u === e ? Wr.FOLLOWING | Wr.CONTAINED_BY : Wr.FOLLOWING : u === t ? Wr.PRECEDING | Wr.CONTAINS : Wr.PRECEDING);
};
Ma.uniqueSort = function(t) {
  var e = t.length, n, r;
  for (t = t.slice(); --e > -1; )
    n = t[e], r = t.indexOf(n), r > -1 && r < e && t.splice(e, 1);
  return t.sort(function(a, u) {
    var o = WZ(a, u);
    return o & Wr.PRECEDING ? -1 : o & Wr.FOLLOWING ? 1 : 0;
  }), t;
};
(function(t) {
  var e = t.exports;
  [
    kZ,
    Ns,
    Ws,
    $Z,
    vs,
    Ma
  ].forEach(function(n) {
    Object.keys(n).forEach(function(r) {
      e[r] = n[r].bind(e);
    });
  });
})(Ad);
var xs = Ad.exports, uu, rf;
function QZ() {
  if (rf)
    return uu;
  rf = 1;
  var t = Td, e = xs;
  function n(m, E) {
    this.init(m, E);
  }
  Da(n, t), n.prototype.init = t;
  function r(m, E) {
    return e.getElementsByTagName(m, E, !0);
  }
  function a(m, E) {
    return e.getElementsByTagName(m, E, !0, 1)[0];
  }
  function u(m, E, p) {
    return e.getText(
      e.getElementsByTagName(m, E, p, 1)
    ).trim();
  }
  function o(m, E, p, N, v) {
    var S = u(p, N, v);
    S && (m[E] = S);
  }
  var h = function(m) {
    return m === "rss" || m === "feed" || m === "rdf:RDF";
  };
  return n.prototype.onend = function() {
    var m = {}, E = a(h, this.dom), p, N;
    E && (E.name === "feed" ? (N = E.children, m.type = "atom", o(m, "id", "id", N), o(m, "title", "title", N), (p = a("link", N)) && (p = p.attribs) && (p = p.href) && (m.link = p), o(m, "description", "subtitle", N), (p = u("updated", N)) && (m.updated = new Date(p)), o(m, "author", "email", N, !0), m.items = r("entry", N).map(function(v) {
      var S = {}, L;
      return v = v.children, o(S, "id", "id", v), o(S, "title", "title", v), (L = a("link", v)) && (L = L.attribs) && (L = L.href) && (S.link = L), (L = u("summary", v) || u("content", v)) && (S.description = L), (L = u("updated", v)) && (S.pubDate = new Date(L)), S;
    })) : (N = a("channel", E.children).children, m.type = E.name.substr(0, 3), m.id = "", o(m, "title", "title", N), o(m, "link", "link", N), o(m, "description", "description", N), (p = u("lastBuildDate", N)) && (m.updated = new Date(p)), o(m, "author", "managingEditor", N, !0), m.items = r("item", E.children).map(function(v) {
      var S = {}, L;
      return v = v.children, o(S, "id", "guid", v), o(S, "title", "title", v), o(S, "link", "link", v), o(S, "description", "description", v), (L = u("pubDate", v)) && (S.pubDate = new Date(L)), S;
    }))), this.dom = m, t.prototype._handleCallback.call(
      this,
      E ? null : Error("couldn't find root of feed")
    );
  }, uu = n, uu;
}
const KZ = {}, XZ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: KZ
}, Symbol.toStringTag, { value: "Module" })), zZ = /* @__PURE__ */ Al(XZ);
var ou = {}, Vi = { exports: {} };
const kd = /* @__PURE__ */ Al(Z1);
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var sf;
function JZ() {
  return sf || (sf = 1, function(t, e) {
    var n = kd, r = n.Buffer;
    function a(o, h) {
      for (var m in o)
        h[m] = o[m];
    }
    r.from && r.alloc && r.allocUnsafe && r.allocUnsafeSlow ? t.exports = n : (a(n, e), e.Buffer = u);
    function u(o, h, m) {
      return r(o, h, m);
    }
    u.prototype = Object.create(r.prototype), a(r, u), u.from = function(o, h, m) {
      if (typeof o == "number")
        throw new TypeError("Argument must not be a number");
      return r(o, h, m);
    }, u.alloc = function(o, h, m) {
      if (typeof o != "number")
        throw new TypeError("Argument must be a number");
      var E = r(o);
      return h !== void 0 ? typeof m == "string" ? E.fill(h, m) : E.fill(h) : E.fill(0), E;
    }, u.allocUnsafe = function(o) {
      if (typeof o != "number")
        throw new TypeError("Argument must be a number");
      return r(o);
    }, u.allocUnsafeSlow = function(o) {
      if (typeof o != "number")
        throw new TypeError("Argument must be a number");
      return n.SlowBuffer(o);
    };
  }(Vi, Vi.exports)), Vi.exports;
}
var af;
function ZZ() {
  if (af)
    return ou;
  af = 1;
  var t = JZ().Buffer, e = t.isEncoding || function(O) {
    switch (O = "" + O, O && O.toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
      case "raw":
        return !0;
      default:
        return !1;
    }
  };
  function n(O) {
    if (!O)
      return "utf8";
    for (var F; ; )
      switch (O) {
        case "utf8":
        case "utf-8":
          return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return "utf16le";
        case "latin1":
        case "binary":
          return "latin1";
        case "base64":
        case "ascii":
        case "hex":
          return O;
        default:
          if (F)
            return;
          O = ("" + O).toLowerCase(), F = !0;
      }
  }
  function r(O) {
    var F = n(O);
    if (typeof F != "string" && (t.isEncoding === e || !e(O)))
      throw new Error("Unknown encoding: " + O);
    return F || O;
  }
  ou.StringDecoder = a;
  function a(O) {
    this.encoding = r(O);
    var F;
    switch (this.encoding) {
      case "utf16le":
        this.text = N, this.end = v, F = 4;
        break;
      case "utf8":
        this.fillLast = m, F = 4;
        break;
      case "base64":
        this.text = S, this.end = L, F = 3;
        break;
      default:
        this.write = W, this.end = M;
        return;
    }
    this.lastNeed = 0, this.lastTotal = 0, this.lastChar = t.allocUnsafe(F);
  }
  a.prototype.write = function(O) {
    if (O.length === 0)
      return "";
    var F, Z;
    if (this.lastNeed) {
      if (F = this.fillLast(O), F === void 0)
        return "";
      Z = this.lastNeed, this.lastNeed = 0;
    } else
      Z = 0;
    return Z < O.length ? F ? F + this.text(O, Z) : this.text(O, Z) : F || "";
  }, a.prototype.end = p, a.prototype.text = E, a.prototype.fillLast = function(O) {
    if (this.lastNeed <= O.length)
      return O.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    O.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, O.length), this.lastNeed -= O.length;
  };
  function u(O) {
    return O <= 127 ? 0 : O >> 5 === 6 ? 2 : O >> 4 === 14 ? 3 : O >> 3 === 30 ? 4 : O >> 6 === 2 ? -1 : -2;
  }
  function o(O, F, Z) {
    var Q = F.length - 1;
    if (Q < Z)
      return 0;
    var U = u(F[Q]);
    return U >= 0 ? (U > 0 && (O.lastNeed = U - 1), U) : --Q < Z || U === -2 ? 0 : (U = u(F[Q]), U >= 0 ? (U > 0 && (O.lastNeed = U - 2), U) : --Q < Z || U === -2 ? 0 : (U = u(F[Q]), U >= 0 ? (U > 0 && (U === 2 ? U = 0 : O.lastNeed = U - 3), U) : 0));
  }
  function h(O, F, Z) {
    if ((F[0] & 192) !== 128)
      return O.lastNeed = 0, "�";
    if (O.lastNeed > 1 && F.length > 1) {
      if ((F[1] & 192) !== 128)
        return O.lastNeed = 1, "�";
      if (O.lastNeed > 2 && F.length > 2 && (F[2] & 192) !== 128)
        return O.lastNeed = 2, "�";
    }
  }
  function m(O) {
    var F = this.lastTotal - this.lastNeed, Z = h(this, O);
    if (Z !== void 0)
      return Z;
    if (this.lastNeed <= O.length)
      return O.copy(this.lastChar, F, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    O.copy(this.lastChar, F, 0, O.length), this.lastNeed -= O.length;
  }
  function E(O, F) {
    var Z = o(this, O, F);
    if (!this.lastNeed)
      return O.toString("utf8", F);
    this.lastTotal = Z;
    var Q = O.length - (Z - this.lastNeed);
    return O.copy(this.lastChar, 0, Q), O.toString("utf8", F, Q);
  }
  function p(O) {
    var F = O && O.length ? this.write(O) : "";
    return this.lastNeed ? F + "�" : F;
  }
  function N(O, F) {
    if ((O.length - F) % 2 === 0) {
      var Z = O.toString("utf16le", F);
      if (Z) {
        var Q = Z.charCodeAt(Z.length - 1);
        if (Q >= 55296 && Q <= 56319)
          return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = O[O.length - 2], this.lastChar[1] = O[O.length - 1], Z.slice(0, -1);
      }
      return Z;
    }
    return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = O[O.length - 1], O.toString("utf16le", F, O.length - 1);
  }
  function v(O) {
    var F = O && O.length ? this.write(O) : "";
    if (this.lastNeed) {
      var Z = this.lastTotal - this.lastNeed;
      return F + this.lastChar.toString("utf16le", 0, Z);
    }
    return F;
  }
  function S(O, F) {
    var Z = (O.length - F) % 3;
    return Z === 0 ? O.toString("base64", F) : (this.lastNeed = 3 - Z, this.lastTotal = 3, Z === 1 ? this.lastChar[0] = O[O.length - 1] : (this.lastChar[0] = O[O.length - 2], this.lastChar[1] = O[O.length - 1]), O.toString("base64", F, O.length - Z));
  }
  function L(O) {
    var F = O && O.length ? this.write(O) : "";
    return this.lastNeed ? F + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : F;
  }
  function W(O) {
    return O.toString(this.encoding);
  }
  function M(O) {
    return O && O.length ? this.write(O) : "";
  }
  return ou;
}
var cu, uf;
function Ud() {
  if (uf)
    return cu;
  uf = 1, cu = a;
  var t = Ed, e = zZ.Writable, n = ZZ().StringDecoder, r = kd.Buffer;
  function a(u, o) {
    var h = this._parser = new t(u, o), m = this._decoder = new n();
    e.call(this, { decodeStrings: !1 }), this.once("finish", function() {
      h.end(m.end());
    });
  }
  return Da(a, e), a.prototype._write = function(u, o, h) {
    u instanceof r && (u = this._decoder.write(u)), this._parser.write(u), h();
  }, cu;
}
var fu, of;
function ttt() {
  if (of)
    return fu;
  of = 1, fu = e;
  var t = Ud();
  function e(a) {
    t.call(this, new n(this), a);
  }
  Da(e, t), e.prototype.readable = !0;
  function n(a) {
    this.scope = a;
  }
  var r = vi().EVENTS;
  return Object.keys(r).forEach(function(a) {
    if (r[a] === 0)
      n.prototype["on" + a] = function() {
        this.scope.emit(a);
      };
    else if (r[a] === 1)
      n.prototype["on" + a] = function(u) {
        this.scope.emit(a, u);
      };
    else if (r[a] === 2)
      n.prototype["on" + a] = function(u, o) {
        this.scope.emit(a, u, o);
      };
    else
      throw Error("wrong number of arguments!");
  }), fu;
}
var lu, cf;
function ett() {
  if (cf)
    return lu;
  cf = 1, lu = t;
  function t(n) {
    this._cbs = n || {};
  }
  var e = vi().EVENTS;
  return Object.keys(e).forEach(function(n) {
    if (e[n] === 0)
      n = "on" + n, t.prototype[n] = function() {
        this._cbs[n] && this._cbs[n]();
      };
    else if (e[n] === 1)
      n = "on" + n, t.prototype[n] = function(r) {
        this._cbs[n] && this._cbs[n](r);
      };
    else if (e[n] === 2)
      n = "on" + n, t.prototype[n] = function(r, a) {
        this._cbs[n] && this._cbs[n](r, a);
      };
    else
      throw Error("wrong number of arguments");
  }), lu;
}
var hu, ff;
function ntt() {
  if (ff)
    return hu;
  ff = 1, hu = t;
  function t(n) {
    this._cbs = n || {}, this.events = [];
  }
  var e = vi().EVENTS;
  return Object.keys(e).forEach(function(n) {
    if (e[n] === 0)
      n = "on" + n, t.prototype[n] = function() {
        this.events.push([n]), this._cbs[n] && this._cbs[n]();
      };
    else if (e[n] === 1)
      n = "on" + n, t.prototype[n] = function(r) {
        this.events.push([n, r]), this._cbs[n] && this._cbs[n](r);
      };
    else if (e[n] === 2)
      n = "on" + n, t.prototype[n] = function(r, a) {
        this.events.push([n, r, a]), this._cbs[n] && this._cbs[n](r, a);
      };
    else
      throw Error("wrong number of arguments");
  }), t.prototype.onreset = function() {
    this.events = [], this._cbs.onreset && this._cbs.onreset();
  }, t.prototype.restart = function() {
    this._cbs.onreset && this._cbs.onreset();
    for (var n = 0, r = this.events.length; n < r; n++)
      if (this._cbs[this.events[n][0]]) {
        var a = this.events[n].length;
        a === 1 ? this._cbs[this.events[n][0]]() : a === 2 ? this._cbs[this.events[n][0]](this.events[n][1]) : this._cbs[this.events[n][0]](
          this.events[n][1],
          this.events[n][2]
        );
      }
  }, hu;
}
var lf;
function vi() {
  return lf || (lf = 1, function(t) {
    var e = Ed, n = Td;
    function r(a, u) {
      return delete t.exports[a], t.exports[a] = u, u;
    }
    t.exports = {
      Parser: e,
      Tokenizer: Ch,
      ElementType: js,
      DomHandler: n,
      get FeedHandler() {
        return r("FeedHandler", QZ());
      },
      get Stream() {
        return r("Stream", ttt());
      },
      get WritableStream() {
        return r("WritableStream", Ud());
      },
      get ProxyHandler() {
        return r("ProxyHandler", ett());
      },
      get DomUtils() {
        return r("DomUtils", xs);
      },
      get CollectingHandler() {
        return r(
          "CollectingHandler",
          ntt()
        );
      },
      // For legacy support
      DefaultHandler: n,
      get RssHandler() {
        return r("RssHandler", this.FeedHandler);
      },
      //helper methods
      parseDOM: function(a, u) {
        var o = new n(u);
        return new e(o, u).end(a), o.dom;
      },
      parseFeed: function(a, u) {
        var o = new t.exports.FeedHandler(u);
        return new e(o, u).end(a), o.dom;
      },
      createDomStream: function(a, u, o) {
        var h = new n(a, u, o);
        return new e(h, u);
      },
      // List of all events that the parser emits
      EVENTS: {
        /* Format: eventname: number of arguments */
        attribute: 2,
        cdatastart: 0,
        cdataend: 0,
        text: 1,
        processinginstruction: 2,
        comment: 1,
        commentend: 0,
        closetag: 1,
        opentag: 2,
        opentagname: 1,
        error: 1,
        end: 0
      }
    };
  }(iu)), iu.exports;
}
(function(t, e) {
  var n = vi();
  e = t.exports = function(r, a) {
    var u = e.evaluate(r, a), o = e.evaluate("<root></root>", a)[0];
    return o.type = "root", e.update(u, o), o;
  }, e.evaluate = function(r, a) {
    var u;
    return typeof r == "string" || oa.isBuffer(r) ? u = n.parseDOM(r, a) : u = r, u;
  }, e.update = function(r, a) {
    Array.isArray(r) || (r = [r]), a ? a.children = r : a = null;
    for (var u = 0; u < r.length; u++) {
      var o = r[u], h = o.parent || o.root, m = h && h.children;
      m && m !== r && (m.splice(m.indexOf(o), 1), o.prev && (o.prev.next = o.next), o.next && (o.next.prev = o.prev)), a ? (o.prev = r[u - 1] || null, o.next = r[u + 1] || null) : o.prev = o.next = null, a && a.type === "root" ? (o.root = a, o.parent = null) : (o.root = null, o.parent = a);
    }
    return a;
  };
})(Fu, Fu.exports);
var Fa = Fu.exports, wr = {}, rtt = Fa, stt = Mo, itt = { tag: !0, script: !0, style: !0 };
wr.isTag = function(t) {
  return t.type && (t = t.type), itt[t] || !1;
};
wr.camelCase = function(t) {
  return t.replace(/[_.-](\w|$)/g, function(e, n) {
    return n.toUpperCase();
  });
};
wr.cssCase = function(t) {
  return t.replace(/[A-Z]/g, "-$&").toLowerCase();
};
wr.domEach = function(t, e) {
  for (var n = 0, r = t.length; n < r && e.call(t, n, t[n]) !== !1; )
    ++n;
  return t;
};
wr.cloneDom = function(t, e) {
  return rtt(stt(t, e), e).children;
};
var att = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/;
wr.isHtml = function(t) {
  if (t.charAt(0) === "<" && t.charAt(t.length - 1) === ">" && t.length >= 3)
    return !0;
  var e = att.exec(t);
  return !!(e && e[1]);
};
var Hd = 9007199254740991, utt = "[object Arguments]", ott = "[object Function]", ctt = "[object GeneratorFunction]", ftt = /^(?:0|[1-9]\d*)$/;
function ltt(t, e, n) {
  switch (n.length) {
    case 0:
      return t.call(e);
    case 1:
      return t.call(e, n[0]);
    case 2:
      return t.call(e, n[0], n[1]);
    case 3:
      return t.call(e, n[0], n[1], n[2]);
  }
  return t.apply(e, n);
}
function htt(t, e) {
  for (var n = -1, r = Array(t); ++n < t; )
    r[n] = e(n);
  return r;
}
var ka = Object.prototype, Ua = ka.hasOwnProperty, qd = ka.toString, dtt = ka.propertyIsEnumerable, hf = Math.max;
function ptt(t, e) {
  var n = Itt(t) || Ctt(t) ? htt(t.length, String) : [], r = n.length, a = !!r;
  for (var u in t)
    (e || Ua.call(t, u)) && !(a && (u == "length" || $d(u, r))) && n.push(u);
  return n;
}
function gtt(t, e, n) {
  var r = t[e];
  (!(Ua.call(t, e) && Gd(r, n)) || n === void 0 && !(e in t)) && (t[e] = n);
}
function Ett(t) {
  if (!Ho(t))
    return ytt(t);
  var e = Att(t), n = [];
  for (var r in t)
    r == "constructor" && (e || !Ua.call(t, r)) || n.push(r);
  return n;
}
function mtt(t, e) {
  return e = hf(e === void 0 ? t.length - 1 : e, 0), function() {
    for (var n = arguments, r = -1, a = hf(n.length - e, 0), u = Array(a); ++r < a; )
      u[r] = n[e + r];
    r = -1;
    for (var o = Array(e + 1); ++r < e; )
      o[r] = n[r];
    return o[e] = u, ltt(t, this, o);
  };
}
function btt(t, e, n, r) {
  n || (n = {});
  for (var a = -1, u = e.length; ++a < u; ) {
    var o = e[a], h = r ? r(n[o], t[o], o, n, t) : void 0;
    gtt(n, o, h === void 0 ? t[o] : h);
  }
  return n;
}
function _tt(t) {
  return mtt(function(e, n) {
    var r = -1, a = n.length, u = a > 1 ? n[a - 1] : void 0, o = a > 2 ? n[2] : void 0;
    for (u = t.length > 3 && typeof u == "function" ? (a--, u) : void 0, o && Ttt(n[0], n[1], o) && (u = a < 3 ? void 0 : u, a = 1), e = Object(e); ++r < a; ) {
      var h = n[r];
      h && t(e, h, r, u);
    }
    return e;
  });
}
function $d(t, e) {
  return e = e ?? Hd, !!e && (typeof t == "number" || ftt.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
function Ttt(t, e, n) {
  if (!Ho(n))
    return !1;
  var r = typeof e;
  return (r == "number" ? Uo(n) && $d(e, n.length) : r == "string" && e in n) ? Gd(n[e], t) : !1;
}
function Att(t) {
  var e = t && t.constructor, n = typeof e == "function" && e.prototype || ka;
  return t === n;
}
function ytt(t) {
  var e = [];
  if (t != null)
    for (var n in Object(t))
      e.push(n);
  return e;
}
function Gd(t, e) {
  return t === e || t !== t && e !== e;
}
function Ctt(t) {
  return Stt(t) && Ua.call(t, "callee") && (!dtt.call(t, "callee") || qd.call(t) == utt);
}
var Itt = Array.isArray;
function Uo(t) {
  return t != null && vtt(t.length) && !Ntt(t);
}
function Stt(t) {
  return xtt(t) && Uo(t);
}
function Ntt(t) {
  var e = Ho(t) ? qd.call(t) : "";
  return e == ott || e == ctt;
}
function vtt(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= Hd;
}
function Ho(t) {
  var e = typeof t;
  return !!t && (e == "object" || e == "function");
}
function xtt(t) {
  return !!t && typeof t == "object";
}
var Rtt = _tt(function(t, e) {
  btt(e, Ltt(e), t);
});
function Ltt(t) {
  return Uo(t) ? ptt(t, !0) : Ett(t);
}
var Yd = Rtt, Ott = "Expected a function", df = "__lodash_placeholder__", rs = 1, Ha = 2, wtt = 4, Ms = 8, ci = 16, ms = 32, Ei = 64, Vd = 128, Dtt = 256, jd = 512, pf = 1 / 0, Ptt = 9007199254740991, Btt = 17976931348623157e292, gf = NaN, Mtt = [
  ["ary", Vd],
  ["bind", rs],
  ["bindKey", Ha],
  ["curry", Ms],
  ["curryRight", ci],
  ["flip", jd],
  ["partial", ms],
  ["partialRight", Ei],
  ["rearg", Dtt]
], Ftt = "[object Function]", ktt = "[object GeneratorFunction]", Utt = "[object Symbol]", Htt = /[\\^$.*+?()[\]{}|]/g, qtt = /^\s+|\s+$/g, $tt = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, Gtt = /\{\n\/\* \[wrapped with (.+)\] \*/, Ytt = /,? & /, Vtt = /^[-+]0x[0-9a-f]+$/i, jtt = /^0b[01]+$/i, Wtt = /^\[object .+?Constructor\]$/, Qtt = /^0o[0-7]+$/i, Ktt = /^(?:0|[1-9]\d*)$/, Xtt = parseInt, ztt = typeof qt == "object" && qt && qt.Object === Object && qt, Jtt = typeof self == "object" && self && self.Object === Object && self, xi = ztt || Jtt || Function("return this")();
function qo(t, e, n) {
  switch (n.length) {
    case 0:
      return t.call(e);
    case 1:
      return t.call(e, n[0]);
    case 2:
      return t.call(e, n[0], n[1]);
    case 3:
      return t.call(e, n[0], n[1], n[2]);
  }
  return t.apply(e, n);
}
function Ztt(t, e) {
  for (var n = -1, r = t ? t.length : 0; ++n < r && e(t[n], n, t) !== !1; )
    ;
  return t;
}
function tet(t, e) {
  var n = t ? t.length : 0;
  return !!n && net(t, e, 0) > -1;
}
function eet(t, e, n, r) {
  for (var a = t.length, u = n + (r ? 1 : -1); r ? u-- : ++u < a; )
    if (e(t[u], u, t))
      return u;
  return -1;
}
function net(t, e, n) {
  if (e !== e)
    return eet(t, ret, n);
  for (var r = n - 1, a = t.length; ++r < a; )
    if (t[r] === e)
      return r;
  return -1;
}
function ret(t) {
  return t !== t;
}
function set(t, e) {
  for (var n = t.length, r = 0; n--; )
    t[n] === e && r++;
  return r;
}
function iet(t, e) {
  return t == null ? void 0 : t[e];
}
function aet(t) {
  var e = !1;
  if (t != null && typeof t.toString != "function")
    try {
      e = !!(t + "");
    } catch {
    }
  return e;
}
function $o(t, e) {
  for (var n = -1, r = t.length, a = 0, u = []; ++n < r; ) {
    var o = t[n];
    (o === e || o === df) && (t[n] = df, u[a++] = n);
  }
  return u;
}
var uet = Function.prototype, Wd = Object.prototype, du = xi["__core-js_shared__"], Ef = function() {
  var t = /[^.]+$/.exec(du && du.keys && du.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}(), Qd = uet.toString, oet = Wd.hasOwnProperty, Kd = Wd.toString, cet = RegExp(
  "^" + Qd.call(oet).replace(Htt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
), fet = Object.create, Hs = Math.max, het = Math.min, mf = function() {
  var t = bf(Object, "defineProperty"), e = bf.name;
  return e && e.length > 2 ? t : void 0;
}();
function det(t) {
  return qs(t) ? fet(t) : {};
}
function pet(t) {
  if (!qs(t) || vet(t))
    return !1;
  var e = Oet(t) || aet(t) ? cet : Wtt;
  return e.test(Ret(t));
}
function get(t, e) {
  return e = Hs(e === void 0 ? t.length - 1 : e, 0), function() {
    for (var n = arguments, r = -1, a = Hs(n.length - e, 0), u = Array(a); ++r < a; )
      u[r] = n[e + r];
    r = -1;
    for (var o = Array(e + 1); ++r < e; )
      o[r] = n[r];
    return o[e] = u, qo(t, this, o);
  };
}
function Eet(t, e, n, r) {
  for (var a = -1, u = t.length, o = n.length, h = -1, m = e.length, E = Hs(u - o, 0), p = Array(m + E), N = !r; ++h < m; )
    p[h] = e[h];
  for (; ++a < o; )
    (N || a < u) && (p[n[a]] = t[a]);
  for (; E--; )
    p[h++] = t[a++];
  return p;
}
function met(t, e, n, r) {
  for (var a = -1, u = t.length, o = -1, h = n.length, m = -1, E = e.length, p = Hs(u - h, 0), N = Array(p + E), v = !r; ++a < p; )
    N[a] = t[a];
  for (var S = a; ++m < E; )
    N[S + m] = e[m];
  for (; ++o < h; )
    (v || a < u) && (N[S + n[o]] = t[a++]);
  return N;
}
function bet(t, e) {
  var n = -1, r = t.length;
  for (e || (e = Array(r)); ++n < r; )
    e[n] = t[n];
  return e;
}
function _et(t, e, n) {
  var r = e & rs, a = mi(t);
  function u() {
    var o = this && this !== xi && this instanceof u ? a : t;
    return o.apply(r ? n : this, arguments);
  }
  return u;
}
function mi(t) {
  return function() {
    var e = arguments;
    switch (e.length) {
      case 0:
        return new t();
      case 1:
        return new t(e[0]);
      case 2:
        return new t(e[0], e[1]);
      case 3:
        return new t(e[0], e[1], e[2]);
      case 4:
        return new t(e[0], e[1], e[2], e[3]);
      case 5:
        return new t(e[0], e[1], e[2], e[3], e[4]);
      case 6:
        return new t(e[0], e[1], e[2], e[3], e[4], e[5]);
      case 7:
        return new t(e[0], e[1], e[2], e[3], e[4], e[5], e[6]);
    }
    var n = det(t.prototype), r = t.apply(n, e);
    return qs(r) ? r : n;
  };
}
function Tet(t, e, n) {
  var r = mi(t);
  function a() {
    for (var u = arguments.length, o = Array(u), h = u, m = Yo(a); h--; )
      o[h] = arguments[h];
    var E = u < 3 && o[0] !== m && o[u - 1] !== m ? [] : $o(o, m);
    if (u -= E.length, u < n)
      return Xd(
        t,
        e,
        Go,
        a.placeholder,
        void 0,
        o,
        E,
        void 0,
        void 0,
        n - u
      );
    var p = this && this !== xi && this instanceof a ? r : t;
    return qo(p, this, o);
  }
  return a;
}
function Go(t, e, n, r, a, u, o, h, m, E) {
  var p = e & Vd, N = e & rs, v = e & Ha, S = e & (Ms | ci), L = e & jd, W = v ? void 0 : mi(t);
  function M() {
    for (var O = arguments.length, F = Array(O), Z = O; Z--; )
      F[Z] = arguments[Z];
    if (S)
      var Q = Yo(M), U = set(F, Q);
    if (r && (F = Eet(F, r, a, S)), u && (F = met(F, u, o, S)), O -= U, S && O < E) {
      var P = $o(F, Q);
      return Xd(
        t,
        e,
        Go,
        M.placeholder,
        n,
        F,
        P,
        h,
        m,
        E - O
      );
    }
    var Y = N ? n : this, H = v ? Y[t] : t;
    return O = F.length, h ? F = xet(F, h) : L && O > 1 && F.reverse(), p && m < O && (F.length = m), this && this !== xi && this instanceof M && (H = W || mi(H)), H.apply(Y, F);
  }
  return M;
}
function Aet(t, e, n, r) {
  var a = e & rs, u = mi(t);
  function o() {
    for (var h = -1, m = arguments.length, E = -1, p = r.length, N = Array(p + m), v = this && this !== xi && this instanceof o ? u : t; ++E < p; )
      N[E] = r[E];
    for (; m--; )
      N[E++] = arguments[++h];
    return qo(v, a ? n : this, N);
  }
  return o;
}
function Xd(t, e, n, r, a, u, o, h, m, E) {
  var p = e & Ms, N = p ? o : void 0, v = p ? void 0 : o, S = p ? u : void 0, L = p ? void 0 : u;
  e |= p ? ms : Ei, e &= ~(p ? Ei : ms), e & wtt || (e &= ~(rs | Ha));
  var W = n(t, e, a, S, N, L, v, h, m, E);
  return W.placeholder = r, zd(W, t, e);
}
function yet(t, e, n, r, a, u, o, h) {
  var m = e & Ha;
  if (!m && typeof t != "function")
    throw new TypeError(Ott);
  var E = r ? r.length : 0;
  if (E || (e &= ~(ms | Ei), r = a = void 0), o = o === void 0 ? o : Hs(_f(o), 0), h = h === void 0 ? h : _f(h), E -= a ? a.length : 0, e & Ei) {
    var p = r, N = a;
    r = a = void 0;
  }
  var v = [
    t,
    e,
    n,
    r,
    a,
    p,
    N,
    u,
    o,
    h
  ];
  if (t = v[0], e = v[1], n = v[2], r = v[3], a = v[4], h = v[9] = v[9] == null ? m ? 0 : t.length : Hs(v[9] - E, 0), !h && e & (Ms | ci) && (e &= ~(Ms | ci)), !e || e == rs)
    var S = _et(t, e, n);
  else
    e == Ms || e == ci ? S = Tet(t, e, h) : (e == ms || e == (rs | ms)) && !a.length ? S = Aet(t, e, n, r) : S = Go.apply(void 0, v);
  return zd(S, t, e);
}
function Yo(t) {
  var e = t;
  return e.placeholder;
}
function bf(t, e) {
  var n = iet(t, e);
  return pet(n) ? n : void 0;
}
function Cet(t) {
  var e = t.match(Gtt);
  return e ? e[1].split(Ytt) : [];
}
function Iet(t, e) {
  var n = e.length, r = n - 1;
  return e[r] = (n > 1 ? "& " : "") + e[r], e = e.join(n > 2 ? ", " : " "), t.replace($tt, `{
/* [wrapped with ` + e + `] */
`);
}
function Net(t, e) {
  return e = e ?? Ptt, !!e && (typeof t == "number" || Ktt.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
function vet(t) {
  return !!Ef && Ef in t;
}
function xet(t, e) {
  for (var n = t.length, r = het(e.length, n), a = bet(t); r--; ) {
    var u = e[r];
    t[r] = Net(u, n) ? a[u] : void 0;
  }
  return t;
}
var zd = mf ? function(t, e, n) {
  var r = e + "";
  return mf(t, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Met(Iet(r, Let(Cet(r), n)))
  });
} : Fet;
function Ret(t) {
  if (t != null) {
    try {
      return Qd.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
function Let(t, e) {
  return Ztt(Mtt, function(n) {
    var r = "_." + n[0];
    e & n[1] && !tet(t, r) && t.push(r);
  }), t.sort();
}
var Vo = get(function(t, e, n) {
  var r = rs;
  if (n.length) {
    var a = $o(n, Yo(Vo));
    r |= ms;
  }
  return yet(t, r, e, n, a);
});
function Oet(t) {
  var e = qs(t) ? Kd.call(t) : "";
  return e == Ftt || e == ktt;
}
function qs(t) {
  var e = typeof t;
  return !!t && (e == "object" || e == "function");
}
function wet(t) {
  return !!t && typeof t == "object";
}
function Det(t) {
  return typeof t == "symbol" || wet(t) && Kd.call(t) == Utt;
}
function Pet(t) {
  if (!t)
    return t === 0 ? t : 0;
  if (t = Bet(t), t === pf || t === -pf) {
    var e = t < 0 ? -1 : 1;
    return e * Btt;
  }
  return t === t ? t : 0;
}
function _f(t) {
  var e = Pet(t), n = e % 1;
  return e === e ? n ? e - n : e : 0;
}
function Bet(t) {
  if (typeof t == "number")
    return t;
  if (Det(t))
    return gf;
  if (qs(t)) {
    var e = typeof t.valueOf == "function" ? t.valueOf() : t;
    t = qs(e) ? e + "" : e;
  }
  if (typeof t != "string")
    return t === 0 ? t : +t;
  t = t.replace(qtt, "");
  var n = jtt.test(t);
  return n || Qtt.test(t) ? Xtt(t.slice(2), n ? 2 : 8) : Vtt.test(t) ? gf : +t;
}
function Met(t) {
  return function() {
    return t;
  };
}
function Fet(t) {
  return t;
}
Vo.placeholder = {};
var jo = Vo, Jd = 9007199254740991, ket = "[object Arguments]", Uet = "[object Function]", Het = "[object GeneratorFunction]", qet = /^(?:0|[1-9]\d*)$/;
function $et(t, e) {
  for (var n = -1, r = t ? t.length : 0; ++n < r && e(t[n], n, t) !== !1; )
    ;
  return t;
}
function Get(t, e) {
  for (var n = -1, r = Array(t); ++n < t; )
    r[n] = e(n);
  return r;
}
function Yet(t, e) {
  return function(n) {
    return t(e(n));
  };
}
var qa = Object.prototype, Wo = qa.hasOwnProperty, Zd = qa.toString, Vet = qa.propertyIsEnumerable, jet = Yet(Object.keys, Object);
function Wet(t, e) {
  var n = t0(t) || rnt(t) ? Get(t.length, String) : [], r = n.length, a = !!r;
  for (var u in t)
    (e || Wo.call(t, u)) && !(a && (u == "length" || tnt(u, r))) && n.push(u);
  return n;
}
var Qet = Jet(Xet), Ket = Zet();
function Xet(t, e) {
  return t && Ket(t, e, cnt);
}
function zet(t) {
  if (!ent(t))
    return jet(t);
  var e = [];
  for (var n in Object(t))
    Wo.call(t, n) && n != "constructor" && e.push(n);
  return e;
}
function Jet(t, e) {
  return function(n, r) {
    if (n == null)
      return n;
    if (!Qo(n))
      return t(n, r);
    for (var a = n.length, u = e ? a : -1, o = Object(n); (e ? u-- : ++u < a) && r(o[u], u, o) !== !1; )
      ;
    return n;
  };
}
function Zet(t) {
  return function(e, n, r) {
    for (var a = -1, u = Object(e), o = r(e), h = o.length; h--; ) {
      var m = o[t ? h : ++a];
      if (n(u[m], m, u) === !1)
        break;
    }
    return e;
  };
}
function tnt(t, e) {
  return e = e ?? Jd, !!e && (typeof t == "number" || qet.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
function ent(t) {
  var e = t && t.constructor, n = typeof e == "function" && e.prototype || qa;
  return t === n;
}
function nnt(t, e) {
  var n = t0(t) ? $et : Qet;
  return n(t, typeof e == "function" ? e : fnt);
}
function rnt(t) {
  return snt(t) && Wo.call(t, "callee") && (!Vet.call(t, "callee") || Zd.call(t) == ket);
}
var t0 = Array.isArray;
function Qo(t) {
  return t != null && ant(t.length) && !int(t);
}
function snt(t) {
  return ont(t) && Qo(t);
}
function int(t) {
  var e = unt(t) ? Zd.call(t) : "";
  return e == Uet || e == Het;
}
function ant(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= Jd;
}
function unt(t) {
  var e = typeof t;
  return !!t && (e == "object" || e == "function");
}
function ont(t) {
  return !!t && typeof t == "object";
}
function cnt(t) {
  return Qo(t) ? Wet(t) : zet(t);
}
function fnt(t) {
  return t;
}
var $a = nnt, e0 = 9007199254740991, lnt = "[object Arguments]", hnt = "[object Function]", dnt = "[object GeneratorFunction]", pnt = /^(?:0|[1-9]\d*)$/;
function n0(t, e, n) {
  switch (n.length) {
    case 0:
      return t.call(e);
    case 1:
      return t.call(e, n[0]);
    case 2:
      return t.call(e, n[0], n[1]);
    case 3:
      return t.call(e, n[0], n[1], n[2]);
  }
  return t.apply(e, n);
}
function gnt(t, e) {
  for (var n = -1, r = Array(t); ++n < t; )
    r[n] = e(n);
  return r;
}
var Ri = Object.prototype, Li = Ri.hasOwnProperty, r0 = Ri.toString, Ent = Ri.propertyIsEnumerable, Tf = Math.max;
function mnt(t, e) {
  var n = vnt(t) || Nnt(t) ? gnt(t.length, String) : [], r = n.length, a = !!r;
  for (var u in t)
    (e || Li.call(t, u)) && !(a && (u == "length" || i0(u, r))) && n.push(u);
  return n;
}
function bnt(t, e, n, r) {
  return t === void 0 || Ko(t, Ri[n]) && !Li.call(r, n) ? e : t;
}
function _nt(t, e, n) {
  var r = t[e];
  (!(Li.call(t, e) && Ko(r, n)) || n === void 0 && !(e in t)) && (t[e] = n);
}
function Tnt(t) {
  if (!zo(t))
    return Snt(t);
  var e = Int(t), n = [];
  for (var r in t)
    r == "constructor" && (e || !Li.call(t, r)) || n.push(r);
  return n;
}
function s0(t, e) {
  return e = Tf(e === void 0 ? t.length - 1 : e, 0), function() {
    for (var n = arguments, r = -1, a = Tf(n.length - e, 0), u = Array(a); ++r < a; )
      u[r] = n[e + r];
    r = -1;
    for (var o = Array(e + 1); ++r < e; )
      o[r] = n[r];
    return o[e] = u, n0(t, this, o);
  };
}
function Ant(t, e, n, r) {
  n || (n = {});
  for (var a = -1, u = e.length; ++a < u; ) {
    var o = e[a], h = r ? r(n[o], t[o], o, n, t) : void 0;
    _nt(n, o, h === void 0 ? t[o] : h);
  }
  return n;
}
function ynt(t) {
  return s0(function(e, n) {
    var r = -1, a = n.length, u = a > 1 ? n[a - 1] : void 0, o = a > 2 ? n[2] : void 0;
    for (u = t.length > 3 && typeof u == "function" ? (a--, u) : void 0, o && Cnt(n[0], n[1], o) && (u = a < 3 ? void 0 : u, a = 1), e = Object(e); ++r < a; ) {
      var h = n[r];
      h && t(e, h, r, u);
    }
    return e;
  });
}
function i0(t, e) {
  return e = e ?? e0, !!e && (typeof t == "number" || pnt.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
function Cnt(t, e, n) {
  if (!zo(n))
    return !1;
  var r = typeof e;
  return (r == "number" ? Xo(n) && i0(e, n.length) : r == "string" && e in n) ? Ko(n[e], t) : !1;
}
function Int(t) {
  var e = t && t.constructor, n = typeof e == "function" && e.prototype || Ri;
  return t === n;
}
function Snt(t) {
  var e = [];
  if (t != null)
    for (var n in Object(t))
      e.push(n);
  return e;
}
function Ko(t, e) {
  return t === e || t !== t && e !== e;
}
function Nnt(t) {
  return xnt(t) && Li.call(t, "callee") && (!Ent.call(t, "callee") || r0.call(t) == lnt);
}
var vnt = Array.isArray;
function Xo(t) {
  return t != null && Lnt(t.length) && !Rnt(t);
}
function xnt(t) {
  return Ont(t) && Xo(t);
}
function Rnt(t) {
  var e = zo(t) ? r0.call(t) : "";
  return e == hnt || e == dnt;
}
function Lnt(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= e0;
}
function zo(t) {
  var e = typeof t;
  return !!t && (e == "object" || e == "function");
}
function Ont(t) {
  return !!t && typeof t == "object";
}
var wnt = ynt(function(t, e, n, r) {
  Ant(e, Pnt(e), t, r);
}), Dnt = s0(function(t) {
  return t.push(void 0, bnt), n0(wnt, void 0, t);
});
function Pnt(t) {
  return Xo(t) ? mnt(t, !0) : Tnt(t);
}
var a0 = Dnt, pu = {}, gu = {}, Ga = { exports: {} }, Bnt = Fnt, Mnt = /^([+\-]?\d*n)?\s*(?:([+\-]?)\s*(\d+))?$/;
function Fnt(t) {
  if (t = t.trim().toLowerCase(), t === "even")
    return [2, 0];
  if (t === "odd")
    return [2, 1];
  var e = t.match(Mnt);
  if (!e)
    throw new SyntaxError("n-th rule couldn't be parsed ('" + t + "')");
  var n;
  return e[1] ? (n = parseInt(e[1], 10), isNaN(n) && (e[1].charAt(0) === "-" ? n = -1 : n = 1)) : n = 0, [
    n,
    e[3] ? parseInt((e[2] || "") + e[3], 10) : 0
  ];
}
var knt = qnt, u0 = Kr, Unt = u0.trueFunc, Hnt = u0.falseFunc;
function qnt(t) {
  var e = t[0], n = t[1] - 1;
  if (n < 0 && e <= 0)
    return Hnt;
  if (e === -1)
    return function(a) {
      return a <= n;
    };
  if (e === 0)
    return function(a) {
      return a === n;
    };
  if (e === 1)
    return n < 0 ? Unt : function(a) {
      return a >= n;
    };
  var r = n % e;
  return r < 0 && (r += e), e > 1 ? function(a) {
    return a >= n && a % e === r;
  } : (e *= -1, function(a) {
    return a <= n && a % e === r;
  });
}
var o0 = Bnt, c0 = knt;
Ga.exports = function(e) {
  return c0(o0(e));
};
Ga.exports.parse = o0;
Ga.exports.compile = c0;
var $nt = Ga.exports, f0 = xs, Gnt = f0.hasAttrib, Bn = f0.getAttributeValue, ji = Kr.falseFunc, Af = /[-[\]{}()*+?.,\\^$|#\s]/g, yf = {
  __proto__: null,
  equals: function(t, e) {
    var n = e.name, r = e.value;
    return e.ignoreCase ? (r = r.toLowerCase(), function(u) {
      var o = Bn(u, n);
      return o != null && o.toLowerCase() === r && t(u);
    }) : function(u) {
      return Bn(u, n) === r && t(u);
    };
  },
  hyphen: function(t, e) {
    var n = e.name, r = e.value, a = r.length;
    return e.ignoreCase ? (r = r.toLowerCase(), function(o) {
      var h = Bn(o, n);
      return h != null && (h.length === a || h.charAt(a) === "-") && h.substr(0, a).toLowerCase() === r && t(o);
    }) : function(o) {
      var h = Bn(o, n);
      return h != null && h.substr(0, a) === r && (h.length === a || h.charAt(a) === "-") && t(o);
    };
  },
  element: function(t, e) {
    var n = e.name, r = e.value;
    if (/\s/.test(r))
      return ji;
    r = r.replace(Af, "\\$&");
    var a = "(?:^|\\s)" + r + "(?:$|\\s)", u = e.ignoreCase ? "i" : "", o = new RegExp(a, u);
    return function(m) {
      var E = Bn(m, n);
      return E != null && o.test(E) && t(m);
    };
  },
  exists: function(t, e) {
    var n = e.name;
    return function(a) {
      return Gnt(a, n) && t(a);
    };
  },
  start: function(t, e) {
    var n = e.name, r = e.value, a = r.length;
    return a === 0 ? ji : e.ignoreCase ? (r = r.toLowerCase(), function(o) {
      var h = Bn(o, n);
      return h != null && h.substr(0, a).toLowerCase() === r && t(o);
    }) : function(o) {
      var h = Bn(o, n);
      return h != null && h.substr(0, a) === r && t(o);
    };
  },
  end: function(t, e) {
    var n = e.name, r = e.value, a = -r.length;
    return a === 0 ? ji : e.ignoreCase ? (r = r.toLowerCase(), function(o) {
      var h = Bn(o, n);
      return h != null && h.substr(a).toLowerCase() === r && t(o);
    }) : function(o) {
      var h = Bn(o, n);
      return h != null && h.substr(a) === r && t(o);
    };
  },
  any: function(t, e) {
    var n = e.name, r = e.value;
    if (r === "")
      return ji;
    if (e.ignoreCase) {
      var a = new RegExp(r.replace(Af, "\\$&"), "i");
      return function(o) {
        var h = Bn(o, n);
        return h != null && a.test(h) && t(o);
      };
    }
    return function(o) {
      var h = Bn(o, n);
      return h != null && h.indexOf(r) >= 0 && t(o);
    };
  },
  not: function(t, e) {
    var n = e.name, r = e.value;
    return r === "" ? function(u) {
      return !!Bn(u, n) && t(u);
    } : e.ignoreCase ? (r = r.toLowerCase(), function(u) {
      var o = Bn(u, n);
      return o != null && o.toLowerCase() !== r && t(u);
    }) : function(u) {
      return Bn(u, n) !== r && t(u);
    };
  }
}, l0 = {
  compile: function(t, e, n) {
    if (n && n.strict && (e.ignoreCase || e.action === "not"))
      throw SyntaxError("Unsupported attribute selector");
    return yf[e.action](t, e);
  },
  rules: yf
}, us = xs, sr = us.isTag, Cf = us.getText, Jo = us.getParent, If = us.getChildren, Mr = us.getSiblings, Yr = us.hasAttrib, pn = us.getName, Sf = us.getAttributeValue, Wi = $nt, Ynt = l0.rules.equals, h0 = Kr, Zs = h0.trueFunc, ti = h0.falseFunc;
function Vnt(t) {
  for (var e = 0; t && e < t.length; e++)
    if (sr(t[e]))
      return t[e];
}
function cs(t, e) {
  var n = { name: t, value: e };
  return function(a) {
    return Ynt(a, n);
  };
}
function Qi(t) {
  return function(e) {
    return !!Jo(e) && t(e);
  };
}
var ei = {
  contains: function(t, e) {
    return function(r) {
      return t(r) && Cf(r).indexOf(e) >= 0;
    };
  },
  icontains: function(t, e) {
    var n = e.toLowerCase();
    return function(a) {
      return t(a) && Cf(a).toLowerCase().indexOf(n) >= 0;
    };
  },
  //location specific methods
  "nth-child": function(t, e) {
    var n = Wi(e);
    return n === ti ? n : n === Zs ? Qi(t) : function(a) {
      for (var u = Mr(a), o = 0, h = 0; o < u.length; o++)
        if (sr(u[o])) {
          if (u[o] === a)
            break;
          h++;
        }
      return n(h) && t(a);
    };
  },
  "nth-last-child": function(t, e) {
    var n = Wi(e);
    return n === ti ? n : n === Zs ? Qi(t) : function(a) {
      for (var u = Mr(a), o = 0, h = u.length - 1; h >= 0; h--)
        if (sr(u[h])) {
          if (u[h] === a)
            break;
          o++;
        }
      return n(o) && t(a);
    };
  },
  "nth-of-type": function(t, e) {
    var n = Wi(e);
    return n === ti ? n : n === Zs ? Qi(t) : function(a) {
      for (var u = Mr(a), o = 0, h = 0; h < u.length; h++)
        if (sr(u[h])) {
          if (u[h] === a)
            break;
          pn(u[h]) === pn(a) && o++;
        }
      return n(o) && t(a);
    };
  },
  "nth-last-of-type": function(t, e) {
    var n = Wi(e);
    return n === ti ? n : n === Zs ? Qi(t) : function(a) {
      for (var u = Mr(a), o = 0, h = u.length - 1; h >= 0; h--)
        if (sr(u[h])) {
          if (u[h] === a)
            break;
          pn(u[h]) === pn(a) && o++;
        }
      return n(o) && t(a);
    };
  },
  //TODO determine the actual root element
  root: function(t) {
    return function(e) {
      return !Jo(e) && t(e);
    };
  },
  scope: function(t, e, n, r) {
    return !r || r.length === 0 ? ei.root(t) : r.length === 1 ? function(a) {
      return r[0] === a && t(a);
    } : function(a) {
      return r.indexOf(a) >= 0 && t(a);
    };
  },
  //jQuery extensions (others follow as pseudos)
  checkbox: cs("type", "checkbox"),
  file: cs("type", "file"),
  password: cs("type", "password"),
  radio: cs("type", "radio"),
  reset: cs("type", "reset"),
  image: cs("type", "image"),
  submit: cs("type", "submit")
}, fi = {
  empty: function(t) {
    return !If(t).some(function(e) {
      return sr(e) || e.type === "text";
    });
  },
  "first-child": function(t) {
    return Vnt(Mr(t)) === t;
  },
  "last-child": function(t) {
    for (var e = Mr(t), n = e.length - 1; n >= 0; n--) {
      if (e[n] === t)
        return !0;
      if (sr(e[n]))
        break;
    }
    return !1;
  },
  "first-of-type": function(t) {
    for (var e = Mr(t), n = 0; n < e.length; n++)
      if (sr(e[n])) {
        if (e[n] === t)
          return !0;
        if (pn(e[n]) === pn(t))
          break;
      }
    return !1;
  },
  "last-of-type": function(t) {
    for (var e = Mr(t), n = e.length - 1; n >= 0; n--)
      if (sr(e[n])) {
        if (e[n] === t)
          return !0;
        if (pn(e[n]) === pn(t))
          break;
      }
    return !1;
  },
  "only-of-type": function(t) {
    for (var e = Mr(t), n = 0, r = e.length; n < r; n++)
      if (sr(e[n])) {
        if (e[n] === t)
          continue;
        if (pn(e[n]) === pn(t))
          return !1;
      }
    return !0;
  },
  "only-child": function(t) {
    for (var e = Mr(t), n = 0; n < e.length; n++)
      if (sr(e[n]) && e[n] !== t)
        return !1;
    return !0;
  },
  //:matches(a, area, link)[href]
  link: function(t) {
    return Yr(t, "href");
  },
  visited: ti,
  //seems to be a valid implementation
  //TODO: :any-link once the name is finalized (as an alias of :link)
  //forms
  //to consider: :target
  //:matches([selected], select:not([multiple]):not(> option[selected]) > option:first-of-type)
  selected: function(t) {
    if (Yr(t, "selected"))
      return !0;
    if (pn(t) !== "option")
      return !1;
    var e = Jo(t);
    if (!e || pn(e) !== "select" || Yr(e, "multiple"))
      return !1;
    for (var n = If(e), r = !1, a = 0; a < n.length; a++)
      if (sr(n[a]))
        if (n[a] === t)
          r = !0;
        else if (r) {
          if (Yr(n[a], "selected"))
            return !1;
        } else
          return !1;
    return r;
  },
  //https://html.spec.whatwg.org/multipage/scripting.html#disabled-elements
  //:matches(
  //  :matches(button, input, select, textarea, menuitem, optgroup, option)[disabled],
  //  optgroup[disabled] > option),
  // fieldset[disabled] * //TODO not child of first <legend>
  //)
  disabled: function(t) {
    return Yr(t, "disabled");
  },
  enabled: function(t) {
    return !Yr(t, "disabled");
  },
  //:matches(:matches(:radio, :checkbox)[checked], :selected) (TODO menuitem)
  checked: function(t) {
    return Yr(t, "checked") || fi.selected(t);
  },
  //:matches(input, select, textarea)[required]
  required: function(t) {
    return Yr(t, "required");
  },
  //:matches(input, select, textarea):not([required])
  optional: function(t) {
    return !Yr(t, "required");
  },
  //jQuery extensions
  //:not(:empty)
  parent: function(t) {
    return !fi.empty(t);
  },
  //:matches(h1, h2, h3, h4, h5, h6)
  header: function(t) {
    var e = pn(t);
    return e === "h1" || e === "h2" || e === "h3" || e === "h4" || e === "h5" || e === "h6";
  },
  //:matches(button, input[type=button])
  button: function(t) {
    var e = pn(t);
    return e === "button" || e === "input" && Sf(t, "type") === "button";
  },
  //:matches(input, textarea, select, button)
  input: function(t) {
    var e = pn(t);
    return e === "input" || e === "textarea" || e === "select" || e === "button";
  },
  //input:matches(:not([type!='']), [type='text' i])
  text: function(t) {
    var e;
    return pn(t) === "input" && (!(e = Sf(t, "type")) || e.toLowerCase() === "text");
  }
};
function Nf(t, e, n) {
  if (n === null) {
    if (t.length > 1 && e !== "scope")
      throw new SyntaxError("pseudo-selector :" + e + " requires an argument");
  } else if (t.length === 1)
    throw new SyntaxError("pseudo-selector :" + e + " doesn't have any arguments");
}
var jnt = /^(?:(?:nth|last|first|only)-(?:child|of-type)|root|empty|(?:en|dis)abled|checked|not)$/, Zo = {
  compile: function(t, e, n, r) {
    var a = e.name, u = e.data;
    if (n && n.strict && !jnt.test(a))
      throw SyntaxError(":" + a + " isn't part of CSS3");
    if (typeof ei[a] == "function")
      return Nf(ei[a], a, u), ei[a](t, u, n, r);
    if (typeof fi[a] == "function") {
      var o = fi[a];
      return Nf(o, a, u), t === Zs ? o : function(m) {
        return o(m, u) && t(m);
      };
    } else
      throw new SyntaxError("unmatched pseudo-class :" + a);
  },
  filters: ei,
  pseudos: fi
}, Ya = { exports: {} }, Wnt = trt, vf = /^(?:\\.|[\w\-\u00b0-\uFFFF])+/, Qnt = /\\([\da-f]{1,6}\s?|(\s)|.)/ig, Knt = /^\s*((?:\\.|[\w\u00b0-\uFFFF\-])+)\s*(?:(\S?)=\s*(?:(['"])([^]*?)\3|(#?(?:\\.|[\w\u00b0-\uFFFF\-])*)|)|)\s*(i)?\]/, Xnt = {
  __proto__: null,
  undefined: "exists",
  "": "equals",
  "~": "element",
  "^": "start",
  $: "end",
  "*": "any",
  "!": "not",
  "|": "hyphen"
}, xf = {
  __proto__: null,
  ">": "child",
  "<": "parent",
  "~": "sibling",
  "+": "adjacent"
}, Eu = {
  __proto__: null,
  "#": ["id", "equals"],
  ".": ["class", "element"]
}, znt = {
  __proto__: null,
  has: !0,
  not: !0,
  matches: !0
}, Jnt = {
  __proto__: null,
  contains: !0,
  icontains: !0
}, Rf = {
  __proto__: null,
  '"': !0,
  "'": !0
};
function Znt(t, e, n) {
  var r = "0x" + e - 65536;
  return r !== r || n ? e : (
    // BMP codepoint
    r < 0 ? String.fromCharCode(r + 65536) : (
      // Supplemental Plane codepoint (surrogate pair)
      String.fromCharCode(r >> 10 | 55296, r & 1023 | 56320)
    )
  );
}
function Ki(t) {
  return t.replace(Qnt, Znt);
}
function Lf(t) {
  return t === " " || t === `
` || t === "	" || t === "\f" || t === "\r";
}
function trt(t, e) {
  var n = [];
  if (t = d0(n, t + "", e), t !== "")
    throw new SyntaxError("Unmatched selector: " + t);
  return n;
}
function d0(t, e, n) {
  var r = [], a = !1, u, o, h, m;
  function E() {
    var W = e.match(vf)[0];
    return e = e.substr(W.length), Ki(W);
  }
  function p(W) {
    for (; Lf(e.charAt(W)); )
      W++;
    e = e.substr(W);
  }
  function N(W) {
    for (var M = 0; e.charAt(--W) === "\\"; )
      M++;
    return (M & 1) === 1;
  }
  for (p(0); e !== ""; )
    if (o = e.charAt(0), Lf(o))
      a = !0, p(1);
    else if (o in xf)
      r.push({ type: xf[o] }), a = !1, p(1);
    else if (o === ",") {
      if (r.length === 0)
        throw new SyntaxError("empty sub-selector");
      t.push(r), r = [], a = !1, p(1);
    } else if (a && (r.length > 0 && r.push({ type: "descendant" }), a = !1), o === "*")
      e = e.substr(1), r.push({ type: "universal" });
    else if (o in Eu)
      e = e.substr(1), r.push({
        type: "attribute",
        name: Eu[o][0],
        action: Eu[o][1],
        value: E(),
        ignoreCase: !1
      });
    else if (o === "[") {
      if (e = e.substr(1), u = e.match(Knt), !u)
        throw new SyntaxError("Malformed attribute selector: " + e);
      e = e.substr(u[0].length), h = Ki(u[1]), (!n || ("lowerCaseAttributeNames" in n ? n.lowerCaseAttributeNames : !n.xmlMode)) && (h = h.toLowerCase()), r.push({
        type: "attribute",
        name: h,
        action: Xnt[u[2]],
        value: Ki(u[4] || u[5] || ""),
        ignoreCase: !!u[6]
      });
    } else if (o === ":") {
      if (e.charAt(1) === ":") {
        e = e.substr(2), r.push({ type: "pseudo-element", name: E().toLowerCase() });
        continue;
      }
      if (e = e.substr(1), h = E().toLowerCase(), u = null, e.charAt(0) === "(")
        if (h in znt) {
          m = e.charAt(1);
          var v = m in Rf;
          if (e = e.substr(v + 1), u = [], e = d0(u, e, n), v) {
            if (e.charAt(0) !== m)
              throw new SyntaxError("unmatched quotes in :" + h);
            e = e.substr(1);
          }
          if (e.charAt(0) !== ")")
            throw new SyntaxError("missing closing parenthesis in :" + h + " " + e);
          e = e.substr(1);
        } else {
          for (var S = 1, L = 1; L > 0 && S < e.length; S++)
            e.charAt(S) === "(" && !N(S) ? L++ : e.charAt(S) === ")" && !N(S) && L--;
          if (L)
            throw new SyntaxError("parenthesis not matched");
          u = e.substr(1, S - 2), e = e.substr(S), h in Jnt && (m = u.charAt(0), m === u.slice(-1) && m in Rf && (u = u.slice(1, -1)), u = Ki(u));
        }
      r.push({ type: "pseudo", name: h, data: u });
    } else if (vf.test(e))
      h = E(), (!n || ("lowerCaseTags" in n ? n.lowerCaseTags : !n.xmlMode)) && (h = h.toLowerCase()), r.push({ type: "tag", name: h });
    else
      return r.length && r[r.length - 1].type === "descendant" && r.pop(), Of(t, r), e;
  return Of(t, r), e;
}
function Of(t, e) {
  if (t.length > 0 && e.length === 0)
    throw new SyntaxError("empty sub-selector");
  t.push(e);
}
var Oi = xs, mu = Oi.isTag, wf = Oi.getParent, ert = Oi.getChildren, Df = Oi.getSiblings, nrt = Oi.getName, rrt = {
  __proto__: null,
  attribute: l0.compile,
  pseudo: Zo.compile,
  //tags
  tag: function(t, e) {
    var n = e.name;
    return function(a) {
      return nrt(a) === n && t(a);
    };
  },
  //traversal
  descendant: function(t, e, n, r, a) {
    return function(o) {
      if (a && t(o))
        return !0;
      for (var h = !1; !h && (o = wf(o)); )
        h = t(o);
      return h;
    };
  },
  parent: function(t, e, n) {
    if (n && n.strict)
      throw SyntaxError("Parent selector isn't part of CSS3");
    return function(u) {
      return ert(u).some(r);
    };
    function r(a) {
      return mu(a) && t(a);
    }
  },
  child: function(t) {
    return function(n) {
      var r = wf(n);
      return !!r && t(r);
    };
  },
  sibling: function(t) {
    return function(n) {
      for (var r = Df(n), a = 0; a < r.length; a++)
        if (mu(r[a])) {
          if (r[a] === n)
            break;
          if (t(r[a]))
            return !0;
        }
      return !1;
    };
  },
  adjacent: function(t) {
    return function(n) {
      for (var r = Df(n), a, u = 0; u < r.length; u++)
        if (mu(r[u])) {
          if (r[u] === n)
            break;
          a = r[u];
        }
      return !!a && t(a);
    };
  },
  universal: function(t) {
    return t;
  }
};
const srt = 50, irt = 30, art = 1, urt = 0, ort = -1, crt = -1, frt = -1, lrt = -1, hrt = -1, p0 = {
  universal: srt,
  tag: irt,
  attribute: art,
  pseudo: urt,
  descendant: ort,
  child: crt,
  parent: frt,
  sibling: lrt,
  adjacent: hrt
};
var drt = prt, bu = p0, Pf = {
  __proto__: null,
  exists: 10,
  equals: 8,
  not: 7,
  start: 6,
  end: 6,
  any: 5,
  hyphen: 4,
  element: 4
};
function prt(t) {
  for (var e = t.map(g0), n = 1; n < t.length; n++) {
    var r = e[n];
    if (!(r < 0))
      for (var a = n - 1; a >= 0 && r < e[a]; a--) {
        var u = t[a + 1];
        t[a + 1] = t[a], t[a] = u, e[a + 1] = e[a], e[a] = r;
      }
  }
}
function g0(t) {
  var e = bu[t.type];
  if (e === bu.attribute)
    e = Pf[t.action], e === Pf.equals && t.name === "id" && (e = 9), t.ignoreCase && (e >>= 1);
  else if (e === bu.pseudo)
    if (!t.data)
      e = 3;
    else if (t.name === "has" || t.name === "contains")
      e = 0;
    else if (t.name === "matches" || t.name === "not") {
      e = 0;
      for (var n = 0; n < t.data.length; n++)
        if (t.data[n].length === 1) {
          var r = g0(t.data[n][0]);
          if (r === 0) {
            e = 0;
            break;
          }
          r > e && (e = r);
        }
      t.data.length > 1 && e > 0 && (e -= 1);
    } else
      e = 1;
  return e;
}
Ya.exports = _rt;
Ya.exports.compileUnsafe = b0;
Ya.exports.compileToken = Di;
var grt = Wnt, wi = xs, ec = wi.isTag, Ert = rrt, mrt = drt, E0 = Kr, bi = E0.trueFunc, ss = E0.falseFunc, brt = p0;
function _rt(t, e, n) {
  var r = b0(t, e, n);
  return m0(r);
}
function m0(t) {
  return function(n) {
    return ec(n) && t(n);
  };
}
function b0(t, e, n) {
  var r = grt(t, e);
  return Di(r, e, n);
}
function _0(t) {
  return t.type === "pseudo" && (t.name === "scope" || Array.isArray(t.data) && t.data.some(function(e) {
    return e.some(_0);
  }));
}
var Trt = { type: "descendant" }, Art = { type: "pseudo", name: "scope" }, T0 = {}, yrt = wi.getParent;
function Crt(t, e) {
  var n = !!e && !!e.length && e.every(function(r) {
    return r === T0 || !!yrt(r);
  });
  t.forEach(function(r) {
    if (!(r.length > 0 && A0(r[0]) && r[0].type !== "descendant"))
      if (n && !_0(r))
        r.unshift(Trt);
      else
        return;
    r.unshift(Art);
  });
}
function Di(t, e, n) {
  t = t.filter(function(a) {
    return a.length > 0;
  }), t.forEach(mrt);
  var r = Array.isArray(n);
  return n = e && e.context || n, n && !r && (n = [n]), Crt(t, n), t.map(function(a) {
    return Irt(a, e, n, r);
  }).reduce(Srt, ss);
}
function A0(t) {
  return brt[t.type] < 0;
}
function Irt(t, e, n, r) {
  var a = r && t[0].name === "scope" && t[1].type === "descendant";
  return t.reduce(function(u, o, h) {
    return u === ss ? u : Ert[o.type](u, o, e, n, a && h === 1);
  }, e && e.rootFunc || bi);
}
function Srt(t, e) {
  return e === ss || t === bi ? t : t === ss || e === bi ? e : function(r) {
    return t(r) || e(r);
  };
}
var Nrt = Zo, tc = Nrt.filters, Bf = wi.existsOne, ec = wi.isTag, _u = wi.getChildren;
function y0(t) {
  return t.some(A0);
}
tc.not = function(t, e, n, r) {
  var a = {
    xmlMode: !!(n && n.xmlMode),
    strict: !!(n && n.strict)
  };
  if (a.strict && (e.length > 1 || e.some(y0)))
    throw new SyntaxError("complex selectors in :not aren't allowed in strict mode");
  var u = Di(e, a, r);
  return u === ss ? t : u === bi ? ss : function(o) {
    return !u(o) && t(o);
  };
};
tc.has = function(t, e, n) {
  var r = {
    xmlMode: !!(n && n.xmlMode),
    strict: !!(n && n.strict)
  }, a = e.some(y0) ? [T0] : null, u = Di(e, r, a);
  return u === ss ? ss : u === bi ? function(o) {
    return _u(o).some(ec) && t(o);
  } : (u = m0(u), a ? function(h) {
    return t(h) && (a[0] = h, Bf(u, _u(h)));
  } : function(h) {
    return t(h) && Bf(u, _u(h));
  });
};
tc.matches = function(t, e, n, r) {
  var a = {
    xmlMode: !!(n && n.xmlMode),
    strict: !!(n && n.strict),
    rootFunc: t
  };
  return Di(e, a, r);
};
var vrt = Ya.exports, C0 = Dr, I0 = Zo, Va = xs, xrt = Va.findOne, Rrt = Va.findAll, Lrt = Va.getChildren, Ort = Va.removeSubsets, S0 = Kr.falseFunc, Pi = vrt, N0 = Pi.compileUnsafe, wrt = Pi.compileToken;
function v0(t) {
  return function(n, r, a) {
    return typeof n != "function" && (n = N0(n, a, r)), Array.isArray(r) ? r = Ort(r) : r = Lrt(r), t(n, r);
  };
}
var nc = v0(function(e, n) {
  return e === S0 || !n || n.length === 0 ? [] : Rrt(e, n);
}), Drt = v0(function(e, n) {
  return e === S0 || !n || n.length === 0 ? null : xrt(e, n);
});
function Prt(t, e, n) {
  return (typeof e == "function" ? e : Pi(e, n))(t);
}
function Dr(t, e, n) {
  return nc(t, e, n);
}
Dr.compile = Pi;
Dr.filters = I0.filters;
Dr.pseudos = I0.pseudos;
Dr.selectAll = nc;
Dr.selectOne = Drt;
Dr.is = Prt;
Dr.parse = Pi;
Dr.iterate = nc;
Dr._compileUnsafe = N0;
Dr._compileToken = wrt;
var ha = { exports: {} };
ha.exports;
(function(t, e) {
  var n = 200, r = "__lodash_hash_undefined__", a = 800, u = 16, o = 9007199254740991, h = "[object Arguments]", m = "[object Array]", E = "[object AsyncFunction]", p = "[object Boolean]", N = "[object Date]", v = "[object Error]", S = "[object Function]", L = "[object GeneratorFunction]", W = "[object Map]", M = "[object Number]", O = "[object Null]", F = "[object Object]", Z = "[object Proxy]", Q = "[object RegExp]", U = "[object Set]", P = "[object String]", Y = "[object Undefined]", H = "[object WeakMap]", z = "[object ArrayBuffer]", nt = "[object DataView]", at = "[object Float32Array]", gt = "[object Float64Array]", dt = "[object Int8Array]", St = "[object Int16Array]", Ut = "[object Int32Array]", Xt = "[object Uint8Array]", Ct = "[object Uint8ClampedArray]", Qt = "[object Uint16Array]", En = "[object Uint32Array]", on = /[\\^$.*+?()[\]{}|]/g, zt = /^\[object .+?Constructor\]$/, tn = /^(?:0|[1-9]\d*)$/, Nt = {};
  Nt[at] = Nt[gt] = Nt[dt] = Nt[St] = Nt[Ut] = Nt[Xt] = Nt[Ct] = Nt[Qt] = Nt[En] = !0, Nt[h] = Nt[m] = Nt[z] = Nt[p] = Nt[nt] = Nt[N] = Nt[v] = Nt[S] = Nt[W] = Nt[M] = Nt[F] = Nt[Q] = Nt[U] = Nt[P] = Nt[H] = !1;
  var Wt = typeof qt == "object" && qt && qt.Object === Object && qt, Zt = typeof self == "object" && self && self.Object === Object && self, oe = Wt || Zt || Function("return this")(), We = e && !e.nodeType && e, $ = We && !0 && t && !t.nodeType && t, Ie = $ && $.exports === We, Se = Ie && Wt.process, pt = function() {
    try {
      var I = $ && $.require && $.require("util").types;
      return I || Se && Se.binding && Se.binding("util");
    } catch {
    }
  }(), pe = pt && pt.isTypedArray;
  function Le(I, D, q) {
    switch (q.length) {
      case 0:
        return I.call(D);
      case 1:
        return I.call(D, q[0]);
      case 2:
        return I.call(D, q[0], q[1]);
      case 3:
        return I.call(D, q[0], q[1], q[2]);
    }
    return I.apply(D, q);
  }
  function Qe(I, D) {
    for (var q = -1, it = Array(I); ++q < I; )
      it[q] = D(q);
    return it;
  }
  function se(I) {
    return function(D) {
      return I(D);
    };
  }
  function be(I, D) {
    return I == null ? void 0 : I[D];
  }
  function Ne(I, D) {
    return function(q) {
      return I(D(q));
    };
  }
  var In = Array.prototype, qn = Function.prototype, Ke = Object.prototype, mn = oe["__core-js_shared__"], cn = qn.toString, ge = Ke.hasOwnProperty, _e = function() {
    var I = /[^.]+$/.exec(mn && mn.keys && mn.keys.IE_PROTO || "");
    return I ? "Symbol(src)_1." + I : "";
  }(), fe = Ke.toString, bn = cn.call(Object), $n = RegExp(
    "^" + cn.call(ge).replace(on, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Te = Ie ? oe.Buffer : void 0, en = oe.Symbol, b = oe.Uint8Array, l = Te ? Te.allocUnsafe : void 0, d = Ne(Object.getPrototypeOf, Object), A = Object.create, R = Ke.propertyIsEnumerable, B = In.splice, V = en ? en.toStringTag : void 0, Et = function() {
    try {
      var I = An(Object, "defineProperty");
      return I({}, "", {}), I;
    } catch {
    }
  }(), Pt = Te ? Te.isBuffer : void 0, Bt = Math.max, Vt = Date.now, xt = An(oe, "Map"), le = An(Object, "create"), ie = /* @__PURE__ */ function() {
    function I() {
    }
    return function(D) {
      if (!Pe(D))
        return {};
      if (A)
        return A(D);
      I.prototype = D;
      var q = new I();
      return I.prototype = void 0, q;
    };
  }();
  function te(I) {
    var D = -1, q = I == null ? 0 : I.length;
    for (this.clear(); ++D < q; ) {
      var it = I[D];
      this.set(it[0], it[1]);
    }
  }
  function Oe() {
    this.__data__ = le ? le(null) : {}, this.size = 0;
  }
  function Ae(I) {
    var D = this.has(I) && delete this.__data__[I];
    return this.size -= D ? 1 : 0, D;
  }
  function he(I) {
    var D = this.__data__;
    if (le) {
      var q = D[I];
      return q === r ? void 0 : q;
    }
    return ge.call(D, I) ? D[I] : void 0;
  }
  function _n(I) {
    var D = this.__data__;
    return le ? D[I] !== void 0 : ge.call(D, I);
  }
  function ir(I, D) {
    var q = this.__data__;
    return this.size += this.has(I) ? 0 : 1, q[I] = le && D === void 0 ? r : D, this;
  }
  te.prototype.clear = Oe, te.prototype.delete = Ae, te.prototype.get = he, te.prototype.has = _n, te.prototype.set = ir;
  function ke(I) {
    var D = -1, q = I == null ? 0 : I.length;
    for (this.clear(); ++D < q; ) {
      var it = I[D];
      this.set(it[0], it[1]);
    }
  }
  function ar() {
    this.__data__ = [], this.size = 0;
  }
  function Sn(I) {
    var D = this.__data__, q = Nn(D, I);
    if (q < 0)
      return !1;
    var it = D.length - 1;
    return q == it ? D.pop() : B.call(D, q, 1), --this.size, !0;
  }
  function ve(I) {
    var D = this.__data__, q = Nn(D, I);
    return q < 0 ? void 0 : D[q][1];
  }
  function we(I) {
    return Nn(this.__data__, I) > -1;
  }
  function xe(I, D) {
    var q = this.__data__, it = Nn(q, I);
    return it < 0 ? (++this.size, q.push([I, D])) : q[it][1] = D, this;
  }
  ke.prototype.clear = ar, ke.prototype.delete = Sn, ke.prototype.get = ve, ke.prototype.has = we, ke.prototype.set = xe;
  function $t(I) {
    var D = -1, q = I == null ? 0 : I.length;
    for (this.clear(); ++D < q; ) {
      var it = I[D];
      this.set(it[0], it[1]);
    }
  }
  function nn() {
    this.size = 0, this.__data__ = {
      hash: new te(),
      map: new (xt || ke)(),
      string: new te()
    };
  }
  function ur(I) {
    var D = fn(this, I).delete(I);
    return this.size -= D ? 1 : 0, D;
  }
  function or(I) {
    return fn(this, I).get(I);
  }
  function cr(I) {
    return fn(this, I).has(I);
  }
  function Ue(I, D) {
    var q = fn(this, I), it = q.size;
    return q.set(I, D), this.size += q.size == it ? 0 : 1, this;
  }
  $t.prototype.clear = nn, $t.prototype.delete = ur, $t.prototype.get = or, $t.prototype.has = cr, $t.prototype.set = Ue;
  function wt(I) {
    var D = this.__data__ = new ke(I);
    this.size = D.size;
  }
  function He() {
    this.__data__ = new ke(), this.size = 0;
  }
  function fr(I) {
    var D = this.__data__, q = D.delete(I);
    return this.size = D.size, q;
  }
  function lr(I) {
    return this.__data__.get(I);
  }
  function hr(I) {
    return this.__data__.has(I);
  }
  function qe(I, D) {
    var q = this.__data__;
    if (q instanceof ke) {
      var it = q.__data__;
      if (!xt || it.length < n - 1)
        return it.push([I, D]), this.size = ++q.size, this;
      q = this.__data__ = new $t(it);
    }
    return q.set(I, D), this.size = q.size, this;
  }
  wt.prototype.clear = He, wt.prototype.delete = fr, wt.prototype.get = lr, wt.prototype.has = hr, wt.prototype.set = qe;
  function Gt(I, D) {
    var q = ln(I), it = !q && Yn(I), ot = !q && !it && Dt(I), bt = !q && !it && !ot && Zn(I), Ht = q || it || ot || bt, Tt = Ht ? Qe(I.length, String) : [], vt = Tt.length;
    for (var kt in I)
      (D || ge.call(I, kt)) && !(Ht && // Safari 9 has enumerable `arguments.length` in strict mode.
      (kt == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      ot && (kt == "offset" || kt == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      bt && (kt == "buffer" || kt == "byteLength" || kt == "byteOffset") || // Skip index properties.
      Xn(kt, vt))) && Tt.push(kt);
    return Tt;
  }
  function De(I, D, q) {
    (q !== void 0 && !Xe(I[D], q) || q === void 0 && !(D in I)) && Gn(I, D, q);
  }
  function dr(I, D, q) {
    var it = I[D];
    (!(ge.call(I, D) && Xe(it, q)) || q === void 0 && !(D in I)) && Gn(I, D, q);
  }
  function Nn(I, D) {
    for (var q = I.length; q--; )
      if (Xe(I[q][0], D))
        return q;
    return -1;
  }
  function Gn(I, D, q) {
    D == "__proto__" && Et ? Et(I, D, {
      configurable: !0,
      enumerable: !0,
      value: q,
      writable: !0
    }) : I[D] = q;
  }
  var vn = Ln();
  function ye(I) {
    return I == null ? I === void 0 ? Y : O : V && V in Object(I) ? rn(I) : Cr(I);
  }
  function Tn(I) {
    return Jt(I) && ye(I) == h;
  }
  function $e(I) {
    if (!Pe(I) || Ar(I))
      return !1;
    var D = Rt(I) ? $n : zt;
    return D.test(Jn(I));
  }
  function Yt(I) {
    return Jt(I) && wn(I.length) && !!Nt[ye(I)];
  }
  function Ge(I) {
    if (!Pe(I))
      return yr(I);
    var D = zn(I), q = [];
    for (var it in I)
      it == "constructor" && (D || !ge.call(I, it)) || q.push(it);
    return q;
  }
  function Wn(I, D, q, it, ot) {
    I !== D && vn(D, function(bt, Ht) {
      if (ot || (ot = new wt()), Pe(bt))
        pr(I, D, Ht, q, Wn, it, ot);
      else {
        var Tt = it ? it(On(I, Ht), bt, Ht + "", I, D, ot) : void 0;
        Tt === void 0 && (Tt = bt), De(I, Ht, Tt);
      }
    }, sn);
  }
  function pr(I, D, q, it, ot, bt, Ht) {
    var Tt = On(I, q), vt = On(D, q), kt = Ht.get(vt);
    if (kt) {
      De(I, q, kt);
      return;
    }
    var Mt = bt ? bt(Tt, vt, q + "", I, D, Ht) : void 0, ce = Mt === void 0;
    if (ce) {
      var Cn = ln(vt), Vn = !Cn && Dt(vt), tr = !Cn && !Vn && Zn(vt);
      Mt = vt, Cn || Vn || tr ? ln(Tt) ? Mt = Tt : hn(Tt) ? Mt = mr(Tt) : Vn ? (ce = !1, Mt = xn(vt, !0)) : tr ? (ce = !1, Mt = Rn(vt, !0)) : Mt = [] : Nr(vt) || Yn(vt) ? (Mt = Tt, Yn(Tt) ? Mt = vr(Tt) : (!Pe(Tt) || Rt(Tt)) && (Mt = br(vt))) : ce = !1;
    }
    ce && (Ht.set(vt, Mt), ot(Mt, vt, it, bt, Ht), Ht.delete(vt)), De(I, q, Mt);
  }
  function gr(I, D) {
    return yn(Ir(I, D, ae), I + "");
  }
  var Er = Et ? function(I, D) {
    return Et(I, "toString", {
      configurable: !0,
      enumerable: !1,
      value: xr(D),
      writable: !0
    });
  } : ae;
  function xn(I, D) {
    if (D)
      return I.slice();
    var q = I.length, it = l ? l(q) : new I.constructor(q);
    return I.copy(it), it;
  }
  function Fe(I) {
    var D = new I.constructor(I.byteLength);
    return new b(D).set(new b(I)), D;
  }
  function Rn(I, D) {
    var q = D ? Fe(I.buffer) : I.buffer;
    return new I.constructor(q, I.byteOffset, I.length);
  }
  function mr(I, D) {
    var q = -1, it = I.length;
    for (D || (D = Array(it)); ++q < it; )
      D[q] = I[q];
    return D;
  }
  function Qn(I, D, q, it) {
    var ot = !q;
    q || (q = {});
    for (var bt = -1, Ht = D.length; ++bt < Ht; ) {
      var Tt = D[bt], vt = it ? it(q[Tt], I[Tt], Tt, q, I) : void 0;
      vt === void 0 && (vt = I[Tt]), ot ? Gn(q, Tt, vt) : dr(q, Tt, vt);
    }
    return q;
  }
  function Kn(I) {
    return gr(function(D, q) {
      var it = -1, ot = q.length, bt = ot > 1 ? q[ot - 1] : void 0, Ht = ot > 2 ? q[2] : void 0;
      for (bt = I.length > 3 && typeof bt == "function" ? (ot--, bt) : void 0, Ht && _r(q[0], q[1], Ht) && (bt = ot < 3 ? void 0 : bt, ot = 1), D = Object(D); ++it < ot; ) {
        var Tt = q[it];
        Tt && I(D, Tt, it, bt);
      }
      return D;
    });
  }
  function Ln(I) {
    return function(D, q, it) {
      for (var ot = -1, bt = Object(D), Ht = it(D), Tt = Ht.length; Tt--; ) {
        var vt = Ht[I ? Tt : ++ot];
        if (q(bt[vt], vt, bt) === !1)
          break;
      }
      return D;
    };
  }
  function fn(I, D) {
    var q = I.__data__;
    return Tr(D) ? q[typeof D == "string" ? "string" : "hash"] : q.map;
  }
  function An(I, D) {
    var q = be(I, D);
    return $e(q) ? q : void 0;
  }
  function rn(I) {
    var D = ge.call(I, V), q = I[V];
    try {
      I[V] = void 0;
      var it = !0;
    } catch {
    }
    var ot = fe.call(I);
    return it && (D ? I[V] = q : delete I[V]), ot;
  }
  function br(I) {
    return typeof I.constructor == "function" && !zn(I) ? ie(d(I)) : {};
  }
  function Xn(I, D) {
    var q = typeof I;
    return D = D ?? o, !!D && (q == "number" || q != "symbol" && tn.test(I)) && I > -1 && I % 1 == 0 && I < D;
  }
  function _r(I, D, q) {
    if (!Pe(q))
      return !1;
    var it = typeof D;
    return (it == "number" ? de(q) && Xn(D, q.length) : it == "string" && D in q) ? Xe(q[D], I) : !1;
  }
  function Tr(I) {
    var D = typeof I;
    return D == "string" || D == "number" || D == "symbol" || D == "boolean" ? I !== "__proto__" : I === null;
  }
  function Ar(I) {
    return !!_e && _e in I;
  }
  function zn(I) {
    var D = I && I.constructor, q = typeof D == "function" && D.prototype || Ke;
    return I === q;
  }
  function yr(I) {
    var D = [];
    if (I != null)
      for (var q in Object(I))
        D.push(q);
    return D;
  }
  function Cr(I) {
    return fe.call(I);
  }
  function Ir(I, D, q) {
    return D = Bt(D === void 0 ? I.length - 1 : D, 0), function() {
      for (var it = arguments, ot = -1, bt = Bt(it.length - D, 0), Ht = Array(bt); ++ot < bt; )
        Ht[ot] = it[D + ot];
      ot = -1;
      for (var Tt = Array(D + 1); ++ot < D; )
        Tt[ot] = it[ot];
      return Tt[D] = q(Ht), Le(I, this, Tt);
    };
  }
  function On(I, D) {
    if (!(D === "constructor" && typeof I[D] == "function") && D != "__proto__")
      return I[D];
  }
  var yn = Sr(Er);
  function Sr(I) {
    var D = 0, q = 0;
    return function() {
      var it = Vt(), ot = u - (it - q);
      if (q = it, ot > 0) {
        if (++D >= a)
          return arguments[0];
      } else
        D = 0;
      return I.apply(void 0, arguments);
    };
  }
  function Jn(I) {
    if (I != null) {
      try {
        return cn.call(I);
      } catch {
      }
      try {
        return I + "";
      } catch {
      }
    }
    return "";
  }
  function Xe(I, D) {
    return I === D || I !== I && D !== D;
  }
  var Yn = Tn(/* @__PURE__ */ function() {
    return arguments;
  }()) ? Tn : function(I) {
    return Jt(I) && ge.call(I, "callee") && !R.call(I, "callee");
  }, ln = Array.isArray;
  function de(I) {
    return I != null && wn(I.length) && !Rt(I);
  }
  function hn(I) {
    return Jt(I) && de(I);
  }
  var Dt = Pt || Lt;
  function Rt(I) {
    if (!Pe(I))
      return !1;
    var D = ye(I);
    return D == S || D == L || D == E || D == Z;
  }
  function wn(I) {
    return typeof I == "number" && I > -1 && I % 1 == 0 && I <= o;
  }
  function Pe(I) {
    var D = typeof I;
    return I != null && (D == "object" || D == "function");
  }
  function Jt(I) {
    return I != null && typeof I == "object";
  }
  function Nr(I) {
    if (!Jt(I) || ye(I) != F)
      return !1;
    var D = d(I);
    if (D === null)
      return !0;
    var q = ge.call(D, "constructor") && D.constructor;
    return typeof q == "function" && q instanceof q && cn.call(q) == bn;
  }
  var Zn = pe ? se(pe) : Yt;
  function vr(I) {
    return Qn(I, sn(I));
  }
  function sn(I) {
    return de(I) ? Gt(I, !0) : Ge(I);
  }
  var dn = Kn(function(I, D, q) {
    Wn(I, D, q);
  });
  function xr(I) {
    return function() {
      return I;
    };
  }
  function ae(I) {
    return I;
  }
  function Lt() {
    return !1;
  }
  t.exports = dn;
})(ha, ha.exports);
var Brt = ha.exports, Mf;
function rc() {
  return Mf || (Mf = 1, function(t) {
    var e = Mo, n = C0, r = Fa, a = {
      merge: Brt,
      defaults: a0
    };
    t.load = function(o, h) {
      var m = Gu();
      h = a.defaults(h || {}, m.prototype.options);
      var E = r(o, h), p = function(N, v, S, L) {
        return this instanceof p ? (L = a.defaults(L || {}, h), m.call(this, N, v, S || E, L)) : new p(N, v, S, L);
      };
      return p.prototype = Object.create(m.prototype), p.prototype.constructor = p, p.fn = p.prototype, p.prototype._originalRoot = E, a.merge(p, t), p._root = E, p._options = h, p;
    };
    function u(o, h, m) {
      if (h)
        typeof h == "string" && (h = n(h, o._root, m));
      else if (o._root && o._root.children)
        h = o._root.children;
      else
        return "";
      return e(h, m);
    }
    t.html = function(o, h) {
      var m = Gu();
      return Object.prototype.toString.call(o) === "[object Object]" && !h && !("length" in o) && !("type" in o) && (h = o, o = void 0), h = a.defaults(h || {}, this._options, m.prototype.options), u(this, o, h);
    }, t.xml = function(o) {
      var h = a.defaults({ xmlMode: !0 }, this._options);
      return u(this, o, h);
    }, t.text = function(o) {
      o || (o = this.root());
      for (var h = "", m = o.length, E, p = 0; p < m; p++)
        E = o[p], E.type === "text" ? h += E.data : E.children && E.type !== "comment" && (h += t.text(E.children));
      return h;
    }, t.parseHTML = function(o, h, m) {
      var E;
      return !o || typeof o != "string" ? null : (typeof h == "boolean" && (m = h), E = this.load(o), m || E("script").remove(), E.root()[0].children.slice());
    }, t.root = function() {
      return this(this._root);
    }, t.contains = function(o, h) {
      if (h === o)
        return !1;
      for (; h && h !== h.parent; )
        if (h = h.parent, h === o)
          return !0;
      return !1;
    };
  }(gu)), gu;
}
var da = { exports: {} };
da.exports;
(function(t, e) {
  var n = 200, r = "Expected a function", a = "__lodash_hash_undefined__", u = 1, o = 2, h = 1 / 0, m = 9007199254740991, E = "[object Arguments]", p = "[object Array]", N = "[object Boolean]", v = "[object Date]", S = "[object Error]", L = "[object Function]", W = "[object GeneratorFunction]", M = "[object Map]", O = "[object Number]", F = "[object Object]", Z = "[object Promise]", Q = "[object RegExp]", U = "[object Set]", P = "[object String]", Y = "[object Symbol]", H = "[object WeakMap]", z = "[object ArrayBuffer]", nt = "[object DataView]", at = "[object Float32Array]", gt = "[object Float64Array]", dt = "[object Int8Array]", St = "[object Int16Array]", Ut = "[object Int32Array]", Xt = "[object Uint8Array]", Ct = "[object Uint8ClampedArray]", Qt = "[object Uint16Array]", En = "[object Uint32Array]", on = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, zt = /^\w*$/, tn = /^\./, Nt = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Wt = /[\\^$.*+?()[\]{}|]/g, Zt = /\\(\\)?/g, oe = /^\[object .+?Constructor\]$/, We = /^(?:0|[1-9]\d*)$/, $ = {};
  $[at] = $[gt] = $[dt] = $[St] = $[Ut] = $[Xt] = $[Ct] = $[Qt] = $[En] = !0, $[E] = $[p] = $[z] = $[N] = $[nt] = $[v] = $[S] = $[L] = $[M] = $[O] = $[F] = $[Q] = $[U] = $[P] = $[H] = !1;
  var Ie = typeof qt == "object" && qt && qt.Object === Object && qt, Se = typeof self == "object" && self && self.Object === Object && self, pt = Ie || Se || Function("return this")(), pe = e && !e.nodeType && e, Le = pe && !0 && t && !t.nodeType && t, Qe = Le && Le.exports === pe, se = Qe && Ie.process, be = function() {
    try {
      return se && se.binding("util");
    } catch {
    }
  }(), Ne = be && be.isTypedArray;
  function In(s, i) {
    for (var c = -1, g = s ? s.length : 0; ++c < g; )
      if (i(s[c], c, s))
        return !0;
    return !1;
  }
  function qn(s) {
    return function(i) {
      return i == null ? void 0 : i[s];
    };
  }
  function Ke(s, i) {
    for (var c = -1, g = Array(s); ++c < s; )
      g[c] = i(c);
    return g;
  }
  function mn(s) {
    return function(i) {
      return s(i);
    };
  }
  function cn(s, i) {
    return s == null ? void 0 : s[i];
  }
  function ge(s) {
    var i = !1;
    if (s != null && typeof s.toString != "function")
      try {
        i = !!(s + "");
      } catch {
      }
    return i;
  }
  function _e(s) {
    var i = -1, c = Array(s.size);
    return s.forEach(function(g, y) {
      c[++i] = [y, g];
    }), c;
  }
  function fe(s, i) {
    return function(c) {
      return s(i(c));
    };
  }
  function bn(s) {
    var i = -1, c = Array(s.size);
    return s.forEach(function(g) {
      c[++i] = g;
    }), c;
  }
  var $n = Array.prototype, Te = Function.prototype, en = Object.prototype, b = pt["__core-js_shared__"], l = function() {
    var s = /[^.]+$/.exec(b && b.keys && b.keys.IE_PROTO || "");
    return s ? "Symbol(src)_1." + s : "";
  }(), d = Te.toString, A = en.hasOwnProperty, R = en.toString, B = RegExp(
    "^" + d.call(A).replace(Wt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), V = pt.Symbol, Et = pt.Uint8Array, Pt = en.propertyIsEnumerable, Bt = $n.splice, Vt = fe(Object.keys, Object), xt = hn(pt, "DataView"), le = hn(pt, "Map"), ie = hn(pt, "Promise"), te = hn(pt, "Set"), Oe = hn(pt, "WeakMap"), Ae = hn(Object, "create"), he = Lt(xt), _n = Lt(le), ir = Lt(ie), ke = Lt(te), ar = Lt(Oe), Sn = V ? V.prototype : void 0, ve = Sn ? Sn.valueOf : void 0, we = Sn ? Sn.toString : void 0;
  function xe(s) {
    var i = -1, c = s ? s.length : 0;
    for (this.clear(); ++i < c; ) {
      var g = s[i];
      this.set(g[0], g[1]);
    }
  }
  function $t() {
    this.__data__ = Ae ? Ae(null) : {};
  }
  function nn(s) {
    return this.has(s) && delete this.__data__[s];
  }
  function ur(s) {
    var i = this.__data__;
    if (Ae) {
      var c = i[s];
      return c === a ? void 0 : c;
    }
    return A.call(i, s) ? i[s] : void 0;
  }
  function or(s) {
    var i = this.__data__;
    return Ae ? i[s] !== void 0 : A.call(i, s);
  }
  function cr(s, i) {
    var c = this.__data__;
    return c[s] = Ae && i === void 0 ? a : i, this;
  }
  xe.prototype.clear = $t, xe.prototype.delete = nn, xe.prototype.get = ur, xe.prototype.has = or, xe.prototype.set = cr;
  function Ue(s) {
    var i = -1, c = s ? s.length : 0;
    for (this.clear(); ++i < c; ) {
      var g = s[i];
      this.set(g[0], g[1]);
    }
  }
  function wt() {
    this.__data__ = [];
  }
  function He(s) {
    var i = this.__data__, c = xn(i, s);
    if (c < 0)
      return !1;
    var g = i.length - 1;
    return c == g ? i.pop() : Bt.call(i, c, 1), !0;
  }
  function fr(s) {
    var i = this.__data__, c = xn(i, s);
    return c < 0 ? void 0 : i[c][1];
  }
  function lr(s) {
    return xn(this.__data__, s) > -1;
  }
  function hr(s, i) {
    var c = this.__data__, g = xn(c, s);
    return g < 0 ? c.push([s, i]) : c[g][1] = i, this;
  }
  Ue.prototype.clear = wt, Ue.prototype.delete = He, Ue.prototype.get = fr, Ue.prototype.has = lr, Ue.prototype.set = hr;
  function qe(s) {
    var i = -1, c = s ? s.length : 0;
    for (this.clear(); ++i < c; ) {
      var g = s[i];
      this.set(g[0], g[1]);
    }
  }
  function Gt() {
    this.__data__ = {
      hash: new xe(),
      map: new (le || Ue)(),
      string: new xe()
    };
  }
  function De(s) {
    return ln(this, s).delete(s);
  }
  function dr(s) {
    return ln(this, s).get(s);
  }
  function Nn(s) {
    return ln(this, s).has(s);
  }
  function Gn(s, i) {
    return ln(this, s).set(s, i), this;
  }
  qe.prototype.clear = Gt, qe.prototype.delete = De, qe.prototype.get = dr, qe.prototype.has = Nn, qe.prototype.set = Gn;
  function vn(s) {
    var i = -1, c = s ? s.length : 0;
    for (this.__data__ = new qe(); ++i < c; )
      this.add(s[i]);
  }
  function ye(s) {
    return this.__data__.set(s, a), this;
  }
  function Tn(s) {
    return this.__data__.has(s);
  }
  vn.prototype.add = vn.prototype.push = ye, vn.prototype.has = Tn;
  function $e(s) {
    this.__data__ = new Ue(s);
  }
  function Yt() {
    this.__data__ = new Ue();
  }
  function Ge(s) {
    return this.__data__.delete(s);
  }
  function Wn(s) {
    return this.__data__.get(s);
  }
  function pr(s) {
    return this.__data__.has(s);
  }
  function gr(s, i) {
    var c = this.__data__;
    if (c instanceof Ue) {
      var g = c.__data__;
      if (!le || g.length < n - 1)
        return g.push([s, i]), this;
      c = this.__data__ = new qe(g);
    }
    return c.set(s, i), this;
  }
  $e.prototype.clear = Yt, $e.prototype.delete = Ge, $e.prototype.get = Wn, $e.prototype.has = pr, $e.prototype.set = gr;
  function Er(s, i) {
    var c = ot(s) || it(s) ? Ke(s.length, String) : [], g = c.length, y = !!g;
    for (var T in s)
      (i || A.call(s, T)) && !(y && (T == "length" || wn(T, g))) && c.push(T);
    return c;
  }
  function xn(s, i) {
    for (var c = s.length; c--; )
      if (q(s[c][0], i))
        return c;
    return -1;
  }
  var Fe = yn(mr), Rn = Sr();
  function mr(s, i) {
    return s && Rn(s, i, Be);
  }
  function Qn(s, i) {
    i = Jt(i, s) ? [i] : On(i);
    for (var c = 0, g = i.length; s != null && c < g; )
      s = s[ae(i[c++])];
    return c && c == g ? s : void 0;
  }
  function Kn(s) {
    return R.call(s);
  }
  function Ln(s, i) {
    return s != null && i in Object(s);
  }
  function fn(s, i, c, g, y) {
    return s === i ? !0 : s == null || i == null || !kt(s) && !Mt(i) ? s !== s && i !== i : An(s, i, fn, c, g, y);
  }
  function An(s, i, c, g, y, T) {
    var w = ot(s), G = ot(i), X = p, tt = p;
    w || (X = Dt(s), X = X == E ? F : X), G || (tt = Dt(i), tt = tt == E ? F : tt);
    var st = X == F && !ge(s), ut = tt == F && !ge(i), rt = X == tt;
    if (rt && !st)
      return T || (T = new $e()), w || Cn(s) ? Jn(s, i, c, g, y, T) : Xe(s, i, X, c, g, y, T);
    if (!(y & o)) {
      var ft = st && A.call(s, "__wrapped__"), ht = ut && A.call(i, "__wrapped__");
      if (ft || ht) {
        var At = ft ? s.value() : s, yt = ht ? i.value() : i;
        return T || (T = new $e()), c(At, yt, g, y, T);
      }
    }
    return rt ? (T || (T = new $e()), Yn(s, i, c, g, y, T)) : !1;
  }
  function rn(s, i, c, g) {
    var y = c.length, T = y, w = !g;
    if (s == null)
      return !T;
    for (s = Object(s); y--; ) {
      var G = c[y];
      if (w && G[2] ? G[1] !== s[G[0]] : !(G[0] in s))
        return !1;
    }
    for (; ++y < T; ) {
      G = c[y];
      var X = G[0], tt = s[X], st = G[1];
      if (w && G[2]) {
        if (tt === void 0 && !(X in s))
          return !1;
      } else {
        var ut = new $e();
        if (g)
          var rt = g(tt, st, X, s, i, ut);
        if (!(rt === void 0 ? fn(st, tt, g, u | o, ut) : rt))
          return !1;
      }
    }
    return !0;
  }
  function br(s) {
    if (!kt(s) || Zn(s))
      return !1;
    var i = Tt(s) || ge(s) ? B : oe;
    return i.test(Lt(s));
  }
  function Xn(s) {
    return Mt(s) && vt(s.length) && !!$[R.call(s)];
  }
  function _r(s) {
    return typeof s == "function" ? s : s == null ? er : typeof s == "object" ? ot(s) ? zn(s[0], s[1]) : Ar(s) : $r(s);
  }
  function Tr(s) {
    if (!vr(s))
      return Vt(s);
    var i = [];
    for (var c in Object(s))
      A.call(s, c) && c != "constructor" && i.push(c);
    return i;
  }
  function Ar(s) {
    var i = de(s);
    return i.length == 1 && i[0][2] ? dn(i[0][0], i[0][1]) : function(c) {
      return c === s || rn(c, s, i);
    };
  }
  function zn(s, i) {
    return Jt(s) && sn(i) ? dn(ae(s), i) : function(c) {
      var g = tr(c, s);
      return g === void 0 && g === i ? qr(c, s) : fn(i, g, void 0, u | o);
    };
  }
  function yr(s) {
    return function(i) {
      return Qn(i, s);
    };
  }
  function Cr(s, i) {
    var c;
    return Fe(s, function(g, y, T) {
      return c = i(g, y, T), !c;
    }), !!c;
  }
  function Ir(s) {
    if (typeof s == "string")
      return s;
    if (ce(s))
      return we ? we.call(s) : "";
    var i = s + "";
    return i == "0" && 1 / s == -h ? "-0" : i;
  }
  function On(s) {
    return ot(s) ? s : xr(s);
  }
  function yn(s, i) {
    return function(c, g) {
      if (c == null)
        return c;
      if (!bt(c))
        return s(c, g);
      for (var y = c.length, T = i ? y : -1, w = Object(c); (i ? T-- : ++T < y) && g(w[T], T, w) !== !1; )
        ;
      return c;
    };
  }
  function Sr(s) {
    return function(i, c, g) {
      for (var y = -1, T = Object(i), w = g(i), G = w.length; G--; ) {
        var X = w[s ? G : ++y];
        if (c(T[X], X, T) === !1)
          break;
      }
      return i;
    };
  }
  function Jn(s, i, c, g, y, T) {
    var w = y & o, G = s.length, X = i.length;
    if (G != X && !(w && X > G))
      return !1;
    var tt = T.get(s);
    if (tt && T.get(i))
      return tt == i;
    var st = -1, ut = !0, rt = y & u ? new vn() : void 0;
    for (T.set(s, i), T.set(i, s); ++st < G; ) {
      var ft = s[st], ht = i[st];
      if (g)
        var At = w ? g(ht, ft, st, i, s, T) : g(ft, ht, st, s, i, T);
      if (At !== void 0) {
        if (At)
          continue;
        ut = !1;
        break;
      }
      if (rt) {
        if (!In(i, function(yt, Ot) {
          if (!rt.has(Ot) && (ft === yt || c(ft, yt, g, y, T)))
            return rt.add(Ot);
        })) {
          ut = !1;
          break;
        }
      } else if (!(ft === ht || c(ft, ht, g, y, T))) {
        ut = !1;
        break;
      }
    }
    return T.delete(s), T.delete(i), ut;
  }
  function Xe(s, i, c, g, y, T, w) {
    switch (c) {
      case nt:
        if (s.byteLength != i.byteLength || s.byteOffset != i.byteOffset)
          return !1;
        s = s.buffer, i = i.buffer;
      case z:
        return !(s.byteLength != i.byteLength || !g(new Et(s), new Et(i)));
      case N:
      case v:
      case O:
        return q(+s, +i);
      case S:
        return s.name == i.name && s.message == i.message;
      case Q:
      case P:
        return s == i + "";
      case M:
        var G = _e;
      case U:
        var X = T & o;
        if (G || (G = bn), s.size != i.size && !X)
          return !1;
        var tt = w.get(s);
        if (tt)
          return tt == i;
        T |= u, w.set(s, i);
        var st = Jn(G(s), G(i), g, y, T, w);
        return w.delete(s), st;
      case Y:
        if (ve)
          return ve.call(s) == ve.call(i);
    }
    return !1;
  }
  function Yn(s, i, c, g, y, T) {
    var w = y & o, G = Be(s), X = G.length, tt = Be(i), st = tt.length;
    if (X != st && !w)
      return !1;
    for (var ut = X; ut--; ) {
      var rt = G[ut];
      if (!(w ? rt in i : A.call(i, rt)))
        return !1;
    }
    var ft = T.get(s);
    if (ft && T.get(i))
      return ft == i;
    var ht = !0;
    T.set(s, i), T.set(i, s);
    for (var At = w; ++ut < X; ) {
      rt = G[ut];
      var yt = s[rt], Ot = i[rt];
      if (g)
        var Ye = w ? g(Ot, yt, rt, i, s, T) : g(yt, Ot, rt, s, i, T);
      if (!(Ye === void 0 ? yt === Ot || c(yt, Ot, g, y, T) : Ye)) {
        ht = !1;
        break;
      }
      At || (At = rt == "constructor");
    }
    if (ht && !At) {
      var Re = s.constructor, Ee = i.constructor;
      Re != Ee && "constructor" in s && "constructor" in i && !(typeof Re == "function" && Re instanceof Re && typeof Ee == "function" && Ee instanceof Ee) && (ht = !1);
    }
    return T.delete(s), T.delete(i), ht;
  }
  function ln(s, i) {
    var c = s.__data__;
    return Nr(i) ? c[typeof i == "string" ? "string" : "hash"] : c.map;
  }
  function de(s) {
    for (var i = Be(s), c = i.length; c--; ) {
      var g = i[c], y = s[g];
      i[c] = [g, y, sn(y)];
    }
    return i;
  }
  function hn(s, i) {
    var c = cn(s, i);
    return br(c) ? c : void 0;
  }
  var Dt = Kn;
  (xt && Dt(new xt(new ArrayBuffer(1))) != nt || le && Dt(new le()) != M || ie && Dt(ie.resolve()) != Z || te && Dt(new te()) != U || Oe && Dt(new Oe()) != H) && (Dt = function(s) {
    var i = R.call(s), c = i == F ? s.constructor : void 0, g = c ? Lt(c) : void 0;
    if (g)
      switch (g) {
        case he:
          return nt;
        case _n:
          return M;
        case ir:
          return Z;
        case ke:
          return U;
        case ar:
          return H;
      }
    return i;
  });
  function Rt(s, i, c) {
    i = Jt(i, s) ? [i] : On(i);
    for (var g, y = -1, w = i.length; ++y < w; ) {
      var T = ae(i[y]);
      if (!(g = s != null && c(s, T)))
        break;
      s = s[T];
    }
    if (g)
      return g;
    var w = s ? s.length : 0;
    return !!w && vt(w) && wn(T, w) && (ot(s) || it(s));
  }
  function wn(s, i) {
    return i = i ?? m, !!i && (typeof s == "number" || We.test(s)) && s > -1 && s % 1 == 0 && s < i;
  }
  function Pe(s, i, c) {
    if (!kt(c))
      return !1;
    var g = typeof i;
    return (g == "number" ? bt(c) && wn(i, c.length) : g == "string" && i in c) ? q(c[i], s) : !1;
  }
  function Jt(s, i) {
    if (ot(s))
      return !1;
    var c = typeof s;
    return c == "number" || c == "symbol" || c == "boolean" || s == null || ce(s) ? !0 : zt.test(s) || !on.test(s) || i != null && s in Object(i);
  }
  function Nr(s) {
    var i = typeof s;
    return i == "string" || i == "number" || i == "symbol" || i == "boolean" ? s !== "__proto__" : s === null;
  }
  function Zn(s) {
    return !!l && l in s;
  }
  function vr(s) {
    var i = s && s.constructor, c = typeof i == "function" && i.prototype || en;
    return s === c;
  }
  function sn(s) {
    return s === s && !kt(s);
  }
  function dn(s, i) {
    return function(c) {
      return c == null ? !1 : c[s] === i && (i !== void 0 || s in Object(c));
    };
  }
  var xr = D(function(s) {
    s = Vn(s);
    var i = [];
    return tn.test(s) && i.push(""), s.replace(Nt, function(c, g, y, T) {
      i.push(y ? T.replace(Zt, "$1") : g || c);
    }), i;
  });
  function ae(s) {
    if (typeof s == "string" || ce(s))
      return s;
    var i = s + "";
    return i == "0" && 1 / s == -h ? "-0" : i;
  }
  function Lt(s) {
    if (s != null) {
      try {
        return d.call(s);
      } catch {
      }
      try {
        return s + "";
      } catch {
      }
    }
    return "";
  }
  function I(s, i, c) {
    var g = ot(s) ? In : Cr;
    return c && Pe(s, i, c) && (i = void 0), g(s, _r(i));
  }
  function D(s, i) {
    if (typeof s != "function" || i && typeof i != "function")
      throw new TypeError(r);
    var c = function() {
      var g = arguments, y = i ? i.apply(this, g) : g[0], T = c.cache;
      if (T.has(y))
        return T.get(y);
      var w = s.apply(this, g);
      return c.cache = T.set(y, w), w;
    };
    return c.cache = new (D.Cache || qe)(), c;
  }
  D.Cache = qe;
  function q(s, i) {
    return s === i || s !== s && i !== i;
  }
  function it(s) {
    return Ht(s) && A.call(s, "callee") && (!Pt.call(s, "callee") || R.call(s) == E);
  }
  var ot = Array.isArray;
  function bt(s) {
    return s != null && vt(s.length) && !Tt(s);
  }
  function Ht(s) {
    return Mt(s) && bt(s);
  }
  function Tt(s) {
    var i = kt(s) ? R.call(s) : "";
    return i == L || i == W;
  }
  function vt(s) {
    return typeof s == "number" && s > -1 && s % 1 == 0 && s <= m;
  }
  function kt(s) {
    var i = typeof s;
    return !!s && (i == "object" || i == "function");
  }
  function Mt(s) {
    return !!s && typeof s == "object";
  }
  function ce(s) {
    return typeof s == "symbol" || Mt(s) && R.call(s) == Y;
  }
  var Cn = Ne ? mn(Ne) : Xn;
  function Vn(s) {
    return s == null ? "" : Ir(s);
  }
  function tr(s, i, c) {
    var g = s == null ? void 0 : Qn(s, i);
    return g === void 0 ? c : g;
  }
  function qr(s, i) {
    return s != null && Rt(s, i, Ln);
  }
  function Be(s) {
    return bt(s) ? Er(s) : Tr(s);
  }
  function er(s) {
    return s;
  }
  function $r(s) {
    return Jt(s) ? qn(ae(s)) : yr(s);
  }
  t.exports = I;
})(da, da.exports);
var Mrt = da.exports, Ff;
function Frt() {
  return Ff || (Ff = 1, function(t) {
    var e = rc(), n = wr, r = n.isTag, a = n.domEach, u = Object.prototype.hasOwnProperty, o = n.camelCase, h = n.cssCase, m = /\s+/, E = "data-", p = {
      forEach: $a,
      extend: Yd,
      some: Mrt
    }, N = {
      null: null,
      true: !0,
      false: !1
    }, v = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, S = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, L = function(P, Y) {
      if (!(!P || !r(P))) {
        if (P.attribs || (P.attribs = {}), !Y)
          return P.attribs;
        if (u.call(P.attribs, Y))
          return v.test(Y) ? Y : P.attribs[Y];
        if (P.name === "option" && Y === "value")
          return e.text(P.children);
        if (P.name === "input" && (P.attribs.type === "radio" || P.attribs.type === "checkbox") && Y === "value")
          return "on";
      }
    }, W = function(P, Y, H) {
      H === null ? Q(P, Y) : P.attribs[Y] = H + "";
    };
    t.attr = function(P, Y) {
      return typeof P == "object" || Y !== void 0 ? typeof Y == "function" ? a(this, function(H, z) {
        W(z, P, Y.call(z, H, z.attribs[P]));
      }) : a(this, function(H, z) {
        r(z) && (typeof P == "object" ? p.forEach(P, function(nt, at) {
          W(z, at, nt);
        }) : W(z, P, Y));
      }) : L(this[0], P);
    };
    var M = function(P, Y) {
      if (!(!P || !r(P)))
        return P.hasOwnProperty(Y) ? P[Y] : v.test(Y) ? L(P, Y) !== void 0 : L(P, Y);
    }, O = function(P, Y, H) {
      P[Y] = v.test(Y) ? !!H : H;
    };
    t.prop = function(P, Y) {
      var H = 0, z;
      if (typeof P == "string" && Y === void 0) {
        switch (P) {
          case "style":
            z = this.css(), p.forEach(z, function(nt, at) {
              z[H++] = at;
            }), z.length = H;
            break;
          case "tagName":
          case "nodeName":
            z = this[0].name.toUpperCase();
            break;
          default:
            z = M(this[0], P);
        }
        return z;
      }
      if (typeof P == "object" || Y !== void 0)
        return typeof Y == "function" ? a(this, function(nt, at) {
          O(at, P, Y.call(at, nt, M(at, P)));
        }) : a(this, function(nt, at) {
          r(at) && (typeof P == "object" ? p.forEach(P, function(gt, dt) {
            O(at, dt, gt);
          }) : O(at, P, Y));
        });
    };
    var F = function(P, Y, H) {
      if (P.data || (P.data = {}), typeof Y == "object")
        return p.extend(P.data, Y);
      typeof Y == "string" && H !== void 0 ? P.data[Y] = H : typeof Y == "object" && p.extend(P.data, Y);
    }, Z = function(P, Y) {
      var H = arguments.length === 1, z, nt, at, gt, dt, St, Ut;
      for (H ? (z = Object.keys(P.attribs).filter(function(Xt) {
        return Xt.slice(0, E.length) === E;
      }), at = z.map(function(Xt) {
        return o(Xt.slice(E.length));
      })) : (z = [E + h(Y)], at = [Y]), St = 0, Ut = z.length; St < Ut; ++St)
        if (nt = z[St], gt = at[St], u.call(P.attribs, nt)) {
          if (dt = P.attribs[nt], u.call(N, dt))
            dt = N[dt];
          else if (dt === String(Number(dt)))
            dt = Number(dt);
          else if (S.test(dt))
            try {
              dt = JSON.parse(dt);
            } catch {
            }
          P.data[gt] = dt;
        }
      return H ? P.data : dt;
    };
    t.data = function(P, Y) {
      var H = this[0];
      if (!(!H || !r(H)))
        return H.data || (H.data = {}), P ? typeof P == "object" || Y !== void 0 ? (a(this, function(z, nt) {
          F(nt, P, Y);
        }), this) : u.call(H.data, P) ? H.data[P] : Z(H, P) : Z(H);
    }, t.val = function(P) {
      var Y = arguments.length === 0, H = this[0];
      if (H)
        switch (H.name) {
          case "textarea":
            return this.text(P);
          case "input":
            switch (this.attr("type")) {
              case "radio":
                return Y ? this.attr("value") : (this.attr("value", P), this);
              default:
                return this.attr("value", P);
            }
          case "select":
            var z = this.find("option:selected"), nt;
            if (z === void 0)
              return;
            if (!Y) {
              if (!this.attr().hasOwnProperty("multiple") && typeof P == "object")
                return this;
              typeof P != "object" && (P = [P]), this.find("option").removeAttr("selected");
              for (var at = 0; at < P.length; at++)
                this.find('option[value="' + P[at] + '"]').attr("selected", "");
              return this;
            }
            return nt = z.attr("value"), this.attr().hasOwnProperty("multiple") && (nt = [], a(z, function(gt, dt) {
              nt.push(L(dt, "value"));
            })), nt;
          case "option":
            return Y ? this.attr("value") : (this.attr("value", P), this);
        }
    };
    var Q = function(P, Y) {
      !P.attribs || !u.call(P.attribs, Y) || delete P.attribs[Y];
    };
    t.removeAttr = function(P) {
      return a(this, function(Y, H) {
        Q(H, P);
      }), this;
    }, t.hasClass = function(P) {
      return p.some(this, function(Y) {
        var H = Y.attribs, z = H && H.class, nt = -1, at;
        if (z) {
          for (; (nt = z.indexOf(P, nt + 1)) > -1; )
            if (at = nt + P.length, (nt === 0 || m.test(z[nt - 1])) && (at === z.length || m.test(z[at])))
              return !0;
        }
      });
    }, t.addClass = function(P) {
      if (typeof P == "function")
        return a(this, function(Ut, Xt) {
          var Ct = Xt.attribs.class || "";
          t.addClass.call([Xt], P.call(Xt, Ut, Ct));
        });
      if (!P || typeof P != "string")
        return this;
      for (var Y = P.split(m), H = this.length, z = 0; z < H; z++)
        if (r(this[z])) {
          var nt = L(this[z], "class"), at, gt;
          if (!nt)
            W(this[z], "class", Y.join(" ").trim());
          else {
            gt = " " + nt + " ", at = Y.length;
            for (var dt = 0; dt < at; dt++) {
              var St = Y[dt] + " ";
              gt.indexOf(" " + St) < 0 && (gt += St);
            }
            W(this[z], "class", gt.trim());
          }
        }
      return this;
    };
    var U = function(P) {
      return P ? P.trim().split(m) : [];
    };
    t.removeClass = function(P) {
      var Y, H, z;
      return typeof P == "function" ? a(this, function(nt, at) {
        t.removeClass.call(
          [at],
          P.call(at, nt, at.attribs.class || "")
        );
      }) : (Y = U(P), H = Y.length, z = arguments.length === 0, a(this, function(nt, at) {
        if (r(at))
          if (z)
            at.attribs.class = "";
          else {
            for (var gt = U(at.attribs.class), dt, St, Ut = 0; Ut < H; Ut++)
              dt = gt.indexOf(Y[Ut]), dt >= 0 && (gt.splice(dt, 1), St = !0, Ut--);
            St && (at.attribs.class = gt.join(" "));
          }
      }));
    }, t.toggleClass = function(P, Y) {
      if (typeof P == "function")
        return a(this, function(Xt, Ct) {
          t.toggleClass.call(
            [Ct],
            P.call(Ct, Xt, Ct.attribs.class || "", Y),
            Y
          );
        });
      if (!P || typeof P != "string")
        return this;
      for (var H = P.split(m), z = H.length, nt = typeof Y == "boolean" ? Y ? 1 : -1 : 0, at = this.length, gt, dt, St = 0; St < at; St++)
        if (r(this[St])) {
          gt = U(this[St].attribs.class);
          for (var Ut = 0; Ut < z; Ut++)
            dt = gt.indexOf(H[Ut]), nt >= 0 && dt < 0 ? gt.push(H[Ut]) : nt <= 0 && dt >= 0 && gt.splice(dt, 1);
          this[St].attribs.class = gt.join(" ");
        }
      return this;
    }, t.is = function(P) {
      return P ? this.filter(P).length > 0 : !1;
    };
  }(pu)), pu;
}
var x0 = {}, pa = { exports: {} };
pa.exports;
(function(t, e) {
  var n = 200, r = "Expected a function", a = "__lodash_hash_undefined__", u = 1, o = 2, h = 1 / 0, m = 9007199254740991, E = "[object Arguments]", p = "[object Array]", N = "[object Boolean]", v = "[object Date]", S = "[object Error]", L = "[object Function]", W = "[object GeneratorFunction]", M = "[object Map]", O = "[object Number]", F = "[object Object]", Z = "[object Promise]", Q = "[object RegExp]", U = "[object Set]", P = "[object String]", Y = "[object Symbol]", H = "[object WeakMap]", z = "[object ArrayBuffer]", nt = "[object DataView]", at = "[object Float32Array]", gt = "[object Float64Array]", dt = "[object Int8Array]", St = "[object Int16Array]", Ut = "[object Int32Array]", Xt = "[object Uint8Array]", Ct = "[object Uint8ClampedArray]", Qt = "[object Uint16Array]", En = "[object Uint32Array]", on = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, zt = /^\w*$/, tn = /^\./, Nt = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Wt = /[\\^$.*+?()[\]{}|]/g, Zt = /\\(\\)?/g, oe = /^\[object .+?Constructor\]$/, We = /^(?:0|[1-9]\d*)$/, $ = {};
  $[at] = $[gt] = $[dt] = $[St] = $[Ut] = $[Xt] = $[Ct] = $[Qt] = $[En] = !0, $[E] = $[p] = $[z] = $[N] = $[nt] = $[v] = $[S] = $[L] = $[M] = $[O] = $[F] = $[Q] = $[U] = $[P] = $[H] = !1;
  var Ie = typeof qt == "object" && qt && qt.Object === Object && qt, Se = typeof self == "object" && self && self.Object === Object && self, pt = Ie || Se || Function("return this")(), pe = e && !e.nodeType && e, Le = pe && !0 && t && !t.nodeType && t, Qe = Le && Le.exports === pe, se = Qe && Ie.process, be = function() {
    try {
      return se && se.binding("util");
    } catch {
    }
  }(), Ne = be && be.isTypedArray;
  function In(i, c) {
    for (var g = -1, y = i ? i.length : 0, T = 0, w = []; ++g < y; ) {
      var G = i[g];
      c(G, g, i) && (w[T++] = G);
    }
    return w;
  }
  function qn(i, c) {
    for (var g = -1, y = i ? i.length : 0; ++g < y; )
      if (c(i[g], g, i))
        return !0;
    return !1;
  }
  function Ke(i) {
    return function(c) {
      return c == null ? void 0 : c[i];
    };
  }
  function mn(i, c) {
    for (var g = -1, y = Array(i); ++g < i; )
      y[g] = c(g);
    return y;
  }
  function cn(i) {
    return function(c) {
      return i(c);
    };
  }
  function ge(i, c) {
    return i == null ? void 0 : i[c];
  }
  function _e(i) {
    var c = !1;
    if (i != null && typeof i.toString != "function")
      try {
        c = !!(i + "");
      } catch {
      }
    return c;
  }
  function fe(i) {
    var c = -1, g = Array(i.size);
    return i.forEach(function(y, T) {
      g[++c] = [T, y];
    }), g;
  }
  function bn(i, c) {
    return function(g) {
      return i(c(g));
    };
  }
  function $n(i) {
    var c = -1, g = Array(i.size);
    return i.forEach(function(y) {
      g[++c] = y;
    }), g;
  }
  var Te = Array.prototype, en = Function.prototype, b = Object.prototype, l = pt["__core-js_shared__"], d = function() {
    var i = /[^.]+$/.exec(l && l.keys && l.keys.IE_PROTO || "");
    return i ? "Symbol(src)_1." + i : "";
  }(), A = en.toString, R = b.hasOwnProperty, B = b.toString, V = RegExp(
    "^" + A.call(R).replace(Wt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Et = pt.Symbol, Pt = pt.Uint8Array, Bt = b.propertyIsEnumerable, Vt = Te.splice, xt = bn(Object.keys, Object), le = Dt(pt, "DataView"), ie = Dt(pt, "Map"), te = Dt(pt, "Promise"), Oe = Dt(pt, "Set"), Ae = Dt(pt, "WeakMap"), he = Dt(Object, "create"), _n = Lt(le), ir = Lt(ie), ke = Lt(te), ar = Lt(Oe), Sn = Lt(Ae), ve = Et ? Et.prototype : void 0, we = ve ? ve.valueOf : void 0, xe = ve ? ve.toString : void 0;
  function $t(i) {
    var c = -1, g = i ? i.length : 0;
    for (this.clear(); ++c < g; ) {
      var y = i[c];
      this.set(y[0], y[1]);
    }
  }
  function nn() {
    this.__data__ = he ? he(null) : {};
  }
  function ur(i) {
    return this.has(i) && delete this.__data__[i];
  }
  function or(i) {
    var c = this.__data__;
    if (he) {
      var g = c[i];
      return g === a ? void 0 : g;
    }
    return R.call(c, i) ? c[i] : void 0;
  }
  function cr(i) {
    var c = this.__data__;
    return he ? c[i] !== void 0 : R.call(c, i);
  }
  function Ue(i, c) {
    var g = this.__data__;
    return g[i] = he && c === void 0 ? a : c, this;
  }
  $t.prototype.clear = nn, $t.prototype.delete = ur, $t.prototype.get = or, $t.prototype.has = cr, $t.prototype.set = Ue;
  function wt(i) {
    var c = -1, g = i ? i.length : 0;
    for (this.clear(); ++c < g; ) {
      var y = i[c];
      this.set(y[0], y[1]);
    }
  }
  function He() {
    this.__data__ = [];
  }
  function fr(i) {
    var c = this.__data__, g = Fe(c, i);
    if (g < 0)
      return !1;
    var y = c.length - 1;
    return g == y ? c.pop() : Vt.call(c, g, 1), !0;
  }
  function lr(i) {
    var c = this.__data__, g = Fe(c, i);
    return g < 0 ? void 0 : c[g][1];
  }
  function hr(i) {
    return Fe(this.__data__, i) > -1;
  }
  function qe(i, c) {
    var g = this.__data__, y = Fe(g, i);
    return y < 0 ? g.push([i, c]) : g[y][1] = c, this;
  }
  wt.prototype.clear = He, wt.prototype.delete = fr, wt.prototype.get = lr, wt.prototype.has = hr, wt.prototype.set = qe;
  function Gt(i) {
    var c = -1, g = i ? i.length : 0;
    for (this.clear(); ++c < g; ) {
      var y = i[c];
      this.set(y[0], y[1]);
    }
  }
  function De() {
    this.__data__ = {
      hash: new $t(),
      map: new (ie || wt)(),
      string: new $t()
    };
  }
  function dr(i) {
    return de(this, i).delete(i);
  }
  function Nn(i) {
    return de(this, i).get(i);
  }
  function Gn(i) {
    return de(this, i).has(i);
  }
  function vn(i, c) {
    return de(this, i).set(i, c), this;
  }
  Gt.prototype.clear = De, Gt.prototype.delete = dr, Gt.prototype.get = Nn, Gt.prototype.has = Gn, Gt.prototype.set = vn;
  function ye(i) {
    var c = -1, g = i ? i.length : 0;
    for (this.__data__ = new Gt(); ++c < g; )
      this.add(i[c]);
  }
  function Tn(i) {
    return this.__data__.set(i, a), this;
  }
  function $e(i) {
    return this.__data__.has(i);
  }
  ye.prototype.add = ye.prototype.push = Tn, ye.prototype.has = $e;
  function Yt(i) {
    this.__data__ = new wt(i);
  }
  function Ge() {
    this.__data__ = new wt();
  }
  function Wn(i) {
    return this.__data__.delete(i);
  }
  function pr(i) {
    return this.__data__.get(i);
  }
  function gr(i) {
    return this.__data__.has(i);
  }
  function Er(i, c) {
    var g = this.__data__;
    if (g instanceof wt) {
      var y = g.__data__;
      if (!ie || y.length < n - 1)
        return y.push([i, c]), this;
      g = this.__data__ = new Gt(y);
    }
    return g.set(i, c), this;
  }
  Yt.prototype.clear = Ge, Yt.prototype.delete = Wn, Yt.prototype.get = pr, Yt.prototype.has = gr, Yt.prototype.set = Er;
  function xn(i, c) {
    var g = bt(i) || ot(i) ? mn(i.length, String) : [], y = g.length, T = !!y;
    for (var w in i)
      (c || R.call(i, w)) && !(T && (w == "length" || Pe(w, y))) && g.push(w);
    return g;
  }
  function Fe(i, c) {
    for (var g = i.length; g--; )
      if (it(i[g][0], c))
        return g;
    return -1;
  }
  var Rn = Sr(Kn);
  function mr(i, c) {
    var g = [];
    return Rn(i, function(y, T, w) {
      c(y, T, w) && g.push(y);
    }), g;
  }
  var Qn = Jn();
  function Kn(i, c) {
    return i && Qn(i, c, er);
  }
  function Ln(i, c) {
    c = Jt(c, i) ? [c] : yn(c);
    for (var g = 0, y = c.length; i != null && g < y; )
      i = i[ae(c[g++])];
    return g && g == y ? i : void 0;
  }
  function fn(i) {
    return B.call(i);
  }
  function An(i, c) {
    return i != null && c in Object(i);
  }
  function rn(i, c, g, y, T) {
    return i === c ? !0 : i == null || c == null || !Mt(i) && !ce(c) ? i !== i && c !== c : br(i, c, rn, g, y, T);
  }
  function br(i, c, g, y, T, w) {
    var G = bt(i), X = bt(c), tt = p, st = p;
    G || (tt = Rt(i), tt = tt == E ? F : tt), X || (st = Rt(c), st = st == E ? F : st);
    var ut = tt == F && !_e(i), rt = st == F && !_e(c), ft = tt == st;
    if (ft && !ut)
      return w || (w = new Yt()), G || Vn(i) ? Xe(i, c, g, y, T, w) : Yn(i, c, tt, g, y, T, w);
    if (!(T & o)) {
      var ht = ut && R.call(i, "__wrapped__"), At = rt && R.call(c, "__wrapped__");
      if (ht || At) {
        var yt = ht ? i.value() : i, Ot = At ? c.value() : c;
        return w || (w = new Yt()), g(yt, Ot, y, T, w);
      }
    }
    return ft ? (w || (w = new Yt()), ln(i, c, g, y, T, w)) : !1;
  }
  function Xn(i, c, g, y) {
    var T = g.length, w = T, G = !y;
    if (i == null)
      return !w;
    for (i = Object(i); T--; ) {
      var X = g[T];
      if (G && X[2] ? X[1] !== i[X[0]] : !(X[0] in i))
        return !1;
    }
    for (; ++T < w; ) {
      X = g[T];
      var tt = X[0], st = i[tt], ut = X[1];
      if (G && X[2]) {
        if (st === void 0 && !(tt in i))
          return !1;
      } else {
        var rt = new Yt();
        if (y)
          var ft = y(st, ut, tt, i, c, rt);
        if (!(ft === void 0 ? rn(ut, st, y, u | o, rt) : ft))
          return !1;
      }
    }
    return !0;
  }
  function _r(i) {
    if (!Mt(i) || Zn(i))
      return !1;
    var c = vt(i) || _e(i) ? V : oe;
    return c.test(Lt(i));
  }
  function Tr(i) {
    return ce(i) && kt(i.length) && !!$[B.call(i)];
  }
  function Ar(i) {
    return typeof i == "function" ? i : i == null ? $r : typeof i == "object" ? bt(i) ? Cr(i[0], i[1]) : yr(i) : s(i);
  }
  function zn(i) {
    if (!vr(i))
      return xt(i);
    var c = [];
    for (var g in Object(i))
      R.call(i, g) && g != "constructor" && c.push(g);
    return c;
  }
  function yr(i) {
    var c = hn(i);
    return c.length == 1 && c[0][2] ? dn(c[0][0], c[0][1]) : function(g) {
      return g === i || Xn(g, i, c);
    };
  }
  function Cr(i, c) {
    return Jt(i) && sn(c) ? dn(ae(i), c) : function(g) {
      var y = qr(g, i);
      return y === void 0 && y === c ? Be(g, i) : rn(c, y, void 0, u | o);
    };
  }
  function Ir(i) {
    return function(c) {
      return Ln(c, i);
    };
  }
  function On(i) {
    if (typeof i == "string")
      return i;
    if (Cn(i))
      return xe ? xe.call(i) : "";
    var c = i + "";
    return c == "0" && 1 / i == -h ? "-0" : c;
  }
  function yn(i) {
    return bt(i) ? i : xr(i);
  }
  function Sr(i, c) {
    return function(g, y) {
      if (g == null)
        return g;
      if (!Ht(g))
        return i(g, y);
      for (var T = g.length, w = c ? T : -1, G = Object(g); (c ? w-- : ++w < T) && y(G[w], w, G) !== !1; )
        ;
      return g;
    };
  }
  function Jn(i) {
    return function(c, g, y) {
      for (var T = -1, w = Object(c), G = y(c), X = G.length; X--; ) {
        var tt = G[i ? X : ++T];
        if (g(w[tt], tt, w) === !1)
          break;
      }
      return c;
    };
  }
  function Xe(i, c, g, y, T, w) {
    var G = T & o, X = i.length, tt = c.length;
    if (X != tt && !(G && tt > X))
      return !1;
    var st = w.get(i);
    if (st && w.get(c))
      return st == c;
    var ut = -1, rt = !0, ft = T & u ? new ye() : void 0;
    for (w.set(i, c), w.set(c, i); ++ut < X; ) {
      var ht = i[ut], At = c[ut];
      if (y)
        var yt = G ? y(At, ht, ut, c, i, w) : y(ht, At, ut, i, c, w);
      if (yt !== void 0) {
        if (yt)
          continue;
        rt = !1;
        break;
      }
      if (ft) {
        if (!qn(c, function(Ot, Ye) {
          if (!ft.has(Ye) && (ht === Ot || g(ht, Ot, y, T, w)))
            return ft.add(Ye);
        })) {
          rt = !1;
          break;
        }
      } else if (!(ht === At || g(ht, At, y, T, w))) {
        rt = !1;
        break;
      }
    }
    return w.delete(i), w.delete(c), rt;
  }
  function Yn(i, c, g, y, T, w, G) {
    switch (g) {
      case nt:
        if (i.byteLength != c.byteLength || i.byteOffset != c.byteOffset)
          return !1;
        i = i.buffer, c = c.buffer;
      case z:
        return !(i.byteLength != c.byteLength || !y(new Pt(i), new Pt(c)));
      case N:
      case v:
      case O:
        return it(+i, +c);
      case S:
        return i.name == c.name && i.message == c.message;
      case Q:
      case P:
        return i == c + "";
      case M:
        var X = fe;
      case U:
        var tt = w & o;
        if (X || (X = $n), i.size != c.size && !tt)
          return !1;
        var st = G.get(i);
        if (st)
          return st == c;
        w |= u, G.set(i, c);
        var ut = Xe(X(i), X(c), y, T, w, G);
        return G.delete(i), ut;
      case Y:
        if (we)
          return we.call(i) == we.call(c);
    }
    return !1;
  }
  function ln(i, c, g, y, T, w) {
    var G = T & o, X = er(i), tt = X.length, st = er(c), ut = st.length;
    if (tt != ut && !G)
      return !1;
    for (var rt = tt; rt--; ) {
      var ft = X[rt];
      if (!(G ? ft in c : R.call(c, ft)))
        return !1;
    }
    var ht = w.get(i);
    if (ht && w.get(c))
      return ht == c;
    var At = !0;
    w.set(i, c), w.set(c, i);
    for (var yt = G; ++rt < tt; ) {
      ft = X[rt];
      var Ot = i[ft], Ye = c[ft];
      if (y)
        var Re = G ? y(Ye, Ot, ft, c, i, w) : y(Ot, Ye, ft, i, c, w);
      if (!(Re === void 0 ? Ot === Ye || g(Ot, Ye, y, T, w) : Re)) {
        At = !1;
        break;
      }
      yt || (yt = ft == "constructor");
    }
    if (At && !yt) {
      var Ee = i.constructor, Bi = c.constructor;
      Ee != Bi && "constructor" in i && "constructor" in c && !(typeof Ee == "function" && Ee instanceof Ee && typeof Bi == "function" && Bi instanceof Bi) && (At = !1);
    }
    return w.delete(i), w.delete(c), At;
  }
  function de(i, c) {
    var g = i.__data__;
    return Nr(c) ? g[typeof c == "string" ? "string" : "hash"] : g.map;
  }
  function hn(i) {
    for (var c = er(i), g = c.length; g--; ) {
      var y = c[g], T = i[y];
      c[g] = [y, T, sn(T)];
    }
    return c;
  }
  function Dt(i, c) {
    var g = ge(i, c);
    return _r(g) ? g : void 0;
  }
  var Rt = fn;
  (le && Rt(new le(new ArrayBuffer(1))) != nt || ie && Rt(new ie()) != M || te && Rt(te.resolve()) != Z || Oe && Rt(new Oe()) != U || Ae && Rt(new Ae()) != H) && (Rt = function(i) {
    var c = B.call(i), g = c == F ? i.constructor : void 0, y = g ? Lt(g) : void 0;
    if (y)
      switch (y) {
        case _n:
          return nt;
        case ir:
          return M;
        case ke:
          return Z;
        case ar:
          return U;
        case Sn:
          return H;
      }
    return c;
  });
  function wn(i, c, g) {
    c = Jt(c, i) ? [c] : yn(c);
    for (var y, T = -1, G = c.length; ++T < G; ) {
      var w = ae(c[T]);
      if (!(y = i != null && g(i, w)))
        break;
      i = i[w];
    }
    if (y)
      return y;
    var G = i ? i.length : 0;
    return !!G && kt(G) && Pe(w, G) && (bt(i) || ot(i));
  }
  function Pe(i, c) {
    return c = c ?? m, !!c && (typeof i == "number" || We.test(i)) && i > -1 && i % 1 == 0 && i < c;
  }
  function Jt(i, c) {
    if (bt(i))
      return !1;
    var g = typeof i;
    return g == "number" || g == "symbol" || g == "boolean" || i == null || Cn(i) ? !0 : zt.test(i) || !on.test(i) || c != null && i in Object(c);
  }
  function Nr(i) {
    var c = typeof i;
    return c == "string" || c == "number" || c == "symbol" || c == "boolean" ? i !== "__proto__" : i === null;
  }
  function Zn(i) {
    return !!d && d in i;
  }
  function vr(i) {
    var c = i && i.constructor, g = typeof c == "function" && c.prototype || b;
    return i === g;
  }
  function sn(i) {
    return i === i && !Mt(i);
  }
  function dn(i, c) {
    return function(g) {
      return g == null ? !1 : g[i] === c && (c !== void 0 || i in Object(g));
    };
  }
  var xr = D(function(i) {
    i = tr(i);
    var c = [];
    return tn.test(i) && c.push(""), i.replace(Nt, function(g, y, T, w) {
      c.push(T ? w.replace(Zt, "$1") : y || g);
    }), c;
  });
  function ae(i) {
    if (typeof i == "string" || Cn(i))
      return i;
    var c = i + "";
    return c == "0" && 1 / i == -h ? "-0" : c;
  }
  function Lt(i) {
    if (i != null) {
      try {
        return A.call(i);
      } catch {
      }
      try {
        return i + "";
      } catch {
      }
    }
    return "";
  }
  function I(i, c) {
    var g = bt(i) ? In : mr;
    return g(i, q(Ar(c)));
  }
  function D(i, c) {
    if (typeof i != "function" || c && typeof c != "function")
      throw new TypeError(r);
    var g = function() {
      var y = arguments, T = c ? c.apply(this, y) : y[0], w = g.cache;
      if (w.has(T))
        return w.get(T);
      var G = i.apply(this, y);
      return g.cache = w.set(T, G), G;
    };
    return g.cache = new (D.Cache || Gt)(), g;
  }
  D.Cache = Gt;
  function q(i) {
    if (typeof i != "function")
      throw new TypeError(r);
    return function() {
      var c = arguments;
      switch (c.length) {
        case 0:
          return !i.call(this);
        case 1:
          return !i.call(this, c[0]);
        case 2:
          return !i.call(this, c[0], c[1]);
        case 3:
          return !i.call(this, c[0], c[1], c[2]);
      }
      return !i.apply(this, c);
    };
  }
  function it(i, c) {
    return i === c || i !== i && c !== c;
  }
  function ot(i) {
    return Tt(i) && R.call(i, "callee") && (!Bt.call(i, "callee") || B.call(i) == E);
  }
  var bt = Array.isArray;
  function Ht(i) {
    return i != null && kt(i.length) && !vt(i);
  }
  function Tt(i) {
    return ce(i) && Ht(i);
  }
  function vt(i) {
    var c = Mt(i) ? B.call(i) : "";
    return c == L || c == W;
  }
  function kt(i) {
    return typeof i == "number" && i > -1 && i % 1 == 0 && i <= m;
  }
  function Mt(i) {
    var c = typeof i;
    return !!i && (c == "object" || c == "function");
  }
  function ce(i) {
    return !!i && typeof i == "object";
  }
  function Cn(i) {
    return typeof i == "symbol" || ce(i) && B.call(i) == Y;
  }
  var Vn = Ne ? cn(Ne) : Tr;
  function tr(i) {
    return i == null ? "" : On(i);
  }
  function qr(i, c, g) {
    var y = i == null ? void 0 : Ln(i, c);
    return y === void 0 ? g : y;
  }
  function Be(i, c) {
    return i != null && wn(i, c, An);
  }
  function er(i) {
    return Ht(i) ? xn(i) : zn(i);
  }
  function $r(i) {
    return i;
  }
  function s(i) {
    return Jt(i) ? Ke(ae(i)) : Ir(i);
  }
  t.exports = I;
})(pa, pa.exports);
var krt = pa.exports, ga = { exports: {} };
ga.exports;
(function(t, e) {
  var n = 200, r = "Expected a function", a = "__lodash_hash_undefined__", u = 1, o = 2, h = 1 / 0, m = 9007199254740991, E = "[object Arguments]", p = "[object Array]", N = "[object Boolean]", v = "[object Date]", S = "[object Error]", L = "[object Function]", W = "[object GeneratorFunction]", M = "[object Map]", O = "[object Number]", F = "[object Object]", Z = "[object Promise]", Q = "[object RegExp]", U = "[object Set]", P = "[object String]", Y = "[object Symbol]", H = "[object WeakMap]", z = "[object ArrayBuffer]", nt = "[object DataView]", at = "[object Float32Array]", gt = "[object Float64Array]", dt = "[object Int8Array]", St = "[object Int16Array]", Ut = "[object Int32Array]", Xt = "[object Uint8Array]", Ct = "[object Uint8ClampedArray]", Qt = "[object Uint16Array]", En = "[object Uint32Array]", on = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, zt = /^\w*$/, tn = /^\./, Nt = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Wt = /[\\^$.*+?()[\]{}|]/g, Zt = /\\(\\)?/g, oe = /^\[object .+?Constructor\]$/, We = /^(?:0|[1-9]\d*)$/, $ = {};
  $[at] = $[gt] = $[dt] = $[St] = $[Ut] = $[Xt] = $[Ct] = $[Qt] = $[En] = !0, $[E] = $[p] = $[z] = $[N] = $[nt] = $[v] = $[S] = $[L] = $[M] = $[O] = $[F] = $[Q] = $[U] = $[P] = $[H] = !1;
  var Ie = typeof qt == "object" && qt && qt.Object === Object && qt, Se = typeof self == "object" && self && self.Object === Object && self, pt = Ie || Se || Function("return this")(), pe = e && !e.nodeType && e, Le = pe && !0 && t && !t.nodeType && t, Qe = Le && Le.exports === pe, se = Qe && Ie.process, be = function() {
    try {
      return se && se.binding("util");
    } catch {
    }
  }(), Ne = be && be.isTypedArray;
  function In(s, i) {
    for (var c = -1, g = s ? s.length : 0, y = 0, T = []; ++c < g; ) {
      var w = s[c];
      i(w, c, s) && (T[y++] = w);
    }
    return T;
  }
  function qn(s, i) {
    for (var c = -1, g = s ? s.length : 0; ++c < g; )
      if (i(s[c], c, s))
        return !0;
    return !1;
  }
  function Ke(s) {
    return function(i) {
      return i == null ? void 0 : i[s];
    };
  }
  function mn(s, i) {
    for (var c = -1, g = Array(s); ++c < s; )
      g[c] = i(c);
    return g;
  }
  function cn(s) {
    return function(i) {
      return s(i);
    };
  }
  function ge(s, i) {
    return s == null ? void 0 : s[i];
  }
  function _e(s) {
    var i = !1;
    if (s != null && typeof s.toString != "function")
      try {
        i = !!(s + "");
      } catch {
      }
    return i;
  }
  function fe(s) {
    var i = -1, c = Array(s.size);
    return s.forEach(function(g, y) {
      c[++i] = [y, g];
    }), c;
  }
  function bn(s, i) {
    return function(c) {
      return s(i(c));
    };
  }
  function $n(s) {
    var i = -1, c = Array(s.size);
    return s.forEach(function(g) {
      c[++i] = g;
    }), c;
  }
  var Te = Array.prototype, en = Function.prototype, b = Object.prototype, l = pt["__core-js_shared__"], d = function() {
    var s = /[^.]+$/.exec(l && l.keys && l.keys.IE_PROTO || "");
    return s ? "Symbol(src)_1." + s : "";
  }(), A = en.toString, R = b.hasOwnProperty, B = b.toString, V = RegExp(
    "^" + A.call(R).replace(Wt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Et = pt.Symbol, Pt = pt.Uint8Array, Bt = b.propertyIsEnumerable, Vt = Te.splice, xt = bn(Object.keys, Object), le = Dt(pt, "DataView"), ie = Dt(pt, "Map"), te = Dt(pt, "Promise"), Oe = Dt(pt, "Set"), Ae = Dt(pt, "WeakMap"), he = Dt(Object, "create"), _n = Lt(le), ir = Lt(ie), ke = Lt(te), ar = Lt(Oe), Sn = Lt(Ae), ve = Et ? Et.prototype : void 0, we = ve ? ve.valueOf : void 0, xe = ve ? ve.toString : void 0;
  function $t(s) {
    var i = -1, c = s ? s.length : 0;
    for (this.clear(); ++i < c; ) {
      var g = s[i];
      this.set(g[0], g[1]);
    }
  }
  function nn() {
    this.__data__ = he ? he(null) : {};
  }
  function ur(s) {
    return this.has(s) && delete this.__data__[s];
  }
  function or(s) {
    var i = this.__data__;
    if (he) {
      var c = i[s];
      return c === a ? void 0 : c;
    }
    return R.call(i, s) ? i[s] : void 0;
  }
  function cr(s) {
    var i = this.__data__;
    return he ? i[s] !== void 0 : R.call(i, s);
  }
  function Ue(s, i) {
    var c = this.__data__;
    return c[s] = he && i === void 0 ? a : i, this;
  }
  $t.prototype.clear = nn, $t.prototype.delete = ur, $t.prototype.get = or, $t.prototype.has = cr, $t.prototype.set = Ue;
  function wt(s) {
    var i = -1, c = s ? s.length : 0;
    for (this.clear(); ++i < c; ) {
      var g = s[i];
      this.set(g[0], g[1]);
    }
  }
  function He() {
    this.__data__ = [];
  }
  function fr(s) {
    var i = this.__data__, c = Fe(i, s);
    if (c < 0)
      return !1;
    var g = i.length - 1;
    return c == g ? i.pop() : Vt.call(i, c, 1), !0;
  }
  function lr(s) {
    var i = this.__data__, c = Fe(i, s);
    return c < 0 ? void 0 : i[c][1];
  }
  function hr(s) {
    return Fe(this.__data__, s) > -1;
  }
  function qe(s, i) {
    var c = this.__data__, g = Fe(c, s);
    return g < 0 ? c.push([s, i]) : c[g][1] = i, this;
  }
  wt.prototype.clear = He, wt.prototype.delete = fr, wt.prototype.get = lr, wt.prototype.has = hr, wt.prototype.set = qe;
  function Gt(s) {
    var i = -1, c = s ? s.length : 0;
    for (this.clear(); ++i < c; ) {
      var g = s[i];
      this.set(g[0], g[1]);
    }
  }
  function De() {
    this.__data__ = {
      hash: new $t(),
      map: new (ie || wt)(),
      string: new $t()
    };
  }
  function dr(s) {
    return de(this, s).delete(s);
  }
  function Nn(s) {
    return de(this, s).get(s);
  }
  function Gn(s) {
    return de(this, s).has(s);
  }
  function vn(s, i) {
    return de(this, s).set(s, i), this;
  }
  Gt.prototype.clear = De, Gt.prototype.delete = dr, Gt.prototype.get = Nn, Gt.prototype.has = Gn, Gt.prototype.set = vn;
  function ye(s) {
    var i = -1, c = s ? s.length : 0;
    for (this.__data__ = new Gt(); ++i < c; )
      this.add(s[i]);
  }
  function Tn(s) {
    return this.__data__.set(s, a), this;
  }
  function $e(s) {
    return this.__data__.has(s);
  }
  ye.prototype.add = ye.prototype.push = Tn, ye.prototype.has = $e;
  function Yt(s) {
    this.__data__ = new wt(s);
  }
  function Ge() {
    this.__data__ = new wt();
  }
  function Wn(s) {
    return this.__data__.delete(s);
  }
  function pr(s) {
    return this.__data__.get(s);
  }
  function gr(s) {
    return this.__data__.has(s);
  }
  function Er(s, i) {
    var c = this.__data__;
    if (c instanceof wt) {
      var g = c.__data__;
      if (!ie || g.length < n - 1)
        return g.push([s, i]), this;
      c = this.__data__ = new Gt(g);
    }
    return c.set(s, i), this;
  }
  Yt.prototype.clear = Ge, Yt.prototype.delete = Wn, Yt.prototype.get = pr, Yt.prototype.has = gr, Yt.prototype.set = Er;
  function xn(s, i) {
    var c = ot(s) || it(s) ? mn(s.length, String) : [], g = c.length, y = !!g;
    for (var T in s)
      (i || R.call(s, T)) && !(y && (T == "length" || Pe(T, g))) && c.push(T);
    return c;
  }
  function Fe(s, i) {
    for (var c = s.length; c--; )
      if (q(s[c][0], i))
        return c;
    return -1;
  }
  var Rn = Sr(Kn);
  function mr(s, i) {
    var c = [];
    return Rn(s, function(g, y, T) {
      i(g, y, T) && c.push(g);
    }), c;
  }
  var Qn = Jn();
  function Kn(s, i) {
    return s && Qn(s, i, Be);
  }
  function Ln(s, i) {
    i = Jt(i, s) ? [i] : yn(i);
    for (var c = 0, g = i.length; s != null && c < g; )
      s = s[ae(i[c++])];
    return c && c == g ? s : void 0;
  }
  function fn(s) {
    return B.call(s);
  }
  function An(s, i) {
    return s != null && i in Object(s);
  }
  function rn(s, i, c, g, y) {
    return s === i ? !0 : s == null || i == null || !kt(s) && !Mt(i) ? s !== s && i !== i : br(s, i, rn, c, g, y);
  }
  function br(s, i, c, g, y, T) {
    var w = ot(s), G = ot(i), X = p, tt = p;
    w || (X = Rt(s), X = X == E ? F : X), G || (tt = Rt(i), tt = tt == E ? F : tt);
    var st = X == F && !_e(s), ut = tt == F && !_e(i), rt = X == tt;
    if (rt && !st)
      return T || (T = new Yt()), w || Cn(s) ? Xe(s, i, c, g, y, T) : Yn(s, i, X, c, g, y, T);
    if (!(y & o)) {
      var ft = st && R.call(s, "__wrapped__"), ht = ut && R.call(i, "__wrapped__");
      if (ft || ht) {
        var At = ft ? s.value() : s, yt = ht ? i.value() : i;
        return T || (T = new Yt()), c(At, yt, g, y, T);
      }
    }
    return rt ? (T || (T = new Yt()), ln(s, i, c, g, y, T)) : !1;
  }
  function Xn(s, i, c, g) {
    var y = c.length, T = y, w = !g;
    if (s == null)
      return !T;
    for (s = Object(s); y--; ) {
      var G = c[y];
      if (w && G[2] ? G[1] !== s[G[0]] : !(G[0] in s))
        return !1;
    }
    for (; ++y < T; ) {
      G = c[y];
      var X = G[0], tt = s[X], st = G[1];
      if (w && G[2]) {
        if (tt === void 0 && !(X in s))
          return !1;
      } else {
        var ut = new Yt();
        if (g)
          var rt = g(tt, st, X, s, i, ut);
        if (!(rt === void 0 ? rn(st, tt, g, u | o, ut) : rt))
          return !1;
      }
    }
    return !0;
  }
  function _r(s) {
    if (!kt(s) || Zn(s))
      return !1;
    var i = Tt(s) || _e(s) ? V : oe;
    return i.test(Lt(s));
  }
  function Tr(s) {
    return Mt(s) && vt(s.length) && !!$[B.call(s)];
  }
  function Ar(s) {
    return typeof s == "function" ? s : s == null ? er : typeof s == "object" ? ot(s) ? Cr(s[0], s[1]) : yr(s) : $r(s);
  }
  function zn(s) {
    if (!vr(s))
      return xt(s);
    var i = [];
    for (var c in Object(s))
      R.call(s, c) && c != "constructor" && i.push(c);
    return i;
  }
  function yr(s) {
    var i = hn(s);
    return i.length == 1 && i[0][2] ? dn(i[0][0], i[0][1]) : function(c) {
      return c === s || Xn(c, s, i);
    };
  }
  function Cr(s, i) {
    return Jt(s) && sn(i) ? dn(ae(s), i) : function(c) {
      var g = tr(c, s);
      return g === void 0 && g === i ? qr(c, s) : rn(i, g, void 0, u | o);
    };
  }
  function Ir(s) {
    return function(i) {
      return Ln(i, s);
    };
  }
  function On(s) {
    if (typeof s == "string")
      return s;
    if (ce(s))
      return xe ? xe.call(s) : "";
    var i = s + "";
    return i == "0" && 1 / s == -h ? "-0" : i;
  }
  function yn(s) {
    return ot(s) ? s : xr(s);
  }
  function Sr(s, i) {
    return function(c, g) {
      if (c == null)
        return c;
      if (!bt(c))
        return s(c, g);
      for (var y = c.length, T = i ? y : -1, w = Object(c); (i ? T-- : ++T < y) && g(w[T], T, w) !== !1; )
        ;
      return c;
    };
  }
  function Jn(s) {
    return function(i, c, g) {
      for (var y = -1, T = Object(i), w = g(i), G = w.length; G--; ) {
        var X = w[s ? G : ++y];
        if (c(T[X], X, T) === !1)
          break;
      }
      return i;
    };
  }
  function Xe(s, i, c, g, y, T) {
    var w = y & o, G = s.length, X = i.length;
    if (G != X && !(w && X > G))
      return !1;
    var tt = T.get(s);
    if (tt && T.get(i))
      return tt == i;
    var st = -1, ut = !0, rt = y & u ? new ye() : void 0;
    for (T.set(s, i), T.set(i, s); ++st < G; ) {
      var ft = s[st], ht = i[st];
      if (g)
        var At = w ? g(ht, ft, st, i, s, T) : g(ft, ht, st, s, i, T);
      if (At !== void 0) {
        if (At)
          continue;
        ut = !1;
        break;
      }
      if (rt) {
        if (!qn(i, function(yt, Ot) {
          if (!rt.has(Ot) && (ft === yt || c(ft, yt, g, y, T)))
            return rt.add(Ot);
        })) {
          ut = !1;
          break;
        }
      } else if (!(ft === ht || c(ft, ht, g, y, T))) {
        ut = !1;
        break;
      }
    }
    return T.delete(s), T.delete(i), ut;
  }
  function Yn(s, i, c, g, y, T, w) {
    switch (c) {
      case nt:
        if (s.byteLength != i.byteLength || s.byteOffset != i.byteOffset)
          return !1;
        s = s.buffer, i = i.buffer;
      case z:
        return !(s.byteLength != i.byteLength || !g(new Pt(s), new Pt(i)));
      case N:
      case v:
      case O:
        return q(+s, +i);
      case S:
        return s.name == i.name && s.message == i.message;
      case Q:
      case P:
        return s == i + "";
      case M:
        var G = fe;
      case U:
        var X = T & o;
        if (G || (G = $n), s.size != i.size && !X)
          return !1;
        var tt = w.get(s);
        if (tt)
          return tt == i;
        T |= u, w.set(s, i);
        var st = Xe(G(s), G(i), g, y, T, w);
        return w.delete(s), st;
      case Y:
        if (we)
          return we.call(s) == we.call(i);
    }
    return !1;
  }
  function ln(s, i, c, g, y, T) {
    var w = y & o, G = Be(s), X = G.length, tt = Be(i), st = tt.length;
    if (X != st && !w)
      return !1;
    for (var ut = X; ut--; ) {
      var rt = G[ut];
      if (!(w ? rt in i : R.call(i, rt)))
        return !1;
    }
    var ft = T.get(s);
    if (ft && T.get(i))
      return ft == i;
    var ht = !0;
    T.set(s, i), T.set(i, s);
    for (var At = w; ++ut < X; ) {
      rt = G[ut];
      var yt = s[rt], Ot = i[rt];
      if (g)
        var Ye = w ? g(Ot, yt, rt, i, s, T) : g(yt, Ot, rt, s, i, T);
      if (!(Ye === void 0 ? yt === Ot || c(yt, Ot, g, y, T) : Ye)) {
        ht = !1;
        break;
      }
      At || (At = rt == "constructor");
    }
    if (ht && !At) {
      var Re = s.constructor, Ee = i.constructor;
      Re != Ee && "constructor" in s && "constructor" in i && !(typeof Re == "function" && Re instanceof Re && typeof Ee == "function" && Ee instanceof Ee) && (ht = !1);
    }
    return T.delete(s), T.delete(i), ht;
  }
  function de(s, i) {
    var c = s.__data__;
    return Nr(i) ? c[typeof i == "string" ? "string" : "hash"] : c.map;
  }
  function hn(s) {
    for (var i = Be(s), c = i.length; c--; ) {
      var g = i[c], y = s[g];
      i[c] = [g, y, sn(y)];
    }
    return i;
  }
  function Dt(s, i) {
    var c = ge(s, i);
    return _r(c) ? c : void 0;
  }
  var Rt = fn;
  (le && Rt(new le(new ArrayBuffer(1))) != nt || ie && Rt(new ie()) != M || te && Rt(te.resolve()) != Z || Oe && Rt(new Oe()) != U || Ae && Rt(new Ae()) != H) && (Rt = function(s) {
    var i = B.call(s), c = i == F ? s.constructor : void 0, g = c ? Lt(c) : void 0;
    if (g)
      switch (g) {
        case _n:
          return nt;
        case ir:
          return M;
        case ke:
          return Z;
        case ar:
          return U;
        case Sn:
          return H;
      }
    return i;
  });
  function wn(s, i, c) {
    i = Jt(i, s) ? [i] : yn(i);
    for (var g, y = -1, w = i.length; ++y < w; ) {
      var T = ae(i[y]);
      if (!(g = s != null && c(s, T)))
        break;
      s = s[T];
    }
    if (g)
      return g;
    var w = s ? s.length : 0;
    return !!w && vt(w) && Pe(T, w) && (ot(s) || it(s));
  }
  function Pe(s, i) {
    return i = i ?? m, !!i && (typeof s == "number" || We.test(s)) && s > -1 && s % 1 == 0 && s < i;
  }
  function Jt(s, i) {
    if (ot(s))
      return !1;
    var c = typeof s;
    return c == "number" || c == "symbol" || c == "boolean" || s == null || ce(s) ? !0 : zt.test(s) || !on.test(s) || i != null && s in Object(i);
  }
  function Nr(s) {
    var i = typeof s;
    return i == "string" || i == "number" || i == "symbol" || i == "boolean" ? s !== "__proto__" : s === null;
  }
  function Zn(s) {
    return !!d && d in s;
  }
  function vr(s) {
    var i = s && s.constructor, c = typeof i == "function" && i.prototype || b;
    return s === c;
  }
  function sn(s) {
    return s === s && !kt(s);
  }
  function dn(s, i) {
    return function(c) {
      return c == null ? !1 : c[s] === i && (i !== void 0 || s in Object(c));
    };
  }
  var xr = D(function(s) {
    s = Vn(s);
    var i = [];
    return tn.test(s) && i.push(""), s.replace(Nt, function(c, g, y, T) {
      i.push(y ? T.replace(Zt, "$1") : g || c);
    }), i;
  });
  function ae(s) {
    if (typeof s == "string" || ce(s))
      return s;
    var i = s + "";
    return i == "0" && 1 / s == -h ? "-0" : i;
  }
  function Lt(s) {
    if (s != null) {
      try {
        return A.call(s);
      } catch {
      }
      try {
        return s + "";
      } catch {
      }
    }
    return "";
  }
  function I(s, i) {
    var c = ot(s) ? In : mr;
    return c(s, Ar(i));
  }
  function D(s, i) {
    if (typeof s != "function" || i && typeof i != "function")
      throw new TypeError(r);
    var c = function() {
      var g = arguments, y = i ? i.apply(this, g) : g[0], T = c.cache;
      if (T.has(y))
        return T.get(y);
      var w = s.apply(this, g);
      return c.cache = T.set(y, w), w;
    };
    return c.cache = new (D.Cache || Gt)(), c;
  }
  D.Cache = Gt;
  function q(s, i) {
    return s === i || s !== s && i !== i;
  }
  function it(s) {
    return Ht(s) && R.call(s, "callee") && (!Bt.call(s, "callee") || B.call(s) == E);
  }
  var ot = Array.isArray;
  function bt(s) {
    return s != null && vt(s.length) && !Tt(s);
  }
  function Ht(s) {
    return Mt(s) && bt(s);
  }
  function Tt(s) {
    var i = kt(s) ? B.call(s) : "";
    return i == L || i == W;
  }
  function vt(s) {
    return typeof s == "number" && s > -1 && s % 1 == 0 && s <= m;
  }
  function kt(s) {
    var i = typeof s;
    return !!s && (i == "object" || i == "function");
  }
  function Mt(s) {
    return !!s && typeof s == "object";
  }
  function ce(s) {
    return typeof s == "symbol" || Mt(s) && B.call(s) == Y;
  }
  var Cn = Ne ? cn(Ne) : Tr;
  function Vn(s) {
    return s == null ? "" : On(s);
  }
  function tr(s, i, c) {
    var g = s == null ? void 0 : Ln(s, i);
    return g === void 0 ? c : g;
  }
  function qr(s, i) {
    return s != null && wn(s, i, An);
  }
  function Be(s) {
    return bt(s) ? xn(s) : zn(s);
  }
  function er(s) {
    return s;
  }
  function $r(s) {
    return Jt(s) ? Ke(ae(s)) : Ir(s);
  }
  t.exports = I;
})(ga, ga.exports);
var Urt = ga.exports, Ea = { exports: {} };
Ea.exports;
(function(t, e) {
  var n = 200, r = "Expected a function", a = "__lodash_hash_undefined__", u = 1, o = 2, h = 1 / 0, m = 9007199254740991, E = "[object Arguments]", p = "[object Array]", N = "[object Boolean]", v = "[object Date]", S = "[object Error]", L = "[object Function]", W = "[object GeneratorFunction]", M = "[object Map]", O = "[object Number]", F = "[object Object]", Z = "[object Promise]", Q = "[object RegExp]", U = "[object Set]", P = "[object String]", Y = "[object Symbol]", H = "[object WeakMap]", z = "[object ArrayBuffer]", nt = "[object DataView]", at = "[object Float32Array]", gt = "[object Float64Array]", dt = "[object Int8Array]", St = "[object Int16Array]", Ut = "[object Int32Array]", Xt = "[object Uint8Array]", Ct = "[object Uint8ClampedArray]", Qt = "[object Uint16Array]", En = "[object Uint32Array]", on = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, zt = /^\w*$/, tn = /^\./, Nt = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Wt = /[\\^$.*+?()[\]{}|]/g, Zt = /\\(\\)?/g, oe = /^\[object .+?Constructor\]$/, We = /^(?:0|[1-9]\d*)$/, $ = {};
  $[at] = $[gt] = $[dt] = $[St] = $[Ut] = $[Xt] = $[Ct] = $[Qt] = $[En] = !0, $[E] = $[p] = $[z] = $[N] = $[nt] = $[v] = $[S] = $[L] = $[M] = $[O] = $[F] = $[Q] = $[U] = $[P] = $[H] = !1;
  var Ie = typeof qt == "object" && qt && qt.Object === Object && qt, Se = typeof self == "object" && self && self.Object === Object && self, pt = Ie || Se || Function("return this")(), pe = e && !e.nodeType && e, Le = pe && !0 && t && !t.nodeType && t, Qe = Le && Le.exports === pe, se = Qe && Ie.process, be = function() {
    try {
      return se && se.binding("util");
    } catch {
    }
  }(), Ne = be && be.isTypedArray;
  function In(s, i, c, g) {
    var y = -1, T = s ? s.length : 0;
    for (g && T && (c = s[++y]); ++y < T; )
      c = i(c, s[y], y, s);
    return c;
  }
  function qn(s, i) {
    for (var c = -1, g = s ? s.length : 0; ++c < g; )
      if (i(s[c], c, s))
        return !0;
    return !1;
  }
  function Ke(s) {
    return function(i) {
      return i == null ? void 0 : i[s];
    };
  }
  function mn(s, i, c, g, y) {
    return y(s, function(T, w, G) {
      c = g ? (g = !1, T) : i(c, T, w, G);
    }), c;
  }
  function cn(s, i) {
    for (var c = -1, g = Array(s); ++c < s; )
      g[c] = i(c);
    return g;
  }
  function ge(s) {
    return function(i) {
      return s(i);
    };
  }
  function _e(s, i) {
    return s == null ? void 0 : s[i];
  }
  function fe(s) {
    var i = !1;
    if (s != null && typeof s.toString != "function")
      try {
        i = !!(s + "");
      } catch {
      }
    return i;
  }
  function bn(s) {
    var i = -1, c = Array(s.size);
    return s.forEach(function(g, y) {
      c[++i] = [y, g];
    }), c;
  }
  function $n(s, i) {
    return function(c) {
      return s(i(c));
    };
  }
  function Te(s) {
    var i = -1, c = Array(s.size);
    return s.forEach(function(g) {
      c[++i] = g;
    }), c;
  }
  var en = Array.prototype, b = Function.prototype, l = Object.prototype, d = pt["__core-js_shared__"], A = function() {
    var s = /[^.]+$/.exec(d && d.keys && d.keys.IE_PROTO || "");
    return s ? "Symbol(src)_1." + s : "";
  }(), R = b.toString, B = l.hasOwnProperty, V = l.toString, Et = RegExp(
    "^" + R.call(B).replace(Wt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Pt = pt.Symbol, Bt = pt.Uint8Array, Vt = l.propertyIsEnumerable, xt = en.splice, le = $n(Object.keys, Object), ie = Dt(pt, "DataView"), te = Dt(pt, "Map"), Oe = Dt(pt, "Promise"), Ae = Dt(pt, "Set"), he = Dt(pt, "WeakMap"), _n = Dt(Object, "create"), ir = Lt(ie), ke = Lt(te), ar = Lt(Oe), Sn = Lt(Ae), ve = Lt(he), we = Pt ? Pt.prototype : void 0, xe = we ? we.valueOf : void 0, $t = we ? we.toString : void 0;
  function nn(s) {
    var i = -1, c = s ? s.length : 0;
    for (this.clear(); ++i < c; ) {
      var g = s[i];
      this.set(g[0], g[1]);
    }
  }
  function ur() {
    this.__data__ = _n ? _n(null) : {};
  }
  function or(s) {
    return this.has(s) && delete this.__data__[s];
  }
  function cr(s) {
    var i = this.__data__;
    if (_n) {
      var c = i[s];
      return c === a ? void 0 : c;
    }
    return B.call(i, s) ? i[s] : void 0;
  }
  function Ue(s) {
    var i = this.__data__;
    return _n ? i[s] !== void 0 : B.call(i, s);
  }
  function wt(s, i) {
    var c = this.__data__;
    return c[s] = _n && i === void 0 ? a : i, this;
  }
  nn.prototype.clear = ur, nn.prototype.delete = or, nn.prototype.get = cr, nn.prototype.has = Ue, nn.prototype.set = wt;
  function He(s) {
    var i = -1, c = s ? s.length : 0;
    for (this.clear(); ++i < c; ) {
      var g = s[i];
      this.set(g[0], g[1]);
    }
  }
  function fr() {
    this.__data__ = [];
  }
  function lr(s) {
    var i = this.__data__, c = Rn(i, s);
    if (c < 0)
      return !1;
    var g = i.length - 1;
    return c == g ? i.pop() : xt.call(i, c, 1), !0;
  }
  function hr(s) {
    var i = this.__data__, c = Rn(i, s);
    return c < 0 ? void 0 : i[c][1];
  }
  function qe(s) {
    return Rn(this.__data__, s) > -1;
  }
  function Gt(s, i) {
    var c = this.__data__, g = Rn(c, s);
    return g < 0 ? c.push([s, i]) : c[g][1] = i, this;
  }
  He.prototype.clear = fr, He.prototype.delete = lr, He.prototype.get = hr, He.prototype.has = qe, He.prototype.set = Gt;
  function De(s) {
    var i = -1, c = s ? s.length : 0;
    for (this.clear(); ++i < c; ) {
      var g = s[i];
      this.set(g[0], g[1]);
    }
  }
  function dr() {
    this.__data__ = {
      hash: new nn(),
      map: new (te || He)(),
      string: new nn()
    };
  }
  function Nn(s) {
    return de(this, s).delete(s);
  }
  function Gn(s) {
    return de(this, s).get(s);
  }
  function vn(s) {
    return de(this, s).has(s);
  }
  function ye(s, i) {
    return de(this, s).set(s, i), this;
  }
  De.prototype.clear = dr, De.prototype.delete = Nn, De.prototype.get = Gn, De.prototype.has = vn, De.prototype.set = ye;
  function Tn(s) {
    var i = -1, c = s ? s.length : 0;
    for (this.__data__ = new De(); ++i < c; )
      this.add(s[i]);
  }
  function $e(s) {
    return this.__data__.set(s, a), this;
  }
  function Yt(s) {
    return this.__data__.has(s);
  }
  Tn.prototype.add = Tn.prototype.push = $e, Tn.prototype.has = Yt;
  function Ge(s) {
    this.__data__ = new He(s);
  }
  function Wn() {
    this.__data__ = new He();
  }
  function pr(s) {
    return this.__data__.delete(s);
  }
  function gr(s) {
    return this.__data__.get(s);
  }
  function Er(s) {
    return this.__data__.has(s);
  }
  function xn(s, i) {
    var c = this.__data__;
    if (c instanceof He) {
      var g = c.__data__;
      if (!te || g.length < n - 1)
        return g.push([s, i]), this;
      c = this.__data__ = new De(g);
    }
    return c.set(s, i), this;
  }
  Ge.prototype.clear = Wn, Ge.prototype.delete = pr, Ge.prototype.get = gr, Ge.prototype.has = Er, Ge.prototype.set = xn;
  function Fe(s, i) {
    var c = ot(s) || it(s) ? cn(s.length, String) : [], g = c.length, y = !!g;
    for (var T in s)
      (i || B.call(s, T)) && !(y && (T == "length" || Pe(T, g))) && c.push(T);
    return c;
  }
  function Rn(s, i) {
    for (var c = s.length; c--; )
      if (q(s[c][0], i))
        return c;
    return -1;
  }
  var mr = Sr(Kn), Qn = Jn();
  function Kn(s, i) {
    return s && Qn(s, i, Be);
  }
  function Ln(s, i) {
    i = Jt(i, s) ? [i] : yn(i);
    for (var c = 0, g = i.length; s != null && c < g; )
      s = s[ae(i[c++])];
    return c && c == g ? s : void 0;
  }
  function fn(s) {
    return V.call(s);
  }
  function An(s, i) {
    return s != null && i in Object(s);
  }
  function rn(s, i, c, g, y) {
    return s === i ? !0 : s == null || i == null || !kt(s) && !Mt(i) ? s !== s && i !== i : br(s, i, rn, c, g, y);
  }
  function br(s, i, c, g, y, T) {
    var w = ot(s), G = ot(i), X = p, tt = p;
    w || (X = Rt(s), X = X == E ? F : X), G || (tt = Rt(i), tt = tt == E ? F : tt);
    var st = X == F && !fe(s), ut = tt == F && !fe(i), rt = X == tt;
    if (rt && !st)
      return T || (T = new Ge()), w || Cn(s) ? Xe(s, i, c, g, y, T) : Yn(s, i, X, c, g, y, T);
    if (!(y & o)) {
      var ft = st && B.call(s, "__wrapped__"), ht = ut && B.call(i, "__wrapped__");
      if (ft || ht) {
        var At = ft ? s.value() : s, yt = ht ? i.value() : i;
        return T || (T = new Ge()), c(At, yt, g, y, T);
      }
    }
    return rt ? (T || (T = new Ge()), ln(s, i, c, g, y, T)) : !1;
  }
  function Xn(s, i, c, g) {
    var y = c.length, T = y, w = !g;
    if (s == null)
      return !T;
    for (s = Object(s); y--; ) {
      var G = c[y];
      if (w && G[2] ? G[1] !== s[G[0]] : !(G[0] in s))
        return !1;
    }
    for (; ++y < T; ) {
      G = c[y];
      var X = G[0], tt = s[X], st = G[1];
      if (w && G[2]) {
        if (tt === void 0 && !(X in s))
          return !1;
      } else {
        var ut = new Ge();
        if (g)
          var rt = g(tt, st, X, s, i, ut);
        if (!(rt === void 0 ? rn(st, tt, g, u | o, ut) : rt))
          return !1;
      }
    }
    return !0;
  }
  function _r(s) {
    if (!kt(s) || Zn(s))
      return !1;
    var i = Tt(s) || fe(s) ? Et : oe;
    return i.test(Lt(s));
  }
  function Tr(s) {
    return Mt(s) && vt(s.length) && !!$[V.call(s)];
  }
  function Ar(s) {
    return typeof s == "function" ? s : s == null ? er : typeof s == "object" ? ot(s) ? Cr(s[0], s[1]) : yr(s) : $r(s);
  }
  function zn(s) {
    if (!vr(s))
      return le(s);
    var i = [];
    for (var c in Object(s))
      B.call(s, c) && c != "constructor" && i.push(c);
    return i;
  }
  function yr(s) {
    var i = hn(s);
    return i.length == 1 && i[0][2] ? dn(i[0][0], i[0][1]) : function(c) {
      return c === s || Xn(c, s, i);
    };
  }
  function Cr(s, i) {
    return Jt(s) && sn(i) ? dn(ae(s), i) : function(c) {
      var g = tr(c, s);
      return g === void 0 && g === i ? qr(c, s) : rn(i, g, void 0, u | o);
    };
  }
  function Ir(s) {
    return function(i) {
      return Ln(i, s);
    };
  }
  function On(s) {
    if (typeof s == "string")
      return s;
    if (ce(s))
      return $t ? $t.call(s) : "";
    var i = s + "";
    return i == "0" && 1 / s == -h ? "-0" : i;
  }
  function yn(s) {
    return ot(s) ? s : xr(s);
  }
  function Sr(s, i) {
    return function(c, g) {
      if (c == null)
        return c;
      if (!bt(c))
        return s(c, g);
      for (var y = c.length, T = i ? y : -1, w = Object(c); (i ? T-- : ++T < y) && g(w[T], T, w) !== !1; )
        ;
      return c;
    };
  }
  function Jn(s) {
    return function(i, c, g) {
      for (var y = -1, T = Object(i), w = g(i), G = w.length; G--; ) {
        var X = w[s ? G : ++y];
        if (c(T[X], X, T) === !1)
          break;
      }
      return i;
    };
  }
  function Xe(s, i, c, g, y, T) {
    var w = y & o, G = s.length, X = i.length;
    if (G != X && !(w && X > G))
      return !1;
    var tt = T.get(s);
    if (tt && T.get(i))
      return tt == i;
    var st = -1, ut = !0, rt = y & u ? new Tn() : void 0;
    for (T.set(s, i), T.set(i, s); ++st < G; ) {
      var ft = s[st], ht = i[st];
      if (g)
        var At = w ? g(ht, ft, st, i, s, T) : g(ft, ht, st, s, i, T);
      if (At !== void 0) {
        if (At)
          continue;
        ut = !1;
        break;
      }
      if (rt) {
        if (!qn(i, function(yt, Ot) {
          if (!rt.has(Ot) && (ft === yt || c(ft, yt, g, y, T)))
            return rt.add(Ot);
        })) {
          ut = !1;
          break;
        }
      } else if (!(ft === ht || c(ft, ht, g, y, T))) {
        ut = !1;
        break;
      }
    }
    return T.delete(s), T.delete(i), ut;
  }
  function Yn(s, i, c, g, y, T, w) {
    switch (c) {
      case nt:
        if (s.byteLength != i.byteLength || s.byteOffset != i.byteOffset)
          return !1;
        s = s.buffer, i = i.buffer;
      case z:
        return !(s.byteLength != i.byteLength || !g(new Bt(s), new Bt(i)));
      case N:
      case v:
      case O:
        return q(+s, +i);
      case S:
        return s.name == i.name && s.message == i.message;
      case Q:
      case P:
        return s == i + "";
      case M:
        var G = bn;
      case U:
        var X = T & o;
        if (G || (G = Te), s.size != i.size && !X)
          return !1;
        var tt = w.get(s);
        if (tt)
          return tt == i;
        T |= u, w.set(s, i);
        var st = Xe(G(s), G(i), g, y, T, w);
        return w.delete(s), st;
      case Y:
        if (xe)
          return xe.call(s) == xe.call(i);
    }
    return !1;
  }
  function ln(s, i, c, g, y, T) {
    var w = y & o, G = Be(s), X = G.length, tt = Be(i), st = tt.length;
    if (X != st && !w)
      return !1;
    for (var ut = X; ut--; ) {
      var rt = G[ut];
      if (!(w ? rt in i : B.call(i, rt)))
        return !1;
    }
    var ft = T.get(s);
    if (ft && T.get(i))
      return ft == i;
    var ht = !0;
    T.set(s, i), T.set(i, s);
    for (var At = w; ++ut < X; ) {
      rt = G[ut];
      var yt = s[rt], Ot = i[rt];
      if (g)
        var Ye = w ? g(Ot, yt, rt, i, s, T) : g(yt, Ot, rt, s, i, T);
      if (!(Ye === void 0 ? yt === Ot || c(yt, Ot, g, y, T) : Ye)) {
        ht = !1;
        break;
      }
      At || (At = rt == "constructor");
    }
    if (ht && !At) {
      var Re = s.constructor, Ee = i.constructor;
      Re != Ee && "constructor" in s && "constructor" in i && !(typeof Re == "function" && Re instanceof Re && typeof Ee == "function" && Ee instanceof Ee) && (ht = !1);
    }
    return T.delete(s), T.delete(i), ht;
  }
  function de(s, i) {
    var c = s.__data__;
    return Nr(i) ? c[typeof i == "string" ? "string" : "hash"] : c.map;
  }
  function hn(s) {
    for (var i = Be(s), c = i.length; c--; ) {
      var g = i[c], y = s[g];
      i[c] = [g, y, sn(y)];
    }
    return i;
  }
  function Dt(s, i) {
    var c = _e(s, i);
    return _r(c) ? c : void 0;
  }
  var Rt = fn;
  (ie && Rt(new ie(new ArrayBuffer(1))) != nt || te && Rt(new te()) != M || Oe && Rt(Oe.resolve()) != Z || Ae && Rt(new Ae()) != U || he && Rt(new he()) != H) && (Rt = function(s) {
    var i = V.call(s), c = i == F ? s.constructor : void 0, g = c ? Lt(c) : void 0;
    if (g)
      switch (g) {
        case ir:
          return nt;
        case ke:
          return M;
        case ar:
          return Z;
        case Sn:
          return U;
        case ve:
          return H;
      }
    return i;
  });
  function wn(s, i, c) {
    i = Jt(i, s) ? [i] : yn(i);
    for (var g, y = -1, w = i.length; ++y < w; ) {
      var T = ae(i[y]);
      if (!(g = s != null && c(s, T)))
        break;
      s = s[T];
    }
    if (g)
      return g;
    var w = s ? s.length : 0;
    return !!w && vt(w) && Pe(T, w) && (ot(s) || it(s));
  }
  function Pe(s, i) {
    return i = i ?? m, !!i && (typeof s == "number" || We.test(s)) && s > -1 && s % 1 == 0 && s < i;
  }
  function Jt(s, i) {
    if (ot(s))
      return !1;
    var c = typeof s;
    return c == "number" || c == "symbol" || c == "boolean" || s == null || ce(s) ? !0 : zt.test(s) || !on.test(s) || i != null && s in Object(i);
  }
  function Nr(s) {
    var i = typeof s;
    return i == "string" || i == "number" || i == "symbol" || i == "boolean" ? s !== "__proto__" : s === null;
  }
  function Zn(s) {
    return !!A && A in s;
  }
  function vr(s) {
    var i = s && s.constructor, c = typeof i == "function" && i.prototype || l;
    return s === c;
  }
  function sn(s) {
    return s === s && !kt(s);
  }
  function dn(s, i) {
    return function(c) {
      return c == null ? !1 : c[s] === i && (i !== void 0 || s in Object(c));
    };
  }
  var xr = D(function(s) {
    s = Vn(s);
    var i = [];
    return tn.test(s) && i.push(""), s.replace(Nt, function(c, g, y, T) {
      i.push(y ? T.replace(Zt, "$1") : g || c);
    }), i;
  });
  function ae(s) {
    if (typeof s == "string" || ce(s))
      return s;
    var i = s + "";
    return i == "0" && 1 / s == -h ? "-0" : i;
  }
  function Lt(s) {
    if (s != null) {
      try {
        return R.call(s);
      } catch {
      }
      try {
        return s + "";
      } catch {
      }
    }
    return "";
  }
  function I(s, i, c) {
    var g = ot(s) ? In : mn, y = arguments.length < 3;
    return g(s, Ar(i), c, y, mr);
  }
  function D(s, i) {
    if (typeof s != "function" || i && typeof i != "function")
      throw new TypeError(r);
    var c = function() {
      var g = arguments, y = i ? i.apply(this, g) : g[0], T = c.cache;
      if (T.has(y))
        return T.get(y);
      var w = s.apply(this, g);
      return c.cache = T.set(y, w), w;
    };
    return c.cache = new (D.Cache || De)(), c;
  }
  D.Cache = De;
  function q(s, i) {
    return s === i || s !== s && i !== i;
  }
  function it(s) {
    return Ht(s) && B.call(s, "callee") && (!Vt.call(s, "callee") || V.call(s) == E);
  }
  var ot = Array.isArray;
  function bt(s) {
    return s != null && vt(s.length) && !Tt(s);
  }
  function Ht(s) {
    return Mt(s) && bt(s);
  }
  function Tt(s) {
    var i = kt(s) ? V.call(s) : "";
    return i == L || i == W;
  }
  function vt(s) {
    return typeof s == "number" && s > -1 && s % 1 == 0 && s <= m;
  }
  function kt(s) {
    var i = typeof s;
    return !!s && (i == "object" || i == "function");
  }
  function Mt(s) {
    return !!s && typeof s == "object";
  }
  function ce(s) {
    return typeof s == "symbol" || Mt(s) && V.call(s) == Y;
  }
  var Cn = Ne ? ge(Ne) : Tr;
  function Vn(s) {
    return s == null ? "" : On(s);
  }
  function tr(s, i, c) {
    var g = s == null ? void 0 : Ln(s, i);
    return g === void 0 ? c : g;
  }
  function qr(s, i) {
    return s != null && wn(s, i, An);
  }
  function Be(s) {
    return bt(s) ? Fe(s) : zn(s);
  }
  function er(s) {
    return s;
  }
  function $r(s) {
    return Jt(s) ? Ke(ae(s)) : Ir(s);
  }
  t.exports = I;
})(Ea, Ea.exports);
var Hrt = Ea.exports;
(function(t) {
  var e = C0, n = wr, r = n.domEach, a = vi().DomUtils.uniqueSort, u = n.isTag, o = {
    bind: jo,
    forEach: $a,
    reject: krt,
    filter: Urt,
    reduce: Hrt
  };
  t.find = function(E) {
    var p = o.reduce(this, function(L, W) {
      return L.concat(o.filter(W.children, u));
    }, []), N = this.constructor.contains, v;
    if (E && typeof E != "string")
      return E.cheerio ? v = E.get() : v = [E], this._make(v.filter(function(L) {
        var W, M;
        for (W = 0, M = this.length; W < M; ++W)
          if (N(this[W], L))
            return !0;
      }, this));
    var S = { __proto__: this.options, context: this.toArray() };
    return this._make(e(E, p, S));
  }, t.parent = function(E) {
    var p = [];
    return r(this, function(N, v) {
      var S = v.parent;
      S && p.indexOf(S) < 0 && p.push(S);
    }), arguments.length && (p = t.filter.call(p, E, this)), this._make(p);
  }, t.parents = function(E) {
    var p = [];
    return this.get().reverse().forEach(function(N) {
      m(this, N.parent, E, 1 / 0).forEach(
        function(v) {
          p.indexOf(v) === -1 && p.push(v);
        }
      );
    }, this), this._make(p);
  }, t.parentsUntil = function(E, p) {
    var N = [], v, S;
    return typeof E == "string" ? v = e(E, this.parents().toArray(), this.options)[0] : E && E.cheerio ? S = E.toArray() : E && (v = E), this.toArray().reverse().forEach(function(L) {
      for (; (L = L.parent) && (v && L !== v || S && S.indexOf(L) === -1 || !v && !S); )
        u(L) && N.indexOf(L) === -1 && N.push(L);
    }, this), this._make(p ? e(p, N, this.options) : N);
  }, t.closest = function(E) {
    var p = [];
    return E ? (r(this, (function(N, v) {
      var S = m(this, v, E, 1)[0];
      S && p.indexOf(S) < 0 && p.push(S);
    }).bind(this)), this._make(p)) : this._make(p);
  }, t.next = function(E) {
    if (!this[0])
      return this;
    var p = [];
    return o.forEach(this, function(N) {
      for (; N = N.next; )
        if (u(N)) {
          p.push(N);
          return;
        }
    }), E ? t.filter.call(p, E, this) : this._make(p);
  }, t.nextAll = function(E) {
    if (!this[0])
      return this;
    var p = [];
    return o.forEach(this, function(N) {
      for (; N = N.next; )
        u(N) && p.indexOf(N) === -1 && p.push(N);
    }), E ? t.filter.call(p, E, this) : this._make(p);
  }, t.nextUntil = function(E, p) {
    if (!this[0])
      return this;
    var N = [], v, S;
    return typeof E == "string" ? v = e(E, this.nextAll().get(), this.options)[0] : E && E.cheerio ? S = E.get() : E && (v = E), o.forEach(this, function(L) {
      for (; (L = L.next) && (v && L !== v || S && S.indexOf(L) === -1 || !v && !S); )
        u(L) && N.indexOf(L) === -1 && N.push(L);
    }), p ? t.filter.call(N, p, this) : this._make(N);
  }, t.prev = function(E) {
    if (!this[0])
      return this;
    var p = [];
    return o.forEach(this, function(N) {
      for (; N = N.prev; )
        if (u(N)) {
          p.push(N);
          return;
        }
    }), E ? t.filter.call(p, E, this) : this._make(p);
  }, t.prevAll = function(E) {
    if (!this[0])
      return this;
    var p = [];
    return o.forEach(this, function(N) {
      for (; N = N.prev; )
        u(N) && p.indexOf(N) === -1 && p.push(N);
    }), E ? t.filter.call(p, E, this) : this._make(p);
  }, t.prevUntil = function(E, p) {
    if (!this[0])
      return this;
    var N = [], v, S;
    return typeof E == "string" ? v = e(E, this.prevAll().get(), this.options)[0] : E && E.cheerio ? S = E.get() : E && (v = E), o.forEach(this, function(L) {
      for (; (L = L.prev) && (v && L !== v || S && S.indexOf(L) === -1 || !v && !S); )
        u(L) && N.indexOf(L) === -1 && N.push(L);
    }), p ? t.filter.call(N, p, this) : this._make(N);
  }, t.siblings = function(E) {
    var p = this.parent(), N = o.filter(
      p ? p.children() : this.siblingsAndMe(),
      o.bind(function(v) {
        return u(v) && !this.is(v);
      }, this)
    );
    return E !== void 0 ? t.filter.call(N, E, this) : this._make(N);
  }, t.children = function(E) {
    var p = o.reduce(this, function(N, v) {
      return N.concat(o.filter(v.children, u));
    }, []);
    return E === void 0 ? this._make(p) : t.filter.call(p, E, this);
  }, t.contents = function() {
    return this._make(o.reduce(this, function(E, p) {
      return E.push.apply(E, p.children), E;
    }, []));
  }, t.each = function(E) {
    for (var p = 0, N = this.length; p < N && E.call(this[p], p, this[p]) !== !1; )
      ++p;
    return this;
  }, t.map = function(E) {
    return this._make(o.reduce(this, function(p, N, v) {
      var S = E.call(N, v, N);
      return S == null ? p : p.concat(S);
    }, []));
  };
  var h = function(E) {
    return function(p, N) {
      var v;
      return N = N || this, typeof p == "string" ? v = e.compile(p, N.options) : typeof p == "function" ? v = function(S, L) {
        return p.call(S, L, S);
      } : p.cheerio ? v = p.is.bind(p) : v = function(S) {
        return p === S;
      }, N._make(E(this, v));
    };
  };
  t.filter = h(o.filter), t.not = h(o.reject), t.has = function(E) {
    var p = this;
    return t.filter.call(this, function() {
      return p._make(this).find(E).length > 0;
    });
  }, t.first = function() {
    return this.length > 1 ? this._make(this[0]) : this;
  }, t.last = function() {
    return this.length > 1 ? this._make(this[this.length - 1]) : this;
  }, t.eq = function(E) {
    return E = +E, E === 0 && this.length <= 1 ? this : (E < 0 && (E = this.length + E), this[E] ? this._make(this[E]) : this._make([]));
  }, t.get = function(E) {
    return E == null ? Array.prototype.slice.call(this) : this[E < 0 ? this.length + E : E];
  }, t.index = function(E) {
    var p, N;
    return arguments.length === 0 ? (p = this.parent().children(), N = this[0]) : typeof E == "string" ? (p = this._make(E), N = this[0]) : (p = this, N = E.cheerio ? E[0] : E), p.get().indexOf(N);
  }, t.slice = function() {
    return this._make([].slice.apply(this, arguments));
  };
  function m(E, p, N, v) {
    for (var S = []; p && S.length < v; )
      (!N || t.filter.call([p], N, E).length) && S.push(p), p = p.parent;
    return S;
  }
  t.end = function() {
    return this.prevObject || this._make([]);
  }, t.add = function(E, p) {
    for (var N = this._make(E, p), v = a(N.get().concat(this.get())), S = 0; S < v.length; ++S)
      N[S] = v[S];
    return N.length = v.length, N;
  }, t.addBack = function(E) {
    return this.add(
      arguments.length ? this.prevObject.filter(E) : this.prevObject
    );
  };
})(x0);
var Tu = {}, qrt = 9007199254740991, $rt = "[object Arguments]", Grt = "[object Function]", Yrt = "[object GeneratorFunction]", Vrt = typeof qt == "object" && qt && qt.Object === Object && qt, jrt = typeof self == "object" && self && self.Object === Object && self, Wrt = Vrt || jrt || Function("return this")();
function Qrt(t, e) {
  for (var n = -1, r = e.length, a = t.length; ++n < r; )
    t[a + n] = e[n];
  return t;
}
var sc = Object.prototype, Krt = sc.hasOwnProperty, R0 = sc.toString, kf = Wrt.Symbol, Xrt = sc.propertyIsEnumerable, Uf = kf ? kf.isConcatSpreadable : void 0;
function L0(t, e, n, r, a) {
  var u = -1, o = t.length;
  for (n || (n = zrt), a || (a = []); ++u < o; ) {
    var h = t[u];
    e > 0 && n(h) ? e > 1 ? L0(h, e - 1, n, r, a) : Qrt(a, h) : r || (a[a.length] = h);
  }
  return a;
}
function zrt(t) {
  return tst(t) || Zrt(t) || !!(Uf && t && t[Uf]);
}
function Jrt(t) {
  var e = t ? t.length : 0;
  return e ? L0(t, 1) : [];
}
function Zrt(t) {
  return nst(t) && Krt.call(t, "callee") && (!Xrt.call(t, "callee") || R0.call(t) == $rt);
}
var tst = Array.isArray;
function est(t) {
  return t != null && sst(t.length) && !rst(t);
}
function nst(t) {
  return ast(t) && est(t);
}
function rst(t) {
  var e = ist(t) ? R0.call(t) : "";
  return e == Grt || e == Yrt;
}
function sst(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= qrt;
}
function ist(t) {
  var e = typeof t;
  return !!t && (e == "object" || e == "function");
}
function ast(t) {
  return !!t && typeof t == "object";
}
var ust = Jrt, Hf;
function ost() {
  return Hf || (Hf = 1, function(t) {
    var e = Fa, n = rc(), r = e.update, a = e.evaluate, u = wr, o = u.domEach, h = u.cloneDom, m = u.isHtml, E = Array.prototype.slice, p = {
      flatten: ust,
      bind: jo,
      forEach: $a
    };
    t._makeDomArray = function(L, W) {
      return L == null ? [] : L.cheerio ? W ? h(L.get(), L.options) : L.get() : Array.isArray(L) ? p.flatten(L.map(function(M) {
        return this._makeDomArray(M, W);
      }, this)) : typeof L == "string" ? a(L, this.options) : W ? h([L]) : [L];
    };
    var N = function(S) {
      return function() {
        var L = E.call(arguments), W = this.length - 1;
        return o(this, function(M, O) {
          var F, Z;
          typeof L[0] == "function" ? Z = L[0].call(O, M, n.html(O.children)) : Z = L, F = this._makeDomArray(Z, M < W), S(F, O.children, O);
        });
      };
    }, v = function(S, L, W, M, O) {
      var F = [L, W].concat(M), Z = S[L - 1] || null, Q = S[L] || null, U, P, Y, H, z;
      for (U = 0, P = M.length; U < P; ++U)
        H = M[U], z = H.parent || H.root, Y = z && z.children.indexOf(M[U]), z && Y > -1 && (z.children.splice(Y, 1), O === z && L > Y && F[0]--), H.root = null, H.parent = O, H.prev && (H.prev.next = H.next || null), H.next && (H.next.prev = H.prev || null), H.prev = M[U - 1] || Z, H.next = M[U + 1] || Q;
      return Z && (Z.next = M[0]), Q && (Q.prev = M[M.length - 1]), S.splice.apply(S, F);
    };
    t.appendTo = function(S) {
      return S.cheerio || (S = this.constructor.call(this.constructor, S, null, this._originalRoot)), S.append(this), this;
    }, t.prependTo = function(S) {
      return S.cheerio || (S = this.constructor.call(this.constructor, S, null, this._originalRoot)), S.prepend(this), this;
    }, t.append = N(function(S, L, W) {
      v(L, L.length, 0, S, W);
    }), t.prepend = N(function(S, L, W) {
      v(L, 0, 0, S, W);
    }), t.wrap = function(S) {
      var L = typeof S == "function" && S, W = this.length - 1;
      return p.forEach(this, p.bind(function(M, O) {
        var F = M.parent || M.root, Z = F.children, Q, U;
        F && (L && (S = L.call(M, O)), typeof S == "string" && !m(S) && (S = this.parents().last().find(S).clone()), Q = this._makeDomArray(S, O < W).slice(0, 1), U = Z.indexOf(M), r([M], Q[0]), v(Z, U, 0, Q, F));
      }, this)), this;
    }, t.after = function() {
      var S = E.call(arguments), L = this.length - 1;
      return o(this, function(W, M) {
        var O = M.parent || M.root;
        if (O) {
          var F = O.children, Z = F.indexOf(M), Q, U;
          Z < 0 || (typeof S[0] == "function" ? Q = S[0].call(M, W, n.html(M.children)) : Q = S, U = this._makeDomArray(Q, W < L), v(F, Z + 1, 0, U, O));
        }
      }), this;
    }, t.insertAfter = function(S) {
      var L = [], W = this;
      return typeof S == "string" && (S = this.constructor.call(this.constructor, S, null, this._originalRoot)), S = this._makeDomArray(S), W.remove(), o(S, function(M, O) {
        var F = W._makeDomArray(W.clone()), Z = O.parent || O.root;
        if (Z) {
          var Q = Z.children, U = Q.indexOf(O);
          U < 0 || (v(Q, U + 1, 0, F, Z), L.push(F));
        }
      }), this.constructor.call(this.constructor, this._makeDomArray(L));
    }, t.before = function() {
      var S = E.call(arguments), L = this.length - 1;
      return o(this, function(W, M) {
        var O = M.parent || M.root;
        if (O) {
          var F = O.children, Z = F.indexOf(M), Q, U;
          Z < 0 || (typeof S[0] == "function" ? Q = S[0].call(M, W, n.html(M.children)) : Q = S, U = this._makeDomArray(Q, W < L), v(F, Z, 0, U, O));
        }
      }), this;
    }, t.insertBefore = function(S) {
      var L = [], W = this;
      return typeof S == "string" && (S = this.constructor.call(this.constructor, S, null, this._originalRoot)), S = this._makeDomArray(S), W.remove(), o(S, function(M, O) {
        var F = W._makeDomArray(W.clone()), Z = O.parent || O.root;
        if (Z) {
          var Q = Z.children, U = Q.indexOf(O);
          U < 0 || (v(Q, U, 0, F, Z), L.push(F));
        }
      }), this.constructor.call(this.constructor, this._makeDomArray(L));
    }, t.remove = function(S) {
      var L = this;
      return S && (L = L.filter(S)), o(L, function(W, M) {
        var O = M.parent || M.root;
        if (O) {
          var F = O.children, Z = F.indexOf(M);
          Z < 0 || (F.splice(Z, 1), M.prev && (M.prev.next = M.next), M.next && (M.next.prev = M.prev), M.prev = M.next = M.parent = M.root = null);
        }
      }), this;
    }, t.replaceWith = function(S) {
      var L = this;
      return o(this, function(W, M) {
        var O = M.parent || M.root;
        if (O) {
          var F = O.children, Z = L._makeDomArray(typeof S == "function" ? S.call(M, W, M) : S), Q;
          r(Z, null), Q = F.indexOf(M), v(F, Q, 1, Z, O), M.parent = M.prev = M.next = M.root = null;
        }
      }), this;
    }, t.empty = function() {
      return o(this, function(S, L) {
        p.forEach(L.children, function(W) {
          W.next = W.prev = W.parent = null;
        }), L.children.length = 0;
      }), this;
    }, t.html = function(S) {
      if (S === void 0)
        return !this[0] || !this[0].children ? null : n.html(this[0].children, this.options);
      var L = this.options;
      return o(this, function(W, M) {
        p.forEach(M.children, function(F) {
          F.next = F.prev = F.parent = null;
        });
        var O = S.cheerio ? S.clone().get() : a("" + S, L);
        r(O, M);
      }), this;
    }, t.toString = function() {
      return n.html(this, this.options);
    }, t.text = function(S) {
      return S === void 0 ? n.text(this) : typeof S == "function" ? o(this, function(L, W) {
        var M = [W];
        return t.text.call(M, S.call(W, L, n.text(M)));
      }) : (o(this, function(L, W) {
        p.forEach(W.children, function(O) {
          O.next = O.prev = O.parent = null;
        });
        var M = {
          data: "" + S,
          type: "text",
          parent: W,
          prev: null,
          next: null,
          children: []
        };
        r(M, W);
      }), this);
    }, t.clone = function() {
      return this._make(h(this.get(), this.options));
    };
  }(Tu)), Tu;
}
var O0 = {}, cst = 1 / 0, fst = 9007199254740991, lst = "[object Arguments]", hst = "[object Function]", dst = "[object GeneratorFunction]", pst = "[object Symbol]", gst = typeof qt == "object" && qt && qt.Object === Object && qt, Est = typeof self == "object" && self && self.Object === Object && self, mst = gst || Est || Function("return this")();
function bst(t, e, n) {
  switch (n.length) {
    case 0:
      return t.call(e);
    case 1:
      return t.call(e, n[0]);
    case 2:
      return t.call(e, n[0], n[1]);
    case 3:
      return t.call(e, n[0], n[1], n[2]);
  }
  return t.apply(e, n);
}
function _st(t, e) {
  for (var n = -1, r = t ? t.length : 0, a = Array(r); ++n < r; )
    a[n] = e(t[n], n, t);
  return a;
}
function Tst(t, e) {
  for (var n = -1, r = e.length, a = t.length; ++n < r; )
    t[a + n] = e[n];
  return t;
}
var ic = Object.prototype, Ast = ic.hasOwnProperty, ac = ic.toString, qf = mst.Symbol, yst = ic.propertyIsEnumerable, $f = qf ? qf.isConcatSpreadable : void 0, Gf = Math.max;
function w0(t, e, n, r, a) {
  var u = -1, o = t.length;
  for (n || (n = Nst), a || (a = []); ++u < o; ) {
    var h = t[u];
    e > 0 && n(h) ? e > 1 ? w0(h, e - 1, n, r, a) : Tst(a, h) : r || (a[a.length] = h);
  }
  return a;
}
function Cst(t, e) {
  return t = Object(t), Ist(t, e, function(n, r) {
    return r in t;
  });
}
function Ist(t, e, n) {
  for (var r = -1, a = e.length, u = {}; ++r < a; ) {
    var o = e[r], h = t[o];
    n(h, o) && (u[o] = h);
  }
  return u;
}
function Sst(t, e) {
  return e = Gf(e === void 0 ? t.length - 1 : e, 0), function() {
    for (var n = arguments, r = -1, a = Gf(n.length - e, 0), u = Array(a); ++r < a; )
      u[r] = n[e + r];
    r = -1;
    for (var o = Array(e + 1); ++r < e; )
      o[r] = n[r];
    return o[e] = u, bst(t, this, o);
  };
}
function Nst(t) {
  return Rst(t) || xst(t) || !!($f && t && t[$f]);
}
function vst(t) {
  if (typeof t == "string" || Bst(t))
    return t;
  var e = t + "";
  return e == "0" && 1 / t == -cst ? "-0" : e;
}
function xst(t) {
  return Ost(t) && Ast.call(t, "callee") && (!yst.call(t, "callee") || ac.call(t) == lst);
}
var Rst = Array.isArray;
function Lst(t) {
  return t != null && Dst(t.length) && !wst(t);
}
function Ost(t) {
  return D0(t) && Lst(t);
}
function wst(t) {
  var e = Pst(t) ? ac.call(t) : "";
  return e == hst || e == dst;
}
function Dst(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= fst;
}
function Pst(t) {
  var e = typeof t;
  return !!t && (e == "object" || e == "function");
}
function D0(t) {
  return !!t && typeof t == "object";
}
function Bst(t) {
  return typeof t == "symbol" || D0(t) && ac.call(t) == pst;
}
var Mst = Sst(function(t, e) {
  return t == null ? {} : Cst(t, _st(w0(e, 1), vst));
}), Fst = Mst, kst = wr.domEach, Ust = {
  pick: Fst
}, Hst = Object.prototype.toString;
O0.css = function(t, e) {
  return arguments.length === 2 || // When `prop` is a "plain" object
  Hst.call(t) === "[object Object]" ? kst(this, function(n, r) {
    P0(r, t, e, n);
  }) : B0(this[0], t);
};
function P0(t, e, n, r) {
  if (typeof e == "string") {
    var a = B0(t);
    typeof n == "function" && (n = n.call(t, r, a[e])), n === "" ? delete a[e] : n != null && (a[e] = n), t.attribs.style = qst(a);
  } else
    typeof e == "object" && Object.keys(e).forEach(function(u) {
      P0(t, u, e[u]);
    });
}
function B0(t, e) {
  var n = $st(t.attribs.style);
  return typeof e == "string" ? n[e] : Array.isArray(e) ? Ust.pick(n, e) : n;
}
function qst(t) {
  return Object.keys(t || {}).reduce(function(e, n) {
    return e += (e ? " " : "") + n + ": " + t[n] + ";";
  }, "");
}
function $st(t) {
  return t = (t || "").trim(), t ? t.split(";").reduce(function(e, n) {
    var r = n.indexOf(":");
    return r < 1 || r === n.length - 1 || (e[n.slice(0, r).trim()] = n.slice(r + 1).trim()), e;
  }, {}) : {};
}
var uc = {}, ma = { exports: {} };
ma.exports;
(function(t, e) {
  var n = 200, r = "Expected a function", a = "__lodash_hash_undefined__", u = 1, o = 2, h = 1 / 0, m = 9007199254740991, E = "[object Arguments]", p = "[object Array]", N = "[object Boolean]", v = "[object Date]", S = "[object Error]", L = "[object Function]", W = "[object GeneratorFunction]", M = "[object Map]", O = "[object Number]", F = "[object Object]", Z = "[object Promise]", Q = "[object RegExp]", U = "[object Set]", P = "[object String]", Y = "[object Symbol]", H = "[object WeakMap]", z = "[object ArrayBuffer]", nt = "[object DataView]", at = "[object Float32Array]", gt = "[object Float64Array]", dt = "[object Int8Array]", St = "[object Int16Array]", Ut = "[object Int32Array]", Xt = "[object Uint8Array]", Ct = "[object Uint8ClampedArray]", Qt = "[object Uint16Array]", En = "[object Uint32Array]", on = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, zt = /^\w*$/, tn = /^\./, Nt = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Wt = /[\\^$.*+?()[\]{}|]/g, Zt = /\\(\\)?/g, oe = /^\[object .+?Constructor\]$/, We = /^(?:0|[1-9]\d*)$/, $ = {};
  $[at] = $[gt] = $[dt] = $[St] = $[Ut] = $[Xt] = $[Ct] = $[Qt] = $[En] = !0, $[E] = $[p] = $[z] = $[N] = $[nt] = $[v] = $[S] = $[L] = $[M] = $[O] = $[F] = $[Q] = $[U] = $[P] = $[H] = !1;
  var Ie = typeof qt == "object" && qt && qt.Object === Object && qt, Se = typeof self == "object" && self && self.Object === Object && self, pt = Ie || Se || Function("return this")(), pe = e && !e.nodeType && e, Le = pe && !0 && t && !t.nodeType && t, Qe = Le && Le.exports === pe, se = Qe && Ie.process, be = function() {
    try {
      return se && se.binding("util");
    } catch {
    }
  }(), Ne = be && be.isTypedArray;
  function In(s, i) {
    for (var c = -1, g = s ? s.length : 0, y = Array(g); ++c < g; )
      y[c] = i(s[c], c, s);
    return y;
  }
  function qn(s, i) {
    for (var c = -1, g = s ? s.length : 0; ++c < g; )
      if (i(s[c], c, s))
        return !0;
    return !1;
  }
  function Ke(s) {
    return function(i) {
      return i == null ? void 0 : i[s];
    };
  }
  function mn(s, i) {
    for (var c = -1, g = Array(s); ++c < s; )
      g[c] = i(c);
    return g;
  }
  function cn(s) {
    return function(i) {
      return s(i);
    };
  }
  function ge(s, i) {
    return s == null ? void 0 : s[i];
  }
  function _e(s) {
    var i = !1;
    if (s != null && typeof s.toString != "function")
      try {
        i = !!(s + "");
      } catch {
      }
    return i;
  }
  function fe(s) {
    var i = -1, c = Array(s.size);
    return s.forEach(function(g, y) {
      c[++i] = [y, g];
    }), c;
  }
  function bn(s, i) {
    return function(c) {
      return s(i(c));
    };
  }
  function $n(s) {
    var i = -1, c = Array(s.size);
    return s.forEach(function(g) {
      c[++i] = g;
    }), c;
  }
  var Te = Array.prototype, en = Function.prototype, b = Object.prototype, l = pt["__core-js_shared__"], d = function() {
    var s = /[^.]+$/.exec(l && l.keys && l.keys.IE_PROTO || "");
    return s ? "Symbol(src)_1." + s : "";
  }(), A = en.toString, R = b.hasOwnProperty, B = b.toString, V = RegExp(
    "^" + A.call(R).replace(Wt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Et = pt.Symbol, Pt = pt.Uint8Array, Bt = b.propertyIsEnumerable, Vt = Te.splice, xt = bn(Object.keys, Object), le = Dt(pt, "DataView"), ie = Dt(pt, "Map"), te = Dt(pt, "Promise"), Oe = Dt(pt, "Set"), Ae = Dt(pt, "WeakMap"), he = Dt(Object, "create"), _n = Lt(le), ir = Lt(ie), ke = Lt(te), ar = Lt(Oe), Sn = Lt(Ae), ve = Et ? Et.prototype : void 0, we = ve ? ve.valueOf : void 0, xe = ve ? ve.toString : void 0;
  function $t(s) {
    var i = -1, c = s ? s.length : 0;
    for (this.clear(); ++i < c; ) {
      var g = s[i];
      this.set(g[0], g[1]);
    }
  }
  function nn() {
    this.__data__ = he ? he(null) : {};
  }
  function ur(s) {
    return this.has(s) && delete this.__data__[s];
  }
  function or(s) {
    var i = this.__data__;
    if (he) {
      var c = i[s];
      return c === a ? void 0 : c;
    }
    return R.call(i, s) ? i[s] : void 0;
  }
  function cr(s) {
    var i = this.__data__;
    return he ? i[s] !== void 0 : R.call(i, s);
  }
  function Ue(s, i) {
    var c = this.__data__;
    return c[s] = he && i === void 0 ? a : i, this;
  }
  $t.prototype.clear = nn, $t.prototype.delete = ur, $t.prototype.get = or, $t.prototype.has = cr, $t.prototype.set = Ue;
  function wt(s) {
    var i = -1, c = s ? s.length : 0;
    for (this.clear(); ++i < c; ) {
      var g = s[i];
      this.set(g[0], g[1]);
    }
  }
  function He() {
    this.__data__ = [];
  }
  function fr(s) {
    var i = this.__data__, c = Fe(i, s);
    if (c < 0)
      return !1;
    var g = i.length - 1;
    return c == g ? i.pop() : Vt.call(i, c, 1), !0;
  }
  function lr(s) {
    var i = this.__data__, c = Fe(i, s);
    return c < 0 ? void 0 : i[c][1];
  }
  function hr(s) {
    return Fe(this.__data__, s) > -1;
  }
  function qe(s, i) {
    var c = this.__data__, g = Fe(c, s);
    return g < 0 ? c.push([s, i]) : c[g][1] = i, this;
  }
  wt.prototype.clear = He, wt.prototype.delete = fr, wt.prototype.get = lr, wt.prototype.has = hr, wt.prototype.set = qe;
  function Gt(s) {
    var i = -1, c = s ? s.length : 0;
    for (this.clear(); ++i < c; ) {
      var g = s[i];
      this.set(g[0], g[1]);
    }
  }
  function De() {
    this.__data__ = {
      hash: new $t(),
      map: new (ie || wt)(),
      string: new $t()
    };
  }
  function dr(s) {
    return de(this, s).delete(s);
  }
  function Nn(s) {
    return de(this, s).get(s);
  }
  function Gn(s) {
    return de(this, s).has(s);
  }
  function vn(s, i) {
    return de(this, s).set(s, i), this;
  }
  Gt.prototype.clear = De, Gt.prototype.delete = dr, Gt.prototype.get = Nn, Gt.prototype.has = Gn, Gt.prototype.set = vn;
  function ye(s) {
    var i = -1, c = s ? s.length : 0;
    for (this.__data__ = new Gt(); ++i < c; )
      this.add(s[i]);
  }
  function Tn(s) {
    return this.__data__.set(s, a), this;
  }
  function $e(s) {
    return this.__data__.has(s);
  }
  ye.prototype.add = ye.prototype.push = Tn, ye.prototype.has = $e;
  function Yt(s) {
    this.__data__ = new wt(s);
  }
  function Ge() {
    this.__data__ = new wt();
  }
  function Wn(s) {
    return this.__data__.delete(s);
  }
  function pr(s) {
    return this.__data__.get(s);
  }
  function gr(s) {
    return this.__data__.has(s);
  }
  function Er(s, i) {
    var c = this.__data__;
    if (c instanceof wt) {
      var g = c.__data__;
      if (!ie || g.length < n - 1)
        return g.push([s, i]), this;
      c = this.__data__ = new Gt(g);
    }
    return c.set(s, i), this;
  }
  Yt.prototype.clear = Ge, Yt.prototype.delete = Wn, Yt.prototype.get = pr, Yt.prototype.has = gr, Yt.prototype.set = Er;
  function xn(s, i) {
    var c = ot(s) || it(s) ? mn(s.length, String) : [], g = c.length, y = !!g;
    for (var T in s)
      (i || R.call(s, T)) && !(y && (T == "length" || Pe(T, g))) && c.push(T);
    return c;
  }
  function Fe(s, i) {
    for (var c = s.length; c--; )
      if (q(s[c][0], i))
        return c;
    return -1;
  }
  var Rn = Sr(Qn), mr = Jn();
  function Qn(s, i) {
    return s && mr(s, i, Be);
  }
  function Kn(s, i) {
    i = Jt(i, s) ? [i] : yn(i);
    for (var c = 0, g = i.length; s != null && c < g; )
      s = s[ae(i[c++])];
    return c && c == g ? s : void 0;
  }
  function Ln(s) {
    return B.call(s);
  }
  function fn(s, i) {
    return s != null && i in Object(s);
  }
  function An(s, i, c, g, y) {
    return s === i ? !0 : s == null || i == null || !kt(s) && !Mt(i) ? s !== s && i !== i : rn(s, i, An, c, g, y);
  }
  function rn(s, i, c, g, y, T) {
    var w = ot(s), G = ot(i), X = p, tt = p;
    w || (X = Rt(s), X = X == E ? F : X), G || (tt = Rt(i), tt = tt == E ? F : tt);
    var st = X == F && !_e(s), ut = tt == F && !_e(i), rt = X == tt;
    if (rt && !st)
      return T || (T = new Yt()), w || Cn(s) ? Xe(s, i, c, g, y, T) : Yn(s, i, X, c, g, y, T);
    if (!(y & o)) {
      var ft = st && R.call(s, "__wrapped__"), ht = ut && R.call(i, "__wrapped__");
      if (ft || ht) {
        var At = ft ? s.value() : s, yt = ht ? i.value() : i;
        return T || (T = new Yt()), c(At, yt, g, y, T);
      }
    }
    return rt ? (T || (T = new Yt()), ln(s, i, c, g, y, T)) : !1;
  }
  function br(s, i, c, g) {
    var y = c.length, T = y, w = !g;
    if (s == null)
      return !T;
    for (s = Object(s); y--; ) {
      var G = c[y];
      if (w && G[2] ? G[1] !== s[G[0]] : !(G[0] in s))
        return !1;
    }
    for (; ++y < T; ) {
      G = c[y];
      var X = G[0], tt = s[X], st = G[1];
      if (w && G[2]) {
        if (tt === void 0 && !(X in s))
          return !1;
      } else {
        var ut = new Yt();
        if (g)
          var rt = g(tt, st, X, s, i, ut);
        if (!(rt === void 0 ? An(st, tt, g, u | o, ut) : rt))
          return !1;
      }
    }
    return !0;
  }
  function Xn(s) {
    if (!kt(s) || Zn(s))
      return !1;
    var i = Tt(s) || _e(s) ? V : oe;
    return i.test(Lt(s));
  }
  function _r(s) {
    return Mt(s) && vt(s.length) && !!$[B.call(s)];
  }
  function Tr(s) {
    return typeof s == "function" ? s : s == null ? er : typeof s == "object" ? ot(s) ? Cr(s[0], s[1]) : yr(s) : $r(s);
  }
  function Ar(s) {
    if (!vr(s))
      return xt(s);
    var i = [];
    for (var c in Object(s))
      R.call(s, c) && c != "constructor" && i.push(c);
    return i;
  }
  function zn(s, i) {
    var c = -1, g = bt(s) ? Array(s.length) : [];
    return Rn(s, function(y, T, w) {
      g[++c] = i(y, T, w);
    }), g;
  }
  function yr(s) {
    var i = hn(s);
    return i.length == 1 && i[0][2] ? dn(i[0][0], i[0][1]) : function(c) {
      return c === s || br(c, s, i);
    };
  }
  function Cr(s, i) {
    return Jt(s) && sn(i) ? dn(ae(s), i) : function(c) {
      var g = tr(c, s);
      return g === void 0 && g === i ? qr(c, s) : An(i, g, void 0, u | o);
    };
  }
  function Ir(s) {
    return function(i) {
      return Kn(i, s);
    };
  }
  function On(s) {
    if (typeof s == "string")
      return s;
    if (ce(s))
      return xe ? xe.call(s) : "";
    var i = s + "";
    return i == "0" && 1 / s == -h ? "-0" : i;
  }
  function yn(s) {
    return ot(s) ? s : xr(s);
  }
  function Sr(s, i) {
    return function(c, g) {
      if (c == null)
        return c;
      if (!bt(c))
        return s(c, g);
      for (var y = c.length, T = i ? y : -1, w = Object(c); (i ? T-- : ++T < y) && g(w[T], T, w) !== !1; )
        ;
      return c;
    };
  }
  function Jn(s) {
    return function(i, c, g) {
      for (var y = -1, T = Object(i), w = g(i), G = w.length; G--; ) {
        var X = w[s ? G : ++y];
        if (c(T[X], X, T) === !1)
          break;
      }
      return i;
    };
  }
  function Xe(s, i, c, g, y, T) {
    var w = y & o, G = s.length, X = i.length;
    if (G != X && !(w && X > G))
      return !1;
    var tt = T.get(s);
    if (tt && T.get(i))
      return tt == i;
    var st = -1, ut = !0, rt = y & u ? new ye() : void 0;
    for (T.set(s, i), T.set(i, s); ++st < G; ) {
      var ft = s[st], ht = i[st];
      if (g)
        var At = w ? g(ht, ft, st, i, s, T) : g(ft, ht, st, s, i, T);
      if (At !== void 0) {
        if (At)
          continue;
        ut = !1;
        break;
      }
      if (rt) {
        if (!qn(i, function(yt, Ot) {
          if (!rt.has(Ot) && (ft === yt || c(ft, yt, g, y, T)))
            return rt.add(Ot);
        })) {
          ut = !1;
          break;
        }
      } else if (!(ft === ht || c(ft, ht, g, y, T))) {
        ut = !1;
        break;
      }
    }
    return T.delete(s), T.delete(i), ut;
  }
  function Yn(s, i, c, g, y, T, w) {
    switch (c) {
      case nt:
        if (s.byteLength != i.byteLength || s.byteOffset != i.byteOffset)
          return !1;
        s = s.buffer, i = i.buffer;
      case z:
        return !(s.byteLength != i.byteLength || !g(new Pt(s), new Pt(i)));
      case N:
      case v:
      case O:
        return q(+s, +i);
      case S:
        return s.name == i.name && s.message == i.message;
      case Q:
      case P:
        return s == i + "";
      case M:
        var G = fe;
      case U:
        var X = T & o;
        if (G || (G = $n), s.size != i.size && !X)
          return !1;
        var tt = w.get(s);
        if (tt)
          return tt == i;
        T |= u, w.set(s, i);
        var st = Xe(G(s), G(i), g, y, T, w);
        return w.delete(s), st;
      case Y:
        if (we)
          return we.call(s) == we.call(i);
    }
    return !1;
  }
  function ln(s, i, c, g, y, T) {
    var w = y & o, G = Be(s), X = G.length, tt = Be(i), st = tt.length;
    if (X != st && !w)
      return !1;
    for (var ut = X; ut--; ) {
      var rt = G[ut];
      if (!(w ? rt in i : R.call(i, rt)))
        return !1;
    }
    var ft = T.get(s);
    if (ft && T.get(i))
      return ft == i;
    var ht = !0;
    T.set(s, i), T.set(i, s);
    for (var At = w; ++ut < X; ) {
      rt = G[ut];
      var yt = s[rt], Ot = i[rt];
      if (g)
        var Ye = w ? g(Ot, yt, rt, i, s, T) : g(yt, Ot, rt, s, i, T);
      if (!(Ye === void 0 ? yt === Ot || c(yt, Ot, g, y, T) : Ye)) {
        ht = !1;
        break;
      }
      At || (At = rt == "constructor");
    }
    if (ht && !At) {
      var Re = s.constructor, Ee = i.constructor;
      Re != Ee && "constructor" in s && "constructor" in i && !(typeof Re == "function" && Re instanceof Re && typeof Ee == "function" && Ee instanceof Ee) && (ht = !1);
    }
    return T.delete(s), T.delete(i), ht;
  }
  function de(s, i) {
    var c = s.__data__;
    return Nr(i) ? c[typeof i == "string" ? "string" : "hash"] : c.map;
  }
  function hn(s) {
    for (var i = Be(s), c = i.length; c--; ) {
      var g = i[c], y = s[g];
      i[c] = [g, y, sn(y)];
    }
    return i;
  }
  function Dt(s, i) {
    var c = ge(s, i);
    return Xn(c) ? c : void 0;
  }
  var Rt = Ln;
  (le && Rt(new le(new ArrayBuffer(1))) != nt || ie && Rt(new ie()) != M || te && Rt(te.resolve()) != Z || Oe && Rt(new Oe()) != U || Ae && Rt(new Ae()) != H) && (Rt = function(s) {
    var i = B.call(s), c = i == F ? s.constructor : void 0, g = c ? Lt(c) : void 0;
    if (g)
      switch (g) {
        case _n:
          return nt;
        case ir:
          return M;
        case ke:
          return Z;
        case ar:
          return U;
        case Sn:
          return H;
      }
    return i;
  });
  function wn(s, i, c) {
    i = Jt(i, s) ? [i] : yn(i);
    for (var g, y = -1, w = i.length; ++y < w; ) {
      var T = ae(i[y]);
      if (!(g = s != null && c(s, T)))
        break;
      s = s[T];
    }
    if (g)
      return g;
    var w = s ? s.length : 0;
    return !!w && vt(w) && Pe(T, w) && (ot(s) || it(s));
  }
  function Pe(s, i) {
    return i = i ?? m, !!i && (typeof s == "number" || We.test(s)) && s > -1 && s % 1 == 0 && s < i;
  }
  function Jt(s, i) {
    if (ot(s))
      return !1;
    var c = typeof s;
    return c == "number" || c == "symbol" || c == "boolean" || s == null || ce(s) ? !0 : zt.test(s) || !on.test(s) || i != null && s in Object(i);
  }
  function Nr(s) {
    var i = typeof s;
    return i == "string" || i == "number" || i == "symbol" || i == "boolean" ? s !== "__proto__" : s === null;
  }
  function Zn(s) {
    return !!d && d in s;
  }
  function vr(s) {
    var i = s && s.constructor, c = typeof i == "function" && i.prototype || b;
    return s === c;
  }
  function sn(s) {
    return s === s && !kt(s);
  }
  function dn(s, i) {
    return function(c) {
      return c == null ? !1 : c[s] === i && (i !== void 0 || s in Object(c));
    };
  }
  var xr = D(function(s) {
    s = Vn(s);
    var i = [];
    return tn.test(s) && i.push(""), s.replace(Nt, function(c, g, y, T) {
      i.push(y ? T.replace(Zt, "$1") : g || c);
    }), i;
  });
  function ae(s) {
    if (typeof s == "string" || ce(s))
      return s;
    var i = s + "";
    return i == "0" && 1 / s == -h ? "-0" : i;
  }
  function Lt(s) {
    if (s != null) {
      try {
        return A.call(s);
      } catch {
      }
      try {
        return s + "";
      } catch {
      }
    }
    return "";
  }
  function I(s, i) {
    var c = ot(s) ? In : zn;
    return c(s, Tr(i));
  }
  function D(s, i) {
    if (typeof s != "function" || i && typeof i != "function")
      throw new TypeError(r);
    var c = function() {
      var g = arguments, y = i ? i.apply(this, g) : g[0], T = c.cache;
      if (T.has(y))
        return T.get(y);
      var w = s.apply(this, g);
      return c.cache = T.set(y, w), w;
    };
    return c.cache = new (D.Cache || Gt)(), c;
  }
  D.Cache = Gt;
  function q(s, i) {
    return s === i || s !== s && i !== i;
  }
  function it(s) {
    return Ht(s) && R.call(s, "callee") && (!Bt.call(s, "callee") || B.call(s) == E);
  }
  var ot = Array.isArray;
  function bt(s) {
    return s != null && vt(s.length) && !Tt(s);
  }
  function Ht(s) {
    return Mt(s) && bt(s);
  }
  function Tt(s) {
    var i = kt(s) ? B.call(s) : "";
    return i == L || i == W;
  }
  function vt(s) {
    return typeof s == "number" && s > -1 && s % 1 == 0 && s <= m;
  }
  function kt(s) {
    var i = typeof s;
    return !!s && (i == "object" || i == "function");
  }
  function Mt(s) {
    return !!s && typeof s == "object";
  }
  function ce(s) {
    return typeof s == "symbol" || Mt(s) && B.call(s) == Y;
  }
  var Cn = Ne ? cn(Ne) : _r;
  function Vn(s) {
    return s == null ? "" : On(s);
  }
  function tr(s, i, c) {
    var g = s == null ? void 0 : Kn(s, i);
    return g === void 0 ? c : g;
  }
  function qr(s, i) {
    return s != null && wn(s, i, fn);
  }
  function Be(s) {
    return bt(s) ? xn(s) : Ar(s);
  }
  function er(s) {
    return s;
  }
  function $r(s) {
    return Jt(s) ? Ke(ae(s)) : Ir(s);
  }
  t.exports = I;
})(ma, ma.exports);
var Gst = ma.exports, Yf = "input,select,textarea,keygen", Yst = /%20/g, Vf = /\r?\n/g, M0 = {
  map: Gst
};
uc.serialize = function() {
  var t = this.serializeArray(), e = M0.map(t, function(n) {
    return encodeURIComponent(n.name) + "=" + encodeURIComponent(n.value);
  });
  return e.join("&").replace(Yst, "+");
};
uc.serializeArray = function() {
  var t = this.constructor;
  return this.map(function() {
    var e = this, n = t(e);
    return e.name === "form" ? n.find(Yf).toArray() : n.filter(Yf).toArray();
  }).filter(
    // Verify elements have a name (`attr.name`) and are not disabled (`:disabled`)
    '[name!=""]:not(:disabled):not(:submit, :button, :image, :reset, :file):matches([checked], :not(:checkbox, :radio))'
    // Convert each of the elements to its value(s)
  ).map(function(e, n) {
    var r = t(n), a = r.attr("name"), u = r.val();
    return u == null ? null : Array.isArray(u) ? M0.map(u, function(o) {
      return { name: a, value: o.replace(Vf, `\r
`) };
    }) : { name: a, value: u.replace(Vf, `\r
`) };
  }).get();
};
var jf;
function Gu() {
  if (jf)
    return su.exports;
  jf = 1;
  var t = Fa, e = wr.isHtml, n = {
    extend: Yd,
    bind: jo,
    forEach: $a,
    defaults: a0
  }, r = [
    Frt(),
    x0,
    ost(),
    O0,
    uc
  ], a = su.exports = function(o, h, m, E) {
    return this instanceof a ? (this.options = n.defaults(E || {}, this.options), o ? (m && (typeof m == "string" && (m = t(m, this.options)), this._root = a.call(this, m)), o.cheerio ? o : (u(o) && (o = [o]), Array.isArray(o) ? (n.forEach(o, n.bind(function(p, N) {
      this[N] = p;
    }, this)), this.length = o.length, this) : typeof o == "string" && e(o) ? a.call(this, t(o, this.options).children) : (h ? typeof h == "string" ? e(h) ? (h = t(h, this.options), h = a.call(this, h)) : (o = [h, o].join(" "), h = this._root) : h.cheerio || (h = a.call(this, h)) : h = this._root, h ? h.find(o) : this))) : this) : new a(o, h, m, E);
  };
  n.extend(a, rc()), a.prototype.cheerio = "[cheerio object]", a.prototype.options = {
    withDomLvl1: !0,
    normalizeWhitespace: !1,
    xmlMode: !1,
    decodeEntities: !0
  }, a.prototype.length = 0, a.prototype.splice = Array.prototype.splice, a.prototype._make = function(o, h) {
    var m = new this.constructor(o, h, this._root, this.options);
    return m.prevObject = this, m;
  }, a.prototype.toArray = function() {
    return this.get();
  }, r.forEach(function(o) {
    n.extend(a.prototype, o);
  });
  var u = function(o) {
    return o.name || o.type === "text" || o.type === "comment";
  };
  return su.exports;
}
const Vst = "cheerio", jst = "0.22.0", Wst = "Tiny, fast, and elegant implementation of core jQuery designed specifically for the server", Qst = "Matt Mueller <mattmuelle@gmail.com> (mat.io)", Kst = "MIT", Xst = [
  "htmlparser",
  "jquery",
  "selector",
  "scraper",
  "parser",
  "html"
], zst = {
  type: "git",
  url: "git://github.com/cheeriojs/cheerio.git"
}, Jst = "./index.js", Zst = [
  "index.js",
  "lib"
], tit = {
  node: ">= 0.6"
}, eit = {
  "css-select": "~1.2.0",
  "dom-serializer": "~0.1.0",
  entities: "~1.1.1",
  htmlparser2: "^3.9.1",
  "lodash.assignin": "^4.0.9",
  "lodash.bind": "^4.1.4",
  "lodash.defaults": "^4.0.1",
  "lodash.filter": "^4.4.0",
  "lodash.flatten": "^4.2.0",
  "lodash.foreach": "^4.3.0",
  "lodash.map": "^4.4.0",
  "lodash.merge": "^4.4.0",
  "lodash.pick": "^4.2.1",
  "lodash.reduce": "^4.4.0",
  "lodash.reject": "^4.4.0",
  "lodash.some": "^4.4.0"
}, nit = {
  benchmark: "^2.1.0",
  coveralls: "^2.11.9",
  "expect.js": "~0.3.1",
  istanbul: "^0.4.3",
  jsdom: "^9.2.1",
  jquery: "^3.0.0",
  jshint: "^2.9.2",
  mocha: "^2.5.3",
  xyz: "~0.5.0"
}, rit = {
  test: "make test"
}, sit = {
  name: Vst,
  version: jst,
  description: Wst,
  author: Qst,
  license: Kst,
  keywords: Xst,
  repository: zst,
  main: Jst,
  files: Zst,
  engines: tit,
  dependencies: eit,
  devDependencies: nit,
  scripts: rit
};
(function(t, e) {
  e = t.exports = Gu(), e.version = sit.version;
})(Mu, Mu.exports);
var iit = Mu.exports, Au = {}, F0 = { exports: {} };
function ait(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var k0 = { exports: {} }, Me = k0.exports = {}, Pr, Br;
function Yu() {
  throw new Error("setTimeout has not been defined");
}
function Vu() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? Pr = setTimeout : Pr = Yu;
  } catch {
    Pr = Yu;
  }
  try {
    typeof clearTimeout == "function" ? Br = clearTimeout : Br = Vu;
  } catch {
    Br = Vu;
  }
})();
function U0(t) {
  if (Pr === setTimeout)
    return setTimeout(t, 0);
  if ((Pr === Yu || !Pr) && setTimeout)
    return Pr = setTimeout, setTimeout(t, 0);
  try {
    return Pr(t, 0);
  } catch {
    try {
      return Pr.call(null, t, 0);
    } catch {
      return Pr.call(this, t, 0);
    }
  }
}
function uit(t) {
  if (Br === clearTimeout)
    return clearTimeout(t);
  if ((Br === Vu || !Br) && clearTimeout)
    return Br = clearTimeout, clearTimeout(t);
  try {
    return Br(t);
  } catch {
    try {
      return Br.call(null, t);
    } catch {
      return Br.call(this, t);
    }
  }
}
var Qr = [], Fs = !1, Es, Zi = -1;
function oit() {
  !Fs || !Es || (Fs = !1, Es.length ? Qr = Es.concat(Qr) : Zi = -1, Qr.length && H0());
}
function H0() {
  if (!Fs) {
    var t = U0(oit);
    Fs = !0;
    for (var e = Qr.length; e; ) {
      for (Es = Qr, Qr = []; ++Zi < e; )
        Es && Es[Zi].run();
      Zi = -1, e = Qr.length;
    }
    Es = null, Fs = !1, uit(t);
  }
}
Me.nextTick = function(t) {
  var e = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var n = 1; n < arguments.length; n++)
      e[n - 1] = arguments[n];
  Qr.push(new q0(t, e)), Qr.length === 1 && !Fs && U0(H0);
};
function q0(t, e) {
  this.fun = t, this.array = e;
}
q0.prototype.run = function() {
  this.fun.apply(null, this.array);
};
Me.title = "browser";
Me.browser = !0;
Me.env = {};
Me.argv = [];
Me.version = "";
Me.versions = {};
function zr() {
}
Me.on = zr;
Me.addListener = zr;
Me.once = zr;
Me.off = zr;
Me.removeListener = zr;
Me.removeAllListeners = zr;
Me.emit = zr;
Me.prependListener = zr;
Me.prependOnceListener = zr;
Me.listeners = function(t) {
  return [];
};
Me.binding = function(t) {
  throw new Error("process.binding is not supported");
};
Me.cwd = function() {
  return "/";
};
Me.chdir = function(t) {
  throw new Error("process.chdir is not supported");
};
Me.umask = function() {
  return 0;
};
var cit = k0.exports;
const fit = /* @__PURE__ */ ait(cit);
var $0 = { exports: {} };
(function(t, e) {
  t.exports = n;
  function n(a) {
    return r.bind(null, a);
  }
  function r(a) {
    var u = [].slice.call(arguments, 1);
    u.unshift("[" + a + "]"), fit.stderr.write(u.join(" ") + `
`);
  }
})($0);
var oc = $0.exports;
(function(t, e) {
  oc("lex"), t.exports = n;
  function n(r) {
    var a = "", u, o = 0, h = -1, m = 0, E = 1, p = "before-selector", N = [p], v = {}, S = [], L = [
      "media",
      "keyframes",
      { name: "-webkit-keyframes", type: "keyframes", prefix: "-webkit-" },
      { name: "-moz-keyframes", type: "keyframes", prefix: "-moz-" },
      { name: "-ms-keyframes", type: "keyframes", prefix: "-ms-" },
      { name: "-o-keyframes", type: "keyframes", prefix: "-o-" },
      "font-face",
      { name: "import", state: "before-at-value" },
      { name: "charset", state: "before-at-value" },
      "supports",
      "viewport",
      { name: "namespace", state: "before-at-value" },
      "document",
      { name: "-moz-document", type: "document", prefix: "-moz-" },
      "page"
    ];
    function W() {
      return H(), r[h];
    }
    function M(Ct) {
      return Ct ? N[N.length - 1 - Ct] : p;
    }
    function O(Ct) {
      var Qt = h + 1;
      return Ct === r.slice(Qt, Qt + Ct.length);
    }
    function F(Ct) {
      var Qt = r.slice(h).indexOf(Ct);
      return Qt > 0 ? Qt : !1;
    }
    function Z(Ct) {
      return Ct === Q(1);
    }
    function Q(Ct) {
      return r[h + (Ct || 1)];
    }
    function U() {
      var Ct = N.pop();
      return p = N[N.length - 1], Ct;
    }
    function P(Ct) {
      return p = Ct, N.push(p), N.length;
    }
    function Y(Ct) {
      var Qt = p;
      return N[N.length - 1] = p = Ct, Qt;
    }
    function H(Ct) {
      if ((Ct || 1) == 1)
        r[h] == `
` ? (E++, o = 1) : o++, h++;
      else {
        var Qt = r.slice(h, h + Ct).split(`
`);
        Qt.length > 1 && (E += Qt.length - 1, o = 1), o += Qt[Qt.length - 1].length, h = h + Ct;
      }
    }
    function z() {
      v.end = {
        line: E,
        col: o
      }, S.push(v), a = "", v = {};
    }
    function nt(Ct) {
      v = {
        type: Ct,
        start: {
          line: E,
          col: o
        }
      };
    }
    for (; u = W(); )
      switch (u) {
        case " ":
          switch (M()) {
            case "selector":
            case "value":
            case "value-paren":
            case "at-group":
            case "at-value":
            case "comment":
            case "double-string":
            case "single-string":
              a += u;
              break;
          }
          break;
        case `
`:
        case "	":
        case "\r":
        case "\f":
          switch (M()) {
            case "value":
            case "value-paren":
            case "at-group":
            case "comment":
            case "single-string":
            case "double-string":
            case "selector":
              a += u;
              break;
            case "at-value":
              u === `
` && (v.value = a.trim(), z(), U());
              break;
          }
          break;
        case ":":
          switch (M()) {
            case "name":
              v.name = a.trim(), a = "", Y("before-value");
              break;
            case "before-selector":
              a += u, nt("selector"), P("selector");
              break;
            case "before-value":
              Y("value"), a += u;
              break;
            default:
              a += u;
              break;
          }
          break;
        case ";":
          switch (M()) {
            case "name":
            case "before-value":
            case "value":
              a.trim().length > 0 && (v.value = a.trim(), z()), Y("before-name");
              break;
            case "value-paren":
              a += u;
              break;
            case "at-value":
              v.value = a.trim(), z(), U();
              break;
            case "before-name":
              break;
            default:
              a += u;
              break;
          }
          break;
        case "{":
          switch (M()) {
            case "selector":
              if (Q(-1) === "\\") {
                a += u;
                break;
              }
              v.text = a.trim(), z(), Y("before-name"), m = m + 1;
              break;
            case "at-group":
              switch (v.name = a.trim(), v.type) {
                case "font-face":
                case "viewport":
                case "page":
                  P("before-name");
                  break;
                default:
                  P("before-selector");
              }
              z(), m = m + 1;
              break;
            case "name":
            case "at-rule":
              v.name = a.trim(), z(), P("before-name"), m = m + 1;
              break;
            case "comment":
            case "double-string":
            case "single-string":
              a += u;
              break;
            case "before-value":
              Y("value"), a += u;
              break;
          }
          break;
        case "}":
          switch (M()) {
            case "before-name":
            case "name":
            case "before-value":
            case "value":
              a && (v.value = a.trim()), v.name && v.value && z(), nt("end"), z(), U(), M() === "at-group" && (nt("at-group-end"), z(), U()), m > 0 && (m = m - 1);
              break;
            case "at-group":
            case "before-selector":
            case "selector":
              if (Q(-1) === "\\") {
                a += u;
                break;
              }
              m > 0 && M(1) === "at-group" && (nt("at-group-end"), z()), m > 1 && U(), m > 0 && (m = m - 1);
              break;
            case "double-string":
            case "single-string":
            case "comment":
              a += u;
              break;
          }
          break;
        case '"':
        case "'":
          switch (M()) {
            case "double-string":
              u === '"' && Q(-1) !== "\\" && U();
              break;
            case "single-string":
              u === "'" && Q(-1) !== "\\" && U();
              break;
            case "before-at-value":
              Y("at-value"), P(u === '"' ? "double-string" : "single-string");
              break;
            case "before-value":
              Y("value"), P(u === '"' ? "double-string" : "single-string");
              break;
            case "comment":
              break;
            default:
              Q(-1) !== "\\" && P(u === '"' ? "double-string" : "single-string");
          }
          a += u;
          break;
        case "/":
          switch (M()) {
            case "comment":
            case "double-string":
            case "single-string":
              a += u;
              break;
            case "before-value":
            case "selector":
            case "name":
            case "value":
              if (Z("*")) {
                var at = F("*/");
                at && H(at + 1);
              } else
                M() == "before-value" && Y("value"), a += u;
              break;
            default:
              Z("*") ? (nt("comment"), P("comment"), H()) : a += u;
              break;
          }
          break;
        case "*":
          switch (M()) {
            case "comment":
              Z("/") ? (v.text = a, H(), z(), U()) : a += u;
              break;
            case "before-selector":
              a += u, nt("selector"), P("selector");
              break;
            case "before-value":
              Y("value"), a += u;
              break;
            default:
              a += u;
          }
          break;
        case "@":
          switch (M()) {
            case "comment":
            case "double-string":
            case "single-string":
              a += u;
              break;
            case "before-value":
              Y("value"), a += u;
              break;
            default:
              for (var gt = !1, dt, St, Ut = 0, Xt = L.length; !gt && Ut < Xt; ++Ut)
                St = L[Ut], dt = St.name || St, O(dt) && (gt = !0, nt(dt), P(St.state || "at-group"), H(dt.length), St.prefix && (v.prefix = St.prefix), St.type && (v.type = St.type));
              gt || (a += u);
              break;
          }
          break;
        case "(":
          switch (M()) {
            case "value":
              P("value-paren");
              break;
            case "before-value":
              Y("value");
              break;
          }
          a += u;
          break;
        case ")":
          switch (M()) {
            case "value-paren":
              U();
              break;
            case "before-value":
              Y("value");
              break;
          }
          a += u;
          break;
        default:
          switch (M()) {
            case "before-selector":
              nt("selector"), P("selector");
              break;
            case "before-name":
              nt("property"), Y("name");
              break;
            case "before-value":
              Y("value");
              break;
            case "before-at-value":
              Y("at-value");
              break;
          }
          a += u;
          break;
      }
    return S;
  }
})(F0);
var G0 = F0.exports, Y0 = { exports: {} };
(function(t, e) {
  oc("parse");
  var n = G0;
  t.exports = h;
  var r, a, u, o;
  function h(U, P) {
    P || (P = {}), r = !!P.comments, u = !!P.position, a = 0, o = Array.isArray(U) ? U.slice() : n(U);
    for (var Y, H = [], z; z = E(); )
      Y = O(z), Y && H.push(Y);
    return {
      type: "stylesheet",
      stylesheet: {
        rules: H
      }
    };
  }
  function m(U, P) {
    P || (P = {});
    for (var Y, H = ["type", "name", "value"], z = {}, nt = 0; nt < H.length; ++nt)
      Y = H[nt], U[Y] && (z[Y] = P[Y] || U[Y]);
    for (H = Object.keys(P), nt = 0; nt < H.length; ++nt)
      Y = H[nt], z[Y] || (z[Y] = P[Y]);
    return u && (z.position = {
      start: U.start,
      end: U.end
    }), z;
  }
  function E() {
    var U = o.shift();
    return U;
  }
  function p(U) {
    a = a + 1;
    var P = {};
    switch (U.type) {
      case "font-face":
      case "viewport":
        P.declarations = Z();
        break;
      case "page":
        P.prefix = U.prefix, P.declarations = Z();
        break;
      default:
        P.prefix = U.prefix, P.rules = Q();
    }
    return m(U, P);
  }
  function N(U) {
    return m(U);
  }
  function v(U) {
    return m(U);
  }
  function S(U) {
    return m(U, { text: U.text });
  }
  function L(U) {
    return m(U);
  }
  function W(U) {
    return m(U);
  }
  function M(U) {
    function P(Y) {
      return Y.trim();
    }
    return m(U, {
      type: "rule",
      selectors: U.text.split(",").map(P),
      declarations: Z()
    });
  }
  function O(U) {
    switch (U.type) {
      case "property":
        return W(U);
      case "selector":
        return M(U);
      case "at-group-end":
        a = a - 1;
        return;
      case "media":
      case "keyframes":
        return p(U);
      case "comment":
        if (r)
          return S(U);
        break;
      case "charset":
        return v(U);
      case "import":
        return N(U);
      case "namespace":
        return L(U);
      case "font-face":
      case "supports":
      case "viewport":
      case "document":
      case "page":
        return p(U);
    }
  }
  function F(U) {
    for (var P, Y = [], H; (H = E()) && U && U(H); )
      P = O(H), P && Y.push(P);
    return H && H.type !== "end" && o.unshift(H), Y;
  }
  function Z() {
    return F(function(U) {
      return U.type === "property" || U.type === "comment";
    });
  }
  function Q() {
    return F(function() {
      return a;
    });
  }
})(Y0);
var lit = Y0.exports, V0 = { exports: {} };
(function(t, e) {
  oc("stringify");
  var n, r, a, u, o, h;
  t.exports = m;
  function m(Q, U) {
    U || (U = {}), a = U.indentation || "", r = !!U.compress, n = !!U.comments, u = 1, r ? o = h = "" : (o = `
`, h = " ");
    var P = L(Q.stylesheet.rules, F).join(`
`).trim();
    return P;
  }
  function E(Q) {
    if (Q) {
      u += Q;
      return;
    }
    return r ? "" : Array(u).join(a || "");
  }
  function p(Q) {
    return "@" + Q.type + " " + Q.value + ";" + o;
  }
  function N(Q) {
    var U = "", P = Q.prefix || "";
    Q.name && (U = " " + Q.name);
    var Y = Q.type !== "page";
    return "@" + P + Q.type + U + h + W(Q, Y) + o;
  }
  function v(Q) {
    return n ? "/*" + (Q.text || "") + "*/" + o : "";
  }
  function S(Q) {
    var U;
    return Q.selectors ? U = Q.selectors.join("," + o) : (U = "@" + Q.type, U += Q.name ? " " + Q.name : ""), E() + U + h + W(Q) + o;
  }
  function L(Q, U) {
    return Q.reduce(function(P, Y) {
      var H = Y.type === "comment" ? v(Y) : U(Y);
      return H && P.push(H), P;
    }, []);
  }
  function W(Q, U) {
    var P = Q.declarations, Y = O;
    return Q.rules && (P = Q.rules, Y = S), P = M(P, Y), P && (P = o + P + (U ? "" : o)), "{" + P + E() + "}";
  }
  function M(Q, U) {
    if (!Q)
      return "";
    E(1);
    var P = L(Q, U);
    return E(-1), P.length ? P.join(o) : "";
  }
  function O(Q) {
    if (Q.type === "property")
      return Z(Q);
  }
  function F(Q) {
    switch (Q.type) {
      case "rule":
        return S(Q);
      case "media":
      case "keyframes":
        return N(Q);
      case "comment":
        return v(Q);
      case "import":
      case "charset":
      case "namespace":
        return p(Q);
      case "font-face":
      case "supports":
      case "viewport":
      case "document":
      case "page":
        return N(Q);
    }
  }
  function Z(Q) {
    var U = Q.name ? Q.name + ":" + h : "";
    return E() + U + Q.value + ";";
  }
})(V0);
var hit = V0.exports, dit = {
  lex: G0,
  parse: lit,
  stringify: hit
}, j0 = { exports: {} }, pit = /([-.*+?^${}()|[\]\/\\])/g, git = /\\/g, ls = function(t) {
  return (t + "").replace(pit, "\\$1");
}, fs = function(t) {
  return (t + "").replace(git, "");
}, Eit = RegExp(
  /*
  #!/usr/bin/env ruby
  puts "\t\t" + DATA.read.gsub(/\(\?x\)|\s+#.*$|\s+|\\$|\\n/,'')
  __END__
      "(?x)^(?:\
        \\s* ( , ) \\s*               # Separator          \n\
      | \\s* ( <combinator>+ ) \\s*   # Combinator         \n\
      |      ( \\s+ )                 # CombinatorChildren \n\
      |      ( <unicode>+ | \\* )     # Tag                \n\
      | \\#  ( <unicode>+       )     # ID                 \n\
      | \\.  ( <unicode>+       )     # ClassName          \n\
      |                               # Attribute          \n\
      \\[  \
          \\s* (<unicode1>+)  (?:  \
              \\s* ([*^$!~|]?=)  (?:  \
                  \\s* (?:\
                      ([\"']?)(.*?)\\9 \
                  )\
              )  \
          )?  \\s*  \
      \\](?!\\]) \n\
      |   :+ ( <unicode>+ )(?:\
      \\( (?:\
          (?:([\"'])([^\\12]*)\\12)|((?:\\([^)]+\\)|[^()]*)+)\
      ) \\)\
      )?\
      )"
  */
  `^(?:\\s*(,)\\s*|\\s*(<combinator>+)\\s*|(\\s+)|(<unicode>+|\\*)|\\#(<unicode>+)|\\.(<unicode>+)|\\[\\s*(<unicode1>+)(?:\\s*([*^$!~|]?=)(?:\\s*(?:(["']?)(.*?)\\9)))?\\s*\\](?!\\])|(:+)(<unicode>+)(?:\\((?:(?:(["'])([^\\13]*)\\13)|((?:\\([^)]+\\)|[^()]*)+))\\))?)`.replace(/<combinator>/, "[" + ls(">+~`!@$%^&={}\\;</") + "]").replace(/<unicode>/g, "(?:[\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])").replace(/<unicode1>/g, "(?:[:\\w\\u00a1-\\uFFFF-]|\\\\[^\\s0-9a-f])")
), W0 = function(e) {
  this.combinator = e || " ", this.tag = "*";
};
W0.prototype.toString = function() {
  if (!this.raw) {
    var t = "", e, n;
    if (t += this.tag || "*", this.id && (t += "#" + this.id), this.classes && (t += "." + this.classList.join(".")), this.attributes)
      for (e = 0; n = this.attributes[e++]; )
        t += "[" + n.name + (n.operator ? n.operator + '"' + n.value + '"' : "") + "]";
    if (this.pseudos)
      for (e = 0; n = this.pseudos[e++]; )
        t += ":" + n.name, n.value && (t += "(" + n.value + ")");
    this.raw = t;
  }
  return this.raw;
};
var Q0 = function() {
  this.length = 0;
};
Q0.prototype.toString = function() {
  if (!this.raw) {
    for (var t = "", e = 0, n; n = this[e++]; )
      e !== 1 && (t += " "), n.combinator !== " " && (t += n.combinator + " "), t += n;
    this.raw = t;
  }
  return this.raw;
};
var mit = function(t, e, n, r, a, u, o, h, m, E, p, N, v, S, L, W) {
  var M, O;
  if ((e || !this.length) && (M = this[this.length++] = new Q0(), e))
    return "";
  if (M || (M = this[this.length - 1]), (n || r || !M.length) && (O = M[M.length++] = new W0(n)), O || (O = M[M.length - 1]), a)
    O.tag = fs(a);
  else if (u)
    O.id = fs(u);
  else if (o) {
    var F = fs(o), Z = O.classes || (O.classes = {});
    if (!Z[F]) {
      Z[F] = ls(o);
      var Q = O.classList || (O.classList = []);
      Q.push(F), Q.sort();
    }
  } else
    v ? (W = W || L, (O.pseudos || (O.pseudos = [])).push({
      type: N.length == 1 ? "class" : "element",
      name: fs(v),
      escapedName: ls(v),
      value: W ? fs(W) : null,
      escapedValue: W ? ls(W) : null
    })) : h && (p = p ? ls(p) : null, (O.attributes || (O.attributes = [])).push({
      operator: m,
      name: fs(h),
      escapedName: ls(h),
      value: p ? fs(p) : null,
      escapedValue: p ? ls(p) : null
    }));
  return "";
}, K0 = function(e) {
  this.length = 0;
  for (var n = this, r = e, a; e; ) {
    if (a = e.replace(Eit, function() {
      return mit.apply(n, arguments);
    }), a === e)
      throw new Error(r + " is an invalid expression");
    e = a;
  }
};
K0.prototype.toString = function() {
  if (!this.raw) {
    for (var t = [], e = 0, n; n = this[e++]; )
      t.push(n);
    this.raw = t.join(", ");
  }
  return this.raw;
};
var Wf = {}, bit = function(t) {
  return t == null ? null : (t = ("" + t).replace(/^\s+|\s+$/g, ""), Wf[t] || (Wf[t] = new K0(t)));
}, _it = bit;
(function(t, e) {
  var n = _it;
  t.exports = r;
  function r(u, o) {
    this.text = u, this.spec = void 0, this.styleAttribute = o || !1;
  }
  r.prototype.parsed = function() {
    return this.tokens || (this.tokens = a(this.text)), this.tokens;
  }, r.prototype.specificity = function() {
    var u = this.styleAttribute;
    return this.spec || (this.spec = o(this.text, this.parsed())), this.spec;
    function o(h, m) {
      for (var E = m || a(h), p = [u ? 1 : 0, 0, 0, 0], N = [], v = 0; v < E.length; v++) {
        var S = E[v], L = S.pseudos;
        if (S.id && p[1]++, S.attributes && (p[2] += S.attributes.length), S.classList && (p[2] += S.classList.length), S.tag && S.tag !== "*" && p[3]++, L) {
          p[3] += L.length;
          for (var W = 0; W < L.length; W++)
            L[W].name === "not" && (N.push(L[W].value), p[3]--);
        }
      }
      for (var M = N.length; M--; )
        for (var O = o(N[M]), F = 4; F--; )
          p[F] += O[F];
      return p;
    }
  };
  function a(u) {
    try {
      return n(u)[0];
    } catch {
      return [];
    }
  }
})(j0);
var Tit = j0.exports, yu = { exports: {} }, Qf;
function Ait() {
  return Qf || (Qf = 1, function(t, e) {
    t.exports = r;
    var n = cc();
    function r(a, u, o, h, m) {
      this.prop = a, this.value = u, this.selector = o, this.priority = h || 0, this.additionalPriority = m || [];
    }
    r.prototype.compareFunc = function(a) {
      var u = [];
      u.push.apply(u, this.selector.specificity()), u.push.apply(u, this.additionalPriority), u[0] += this.priority;
      var o = [];
      return o.push.apply(o, a.selector.specificity()), o.push.apply(o, a.additionalPriority), o[0] += a.priority, n.compareFunc(u, o);
    }, r.prototype.compare = function(a) {
      var u = this.compareFunc(a);
      return u === 1 ? this : a;
    }, r.prototype.toString = function() {
      return this.prop + ": " + this.value.replace(/['"]+/g, "") + ";";
    };
  }(yu)), yu.exports;
}
var Kf;
function cc() {
  return Kf || (Kf = 1, function(t) {
    var e = dit, n = {}.hasOwnProperty, r = Tit, a = Ait();
    t.Selector = r, t.Property = a;
    /**
     * Returns an array of the selectors.
     *
     * @license Sizzle CSS Selector Engine - MIT
     * @param {String} selectorText from mensch
     * @api public
     */
    t.extract = function(o) {
      for (var h = 0, m = [], E = "", p = 0, N = o.length; p < N; p++) {
        var v = o.charAt(p);
        h ? ((v === "]" || v === ")") && h--, E += v) : v === "," ? (m.push(E), E = "") : ((v === "[" || v === "(") && h++, (E.length || v !== "," && v !== `
` && v !== " ") && (E += v));
      }
      return E.length && m.push(E), m;
    }, t.parseCSS = function(u) {
      for (var o = e.parse(u, { position: !0, comments: !0 }), h = typeof o.stylesheet < "u" && o.stylesheet.rules ? o.stylesheet.rules : [], m = [], E = 0, p = h.length; E < p; E++)
        if (h[E].type == "rule")
          for (var N = h[E], v = N.selectors, S = 0, L = v.length; S < L; S++)
            m.push([v[S], N.declarations]);
      return m;
    }, t.getPreservedText = function(u, o) {
      for (var h = e.parse(u, { position: !0, comments: !0 }), m = typeof h.stylesheet < "u" && h.stylesheet.rules ? h.stylesheet.rules : [], E = [], p = m.length - 1; p >= 0; p--)
        (o.fontFaces && m[p].type === "font-face" || o.mediaQueries && m[p].type === "media" || o.keyFrames && m[p].type === "keyframes") && E.unshift(
          e.stringify(
            { stylesheet: { rules: [m[p]] } },
            { comments: !1, indentation: "  " }
          )
        ), m[p].position.start;
      return E.length === 0 ? !1 : `
` + E.join(`
`) + `
`;
    }, t.normalizeLineEndings = function(u) {
      return u.replace(/\r\n/g, `
`).replace(/\n/g, `\r
`);
    }, t.compareFunc = function(u, o) {
      for (var h = Math.min(u.length, o.length), m = 0; m < h; m++)
        if (u[m] !== o[m])
          return u[m] > o[m] ? 1 : -1;
      return u.length - o.length;
    }, t.compare = function(u, o) {
      return t.compareFunc(u, o) == 1 ? u : o;
    }, t.extend = function(u, o) {
      for (var h in o)
        n.call(o, h) && (u[h] = o[h]);
      return u;
    }, t.getDefaultOptions = function(u) {
      var o = t.extend({
        extraCss: "",
        insertPreservedExtraCss: !0,
        applyStyleTags: !0,
        removeStyleTags: !0,
        preserveMediaQueries: !0,
        preserveFontFaces: !0,
        preserveKeyFrames: !0,
        applyWidthAttributes: !0,
        applyHeightAttributes: !0,
        applyAttributesTableElements: !0,
        url: ""
      }, u);
      return o.webResources = o.webResources || {}, o;
    };
  }(Au)), Au;
}
(function(t) {
  var e = iit, n = cc(), r = function(u, o, h) {
    return o = n.extend({ decodeEntities: !1 }, o || {}), u = h(u), e.load(u, o);
  }, a = function() {
    var u = [], o = function(m) {
      var E = t.exports.codeBlocks;
      return Object.keys(E).forEach(function(p) {
        var N = new RegExp(E[p].start + "([\\S\\s]*?)" + E[p].end, "g");
        m = m.replace(N, function(v, S) {
          return u.push(v), "JUICE_CODE_BLOCK_" + (u.length - 1) + "_";
        });
      }), m;
    }, h = function(m) {
      for (var E = 0; E < u.length; E++) {
        var p = new RegExp("JUICE_CODE_BLOCK_" + E + '_(="")?', "gi");
        m = m.replace(p, function() {
          return u[E];
        });
      }
      return m;
    };
    return {
      encodeEntities: o,
      decodeEntities: h
    };
  };
  t.exports = function(u, o, h, m) {
    var E = a(), p = r(u, o, E.encodeEntities), N = [p];
    N.push.apply(N, m);
    var v = h.apply(void 0, N) || p;
    return o && o.xmlMode ? v.xml() : E.decodeEntities(v.html());
  }, t.exports.codeBlocks = {
    EJS: { start: "<%", end: "%>" },
    HBS: { start: "{{", end: "}}" }
  };
})(Th);
var yit = Th.exports, Jr = cc(), Cit = function(e) {
  e.ignoredPseudos = ["hover", "active", "focus", "visited", "link"], e.widthElements = ["TABLE", "TD", "IMG"], e.heightElements = ["TABLE", "TD", "IMG"], e.tableElements = ["TABLE", "TD", "TH", "TR", "TD", "CAPTION", "COLGROUP", "COL", "THEAD", "TBODY", "TFOOT"], e.nonVisualElements = ["HEAD", "TITLE", "BASE", "LINK", "STYLE", "META", "SCRIPT", "NOSCRIPT"], e.styleToAttribute = {
    "background-color": "bgcolor",
    "background-image": "background",
    "text-align": "align",
    "vertical-align": "valign"
  }, e.excludedProperties = [], e.juiceDocument = h, e.inlineDocument = n;
  function n(p, N, v) {
    v = v || {};
    var S = Jr.parseCSS(N), L = [], W = "style";
    if (v.styleAttributeName && (W = v.styleAttributeName), S.forEach(F), L.forEach(Z), v.inlinePseudoElements && L.forEach(Q), v.applyWidthAttributes && L.forEach(function(H) {
      U(H, "width");
    }), v.applyHeightAttributes && L.forEach(function(H) {
      U(H, "height");
    }), v.applyAttributesTableElements && L.forEach(Y), v.insertPreservedExtraCss && v.extraCss) {
      var M = Jr.getPreservedText(v.extraCss, {
        mediaQueries: v.preserveMediaQueries,
        fontFaces: v.preserveFontFaces,
        keyFrames: v.preserveKeyFrames
      });
      if (M) {
        var O = null;
        v.insertPreservedExtraCss !== !0 ? O = p(v.insertPreservedExtraCss) : (O = p("head"), O.length || (O = p("body")), O.length || (O = p.root())), O.first().append("<style>" + M + "</style>");
      }
    }
    function F(H) {
      for (var z = H[0], nt = H[1], at = new Jr.Selector(z), gt = at.parsed(), dt = a(gt), St = 0; St < gt.length; ++St) {
        var Ut = gt[St];
        if (Ut.pseudos)
          for (var Xt = 0; Xt < Ut.pseudos.length; ++Xt) {
            var Ct = Ut.pseudos[Xt];
            if (e.ignoredPseudos.indexOf(Ct.name) >= 0)
              return;
          }
      }
      if (dt) {
        var Qt = gt[gt.length - 1], En = Qt.pseudos;
        Qt.pseudos = o(Qt.pseudos), z = gt.toString(), Qt.pseudos = En;
      }
      var on;
      try {
        on = p(z);
      } catch {
        return;
      }
      on.each(function() {
        var zt = this;
        if (zt.name && e.nonVisualElements.indexOf(zt.name.toUpperCase()) >= 0)
          return;
        if (dt) {
          var tn = "pseudo" + dt, Nt = zt[tn];
          Nt || (Nt = zt[tn] = p("<span />").get(0), Nt.pseudoElementType = dt, Nt.pseudoElementParent = zt, zt[tn] = Nt), zt = Nt;
        }
        if (!zt.styleProps) {
          if (zt.styleProps = {}, p(zt).attr(W)) {
            var Wt = "* { " + p(zt).attr(W) + " } ";
            Zt(Jr.parseCSS(Wt)[0][1], new Jr.Selector("<style>", !0));
          }
          L.push(zt);
        }
        function Zt(oe, We) {
          for (var $ = 0, Ie = oe.length; $ < Ie; $++)
            if (oe[$].type == "property") {
              var Se = oe[$].name, pt = oe[$].value, pe = oe[$].value.match(/!important$/) !== null;
              pe && !v.preserveImportant && (pt = pt.replace(/\s*!important$/, ""));
              var Le = [oe[$].position.start.line, oe[$].position.start.col], Qe = new Jr.Property(Se, pt, We, pe ? 2 : 0, Le), se = zt.styleProps[Se];
              e.excludedProperties.indexOf(Se) < 0 && (se && se.compare(Qe) === Qe || !se) && (se && se.selector !== We ? delete zt.styleProps[Se] : se && (Qe.nextProp = se), zt.styleProps[Se] = Qe);
            }
        }
        Zt(nt, at);
      });
    }
    function Z(H) {
      Object.keys(H.styleProps).length;
      var z = [];
      Object.keys(H.styleProps).forEach(function(at) {
        for (var gt = H.styleProps[at]; typeof gt < "u"; )
          z.push(gt), gt = gt.nextProp;
      }), z.sort(function(at, gt) {
        return at.compareFunc(gt);
      });
      var nt = z.filter(function(at) {
        return at.prop !== "content";
      }).map(function(at) {
        return at.prop + ": " + at.value.replace(/["]/g, "'") + ";";
      }).join(" ");
      nt && p(H).attr(W, nt);
    }
    function Q(H) {
      if (H.pseudoElementType && H.styleProps.content) {
        var z = r(H.styleProps.content.value);
        z.img ? (H.name = "img", p(H).attr("src", z.img)) : p(H).text(z);
        var nt = H.pseudoElementParent;
        H.pseudoElementType === "before" ? p(nt).prepend(H) : p(nt).append(H);
      }
    }
    function U(H, z) {
      if (H.name) {
        var nt = H.name.toUpperCase();
        if (e[z + "Elements"].indexOf(nt) > -1) {
          for (var at in H.styleProps)
            if (H.styleProps[at].prop === z) {
              if (H.styleProps[at].value.match(/px/)) {
                var gt = H.styleProps[at].value.replace("px", "");
                p(H).attr(z, gt);
                return;
              }
              if (e.tableElements.indexOf(nt) > -1 && H.styleProps[at].value.match(/\%/)) {
                p(H).attr(z, H.styleProps[at].value);
                return;
              }
            }
        }
      }
    }
    function P(H) {
      return H.indexOf("url(") !== 0 ? H : H.replace(/^url\((["'])?([^"']+)\1\)$/, "$2");
    }
    function Y(H) {
      if (H.name) {
        var z = H.name.toUpperCase(), nt = Object.keys(e.styleToAttribute);
        if (e.tableElements.indexOf(z) > -1) {
          for (var at in H.styleProps)
            if (nt.indexOf(H.styleProps[at].prop) > -1) {
              var gt = e.styleToAttribute[H.styleProps[at].prop], dt = H.styleProps[at].value;
              gt === "background" && (dt = P(dt)), p(H).attr(gt, dt);
            }
        }
      }
    }
  }
  function r(p) {
    if (p === "none" || p === "normal")
      return "";
    var N = p.match(/^\s*url\s*\(\s*(.*?)\s*\)\s*$/i);
    if (N) {
      var v = N[1].replace(/^['"]|['"]$/g, "");
      return { img: v };
    }
    return p = p.slice(1, p.length - 1), p = p.replace(/\\/g, ""), p;
  }
  function a(p) {
    if (p.length !== 0) {
      var N = p[p.length - 1].pseudos;
      if (N) {
        for (var v = 0; v < N.length; v++)
          if (u(N[v]))
            return N[v].name;
      }
    }
  }
  function u(p) {
    return p.name === "before" || p.name === "after";
  }
  function o(p) {
    return p.filter(function(N) {
      return !u(N);
    });
  }
  function h(p, N) {
    N = Jr.getDefaultOptions(N);
    var v = E(p, N);
    return v += `
` + N.extraCss, n(p, v, N), p;
  }
  function m(p, N) {
    var v = [], S = p("style"), L, W, M;
    return S.each(function() {
      if (M = this, L = M.childNodes, L.length === 1) {
        if (W = L[0].data, N.applyStyleTags && p(M).attr("data-embed") === void 0 && v.push(W), N.removeStyleTags && p(M).attr("data-embed") === void 0) {
          var O = Jr.getPreservedText(M.childNodes[0].nodeValue, {
            mediaQueries: N.preserveMediaQueries,
            fontFaces: N.preserveFontFaces,
            keyFrames: N.preserveKeyFrames
          });
          O ? M.childNodes[0].nodeValue = O : p(M).remove();
        }
        p(M).removeAttr("data-embed");
      }
    }), v;
  }
  function E(p, N) {
    var v = m(p, N), S = v.join(`
`);
    return S;
  }
  return e;
}, X0 = yit, Iit = Cit, ba = Iit(function(t, e) {
  return X0(t, { xmlMode: e && e.xmlMode }, Sit, [e]);
}), Sit = function(t, e) {
  return ba.juiceDocument(t, e);
};
ba.inlineContent = function(t, e, n) {
  return X0(t, { xmlMode: n && n.xmlMode }, ba.inlineDocument, [e, n]);
};
var Nit = ba;
const vit = /* @__PURE__ */ Tl(Nit);
class xit {
  constructor() {
    this.rtfHeaderOpening = "{\\rtf1\\ansi\\deff0{\\fonttbl {\\f0\\fnil\\fcharset0 Calibri;}{\\f1\\fnil\\fcharset2 Symbol;}}", this.rtfHeaderContent = "", this.rtfClosing = "}", this.rtfContentReferences = [], this.Table = new D_();
  }
  convertHtmlToRtf(e) {
    let r = _h.load(vit(e))("html").children();
    return Array.from(r).forEach((a) => this.readAllChildsInTag(a)), this.buildRtf();
  }
  buildRtf() {
    this.rtfHeaderContent += Gi.getRtfColorTable();
    let e = this.rtfHeaderOpening + this.rtfHeaderContent + this.getRtfContentReferences() + this.rtfClosing;
    return this.clearCacheContent(), e;
  }
  getRtfContentReferences() {
    let e = "";
    return this.rtfContentReferences.forEach((n) => e += n.content), e;
  }
  // Don't has a test
  readAllChildsInTag(e) {
    e.children != null && (this.addOpeningTagInRtfCode(e.name), this.ifExistsAttributesAddAllReferencesInRtfCode(e.attribs), e.name.toLowerCase() == "table" && this.Table.setAmountOfColumns(
      this.getAmountOfColumnThroughOfFirstChildOfTbodyTag(
        e.children
      )
    ), e.name.toLowerCase() == "tr" && this.addReferenceTagInRtfCode(
      this.Table.buildCellsLengthOfEachColumn()
    ), e.name.toLowerCase() == "mark" && this.setHighlightInRtf(), e.children.forEach((n, r) => {
      n.type != "text" ? this.readAllChildsInTag(n) : this.addContentOfTagInRtfCode(n.data);
    })), this.addClosingFatherTagInRtfCode(e.name);
  }
  getAmountOfColumnThroughOfFirstChildOfTbodyTag(e) {
    let n = 0, r = e.findIndex((a) => a.name == "tbody");
    for (let a = 0; a < e[r].children.length; a++)
      if (e[r].children[a].type != "text") {
        e[r].children[a].children.forEach(
          (u, o) => {
            u.type != "text" && n++;
          }
        );
        break;
      }
    return n;
  }
  ifExistsAttributesAddAllReferencesInRtfCode(e) {
    e.style != null && this.addReferenceTagInRtfCode(
      Gi.getRtfReferencesInStyleProperty(e.style)
    ), e.align != null && this.addReferenceTagInRtfCode(
      Gi.getRtfAlignmentReference(e.align)
    );
  }
  addReferenceTagInRtfCode(e) {
    e != null && this.rtfContentReferences.push({ content: e, tag: !0 });
  }
  addOpeningTagInRtfCode(e) {
    this.addReferenceTagInRtfCode(Vc.getRtfReferenceTag(e));
  }
  addClosingFatherTagInRtfCode(e) {
    this.addReferenceTagInRtfCode(
      Vc.getRtfReferenceTag(`/${e}`)
    );
  }
  addContentOfTagInRtfCode(e) {
    e = ts.removeCharacterOfEscapeInAllString(
      e,
      `
	`
    ), e != null && !ts.hasOnlyWhiteSpace(e) && this.rtfContentReferences.push({
      content: this.addSpaceAroundString(e.trim()),
      tag: !1
    });
  }
  addSpaceAroundString(e) {
    return ` ${e} `;
  }
  setHighlightInRtf() {
    let n = Gi.getRtfReferenceColor("rgb(255, 255, 0)").match(/[0-9]+/);
    this.addReferenceTagInRtfCode(
      "\\highlight" + n.toString()
    );
  }
  clearCacheContent() {
    this.rtfHeaderContent = "", this.rtfContentReferences = [];
  }
}
const Mit = new xit();
export {
  Mit as default
};
