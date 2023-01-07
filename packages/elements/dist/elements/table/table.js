var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
/**
 * @prop {String} columns - Defines the column template. It accepts any value also accepted by the standard css grid-template-columns (e.g. repeat(4, 1fr), 40px 1fr auto).
 * @prop {Boolean} readonly - If set to true, disables selection on mouse clicks and the hover effects.
 * @prop {Boolean} condensed - If set to true, condensed the height of the rows and cells.
 *
 * @slot - The container where the table body is rendered (table-rows).
 * @slot header - The container for the header (table-row). It does not scroll with the content, but remains sticky on top.
 */
let Table = class Table extends LitElement {
    constructor() {
        super(...arguments);
        this.columns = 'repeat(24, 1fr)';
    }
    static get styles() {
        return [
            css `
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
      `,
        ];
    }
    render() {
        return html `
      <slot name="header"></slot>
      <slot></slot>
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
        super.attributeChangedCallback(name, oldval, newval);
        this.dispatchEvent(new Event(`${name}-changed`));
    }
};
__decorate([
    property({ type: Boolean, reflect: true })
], Table.prototype, "readonly", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Table.prototype, "condensed", void 0);
__decorate([
    property({ type: String, reflect: true })
], Table.prototype, "columns", void 0);
Table = __decorate([
    customElement('air-table')
], Table);
export { Table };
//# sourceMappingURL=table.js.map