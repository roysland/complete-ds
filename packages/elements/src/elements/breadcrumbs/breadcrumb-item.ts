import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../icon';
import '../text';
import styles from './breadcrumb-item.styles.scss'
/**
 * @prop {String} label - Defines the text label.
 * @prop {Boolean} active - Defines whether the item is currently active or not.
 */
@customElement('air-breadcrumb-item')
export class AirBreadcrumbItem extends LitElement {
  @property({ type: String, reflect: true }) label = 'Label';
  @property({ type: Boolean, reflect: true }) active: boolean | undefined;

  static get styles() {
    return styles
  }

  render() {
    return html`
      ${!this.firstItem()
        ? html`
            <air-icon
              icon="keyboard_arrow_right"
              color="var(--text-2)"
            ></air-icon>
          `
        : ''}
      <air-text>${this.label}</air-text>
    `;
  }

  attributeChangedCallback(name: string, oldval: string, newval: string) {
    super.attributeChangedCallback(name, oldval, newval);
    this.dispatchEvent(new Event(`${name}-changed`));
  }

  firstItem(): boolean {
    let firstItem: boolean, children: any;
    children = Array.prototype.slice.call(this.parentElement?.children);
    firstItem = children.indexOf(this) == 0;
    return firstItem;
  }
}
