import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../icon';
import '../text';
import styles from './avatar.styles.scss'

/**
 * @prop {String} label - If set, defines the text label shown next to the icon/image. If the label is set and an image is not defined, the initials will be shown as a placeholder.
 * @prop {String} info - If set, defines the information text shown below the label.
 * @prop {String} image - If set, replaces the placeholder image with a custom image.
 * @prop {Boolean} condensed - If set, the image is shown in a smaller size.
 */
@customElement('air-avatar')
export class Avatar extends LitElement {
  @property({ type: String, reflect: true }) label: string | undefined;
  @property({ type: String, reflect: true }) info: string | undefined;
  @property({ type: String, reflect: true }) image: string | undefined;
  @property({ type: Boolean, reflect: true }) condensed: boolean | undefined;

  static get styles() {
    return styles
  }

  render() {
    return html`
      <!-- image -->
      <div class="image">
        ${this.image
          ? html` <img src="${this.image}" alt="${this.info}" title="${this.label}" /> `
          : html`
              ${this.label
                ? html` ${this.getInitials(this.label)} `
                : html` <air-icon icon="person"></air-icon> `}
            `}
      </div>
      <!-- text -->
      ${this.label || this.info
        ? html`
            <div class="text">
              ${this.label
                ? html`<air-text size="body-2" class="label"
                    >${this.label}</air-text
                  >`
                : ''}
              ${this.info
                ? html`<air-text
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

  attributeChangedCallback(name: string, oldval: string, newval: string) {
    super.attributeChangedCallback(name, oldval, newval);
    this.dispatchEvent(new Event(`${name}-changed`));
  }

  getInitials(label: string) {
    const initials = label.match(/\b\w/g) || [];
    return (initials.shift() || '') + (initials.pop() || '').toUpperCase();
  }
}
