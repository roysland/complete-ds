import { LitElement,css, html } from "lit";
import { property, state, customElement } from 'lit/decorators.js'
import '../icon';
import styles from './swipe.styles.scss'
import { Pan, PointerListener } from 'contactjs'
@customElement('air-swiper')
export class AirSwiper extends LitElement {

    static get styles() {
        return styles
    }

    render() {
        return html`
            <div class="swiper">
                <div class="left"><air-icon class="increment-icon" icon="keyboard_arrow_left" size="m"></air-icon></div>
                <div class="right"><air-icon class="increment-icon" icon="keyboard_arrow_right" size="m"></air-icon></div>
                <div class="wrapper">
                    <slot></slot>
                </div>
            </div>
        `
    }
    @state()
    private panActive: Boolean = false
    private animationFrameId: Number = 0
    private ticking: Boolean = false
    private dom = this.shadowRoot?.querySelector('.wrapper')
    private pointerListener

    async firstUpdated () {
        await new Promise((r) => setTimeout(r, 100))
        this.dom = this.renderRoot.querySelector('.wrapper')
        this.pointerListener = new PointerListener(this.dom, {});
        this.dom?.addEventListener('pan', this.onPan)
        this.dom?.addEventListener('panend', this.onPanEnd)
    }
    onPan = (event) => {
            this.panActive = true;
          // transform
          const x = event.detail.global.deltaX;
          const y = 0;
          const transformString = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
          event.currentTarget.classList.add('dragging')
          this.handlePanUpdate(transformString);
    }

    onPanEnd = (event) => {
        if (this.ticking == true){
            setTimeout(() => {
              this.onPanEnd(event);
            }, 50);
          }
          else {
            this.panActive = false;
            const transformString = 'translate3d(0px, 0px, 0)';
            this.handlePanUpdate(transformString);
            event.currentTarget.classList.remove('dragging')
          }
    }
    handlePanUpdate = (string) => {
        if(!this.ticking) {
    
            this.animationFrameId = requestAnimationFrame((timestamp) => {
              this.dom.style.transform = string;
              
              this.animationFrameId = null;
              this.ticking = false;
            
            });
            this.ticking = true;
          }
    }
}

declare global {
    interface HTMLElementTagNameMap {
      "air-swiper": AirSwiper;
    }
  }