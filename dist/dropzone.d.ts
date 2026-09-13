import Emitter from "./emitter";
import defaultOptions from "./options";
import type { DropzoneOptions, ResolvedDropzoneOptions } from "./options";
export type { DropzoneOptions, ResolvedDropzoneOptions };
/** One chunk of a chunked upload, as tracked on `file.upload.chunks!`. */
export type DropzoneChunk = {
    file: DropzoneFile;
    index: number;
    dataBlock: any;
    status: string;
    progress: number;
    total?: number;
    bytesSent?: number;
    retries: number;
    xhr?: XMLHttpRequest;
};
/**
 * The upload bookkeeping Dropzone keeps on each file. The chunking fields are
 * only filled in once chunking is known to apply, which is after
 * `transformFile` has had its say about the data.
 */
export type DropzoneFileUpload = {
    uuid: string;
    progress: number;
    total: number;
    bytesSent: number;
    filename: string;
    chunked?: boolean;
    totalChunkCount?: number;
    chunks?: DropzoneChunk[];
    finishedChunkUpload?: (chunk: DropzoneChunk, response: any) => void;
};
/** A File as Dropzone hands it back: the browser's, plus its own bookkeeping. */
export type DropzoneFile = File & {
    status: string;
    accepted?: boolean;
    processing?: boolean;
    previewElement?: HTMLElement | null;
    previewTemplate?: HTMLElement | null;
    xhr?: XMLHttpRequest;
    dataURL?: string;
    width?: number;
    height?: number;
    upload: DropzoneFileUpload;
    [key: string]: any;
};
/**
 * Invoked by `accept` to admit a file, or to reject it with a message. Called
 * with no argument the file is accepted; anything passed is shown as the error.
 */
export type DropzoneAcceptCallback = (error?: string) => void;
/**
 * Invoked with the file to upload once `transformFile` is finished. It is the
 * original file when there was nothing to do, and a Blob when the image was
 * resized.
 */
export type DropzoneTransformCallback = (file: DropzoneFile | Blob) => void;
/**
 * Invoked with the rendered thumbnail as a data URL, and the canvas it was
 * drawn on -- which is null when the image needed no resizing.
 */
export type DropzoneThumbnailCallback = (dataUrl: string, canvas?: HTMLCanvasElement | null) => void;
/** One element and the handlers bound to it, as tracked for removal. */
export type DropzoneListener = {
    element: HTMLElement | Document;
    events: Record<string, (event: any) => any>;
};
declare const dropzoneEvents: readonly ["drop", "dragstart", "dragend", "dragenter", "dragover", "dragleave", "addedfile", "addedfiles", "removedfile", "thumbnail", "error", "errormultiple", "processing", "processingmultiple", "uploadprogress", "totaluploadprogress", "sending", "sendingmultiple", "success", "successmultiple", "canceled", "canceledmultiple", "complete", "completemultiple", "reset", "maxfilesexceeded", "maxfilesreached", "queuecomplete", "emptyfolder"];
export type DropzoneEventName = (typeof dropzoneEvents)[number];
/**
 * What each event's listener receives, taken from the option handler of the
 * same name so the two cannot disagree.
 */
export type DropzoneEventMap = {
    [K in DropzoneEventName]: K extends keyof typeof defaultOptions ? (typeof defaultOptions)[K] extends (...args: infer A) => any ? A : any[] : any[];
};
export default class Dropzone extends Emitter {
    /**
     * Every event you can register a handler for:
     *
     *     dropzone.on("dragenter", function () {});
     */
    events: DropzoneEventName[];
    _thumbnailQueue: DropzoneFile[];
    _processingThumbnail: boolean;
    element: HTMLElement & {
        dropzone?: Dropzone;
    };
    disabled: boolean;
    options: ResolvedDropzoneOptions;
    files: DropzoneFile[];
    clickableElements: HTMLElement[];
    listeners: DropzoneListener[];
    previewsContainer: HTMLElement | null;
    hiddenFileInput: HTMLInputElement | null;
    URL: typeof window.URL;
    on<K extends DropzoneEventName>(event: K, fn: (...args: DropzoneEventMap[K]) => void): this;
    on(event: string, fn: (...args: any[]) => void): this;
    emit<K extends DropzoneEventName>(event: K, ...args: DropzoneEventMap[K]): this;
    emit(event: string, ...args: any[]): this;
    static version: string;
    static blacklistedBrowsers?: RegExp[];
    static Emitter: typeof Emitter;
    constructor(el: HTMLElement | string, options?: DropzoneOptions);
    getAcceptedFiles(): DropzoneFile[];
    getRejectedFiles(): DropzoneFile[];
    getFilesWithStatus(status: string): DropzoneFile[];
    getQueuedFiles(): DropzoneFile[];
    getUploadingFiles(): DropzoneFile[];
    getAddedFiles(): DropzoneFile[];
    getActiveFiles(): DropzoneFile[];
    init(): void;
    destroy(): Dropzone[];
    updateTotalUploadProgress(): this;
    _getParamName(n: number): string;
    _renameFile(file: DropzoneFile): string;
    getFallbackForm(): any;
    getExistingFallback(): any;
    setupEventListeners(): void[][];
    removeEventListeners(): void[][];
    disable(): void[];
    enable(): void[][];
    filesize(size: number): string;
    _updateMaxFilesReachedClass(): void;
    drop(e: any): void;
    paste(e: any): Promise<any[]> | undefined;
    handleFiles(files: DropzoneFile[]): void;
    _addFilesFromItems(items: any[]): Promise<any[]>;
    _addFilesFromDirectory(directory: any, path: string): Promise<unknown>;
    accept(file: DropzoneFile, done: DropzoneAcceptCallback): void;
    addFile(file: DropzoneFile): void;
    enqueueFiles(files: DropzoneFile[]): null;
    enqueueFile(file: DropzoneFile): number | undefined;
    _enqueueThumbnail(file: DropzoneFile): number | undefined;
    _processThumbnailQueue(): void;
    removeFile(file: DropzoneFile): this | undefined;
    removeAllFiles(cancelIfNecessary: boolean): null;
    resizeImage(file: DropzoneFile, width: number | null, height: number | null, resizeMethod: string, callback: DropzoneTransformCallback): void;
    createThumbnail(file: DropzoneFile, width: number | null, height: number | null, resizeMethod: string, fixOrientation: boolean, callback: DropzoneThumbnailCallback): void;
    displayExistingFile(mockFile: DropzoneFile, imageUrl: string, callback: (() => void) | null, crossOrigin: string, resizeThumbnail?: boolean): void;
    createThumbnailFromUrl(file: DropzoneFile, width: number | null, height: number | null, resizeMethod: string, fixOrientation: boolean, callback: DropzoneThumbnailCallback, crossOrigin?: string): string;
    processQueue(): void;
    processFile(file: DropzoneFile): void;
    processFiles(files: DropzoneFile[]): void;
    _getFilesWithXhr(xhr: XMLHttpRequest): DropzoneFile[];
    cancelUpload(file: DropzoneFile): void;
    resolveOption(option: any, ...args: any[]): any;
    uploadFile(file: DropzoneFile): void;
    uploadFiles(files: DropzoneFile[]): void;
    _getChunk(file: DropzoneFile, xhr: XMLHttpRequest): DropzoneChunk | undefined;
    _uploadData(files: DropzoneFile[], dataBlocks: any[]): void;
    _transformFiles(files: DropzoneFile[], done: (files: (DropzoneFile | Blob)[]) => void): void;
    _addFormElementData(formData: FormData): void;
    _updateFilesUploadProgress(files: DropzoneFile[], xhr: XMLHttpRequest, e?: any): void;
    _finishedUploading(files: DropzoneFile[], xhr: XMLHttpRequest, e: any): void;
    _handleUploadError(files: DropzoneFile[], xhr: XMLHttpRequest, response?: any): void;
    submitRequest(xhr: XMLHttpRequest, formData: FormData, files: DropzoneFile[]): void;
    _finished(files: DropzoneFile[], responseText: string, e: any): void;
    _errorProcessing(files: DropzoneFile[], message: string, xhr?: XMLHttpRequest): void;
    static uuidv4(): string;
    static options: Record<string, DropzoneOptions | false>;
    static optionsForElement(element: HTMLElement): DropzoneOptions | false | undefined;
    static instances: Dropzone[];
    static forElement(element: HTMLElement | string): Dropzone;
    static discover(): (Dropzone | undefined)[];
    static blockedBrowsers: RegExp[];
    static isBrowserSupported(): boolean;
    static dataURItoBlob(dataURI: string): Blob;
    static createElement(string: string): HTMLElement;
    static elementInside(element: Node, container: Node): boolean;
    static getElement(el: HTMLElement | string, name: string): HTMLElement;
    static getElements(els: any, name: string): HTMLElement[];
    static confirm(question: string, accepted: () => void, rejected?: () => void): void;
    static isValidFile(file: DropzoneFile, acceptedFiles: string | string[] | null): boolean;
    static ADDED: string;
    static QUEUED: string;
    static ACCEPTED: string;
    static UPLOADING: string;
    static PROCESSING: string;
    static CANCELED: string;
    static ERROR: string;
    static SUCCESS: string;
}
export { Dropzone };
