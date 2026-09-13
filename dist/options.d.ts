import Dropzone from "./dropzone";
import type { DropzoneAcceptCallback, DropzoneFile, DropzoneTransformCallback } from "./dropzone";
declare let defaultOptions: {
    /**
     * Has to be specified on elements other than form (or when the form doesn't
     * have an `action` attribute).
     *
     * You can also provide a function that will be called with `files` and
     * `dataBlocks`  and must return the url as string.
     */
    url: string | ((files: DropzoneFile[], dataBlocks?: any[]) => string) | null;
    /**
     * Can be changed to `"put"` if necessary. You can also provide a function
     * that will be called with `files` and must return the method (since `v3.12.0`).
     */
    method: string;
    /**
     * Will be set on the XHRequest.
     */
    withCredentials: boolean;
    /**
     * The timeout for the XHR requests in milliseconds (since `v4.4.0`).
     * If set to null or 0, no timeout is going to be set.
     */
    timeout: number | null;
    /**
     * How many file uploads to process in parallel (See the
     * Enqueuing file uploads documentation section for more info)
     */
    parallelUploads: number;
    /**
     * Whether to send multiple files in one request. If
     * this it set to true, then the fallback file input element will
     * have the `multiple` attribute as well. This option will
     * also trigger additional events (like `processingmultiple`). See the events
     * documentation section for more information.
     */
    uploadMultiple: boolean;
    /**
     * Whether you want files to be uploaded in chunks to your server. This can't be
     * used in combination with `uploadMultiple`.
     *
     * See [chunksUploaded](#config-chunksUploaded) for the callback to finalise an upload.
     */
    chunking: boolean;
    /**
     * If `chunking` is enabled, this defines whether **every** file should be chunked,
     * even if the file size is below chunkSize. This means, that the additional chunk
     * form data will be submitted and the `chunksUploaded` callback will be invoked.
     */
    forceChunking: boolean;
    /**
     * If `chunking` is `true`, then this defines the chunk size in bytes.
     */
    chunkSize: number;
    /**
     * If `true`, the individual chunks of a file are uploaded simultaneously, at
     * most `parallelUploads` of them at a time. Set a number to use a different
     * limit, or `Infinity` to start every chunk at once.
     */
    parallelChunkUploads: boolean;
    /**
     * Whether a chunk should be retried if it fails.
     */
    retryChunks: boolean;
    /**
     * If `retryChunks` is true, how many times should it be retried.
     */
    retryChunksLimit: number;
    /**
     * The maximum filesize (in MiB) that is allowed to be uploaded.
     */
    maxFilesize: number;
    /**
     * The name of the file param that gets transferred.
     * **NOTE**: If you have the option  `uploadMultiple` set to `true`, then
     * Dropzone will append `[]` to the name.
     */
    paramName: string;
    /**
     * Whether thumbnails for images should be generated
     */
    createImageThumbnails: boolean;
    /**
     * In MB. When the filename exceeds this limit, the thumbnail will not be generated.
     */
    maxThumbnailFilesize: number;
    /**
     * If `null`, the ratio of the image will be used to calculate it.
     */
    thumbnailWidth: number;
    /**
     * The same as `thumbnailWidth`. If both are null, images will not be resized.
     */
    thumbnailHeight: number;
    /**
     * How the images should be scaled down in case both, `thumbnailWidth` and `thumbnailHeight` are provided.
     * Can be either `contain` or `crop`.
     */
    thumbnailMethod: string;
    /**
     * If set, images will be resized to these dimensions before being **uploaded**.
     * If only one, `resizeWidth` **or** `resizeHeight` is provided, the original aspect
     * ratio of the file will be preserved.
     *
     * The `options.transformFile` function uses these options, so if the `transformFile` function
     * is overridden, these options don't do anything.
     */
    resizeWidth: number | null;
    /**
     * See `resizeWidth`.
     */
    resizeHeight: number | null;
    /**
     * The mime type of the resized image (before it gets uploaded to the server).
     * If `null` the original mime type will be used. To force jpeg, for example, use `image/jpeg`.
     * See `resizeWidth` for more information.
     */
    resizeMimeType: string | null;
    /**
     * The quality of the resized images. See `resizeWidth`.
     */
    resizeQuality: number;
    /**
     * How the images should be scaled down in case both, `resizeWidth` and `resizeHeight` are provided.
     * Can be either `contain` or `crop`.
     */
    resizeMethod: string;
    /**
     * The color to show through transparent parts of a resized image, as any
     * CSS color. Formats without an alpha channel cannot store transparency, so
     * a transparent PNG resized to `image/jpeg` comes out with black where it
     * used to be see-through; setting this to `"#fff"` makes it white instead.
     *
     * `null` leaves transparency alone, which only produces black once the image
     * is encoded to a format that cannot represent it. This has no effect on the
     * preview thumbnails, which are always PNG.
     */
    resizeTransparencyFill: string | null;
    /**
     * The base that is used to calculate the **displayed** filesize. You can
     * change this to 1024 if you would rather display kibibytes, mebibytes,
     * etc... 1024 is technically incorrect, because `1024 bytes` are `1 kibibyte`
     * not `1 kilobyte`. You can change this to `1024` if you don't care about
     * validity.
     */
    filesizeBase: number;
    /**
     * If not `null` defines how many files this Dropzone handles. If it exceeds,
     * the event `maxfilesexceeded` will be called. The dropzone element gets the
     * class `dz-max-files-reached` accordingly so you can provide visual
     * feedback.
     */
    maxFiles: number | null;
    /**
     * An optional object to send additional headers to the server. Eg:
     * `{ "My-Awesome-Header": "header value" }`
     */
    headers: Record<string, string> | null;
    /**
     * Should the default headers be set or not?
     * Accept: application/json <- for requesting json response
     * Cache-Control: no-cache <- Request shouldnt be cached
     * X-Requested-With: XMLHttpRequest <- We sent the request via XMLHttpRequest
     */
    defaultHeaders: boolean;
    /**
     * If `true`, the dropzone element itself will be clickable, if `false`
     * nothing will be clickable.
     *
     * You can also pass an HTML element, a CSS selector (for multiple elements)
     * or an array of those. In that case, all of those elements will trigger an
     * upload when clicked.
     */
    clickable: boolean;
    /**
     * Whether hidden files in directories should be ignored.
     */
    ignoreHiddenFiles: boolean;
    /**
     * The default implementation of `accept` checks the file's mime type or
     * extension against this list. This is a comma separated list of mime
     * types or file extensions.
     *
     * Eg.: `image/*,application/pdf,.psd`
     *
     * If the Dropzone is `clickable` this option will also be used as
     * [`accept`](https://developer.mozilla.org/en-US/docs/HTML/Element/input#attr-accept)
     * parameter on the hidden file input as well.
     */
    acceptedFiles: string | null;
    /**
     * **Deprecated!**
     * Use acceptedFiles instead.
     */
    acceptedMimeTypes: string | null;
    /**
     * If false, files will be added to the queue but the queue will not be
     * processed automatically.
     * This can be useful if you need some additional user input before sending
     * files (or if you want want all files sent at once).
     * If you're ready to send the file simply call `myDropzone.processQueue()`.
     *
     * See the [enqueuing file uploads](#enqueuing-file-uploads) documentation
     * section for more information.
     */
    autoProcessQueue: boolean;
    /**
     * If false, files added to the dropzone will not be queued by default.
     * You'll have to call `enqueueFile(file)` manually.
     */
    autoQueue: boolean;
    /**
     * If `true`, this will add a link to every file preview to remove or cancel (if
     * already uploading) the file. The `dictCancelUpload`, `dictCancelUploadConfirmation`
     * and `dictRemoveFile` options are used for the wording.
     */
    addRemoveLinks: boolean;
    /**
     * Defines where to display the file previews – if `null` the
     * Dropzone element itself is used. Can be a plain `HTMLElement` or a CSS
     * selector. The element should have the `dropzone-previews` class so
     * the previews are displayed properly.
     */
    previewsContainer: string | HTMLElement | false | null;
    /**
     * Set this to `true` if you don't want previews to be shown.
     */
    disablePreviews: boolean;
    /**
     * This is the element the hidden input field (which is used when clicking on the
     * dropzone to trigger file selection) will be appended to. This might
     * be important in case you use frameworks to switch the content of your page.
     *
     * Can be a selector string, or an element directly.
     */
    hiddenInputContainer: string;
    /**
     * If null, no capture type will be specified
     * If camera, mobile devices will skip the file selection and choose camera
     * If microphone, mobile devices will skip the file selection and choose the microphone
     * If camcorder, mobile devices will skip the file selection and choose the camera in video mode
     * On apple devices multiple must be set to false.  AcceptedFiles may need to
     * be set to an appropriate mime type (e.g. "image/*", "audio/*", or "video/*").
     */
    capture: string | null;
    /**
     * **Deprecated**. Use `renameFile` instead.
     */
    renameFilename: ((name: string, file: DropzoneFile) => string) | null;
    /**
     * A function that is invoked before the file is uploaded to the server and renames the file.
     * This function gets the `File` as argument and can use the `file.name`. The actual name of the
     * file that gets used during the upload can be accessed through `file.upload.filename`.
     */
    renameFile: ((file: DropzoneFile) => string) | null;
    /**
     * If `true` the fallback will be forced. This is very useful to test your server
     * implementations first and make sure that everything works as
     * expected without dropzone if you experience problems, and to test
     * how your fallbacks will look.
     */
    forceFallback: boolean;
    /**
     * The text used before any files are dropped.
     */
    dictDefaultMessage: string;
    /**
     * The text that replaces the default message text it the browser is not supported.
     */
    dictFallbackMessage: string;
    /**
     * The text that will be added before the fallback form.
     * If you provide a  fallback element yourself, or if this option is `null` this will
     * be ignored.
     */
    dictFallbackText: string;
    /**
     * If the filesize is too big.
     * `{{filesize}}` and `{{maxFilesize}}` will be replaced with the respective configuration values.
     */
    dictFileTooBig: string;
    /**
     * If the file doesn't match the file type.
     */
    dictInvalidFileType: string;
    /**
     * If the file looks like an image but cannot be decoded, so no thumbnail can
     * be generated for it.
     */
    dictThumbnailError: string;
    /**
     * If the server response was invalid.
     * `{{statusCode}}` will be replaced with the servers status code.
     */
    dictResponseError: string;
    /**
     * If `addRemoveLinks` is true, the text to be used for the cancel upload link.
     */
    dictCancelUpload: string;
    /**
     * The text that is displayed if an upload was manually canceled
     */
    dictUploadCanceled: string;
    /**
     * If `addRemoveLinks` is true, the text to be used for confirmation when cancelling upload.
     */
    dictCancelUploadConfirmation: string;
    /**
     * If `addRemoveLinks` is true, the text to be used to remove a file.
     */
    dictRemoveFile: string;
    /**
     * If this is not null, then the user will be prompted before removing a file.
     */
    dictRemoveFileConfirmation: string | null;
    /**
     * Displayed if `maxFiles` is set and exceeded.
     * The string `{{maxFiles}}` will be replaced by the configuration value.
     */
    dictMaxFilesExceeded: string;
    /**
     * Allows you to translate the different units. Starting with `tb` for terabytes and going down to
     * `b` for bytes.
     */
    dictFileSizeUnits: {
        tb: string;
        gb: string;
        mb: string;
        kb: string;
        b: string;
    };
    /**
     * Called when dropzone initialized
     * You can add event listeners here
     */
    init(): void;
    /**
     * Can be an **object** of additional parameters to transfer to the server, **or** a `Function`
     * that gets invoked with the `files`, `xhr` and, if it's a chunked upload, `chunk` arguments. In case
     * of a function, this needs to return a map.
     *
     * The default implementation does nothing for normal uploads, but adds relevant information for
     * chunked uploads.
     *
     * This is the same as adding hidden input fields in the form element.
     */
    params(this: Dropzone, files: DropzoneFile[], xhr: XMLHttpRequest, chunk: any): {
        dzuuid: any;
        dzchunkindex: any;
        dztotalfilesize: any;
        dzchunksize: number;
        dztotalchunkcount: any;
        dzchunkbyteoffset: number;
    } | undefined;
    /**
     * A function that gets a [file](https://developer.mozilla.org/en-US/docs/DOM/File)
     * and a `done` function as parameters.
     *
     * If the done function is invoked without arguments, the file is "accepted" and will
     * be processed. If you pass an error message, the file is rejected, and the error
     * message will be displayed.
     * This function will not be called if the file is too big or doesn't match the mime types.
     */
    accept(file: DropzoneFile, done: DropzoneAcceptCallback): void;
    /**
     * The callback that will be invoked when all chunks have been uploaded for a file.
     * It gets the file for which the chunks have been uploaded as the first parameter,
     * and the `done` function as second. `done()` needs to be invoked when everything
     * needed to finish the upload process is done.
     */
    chunksUploaded: (file: DropzoneFile, done: () => void) => void;
    /**
     * Sends the file as binary blob in body instead of form data.
     * If this is set, the `params` option will be ignored.
     * It's an error to set this to `true` along with `uploadMultiple` since
     * multiple files cannot be in a single binary body.
     */
    binaryBody: boolean;
    /**
     * Gets called when the browser is not supported.
     * The default implementation shows the fallback input field and adds
     * a text.
     */
    fallback(this: Dropzone): any;
    /**
     * Gets called to calculate the thumbnail dimensions.
     *
     * It gets `file`, `width` and `height` (both may be `null`) as parameters and must return an object containing:
     *
     *  - `srcWidth` & `srcHeight` (required)
     *  - `trgWidth` & `trgHeight` (required)
     *  - `srcX` & `srcY` (optional, default `0`)
     *  - `trgX` & `trgY` (optional, default `0`)
     *
     * Those values are going to be used by `ctx.drawImage()`.
     */
    resize(file: DropzoneFile, width: number | null, height: number | null, resizeMethod: string): Record<string, number>;
    /**
     * Can be used to transform the file (for example, resize an image if necessary).
     *
     * The default implementation uses `resizeWidth` and `resizeHeight` (if provided) and resizes
     * images according to those dimensions.
     *
     * Gets the `file` as the first parameter, and a `done()` function as the second, that needs
     * to be invoked with the file when the transformation is done.
     */
    transformFile(this: Dropzone, file: DropzoneFile, done: DropzoneTransformCallback): void;
    /**
     * A string that contains the template used for each dropped
     * file. Change it to fulfill your needs but make sure to properly
     * provide all elements.
     *
     * If you want to use an actual HTML element instead of providing a String
     * as a config option, you could create a div with the id `tpl`,
     * put the template inside it and provide the element like this:
     *
     *     document
     *       .querySelector('#tpl')
     *       .innerHTML
     *
     */
    previewTemplate: string;
    drop(this: Dropzone, e: any): void;
    dragstart(e: any): void;
    dragend(this: Dropzone, e: any): void;
    dragenter(this: Dropzone, e: any): void;
    dragover(this: Dropzone, e: any): void;
    dragleave(this: Dropzone, e: any): void;
    paste(e: any): void;
    reset(this: Dropzone): void;
    addedfile(this: Dropzone, file: DropzoneFile): void;
    removedfile(this: Dropzone, file: DropzoneFile): void;
    thumbnail(file: DropzoneFile, dataUrl: string): number | undefined;
    error(file: DropzoneFile, message: string): void;
    errormultiple(): void;
    processing(this: Dropzone, file: DropzoneFile): string | undefined;
    processingmultiple(): void;
    uploadprogress(file: DropzoneFile, progress: number, bytesSent: number): void;
    totaluploadprogress(): void;
    sending(): void;
    sendingmultiple(): void;
    success(file: DropzoneFile): void;
    successmultiple(): void;
    canceled(this: Dropzone, file: DropzoneFile): Dropzone;
    canceledmultiple(): void;
    complete(this: Dropzone, file: DropzoneFile): void;
    completemultiple(): void;
    maxfilesexceeded(): void;
    maxfilesreached(): void;
    queuecomplete(): void;
    addedfiles(): void;
    /**
     * Called when a dropped folder turns out to have nothing in it at all.
     * Receives the folder's path.
     */
    emptyfolder(): void;
};
export type DropzoneOptions = Partial<typeof defaultOptions>;
export type ResolvedDropzoneOptions = typeof defaultOptions;
export default defaultOptions;
