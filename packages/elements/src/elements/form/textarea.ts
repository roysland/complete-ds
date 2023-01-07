import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './textarea.scss'
/**
 * @prop {String} label - If set, defines the text label shown on top.
 * @prop {String} value - If set, defines the value of the input. Changes upon user interaction.
 * @prop {Number} rows - Defines the visible number of lines in a text area.
 * @prop {Boolean} active - If set to true, highlights the label and underline.
 * @prop {Boolean} disabled - If set to true, disables mouse clicks and the style gets updated.
 * @prop {Boolean} readonly - If set to true, disables the input without reducing the opacity.
 * @prop {Boolean} autofocus - If set to true, the component gets focused as soon as the page loads.
 */
@customElement('air-textarea')
export class Textarea extends LitElement {
  @property({ type: String, reflect: true }) label: string | undefined;
  @property({ type: String, reflect: true }) value: string | undefined;
  @property({ type: Number, reflect: true }) rows = 1;
  @property({ type: Boolean, reflect: true }) active: boolean | undefined;
  @property({ type: Boolean, reflect: true }) disabled: boolean | undefined;
  @property({ type: Boolean, reflect: true }) readonly: boolean | undefined;
  @property({ type: Boolean, reflect: true }) autofocus: boolean = false;

  static get styles() {
    return styles
  }

  render() {
    return html`
      <div class="center">
        ${this.label ? html` <label class="label">${this.label}</label> ` : ''}
        <textarea
          .value="${this.value !== undefined ? this.value : ''}"
          .rows="${this.rows}"
          .columns="${this.rows}"
          ?autofocus="${this.autofocus}"
          ?disabled="${this.disabled}"
          ?readonly="${this.readonly}"
          @focus="${() => (this.active = true)}"
          @blur="${() => (this.active = false)}"
          @input="${this.handleChange}"
        ></textarea>
      </div>
    `;
  }

  constructor() {
    super();
    this.addEventListener('click', () => {
      this.active = true;
      this.shadowRoot?.querySelector('textarea')?.focus();
    });
  }

  handleChange(e: Event) {
    this.value = (<any>e.target).value;
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
      })
    );
  }

  handleClear() {
    this.value = undefined;
    this.removeAttribute('value');
  }

  attributeChangedCallback(name: string, oldval: string, newval: string) {
    super.attributeChangedCallback(name, oldval, newval);
    this.dispatchEvent(new Event(`${name}-changed`));
  }
}

