import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../text';
import styles from './spinner.scss'

/**
 * @prop {String} label - If set, defines the text label.
 * @prop {'s'|'m'|'l'} size - Defines the size of the component. Possible values are `s`(24px), `m`(32px) and `l`(40px).
 */
@customElement('air-spinner')
export class Spinner extends LitElement {
  @property({ type: String, reflect: true }) size: 's' | 'm' | 'l' = 'm';
  @property({ type: String, reflect: true }) label: string | undefined;

  static get styles() {
    return styles
  }

  render() {
    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="${this.getSize()}"
        viewBox="0 0 ${this.getSize()} ${this.getSize()}"
      >
        <circle
          stroke-dasharray="${this.getSize()}"
          r="${this.getSize() / 2 - 4}"
          cx="${this.getSize() / 2}"
          cy="${this.getSize() / 2}"
        />
      </svg>
      ${this.label ? html` <air-text>${this.label}</air-text> ` : ''}
    `;
  }

  attributeChangedCallback(name: string, oldval: string, newval: string) {
    super.attributeChangedCallback(name, oldval, newval);
    this.dispatchEvent(new Event(`${name}-changed`));
  }

  getSize(): number {
    let size;
    switch (this.size) {
      case 's':
        size = 24;
        break;
      case 'm':
        size = 32;
        break;
      case 'l':
        size = 40;
        break;
    }
    return size;
  }
}
