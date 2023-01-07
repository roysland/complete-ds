var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
/**
 * @slot - The default slot. Takes `air-breadcrumb-item`s as children.
 */
let AirBreadCrumbs = class AirBreadCrumbs extends LitElement {
    static get styles() {
        return [
            css `
        :host {
          display: flex;
          width: 100%;
          height: max-content;
        }
      `,
        ];
    }
    render() {
        return html ` <slot></slot> `;
    }
};
AirBreadCrumbs = __decorate([
    customElement('air-breadcrumbs')
], AirBreadCrumbs);
export { AirBreadCrumbs };
//# sourceMappingURL=breadcrumbs.js.map