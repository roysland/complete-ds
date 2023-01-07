import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * @slot - The default slot. Takes `air-breadcrumb-item`s as children.
 */
@customElement('air-breadcrumbs')
export class AirBreadCrumbs extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          width: 100%;
          height: max-content;
        }
      `,
    ];
  }

  render() {
    return html` <slot></slot> `;
  }
}