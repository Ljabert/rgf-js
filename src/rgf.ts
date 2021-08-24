const rgf = Object.freeze({
    setImageFromRGF(node: HTMLImageElement, rgf: ArrayBuffer, fColor: string, bColor: string) {
        const data = new Uint8Array(rgf);

        // EV3 resolution is 178 x 128
        const width = Math.min(data[0], 178); 
        const height = Math.min(data[1], 128);
        const byteWidth = width / 8;

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        for (let y = 0; y < height; y++) {
            for (let xByte = 0; xByte < byteWidth; xByte++) {
                for (let i = 7; i >= 0; i--) {
                    // the + 2 skips the width and height byte, no need to slice
                    if (data[y * byteWidth + xByte + 2] & (1 << i)) {
                        ctx.fillStyle = fColor;
                    } else {
                        ctx.fillStyle = bColor;
                    }
    
                    ctx.fillRect(xByte * 8 + i, y, 1, 1);
                }
            }
        }

        node.src = canvas.toDataURL('image/png');
    },
    loadRGF(node: HTMLImageElement, fColor: string = 'black', bColor: string = 'white') {
        const xhr = new XMLHttpRequest();

        xhr.addEventListener('loadstart', () => {
            xhr.responseType = 'arraybuffer';
        });

        xhr.addEventListener('load', () => {
            this.setImageFromRGF(node, xhr.response, fColor, bColor);
        });
    
        xhr.open('GET', node.src);
        xhr.send();
    },
});