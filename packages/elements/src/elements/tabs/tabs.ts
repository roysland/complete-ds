import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './tabs.scss'
/**
 * @prop {'horizontal'|'vertical'} orientation	- Defines the orientation of the component. Possible values are `horizontal` and `vertical`.
 *
 * @slot - Hosts air-tab-items.
 */
@customElement('air-tabs')
export class Tabs extends LitElement {
  @property({ type: String, reflect: true }) orientation:
    | 'horizontal'
    | 'vertical' = 'horizontal';

  static get styles() {
    return styles
  }

  render() {
    return html`
      <slot @slotchange="${() => this.handleOrientation()}"></slot>
    `;
  }

  handleOrientation() {
    (<NodeListOf<any>>this.childNodes).forEach((el: any) => {
      el.orientation = this.orientation;
    });
  }

  attributeChangedCallback(name: string, oldval: string, newval: string) {
    super.attributeChangedCallback(name, oldval, newval);
    this.dispatchEvent(new Event(`${name}-changed`));
  }
}
