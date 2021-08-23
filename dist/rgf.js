var rgf = (function () {
    var setImageFromRGF = function (node, rgf, fColor, bColor) {
        var data = new Uint8Array(rgf);
        // EV3 resolution is 178 x 128
        var width = Math.min(data[0], 178);
        var height = Math.min(data[1], 128);
        var byteWidth = width / 8;
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = bColor;
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = fColor;
        for (var y = 0; y < height; y++) {
            for (var xByte = 0; xByte < byteWidth; xByte++) {
                for (var i = 7; i >= 0; i--) {
                    // the + 2 skips the width and height byte, no need to slice
                    data[y * byteWidth + xByte + 2] & (1 << i) && ctx.fillRect(xByte * 8 + i, y, 1, 1);
                }
            }
        }
        node.src = canvas.toDataURL('image/png');
    };
    return {
        loadRGF: function (node, fColor, bColor) {
            if (fColor === void 0) { fColor = 'black'; }
            if (bColor === void 0) { bColor = 'white'; }
            if (node.src && node.naturalWidth === 0 && node.src.match(/\.rgf($|\?|#)/)) {
                var xhr_1 = new XMLHttpRequest();
                xhr_1.addEventListener('loadstart', function () {
                    xhr_1.responseType = 'arraybuffer';
                });
                xhr_1.addEventListener('load', function () {
                    setImageFromRGF(node, xhr_1.response, fColor, bColor);
                });
                xhr_1.open('GET', node.src);
                xhr_1.send();
            }
        },
    };
})();