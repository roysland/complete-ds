import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../icon';
import '../text';
import { styles } from './tab-item.scss'
/**
 * @prop {String} label - If set, defines the text label.
 * @prop {String} icon - If set, defines the icon shown above the label (if set).
 * @prop {Boolean} active - If set to true, a highlight style gets applied. Only one item can be active at a time.
 * @prop {Boolean} disabled - If set to true, disables mouse clicks and the style gets updated.
 * @prop {'horizontal'|'vertical'} orientation	- Defines the orientation of the component. Possible values are `horizontal` and `vertical`.
 *
 * @slot - The main content area. If used, replaces the label and icon elements.
 */
@customElement('air-tab-item')
export class TabItem extends LitElement {
  @property({ type: String, reflect: true }) label: string | undefined;
  @property({ type: String, reflect: true }) icon: string | undefined;
  @property({ type: Boolean, reflect: true }) active: boolean | undefined;
  @property({ type: Boolean, reflect: true }) disabled: boolean | undefined;
  @property({ type: String, reflect: true }) orientation:
    | 'horizontal'
    | 'vertical' = 'horizontal';

  static get styles() {
    return styles
  }

  render() {
    return html`
      <slot>
        ${this.icon ? html` <air-icon icon="${this.icon}"></air-icon> ` : ''}
        ${this.label
          ? html` <air-text class="label">${this.label}</air-text> `
          : ''}
      </slot>
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
    let siblings: any =
      this.closest('air-tabs')?.querySelectorAll('air-tab-item');
    siblings.forEach((el: any) => {
      el.active = false;
    });
    (<any>this).active = true;
  }
}

