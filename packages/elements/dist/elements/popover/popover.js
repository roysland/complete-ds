var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../card';
import styles from './popover.scss';
/**
 * @prop {String} label - If set, defines the text label.
 * @prop {String} icon - If set, defines the icon shown close to the label.
 * @prop {'left'|'right'|'top'|'bottom'} position - Defines the position of the component in the screen. Possible values are `left`, `right`, `top` and `bottom`.
 * @prop {'row'|'column'} flexDirection - Defines the direction in which the slotted content flows (e.g. top to bottom or left to right). Possible values are `column` and `row`.
 * @prop {String} target - Defines the DOM element to which the click event will be attached. It behaves identically to querySelector, which means tag names, IDs, classes and similar can be used (e.g. #myEl, .myEl, air-input[type='number']). Please ensure the selector is unique.
 * @prop {Boolean} visible - If set to true, displays the component on top of the screen.
 * @prop {Boolean} sticky - If set to true, clicking on the page will not hide the component.
 *
 * @slot - Displayed inside the content area.
 * @slot header - If used, the header slot is shown on top of the component, below the label (if any is set).
 * @slot functions - Displayed on the right side of the label or header slot.
 * @slot footer - Displayed below the content area.
 *
 * @cssprop --body-gap - Defines the gap between elements in the body slot.
 * @cssprop --header-gap - Defines the gap between elements in the header slot.
 * @cssprop --functions-gap - Defines the gap between elements in the functions slot.
 * @cssprop --footer-gap - Defines the gap between elements in the footer slot.
 */
let Popover = class Popover extends LitElement {
    constructor() {
        super(...arguments);
        this.flexDirection = 'column';
        this.position = 'bottom';
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
        @wheel="${(e) => e.stopPropagation()}"
        .label="${this.label}"
        .icon="${this.icon}"
        flex-direction="${this.flexDirection}"
      >
        <slot
          name="header"
          slot="${this.emptyHeader ? 'hidden' : 'header'}"
          @slotchange="${(e) => (this.emptyHeader = e.target.assignedNodes().length === 0)}"
        ></slot>
        <slot
          name="functions"
          slot="${this.emptyFunctions ? 'hidden' : 'functions'}"
          @slotchange="${(e) => (this.emptyFunctions = e.target.assignedNodes().length === 0)}"
        ></slot>
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
        // add listener on target changed
        if (name === 'target' && this.target) {
            this.targetObserver();
        }
        // handle position if visibility changes
        else if (name === 'visible' && this.visible) {
            this.visibleObserver();
        }
    }
    targetObserver() {
        const tar = typeof this.target === 'string'
            ? document.querySelector(this.target)
            : this.target;
        if (tar) {
            tar.addEventListener('click', () => this.handlePosition(tar));
        }
    }
    visibleObserver() {
        const tar = typeof this.target === 'string'
            ? document.querySelector(this.target)
            : this.target;
        if (tar) {
            this.handlePosition(tar);
            if (!this.sticky && this.target) {
                this.addDocListener(tar);
            }
        }
    }
    handlePosition(tar) {
        if (!tar) {
            return;
        }
        let self = this;
        let rect = tar.getBoundingClientRect();
        self.visible = true;
        // get y axis
        if (self.position.startsWith('bottom')) {
            self.style.top = `${rect.top + rect.height + 8}px`;
        }
        else if (self.position.startsWith('top')) {
            self.style.top = `${rect.top - self.clientHeight - 8}px`;
        }
        else {
            self.style.top = `${rect.top + rect.height / 2 - self.clientHeight / 2}px`;
            // The top of the viewport check for overflow
            if (parseInt(self.style.top) < 0)
                self.style.top = '8px';
            // The bottom of the viewport check for overflow
            const viewport_height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
            if (parseInt(self.style.top) + self.clientHeight > viewport_height) {
                self.style.top = `${viewport_height - self.clientHeight - 8}px`;
            }
        }
        // get x axis
        if (self.position.startsWith('right')) {
            self.style.left = `${rect.left + rect.width + 8}px`;
        }
        else if (self.position.startsWith('left')) {
            self.style.left = `${rect.left - self.clientWidth - 8}px`;
        }
        else {
            self.style.left = `${rect.left + rect.width / 2 - self.clientWidth / 2}px`;
        }
    }
    addDocListener(tar) {
        let closePopover = (e) => {
            if ((e.composedPath()[0] !== tar && // if the target is rendered in a shadowRoot
                e.target !== tar &&
                e.type === 'click') ||
                e.type === 'wheel') {
                this.visible = false;
                document.removeEventListener('click', closePopover);
                document.removeEventListener('wheel', closePopover);
            }
        };
        document.addEventListener('click', closePopover);
        document.addEventListener('wheel', closePopover);
    }
};
__decorate([
    property({ type: String, reflect: true })
], Popover.prototype, "label", void 0);
__decorate([
    property({ type: String, reflect: true })
], Popover.prototype, "icon", void 0);
__decorate([
    property({ type: String, reflect: true, attribute: 'flex-direction' })
], Popover.prototype, "flexDirection", void 0);
__decorate([
    property({ type: String, reflect: true })
], Popover.prototype, "position", void 0);
__decorate([
    property({ type: String, reflect: true })
], Popover.prototype, "target", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Popover.prototype, "visible", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Popover.prototype, "sticky", void 0);
__decorate([
    state()
], Popover.prototype, "emptyHeader", void 0);
__decorate([
    state()
], Popover.prototype, "emptyFunctions", void 0);
__decorate([
    state()
], Popover.prototype, "emptyFooter", void 0);
Popover = __decorate([
    customElement('air-popover')
], Popover);
export { Popover };
//# sourceMappingURL=popover.js.map