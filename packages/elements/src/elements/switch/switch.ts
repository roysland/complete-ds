import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './switch.scss'
/**
 * @slot - Hosts air-switch-items.
 */
@customElement('air-switch')
export class Switch extends LitElement {
  static get styles() {
    return styles
  }

  render() {
    return html` <slot></slot> `;
  }

  attributeChangedCallback(name: string, oldval: string, newval: string) {
    super.attributeChangedCallback(name, oldval, newval);
    this.dispatchEvent(new Event(`${name}-changed`));
  }
}
