var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './stepper-item.scss';
import '../icon';
import '../text';
/**
 * @prop {String} label - If set, defines the text label.
 * @prop {String} info - If set, defines the information text shown below the label.
 * @prop {String} icon - If set, defines the icon shown instead of the index number.
 * @prop {Number} index - Defines the index number shown inside the bubble (if icon is undefined). It is set dinamically by the component.
 * @prop {Boolean} active - If set to true, a highlight style gets applied. Only one item can be active at a time.
 * @prop {Boolean} disabled - If set to true, disables mouse clicks and the style gets updated.
 * @prop {'horizontal'|'vertical'} orientation - Defines the orientation of the component. Possible values are `horizontal` and `vertical`.
 */
let StepperItem = class StepperItem extends LitElement {
    constructor() {
        super(...arguments);
        this.orientation = 'horizontal';
    }
    static get styles() {
        return styles;
    }
    render() {
        return html `
      <!-- circle -->
      <div class="circle">
        ${this.icon
            ? html ` <air-icon icon="${this.icon}"></air-icon> `
            : html `
              <air-text size="header-1" class="number">${this.index}</air-text>
            `}
      </div>
      <!-- text -->
      <div class="text">
        ${this.label
            ? html ` <air-text class="label">${this.label}</air-text> `
            : ''}
        ${this.info
            ? html ` <air-text size="body-2" class="info">${this.info}</air-text> `
            : ''}
      </div>
      <!-- lines -->
      ${!this.first ? html ` <div class="line before"></div> ` : ''}
      ${!this.last ? html ` <div class="line after"></div> ` : ''}
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
        super.attributeChangedCallback(name, oldval, newval);
        this.dispatchEvent(new Event(`${name}-changed`));
    }
    connectedCallback() {
        super.connectedCallback();
        this.getIndex();
        this.addEventListener('click', () => {
            var _a;
            let siblings = (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.childNodes;
            siblings.forEach((el) => {
                el.active = false;
            });
            this.active = true;
        });
    }
    getIndex() {
        var _a;
        let children;
        children = Array.prototype.slice.call((_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.children);
        this.index = children.indexOf(this) + 1;
    }
};
__decorate([
    property({ type: String, reflect: true })
], StepperItem.prototype, "label", void 0);
__decorate([
    property({ type: String, reflect: true })
], StepperItem.prototype, "info", void 0);
__decorate([
    property({ type: String, reflect: true })
], StepperItem.prototype, "icon", void 0);
__decorate([
    property({ type: Number, reflect: true })
], StepperItem.prototype, "index", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], StepperItem.prototype, "active", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], StepperItem.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], StepperItem.prototype, "first", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], StepperItem.prototype, "last", void 0);
__decorate([
    property({ type: String, reflect: true })
], StepperItem.prototype, "orientation", void 0);
StepperItem = __decorate([
    customElement('air-stepper-item')
], StepperItem);
export { StepperItem };
//# sourceMappingURL=stepper-item.js.map