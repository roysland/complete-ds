var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../card';
import '../icon';
import styles from './drawer.scss';
/**
 * @prop {String} label -	If set, defines the text label.
 * @prop {String} icon - If set, defines the icon shown close to the label.
 * @prop {'left'|'right'|'top'|'bottom'} position - Defines the position of the component in the screen. Possible values are `left`, `right`, `top` and `bottom`.
 * @prop {'row'|'column'} flexDirection - Defines the direction in which the slotted content flows (e.g. top to bottom or left to right). Possible values are `column` and `row`.
 * @prop {String} height - Defines the height of the container (not the overlay).
 * @prop {String} width - Defines the width of the container (not the overlay).
 * @prop {Boolean} visible - If set to true, displays the component on top of the screen.
 * @prop {Boolean} sticky - If set to true, clicking on the background will not hide the component. The close icon will also not be displayed.
 *
 * @slot - Displayed inside the content area.
 * @slot header - If used, the header slot is shown on top of the component, below the label (if any is set).
 * @slot functions - Shown on the right side of the label or header slot.
 * @slot footer - Shown below the content area.
 *
 * @cssprop --body-gap - Defines the gap between elements in the body slot.
 * @cssprop --header-gap - Defines the gap between elements in the header slot.
 * @cssprop --functions-gap - Defines the gap between elements in the functions slot.
 * @cssprop --footer-gap - Defines the gap between elements in the footer slot.
 */
let airDrawer = class airDrawer extends LitElement {
    constructor() {
        super(...arguments);
        this.position = 'left';
        this.height = '320px';
        this.width = '320px';
        this.flexDirection = 'column';
        // readonly properties
        this.emptyHeader = true;
        this.emptyFunctions = true;
        this.emptyFooter = true;
    }
    static get styles() {
        return styles;
    }
    render() {
        return html `
      <air-card
        @click="${(e) => e.stopPropagation()}"
        style="height: ${this.getCardSize().height}; width: ${this.getCardSize()
            .width}; max-height: ${this.getCardSize()
            .height}; max-width: ${this.getCardSize().width}"
        .label="${this.label}"
        .icon="${this.icon}"
        flex-direction="${this.flexDirection}"
      >
        <slot
          name="header"
          slot="${this.emptyHeader ? 'hidden' : 'header'}"
          @slotchange="${(e) => (this.emptyHeader = e.target.assignedNodes().length === 0)}"
        ></slot>
        <slot name="functions" slot="functions">
          ${!this.sticky
            ? html `
                <air-icon
                  button
                  icon="close"
                  @click="${() => (this.visible = false)}"
                ></air-icon>
              `
            : ''}
        </slot>
        <slot></slot>
        <slot
          name="footer"
          slot="${this.emptyFooter ? 'hidden' : 'footer'}"
          @slotchange="${(e) => (this.emptyFooter = e.target.assignedNodes().length === 0)}"
        ></slot>
      </air-card>
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
        super.attributeChangedCallback(name, oldval, newval);
        this.dispatchEvent(new Event(`${name}-changed`));
        if (name === 'visible' && this.visible) {
            this.addEventListener('click', () => !this.sticky ? (this.visible = false) : '');
        }
    }
    getCardSize() {
        let size = {
            height: undefined,
            width: undefined,
        };
        switch (this.position) {
            case 'left':
            case 'right':
                size.height = '100%';
                size.width = this.width;
                break;
            case 'top':
            case 'bottom':
                size.height = this.height;
                size.width = '100%';
                break;
        }
        return size;
    }
};
__decorate([
    property({ type: String, reflect: true })
], airDrawer.prototype, "label", void 0);
__decorate([
    property({ type: String, reflect: true })
], airDrawer.prototype, "icon", void 0);
__decorate([
    property({ type: String, reflect: true })
], airDrawer.prototype, "position", void 0);
__decorate([
    property({ type: String, reflect: true })
], airDrawer.prototype, "height", void 0);
__decorate([
    property({ type: String, reflect: true })
], airDrawer.prototype, "width", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'flex-direction' })
], airDrawer.prototype, "flexDirection", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], airDrawer.prototype, "visible", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], airDrawer.prototype, "sticky", void 0);
__decorate([
    state()
], airDrawer.prototype, "emptyHeader", void 0);
__decorate([
    state()
], airDrawer.prototype, "emptyFunctions", void 0);
__decorate([
    state()
], airDrawer.prototype, "emptyFooter", void 0);
airDrawer = __decorate([
    customElement('air-drawer')
], airDrawer);
export { airDrawer };
//# sourceMappingURL=drawer.js.map