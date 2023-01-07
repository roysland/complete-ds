var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../icon/index.js';
import '../text/index.js';
import styles from './badge.styles.scss';
/**
 * @prop {Number} label -		If set, degines the number shown inside the badge. Numbers bigger than 3 digits are shown as 999+.
 * @prop {'error'|'warning'|'success'|undefined} status - If set, a status icon is shown inside the badge. Accepted values are `error`, `warning`, `success`.
 */
let Badge = class Badge extends LitElement {
    static get styles() {
        return styles;
    }
    render() {
        return html `
      ${!this.status
            ? html `
            ${this.label
                ? html `
                  <air-text size="body-2">
                    ${this.label > 999 ? html ` 999+ ` : html ` ${this.label} `}
                  </air-text>
                `
                : ''}
          `
            : html `
            <!-- status -->
            ${this.status
                ? html `
                  <air-icon
                    class="status-icon"
                    size="s"
                    icon="${this.getStatusIcon()}"
                  ></air-icon>
                `
                : ''}
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
            case 'error':
                icon = 'cancel';
                break;
            case 'warning':
                icon = 'error';
                break;
            case 'success':
                icon = 'check_circle';
                break;
        }
        return icon;
    }
};
__decorate([
    property({ type: Number, reflect: true })
], Badge.prototype, "label", void 0);
__decorate([
    property({ type: String, reflect: true })
], Badge.prototype, "status", void 0);
Badge = __decorate([
    customElement('air-badge')
], Badge);
export { Badge };
//# sourceMappingURL=badge.js.map