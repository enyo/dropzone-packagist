export type EmitterListener = (...args: any[]) => void;
export default class Emitter {
    _callbacks?: Record<string, EmitterListener[]>;
    element?: HTMLElement;
    on(event: string, fn: EmitterListener): this;
    emit(event: string, ...args: any[]): this;
    makeEvent(eventName: string, detail: unknown): CustomEvent;
    off(event?: string, fn?: EmitterListener): this;
}
