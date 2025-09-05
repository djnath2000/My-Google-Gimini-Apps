/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// Helper function to load an image and return it as an HTMLImageElement
function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(new Error(`Failed to load image for filtering: ${src.substring(0, 50)}...`));
        img.src = src;
    });
}

/**
 * Applies a CSS filter to an image and returns the result as a new data URL.
 * @param imageUrl The data URL of the source image.
 * @param filterCss The CSS filter string (e.g., 'sepia(1) grayscale(0.5)').
 * @returns A promise that resolves to the data URL of the filtered image.
 */
export async function applyFilterToImage(imageUrl: string, filterCss: string): Promise<string> {
    if (filterCss === 'none') {
        return imageUrl;
    }

    const image = await loadImage(imageUrl);
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('Could not get 2D canvas context for filtering');
    }

    ctx.filter = filterCss;
    ctx.drawImage(image, 0, 0);

    // Return as JPEG for potentially smaller file size, which is good for API calls.
    return canvas.toDataURL('image/jpeg', 0.9);
}
