import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../icon/index.js';
import '../text/index.js';
import styles from './badge.styles.scss'
/**
 * @prop {Number} label -		If set, degines the number shown inside the badge. Numbers bigger than 3 digits are shown as 999+.
 * @prop {'error'|'warning'|'success'|undefined} status - If set, a status icon is shown inside the badge. Accepted values are `error`, `warning`, `success`.
 */
@customElement('air-badge')
export class Badge extends LitElement {
  @property({ type: Number, reflect: true }) label: number | undefined;
  @property({ type: String, reflect: true }) status:
    | 'error'
    | 'warning'
    | 'success'
    | undefined;

  static get styles() {
    return styles
  }

  render() {
    return html`
      ${!this.status
        ? html`
            ${this.label
              ? html`
                  <air-text size="body-2">
                    ${this.label > 999 ? html` 999+ ` : html` ${this.label} `}
                  </air-text>
                `
              : ''}
          `
        : html`
            <!-- status -->
            ${this.status
              ? html`
                  <air-icon
                    class="status-icon"
                    size="s"
                    icon="${this.getStatusIcon()}"
                  ></air-icon>
                `
              : ''}
          `}
    `;
  }

  attributeChangedCallback(name: string, oldval: string, newval: string) {
    super.attributeChangedCallback(name, oldval, newval);
    this.dispatchEvent(new Event(`${name}-changed`));
  }

  getStatusIcon(): string | undefined {
    let icon;
    switch (this.status) {
      case 'error':
        icon = 'cancel';
        break;
      case 'warning':
        icon = 'error';
        break;
      case 'success':
        icon = 'check_circle';
        break;
    }
    return icon;
  }
}

