import { html, LitElement, PropertyValueMap } from "lit";
import { property, customElement } from "lit/decorators.js";

import styles from './knob.scss'
@customElement('air-knob')
export class Knob extends LitElement {
    @property({ type: Number, reflect: true }) turn = 0
    @property({ type: Number}) step = 10
    static get styles() {
        return styles
    }

    connectedCallback(): void {
        super.connectedCallback()
        this.addEventListener('wheel', (event: WheelEvent) => {
            // Up
            if (event.wheelDeltaY > 0 && this.turn <= (360 - this.step)) {
                this.turn += this.step
            }
            if (event.wheelDeltaY < 0 && this.turn >= this.step) {
                this.turn -= this.step
            }
        })
    }

    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        const rangeInput: HTMLElement | null | undefined = this.shadowRoot!.querySelector('input')
        this.handleTurnPosition()
        rangeInput?.addEventListener('input', () => {
            this.turn = rangeInput.value
        })
    }
    attributeChangedCallback(name: string, oldval: string, newval: string) {
        super.attributeChangedCallback(name, oldval, newval);
        this.dispatchEvent(new Event(`${name}-changed`));
        if (name === 'turn') {
            this.handleTurnPosition()
        }
    }

    private handleTurnPosition () {
        
        const defaultPosition = 0;
        const newPosition = (defaultPosition + this.turn) - 0
        const line: SVGLineElement | null | undefined = this.shadowRoot!.querySelector('line')
        if (line && newPosition) {
            line.style.rotate = `${newPosition}deg`
        }
    }


    render() {
        return html`
            <svg viewBox="-1 -1 2 2">
                <defs>
                    <radialGradient id="grad-dial-soft-shadow" cx="0.5" cy="0.5" r="0.5">
                        <stop offset="85%" stop-color="#242a2e" stop-opacity="0.4"></stop>
                        <stop offset="100%" stop-color="#242a2e" stop-opacity="0"></stop>
                    </radialGradient>
                    <linearGradient id="grad-dial-base" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#52595f"></stop>
                        <stop offset="100%" stop-color="#2b3238"></stop>
                    </linearGradient>
                    <linearGradient id="grad-dial-highlight" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#70777d" stop-opacity="1"></stop>
                        <stop offset="40%" stop-color="#70777d" stop-opacity="0"></stop>
                        <stop offset="55%" stop-color="#70777d" stop-opacity="0"></stop>
                        <stop offset="100%" stop-color="#70777d" stop-opacity="0.3"></stop>
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="2"></feGaussianBlur>
                        <feComposite in="blur" in2="SourceGraphic" operator="over"></feComposite>
                    </filter>
                </defs>
                <circle class="knob-outline" cx="0" cy="0" r="0.9"></circle>
                <circle class="knob-center" cx="0" cy="0" r="0.8" fill="url(#grad-dial-base)" filter="url(#glow)"></circle>
                <line x1="0" y1="0" x2="0" y2="0.5" stroke="#babdb7" stroke-width="0.15px" stroke-linecap="round"></line> 
            </svg>
            <input type="range" min="0" max="360" step="${this.step}" value="${this.turn}" />
            <span>${this.turn}</span>

        `
    }
}