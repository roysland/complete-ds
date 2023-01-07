import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './stepper-item.scss'
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
@customElement('air-stepper-item')
export class StepperItem extends LitElement {
  @property({ type: String, reflect: true }) label: string | undefined;
  @property({ type: String, reflect: true }) info: string | undefined;
  @property({ type: String, reflect: true }) icon: string | undefined;
  @property({ type: Number, reflect: true }) index: number | undefined;
  @property({ type: Boolean, reflect: true }) active: boolean | undefined;
  @property({ type: Boolean, reflect: true }) disabled: boolean | undefined;
  @property({ type: Boolean, reflect: true }) first: boolean | undefined;
  @property({ type: Boolean, reflect: true }) last: boolean | undefined;
  @property({ type: String, reflect: true }) orientation:
    | 'horizontal'
    | 'vertical' = 'horizontal';

  static get styles() {
    return styles
  }

  render() {
    return html`
      <!-- circle -->
      <div class="circle">
        ${this.icon
          ? html` <air-icon icon="${this.icon}"></air-icon> `
          : html`
              <air-text size="header-1" class="number">${this.index}</air-text>
            `}
      </div>
      <!-- text -->
      <div class="text">
        ${this.label
          ? html` <air-text class="label">${this.label}</air-text> `
          : ''}
        ${this.info
          ? html` <air-text size="body-2" class="info">${this.info}</air-text> `
          : ''}
      </div>
      <!-- lines -->
      ${!this.first ? html` <div class="line before"></div> ` : ''}
      ${!this.last ? html` <div class="line after"></div> ` : ''}
    `;
  }

  attributeChangedCallback(name: string, oldval: string, newval: string) {
    super.attributeChangedCallback(name, oldval, newval);
    this.dispatchEvent(new Event(`${name}-changed`));
  }

  connectedCallback() {
    super.connectedCallback();
    this.getIndex();
    this.addEventListener('click', () => {
      let siblings: any = this.parentElement?.childNodes;
      siblings.forEach((el: any) => {
        el.active = false;
      });
      (<any>this).active = true;
    });
  }

  getIndex() {
    let children;
    children = Array.prototype.slice.call(this.parentElement?.children);
    this.index = children.indexOf(this) + 1;
  }
}

