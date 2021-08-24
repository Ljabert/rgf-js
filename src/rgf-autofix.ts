{
    const applyRGFFix = () => {
        Array.prototype.forEach.call(document.querySelectorAll('img:not([rgf-fixed])'), ((node: HTMLImageElement) => {
            const fColor = node.getAttribute('rgf-foreground-color') || undefined;
            const bColor = node.getAttribute('rgf-background-color') || undefined;

            if (node.src && node.naturalWidth === 0 && node.src.match(/\.rgf($|\?|#)/)) {
                rgf.loadRGF(node, fColor, bColor);
                node.setAttribute('rgf-fixed', node.src);
            } else{
                node.setAttribute('rgf-fixed', 'false');
            }
        }));
    };

    window.addEventListener('load', () => {
        new MutationObserver(applyRGFFix).observe(document.body,  {
            attributes: true,
            childList: true,
            subtree: true,
        });

        applyRGFFix();
    });
}