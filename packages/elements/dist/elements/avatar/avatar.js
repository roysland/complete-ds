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
import styles from './avatar.styles.scss';
/**
 * @prop {String} label - If set, defines the text label shown next to the icon/image. If the label is set and an image is not defined, the initials will be shown as a placeholder.
 * @prop {String} info - If set, defines the information text shown below the label.
 * @prop {String} image - If set, replaces the placeholder image with a custom image.
 * @prop {Boolean} condensed - If set, the image is shown in a smaller size.
 */
let Avatar = class Avatar extends LitElement {
    static get styles() {
        return styles;
    }
    render() {
        return html `
      <!-- image -->
      <div class="image">
        ${this.image
            ? html ` <img src="${this.image}" /> `
            : html `
              ${this.label
                ? html ` ${this.getInitials(this.label)} `
                : html ` <air-icon icon="person"></air-icon> `}
            `}
      </div>
      <!-- text -->
      ${this.label || this.info
            ? html `
            <div class="text">
              ${this.label
                ? html `<air-text size="body-2" class="label"
                    >${this.label}</air-text
                  >`
                : ''}
              ${this.info
                ? html `<air-text
                    size="body-2"
                    class="info"
                    color="var(--text-2)"
                    >${this.info}</air-text
                  >`
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
    getInitials(label) {
        const initials = label.match(/\b\w/g) || [];
        return (initials.shift() || '') + (initials.pop() || '').toUpperCase();
    }
};
__decorate([
    property({ type: String, reflect: true })
], Avatar.prototype, "label", void 0);
__decorate([
    property({ type: String, reflect: true })
], Avatar.prototype, "info", void 0);
__decorate([
    property({ type: String, reflect: true })
], Avatar.prototype, "image", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Avatar.prototype, "condensed", void 0);
Avatar = __decorate([
    customElement('air-avatar')
], Avatar);
export { Avatar };
//# sourceMappingURL=avatar.js.map