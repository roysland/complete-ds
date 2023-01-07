"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i4 = decorators.length - 1, decorator; i4 >= 0; i4--)
      if (decorator = decorators[i4])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp(target, key, result);
    return result;
  };

  // ../../node_modules/@lit/reactive-element/css-tag.js
  var t = window;
  var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s = Symbol();
  var n = /* @__PURE__ */ new WeakMap();
  var o = class {
    constructor(t4, e7, n6) {
      if (this._$cssResult$ = true, n6 !== s)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t4, this.t = e7;
    }
    get styleSheet() {
      let t4 = this.o;
      const s5 = this.t;
      if (e && void 0 === t4) {
        const e7 = void 0 !== s5 && 1 === s5.length;
        e7 && (t4 = n.get(s5)), void 0 === t4 && ((this.o = t4 = new CSSStyleSheet()).replaceSync(this.cssText), e7 && n.set(s5, t4));
      }
      return t4;
    }
    toString() {
      return this.cssText;
    }
  };
  var r = (t4) => new o("string" == typeof t4 ? t4 : t4 + "", void 0, s);
  var i = (t4, ...e7) => {
    const n6 = 1 === t4.length ? t4[0] : e7.reduce((e8, s5, n7) => e8 + ((t5) => {
      if (true === t5._$cssResult$)
        return t5.cssText;
      if ("number" == typeof t5)
        return t5;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t5 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s5) + t4[n7 + 1], t4[0]);
    return new o(n6, t4, s);
  };
  var S = (s5, n6) => {
    e ? s5.adoptedStyleSheets = n6.map((t4) => t4 instanceof CSSStyleSheet ? t4 : t4.styleSheet) : n6.forEach((e7) => {
      const n7 = document.createElement("style"), o6 = t.litNonce;
      void 0 !== o6 && n7.setAttribute("nonce", o6), n7.textContent = e7.cssText, s5.appendChild(n7);
    });
  };
  var c = e ? (t4) => t4 : (t4) => t4 instanceof CSSStyleSheet ? ((t5) => {
    let e7 = "";
    for (const s5 of t5.cssRules)
      e7 += s5.cssText;
    return r(e7);
  })(t4) : t4;

  // ../../node_modules/@lit/reactive-element/reactive-element.js
  var s2;
  var e2 = window;
  var r2 = e2.trustedTypes;
  var h = r2 ? r2.emptyScript : "";
  var o2 = e2.reactiveElementPolyfillSupport;
  var n2 = { toAttribute(t4, i4) {
    switch (i4) {
      case Boolean:
        t4 = t4 ? h : null;
        break;
      case Object:
      case Array:
        t4 = null == t4 ? t4 : JSON.stringify(t4);
    }
    return t4;
  }, fromAttribute(t4, i4) {
    let s5 = t4;
    switch (i4) {
      case Boolean:
        s5 = null !== t4;
        break;
      case Number:
        s5 = null === t4 ? null : Number(t4);
        break;
      case Object:
      case Array:
        try {
          s5 = JSON.parse(t4);
        } catch (t5) {
          s5 = null;
        }
    }
    return s5;
  } };
  var a = (t4, i4) => i4 !== t4 && (i4 == i4 || t4 == t4);
  var l = { attribute: true, type: String, converter: n2, reflect: false, hasChanged: a };
  var d = class extends HTMLElement {
    constructor() {
      super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this.u();
    }
    static addInitializer(t4) {
      var i4;
      this.finalize(), (null !== (i4 = this.h) && void 0 !== i4 ? i4 : this.h = []).push(t4);
    }
    static get observedAttributes() {
      this.finalize();
      const t4 = [];
      return this.elementProperties.forEach((i4, s5) => {
        const e7 = this._$Ep(s5, i4);
        void 0 !== e7 && (this._$Ev.set(e7, s5), t4.push(e7));
      }), t4;
    }
    static createProperty(t4, i4 = l) {
      if (i4.state && (i4.attribute = false), this.finalize(), this.elementProperties.set(t4, i4), !i4.noAccessor && !this.prototype.hasOwnProperty(t4)) {
        const s5 = "symbol" == typeof t4 ? Symbol() : "__" + t4, e7 = this.getPropertyDescriptor(t4, s5, i4);
        void 0 !== e7 && Object.defineProperty(this.prototype, t4, e7);
      }
    }
    static getPropertyDescriptor(t4, i4, s5) {
      return { get() {
        return this[i4];
      }, set(e7) {
        const r4 = this[t4];
        this[i4] = e7, this.requestUpdate(t4, r4, s5);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t4) {
      return this.elementProperties.get(t4) || l;
    }
    static finalize() {
      if (this.hasOwnProperty("finalized"))
        return false;
      this.finalized = true;
      const t4 = Object.getPrototypeOf(this);
      if (t4.finalize(), void 0 !== t4.h && (this.h = [...t4.h]), this.elementProperties = new Map(t4.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
        const t5 = this.properties, i4 = [...Object.getOwnPropertyNames(t5), ...Object.getOwnPropertySymbols(t5)];
        for (const s5 of i4)
          this.createProperty(s5, t5[s5]);
      }
      return this.elementStyles = this.finalizeStyles(this.styles), true;
    }
    static finalizeStyles(i4) {
      const s5 = [];
      if (Array.isArray(i4)) {
        const e7 = new Set(i4.flat(1 / 0).reverse());
        for (const i5 of e7)
          s5.unshift(c(i5));
      } else
        void 0 !== i4 && s5.push(c(i4));
      return s5;
    }
    static _$Ep(t4, i4) {
      const s5 = i4.attribute;
      return false === s5 ? void 0 : "string" == typeof s5 ? s5 : "string" == typeof t4 ? t4.toLowerCase() : void 0;
    }
    u() {
      var t4;
      this._$E_ = new Promise((t5) => this.enableUpdating = t5), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t4 = this.constructor.h) || void 0 === t4 || t4.forEach((t5) => t5(this));
    }
    addController(t4) {
      var i4, s5;
      (null !== (i4 = this._$ES) && void 0 !== i4 ? i4 : this._$ES = []).push(t4), void 0 !== this.renderRoot && this.isConnected && (null === (s5 = t4.hostConnected) || void 0 === s5 || s5.call(t4));
    }
    removeController(t4) {
      var i4;
      null === (i4 = this._$ES) || void 0 === i4 || i4.splice(this._$ES.indexOf(t4) >>> 0, 1);
    }
    _$Eg() {
      this.constructor.elementProperties.forEach((t4, i4) => {
        this.hasOwnProperty(i4) && (this._$Ei.set(i4, this[i4]), delete this[i4]);
      });
    }
    createRenderRoot() {
      var t4;
      const s5 = null !== (t4 = this.shadowRoot) && void 0 !== t4 ? t4 : this.attachShadow(this.constructor.shadowRootOptions);
      return S(s5, this.constructor.elementStyles), s5;
    }
    connectedCallback() {
      var t4;
      void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t4 = this._$ES) || void 0 === t4 || t4.forEach((t5) => {
        var i4;
        return null === (i4 = t5.hostConnected) || void 0 === i4 ? void 0 : i4.call(t5);
      });
    }
    enableUpdating(t4) {
    }
    disconnectedCallback() {
      var t4;
      null === (t4 = this._$ES) || void 0 === t4 || t4.forEach((t5) => {
        var i4;
        return null === (i4 = t5.hostDisconnected) || void 0 === i4 ? void 0 : i4.call(t5);
      });
    }
    attributeChangedCallback(t4, i4, s5) {
      this._$AK(t4, s5);
    }
    _$EO(t4, i4, s5 = l) {
      var e7;
      const r4 = this.constructor._$Ep(t4, s5);
      if (void 0 !== r4 && true === s5.reflect) {
        const h3 = (void 0 !== (null === (e7 = s5.converter) || void 0 === e7 ? void 0 : e7.toAttribute) ? s5.converter : n2).toAttribute(i4, s5.type);
        this._$El = t4, null == h3 ? this.removeAttribute(r4) : this.setAttribute(r4, h3), this._$El = null;
      }
    }
    _$AK(t4, i4) {
      var s5;
      const e7 = this.constructor, r4 = e7._$Ev.get(t4);
      if (void 0 !== r4 && this._$El !== r4) {
        const t5 = e7.getPropertyOptions(r4), h3 = "function" == typeof t5.converter ? { fromAttribute: t5.converter } : void 0 !== (null === (s5 = t5.converter) || void 0 === s5 ? void 0 : s5.fromAttribute) ? t5.converter : n2;
        this._$El = r4, this[r4] = h3.fromAttribute(i4, t5.type), this._$El = null;
      }
    }
    requestUpdate(t4, i4, s5) {
      let e7 = true;
      void 0 !== t4 && (((s5 = s5 || this.constructor.getPropertyOptions(t4)).hasChanged || a)(this[t4], i4) ? (this._$AL.has(t4) || this._$AL.set(t4, i4), true === s5.reflect && this._$El !== t4 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t4, s5))) : e7 = false), !this.isUpdatePending && e7 && (this._$E_ = this._$Ej());
    }
    async _$Ej() {
      this.isUpdatePending = true;
      try {
        await this._$E_;
      } catch (t5) {
        Promise.reject(t5);
      }
      const t4 = this.scheduleUpdate();
      return null != t4 && await t4, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      var t4;
      if (!this.isUpdatePending)
        return;
      this.hasUpdated, this._$Ei && (this._$Ei.forEach((t5, i5) => this[i5] = t5), this._$Ei = void 0);
      let i4 = false;
      const s5 = this._$AL;
      try {
        i4 = this.shouldUpdate(s5), i4 ? (this.willUpdate(s5), null === (t4 = this._$ES) || void 0 === t4 || t4.forEach((t5) => {
          var i5;
          return null === (i5 = t5.hostUpdate) || void 0 === i5 ? void 0 : i5.call(t5);
        }), this.update(s5)) : this._$Ek();
      } catch (t5) {
        throw i4 = false, this._$Ek(), t5;
      }
      i4 && this._$AE(s5);
    }
    willUpdate(t4) {
    }
    _$AE(t4) {
      var i4;
      null === (i4 = this._$ES) || void 0 === i4 || i4.forEach((t5) => {
        var i5;
        return null === (i5 = t5.hostUpdated) || void 0 === i5 ? void 0 : i5.call(t5);
      }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t4)), this.updated(t4);
    }
    _$Ek() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$E_;
    }
    shouldUpdate(t4) {
      return true;
    }
    update(t4) {
      void 0 !== this._$EC && (this._$EC.forEach((t5, i4) => this._$EO(i4, this[i4], t5)), this._$EC = void 0), this._$Ek();
    }
    updated(t4) {
    }
    firstUpdated(t4) {
    }
  };
  d.finalized = true, d.elementProperties = /* @__PURE__ */ new Map(), d.elementStyles = [], d.shadowRootOptions = { mode: "open" }, null == o2 || o2({ ReactiveElement: d }), (null !== (s2 = e2.reactiveElementVersions) && void 0 !== s2 ? s2 : e2.reactiveElementVersions = []).push("1.5.0");

  // ../../node_modules/lit-html/lit-html.js
  var t2;
  var i2 = window;
  var s3 = i2.trustedTypes;
  var e3 = s3 ? s3.createPolicy("lit-html", { createHTML: (t4) => t4 }) : void 0;
  var o3 = `lit$${(Math.random() + "").slice(9)}$`;
  var n3 = "?" + o3;
  var l2 = `<${n3}>`;
  var h2 = document;
  var r3 = (t4 = "") => h2.createComment(t4);
  var d2 = (t4) => null === t4 || "object" != typeof t4 && "function" != typeof t4;
  var u = Array.isArray;
  var c2 = (t4) => u(t4) || "function" == typeof (null == t4 ? void 0 : t4[Symbol.iterator]);
  var v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var a2 = /-->/g;
  var f = />/g;
  var _ = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var m = /'/g;
  var p = /"/g;
  var $ = /^(?:script|style|textarea|title)$/i;
  var g = (t4) => (i4, ...s5) => ({ _$litType$: t4, strings: i4, values: s5 });
  var y = g(1);
  var w = g(2);
  var x = Symbol.for("lit-noChange");
  var b = Symbol.for("lit-nothing");
  var T = /* @__PURE__ */ new WeakMap();
  var A = h2.createTreeWalker(h2, 129, null, false);
  var E = (t4, i4) => {
    const s5 = t4.length - 1, n6 = [];
    let h3, r4 = 2 === i4 ? "<svg>" : "", d3 = v;
    for (let i5 = 0; i5 < s5; i5++) {
      const s6 = t4[i5];
      let e7, u3, c3 = -1, g2 = 0;
      for (; g2 < s6.length && (d3.lastIndex = g2, u3 = d3.exec(s6), null !== u3); )
        g2 = d3.lastIndex, d3 === v ? "!--" === u3[1] ? d3 = a2 : void 0 !== u3[1] ? d3 = f : void 0 !== u3[2] ? ($.test(u3[2]) && (h3 = RegExp("</" + u3[2], "g")), d3 = _) : void 0 !== u3[3] && (d3 = _) : d3 === _ ? ">" === u3[0] ? (d3 = null != h3 ? h3 : v, c3 = -1) : void 0 === u3[1] ? c3 = -2 : (c3 = d3.lastIndex - u3[2].length, e7 = u3[1], d3 = void 0 === u3[3] ? _ : '"' === u3[3] ? p : m) : d3 === p || d3 === m ? d3 = _ : d3 === a2 || d3 === f ? d3 = v : (d3 = _, h3 = void 0);
      const y2 = d3 === _ && t4[i5 + 1].startsWith("/>") ? " " : "";
      r4 += d3 === v ? s6 + l2 : c3 >= 0 ? (n6.push(e7), s6.slice(0, c3) + "$lit$" + s6.slice(c3) + o3 + y2) : s6 + o3 + (-2 === c3 ? (n6.push(void 0), i5) : y2);
    }
    const u2 = r4 + (t4[s5] || "<?>") + (2 === i4 ? "</svg>" : "");
    if (!Array.isArray(t4) || !t4.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return [void 0 !== e3 ? e3.createHTML(u2) : u2, n6];
  };
  var C = class {
    constructor({ strings: t4, _$litType$: i4 }, e7) {
      let l6;
      this.parts = [];
      let h3 = 0, d3 = 0;
      const u2 = t4.length - 1, c3 = this.parts, [v2, a3] = E(t4, i4);
      if (this.el = C.createElement(v2, e7), A.currentNode = this.el.content, 2 === i4) {
        const t5 = this.el.content, i5 = t5.firstChild;
        i5.remove(), t5.append(...i5.childNodes);
      }
      for (; null !== (l6 = A.nextNode()) && c3.length < u2; ) {
        if (1 === l6.nodeType) {
          if (l6.hasAttributes()) {
            const t5 = [];
            for (const i5 of l6.getAttributeNames())
              if (i5.endsWith("$lit$") || i5.startsWith(o3)) {
                const s5 = a3[d3++];
                if (t5.push(i5), void 0 !== s5) {
                  const t6 = l6.getAttribute(s5.toLowerCase() + "$lit$").split(o3), i6 = /([.?@])?(.*)/.exec(s5);
                  c3.push({ type: 1, index: h3, name: i6[2], strings: t6, ctor: "." === i6[1] ? M : "?" === i6[1] ? k : "@" === i6[1] ? H : S2 });
                } else
                  c3.push({ type: 6, index: h3 });
              }
            for (const i5 of t5)
              l6.removeAttribute(i5);
          }
          if ($.test(l6.tagName)) {
            const t5 = l6.textContent.split(o3), i5 = t5.length - 1;
            if (i5 > 0) {
              l6.textContent = s3 ? s3.emptyScript : "";
              for (let s5 = 0; s5 < i5; s5++)
                l6.append(t5[s5], r3()), A.nextNode(), c3.push({ type: 2, index: ++h3 });
              l6.append(t5[i5], r3());
            }
          }
        } else if (8 === l6.nodeType)
          if (l6.data === n3)
            c3.push({ type: 2, index: h3 });
          else {
            let t5 = -1;
            for (; -1 !== (t5 = l6.data.indexOf(o3, t5 + 1)); )
              c3.push({ type: 7, index: h3 }), t5 += o3.length - 1;
          }
        h3++;
      }
    }
    static createElement(t4, i4) {
      const s5 = h2.createElement("template");
      return s5.innerHTML = t4, s5;
    }
  };
  function P(t4, i4, s5 = t4, e7) {
    var o6, n6, l6, h3;
    if (i4 === x)
      return i4;
    let r4 = void 0 !== e7 ? null === (o6 = s5._$Co) || void 0 === o6 ? void 0 : o6[e7] : s5._$Cl;
    const u2 = d2(i4) ? void 0 : i4._$litDirective$;
    return (null == r4 ? void 0 : r4.constructor) !== u2 && (null === (n6 = null == r4 ? void 0 : r4._$AO) || void 0 === n6 || n6.call(r4, false), void 0 === u2 ? r4 = void 0 : (r4 = new u2(t4), r4._$AT(t4, s5, e7)), void 0 !== e7 ? (null !== (l6 = (h3 = s5)._$Co) && void 0 !== l6 ? l6 : h3._$Co = [])[e7] = r4 : s5._$Cl = r4), void 0 !== r4 && (i4 = P(t4, r4._$AS(t4, i4.values), r4, e7)), i4;
  }
  var V = class {
    constructor(t4, i4) {
      this.u = [], this._$AN = void 0, this._$AD = t4, this._$AM = i4;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    v(t4) {
      var i4;
      const { el: { content: s5 }, parts: e7 } = this._$AD, o6 = (null !== (i4 = null == t4 ? void 0 : t4.creationScope) && void 0 !== i4 ? i4 : h2).importNode(s5, true);
      A.currentNode = o6;
      let n6 = A.nextNode(), l6 = 0, r4 = 0, d3 = e7[0];
      for (; void 0 !== d3; ) {
        if (l6 === d3.index) {
          let i5;
          2 === d3.type ? i5 = new N(n6, n6.nextSibling, this, t4) : 1 === d3.type ? i5 = new d3.ctor(n6, d3.name, d3.strings, this, t4) : 6 === d3.type && (i5 = new I(n6, this, t4)), this.u.push(i5), d3 = e7[++r4];
        }
        l6 !== (null == d3 ? void 0 : d3.index) && (n6 = A.nextNode(), l6++);
      }
      return o6;
    }
    p(t4) {
      let i4 = 0;
      for (const s5 of this.u)
        void 0 !== s5 && (void 0 !== s5.strings ? (s5._$AI(t4, s5, i4), i4 += s5.strings.length - 2) : s5._$AI(t4[i4])), i4++;
    }
  };
  var N = class {
    constructor(t4, i4, s5, e7) {
      var o6;
      this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = t4, this._$AB = i4, this._$AM = s5, this.options = e7, this._$Cm = null === (o6 = null == e7 ? void 0 : e7.isConnected) || void 0 === o6 || o6;
    }
    get _$AU() {
      var t4, i4;
      return null !== (i4 = null === (t4 = this._$AM) || void 0 === t4 ? void 0 : t4._$AU) && void 0 !== i4 ? i4 : this._$Cm;
    }
    get parentNode() {
      let t4 = this._$AA.parentNode;
      const i4 = this._$AM;
      return void 0 !== i4 && 11 === t4.nodeType && (t4 = i4.parentNode), t4;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t4, i4 = this) {
      t4 = P(this, t4, i4), d2(t4) ? t4 === b || null == t4 || "" === t4 ? (this._$AH !== b && this._$AR(), this._$AH = b) : t4 !== this._$AH && t4 !== x && this.g(t4) : void 0 !== t4._$litType$ ? this.$(t4) : void 0 !== t4.nodeType ? this.T(t4) : c2(t4) ? this.k(t4) : this.g(t4);
    }
    O(t4, i4 = this._$AB) {
      return this._$AA.parentNode.insertBefore(t4, i4);
    }
    T(t4) {
      this._$AH !== t4 && (this._$AR(), this._$AH = this.O(t4));
    }
    g(t4) {
      this._$AH !== b && d2(this._$AH) ? this._$AA.nextSibling.data = t4 : this.T(h2.createTextNode(t4)), this._$AH = t4;
    }
    $(t4) {
      var i4;
      const { values: s5, _$litType$: e7 } = t4, o6 = "number" == typeof e7 ? this._$AC(t4) : (void 0 === e7.el && (e7.el = C.createElement(e7.h, this.options)), e7);
      if ((null === (i4 = this._$AH) || void 0 === i4 ? void 0 : i4._$AD) === o6)
        this._$AH.p(s5);
      else {
        const t5 = new V(o6, this), i5 = t5.v(this.options);
        t5.p(s5), this.T(i5), this._$AH = t5;
      }
    }
    _$AC(t4) {
      let i4 = T.get(t4.strings);
      return void 0 === i4 && T.set(t4.strings, i4 = new C(t4)), i4;
    }
    k(t4) {
      u(this._$AH) || (this._$AH = [], this._$AR());
      const i4 = this._$AH;
      let s5, e7 = 0;
      for (const o6 of t4)
        e7 === i4.length ? i4.push(s5 = new N(this.O(r3()), this.O(r3()), this, this.options)) : s5 = i4[e7], s5._$AI(o6), e7++;
      e7 < i4.length && (this._$AR(s5 && s5._$AB.nextSibling, e7), i4.length = e7);
    }
    _$AR(t4 = this._$AA.nextSibling, i4) {
      var s5;
      for (null === (s5 = this._$AP) || void 0 === s5 || s5.call(this, false, true, i4); t4 && t4 !== this._$AB; ) {
        const i5 = t4.nextSibling;
        t4.remove(), t4 = i5;
      }
    }
    setConnected(t4) {
      var i4;
      void 0 === this._$AM && (this._$Cm = t4, null === (i4 = this._$AP) || void 0 === i4 || i4.call(this, t4));
    }
  };
  var S2 = class {
    constructor(t4, i4, s5, e7, o6) {
      this.type = 1, this._$AH = b, this._$AN = void 0, this.element = t4, this.name = i4, this._$AM = e7, this.options = o6, s5.length > 2 || "" !== s5[0] || "" !== s5[1] ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = b;
    }
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t4, i4 = this, s5, e7) {
      const o6 = this.strings;
      let n6 = false;
      if (void 0 === o6)
        t4 = P(this, t4, i4, 0), n6 = !d2(t4) || t4 !== this._$AH && t4 !== x, n6 && (this._$AH = t4);
      else {
        const e8 = t4;
        let l6, h3;
        for (t4 = o6[0], l6 = 0; l6 < o6.length - 1; l6++)
          h3 = P(this, e8[s5 + l6], i4, l6), h3 === x && (h3 = this._$AH[l6]), n6 || (n6 = !d2(h3) || h3 !== this._$AH[l6]), h3 === b ? t4 = b : t4 !== b && (t4 += (null != h3 ? h3 : "") + o6[l6 + 1]), this._$AH[l6] = h3;
      }
      n6 && !e7 && this.j(t4);
    }
    j(t4) {
      t4 === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t4 ? t4 : "");
    }
  };
  var M = class extends S2 {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t4) {
      this.element[this.name] = t4 === b ? void 0 : t4;
    }
  };
  var R = s3 ? s3.emptyScript : "";
  var k = class extends S2 {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t4) {
      t4 && t4 !== b ? this.element.setAttribute(this.name, R) : this.element.removeAttribute(this.name);
    }
  };
  var H = class extends S2 {
    constructor(t4, i4, s5, e7, o6) {
      super(t4, i4, s5, e7, o6), this.type = 5;
    }
    _$AI(t4, i4 = this) {
      var s5;
      if ((t4 = null !== (s5 = P(this, t4, i4, 0)) && void 0 !== s5 ? s5 : b) === x)
        return;
      const e7 = this._$AH, o6 = t4 === b && e7 !== b || t4.capture !== e7.capture || t4.once !== e7.once || t4.passive !== e7.passive, n6 = t4 !== b && (e7 === b || o6);
      o6 && this.element.removeEventListener(this.name, this, e7), n6 && this.element.addEventListener(this.name, this, t4), this._$AH = t4;
    }
    handleEvent(t4) {
      var i4, s5;
      "function" == typeof this._$AH ? this._$AH.call(null !== (s5 = null === (i4 = this.options) || void 0 === i4 ? void 0 : i4.host) && void 0 !== s5 ? s5 : this.element, t4) : this._$AH.handleEvent(t4);
    }
  };
  var I = class {
    constructor(t4, i4, s5) {
      this.element = t4, this.type = 6, this._$AN = void 0, this._$AM = i4, this.options = s5;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t4) {
      P(this, t4);
    }
  };
  var z = i2.litHtmlPolyfillSupport;
  null == z || z(C, N), (null !== (t2 = i2.litHtmlVersions) && void 0 !== t2 ? t2 : i2.litHtmlVersions = []).push("2.5.0");
  var Z = (t4, i4, s5) => {
    var e7, o6;
    const n6 = null !== (e7 = null == s5 ? void 0 : s5.renderBefore) && void 0 !== e7 ? e7 : i4;
    let l6 = n6._$litPart$;
    if (void 0 === l6) {
      const t5 = null !== (o6 = null == s5 ? void 0 : s5.renderBefore) && void 0 !== o6 ? o6 : null;
      n6._$litPart$ = l6 = new N(i4.insertBefore(r3(), t5), t5, void 0, null != s5 ? s5 : {});
    }
    return l6._$AI(t4), l6;
  };

  // ../../node_modules/lit-element/lit-element.js
  var l3;
  var o4;
  var s4 = class extends d {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      var t4, e7;
      const i4 = super.createRenderRoot();
      return null !== (t4 = (e7 = this.renderOptions).renderBefore) && void 0 !== t4 || (e7.renderBefore = i4.firstChild), i4;
    }
    update(t4) {
      const i4 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t4), this._$Do = Z(i4, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      var t4;
      super.connectedCallback(), null === (t4 = this._$Do) || void 0 === t4 || t4.setConnected(true);
    }
    disconnectedCallback() {
      var t4;
      super.disconnectedCallback(), null === (t4 = this._$Do) || void 0 === t4 || t4.setConnected(false);
    }
    render() {
      return x;
    }
  };
  s4.finalized = true, s4._$litElement$ = true, null === (l3 = globalThis.litElementHydrateSupport) || void 0 === l3 || l3.call(globalThis, { LitElement: s4 });
  var n4 = globalThis.litElementPolyfillSupport;
  null == n4 || n4({ LitElement: s4 });
  (null !== (o4 = globalThis.litElementVersions) && void 0 !== o4 ? o4 : globalThis.litElementVersions = []).push("3.2.2");

  // ../../node_modules/@lit/reactive-element/decorators/custom-element.js
  var e4 = (e7) => (n6) => "function" == typeof n6 ? ((e8, n7) => (customElements.define(e8, n7), n7))(e7, n6) : ((e8, n7) => {
    const { kind: t4, elements: s5 } = n7;
    return { kind: t4, elements: s5, finisher(n8) {
      customElements.define(e8, n8);
    } };
  })(e7, n6);

  // ../../node_modules/@lit/reactive-element/decorators/property.js
  var i3 = (i4, e7) => "method" === e7.kind && e7.descriptor && !("value" in e7.descriptor) ? { ...e7, finisher(n6) {
    n6.createProperty(e7.key, i4);
  } } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e7.key, initializer() {
    "function" == typeof e7.initializer && (this[e7.key] = e7.initializer.call(this));
  }, finisher(n6) {
    n6.createProperty(e7.key, i4);
  } };
  function e5(e7) {
    return (n6, t4) => void 0 !== t4 ? ((i4, e8, n7) => {
      e8.constructor.createProperty(n7, i4);
    })(e7, n6, t4) : i3(e7, n6);
  }

  // ../../node_modules/@lit/reactive-element/decorators/state.js
  function t3(t4) {
    return e5({ ...t4, state: true });
  }

  // ../../node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
  var n5;
  var e6 = null != (null === (n5 = window.HTMLSlotElement) || void 0 === n5 ? void 0 : n5.prototype.assignedElements) ? (o6, n6) => o6.assignedElements(n6) : (o6, n6) => o6.assignedNodes(n6).filter((o7) => o7.nodeType === Node.ELEMENT_NODE);

  // src/elements/icon/icon.styles.scss
  var styles = i`:host {
  font-family: "Material Symbols Outlined";
  line-height: 1;
  -webkit-font-smoothing: auto;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: "liga";
  opacity: 0.9;
  color: var(--text-1);
  transition: var(--transition-1);
  height: max-content;
  width: max-content;
  min-height: max-content;
  min-width: max-content;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  user-select: none;
}

:host([button]) {
  opacity: 0.6;
  cursor: pointer;
}

:host([disabled]) {
  pointer-events: none;
  opacity: 0.2;
}

/* size */
:host([size=xl]) {
  height: 48px;
  width: 48px;
  font-size: 48px;
}

:host([size=l]) {
  height: 32px;
  width: 32px;
  font-size: 32px;
}

:host([size=m]) {
  height: 24px;
  width: 24px;
  font-size: 24px;
}

:host([size=s]) {
  height: 16px;
  width: 16px;
  font-size: 16px;
}

/* hover inputs */
@media (hover: hover) {
  :host([button]:hover:not(:active)) {
    opacity: 0.9;
  }
}`;
  var icon_styles_default = styles;

  // src/elements/icon/icon.ts
  var Icon = class extends s4 {
    constructor() {
      super(...arguments);
      this.size = "m";
    }
    static get styles() {
      return icon_styles_default;
    }
    render() {
      var _a;
      return y` ${((_a = this.icon) == null ? void 0 : _a.indexOf("url")) ? y` ${this.icon} ` : ""}`;
    }
    attributeChangedCallback(name, oldval, newval) {
      super.attributeChangedCallback(name, oldval, newval);
      this.dispatchEvent(new Event(`${name}-changed`));
      if (name == "color" && this.color) {
        this.style.color = this.color;
      } else if (name == "icon" && newval.indexOf("url") > -1) {
        this.setBackgroundImage(newval);
      }
    }
    setBackgroundImage(val) {
      this.style.backgroundImage = val;
    }
  };
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Icon.prototype, "icon", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Icon.prototype, "color", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Icon.prototype, "size", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], Icon.prototype, "button", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], Icon.prototype, "disabled", 2);
  Icon = __decorateClass([
    e4("air-icon")
  ], Icon);

  // src/elements/card/card.styles.scss
  var styles2 = i`:host {
  display: flex;
  flex-direction: column;
  flex: 1;
  border-radius: var(--border-radius);
  box-sizing: border-box;
  overflow: hidden;
  margin-bottom: 1rem;
  /* css properties */
  --body-gap: var(--spacing-m);
  --header-gap: var(--spacing-m);
  --functions-gap: var(--spacing-m);
  --footer-gap: var(--spacing-m);
}

:host(:not([flat])) {
  background-color: rgb(var(--base-3));
  box-shadow: var(--shadow-1);
  padding: var(--spacing-l);
}

/* header */
slot,
.header,
.top {
  display: flex;
  overflow: auto;
  justify-content: space-between;
}

.header,
slot[name=functions] {
  height: max-content;
}

.header {
  flex: 1;
}

.top:not(.empty) {
  padding-bottom: var(--spacing-l);
}

slot[name=footer]:not(.empty) {
  padding-top: var(--spacing-l);
}

.label {
  flex: 1;
  display: flex;
  gap: var(--spacing-s);
}

.label p {
  font: var(--header-1);
  color: var(--text-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: unset;
}

/* slots */
slot[name=functions] {
  gap: var(--functions-gap);
}

slot[name=header] {
  gap: var(--header-gap);
}

slot:not([name]) {
  gap: var(--spacing-m);
}

slot[name=header],
slot[name=functions],
slot[name=footer] {
  align-items: center;
}

/* content */
slot:not([name]) {
  flex: 1;
  width: 100%;
  padding: 0 var(--spacing-l);
  margin-right: calc(var(--spacing-l) * -1);
  margin-left: calc(var(--spacing-l) * -1);
  gap: var(--body-gap);
}

:host([flex-direction=column]) slot:not([name]),
.header {
  flex-direction: column;
}

/* footer */
slot[name=footer] {
  justify-content: flex-end;
  gap: var(--footer-gap);
}

/* image */
.image {
  width: calc(100% + 32px);
  margin: calc(var(--spacing-l) * -1) calc(var(--spacing-l) * -1) var(--spacing-l) calc(var(--spacing-l) * -1);
}`;
  var card_styles_default = styles2;

  // src/elements/card/card.ts
  var AirCard = class extends s4 {
    constructor() {
      super(...arguments);
      this.flexDirection = "column";
      this.emptyHeader = true;
      this.emptyFunctions = true;
      this.emptyFooter = true;
    }
    static get styles() {
      return card_styles_default;
    }
    render() {
      return y`
      ${this.image ? y` <img class="image" alt="${this.label}" title="${this.label}" src="${this.image}" /> ` : ""}
      <div
        class="top ${this.emptyHeader && this.emptyFunctions && !this.label && !this.icon ? "empty" : ""}"
      >
        <div class="header">
          ${this.label || this.icon ? y`
                <div class="label">
                  ${this.icon ? y` <air-icon icon="${this.icon}"></air-icon> ` : ""}
                  <air-text size="card-title">${this.label}</air-text>
                </div>
                ${!this.emptyHeader && (this.label || this.icon) ? y` <div style="margin-top: var(--spacing-l)"></div> ` : ""}
              ` : ""}
          <slot
            name="header"
            @slotchange="${(e7) => this.emptyHeader = e7.target.assignedNodes().length === 0}"
            class="${this.emptyHeader ? "empty" : ""}"
          ></slot>
        </div>
        <slot
          name="functions"
          @slotchange="${(e7) => this.emptyFunctions = e7.target.assignedNodes().length === 0}"
        ></slot>
      </div>
      <slot></slot>
      <slot
        name="footer"
        @slotchange="${(e7) => this.emptyFooter = e7.target.assignedNodes().length === 0}"
        class="${this.emptyFooter ? "empty" : ""}"
      ></slot>
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
      super.attributeChangedCallback(name, oldval, newval);
      this.dispatchEvent(new Event(`${name}-changed`));
    }
  };
  __decorateClass([
    e5({ type: String, reflect: true })
  ], AirCard.prototype, "label", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], AirCard.prototype, "icon", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], AirCard.prototype, "image", 2);
  __decorateClass([
    e5({ type: String, reflect: true, attribute: "flex-direction" })
  ], AirCard.prototype, "flexDirection", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], AirCard.prototype, "flat", 2);
  __decorateClass([
    t3()
  ], AirCard.prototype, "emptyHeader", 2);
  __decorateClass([
    t3()
  ], AirCard.prototype, "emptyFunctions", 2);
  __decorateClass([
    t3()
  ], AirCard.prototype, "emptyFooter", 2);
  AirCard = __decorateClass([
    e4("air-card")
  ], AirCard);

  // src/elements/accordion/accordion.styles.scss
  var styles3 = i`:host {
  /* css properties */
  --body-gap: var(--spacing-m);
  --header-gap: var(--spacing-m);
  --functions-gap: var(--spacing-m);
  --footer-gap: var(--spacing-m);
}

:host(:not([expanded])) air-card {
  cursor: pointer;
}

air-card {
  padding: var(--spacing-s) var(--spacing-l);
  --body-gap: inherit;
  --header-gap: inherit;
  --functions-gap: inherit;
  --footer-gap: inherit;
}

slot:not([name]) {
  transition: var(--transition-1);
  display: inherit;
  flex-direction: inherit;
  gap: inherit;
}

slot[name=footer] {
  justify-content: flex-end;
}

/* expanded */
:host([expanded]) slot:not([name]) {
  margin-top: var(--spacing-l);
}

:host(:not([expanded])) slot:not([name]) {
  max-height: 0px;
  opacity: 0;
  overflow: hidden;
}

:host([expanded]) .expand {
  transform: rotate(180deg);
}

.header {
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex: 1;
  justify-content: space-between;
}

.icon {
  margin-right: var(--spacing-s);
}

slot[name=header] p {
  font: var(--header-1);
  color: var(--text-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: unset;
  flex: 1;
}

/* disabled */
:host([disabled]) .header {
  opacity: 0.2;
}

:host([disabled]) air-card {
  pointer-events: none;
}`;
  var accordion_styles_default = styles3;

  // src/elements/accordion/accordion.ts
  var AirAccordion = class extends s4 {
    constructor() {
      super(...arguments);
      this.label = "Label";
      this.emptyHeader = true;
      this.emptyFunctions = true;
      this.emptyBody = true;
      this.emptyFooter = true;
    }
    static get styles() {
      return accordion_styles_default;
    }
    render() {
      return y`
      <air-card
        @click="${() => !this.expanded ? this.expanded = true : ""}"
      >
        <slot
          name="header"
          slot="header"
          @click="${(e7) => this.handleCollapse(e7)}"
        >
          <div class="header">
            ${this.icon ? y` <air-icon class="icon" icon="${this.icon}"></air-icon> ` : ""}
            <air-text size="card-title" display="block">${this.label}</air-text>
            <air-icon
              button
              class="expand"
              icon="keyboard_arrow_down"
            ></air-icon>
          </div>
        </slot>
        <slot name="functions" slot="functions"></slot>
        <slot></slot>
        ${this.expanded ? y`
              <slot
                name="footer"
                slot="${this.emptyFooter ? "hidden" : "footer"}"
                @slotchange="${(e7) => this.emptyFooter = e7.target.assignedNodes().length === 0}"
              ></slot>
            ` : ""}
      </air-card>
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
      super.attributeChangedCallback(name, oldval, newval);
      this.dispatchEvent(new Event(`${name}-changed`));
    }
    connectedCallback() {
      super.connectedCallback();
      setTimeout(() => {
        var _a, _b, _c;
        const topNode = (_c = (_b = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector("air-card")) == null ? void 0 : _b.shadowRoot) == null ? void 0 : _c.querySelector(".top");
        if (topNode) {
          topNode.style.padding = "0";
        }
      }, 0);
    }
    handleCollapse(e7) {
      if (this.expanded) {
        this.expanded = false;
        e7.stopPropagation();
      }
    }
  };
  __decorateClass([
    e5({ type: String, reflect: true })
  ], AirAccordion.prototype, "label", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], AirAccordion.prototype, "icon", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], AirAccordion.prototype, "expanded", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], AirAccordion.prototype, "disabled", 2);
  __decorateClass([
    t3()
  ], AirAccordion.prototype, "emptyHeader", 2);
  __decorateClass([
    t3()
  ], AirAccordion.prototype, "emptyFunctions", 2);
  __decorateClass([
    t3()
  ], AirAccordion.prototype, "emptyBody", 2);
  __decorateClass([
    t3()
  ], AirAccordion.prototype, "emptyFooter", 2);
  AirAccordion = __decorateClass([
    e4("air-accordion")
  ], AirAccordion);

  // src/elements/app-bar/app-bar.styles.scss
  var styles4 = i`:host {
  z-index: 3;
  height: calc(24px + var(--spacing-l) * 2);
  padding: 0 var(--spacing-l);
  display: flex;
  align-items: center;
  overflow: hidden;
  background-color: rgb(var(--base-0));
  box-shadow: var(--shadow-1);
  transition: var(--transition-1);
  gap: calc(var(--spacing-l) * 2);
  /* css properties */
  --functions-gap: var(--spacing-m);
  position: sticky;
  top: 0;
}

.logo {
  height: 24px;
}

.label {
  font: var(--header-1);
  color: var(--text-1);
  max-width: 320px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* mobile */
:host[mobile] {
  gap: var(--spacing-l);
}

:host([mobile]) .label {
  flex: 1;
  max-width: unset;
  text-align: center;
}

/* slots */
slot {
  display: flex;
  align-items: center;
}

slot:not([name]) {
  flex: 1;
}

slot[name=functions] {
  gap: var(--functions-gap);
}

::slotted(kor-tabs) {
  border-bottom: unset;
}

slot[name=right],
slot[name=left] {
  min-width: 24px;
}

slot[name=right] {
  margin-left: auto;
}`;
  var app_bar_styles_default = styles4;

  // src/elements/app-bar/app-bar.ts
  var AppBar = class extends s4 {
    static get styles() {
      return app_bar_styles_default;
    }
    render() {
      return y`
      ${!this.mobile ? y`
            ${this.logo ? y`
                  <img
                    class="logo"
                    alt="${this.label}"
                    title="${this.label}"
                    src="${this.logo}"
                    @click="${() => this.handleLogoClick()}"
                  />
                ` : ""}
            ${this.label ? y` <div class="label">${this.label}</div> ` : ""}
            <slot></slot>
            <slot name="functions"></slot>
          ` : y`
            <slot name="left"></slot>
            ${this.label ? y` <div class="label">${this.label}</div> ` : ""}
            <slot name="right"></slot>
          `}
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
      super.attributeChangedCallback(name, oldval, newval);
      this.dispatchEvent(new Event(`${name}-changed`));
    }
    handleLogoClick() {
      this.dispatchEvent(new Event("logo-clicked"));
    }
  };
  __decorateClass([
    e5({ type: String, reflect: true })
  ], AppBar.prototype, "label", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], AppBar.prototype, "logo", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], AppBar.prototype, "mobile", 2);
  if (!window.customElements.get("air-app-bar")) {
    window.customElements.define("air-app-bar", AppBar);
  }

  // src/elements/text/text.styles.scss
  var styles5 = i`:host {
  color: var(--text-1);
  transition: var(--transition-1);
}

:host([size=body-1]) {
  font: var(--body-1);
}

:host([size=body-2]) {
  font: var(--body-2);
}

:host([size=header-1]) {
  font: var(--header-1);
}

:host([size=header-2]) {
  font: var(--header-2);
}

:host([size=label]) {
  font: var(--label);
}

:host([size=xs]) {
  font-size: var(--font-xs);
}

:host([display=block]) {
  display: block;
}`;
  var text_styles_default = styles5;

  // src/elements/text/text.ts
  var AirText = class extends s4 {
    constructor() {
      super(...arguments);
      this.size = "label";
      this.display = "inline";
    }
    static get styles() {
      return text_styles_default;
    }
    render() {
      return y`<slot></slot>`;
    }
    attributeChangedCallback(name, oldval, newval) {
      super.attributeChangedCallback(name, oldval, newval);
      this.dispatchEvent(new Event(`${name}-changed`));
      if (name == "color" && this.color) {
        this.style.color = this.color;
      }
    }
  };
  __decorateClass([
    e5({ type: String, reflect: true })
  ], AirText.prototype, "size", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], AirText.prototype, "display", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], AirText.prototype, "color", 2);
  AirText = __decorateClass([
    e4("air-text")
  ], AirText);

  // src/elements/avatar/avatar.styles.scss
  var styles6 = i`:host,
.image {
  display: flex;
  align-items: center;
}

.text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  margin-left: var(--spacing-s);
  overflow: hidden;
}

.label,
.info {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.label {
  font-weight: bold;
}

.image {
  overflow: hidden;
  justify-content: center;
  font: var(--header-2);
  color: var(--text-1);
  height: 32px;
  width: 32px;
  border-radius: 50%;
  background: rgba(var(--neutral-1), 0.1);
}

.image > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

:host-context(air-app-bar) {
  max-width: 288px;
}

/* condensed */
:host([condensed]) .image {
  height: 24px;
  width: 24px;
}`;
  var avatar_styles_default = styles6;

  // src/elements/avatar/avatar.ts
  var Avatar = class extends s4 {
    static get styles() {
      return avatar_styles_default;
    }
    render() {
      return y`
      <!-- image -->
      <div class="image">
        ${this.image ? y` <img src="${this.image}" alt="${this.info}" title="${this.label}" /> ` : y`
              ${this.label ? y` ${this.getInitials(this.label)} ` : y` <air-icon icon="person"></air-icon> `}
            `}
      </div>
      <!-- text -->
      ${this.label || this.info ? y`
            <div class="text">
              ${this.label ? y`<air-text size="body-2" class="label"
                    >${this.label}</air-text
                  >` : ""}
              ${this.info ? y`<air-text
                    size="body-2"
                    class="info"
                    color="var(--text-2)"
                    >${this.info}</air-text
                  >` : ""}
            </div>
          ` : ""}
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
      super.attributeChangedCallback(name, oldval, newval);
      this.dispatchEvent(new Event(`${name}-changed`));
    }
    getInitials(label) {
      const initials = label.match(/\b\w/g) || [];
      return (initials.shift() || "") + (initials.pop() || "").toUpperCase();
    }
  };
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Avatar.prototype, "label", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Avatar.prototype, "info", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Avatar.prototype, "image", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], Avatar.prototype, "condensed", 2);
  Avatar = __decorateClass([
    e4("air-avatar")
  ], Avatar);

  // src/elements/badge/badge.styles.scss
  var styles7 = i`:host {
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  width: max-content;
  min-width: 16px;
  padding: 0 4px;
  border-radius: 8px;
  background: rgb(var(--functional-blue));
}

:host(:not([label])) {
  padding: 4px;
  min-width: unset;
}

air-text {
  color: white;
  font-weight: bold;
}

/* status */
:host([status]) {
  background: transparent;
  padding: 0px;
}

.status-icon[icon=cancel] {
  color: rgb(var(--functional-red));
}

.status-icon[icon=error] {
  color: rgb(var(--functional-yellow));
}

.status-icon[icon=check_circle] {
  color: rgb(var(--functional-green));
}`;
  var badge_styles_default = styles7;

  // src/elements/badge/badge.ts
  var Badge = class extends s4 {
    static get styles() {
      return badge_styles_default;
    }
    render() {
      return y`
      ${!this.status ? y`
            ${this.label ? y`
                  <air-text size="body-2">
                    ${this.label > 999 ? y` 999+ ` : y` ${this.label} `}
                  </air-text>
                ` : ""}
          ` : y`
            <!-- status -->
            ${this.status ? y`
                  <air-icon
                    class="status-icon"
                    size="s"
                    icon="${this.getStatusIcon()}"
                  ></air-icon>
                ` : ""}
          `}
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
      super.attributeChangedCallback(name, oldval, newval);
      this.dispatchEvent(new Event(`${name}-changed`));
    }
    getStatusIcon() {
      let icon;
      switch (this.status) {
        case "error":
          icon = "cancel";
          break;
        case "warning":
          icon = "error";
          break;
        case "success":
          icon = "check_circle";
          break;
      }
      return icon;
    }
  };
  __decorateClass([
    e5({ type: Number, reflect: true })
  ], Badge.prototype, "label", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Badge.prototype, "status", 2);
  Badge = __decorateClass([
    e4("air-badge")
  ], Badge);

  // src/elements/breadcrumbs/breadcrumbs.ts
  var AirBreadCrumbs = class extends s4 {
    static get styles() {
      return [
        i`
        :host {
          display: flex;
          width: 100%;
          height: max-content;
        }
      `
      ];
    }
    render() {
      return y` <slot></slot> `;
    }
  };
  AirBreadCrumbs = __decorateClass([
    e4("air-breadcrumbs")
  ], AirBreadCrumbs);

  // src/elements/breadcrumbs/breadcrumb-item.styles.scss
  var styles8 = i`:host {
  display: flex;
  align-items: center;
}

air-icon {
  pointer-events: none;
  margin: 0 var(--spacing-xs);
}

air-text {
  color: var(--text-2);
  cursor: pointer;
  font-weight: bold;
}

:host([active]) air-text {
  color: var(--text-1);
  font-weight: 600;
}

/* hover inputs */
@media (hover: hover) {
  air-text:hover:not(:active) {
    color: var(--text-1);
  }
}`;
  var breadcrumb_item_styles_default = styles8;

  // src/elements/breadcrumbs/breadcrumb-item.ts
  var AirBreadcrumbItem = class extends s4 {
    constructor() {
      super(...arguments);
      this.label = "Label";
    }
    static get styles() {
      return breadcrumb_item_styles_default;
    }
    render() {
      return y`
      ${!this.firstItem() ? y`
            <air-icon
              icon="keyboard_arrow_right"
              color="var(--text-2)"
            ></air-icon>
          ` : ""}
      <air-text>${this.label}</air-text>
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
      super.attributeChangedCallback(name, oldval, newval);
      this.dispatchEvent(new Event(`${name}-changed`));
    }
    firstItem() {
      var _a;
      let firstItem, children;
      children = Array.prototype.slice.call((_a = this.parentElement) == null ? void 0 : _a.children);
      firstItem = children.indexOf(this) == 0;
      return firstItem;
    }
  };
  __decorateClass([
    e5({ type: String, reflect: true })
  ], AirBreadcrumbItem.prototype, "label", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], AirBreadcrumbItem.prototype, "active", 2);
  AirBreadcrumbItem = __decorateClass([
    e4("air-breadcrumb-item")
  ], AirBreadcrumbItem);

  // src/elements/button/button.styles.scss
  var styles9 = i`:host {
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-1);
  display: flex;
  gap: var(--spacing-xs);
  height: max-content;
  width: max-content;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition-1);
  justify-content: center;
  user-select: none;
  white-space: nowrap;
  text-overflow: ellipsis;
}

:host([label]) {
  min-width: calc(24px + var(--spacing-l) * 2);
  max-width: 160px;
  padding: 0.25rem 1rem;
}

:host([variant=tertiary][label]) {
  padding: 3px 11px;
}

:host(:not([label])) {
  padding: var(--spacing-xs) var(--spacing-s);
}

:host([variant=tertiary]:not([label])) {
  padding: 3px;
}

/* idle */
:host([variant=primary]) {
  background-color: rgb(var(--accent-1));
}

:host([variant=secondary]) {
  background-color: rgba(var(--neutral-1), 0.1);
}

:host([color=tertiary]) {
  border-width: 1px;
  border-style: solid;
  border-color: rgba(var(--neutral-1), 0.25);
}

/* disabled */
:host([disabled]) {
  pointer-events: none;
  opacity: 0.2;
}

/* text and icon colors */
air-icon {
  color: unset;
}

:host([variant=primary]) {
  color: rgba(255, 255, 255, 0.9);
}

/* hover inputs */
@media (hover: hover) {
  :host([variant=primary]:not(:active):hover) {
    background-color: rgb(var(--accent-1b));
  }
  :host([variant=secondary]:not(:active):hover) {
    background-color: rgba(var(--neutral-1), 0.15);
  }
  :host([variant=tertiary]:not(:active):hover) {
    border-color: rgba(var(--neutral-1), 0.3);
    background-color: rgba(var(--neutral-1), 0.05);
  }
}`;
  var button_styles_default = styles9;

  // src/elements/button/button.ts
  var AirButton = class extends s4 {
    constructor() {
      super(...arguments);
      this.variant = "primary";
    }
    static get styles() {
      return button_styles_default;
    }
    render() {
      return y`
          <slot name="icon">
            ${this.icon ? y` <air-icon icon="${this.icon}"></air-icon> ` : ""}
          </slot>
          <slot> ${this.label ? y` ${this.label} ` : ""}</slot>
        `;
    }
    attributeChangedCallback(name, oldval, newval) {
      super.attributeChangedCallback(name, oldval, newval);
      this.dispatchEvent(new Event(`${name}-changed`));
    }
  };
  __decorateClass([
    e5({ type: String, reflect: true })
  ], AirButton.prototype, "label", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], AirButton.prototype, "icon", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], AirButton.prototype, "variant", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], AirButton.prototype, "disabled", 2);
  AirButton = __decorateClass([
    e4("air-button")
  ], AirButton);

  // src/elements/divider/divider.styles.scss
  var styles10 = i`:host([orientation=horizontal]) {
  width: 100%;
}

:host([orientation=vertical]) {
  height: 100%;
}

.line {
  background: rgba(var(--neutral-1), 0.25);
}

:host([orientation=horizontal]) .line {
  height: 1px;
  width: 100%;
}

:host([orientation=vertical]) .line {
  width: 1px;
  height: 100%;
}

/* spacing */
:host([spacing=s][orientation=horizontal]) {
  padding: var(--spacing-s) 0;
}

:host([spacing=m][orientation=horizontal]) {
  padding: var(--spacing-l) 0;
}

:host([spacing=l][orientation=horizontal]) {
  padding: calc(var(--spacing-l) * 2) 0;
}

:host([spacing=s][orientation=vertical]) {
  padding: 0 var(--spacing-s);
}

:host([spacing=m][orientation=vertical]) {
  padding: 0 var(--spacing-l);
}

:host([spacing=l][orientation=vertical]) {
  padding: 0 calc(var(--spacing-s) * 2);
}`;
  var divider_styles_default = styles10;

  // src/elements/divider/divider.ts
  var Divider = class extends s4 {
    constructor() {
      super(...arguments);
      this.spacing = "m";
      this.orientation = "horizontal";
    }
    static get styles() {
      return divider_styles_default;
    }
    render() {
      return y`<div class="line"></div>`;
    }
    attributeChangedCallback(name, oldval, newval) {
      super.attributeChangedCallback(name, oldval, newval);
      this.dispatchEvent(new Event(`${name}-changed`));
    }
  };
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Divider.prototype, "spacing", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Divider.prototype, "orientation", 2);
  Divider = __decorateClass([
    e4("air-divider")
  ], Divider);

  // src/elements/drawer/drawer.scss
  var styles11 = i`:host {
  transition: var(--transition-1), 0s top, 0s left;
  position: fixed;
  opacity: 1;
  z-index: 5;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  /* css properties */
  --body-gap: var(--spacing-m);
  --header-gap: var(--spacing-m);
  --functions-gap: var(--spacing-m);
  --footer-gap: var(--spacing-m);
}

:host(:not([visible])) {
  opacity: 0;
  pointer-events: none;
}

air-card {
  position: absolute;
  border-radius: 0px;
  background-color: rgb(var(--base-3));
  box-shadow: var(--shadow-1);
  transition: 0.2s all ease-out, 0s top, 0s left;
  --body-gap: inherit;
  --header-gap: inherit;
  --functions-gap: inherit;
  --footer-gap: inherit;
}

/* position */
:host([position=left]) air-card {
  left: 0;
}

:host([position=right]) air-card {
  right: 0;
}

:host([position=top]) air-card {
  top: 0;
}

:host([position=bottom]) air-card {
  bottom: 0;
}

/* animations */
:host([position=left]:not([visible])) air-card {
  margin-left: -40px;
}

:host([position=right]:not([visible])) air-card {
  margin-right: -40px;
}

:host([position=top]:not([visible])) air-card {
  margin-top: -40px;
}

:host([position=bottom]:not([visible])) air-card {
  margin-bottom: -40px;
}`;
  var drawer_default = styles11;

  // src/elements/drawer/drawer.ts
  var airDrawer = class extends s4 {
    constructor() {
      super(...arguments);
      this.position = "left";
      this.height = "320px";
      this.width = "320px";
      this.flexDirection = "column";
      this.emptyHeader = true;
      this.emptyFunctions = true;
      this.emptyFooter = true;
    }
    static get styles() {
      return drawer_default;
    }
    render() {
      return y`
      <air-card
        @click="${(e7) => e7.stopPropagation()}"
        style="height: ${this.getCardSize().height}; width: ${this.getCardSize().width}; max-height: ${this.getCardSize().height}; max-width: ${this.getCardSize().width}"
        .label="${this.label}"
        .icon="${this.icon}"
        flex-direction="${this.flexDirection}"
      >
        <slot
          name="header"
          slot="${this.emptyHeader ? "hidden" : "header"}"
          @slotchange="${(e7) => this.emptyHeader = e7.target.assignedNodes().length === 0}"
        ></slot>
        <slot name="functions" slot="functions">
          ${!this.sticky ? y`
                <air-icon
                  button
                  icon="close"
                  @click="${() => this.visible = false}"
                ></air-icon>
              ` : ""}
        </slot>
        <slot></slot>
        <slot
          name="footer"
          slot="${this.emptyFooter ? "hidden" : "footer"}"
          @slotchange="${(e7) => this.emptyFooter = e7.target.assignedNodes().length === 0}"
        ></slot>
      </air-card>
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
      super.attributeChangedCallback(name, oldval, newval);
      this.dispatchEvent(new Event(`${name}-changed`));
      if (name === "visible" && this.visible) {
        this.addEventListener(
          "click",
          () => !this.sticky ? this.visible = false : ""
        );
      }
    }
    getCardSize() {
      let size = {
        height: void 0,
        width: void 0
      };
      switch (this.position) {
        case "left":
        case "right":
          size.height = "100%";
          size.width = this.width;
          break;
        case "top":
        case "bottom":
          size.height = this.height;
          size.width = "100%";
          break;
      }
      return size;
    }
  };
  __decorateClass([
    e5({ type: String, reflect: true })
  ], airDrawer.prototype, "label", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], airDrawer.prototype, "icon", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], airDrawer.prototype, "position", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], airDrawer.prototype, "height", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], airDrawer.prototype, "width", 2);
  __decorateClass([
    e5({ type: String, reflect: true, attribute: "flex-direction" })
  ], airDrawer.prototype, "flexDirection", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], airDrawer.prototype, "visible", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], airDrawer.prototype, "sticky", 2);
  __decorateClass([
    t3()
  ], airDrawer.prototype, "emptyHeader", 2);
  __decorateClass([
    t3()
  ], airDrawer.prototype, "emptyFunctions", 2);
  __decorateClass([
    t3()
  ], airDrawer.prototype, "emptyFooter", 2);
  airDrawer = __decorateClass([
    e4("air-drawer")
  ], airDrawer);

  // src/elements/form/checkbox.styles.scss
  var styles12 = i`:host {
  display: flex;
  cursor: pointer;
  position: relative;
  align-items: center;
}

input {
  width: 23px;
  height: 23px;
  appearance: none;
  border-radius: 3px;
  position: relative;
  z-index: 1;
}
input:focus {
  box-shadow: 0 0 0 1px blue, 0 0 0 3px blueviolet;
}

/* box */
.box {
  position: absolute;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  margin: 4px;
  border-radius: 2px;
  box-sizing: border-box;
  border: 2px solid rgba(var(--neutral-1), 0.25);
  transition: var(--transition-1);
}

input:focus + .box {
  box-shadow: 0 0 0 1px blue, 0 0 0 3px blueviolet;
}

:host([checked]) .box {
  border-color: transparent;
  background: rgb(var(--accent-1));
}

/* label */
air-text {
  flex: 1;
  margin-left: var(--spacing-s);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
  user-select: none;
}

/* disabled */
:host([disabled]) {
  pointer-events: none;
  opacity: 0.2;
}

/* hover inputs */
@media (hover: hover) {
  :host(:hover:not([active]):not(:active)) .box {
    border-color: rgba(var(--neutral-1), 0.3);
  }
}`;
  var checkbox_styles_default = styles12;

  // src/elements/form/checkbox.ts
  var AirCheckbox = class extends s4 {
    static get styles() {
      return checkbox_styles_default;
    }
    render() {
      return y`
      <input
        type="checkbox"
        ?checked="${this.checked}"
        ?readonly="${this.disabled}"
        .value="${this.label}"
        .name="${this.label}"
        @change="${this.handleChange}"
      />
      <div class="box" tabindex="0" @keyup="${this.toggle}">
        ${this.checked ? y` <air-icon icon="check" size="s" color="white"></air-icon> ` : ""}
      </div>
      ${this.label ? y` <air-text>${this.label}</air-text> ` : ""}
    `;
    }
    toggle(keyEvent) {
      console.log(keyEvent);
      if (keyEvent.code === "Space") {
        this.checked = !this.checked;
      }
    }
    attributeChangedCallback(name, oldval, newval) {
      super.attributeChangedCallback(name, oldval, newval);
      this.dispatchEvent(new Event(`${name}-changed`));
    }
    connectedCallback() {
      super.connectedCallback();
      this.addEventListener("click", () => {
        this.checked = !this.checked;
      });
    }
    handleChange() {
      this.dispatchEvent(
        new CustomEvent("change", {
          bubbles: true,
          composed: true
        })
      );
    }
  };
  __decorateClass([
    e5({ type: String, reflect: true })
  ], AirCheckbox.prototype, "label", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], AirCheckbox.prototype, "checked", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], AirCheckbox.prototype, "disabled", 2);
  AirCheckbox = __decorateClass([
    e4("air-checkbox")
  ], AirCheckbox);

  // ../../node_modules/lit-html/directives/if-defined.js
  var l5 = (l6) => null != l6 ? l6 : b;

  // src/elements/form/input.styles.scss
  var styles13 = i`:host {
  display: flex;
  align-items: center;
  min-height: 40px;
  border-width: 0px 0px 1px 0px;
  border-style: solid;
  border-color: rgba(var(--neutral-1), 0.2);
  border-radius: 2px;
  box-sizing: border-box;
  padding: 0 8px;
  width: 100%;
  overflow: visible;
  background-color: rgba(var(--neutral-1), 0.05);
  position: relative;
}

:host,
.label,
input {
  transition: var(--transition-1);
}

.center {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

input {
  background: none;
  border: none;
  box-shadow: none;
  padding: 0px;
  outline: none;
  -webkit-appearance: none;
  font: var(--body-1);
  color: var(--text-1);
  max-height: 16px;
}
input:focus {
  outline: 3px solid rgb(var(--accent-1));
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button,
input[type=search]::-webkit-search-decoration,
input[type=search]::-webkit-search-cancel-button,
input[type=search]::-webkit-search-results-button,
input[type=search]::-webkit-search-results-decoration {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

/* active */
:host([active]) {
  border-color: rgb(var(--accent-1));
}

:host([active]) .label {
  color: rgb(var(--accent-1));
}

/* disabled */
:host([disabled]) {
  opacity: 0.2;
}

:host([disabled]),
:host([readonly]) {
  pointer-events: none;
}

/* readonly */
:host([readonly]) {
  background: transparent;
}

/* condensed */
:host([condensed]) {
  min-height: 32px;
}

:host([condensed][value]:not([value=""])) .label,
:host([condensed][active]) .label {
  display: none;
}

/* icon */
:host([icon]) .icon {
  margin-right: var(--spacing-s);
}

/* label */
.label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font: var(--body-1);
  color: var(--text-2);
  pointer-events: none;
}

:host([value]:not([value=""])) .label,
:host([active]) .label {
  font: var(--body-2);
}

:host(:not([value]):not([active]):not([type=date])) input,
:host([value=""]:not([active]):not([type=date])) input {
  max-height: 0px;
}

input,
.label {
  line-height: 16px;
}

/* clear */
.clear-icon {
  transition: var(--transition-1), 0.1s opacity ease-out 0.1s;
}

:host(:not(:hover):not([active])) .clear-icon {
  transition: var(--transition-1), 0.1s width ease-out 0.1s, 0.1s margin ease-out 0.1s;
  font-size: 0;
  max-width: 0px;
  max-height: 0px;
  opacity: 0;
  margin-left: 0;
}

/* status */
.clear-icon,
.status-icon,
.increment-icon,
.select-icon,
slot[name=functions]::slotted(*) {
  margin-left: var(--spacing-s);
}

.status-icon[icon=cancel] {
  color: rgb(var(--functional-red));
}

.status-icon[icon=error] {
  color: rgb(var(--functional-yellow));
}

.status-icon[icon=check_circle] {
  color: rgb(var(--functional-green));
}

/* select */
:host([type=select]),
:host([type=select]) * {
  cursor: pointer !important;
}

:host([type=text]) .center,
:host([type=number]) .center {
  cursor: text;
}

:host([active]) .select-icon {
  transform: rotate(180deg);
}

.select-menu {
  position: fixed;
  max-height: 240px;
  z-index: 3;
  padding: 0px var(--spacing-l);
  background-color: rgb(var(--base-4));
}

slot:not([name]) {
  display: block;
  margin: 0 calc(var(--spacing-s) * -1);
}

slot:not([name])::slotted(*) {
  margin-bottom: 0;
}

/* date */
.date-icon {
  margin-left: -24px;
  pointer-events: none;
}

:host([type=date]) ::-webkit-calendar-picker-indicator {
  background: unset;
}

/* hover inputs */
@media (hover: hover) {
  :host(:hover:not([active])) {
    border-color: rgba(var(--neutral-1), 0.4);
  }
}`;
  var input_styles_default = styles13;

  // src/elements/form/input.ts
  var AirInput = class extends s4 {
    constructor() {
      super();
      this.type = "text";
      this.autofocus = false;
      this.step = 1;
      this.addEventListener("click", (e7) => {
        var _a, _b;
        if (this.active && this.type === "select") {
          this.closeSelectMenu(e7);
        } else if (!this.active) {
          this.active = true;
          if (this.type !== "select" && !this.disabled && !this.readonly) {
            (_b = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector("input")) == null ? void 0 : _b.focus();
          }
        }
      });
    }
    static get styles() {
      return input_styles_default;
    }
    render() {
      return y`
      ${this.icon ? y` <air-icon class="icon" icon="${this.icon}"></air-icon> ` : ""}
      <div class="center">
        ${this.label ? y` <label class="label">${this.label}</label> ` : ""}
        <input
          .type="${this.type}"
          .value="${this.value ? this.value : ""}"
          .step="${this.step.toString()}"
          ?autofocus="${this.autofocus}"
          ?readonly="${this.readonly || this.disabled || this.type === "select"}"
          min="${l5(this.min)}"
          max="${l5(this.max)}"
          pattern="${l5(this.pattern)}"
          name="${l5(this.name)}"
          @input="${this.handleChange}"
          @focus="${() => this.type !== "select" && !this.active ? this.active = true : ""}"
          @blur="${this.handleBlur}"
        />
      </div>
      <!-- select -->
      ${this.type === "select" ? y`
            <air-icon
              button
              class="select-icon"
              icon="arrow_drop_down"
            ></air-icon>
            ${this.active ? y`
                  <air-card
                    @click="${(e7) => {
        this.active = false;
        e7.stopPropagation();
      }}"
                    @wheel="${(e7) => e7.stopPropagation()}"
                    class="select-menu"
                    .style="
                  top: ${this.getMenuStyles().top};
                  left: ${this.getMenuStyles().left};
                  width: ${this.getMenuStyles().width};
                "
                  >
                    <slot @slotchange="${this.handleItems}"></slot>
                  </air-card>
                ` : ""}
          ` : ""}
      <!-- date -->
      ${this.type === "date" ? y` <air-icon button class="date-icon" icon="event"></air-icon> ` : ""}
      <!-- clear -->
      ${!this.disabled && !this.readonly && this.value && !this.noClear && this.type !== "select" ? y`
            <air-icon
              button
              class="clear-icon"
              icon="close"
              @click="${this.handleClear}"
            ></air-icon>
          ` : ""}
      <!-- status -->
      ${this.status ? y`
            <air-icon
              class="status-icon"
              .icon="${this.getStatusIcon()}"
            ></air-icon>
          ` : ""}
      <!-- number increment -->
      ${this.type === "number" && !this.readonly ? y`
            <air-icon
              button
              class="increment-icon"
              icon="keyboard_arrow_left"
              @click="${() => this.handleIncrement("left")}"
            ></air-icon>
            <air-icon
              button
              class="increment-icon"
              icon="keyboard_arrow_right"
              @click="${() => this.handleIncrement("right")}"
            ></air-icon>
          ` : ""}
      <!-- functions slot -->
      <slot name="functions"></slot>
    `;
    }
    handleChange(e7) {
      this.value = e7.target.value;
      this.dispatchEvent(
        new CustomEvent("change", {
          bubbles: true,
          composed: true
        })
      );
    }
    handleClear() {
      this.value = void 0;
      this.removeAttribute("value");
      this.dispatchEvent(
        new CustomEvent("change", {
          bubbles: true,
          composed: true
        })
      );
    }
    handleBlur(e7) {
      if (this.type === "number") {
        this.validateMinMax(e7.target.value);
      }
      if (this.type !== "select") {
        this.active = false;
      }
    }
    handleIncrement(dir) {
      if (dir === "left") {
        this.validateMinMax(
          parseInt(this.value ? this.value : this.min ? this.min : "0") - this.step
        );
      } else if (dir === "right") {
        this.validateMinMax(
          parseInt(this.value ? this.value : this.min ? this.min : "0") + this.step
        );
      }
    }
    handleItems(e7) {
      const items = e7.target.assignedNodes();
      items.forEach((el) => {
        if (el.tagName === "AIR-MENU-ITEM") {
          el.addEventListener("active-changed", (e8) => {
            if (e8.target.active) {
              items.forEach((el2) => {
                el2.active = false;
              });
              e8.target.active = true;
              this.value = el.label;
              this.active = false;
            }
          });
        }
      });
    }
    attributeChangedCallback(name, oldval, newval) {
      super.attributeChangedCallback(name, oldval, newval);
      this.dispatchEvent(new Event(`${name}-changed`));
      if (name === "active" && this.active && this.type === "select") {
        this.handleMenu();
      }
    }
    handleMenu() {
      const parent = this.parentElement;
      const closePopover = () => {
        this.active = false;
        parent == null ? void 0 : parent.removeEventListener("wheel", closePopover);
      };
      parent == null ? void 0 : parent.addEventListener("wheel", closePopover);
    }
    closeSelectMenu(e7) {
      if (this.type === "select" && this.active) {
        e7.stopImmediatePropagation();
        this.active = false;
      }
    }
    validateMinMax(val) {
      if (val) {
        if (this.min && val < parseInt(this.min)) {
          this.value = this.min;
        } else if (this.max && val > parseInt(this.max)) {
          this.value = this.max;
        } else {
          this.value = val.toString();
        }
      }
    }
    getStatusIcon() {
      let icon;
      switch (this.status) {
        case "error":
          icon = "cancel";
          break;
        case "warning":
          icon = "error";
          break;
        case "success":
          icon = "check_circle";
          break;
      }
      return icon;
    }
    getMenuStyles() {
      const styles30 = {
        top: `${this.getBoundingClientRect().top + this.clientHeight + 1}px`,
        left: `${this.getBoundingClientRect().left}px`,
        width: `${this.clientWidth}px`
      };
      return styles30;
    }
  };
  __decorateClass([
    e5({ type: String, reflect: true })
  ], AirInput.prototype, "label", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], AirInput.prototype, "icon", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], AirInput.prototype, "value", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], AirInput.prototype, "name", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], AirInput.prototype, "type", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], AirInput.prototype, "status", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], AirInput.prototype, "condensed", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], AirInput.prototype, "active", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], AirInput.prototype, "disabled", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], AirInput.prototype, "readonly", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true, attribute: "no-clear" })
  ], AirInput.prototype, "noClear", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], AirInput.prototype, "autofocus", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], AirInput.prototype, "pattern", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], AirInput.prototype, "min", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], AirInput.prototype, "max", 2);
  __decorateClass([
    e5({ type: Number, reflect: true })
  ], AirInput.prototype, "step", 2);
  AirInput = __decorateClass([
    e4("air-input")
  ], AirInput);

  // src/elements/form/radio.scss
  var styles14 = i`:host {
  display: flex;
  cursor: pointer;
}

input {
  display: none;
}

/* box */
.circle {
  transition: var(--transition-1);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  margin: 4px;
  border-radius: 50%;
  box-sizing: border-box;
  border: 2px solid rgba(var(--neutral-1), 0.25);
}

:host([active]) .circle {
  border-color: transparent;
  border: 5px solid rgb(var(--accent-1));
}

/* label */
air-text {
  flex: 1;
  margin-left: var(--spacing-s);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
}

/* disabled */
:host([disabled]) {
  pointer-events: none;
  opacity: 0.2;
}

/* hover inputs */
@media (hover: hover) {
  :host(:hover:not([active])) .circle {
    border-color: rgba(var(--neutral-1), 0.3);
  }
}`;
  var radio_default = styles14;

  // src/elements/form/radio.ts
  var RadioButton = class extends s4 {
    static get styles() {
      return radio_default;
    }
    render() {
      return y`
      <input
        type="radio"
        ?checked="${this.active}"
        .value="${this.label}"
        .name="${this.label}"
        @change="${this.handleChange}"
      />
      <div class="circle"></div>
      ${this.label ? y` <air-text>${this.label}</air-text> ` : ""}
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
      super.attributeChangedCallback(name, oldval, newval);
      this.dispatchEvent(new Event(`${name}-changed`));
    }
    connectedCallback() {
      super.connectedCallback();
      this.addEventListener("click", () => this.handleActive());
    }
    handleChange() {
      this.dispatchEvent(
        new CustomEvent("change", {
          bubbles: true,
          composed: true
        })
      );
    }
    handleActive() {
      var _a;
      let siblings = (_a = this.parentElement) == null ? void 0 : _a.childNodes;
      siblings == null ? void 0 : siblings.forEach((el) => {
        el.active = false;
      });
      this.active = true;
    }
  };
  __decorateClass([
    e5({ type: String, reflect: true })
  ], RadioButton.prototype, "label", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], RadioButton.prototype, "active", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], RadioButton.prototype, "disabled", 2);
  RadioButton = __decorateClass([
    e4("air-radio")
  ], RadioButton);

  // src/elements/form/slider.scss
  var styles15 = i`.track {
  width: 100%;
  height: 2px;
  margin: var(--spacing-l) 0;
  background-color: rgba(var(--neutral-1), 0.2);
  position: relative;
}

.thumb {
  padding: 10px;
  position: absolute;
  top: -15px;
  margin-left: calc(var(--spacing-l) * -1);
  cursor: pointer;
}

.thumb > div {
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background-color: rgb(var(--accent-1));
  transition: 0.1s all ease-out;
}

.thumb:hover > div {
  background-color: rgb(var(--accent-1b));
}

/* input */
input {
  background: none;
  border: none;
  outline: none;
  -webkit-appearance: none;
  font: var(--body-1);
  color: var(--text-1);
  background-color: rgba(var(--neutral-1), 0.05);
  border-radius: 2px;
  box-sizing: border-box;
  padding: 0 4px;
  width: 40px;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

.label {
  display: flex;
}

.label air-text {
  flex: 1;
}

.label > * + * {
  margin-left: var(--spacing-s);
}`;
  var slider_default = styles15;

  // src/elements/form/slider.ts
  var Slider = class extends s4 {
    constructor() {
      super(...arguments);
      this.value = 50;
      this.min = 0;
      this.max = 100;
      this.step = 1;
    }
    static get styles() {
      return slider_default;
    }
    render() {
      return y`
      ${this.label ? y`
            <div class="label">
              <air-text>${this.label}</air-text>
              ${this.input ? y`
                    <input
                      type="number"
                      .value="${this.value}"
                      @blur="${(e7) => this.handleInput(parseFloat(e7.target.value))}"
                      @keypress="${(e7) => e7.key === "Enter" ? this.handleInput(parseFloat(e7.target.value)) : ""}"
                    />
                  ` : ""}
            </div>
          ` : ""}
      <div class="track">
        <div
          class="thumb"
          @mousedown="${(e7) => this.handleThumbDrag(e7)}"
          @touchstart="${(e7) => this.handleThumbDrag(e7)}"
        >
          <div></div>
        </div>
      </div>
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
      super.attributeChangedCallback(name, oldval, newval);
      this.dispatchEvent(new Event(`${name}-changed`));
      if (name === "value" || name === "min" || name === "max") {
        this.handleThumbPosition();
      }
    }
    firstUpdated() {
      this.handleThumbPosition();
    }
    handleInput(val) {
      if (val >= this.min && val <= this.max) {
        this.value = val;
      } else if (val < this.min) {
        this.value = this.min;
      } else if (val > this.max) {
        this.value = this.max;
      }
    }
    handleThumbPosition() {
      var _a;
      const thumb = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector(".thumb");
      const position = (this.value - this.min) / (this.max - this.min) * 100;
      if (thumb && position >= 0 && position <= 100) {
        thumb.style.left = `${position}%`;
      }
    }
    handleThumbDrag(e7) {
      const trackWidth = this.shadowRoot.querySelector(".track").clientWidth;
      const stepWidth = trackWidth / (this.max - this.min) * this.step;
      let originX = e7.type === "mousedown" ? e7.clientX : e7.touches[0].clientX;
      const getDeltaX = (e8) => {
        e8.preventDefault();
        const eventX = e8.type === "mousemove" ? e8.clientX : e8.touches[0].clientX;
        const delta = eventX - originX;
        if (delta > stepWidth || delta * -1 > stepWidth) {
          const absoluteDelta = Math.floor(delta < 0 ? delta * -1 : delta);
          const steps = Math.round(absoluteDelta / stepWidth);
          const newVal = delta > 0 ? this.value + this.step * steps : this.value - this.step * steps;
          if (newVal <= this.max && newVal >= this.min) {
            this.value = newVal;
            originX = eventX;
          }
        }
      };
      const removeListeners = () => {
        window.removeEventListener("mousemove", getDeltaX);
        window.removeEventListener("touchmove", getDeltaX);
        window.removeEventListener("mouseup", removeListeners);
        window.removeEventListener("touchend", removeListeners);
      };
      window.addEventListener("mousemove", getDeltaX);
      window.addEventListener("touchmove", getDeltaX);
      window.addEventListener("mouseup", removeListeners);
      window.addEventListener("touchend", removeListeners);
    }
  };
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Slider.prototype, "label", 2);
  __decorateClass([
    e5({ type: Number, reflect: true })
  ], Slider.prototype, "value", 2);
  __decorateClass([
    e5({ type: Number, reflect: true })
  ], Slider.prototype, "min", 2);
  __decorateClass([
    e5({ type: Number, reflect: true })
  ], Slider.prototype, "max", 2);
  __decorateClass([
    e5({ type: Number, reflect: true })
  ], Slider.prototype, "step", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], Slider.prototype, "input", 2);
  Slider = __decorateClass([
    e4("air-slider")
  ], Slider);

  // src/elements/form/textarea.scss
  var styles16 = i`:host {
  display: flex;
  align-items: center;
  min-height: 40px;
  border-width: 0px 0px 1px 0px;
  border-style: solid;
  border-color: rgba(var(--neutral-1), 0.2);
  border-radius: 2px;
  box-sizing: border-box;
  padding: var(--spacing-xs) var(--spacing-s) calc(var(--spacing-xs) - 1px) var(--spacing-s);
  width: 100%;
  overflow: visible;
  background-color: rgba(var(--neutral-1), 0.05);
  position: relative;
}

:host,
.label,
textarea {
  transition: var(--transition-1);
}

.center {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

textarea {
  background: none;
  border: none;
  padding: 0px;
  outline: none;
  font: var(--body-1);
  color: var(--text-1);
  resize: none;
}

textarea::-webkit-scrollbar {
  display: none;
}

/* active */
:host([active]) {
  border-color: rgba(var(--neutral-1), 0.6);
}

:host([active]) .label {
  color: rgb(var(--accent-1));
}

/* disabled */
:host([disabled]) {
  opacity: 0.2;
}

:host([disabled]),
:host([readonly]) {
  pointer-events: none;
}

/* readonly */
:host([readonly]) {
  background: transparent;
}

/* label */
.label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font: var(--body-1);
  color: var(--text-2);
  pointer-events: none;
}

:host([value]) .label,
:host([active]) .label {
  font: var(--body-2);
}

textarea,
.label {
  line-height: 16px;
}

/* clear */
.clear-icon {
  transition: var(--transition-1), 0.1s opacity ease-out 0.1s;
}

:host(:not(:hover):not([active])) .clear-icon {
  transition: var(--transition-1), 0.1s width ease-out 0.1s, 0.1s margin ease-out 0.1s;
  font-size: 0;
  max-width: 0px;
  max-height: 0px;
  opacity: 0;
  margin-left: 0;
}

/* hover inputs */
@media (hover: hover) {
  :host(:hover:not([active])) {
    border-color: rgba(var(--neutral-1), 0.4);
  }
}`;
  var textarea_default = styles16;

  // src/elements/form/textarea.ts
  var Textarea = class extends s4 {
    constructor() {
      super();
      this.rows = 1;
      this.autofocus = false;
      this.addEventListener("click", () => {
        var _a, _b;
        this.active = true;
        (_b = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector("textarea")) == null ? void 0 : _b.focus();
      });
    }
    static get styles() {
      return textarea_default;
    }
    render() {
      return y`
      <div class="center">
        ${this.label ? y` <label class="label">${this.label}</label> ` : ""}
        <textarea
          .value="${this.value !== void 0 ? this.value : ""}"
          .rows="${this.rows}"
          .columns="${this.rows}"
          ?autofocus="${this.autofocus}"
          ?disabled="${this.disabled}"
          ?readonly="${this.readonly}"
          @focus="${() => this.active = true}"
          @blur="${() => this.active = false}"
          @input="${this.handleChange}"
        ></textarea>
      </div>
    `;
    }
    handleChange(e7) {
      this.value = e7.target.value;
      this.dispatchEvent(
        new CustomEvent("change", {
          bubbles: true,
          composed: true
        })
      );
    }
    handleClear() {
      this.value = void 0;
      this.removeAttribute("value");
    }
    attributeChangedCallback(name, oldval, newval) {
      super.attributeChangedCallback(name, oldval, newval);
      this.dispatchEvent(new Event(`${name}-changed`));
    }
  };
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Textarea.prototype, "label", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Textarea.prototype, "value", 2);
  __decorateClass([
    e5({ type: Number, reflect: true })
  ], Textarea.prototype, "rows", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], Textarea.prototype, "active", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], Textarea.prototype, "disabled", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], Textarea.prototype, "readonly", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], Textarea.prototype, "autofocus", 2);
  Textarea = __decorateClass([
    e4("air-textarea")
  ], Textarea);

  // src/elements/form/toggle.scss
  var styles17 = i`:host {
  display: flex;
  cursor: pointer;
}

input {
  display: none;
}

/* toggle */
.bg {
  width: 32px;
  height: 20px;
  margin: 2px;
  padding: 2px;
  border-radius: 12px;
  box-sizing: border-box;
  border: 2px solid rgba(var(--neutral-1), 0.25);
  transition: var(--transition-1);
}

:host([active]) .bg {
  border-color: transparent;
  background: rgb(var(--accent-1));
}

.dot {
  display: flex;
  transition: var(--transition-1);
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background: rgba(var(--neutral-1), 0.6);
}

:host([active]) .dot {
  transform: translateX(12px);
  background: white;
}

/* label */
air-text {
  flex: 1;
  margin-left: var(--spacing-s);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
}

/* disabled */
:host([disabled]) {
  pointer-events: none;
  opacity: 0.2;
}

/* hover inputs */
@media (hover: hover) {
  :host(:hover:not(:active):not([active])) .bg {
    border-color: rgba(var(--neutral-1), 0.3);
  }
  :host(:hover:not(:active):not([active])) .dot {
    background: rgba(var(--neutral-1), 0.9);
  }
}`;
  var toggle_default = styles17;

  // src/elements/form/toggle.ts
  var Toggle = class extends s4 {
    static get styles() {
      return toggle_default;
    }
    render() {
      return y`
      <input
        type="checkbox"
        ?checked="${this.active}"
        ?readonly="${this.disabled}"
        .value="${this.label}"
        .name="${this.label}"
        @change="${this.handleChange}"
      />
      <div class="bg">
        <div class="dot"></div>
      </div>
      ${this.label ? y` <air-text>${this.label}</air-text> ` : ""}
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
      super.attributeChangedCallback(name, oldval, newval);
      this.dispatchEvent(new Event(`${name}-changed`));
    }
    connectedCallback() {
      super.connectedCallback();
      this.addEventListener("click", () => {
        this.active = !this.active;
      });
    }
    handleChange() {
      this.dispatchEvent(
        new CustomEvent("change", {
          bubbles: true,
          composed: true
        })
      );
    }
  };
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Toggle.prototype, "label", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], Toggle.prototype, "active", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], Toggle.prototype, "disabled", 2);
  Toggle = __decorateClass([
    e4("air-toggle")
  ], Toggle);

  // src/elements/image/image.ts
  var Image = class extends s4 {
    constructor() {
      super(...arguments);
      this.width = "100%";
      this.fit = "contain";
    }
    static get styles() {
      return [
        i`
        :host {
          position: relative;
          max-width: max-content;
          display: flex;
          flex-direction: column;
          font: var(--body-2);
          color: var(--text-1);
        }
        /* legend */
        air-text {
          width: 100%;
          color: unset;
          font: unset;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        :host(:not([legend-position])) air-text {
          margin-top: var(--spacing-s);
        }
        :host([legend-position^='inner-']) air-text {
          position: absolute;
          padding: var(--spacing-s);
          box-sizing: border-box;
        }
        :host([legend-position='inner-top']) air-text {
          top: 0;
          background-image: linear-gradient(
            rgba(0, 0, 0, 0.8),
            rgba(0, 0, 0, 0.6),
            rgba(0, 0, 0, 0)
          );
        }
        :host([legend-position='inner-bottom']) air-text {
          bottom: 0;
          background-image: linear-gradient(
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0.6),
            rgba(0, 0, 0, 0.8)
          );
        }
        /* slots */
        slot {
          display: flex;
          justify-content: flex-end;
          gap: var(--spacing-s);
          position: absolute;
          padding: var(--spacing-xs);
          box-sizing: border-box;
          width: 100%;
          overflow: hidden;
        }
        slot[name='top'] {
          top: 0;
        }
        :host([legend][legend-position='inner-top']) slot[name='top'] {
          top: 24px;
        }
        slot[name='bottom'] {
          bottom: 0;
        }
        :host([legend]:not([legend-position])) slot[name='bottom'],
        :host([legend][legend-position='inner-bottom']) slot[name='bottom'] {
          bottom: 24px;
        }
      `
      ];
    }
    render() {
      return y`
      <img
        src="${this.src}"
        alt="${this.alt}"
        title="${this.alt}"
        width="${this.width}"
        height="${this.height}"
        style="object-fit: ${this.fit}"
      />
      ${this.legend ? y` <air-text>${this.legend}</air-text> ` : ""}
      <slot name="top"></slot>
      <slot name="bottom"></slot>
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
      super.attributeChangedCallback(name, oldval, newval);
      this.dispatchEvent(new Event(`${name}-changed`));
    }
  };
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Image.prototype, "src", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Image.prototype, "alt", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Image.prototype, "height", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Image.prototype, "width", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Image.prototype, "fit", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Image.prototype, "legend", 2);
  __decorateClass([
    e5({ type: String, reflect: true, attribute: "legend-position" })
  ], Image.prototype, "legendPosition", 2);
  if (!window.customElements.get("air-image")) {
    window.customElements.define("air-image", Image);
  }

  // src/elements/menu-item/menu-item.styles.scss
  var styles18 = i`:host {
  padding: var(--spacing-s) 0;
  border-radius: var(--border-radius);
  display: flex;
  cursor: pointer;
  transition: var(--transition-1);
  overflow: visible;
}

air-icon {
  margin-right: var(--spacing-s);
}

.label {
  flex: 1;
}

/* label */
air-text {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
}

slot[name=functions]::slotted(*) {
  margin-left: var(--spacing-s);
}

:host([active]) {
  padding: var(--spacing-s);
  margin-left: calc(var(--spacing-s) * -1);
  margin-right: calc(var(--spacing-s) * -1);
  background: rgba(var(--neutral-1), 0.1);
}

/* disabled */
:host([disabled]) {
  opacity: 0.2;
  pointer-events: none;
}

/* hover inputs */
@media (hover: hover) {
  :host(:not([active]):hover) {
    padding: var(--spacing-s);
    margin-left: calc(var(--spacing-s) * -1);
    margin-right: calc(var(--spacing-s) * -1);
    background: rgba(var(--neutral-1), 0.05);
  }
}`;
  var menu_item_styles_default = styles18;

  // src/elements/menu-item/menu-item.ts
  var MenuItem = class extends s4 {
    constructor() {
      super(...arguments);
      this.label = "Label";
      this.toggle = true;
    }
    static get styles() {
      return menu_item_styles_default;
    }
    render() {
      return y`
      ${this.icon ? y` <air-icon icon="${this.icon}"></air-icon> ` : ""}
      ${this.label ? y` <air-text>${this.label}</air-text> ` : ""}
      <!-- functions slot -->
      <slot name="functions"></slot>
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
      super.attributeChangedCallback(name, oldval, newval);
      this.dispatchEvent(new Event(`${name}-changed`));
      if (name == "toggle" && this.toggle) {
        this.addEventListener("click", () => {
          this.active = !this.active;
        });
      }
    }
  };
  __decorateClass([
    e5({ type: String, reflect: true })
  ], MenuItem.prototype, "label", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], MenuItem.prototype, "icon", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], MenuItem.prototype, "active", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], MenuItem.prototype, "toggle", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], MenuItem.prototype, "disabled", 2);
  MenuItem = __decorateClass([
    e4("air-menu-item")
  ], MenuItem);

  // src/elements/modal/modal.styles.scss
  var styles19 = i`:host {
  transition: var(--transition-1), 0s top, 0s left;
  position: fixed;
  opacity: 1;
  z-index: 5;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  /* css properties */
  --body-gap: var(--spacing-m);
  --header-gap: var(--spacing-m);
  --functions-gap: var(--spacing-m);
  --footer-gap: var(--spacing-m);
}

:host(:not([visible])) {
  opacity: 0;
  pointer-events: none;
}

:host(:not([visible])) air-card {
  margin-bottom: -40px;
}

air-card {
  background-color: rgb(var(--base-3));
  box-shadow: var(--shadow-1);
  transition: 0.2s all ease-out, 0s top, 0s left;
  --body-gap: inherit;
  --header-gap: inherit;
  --functions-gap: inherit;
  --footer-gap: inherit;
}`;
  var modal_styles_default = styles19;

  // src/elements/modal/modal.ts
  var Modal = class extends s4 {
    constructor() {
      super(...arguments);
      this.height = "400px";
      this.width = "600px";
      this.flexDirection = "column";
      this.emptyHeader = true;
      this.emptyFunctions = true;
      this.emptyFooter = true;
    }
    static get styles() {
      return modal_styles_default;
    }
    render() {
      return y`
      <air-card
        @click="${(e7) => e7.stopPropagation()}"
        style="height: ${this.height}; width: ${this.width}; max-height: ${this.height}; max-width: ${this.width}"
        .label="${this.label}"
        .icon="${this.icon}"
        flex-direction="${this.flexDirection}"
      >
        <slot
          name="header"
          slot="${this.emptyHeader ? "hidden" : "header"}"
          @slotchange="${(e7) => this.emptyHeader = e7.target.assignedNodes().length === 0}"
        ></slot>
        <slot name="functions" slot="functions">
          ${!this.sticky ? y`
                <air-icon
                  button
                  icon="close"
                  @click="${() => this.visible = false}"
                ></air-icon>
              ` : ""}
        </slot>
        <slot></slot>
        <slot
          name="footer"
          slot="${this.emptyFooter ? "hidden" : "footer"}"
          @slotchange="${(e7) => this.emptyFooter = e7.target.assignedNodes().length === 0}"
        ></slot>
      </air-card>
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
      super.attributeChangedCallback(name, oldval, newval);
      this.dispatchEvent(new Event(`${name}-changed`));
      if (name === "visible" && this.visible) {
        this.addEventListener(
          "click",
          () => !this.sticky ? this.visible = false : ""
        );
      }
    }
  };
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Modal.prototype, "label", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Modal.prototype, "icon", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Modal.prototype, "height", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Modal.prototype, "width", 2);
  __decorateClass([
    e5({ type: String, reflect: true, attribute: "flex-direction" })
  ], Modal.prototype, "flexDirection", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], Modal.prototype, "visible", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], Modal.prototype, "sticky", 2);
  __decorateClass([
    t3()
  ], Modal.prototype, "emptyHeader", 2);
  __decorateClass([
    t3()
  ], Modal.prototype, "emptyFunctions", 2);
  __decorateClass([
    t3()
  ], Modal.prototype, "emptyFooter", 2);
  Modal = __decorateClass([
    e4("air-modal")
  ], Modal);

  // src/elements/page/page.styles.scss
  var styles20 = i`:host {
  min-height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: rgb(var(--base-1));
}

:host([flat]) {
  background-color: rgb(var(--base-3));
}

.center-wrapper,
slot {
  display: flex;
  flex-direction: column;
}

.center-wrapper,
slot:not([name]) {
  flex: 1;
  overflow: hidden;
}

:host([scrollable]) slot:not([name]) {
  overflow: auto;
}

slot[name=top],
slot[name=bottom],
:host([flex-direction=column]) slot:not([name]) {
  flex-direction: column;
}

slot[name=top] {
  position: sticky;
  top: 0;
  background-color: rgb(var(--base-1));
}`;
  var page_styles_default = styles20;

  // src/elements/page/page.ts
  var Page = class extends s4 {
    constructor() {
      super(...arguments);
      this.padding = "var(--spacing-l)";
      this.direction = "row";
    }
    static get styles() {
      return page_styles_default;
    }
    render() {
      return y`
      <slot name="top"></slot>
      <div class="center-wrapper">
        <slot name="left"></slot>
        <slot style="padding: ${this.padding}"></slot>
        <slot name="right"></slot>
      </div>
      <slot name="bottom"></slot>
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
      super.attributeChangedCallback(name, oldval, newval);
      this.dispatchEvent(new Event(`${name}-changed`));
    }
  };
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Page.prototype, "theme", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Page.prototype, "padding", 2);
  __decorateClass([
    e5({ type: String, reflect: true, attribute: "direction" })
  ], Page.prototype, "direction", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], Page.prototype, "flat", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], Page.prototype, "scrollable", 2);
  Page = __decorateClass([
    e4("air-page")
  ], Page);

  // src/elements/pane/pane.scss
  var styles21 = i`:host {
  background-color: rgb(var(--base-2));
  display: flex;
  box-shadow: var(--shadow-1);
  transition: 0.1s width ease-out;
  /* css properties */
  --body-gap: var(--spacing-m);
  --header-gap: var(--spacing-m);
  --functions-gap: var(--spacing-m);
  --footer-gap: var(--spacing-m);
}

:host([size=l]) {
  width: 320px;
}

:host([size=m]) {
  width: 120px;
}

:host([size=s]) {
  width: 80px;
}

air-card {
  background-color: transparent;
  box-shadow: none;
  --body-gap: inherit;
  --header-gap: inherit;
  --functions-gap: inherit;
  --footer-gap: inherit;
}`;
  var pane_default = styles21;

  // src/elements/pane/pane.ts
  var Pane = class extends s4 {
    constructor() {
      super(...arguments);
      this.flexDirection = "column";
      this.size = "l";
      this.emptyHeader = true;
      this.emptyFunctions = true;
      this.emptyFooter = true;
    }
    static get styles() {
      return pane_default;
    }
    render() {
      return y`
      <air-card
        label="${this.label ? this.label : ""}"
        icon="${this.icon ? this.icon : ""}"
        flex-direction="${this.flexDirection}"
      >
        <slot></slot>
        <slot
          name="header"
          slot="${this.emptyHeader ? "" : "header"}"
          @slotchange="${(e7) => this.emptyHeader = e7.target.assignedNodes().length === 0}"
        ></slot>
        <slot
          name="functions"
          slot="${this.emptyFunctions ? "" : "functions"}"
          @slotchange="${(e7) => this.emptyFunctions = e7.target.assignedNodes().length === 0}"
        ></slot>
        <slot
          name="footer"
          slot="${this.emptyFooter ? "" : "footer"}"
          @slotchange="${(e7) => this.emptyFooter = e7.target.assignedNodes().length === 0}"
        ></slot>
      </air-card>
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
      super.attributeChangedCallback(name, oldval, newval);
      this.dispatchEvent(new Event(`${name}-changed`));
    }
  };
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Pane.prototype, "label", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Pane.prototype, "icon", 2);
  __decorateClass([
    e5({ type: String, reflect: true, attribute: "flex-direction" })
  ], Pane.prototype, "flexDirection", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Pane.prototype, "size", 2);
  __decorateClass([
    t3()
  ], Pane.prototype, "emptyHeader", 2);
  __decorateClass([
    t3()
  ], Pane.prototype, "emptyFunctions", 2);
  __decorateClass([
    t3()
  ], Pane.prototype, "emptyFooter", 2);
  Pane = __decorateClass([
    e4("air-pane")
  ], Pane);

  // src/elements/popover/popover.scss
  var styles22 = i`:host {
  background-color: rgb(var(--base-4));
  border-radius: var(--border-radius);
  display: flex;
  box-shadow: var(--shadow-1);
  transition: var(--transition-1), 0s top, 0s left;
  position: fixed;
  opacity: 1;
  z-index: 4;
  width: 240px;
  /* css properties */
  --body-gap: var(--spacing-m);
  --header-gap: var(--spacing-m);
  --functions-gap: var(--spacing-m);
  --footer-gap: var(--spacing-m);
}

:host(:not([visible])) {
  opacity: 0;
  pointer-events: none;
}

:host([position^=bottom]:not([visible])) {
  margin-top: -8px;
}

:host([position^=top]:not([visible])) {
  margin-top: 8px;
}

:host([position^=right]:not([visible])) {
  margin-left: -8px;
}

:host([position^=left]:not([visible])) {
  margin-left: 8px;
}

air-card {
  background-color: transparent;
  box-shadow: none;
  --body-gap: inherit;
  --header-gap: inherit;
  --functions-gap: inherit;
  --footer-gap: inherit;
}`;
  var popover_default = styles22;

  // src/elements/popover/popover.ts
  var Popover = class extends s4 {
    constructor() {
      super(...arguments);
      this.flexDirection = "column";
      this.position = "bottom";
      this.emptyHeader = true;
      this.emptyFunctions = true;
      this.emptyFooter = true;
    }
    static get styles() {
      return popover_default;
    }
    render() {
      return y`
      <air-card
        @click="${(e7) => e7.stopPropagation()}"
        @wheel="${(e7) => e7.stopPropagation()}"
        .label="${this.label}"
        .icon="${this.icon}"
        flex-direction="${this.flexDirection}"
      >
        <slot
          name="header"
          slot="${this.emptyHeader ? "hidden" : "header"}"
          @slotchange="${(e7) => this.emptyHeader = e7.target.assignedNodes().length === 0}"
        ></slot>
        <slot
          name="functions"
          slot="${this.emptyFunctions ? "hidden" : "functions"}"
          @slotchange="${(e7) => this.emptyFunctions = e7.target.assignedNodes().length === 0}"
        ></slot>
        <slot></slot>
        <slot
          name="footer"
          slot="${this.emptyFooter ? "hidden" : "footer"}"
          @slotchange="${(e7) => this.emptyFooter = e7.target.assignedNodes().length === 0}"
        ></slot>
      </air-card>
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
      super.attributeChangedCallback(name, oldval, newval);
      this.dispatchEvent(new Event(`${name}-changed`));
      if (name === "target" && this.target) {
        this.targetObserver();
      } else if (name === "visible" && this.visible) {
        this.visibleObserver();
      }
    }
    targetObserver() {
      const tar = typeof this.target === "string" ? document.querySelector(this.target) : this.target;
      if (tar) {
        tar.addEventListener("click", () => this.handlePosition(tar));
      }
    }
    visibleObserver() {
      const tar = typeof this.target === "string" ? document.querySelector(this.target) : this.target;
      if (tar) {
        this.handlePosition(tar);
        if (!this.sticky && this.target) {
          this.addDocListener(tar);
        }
      }
    }
    handlePosition(tar) {
      if (!tar) {
        return;
      }
      let self = this;
      let rect = tar.getBoundingClientRect();
      self.visible = true;
      if (self.position.startsWith("bottom")) {
        self.style.top = `${rect.top + rect.height + 8}px`;
      } else if (self.position.startsWith("top")) {
        self.style.top = `${rect.top - self.clientHeight - 8}px`;
      } else {
        self.style.top = `${rect.top + rect.height / 2 - self.clientHeight / 2}px`;
        if (parseInt(self.style.top) < 0)
          self.style.top = "8px";
        const viewport_height = Math.max(
          document.documentElement.clientHeight || 0,
          window.innerHeight || 0
        );
        if (parseInt(self.style.top) + self.clientHeight > viewport_height) {
          self.style.top = `${viewport_height - self.clientHeight - 8}px`;
        }
      }
      if (self.position.startsWith("right")) {
        self.style.left = `${rect.left + rect.width + 8}px`;
      } else if (self.position.startsWith("left")) {
        self.style.left = `${rect.left - self.clientWidth - 8}px`;
      } else {
        self.style.left = `${rect.left + rect.width / 2 - self.clientWidth / 2}px`;
      }
    }
    addDocListener(tar) {
      let closePopover = (e7) => {
        if (e7.composedPath()[0] !== tar && e7.target !== tar && e7.type === "click" || e7.type === "wheel") {
          this.visible = false;
          document.removeEventListener("click", closePopover);
          document.removeEventListener("wheel", closePopover);
        }
      };
      document.addEventListener("click", closePopover);
      document.addEventListener("wheel", closePopover);
    }
  };
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Popover.prototype, "label", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Popover.prototype, "icon", 2);
  __decorateClass([
    e5({ type: String, reflect: true, attribute: "flex-direction" })
  ], Popover.prototype, "flexDirection", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Popover.prototype, "position", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Popover.prototype, "target", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], Popover.prototype, "visible", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], Popover.prototype, "sticky", 2);
  __decorateClass([
    t3()
  ], Popover.prototype, "emptyHeader", 2);
  __decorateClass([
    t3()
  ], Popover.prototype, "emptyFunctions", 2);
  __decorateClass([
    t3()
  ], Popover.prototype, "emptyFooter", 2);
  Popover = __decorateClass([
    e4("air-popover")
  ], Popover);

  // src/elements/progress/progress.scss
  var styles23 = i`:host {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.header,
.footer {
  display: flex;
  align-items: center;
}

.label,
.info {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header {
  margin-bottom: var(--spacing-s);
}

.footer {
  margin-top: var(--spacing-s);
}

/* radial */
:host([radial]) {
  align-items: center;
  justify-content: center;
}

.radial-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.radial-wrapper air-text {
  position: absolute;
  width: 100%;
  text-align: center;
}

.radial {
  transform: rotate(-90deg);
}

circle {
  fill: transparent;
  stroke-width: 8px;
}

/* status */
.status-icon {
  margin-right: var(--spacing-s);
}

.status-icon[icon=cancel] {
  color: rgb(var(--functional-red));
}

.status-icon[icon=error] {
  color: rgb(var(--functional-yellow));
}

.status-icon[icon=check_circle] {
  color: rgb(var(--functional-green));
}`;
  var progress_default = styles23;

  // src/elements/progress/progress.ts
  var ProgressBar = class extends s4 {
    constructor() {
      super(...arguments);
      this.size = "m";
    }
    static get styles() {
      return progress_default;
    }
    render() {
      return y`
      <!-- header -->
      ${this.label || this.showProgress ? y`
            <div class="header">
              <air-text size="header-2" class="label">${this.label}</air-text>
              ${this.showProgress && !this.radial ? y` <air-text size="header-2">${this.value}%</air-text> ` : ""}
            </div>
          ` : ""}
      ${!this.radial ? y`
            <!-- linear -->
            <svg width="100%" height="8">
              <defs>
                <clipPath id="clip-path">
                  <rect width="100%" height="8px" rx="4px" />
                </clipPath>
              </defs>
              <rect
                fill="rgba(var(--neutral-1), .1)"
                width="100%"
                height="100%"
                rx="4px"
              />
              <rect
                fill="${this.color ? this.color : "rgb(var(--accent-1))"}"
                width="${this.value}%"
                height="100%"
                clip-path="url(#clip-path)"
              />
            </svg>
          ` : y`
            <!-- radial -->
            <div class="radial-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="radial"
                width="${this.getSize()}"
                viewBox="0 0 ${this.getSize()} ${this.getSize()}"
              >
                <circle
                  stroke="rgba(var(--neutral-1), .1)"
                  r="${this.getSize() / 2 - 4}"
                  cx="${this.getSize() / 2}"
                  cy="${this.getSize() / 2}"
                />
                <circle
                  stroke="${this.color ? this.color : "rgb(var(--accent-1))"}"
                  stroke-dasharray="${2 * Math.PI * (this.getSize() / 2 - 4)}"
                  stroke-dashoffset="${2 * Math.PI * (this.getSize() / 2 - 4) * (1 - (this.value ? this.value / 100 : 0))}"
                  r="${this.getSize() / 2 - 4}"
                  cx="${this.getSize() / 2}"
                  cy="${this.getSize() / 2}"
                />
              </svg>
              ${this.showProgress ? y` <air-text size="header-2">${this.value}%</air-text> ` : ""}
            </div>
          `}
      ${this.info || this.status ? y`
            <div class="footer">
              <!-- status -->
              ${this.status ? y`
                    <air-icon
                      class="status-icon"
                      .icon="${this.getStatusIcon()}"
                    ></air-icon>
                  ` : ""}
              <!-- info -->
              ${this.info ? y`
                    <air-text color="var(--text-2)" class="info"
                      >${this.info}</air-text
                    >
                  ` : ""}
            </div>
          ` : ""}
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
      super.attributeChangedCallback(name, oldval, newval);
      this.dispatchEvent(new Event(`${name}-changed`));
    }
    getStatusIcon() {
      let icon;
      switch (this.status) {
        case "error":
          icon = "cancel";
          break;
        case "warning":
          icon = "error";
          break;
        case "success":
          icon = "check_circle";
          break;
      }
      return icon;
    }
    getSize() {
      let size;
      switch (this.size) {
        case "s":
          size = 48;
          break;
        case "m":
          size = 64;
          break;
        case "l":
          size = 80;
          break;
        default:
          size = 0;
      }
      return size;
    }
  };
  __decorateClass([
    e5({ type: String, reflect: true })
  ], ProgressBar.prototype, "label", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], ProgressBar.prototype, "info", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], ProgressBar.prototype, "status", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], ProgressBar.prototype, "color", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], ProgressBar.prototype, "size", 2);
  __decorateClass([
    e5({ type: Number, reflect: true })
  ], ProgressBar.prototype, "value", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], ProgressBar.prototype, "radial", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true, attribute: "show-progress" })
  ], ProgressBar.prototype, "showProgress", 2);
  ProgressBar = __decorateClass([
    e4("air-progress")
  ], ProgressBar);

  // src/elements/spinner/spinner.scss
  var styles24 = i`:host {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

svg {
  animation: 1s linear infinite svg-animation;
}

@keyframes svg-animation {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
circle {
  fill: transparent;
  stroke: rgb(var(--accent-1));
  stroke-linecap: round;
  stroke-width: 4px;
}

/* label */
air-text {
  margin-top: var(--spacing-s);
  text-align: center;
  max-width: 240px;
}`;
  var spinner_default = styles24;

  // src/elements/spinner/spinner.ts
  var Spinner = class extends s4 {
    constructor() {
      super(...arguments);
      this.size = "m";
    }
    static get styles() {
      return spinner_default;
    }
    render() {
      return y`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="${this.getSize()}"
        viewBox="0 0 ${this.getSize()} ${this.getSize()}"
      >
        <circle
          stroke-dasharray="${this.getSize()}"
          r="${this.getSize() / 2 - 4}"
          cx="${this.getSize() / 2}"
          cy="${this.getSize() / 2}"
        />
      </svg>
      ${this.label ? y` <air-text>${this.label}</air-text> ` : ""}
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
      super.attributeChangedCallback(name, oldval, newval);
      this.dispatchEvent(new Event(`${name}-changed`));
    }
    getSize() {
      let size;
      switch (this.size) {
        case "s":
          size = 24;
          break;
        case "m":
          size = 32;
          break;
        case "l":
          size = 40;
          break;
      }
      return size;
    }
  };
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Spinner.prototype, "size", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Spinner.prototype, "label", 2);
  Spinner = __decorateClass([
    e4("air-spinner")
  ], Spinner);

  // src/elements/switch/switch-item.scss
  var styles25 = i`:host {
  display: flex;
  width: max-content;
  min-width: 40px;
  max-width: 120px;
  padding: var(--spacing-xs) var(--spacing-m);
  border-radius: var(--border-radius);
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: var(--transition-1);
}

.label {
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.label,
air-icon {
  color: var(--text-2);
}

/* active */
:host([active]) .label,
:host([active]) air-icon {
  color: var(--text-1);
}

:host([active]) {
  background: rgba(var(--neutral-1), 0.1);
}

/* disabled */
:host([disabled]) {
  pointer-events: none;
  opacity: 0.2;
}

/* hover inputs */
@media (hover: hover) {
  :host(:not([active]):hover) {
    background: rgba(var(--neutral-1), 0.05);
  }
  :host([active]:hover) {
    background: rgba(var(--neutral-1), 0.15);
  }
}`;
  var switch_item_default = styles25;

  // src/elements/switch/switch-item.ts
  var SwitchItem = class extends s4 {
    static get styles() {
      return switch_item_default;
    }
    render() {
      return y`
      ${this.icon ? y` <air-icon icon="${this.icon}"></air-icon> ` : ""}
      ${this.label && !this.icon ? y` <air-text class="label">${this.label}</air-text> ` : ""}
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
      super.attributeChangedCallback(name, oldval, newval);
      this.dispatchEvent(new Event(`${name}-changed`));
    }
    connectedCallback() {
      super.connectedCallback();
      this.addEventListener("click", () => this.handleActive());
    }
    handleActive() {
      var _a;
      let siblings = (_a = this.parentElement) == null ? void 0 : _a.childNodes;
      siblings.forEach((el) => {
        el.active = false;
      });
      this.active = true;
    }
  };
  __decorateClass([
    e5({ type: String, reflect: true })
  ], SwitchItem.prototype, "label", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], SwitchItem.prototype, "icon", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], SwitchItem.prototype, "active", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], SwitchItem.prototype, "disabled", 2);
  SwitchItem = __decorateClass([
    e4("air-switch-item")
  ], SwitchItem);

  // src/elements/switch/switch.scss
  var styles26 = i`:host {
  background-color: rgba(var(--neutral-1), 0.1);
  display: flex;
  width: max-content;
  height: max-content;
  border-radius: var(--border-radius);
}`;
  var switch_default = styles26;

  // src/elements/switch/switch.ts
  var Switch = class extends s4 {
    static get styles() {
      return switch_default;
    }
    render() {
      return y` <slot></slot> `;
    }
    attributeChangedCallback(name, oldval, newval) {
      super.attributeChangedCallback(name, oldval, newval);
      this.dispatchEvent(new Event(`${name}-changed`));
    }
  };
  Switch = __decorateClass([
    e4("air-switch")
  ], Switch);

  // src/elements/table/table-cell.ts
  var TableCell = class extends s4 {
    constructor() {
      super(...arguments);
      this.alignment = "left";
    }
    static get styles() {
      return [
        i`
        :host {
          display: flex;
          align-items: center;
          padding: var(--spacing-m) var(--spacing-s);
          font: var(--body-1);
          overflow: hidden;
          cursor: default;
          position: relative;
        }
        air-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        /* condensed */
        :host:host-context(air-table[condensed]) {
          padding: var(--spacing-s);
        }
        /* head */
        :host([head]) air-text {
          font-weight: bold;
        }
        /* align */
        :host([alignment='center']) {
          justify-content: center;
        }
        :host([alignment='right']) {
          justify-content: flex-end;
        }
        /* sortable */
        :host([sortable]) {
          cursor: pointer;
        }
        :host([sort-direction='desc']) .sort {
          transform: rotate(180deg);
        }
        .sort {
          margin: var(--spacing-xs) 0px var(--spacing-xs) var(--spacing-xs);
          color: var(--text-2);
        }
      `
      ];
    }
    render() {
      return y`
      <air-text>
        <slot></slot>
      </air-text>
      ${this.head && this.sorted ? y`
            <air-icon size="s" icon="arrow_downward" class="sort"></air-icon>
          ` : ""}
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
      super.attributeChangedCallback(name, oldval, newval);
      this.dispatchEvent(new Event(`${name}-changed`));
      if (name == "grid-cols") {
        this.style.gridColumn = `span ${this.gridCols}`;
      }
      if (name == "sortable" && this.sortable) {
        if (!this.sortDirection) {
          this.sortDirection = "asc";
        }
        this.addEventListener("click", () => {
          this.handleSort();
        });
      }
    }
    handleSort() {
      var _a;
      if (this.sorted) {
        this.sortDirection = this.sortDirection == "asc" ? "desc" : "asc";
      } else {
        let siblings = (_a = this.parentElement) == null ? void 0 : _a.childNodes;
        siblings == null ? void 0 : siblings.forEach((el) => {
          el.sorted = false;
        });
        this.sorted = true;
        this.sortDirection = "asc";
      }
    }
  };
  __decorateClass([
    e5({ type: Number, reflect: true, attribute: "grid-cols" })
  ], TableCell.prototype, "gridCols", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], TableCell.prototype, "alignment", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], TableCell.prototype, "head", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], TableCell.prototype, "sorted", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], TableCell.prototype, "sortable", 2);
  __decorateClass([
    e5({ type: String, reflect: true, attribute: "sort-direction" })
  ], TableCell.prototype, "sortDirection", 2);
  TableCell = __decorateClass([
    e4("air-table-cell")
  ], TableCell);

  // src/elements/table/table-row.ts
  var TableRow = class extends s4 {
    static get styles() {
      return [
        i`
        :host {
          display: grid;
          border-bottom: 1px solid rgba(var(--neutral-1), 0.15);
          transition: var(--transition-1);
          position: relative;
        }
        /* header */
        :host([slot='header']) {
          border-color: rgba(var(--neutral-1), 0.4);
        }
        /* active */
        :host([active]) {
          background-color: rgba(var(--neutral-1), 0.1);
        }
        /* hover inputs */
        @media (hover: hover) {
          :host(:hover:not([active]):not([slot='header'])) {
            background-color: rgba(var(--neutral-1), 0.05);
          }
          :host(:hover:not([active])):host-context(air-table[readonly]) {
            background-color: transparent;
          }
        }
      `
      ];
    }
    render() {
      return y` <slot></slot> `;
    }
    attributeChangedCallback(name, oldval, newval) {
      super.attributeChangedCallback(name, oldval, newval);
      this.dispatchEvent(new Event(`${name}-changed`));
    }
    connectedCallback() {
      super.connectedCallback();
      this.addEventListener("click", () => this.handleActive());
      this.handleColumns();
    }
    handleActive() {
      var _a;
      let table, siblings;
      table = this.closest("air-table");
      if (!(table == null ? void 0 : table.readonly) && this.slot != "header") {
        siblings = (_a = this.parentElement) == null ? void 0 : _a.childNodes;
        siblings == null ? void 0 : siblings.forEach((el) => {
          el.active = false;
        });
        this.active = true;
      }
    }
    handleColumns() {
      const table = this.closest("air-table");
      this.style.gridTemplateColumns = table.columns;
      table == null ? void 0 : table.addEventListener("columns-changed", () => {
        this.style.gridTemplateColumns = table.columns;
      });
    }
  };
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], TableRow.prototype, "active", 2);
  TableRow = __decorateClass([
    e4("air-table-row")
  ], TableRow);

  // src/elements/table/table.ts
  var Table = class extends s4 {
    constructor() {
      super(...arguments);
      this.columns = "repeat(24, 1fr)";
    }
    static get styles() {
      return [
        i`
        :host {
          display: flex;
          flex-direction: column;
          max-height: 100%;
          margin: 0 !important;
        }
        slot {
          display: block;
        }
        slot:not([name]) {
          flex: 1;
          overflow: auto;
        }
      `
      ];
    }
    render() {
      return y`
      <slot name="header"></slot>
      <slot></slot>
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
      super.attributeChangedCallback(name, oldval, newval);
      this.dispatchEvent(new Event(`${name}-changed`));
    }
  };
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], Table.prototype, "readonly", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], Table.prototype, "condensed", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Table.prototype, "columns", 2);
  Table = __decorateClass([
    e4("air-table")
  ], Table);

  // src/elements/tabs/tab-item.scss
  var styles27 = i`:host {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  transition: var(--transition-1);
  cursor: pointer;
  border-color: transparent;
  border-style: solid;
  color: var(--text-2);
  user-select: none;
}

.label {
  line-height: 24px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.label,
air-icon {
  color: unset;
}

/* horizontal */
:host([orientation=horizontal]) {
  flex-direction: column;
  justify-content: center;
  width: max-content;
  min-width: 72px;
  max-width: 240px;
  height: calc(24px + var(--spacing-l) * 2);
  padding: 0px var(--spacing-l);
  border-width: 0px 0px 2px 0px;
}

:host([orientation=horizontal]) .label {
  text-align: center;
}

/* vertical */
:host([orientation=vertical]) .label {
  text-align: left;
}

:host([orientation=vertical]) {
  justify-content: flex-start;
  flex-direction: row;
  width: 100%;
  min-width: unset;
  max-width: 100%;
  height: max-content;
  padding: var(--spacing-s) var(--spacing-s) var(--spacing-s) calc(var(--spacing-l) - 2px);
  border-width: 0px 0px 0px 2px;
}

:host([orientation=vertical]) {
  gap: var(--spacing-s);
}

/* active */
:host([active]) {
  border-color: rgb(var(--accent-1));
}

:host([active]) {
  color: var(--text-1);
}

/* disabled */
:host([disabled]) {
  pointer-events: none;
  opacity: 0.2;
}

/* hover inputs */
@media (hover: hover) {
  :host(:hover) .label {
    color: var(--text-1);
  }
}`;

  // src/elements/tabs/tab-item.ts
  var TabItem = class extends s4 {
    constructor() {
      super(...arguments);
      this.orientation = "horizontal";
    }
    static get styles() {
      return styles27;
    }
    render() {
      return y`
      <slot>
        ${this.icon ? y` <air-icon icon="${this.icon}"></air-icon> ` : ""}
        ${this.label ? y` <air-text class="label">${this.label}</air-text> ` : ""}
      </slot>
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
      super.attributeChangedCallback(name, oldval, newval);
      this.dispatchEvent(new Event(`${name}-changed`));
    }
    connectedCallback() {
      super.connectedCallback();
      this.addEventListener("click", () => this.handleActive());
    }
    handleActive() {
      var _a;
      let siblings = (_a = this.closest("air-tabs")) == null ? void 0 : _a.querySelectorAll("air-tab-item");
      siblings.forEach((el) => {
        el.active = false;
      });
      this.active = true;
    }
  };
  __decorateClass([
    e5({ type: String, reflect: true })
  ], TabItem.prototype, "label", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], TabItem.prototype, "icon", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], TabItem.prototype, "active", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], TabItem.prototype, "disabled", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], TabItem.prototype, "orientation", 2);
  TabItem = __decorateClass([
    e4("air-tab-item")
  ], TabItem);

  // src/elements/tabs/tabs.scss
  var styles28 = i`:host {
  display: flex;
  width: 100%;
  height: max-content;
}

:host([slot=header]) {
  margin-top: calc(var(--spacing-l) * -1);
}

:host(:not([orientation=vertical])) {
  border-bottom: 1px solid rgba(var(--neutral-1), 0.1);
}

/* vertical */
:host([orientation=vertical]) {
  flex-direction: column;
}

.tabs {
  /* vertical */
}
.tabs :host {
  display: flex;
  width: 100%;
  height: max-content;
}
.tabs :host([slot=header]) {
  margin-top: calc(var(--spacing-l) * -1);
}
.tabs :host(:not([orientation=vertical])) {
  border-bottom: 1px solid rgba(var(--neutral-1), 0.1);
}
.tabs :host([orientation=vertical]) {
  flex-direction: column;
}

.tab-item {
  /* horizontal */
  /* vertical */
  /* active */
  /* disabled */
  /* hover inputs */
}
.tab-item :host {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  transition: var(--transition-1);
  cursor: pointer;
  border-color: transparent;
  border-style: solid;
  color: var(--text-2);
}
.tab-item .label {
  line-height: 24px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tab-item .label,
.tab-item air-icon {
  color: unset;
}
.tab-item :host([orientation=horizontal]) {
  flex-direction: column;
  justify-content: center;
  width: max-content;
  min-width: 72px;
  max-width: 240px;
  height: calc(24px + var(--spacing-l) * 2);
  padding: 0px var(--spacing-l);
  border-width: 0px 0px 2px 0px;
}
.tab-item :host([orientation=horizontal]) .label {
  text-align: center;
}
.tab-item :host([orientation=vertical]) .label {
  text-align: left;
}
.tab-item :host([orientation=vertical]) {
  justify-content: flex-start;
  flex-direction: row;
  width: 100%;
  min-width: unset;
  max-width: 100%;
  height: max-content;
  padding: var(--spacing-s) var(--spacing-s) var(--spacing-s) calc(var(--spacing-l) - 2px);
  border-width: 0px 0px 0px 2px;
}
.tab-item :host([orientation=vertical]) {
  gap: var(--spacing-s);
}
.tab-item :host([active]) {
  border-color: rgb(var(--accent-1));
}
.tab-item :host([active]) {
  color: var(--text-1);
}
.tab-item :host([disabled]) {
  pointer-events: none;
  opacity: 0.2;
}
@media (hover: hover) {
  .tab-item :host(:hover) .label {
    color: var(--text-1);
  }
}

:host {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  transition: var(--transition-1);
  cursor: pointer;
  border-color: transparent;
  border-style: solid;
  color: var(--text-2);
}

.label {
  line-height: 24px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.label,
air-icon {
  color: unset;
}

/* horizontal */
:host([orientation=horizontal]) {
  flex-direction: row;
  justify-content: center;
  width: max-content;
  min-width: 72px;
  width: 100%;
  height: calc(24px + var(--spacing-l) * 2);
  padding: 0px var(--spacing-l);
  border-width: 0px 0px 2px 0px;
}

:host([orientation=horizontal]) .label {
  text-align: center;
}

/* vertical */
:host([orientation=vertical]) .label {
  text-align: left;
}

:host([orientation=vertical]) {
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  min-width: unset;
  max-width: 100%;
  height: max-content;
  padding: var(--spacing-s) var(--spacing-s) var(--spacing-s) calc(var(--spacing-l) - 2px);
  border-width: 0px 0px 0px 2px;
}

:host([orientation=vertical]) {
  gap: var(--spacing-s);
}

/* active */
:host([active]) {
  border-color: rgb(var(--accent-1));
}

:host([active]) {
  color: var(--text-1);
}

/* disabled */
:host([disabled]) {
  pointer-events: none;
  opacity: 0.2;
}

/* hover inputs */
@media (hover: hover) {
  :host(:hover) .label {
    color: var(--text-1);
  }
}`;
  var tabs_default = styles28;

  // src/elements/tabs/tabs.ts
  var Tabs = class extends s4 {
    constructor() {
      super(...arguments);
      this.orientation = "horizontal";
    }
    static get styles() {
      return tabs_default;
    }
    render() {
      return y`
      <slot @slotchange="${() => this.handleOrientation()}"></slot>
    `;
    }
    handleOrientation() {
      this.childNodes.forEach((el) => {
        el.orientation = this.orientation;
      });
    }
    attributeChangedCallback(name, oldval, newval) {
      super.attributeChangedCallback(name, oldval, newval);
      this.dispatchEvent(new Event(`${name}-changed`));
    }
  };
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Tabs.prototype, "orientation", 2);
  Tabs = __decorateClass([
    e4("air-tabs")
  ], Tabs);

  // src/elements/tag/tag.scss
  var styles29 = i`:host {
  padding: var(--spacing-xs);
  display: flex;
  height: max-content;
  width: max-content;
  max-width: 160px;
  border-radius: var(--border-radius);
  border: 1px solid rgba(var(--neutral-1), 0.25);
  transition: var(--transition-1);
}

.label {
  margin: 0 var(--spacing-xs);
}

/* button */
:host([button]) {
  cursor: pointer;
}

:host([variant=green]) {
  border-color: rgb(var(--functional-green));
  color: rgb(var(--functional-green));
}
:host([variant=green])[filled] {
  border-color: rgb(var(--functional-green));
  background-color: rgb(var(--functional-green));
  color: #fff;
}

:host([variant=blue]) {
  border-color: rgb(var(--functional-blue));
  color: rgb(var(--functional-blue));
}
:host([variant=blue])[filled] {
  border-color: rgb(var(--functional-blue));
  background-color: rgb(var(--functional-blue));
  color: #fff;
}

:host([variant=red]) {
  border-color: rgb(var(--functional-red));
  color: rgb(var(--functional-red));
}
:host([variant=red])[filled] {
  border-color: rgb(var(--functional-red));
  background-color: rgb(var(--functional-red));
  color: #fff;
}

:host([variant=yellow]) {
  border-color: rgb(var(--functional-yellow));
  color: rgb(var(--functional-yellow));
}
:host([variant=yellow])[filled] {
  border-color: rgb(var(--functional-yellow));
  background-color: rgb(var(--functional-yellow));
  color: #fff;
}

/* hover inputs */
@media (hover: hover) {
  :host([button]:not(:active):hover) {
    border-color: rgba(var(--neutral-1), 0.3);
    background-color: rgba(var(--neutral-1), 0.05);
  }
}`;
  var tag_default = styles29;

  // src/elements/tag/tag.ts
  var Tag = class extends s4 {
    constructor() {
      super(...arguments);
      this.label = "Label";
    }
    static get styles() {
      return tag_default;
    }
    render() {
      return y`
      <!-- icon -->
      ${this.icon ? y` <air-icon icon="${this.icon}"></air-icon> ` : ""}
      <!-- label -->
      ${this.label ? y` <air-text class="label" size="xs" color="${this.color}">${this.label}</air-text> ` : ""}
      <!-- removable -->
      ${this.removable ? y`
            <air-icon
              icon="close"
              button
              @click="${() => this.handleRemove()}"
            ></air-icon>
          ` : ""}
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
      super.attributeChangedCallback(name, oldval, newval);
      this.dispatchEvent(new Event(`${name}-changed`));
    }
    handleRemove() {
      this.dispatchEvent(new Event("remove"));
    }
  };
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Tag.prototype, "label", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Tag.prototype, "icon", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], Tag.prototype, "button", 2);
  __decorateClass([
    e5({ type: Boolean, reflect: true })
  ], Tag.prototype, "removable", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Tag.prototype, "variant", 2);
  __decorateClass([
    e5({ type: String, reflect: true })
  ], Tag.prototype, "color", 2);
  Tag = __decorateClass([
    e4("air-tag")
  ], Tag);
})();
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
