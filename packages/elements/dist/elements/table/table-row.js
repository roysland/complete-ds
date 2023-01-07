var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let TableRow = class TableRow extends LitElement {
    static get styles() {
        return [
            css `
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
      `,
        ];
    }
    render() {
        return html ` <slot></slot> `;
    }
    attributeChangedCallback(name, oldval, newval) {
        super.attributeChangedCallback(name, oldval, newval);
        this.dispatchEvent(new Event(`${name}-changed`));
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', () => this.handleActive());
        this.handleColumns();
    }
    handleActive() {
        var _a;
        let table, siblings;
        table = this.closest('air-table');
        if (!(table === null || table === void 0 ? void 0 : table.readonly) && this.slot != 'header') {
            siblings = (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.childNodes;
            siblings === null || siblings === void 0 ? void 0 : siblings.forEach((el) => {
                el.active = false;
            });
            this.active = true;
        }
    }
    handleColumns() {
        const table = this.closest('air-table');
        // define columns on load
        this.style.gridTemplateColumns = table.columns;
        // listen to column changes
        table === null || table === void 0 ? void 0 : table.addEventListener('columns-changed', () => {
            this.style.gridTemplateColumns = table.columns;
        });
    }
};
__decorate([
    property({ type: Boolean, reflect: true })
], TableRow.prototype, "active", void 0);
TableRow = __decorate([
    customElement('air-table-row')
], TableRow);
export { TableRow };
//# sourceMappingURL=table-row.js.map