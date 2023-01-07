import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../icon';
import '../text';
import styles from './tag.scss'
/**
 * @prop {String} label - If set, defines the text label.
 * @prop {String} icon - If set, defines the icon shown besides the label.
 * @prop {Boolean} button - If set to true, hover and click effects will be added.
 * @prop {Boolean} removable - If set to true, a close icon is displayed. Clicking on it dispatches a remove event.
 *
 * @fires remove - Dispatched when clicking on the close icon (removable only).
 */
@customElement('air-tag')
export class Tag extends LitElement {
  @property({ type: String, reflect: true }) label = 'Label';
  @property({ type: String, reflect: true }) icon: string | undefined;
  @property({ type: Boolean, reflect: true }) button: boolean | undefined;
  @property({ type: Boolean, reflect: true }) removable: boolean | undefined;
  @property({ type: String, reflect: true }) variant: String | undefined;
  @property({ type: String, reflect: true }) color: String | undefined;
  static get styles() {
    return styles
  }

  render() {
    return html`
      <!-- icon -->
      ${this.icon ? html` <air-icon icon="${this.icon}"></air-icon> ` : ''}
      <!-- label -->
      ${this.label
        ? html` <air-text class="label" size="xs" color="${this.color}">${this.label}</air-text> `
        : ''}
      <!-- removable -->
      ${this.removable
        ? html`
            <air-icon
              icon="close"
              button
              @click="${() => this.handleRemove()}"
            ></air-icon>
          `
        : ''}
    `;
  }

  attributeChangedCallback(name: string, oldval: string, newval: string) {
    super.attributeChangedCallback(name, oldval, newval);
    this.dispatchEvent(new Event(`${name}-changed`));
  }

  handleRemove() {
    this.dispatchEvent(new Event('remove'));
  }
}

