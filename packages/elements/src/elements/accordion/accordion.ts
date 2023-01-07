import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../icon';
import '../card';
import styles from './accordion.styles.scss'
/**
 * @prop {String} label -	Defines the text label.
 * @prop {String} icon - If set, defines the icon shown before the label.
 * @prop {Boolean} expanded -	If set to true, expands the accordion to display its content.
 * @prop {Boolean} disabled -	If set to true, disables mouse clicks and the style gets updated.
 *
 * @slot - Displayed inside the accordion when it is expanded.
 * @slot header - If used, the header slot replaces the default text label and expand arrow with custom content.
 * @slot functions - Displayed close to the 'expand' arrow.
 * @slot footer - Displayed below the content when it is expanded.
 *
 * @cssprop --body-gap - Defines the gap between elements in the body slot.
 * @cssprop --header-gap - Defines the gap between elements in the header slot.
 * @cssprop --functions-gap - Defines the gap between elements in the functions slot.
 * @cssprop --footer-gap - Defines the gap between elements in the footer slot.
 */
@customElement('air-accordion')
export class AirAccordion extends LitElement {
  @property({ type: String, reflect: true }) label = 'Label';
  @property({ type: String, reflect: true }) icon: string | undefined;
  @property({ type: Boolean, reflect: true }) expanded: boolean | undefined;
  @property({ type: Boolean, reflect: true }) disabled: boolean | undefined;

  // readonly properties
  @state() emptyHeader = true;
  @state() emptyFunctions = true;
  @state() emptyBody = true;
  @state() emptyFooter = true;

  static get styles() {
    return styles
  }

  render() {
    return html`
      <air-card
        @click="${() => (!this.expanded ? (this.expanded = true) : '')}"
      >
        <slot
          name="header"
          slot="header"
          @click="${(e: any) => this.handleCollapse(e)}"
        >
          <div class="header">
            ${this.icon
              ? html` <air-icon class="icon" icon="${this.icon}"></air-icon> `
              : ''}
            <p>${this.label}</p>
            <air-icon
              button
              class="expand"
              icon="keyboard_arrow_down"
            ></air-icon>
          </div>
        </slot>
        <slot name="functions" slot="functions"></slot>
        <slot></slot>
        ${this.expanded
          ? html`
              <slot
                name="footer"
                slot="${this.emptyFooter ? 'hidden' : 'footer'}"
                @slotchange="${(e: any) =>
                  (this.emptyFooter = e.target.assignedNodes().length === 0)}"
              ></slot>
            `
          : ''}
      </air-card>
    `;
  }

  attributeChangedCallback(name: string, oldval: string, newval: string) {
    super.attributeChangedCallback(name, oldval, newval);
    this.dispatchEvent(new Event(`${name}-changed`));
  }

  connectedCallback() {
    super.connectedCallback();
    // remove card padding
    setTimeout(() => {
      const topNode: HTMLElement | null | undefined = this.shadowRoot
        ?.querySelector('air-card')
        ?.shadowRoot?.querySelector('.top');
      if (topNode) {
        topNode.style.padding = '0';
      }
    }, 0);
  }

  handleCollapse(e: any) {
    if (this.expanded) {
      this.expanded = false;
      e.stopPropagation();
    }
  }
}
