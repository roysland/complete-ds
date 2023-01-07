import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './radio.scss'
import '../text';

/**
 * @prop {String} label - If set, defines the text label.
 * @prop {Boolean} active - If set to true, a highlight style gets applied. Only one item can be active at a time.
 * @prop {Boolean} disabled - If set to true, disables mouse clicks and the style gets updated.
 */
@customElement('air-radio')
export class RadioButton extends LitElement {
  @property({ type: String, reflect: true }) label: string | undefined;
  @property({ type: Boolean, reflect: true }) active: boolean | undefined;
  @property({ type: Boolean, reflect: true }) disabled: boolean | undefined;

  static get styles() {
    return styles
  }

  render() {
    return html`
      <input
        type="radio"
        ?checked="${this.active}"
        .value="${this.label}"
        .name="${this.label}"
        @change="${this.handleChange}"
      />
      <div class="circle"></div>
      ${this.label ? html` <air-text>${this.label}</air-text> ` : ''}
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

  handleChange() {
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
      })
    );
  }

  handleActive() {
    let siblings: NodeList | undefined = this.parentElement?.childNodes;
    siblings?.forEach((el: any) => {
      el.active = false;
    });
    (<any>this).active = true;
  }
}

