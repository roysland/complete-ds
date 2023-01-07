var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../icon';
import '../text';
import styles from './progress.scss';
/**
 * @prop {String} label - If set, defines the text label shown above the bar.
 * @prop {String} info - If set, defines the info text shown below of the bar.
 * @prop {'success'|'warning'|'error'|undefined} status - If set, shows a status icon besides the information text. Possible values are `success`, `warning` and `error`.
 * @prop {String} color - If set, defines the color of the bar.
 * @prop {'s'|'m'|'l'} size - (Only if radial is true) Defines the size of the bar. Possible values are `s`, `m` and `l`.
 * @prop {Number} value - Defines the value of the bar. Must be a number from 0 to 100.
 * @prop {Boolean} radial - If set to true, the bar will become a circle instead of a linear bar.
 * @prop {Boolean} showProgress - If set to true, the value (in %) will be visible.
 */
let ProgressBar = class ProgressBar extends LitElement {
    constructor() {
        super(...arguments);
        this.size = 'm';
    }
    static get styles() {
        return styles;
    }
    render() {
        return html `
      <!-- header -->
      ${this.label || this.showProgress
            ? html `
            <div class="header">
              <air-text size="header-2" class="label">${this.label}</air-text>
              ${this.showProgress && !this.radial
                ? html ` <air-text size="header-2">${this.value}%</air-text> `
                : ''}
            </div>
          `
            : ''}
      ${!this.radial
            ? html `
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
                fill="${this.color ? this.color : 'rgb(var(--accent-1))'}"
                width="${this.value}%"
                height="100%"
                clip-path="url(#clip-path)"
              />
            </svg>
          `
            : html `
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
                  stroke="${this.color ? this.color : 'rgb(var(--accent-1))'}"
                  stroke-dasharray="${2 * Math.PI * (this.getSize() / 2 - 4)}"
                  stroke-dashoffset="${2 *
                Math.PI *
                (this.getSize() / 2 - 4) *
                (1 - (this.value ? this.value / 100 : 0))}"
                  r="${this.getSize() / 2 - 4}"
                  cx="${this.getSize() / 2}"
                  cy="${this.getSize() / 2}"
                />
              </svg>
              ${this.showProgress
                ? html ` <air-text size="header-2">${this.value}%</air-text> `
                : ''}
            </div>
          `}
      ${this.info || this.status
            ? html `
            <div class="footer">
              <!-- status -->
              ${this.status
                ? html `
                    <air-icon
                      class="status-icon"
                      .icon="${this.getStatusIcon()}"
                    ></air-icon>
                  `
                : ''}
              <!-- info -->
              ${this.info
                ? html `
                    <air-text color="var(--text-2)" class="info"
                      >${this.info}</air-text
                    >
                  `
                : ''}
            </div>
          `
            : ''}
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
    getSize() {
        let size;
        switch (this.size) {
            case 's':
                size = 48;
                break;
            case 'm':
                size = 64;
                break;
            case 'l':
                size = 80;
                break;
            default:
                size = 0;
        }
        return size;
    }
};
__decorate([
    property({ type: String, reflect: true })
], ProgressBar.prototype, "label", void 0);
__decorate([
    property({ type: String, reflect: true })
], ProgressBar.prototype, "info", void 0);
__decorate([
    property({ type: String, reflect: true })
], ProgressBar.prototype, "status", void 0);
__decorate([
    property({ type: String, reflect: true })
], ProgressBar.prototype, "color", void 0);
__decorate([
    property({ type: String, reflect: true })
], ProgressBar.prototype, "size", void 0);
__decorate([
    property({ type: Number, reflect: true })
], ProgressBar.prototype, "value", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ProgressBar.prototype, "radial", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'show-progress' })
], ProgressBar.prototype, "showProgress", void 0);
ProgressBar = __decorate([
    customElement('air-progress')
], ProgressBar);
export { ProgressBar };
//# sourceMappingURL=progress.js.map