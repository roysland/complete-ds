import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './icon.styles.scss'
@customElement('air-icon')
export class Icon extends LitElement {
  @property({ type: String, reflect: true }) icon: string | undefined;
  @property({ type: String, reflect: true }) color: string | undefined;
  @property({ type: String, reflect: true }) size: 's' | 'm' | 'l' | 'xl' = 'm';
  @property({ type: Boolean, reflect: true }) button: boolean | undefined;
  @property({ type: Boolean, reflect: true }) disabled: boolean | undefined;

  static get styles() {
    return styles
  }

  render() {
    return html` ${this.icon?.indexOf('url') ? html` ${this.icon} ` : ''}`;
  }

  attributeChangedCallback(name: string, oldval: string, newval: string) {
    super.attributeChangedCallback(name, oldval, newval);
    this.dispatchEvent(new Event(`${name}-changed`));
    if (name == 'color' && this.color) {
      this.style.color = this.color;
    } else if (name == 'icon' && newval.indexOf('url') > -1) {
      this.setBackgroundImage(newval);
    }
  }

  private setBackgroundImage(val: string): void {
    this.style.backgroundImage = val;
  }
}
