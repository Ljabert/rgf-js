{
    var applyRGFFix_1 = function () {
        Array.prototype.forEach.call(document.querySelectorAll('img:not([rgf-fixed])'), (function (node) {
            var fColor = node.getAttribute('rgf-foreground-color') || undefined;
            var bColor = node.getAttribute('rgf-background-color') || undefined;
            rgf.loadRGF(node, fColor, bColor);
            node.setAttribute('rgf-fixed', node.src);
        }));
    };
    window.addEventListener('load', function () {
        new MutationObserver(applyRGFFix_1).observe(document.body, {
            attributes: true,
            childList: true,
            subtree: true,
        });
        applyRGFFix_1();
    });
}
