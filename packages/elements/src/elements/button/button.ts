import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import buttonStyles from './button.styles.scss'
@customElement('air-button')
export class AirButton extends LitElement {
    @property({ type: String, reflect: true }) label: string | undefined;
    @property({ type: String, reflect: true }) icon: string | undefined;
    @property({ type: String, reflect: true }) variant:
        | 'primary'
        | 'secondary'
        | 'tertiary' = 'primary';
    @property({ type: Boolean, reflect: true }) disabled: boolean | undefined;

    static get styles () {
        return buttonStyles
    }

    render() {
        return html`
          <slot name="icon">
            ${this.icon ? html` <air-icon icon="${this.icon}"></air-icon> ` : ''}
          </slot>
          <slot> ${this.label ? html` ${this.label} ` : ''}</slot>
        `;
      }
    
      attributeChangedCallback(name: string, oldval: string, newval: string) {
        super.attributeChangedCallback(name, oldval, newval);
        this.dispatchEvent(new Event(`${name}-changed`));
      }
}

