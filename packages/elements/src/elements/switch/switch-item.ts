import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import '../icon';
import '../text';
import styles from './switch-item.scss'
/**
 * @prop {String} label - If set, defines the text label.
 * @prop {String} icon - If set, defines the icon shown instead of text label.
 * @prop {Boolean} active - If set to true, a highlight style gets applied. Only one item can be active at a time.
 * @prop {Boolean} disabled - If set to true, disables mouse clicks and the style gets updated.
 */
@customElement('air-switch-item')
export class SwitchItem extends LitElement {
  @property({ type: String, reflect: true }) label: string | undefined;
  @property({ type: String, reflect: true }) icon: string | undefined;
  @property({ type: Boolean, reflect: true }) active: boolean | undefined;
  @property({ type: Boolean, reflect: true }) disabled: boolean | undefined;

  static get styles() {
    return styles
  }

  render() {
    return html`
      ${this.icon ? html` <air-icon icon="${this.icon}"></air-icon> ` : ''}
      ${this.label && !this.icon
        ? html` <air-text class="label">${this.label}</air-text> `
        : ''}
    `;
  }

  attributeChangedCallback(name: string, oldval: string, newval: string) {
    super.attributeChangedCallback(name, oldval, newval);
    this.dispatchEvent(new Event(`${name}-changed`));
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', () => this.handleActive());
  }

  handleActive() {
    let siblings: any = this.parentElement?.childNodes;
    siblings.forEach((el: any) => {
      el.active = false;
    });
    (<any>this).active = true;
  }
}
