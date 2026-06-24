import type { PixelCrop } from "react-image-crop";

/**
 * Crops an image from the given source URL and converts it into a `File`.
 *
 * @param {string} imageSrc - The source URL of the image to be cropped.
 * @param {PixelCrop} crop - The crop object containing dimensions and coordinates.
 * @returns {Promise<File | null>} A promise resolving to the cropped image as a `File`, or `null` if the operation fails.
 */
export const cropToFile = async (imageSrc: string, crop: PixelCrop): Promise<File | null> => {
    if (!crop || !imageSrc) return null;

    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => resolve(img);
        img.onerror = (error) => reject(error);
    });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return null;

    const { width, height, x, y } = crop;

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(image, x, y, width, height, 0, 0, width, height);

    return new Promise<File | null>((resolve) => {
        canvas.toBlob(
            (blob) => {
                if (!blob) return resolve(null);
                const file = new File([blob], "cropped-image.jpeg", { type: "image/jpeg" });
                resolve(file);
            },
            "image/jpeg",
            1,
        );
    });
};

/**
 * Crops an image from the given source URL and triggers a download for the cropped image.
 *
 * @param {string} imageSrc - The source URL of the image to be cropped.
 * @param {PixelCrop} crop - The crop object containing dimensions and coordinates.
 * @returns {Promise<void>} A promise that resolves when the download is triggered.
 */
export const cropToDownloadable = async (imageSrc: string, crop: PixelCrop): Promise<void> => {
    const croppedFile = await cropToFile(imageSrc, crop);
    if (!croppedFile) return;

    const url = URL.createObjectURL(croppedFile);
    // Create a temporary link and trigger download
    const link = document.createElement("a");
    link.href = url;
    link.download = "cropped-image.jpeg";
    document.body.appendChild(link);
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
};

/**
 * Converts a `File` into a Base64-encoded string URL.
 *
 * @param {File} file - The file to be converted.
 * @returns {Promise<string>} A promise resolving to the Base64 string of the file.
 */
export const fileToLink = async (file: File): Promise<string> => {
    return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
    });
};

/**
 * Converts a `File` into a `Blob` object.
 *
 * @param {File} file - The file to be converted.
 * @returns {Promise<Blob>} A promise resolving to the `Blob` representation of the file.
 */
export const fileToBlob = async (file: File): Promise<Blob> => {
    return new Promise<Blob>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(new Blob([reader.result as ArrayBuffer]));
        reader.readAsArrayBuffer(file);
    });
};
