import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../icon';
import '../text';
import styles from './menu-item.styles.scss'
/**
 * @prop {String} label - Defines the text label.
 * @prop {String} icon - If set, defines the icon shown before the label.
 * @prop {Boolean} active - If set to true, a highlight style gets applied.
 * @prop {Boolean} toggle - If set to true, clicking on the component will toggle the active property between true and false.
 * @prop {Boolean} disabled - If set to true, disables mouse clicks and the style gets updated.
 *
 * @slot - Displayed inside the content area.
 * @slot functions - Shown on the right side.
 */
@customElement('air-menu-item')
export class MenuItem extends LitElement {
  @property({ type: String, reflect: true }) label = 'Label';
  @property({ type: String, reflect: true }) icon: string | undefined;
  @property({ type: Boolean, reflect: true }) active: boolean | undefined;
  @property({ type: Boolean, reflect: true }) toggle = true;
  @property({ type: Boolean, reflect: true }) disabled: boolean | undefined;

  static get styles() {
    return styles
  }

  render() {
    return html`
      ${this.icon ? html` <air-icon icon="${this.icon}"></air-icon> ` : ''}
      ${this.label ? html` <air-text>${this.label}</air-text> ` : ''}
      <!-- functions slot -->
      <slot name="functions"></slot>
    `;
  }

  attributeChangedCallback(name: string, oldval: string, newval: string) {
    super.attributeChangedCallback(name, oldval, newval);
    this.dispatchEvent(new Event(`${name}-changed`));
    // add toggle click listener
    if (name == 'toggle' && this.toggle) {
      this.addEventListener('click', () => {
        this.active = !this.active;
      });
    }
  }
}
