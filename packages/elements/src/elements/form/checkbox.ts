import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../icon';
import '../text';
import styles from './checkbox.styles.scss'
/**
 * @prop {String} label -	If set, defines the text label.
 * @prop {Boolean} active - If set to true, a highlight style gets applied.
 * @prop {Boolean} disabled - If set to true, disables mouse clicks and the style gets updated.
 */
@customElement('air-checkbox')
export class AirCheckbox extends LitElement {
  @property({ type: String, reflect: true }) label: string | undefined;
  @property({ type: Boolean, reflect: true }) checked: boolean | undefined;
  @property({ type: Boolean, reflect: true }) disabled: boolean | undefined;
  static get styles() {
    return styles
  }

  render() {
    return html`
      <input
        type="checkbox"
        ?checked="${this.checked}"
        ?readonly="${this.disabled}"
        .value="${this.label}"
        .name="${this.label}"
        @change="${this.handleChange}"
      />
      <div class="box" tabindex="0" @keyup="${this.toggle}">
        ${this.checked
          ? html` <air-icon icon="check" size="s" color="white"></air-icon> `
          : ''}
      </div>
      ${this.label ? html` <air-text>${this.label}</air-text> ` : ''}
    `;
  }

  toggle (keyEvent: KeyboardEvent) {
    console.log(keyEvent)
    if (keyEvent.code === 'Space') {
        this.checked = !this.checked
    }
  }

  attributeChangedCallback(name: string, oldval: string, newval: string) {
    super.attributeChangedCallback(name, oldval, newval);
    this.dispatchEvent(new Event(`${name}-changed`));
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', () => {
      this.checked = !this.checked;
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

