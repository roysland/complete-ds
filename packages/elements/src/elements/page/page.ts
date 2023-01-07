import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './page.styles.scss'
/**
 * @prop {'dark'|'light'|undefined} theme - Defines the color theme of the page. Possible values are `dark` and `light`.
 * @prop {String} padding - Defines the padding style of the default slot.
 * @prop {'row'|'column'} direction - Defines the direction in which the slotted content flows (e.g. top to bottom or left to right). Possible values are `column` and `row`.
 * @prop {Boolean} flat - If set to true, the page background will be flat, without the need to use card as containers for the content.
 * @prop {Boolean} scrollable - If set to true, the page content will scroll if there is an overflow of content.
 *
 * @slot - The main content area.
 * @slot top - Shown on the top. Hosts components such as air-app-bar and air-nav-bar.
 * @slot bottom - Shown on the bottom. Hosts components such as air-nav-bar.
 * @slot left - Shown on the left side. Hosts components such as air-pane.
 * @slot right - Shown on the right side. Hosts components such as air-pane.
 */
@customElement('air-page')
export class Page extends LitElement {
  @property({ type: String, reflect: true }) theme:
    | 'dark'
    | 'light'
    | undefined;
  @property({ type: String, reflect: true }) padding = 'var(--spacing-l)';
  @property({ type: String, reflect: true, attribute: 'direction' })
  direction: 'row' | 'column' = 'row';
  @property({ type: Boolean, reflect: true }) flat: boolean | undefined;
  @property({ type: Boolean, reflect: true }) scrollable: boolean | undefined;

  static get styles() {
    return styles
  }

  render() {
    // @ts-ignore
    return html`
      <slot name="top"></slot>
      <div class="center-wrapper">
        <slot name="left"></slot>
        <slot style="padding: ${this.padding}"></slot>
        <slot name="right"></slot>
      </div>
      <slot name="bottom"></slot>
    `;
  }

  attributeChangedCallback(name: string, oldval: string, newval: string) {
    super.attributeChangedCallback(name, oldval, newval);
    this.dispatchEvent(new Event(`${name}-changed`));
  }
}
