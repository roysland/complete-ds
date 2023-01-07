import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../text';
import styles from './toggle.scss'
/**
 * @prop {String} label - If set, defines the text label.
 * @prop {Boolean} active - If set to true, a highlight style gets applied.
 * @prop {Boolean} disabled - If set to true, disables mouse clicks and the style gets updated.
 */
@customElement('air-toggle')
export class Toggle extends LitElement {
  @property({ type: String, reflect: true }) label: string | undefined;
  @property({ type: Boolean, reflect: true }) active: boolean | undefined;
  @property({ type: Boolean, reflect: true }) disabled: boolean | undefined;

  static get styles() {
    return styles
  }

  render() {
    return html`
      <input
        type="checkbox"
        ?checked="${this.active}"
        ?readonly="${this.disabled}"
        .value="${this.label}"
        .name="${this.label}"
        @change="${this.handleChange}"
      />
      <div class="bg">
        <div class="dot"></div>
      </div>
      ${this.label ? html` <air-text>${this.label}</air-text> ` : ''}
    `;
  }

  attributeChangedCallback(name: string, oldval: string, newval: string) {
    super.attributeChangedCallback(name, oldval, newval);
    this.dispatchEvent(new Event(`${name}-changed`));
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', () => {
      this.active = !this.active;
    });
  }

  handleChange() {
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
      })
    );
  }
}
