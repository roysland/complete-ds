var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './divider.styles.scss';
/**
 * @prop {'s'|'m'|'l'} spacing -	Defines the space around the divider. Possible values are `s`, `m` and `l`.
 * @prop {'horizontal'|'vertical'} orientation - Defines the orientation of the divider. Possible values are `vertical` and `horizontal`.
 */
let Divider = class Divider extends LitElement {
    constructor() {
        super(...arguments);
        this.spacing = 'm';
        this.orientation = 'horizontal';
    }
    static get styles() {
        return styles;
    }
    render() {
        return html `<div class="line"></div>`;
    }
    attributeChangedCallback(name, oldval, newval) {
        super.attributeChangedCallback(name, oldval, newval);
        this.dispatchEvent(new Event(`${name}-changed`));
    }
};
__decorate([
    property({ type: String, reflect: true })
], Divider.prototype, "spacing", void 0);
__decorate([
    property({ type: String, reflect: true })
], Divider.prototype, "orientation", void 0);
Divider = __decorate([
    customElement('air-divider')
], Divider);
export { Divider };
//# sourceMappingURL=divider.js.map