export type ImageFillMode = "fill" | "fit" | "crop" | "tile";

/** Image adjustment values, each ranging from -100 to 100. */
export interface ImageAdjustments {
    exposure: number;
    contrast: number;
    saturation: number;
    temperature: number;
    tint: number;
    highlights: number;
    shadows: number;
}

export const DEFAULT_ADJUSTMENTS: ImageAdjustments = {
    exposure: 0,
    contrast: 0,
    saturation: 0,
    temperature: 0,
    tint: 0,
    highlights: 0,
    shadows: 0,
};

/** Apply image adjustments (exposure, contrast, saturation, etc.) and rotation to a canvas. */
export const applyImageFilters = (canvas: HTMLCanvasElement, img: HTMLImageElement, adj: ImageAdjustments, fillMode: ImageFillMode, rotation = 0) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const size = canvas.width;
    ctx.clearRect(0, 0, size, size);

    // Apply rotation around the canvas center
    if (rotation !== 0) {
        ctx.save();
        ctx.translate(size / 2, size / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.translate(-size / 2, -size / 2);
    }

    if (fillMode === "tile") {
        const tileSize = Math.min(img.width, img.height, size / 2);
        const cols = Math.ceil(size / tileSize);
        const rows = Math.ceil(size / tileSize);
        for (let r = 0; r < rows; r++)
            for (let c = 0; c < cols; c++) ctx.drawImage(img, 0, 0, img.width, img.height, c * tileSize, r * tileSize, tileSize, tileSize);
    } else if (fillMode === "fit") {
        const ratio = Math.min(size / img.width, size / img.height);
        const dw = img.width * ratio;
        const dh = img.height * ratio;
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, size, size);
        ctx.drawImage(img, (size - dw) / 2, (size - dh) / 2, dw, dh);
    } else {
        const ratio = Math.max(size / img.width, size / img.height);
        const dw = img.width * ratio;
        const dh = img.height * ratio;
        ctx.drawImage(img, (size - dw) / 2, (size - dh) / 2, dw, dh);
    }

    // Restore transform so getImageData reads from final pixel coordinates
    if (rotation !== 0) ctx.restore();

    const imageData = ctx.getImageData(0, 0, size, size);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        let r = data[i],
            g = data[i + 1],
            b = data[i + 2];
        const em = Math.pow(2, adj.exposure / 100);
        r *= em;
        g *= em;
        b *= em;
        const cf = (259 * (adj.contrast + 255)) / (255 * (259 - adj.contrast));
        r = cf * (r - 128) + 128;
        g = cf * (g - 128) + 128;
        b = cf * (b - 128) + 128;
        const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        const sf = 1 + adj.saturation / 100;
        r = gray + sf * (r - gray);
        g = gray + sf * (g - gray);
        b = gray + sf * (b - gray);
        r += adj.temperature * 0.5;
        b -= adj.temperature * 0.5;
        g += adj.tint * 0.5;
        const lum = (r + g + b) / 3;
        if (lum > 128) {
            const f = (adj.highlights / 200) * ((lum - 128) / 127) * 50;
            r += f;
            g += f;
            b += f;
        }
        if (lum < 128) {
            const f = (adj.shadows / 200) * ((128 - lum) / 128) * 50;
            r += f;
            g += f;
            b += f;
        }
        data[i] = Math.max(0, Math.min(255, r));
        data[i + 1] = Math.max(0, Math.min(255, g));
        data[i + 2] = Math.max(0, Math.min(255, b));
    }
    ctx.putImageData(imageData, 0, 0);
};
