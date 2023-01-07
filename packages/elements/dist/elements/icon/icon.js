var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './icon.styles.scss';
let Icon = class Icon extends LitElement {
    constructor() {
        super(...arguments);
        this.size = 'm';
    }
    static get styles() {
        return styles;
    }
    render() {
        var _a;
        return html ` ${((_a = this.icon) === null || _a === void 0 ? void 0 : _a.indexOf('url')) ? html ` ${this.icon} ` : ''}`;
    }
    attributeChangedCallback(name, oldval, newval) {
        super.attributeChangedCallback(name, oldval, newval);
        this.dispatchEvent(new Event(`${name}-changed`));
        if (name == 'color' && this.color) {
            this.style.color = this.color;
        }
        else if (name == 'icon' && newval.indexOf('url') > -1) {
            this.setBackgroundImage(newval);
        }
    }
    setBackgroundImage(val) {
        this.style.backgroundImage = val;
    }
};
__decorate([
    property({ type: String, reflect: true })
], Icon.prototype, "icon", void 0);
__decorate([
    property({ type: String, reflect: true })
], Icon.prototype, "color", void 0);
__decorate([
    property({ type: String, reflect: true })
], Icon.prototype, "size", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Icon.prototype, "button", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Icon.prototype, "disabled", void 0);
Icon = __decorate([
    customElement('air-icon')
], Icon);
export { Icon };
//# sourceMappingURL=icon.js.map