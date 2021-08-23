{
    const applyRGFFix = () => {
        Array.prototype.forEach.call(document.querySelectorAll('img:not([rgf-fixed])'), ((node: HTMLImageElement) => {
            const fColor = node.getAttribute('rgf-foreground-color') || undefined;
            const bColor = node.getAttribute('rgf-background-color') || undefined;

            rgf.loadRGF(node, fColor, bColor);
            node.setAttribute('rgf-fixed', '');
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