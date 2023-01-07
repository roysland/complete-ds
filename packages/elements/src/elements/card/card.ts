import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import styles from './card.styles.scss'
import '../icon';

@customElement('air-card')
export class AirCard extends LitElement {
  @property({ type: String, reflect: true }) label: string | undefined;
  @property({ type: String, reflect: true }) icon: string | undefined;
  @property({ type: String, reflect: true }) image: string | undefined;
  @property({ type: String, reflect: true, attribute: 'flex-direction' })
  flexDirection: 'column' | 'row' = 'column';
  @property({ type: Boolean, reflect: true }) flat: boolean | undefined;

  // readonly properties
  @state() emptyHeader = true;
  @state() emptyFunctions = true;
  @state() emptyFooter = true;

  static get styles() {
    return styles
  }

  render() {
    return html`
      ${this.image ? html` <img class="image" alt="${this.label}" title="${this.label}" src="${this.image}" /> ` : ''}
      <div
        class="top ${this.emptyHeader &&
        this.emptyFunctions &&
        !this.label &&
        !this.icon
          ? 'empty'
          : ''}"
      >
        <div class="header">
          ${this.label || this.icon
            ? html`
                <div class="label">
                  ${this.icon
                    ? html` <air-icon icon="${this.icon}"></air-icon> `
                    : ''}
                  <air-text size="card-title">${this.label}</air-text>
                </div>
                ${!this.emptyHeader && (this.label || this.icon)
                  ? html` <div style="margin-top: var(--spacing-l)"></div> `
                  : ''}
              `
            : ''}
          <slot
            name="header"
            @slotchange="${(e: any) =>
              (this.emptyHeader = e.target.assignedNodes().length === 0)}"
            class="${this.emptyHeader ? 'empty' : ''}"
          ></slot>
        </div>
        <slot
          name="functions"
          @slotchange="${(e: any) =>
            (this.emptyFunctions = e.target.assignedNodes().length === 0)}"
        ></slot>
      </div>
      <slot></slot>
      <slot
        name="footer"
        @slotchange="${(e: any) =>
          (this.emptyFooter = e.target.assignedNodes().length === 0)}"
        class="${this.emptyFooter ? 'empty' : ''}"
      ></slot>
    `;
  }

  attributeChangedCallback(name: string, oldval: string, newval: string) {
    super.attributeChangedCallback(name, oldval, newval);
    this.dispatchEvent(new Event(`${name}-changed`));
  }
}
