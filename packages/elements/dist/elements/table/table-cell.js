var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../icon';
import '../text';
/**
 * @prop {String} alignment	- Defines the alignment of items inside the cell. Possible values are left, center and right.
 * @prop {String} sortDirection - (If head, sortable and sorted are true) Defines the direction of sorting. Possible values are asc and desc.
 * @prop {Number} gridCols - Defines how many columns the cell occupies. The sum of all cells in a given row should not surpass the total number of columns in the table (which is 24 by default).
 * @prop {Boolean} head - If set to true, the cell will behave like a table head (use if the parent table-row is placed on the header slot of the table).
 * @prop {Boolean} sortable - (If head is true) If set to true, upon clicking on the cell it will toggle the sorted property.
 * @prop {Boolean} sorted - (If head and sortable are true) If set to true, an arrow will be shown to indicate that the column is sorted.
 *
 * @slot - Hosts plain text or other elements.
 */
let TableCell = class TableCell extends LitElement {
    constructor() {
        super(...arguments);
        this.alignment = 'left';
    }
    static get styles() {
        return [
            css `
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
      `,
        ];
    }
    render() {
        return html `
      <air-text>
        <slot></slot>
      </air-text>
      ${this.head && this.sorted
            ? html `
            <air-icon size="s" icon="arrow_downward" class="sort"></air-icon>
          `
            : ''}
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
        super.attributeChangedCallback(name, oldval, newval);
        this.dispatchEvent(new Event(`${name}-changed`));
        if (name == 'grid-cols') {
            this.style.gridColumn = `span ${this.gridCols}`;
        }
        if (name == 'sortable' && this.sortable) {
            if (!this.sortDirection) {
                this.sortDirection = 'asc';
            }
            this.addEventListener('click', () => {
                this.handleSort();
            });
        }
    }
    handleSort() {
        var _a;
        if (this.sorted) {
            // switch direction if already sorted
            this.sortDirection = this.sortDirection == 'asc' ? 'desc' : 'asc';
        }
        else {
            // unsort other heads otherwise
            let siblings = (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.childNodes;
            siblings === null || siblings === void 0 ? void 0 : siblings.forEach((el) => {
                el.sorted = false;
            });
            this.sorted = true;
            this.sortDirection = 'asc';
        }
    }
};
__decorate([
    property({ type: Number, reflect: true, attribute: 'grid-cols' })
], TableCell.prototype, "gridCols", void 0);
__decorate([
    property({ type: String, reflect: true })
], TableCell.prototype, "alignment", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], TableCell.prototype, "head", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], TableCell.prototype, "sorted", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], TableCell.prototype, "sortable", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'sort-direction' })
], TableCell.prototype, "sortDirection", void 0);
TableCell = __decorate([
    customElement('air-table-cell')
], TableCell);
export { TableCell };
//# sourceMappingURL=table-cell.js.map