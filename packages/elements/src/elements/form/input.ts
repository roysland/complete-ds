import { LitElement, css, html } from 'lit';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { customElement, property } from 'lit/decorators.js';
import '../card';
import '../icon';
import styles from './input.styles.scss'
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
@customElement('air-input')
export class AirInput extends LitElement {
  @property({ type: String, reflect: true }) label: string | undefined;
  @property({ type: String, reflect: true }) icon: string | undefined;
  @property({ type: String, reflect: true }) value: string | undefined;
  @property({ type: String, reflect: true }) name: string | undefined;
  @property({ type: String, reflect: true }) type:
    | 'text'
    | 'number'
    | 'select'
    | 'date' = 'text';
  @property({ type: String, reflect: true }) status: string | undefined;
  @property({ type: Boolean, reflect: true }) condensed: boolean | undefined;
  @property({ type: Boolean, reflect: true }) active: boolean | undefined;
  @property({ type: Boolean, reflect: true }) disabled: boolean | undefined;
  @property({ type: Boolean, reflect: true }) readonly: boolean | undefined;
  @property({ type: Boolean, reflect: true, attribute: 'no-clear' })
  noClear: boolean | undefined;
  @property({ type: Boolean, reflect: true }) autofocus = false;
  // input number properties
  @property({ type: String, reflect: true }) pattern: string | undefined;
  @property({ type: String, reflect: true }) min: string | undefined;
  @property({ type: String, reflect: true }) max: string | undefined;
  @property({ type: Number, reflect: true }) step = 1;

  static get styles() {
    return styles
  }

  render() {
    return html`
      ${this.icon
        ? html` <air-icon class="icon" icon="${this.icon}"></air-icon> `
        : ''}
      <div class="center">
        ${this.label ? html` <label class="label">${this.label}</label> ` : ''}
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
          @focus="${() =>
            this.type !== 'select' && !this.active ? (this.active = true) : ''}"
          @blur="${this.handleBlur}"
        />
      </div>
      <!-- select -->
      ${this.type === 'select'
        ? html`
            <air-icon
              button
              class="select-icon"
              icon="arrow_drop_down"
            ></air-icon>
            ${this.active
              ? html`
                  <air-card
                    @click="${(e: Event) => {
                      this.active = false;
                      e.stopPropagation();
                    }}"
                    @wheel="${(e: Event) => e.stopPropagation()}"
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
        ? html` <air-icon button class="date-icon" icon="event"></air-icon> `
        : ''}
      <!-- clear -->
      ${!this.disabled &&
      !this.readonly &&
      this.value &&
      !this.noClear &&
      this.type !== 'select'
        ? html`
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
        ? html`
            <air-icon
              class="status-icon"
              .icon="${this.getStatusIcon()}"
            ></air-icon>
          `
        : ''}
      <!-- number increment -->
      ${this.type === 'number' && !this.readonly
        ? html`
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
    this.addEventListener('click', (e) => {
      if (this.active && this.type === 'select') {
        this.closeSelectMenu(e);
      } else if (!this.active) {
        this.active = true;
        if (this.type !== 'select' && !this.disabled && !this.readonly) {
          this.shadowRoot?.querySelector('input')?.focus();
        }
      }
    });
  }

  handleChange(e: any) {
    this.value = e.target.value;
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
      })
    );
  }

  handleClear() {
    this.value = undefined;
    this.removeAttribute('value');
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
      })
    );
  }

  handleBlur(e: any) {
    if (this.type === 'number') {
      this.validateMinMax(e.target.value);
    }
    if (this.type !== 'select') {
      this.active = false;
    }
  }

  handleIncrement(dir: string) {
    if (dir === 'left') {
      this.validateMinMax(
        parseInt(this.value ? this.value : this.min ? this.min : '0') -
          this.step
      );
    } else if (dir === 'right') {
      this.validateMinMax(
        parseInt(this.value ? this.value : this.min ? this.min : '0') +
          this.step
      );
    }
  }

  handleItems(e: any) {
    const items: NodeList = e.target.assignedNodes();
    items.forEach((el: any) => {
      if (el.tagName === 'AIR-MENU-ITEM') {
        // handle click on menu item
        el.addEventListener('active-changed', (e: any) => {
          if (e.target.active) {
            // unselect siblings
            items.forEach((el: any) => {
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

  attributeChangedCallback(name: string, oldval: string, newval: string) {
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
      parent?.removeEventListener('wheel', closePopover);
    };
    parent?.addEventListener('wheel', closePopover);
  }

  closeSelectMenu(e: Event): void {
    if (this.type === 'select' && this.active) {
      e.stopImmediatePropagation();
      this.active = false;
    }
  }

  validateMinMax(val: number) {
    if (val) {
      if (this.min && val < parseInt(this.min)) {
        this.value = this.min;
      } else if (this.max && val > parseInt(this.max)) {
        this.value = this.max;
      } else {
        this.value = val.toString();
      }
    }
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

  getMenuStyles() {
    const styles = {
      top: `${this.getBoundingClientRect().top + this.clientHeight + 1}px`,
      left: `${this.getBoundingClientRect().left}px`,
      width: `${this.clientWidth}px`,
    };
    return styles;
  }
}
