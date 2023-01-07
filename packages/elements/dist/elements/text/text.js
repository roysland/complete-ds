var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './text.styles.scss';
/**
 * @prop {'header-1'|'header-2'|'body-1'|'body-2'} size - Defines the size, line height, font family and initial color of the text. Possible values are `header-1`, `header-2`, `body-1` and `body-2`, but custom styles can be set through css.
 * @prop {String} color - If set, overwrites the initial color of the text. Possible values are var(--text-1) (90% neutral color), var(--text-2) (60% neutral color) and var(--text-3) (20% neutral color), but any custom RGB, RGBA, HEX or color variable can be passed to the property as value as well.
 *
 * @slot - Container where plain text (and/or other elements) is written.
 */
let AirText = class AirText extends LitElement {
    constructor() {
        super(...arguments);
        this.size = 'label';
    }
    static get styles() {
        return styles;
    }
    render() {
        return html `<slot></slot>`;
    }
    attributeChangedCallback(name, oldval, newval) {
        super.attributeChangedCallback(name, oldval, newval);
        this.dispatchEvent(new Event(`${name}-changed`));
        if (name == 'color' && this.color) {
            this.style.color = this.color;
        }
    }
};
__decorate([
    property({ type: String, reflect: true })
], AirText.prototype, "size", void 0);
__decorate([
    property({ type: String, reflect: true })
], AirText.prototype, "color", void 0);
AirText = __decorate([
    customElement('air-text')
], AirText);
export { AirText };
//# sourceMappingURL=text.js.map