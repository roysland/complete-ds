var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { customElement, property } from 'lit/decorators.js';
import '../card';
import '../icon';
import styles from './input.styles.scss';
/**
 * @prop {String} label - If set, defines the text label shown on top.
 * @prop {String} icon - If set, defines the icon shown before the label/value.
 * @prop {String} value - If set, defines the value of the input. Changes upon user interaction.
 * @prop {'text'|'number'|'select'|'name'} type - Defines the type. Possible values are `text`, `number`, `select` and `date`.
 * @prop {String} name - Sets the name of the input. Corresponds to the native input's 'name' attribute.
 * @prop {String} status - If set, Displays a status icon on the right side of the input.
 * @prop {String} pattern - (If type="number" only) If set, defines a custom input pattern (see full documentation).
 * @prop {String} min - (If type="number" only) If set, defines the minimum value accepted.
 * @prop {String} max - (If type="number" only) If set, defines the maximum value accepted.
 * @prop {Number} step - (If type="number" only) Defines the steps to skip when the user presses the left or right arrows.
 * @prop {Boolean} condensed - If set to true, reduces the height of the input. The label is only shown if the value is undefined.
 * @prop {Boolean} active - If set to true, highlights the label and underline.
 * @prop {Boolean} disabled - If set to true, disables mouse clicks and the style gets updated.
 * @prop {Boolean} readonly - If set to true, disables the input without reducing the opacity.
 * @prop {Boolean} noClear - If set to true, the clear icon and functionality will not be available.
 * @prop {Boolean} autofocus - If set to true, the component gets focused as soon as the page loads.
 *
 * @slot - Displayed inside the content area.
 * @slot functions - Displayed on the right side.
 */
let AirInput = class AirInput extends LitElement {
    static get styles() {
        return styles;
    }
    render() {
        return html `
      ${this.icon
            ? html ` <air-icon class="icon" icon="${this.icon}"></air-icon> `
            : ''}
      <div class="center">
        ${this.label ? html ` <label class="label">${this.label}</label> ` : ''}
        <input
          .type="${this.type}"
          .value="${this.value ? this.value : ''}"
          .step="${this.step.toString()}"
          ?autofocus="${this.autofocus}"
          ?readonly="${this.readonly ||
            this.disabled ||
            this.type === 'select'}"
          min="${ifDefined(this.min)}"
          max="${ifDefined(this.max)}"
          pattern="${ifDefined(this.pattern)}"
          name="${ifDefined(this.name)}"
          @input="${this.handleChange}"
          @focus="${() => this.type !== 'select' && !this.active ? (this.active = true) : ''}"
          @blur="${this.handleBlur}"
        />
      </div>
      <!-- select -->
      ${this.type === 'select'
            ? html `
            <air-icon
              button
              class="select-icon"
              icon="arrow_drop_down"
            ></air-icon>
            ${this.active
                ? html `
                  <air-card
                    @click="${(e) => {
                    this.active = false;
                    e.stopPropagation();
                }}"
                    @wheel="${(e) => e.stopPropagation()}"
                    class="select-menu"
                    .style="
                  top: ${this.getMenuStyles().top};
                  left: ${this.getMenuStyles().left};
                  width: ${this.getMenuStyles().width};
                "
                  >
                    <slot @slotchange="${this.handleItems}"></slot>
                  </air-card>
                `
                : ''}
          `
            : ''}
      <!-- date -->
      ${this.type === 'date'
            ? html ` <air-icon button class="date-icon" icon="event"></air-icon> `
            : ''}
      <!-- clear -->
      ${!this.disabled &&
            !this.readonly &&
            this.value &&
            !this.noClear &&
            this.type !== 'select'
            ? html `
            <air-icon
              button
              class="clear-icon"
              icon="close"
              @click="${this.handleClear}"
            ></air-icon>
          `
            : ''}
      <!-- status -->
      ${this.status
            ? html `
            <air-icon
              class="status-icon"
              .icon="${this.getStatusIcon()}"
            ></air-icon>
          `
            : ''}
      <!-- number increment -->
      ${this.type === 'number' && !this.readonly
            ? html `
            <air-icon
              button
              class="increment-icon"
              icon="keyboard_arrow_left"
              @click="${() => this.handleIncrement('left')}"
            ></air-icon>
            <air-icon
              button
              class="increment-icon"
              icon="keyboard_arrow_right"
              @click="${() => this.handleIncrement('right')}"
            ></air-icon>
          `
            : ''}
      <!-- functions slot -->
      <slot name="functions"></slot>
    `;
    }
    constructor() {
        super();
        this.type = 'text';
        this.autofocus = false;
        this.step = 1;
        this.addEventListener('click', (e) => {
            var _a, _b;
            if (this.active && this.type === 'select') {
                this.closeSelectMenu(e);
            }
            else if (!this.active) {
                this.active = true;
                if (this.type !== 'select' && !this.disabled && !this.readonly) {
                    (_b = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('input')) === null || _b === void 0 ? void 0 : _b.focus();
                }
            }
        });
    }
    handleChange(e) {
        this.value = e.target.value;
        this.dispatchEvent(new CustomEvent('change', {
            bubbles: true,
            composed: true,
        }));
    }
    handleClear() {
        this.value = undefined;
        this.removeAttribute('value');
        this.dispatchEvent(new CustomEvent('change', {
            bubbles: true,
            composed: true,
        }));
    }
    handleBlur(e) {
        if (this.type === 'number') {
            this.validateMinMax(e.target.value);
        }
        if (this.type !== 'select') {
            this.active = false;
        }
    }
    handleIncrement(dir) {
        if (dir === 'left') {
            this.validateMinMax(parseInt(this.value ? this.value : this.min ? this.min : '0') -
                this.step);
        }
        else if (dir === 'right') {
            this.validateMinMax(parseInt(this.value ? this.value : this.min ? this.min : '0') +
                this.step);
        }
    }
    handleItems(e) {
        const items = e.target.assignedNodes();
        items.forEach((el) => {
            if (el.tagName === 'AIR-MENU-ITEM') {
                // handle click on menu item
                el.addEventListener('active-changed', (e) => {
                    if (e.target.active) {
                        // unselect siblings
                        items.forEach((el) => {
                            el.active = false;
                        });
                        e.target.active = true;
                        this.value = el.label;
                        this.active = false;
                    }
                });
            }
        });
    }
    attributeChangedCallback(name, oldval, newval) {
        super.attributeChangedCallback(name, oldval, newval);
        this.dispatchEvent(new Event(`${name}-changed`));
        if (name === 'active' && this.active && this.type === 'select') {
            this.handleMenu();
        }
    }
    handleMenu() {
        const parent = this.parentElement;
        // handle click outside of popover
        const closePopover = () => {
            this.active = false;
            parent === null || parent === void 0 ? void 0 : parent.removeEventListener('wheel', closePopover);
        };
        parent === null || parent === void 0 ? void 0 : parent.addEventListener('wheel', closePopover);
    }
    closeSelectMenu(e) {
        if (this.type === 'select' && this.active) {
            e.stopImmediatePropagation();
            this.active = false;
        }
    }
    validateMinMax(val) {
        if (val) {
            if (this.min && val < parseInt(this.min)) {
                this.value = this.min;
            }
            else if (this.max && val > parseInt(this.max)) {
                this.value = this.max;
            }
            else {
                this.value = val.toString();
            }
        }
    }
    getStatusIcon() {
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
    getMenuStyles() {
        const styles = {
            top: `${this.getBoundingClientRect().top + this.clientHeight + 1}px`,
            left: `${this.getBoundingClientRect().left}px`,
            width: `${this.clientWidth}px`,
        };
        return styles;
    }
};
__decorate([
    property({ type: String, reflect: true })
], AirInput.prototype, "label", void 0);
__decorate([
    property({ type: String, reflect: true })
], AirInput.prototype, "icon", void 0);
__decorate([
    property({ type: String, reflect: true })
], AirInput.prototype, "value", void 0);
__decorate([
    property({ type: String, reflect: true })
], AirInput.prototype, "name", void 0);
__decorate([
    property({ type: String, reflect: true })
], AirInput.prototype, "type", void 0);
__decorate([
    property({ type: String, reflect: true })
], AirInput.prototype, "status", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], AirInput.prototype, "condensed", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], AirInput.prototype, "active", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], AirInput.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], AirInput.prototype, "readonly", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: 'no-clear' })
], AirInput.prototype, "noClear", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], AirInput.prototype, "autofocus", void 0);
__decorate([
    property({ type: String, reflect: true })
], AirInput.prototype, "pattern", void 0);
__decorate([
    property({ type: String, reflect: true })
], AirInput.prototype, "min", void 0);
__decorate([
    property({ type: String, reflect: true })
], AirInput.prototype, "max", void 0);
__decorate([
    property({ type: Number, reflect: true })
], AirInput.prototype, "step", void 0);
AirInput = __decorate([
    customElement('air-input')
], AirInput);
export { AirInput };
//# sourceMappingURL=input.js.map