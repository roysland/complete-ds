import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './divider.styles.scss'
/**
 * @prop {'s'|'m'|'l'} spacing -	Defines the space around the divider. Possible values are `s`, `m` and `l`.
 * @prop {'horizontal'|'vertical'} orientation - Defines the orientation of the divider. Possible values are `vertical` and `horizontal`.
 */
@customElement('air-divider')
export class Divider extends LitElement {
  @property({ type: String, reflect: true }) spacing: 's' | 'm' | 'l' = 'm';
  @property({ type: String, reflect: true }) orientation:
    | 'horizontal'
    | 'vertical' = 'horizontal';

  static get styles() {
    return styles
  }

  render() {
    return html`<div class="line"></div>`;
  }

  attributeChangedCallback(name: string, oldval: string, newval: string) {
    super.attributeChangedCallback(name, oldval, newval);
    this.dispatchEvent(new Event(`${name}-changed`));
  }
}
