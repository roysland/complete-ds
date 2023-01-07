var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../text';
import styles from './slider.scss';
/**
 * @prop {String} label - If set, defines the text label shown on top.
 * @prop {Number} value - Defines the current value. Must be a value between min and max.
 * @prop {Number} min - Defines the minimum value accepted.
 * @prop {Number} max - Defines the maximum value accepted.
 * @prop {Number} step - Defines the steps to skip when the user drags the thumb.
 * @prop {Boolean} input - If set to true, allows the user to input a value using the keyboard.
 */
let Slider = class Slider extends LitElement {
    constructor() {
        super(...arguments);
        this.value = 50;
        this.min = 0;
        this.max = 100;
        this.step = 1;
    }
    static get styles() {
        return styles;
    }
    render() {
        return html `
      ${this.label
            ? html `
            <div class="label">
              <air-text>${this.label}</air-text>
              ${this.input
                ? html `
                    <input
                      type="number"
                      .value="${this.value}"
                      @blur="${(e) => this.handleInput(parseFloat(e.target.value))}"
                      @keypress="${(e) => e.key === 'Enter'
                    ? this.handleInput(parseFloat(e.target.value))
                    : ''}"
                    />
                  `
                : ''}
            </div>
          `
            : ''}
      <div class="track">
        <div
          class="thumb"
          @mousedown="${(e) => this.handleThumbDrag(e)}"
          @touchstart="${(e) => this.handleThumbDrag(e)}"
        >
          <div></div>
        </div>
      </div>
    `;
    }
    attributeChangedCallback(name, oldval, newval) {
        super.attributeChangedCallback(name, oldval, newval);
        this.dispatchEvent(new Event(`${name}-changed`));
        if (name === 'value' || name === 'min' || name === 'max') {
            this.handleThumbPosition();
        }
    }
    firstUpdated() {
        this.handleThumbPosition();
    }
    handleInput(val) {
        if (val >= this.min && val <= this.max) {
            this.value = val;
        }
        else if (val < this.min) {
            this.value = this.min;
        }
        else if (val > this.max) {
            this.value = this.max;
        }
    }
    handleThumbPosition() {
        var _a;
        const thumb = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.thumb');
        const position = ((this.value - this.min) / (this.max - this.min)) * 100;
        // check if thumb exists and position is within range
        if (thumb && position >= 0 && position <= 100) {
            thumb.style.left = `${position}%`;
        }
    }
    handleThumbDrag(e) {
        const trackWidth = this.shadowRoot.querySelector('.track').clientWidth;
        const stepWidth = (trackWidth / (this.max - this.min)) * this.step;
        let originX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        const getDeltaX = (e) => {
            e.preventDefault();
            const eventX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
            const delta = eventX - originX;
            // if the mouse moved more than a step, update value and reset origin coordinate
            if (delta > stepWidth || delta * -1 > stepWidth) {
                const absoluteDelta = Math.floor(delta < 0 ? delta * -1 : delta);
                const steps = Math.round(absoluteDelta / stepWidth);
                // calculate and update value
                const newVal = delta > 0
                    ? this.value + this.step * steps
                    : this.value - this.step * steps;
                if (newVal <= this.max && newVal >= this.min) {
                    this.value = newVal;
                    originX = eventX;
                }
            }
        };
        // remove added listeners on mouse release
        const removeListeners = () => {
            window.removeEventListener('mousemove', getDeltaX);
            window.removeEventListener('touchmove', getDeltaX);
            window.removeEventListener('mouseup', removeListeners);
            window.removeEventListener('touchend', removeListeners);
        };
        window.addEventListener('mousemove', getDeltaX);
        window.addEventListener('touchmove', getDeltaX);
        window.addEventListener('mouseup', removeListeners);
        window.addEventListener('touchend', removeListeners);
    }
};
__decorate([
    property({ type: String, reflect: true })
], Slider.prototype, "label", void 0);
__decorate([
    property({ type: Number, reflect: true })
], Slider.prototype, "value", void 0);
__decorate([
    property({ type: Number, reflect: true })
], Slider.prototype, "min", void 0);
__decorate([
    property({ type: Number, reflect: true })
], Slider.prototype, "max", void 0);
__decorate([
    property({ type: Number, reflect: true })
], Slider.prototype, "step", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], Slider.prototype, "input", void 0);
Slider = __decorate([
    customElement('air-slider')
], Slider);
export { Slider };
//# sourceMappingURL=slider.js.map