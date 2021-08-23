const rgf = (() => {
    const setImageFromRGF = (node: HTMLImageElement, rgf: ArrayBuffer, fColor: string, bColor: string) => {
        const data = new Uint8Array(rgf);

        // EV3 resolution is 178 x 128
        const width = Math.min(data[0], 178); 
        const height = Math.min(data[1], 128);
        const byteWidth = width / 8;

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = bColor;
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = fColor;

        for (let y = 0; y < height; y++) {
            for (let xByte = 0; xByte < byteWidth; xByte++) {
                for (let i = 7; i >= 0; i--) {
                    // the + 2 skips the width and height byte, no need to slice
                    data[y * byteWidth + xByte + 2] & (1 << i) && ctx.fillRect(xByte * 8 + i, y, 1, 1);
                }
            }
        }

        node.src = canvas.toDataURL('image/png');
    }

    return {
        loadRGF: (node: HTMLImageElement, fColor: string = 'black', bColor: string = 'white') => {
            if (node.src && node.naturalWidth === 0 && node.src.match(/\.rgf($|\?|#)/)) {
                const xhr = new XMLHttpRequest();

                xhr.addEventListener('loadstart', () => {
                    xhr.responseType = 'arraybuffer';
                });

                xhr.addEventListener('load', () => {
                    setImageFromRGF(node, xhr.response, fColor, bColor);
                });
            
                xhr.open('GET', node.src);
                xhr.send();
            }
        },
    };
})();