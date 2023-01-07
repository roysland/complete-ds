var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { LitElement, html } from "lit";
import { state, customElement } from 'lit/decorators.js';
import '../icon';
import styles from './swipe.styles.scss';
import { PointerListener } from 'contactjs';
let AirSwiper = class AirSwiper extends LitElement {
    constructor() {
        var _a;
        super(...arguments);
        this.panActive = false;
        this.animationFrameId = 0;
        this.ticking = false;
        this.dom = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.wrapper');
        this.onPan = (event) => {
            this.panActive = true;
            // transform
            const x = event.detail.global.deltaX;
            const y = 0;
            const transformString = 'translate3d(' + x + 'px, ' + y + 'px, 0)';
            event.currentTarget.classList.add('dragging');
            this.handlePanUpdate(transformString);
        };
        this.onPanEnd = (event) => {
            if (this.ticking == true) {
                setTimeout(() => {
                    this.onPanEnd(event);
                }, 50);
            }
            else {
                this.panActive = false;
                const transformString = 'translate3d(0px, 0px, 0)';
                this.handlePanUpdate(transformString);
                event.currentTarget.classList.remove('dragging');
            }
        };
        this.handlePanUpdate = (string) => {
            if (!this.ticking) {
                this.animationFrameId = requestAnimationFrame((timestamp) => {
                    this.dom.style.transform = string;
                    this.animationFrameId = null;
                    this.ticking = false;
                });
                this.ticking = true;
            }
        };
    }
    static get styles() {
        return styles;
    }
    render() {
        return html `
            <div class="swiper">
                <div class="left"><air-icon class="increment-icon" icon="keyboard_arrow_left" size="m"></air-icon></div>
                <div class="right"><air-icon class="increment-icon" icon="keyboard_arrow_right" size="m"></air-icon></div>
                <div class="wrapper">
                    <slot></slot>
                </div>
            </div>
        `;
    }
    firstUpdated() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise((r) => setTimeout(r, 100));
            this.dom = this.renderRoot.querySelector('.wrapper');
            this.pointerListener = new PointerListener(this.dom, {});
            (_a = this.dom) === null || _a === void 0 ? void 0 : _a.addEventListener('pan', this.onPan);
            (_b = this.dom) === null || _b === void 0 ? void 0 : _b.addEventListener('panend', this.onPanEnd);
        });
    }
};
__decorate([
    state()
], AirSwiper.prototype, "panActive", void 0);
AirSwiper = __decorate([
    customElement('air-swiper')
], AirSwiper);
export { AirSwiper };
//# sourceMappingURL=index.js.map