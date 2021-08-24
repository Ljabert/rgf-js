var rgf = Object.freeze({
    setImageFromRGF: function (node, rgf, fColor, bColor) {
        var data = new Uint8Array(rgf);
        // EV3 resolution is 178 x 128
        var width = Math.min(data[0], 178);
        var height = Math.min(data[1], 128);
        var byteWidth = width / 8;
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');
        for (var y = 0; y < height; y++) {
            for (var xByte = 0; xByte < byteWidth; xByte++) {
                for (var i = 7; i >= 0; i--) {
                    // the + 2 skips the width and height byte, no need to slice
                    if (data[y * byteWidth + xByte + 2] & (1 << i)) {
                        ctx.fillStyle = fColor;
                    }
                    else {
                        ctx.fillStyle = bColor;
                    }
                    ctx.fillRect(xByte * 8 + i, y, 1, 1);
                }
            }
        }
        node.src = canvas.toDataURL('image/png');
    },
    loadRGF: function (node, fColor, bColor) {
        var _this = this;
        if (fColor === void 0) { fColor = 'black'; }
        if (bColor === void 0) { bColor = 'white'; }
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('loadstart', function () {
            xhr.responseType = 'arraybuffer';
        });
        xhr.addEventListener('load', function () {
            _this.setImageFromRGF(node, xhr.response, fColor, bColor);
        });
        xhr.open('GET', node.src);
        xhr.send();
    },
});
