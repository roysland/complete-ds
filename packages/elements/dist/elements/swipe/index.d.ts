import { LitElement } from "lit";
import '../icon';
export declare class AirSwiper extends LitElement {
    static get styles(): any;
    render(): import("lit-html").TemplateResult<1>;
    private panActive;
    private animationFrameId;
    private ticking;
    private dom;
    private pointerListener;
    firstUpdated(): Promise<void>;
    onPan: (event: any) => void;
    onPanEnd: (event: any) => void;
    handlePanUpdate: (string: any) => void;
}
declare global {
    interface HTMLElementTagNameMap {
        "air-swiper": AirSwiper;
    }
}
