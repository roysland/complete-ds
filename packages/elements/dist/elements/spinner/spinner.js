var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../text';
import styles from './spinner.scss';
/**
 * @prop {String} label - If set, defines the text label.
 * @prop {'s'|'m'|'l'} size - Defines the size of the component. Possible values are `s`(24px), `m`(32px) and `l`(40px).
 */
let Spinner = class Spinner extends LitElement {
    constructor() {
        super(...arguments);
        this.size = 'm';
    }
    static get styles() {
        return styles;
    }
    render() {
        return html `
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
      ${this.label ? html ` <air-text>${this.label}</air-text> ` : ''}
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
        super.attributeChangedCallback(name, oldval, newval);
        this.dispatchEvent(new Event(`${name}-changed`));
    }
    getSize() {
        let size;
        switch (this.size) {
            case 's':
                size = 24;
                break;
            case 'm':
                size = 32;
                break;
            case 'l':
                size = 40;
                break;
        }
        return size;
    }
};
__decorate([
    property({ type: String, reflect: true })
], Spinner.prototype, "size", void 0);
__decorate([
    property({ type: String, reflect: true })
], Spinner.prototype, "label", void 0);
Spinner = __decorate([
    customElement('air-spinner')
], Spinner);
export { Spinner };
//# sourceMappingURL=spinner.js.map