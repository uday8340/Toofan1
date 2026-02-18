(function () {
    var style = '.tab-container{visibility:hidden}.tab-container.tabs-initialized{visibility:visible}';
    if (typeof document === 'undefined' || !document.documentElement) return;
    if (!document.body) {
        document.write('<style id="tab-no-flash">' + style + '</style>');
    } else {
        if (!document.getElementById('tab-no-flash')) {
            var el = document.createElement('style');
            el.id = 'tab-no-flash';
            el.textContent = style;
            (document.head || document.documentElement).appendChild(el);
        }
    }
})();
function initTabComponents() {
    addTooltipIfTruncatedLines(".line-clamp");
    document.querySelectorAll('.tab-container').forEach(function (el, idx) {
        setupTabComponent(el, 'tab-component-' + (idx + 1));
    });
    window.setupTabComponent = setupTabComponent;
}

if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", initTabComponents);
} else {
    initTabComponents();
}

window.addEventListener('hashchange', function () {
    document.querySelectorAll('.tab-container').forEach(function (el) {
        if (el.setupTabComponentInstance) {
            el.setupTabComponentInstance.activateTabByHash();
        }
    });
});

window.addEventListener('load', function () {
    document.querySelectorAll('.tab-container').forEach(function (el) {
        if (el.setupTabComponentInstance) {
            el.setupTabComponentInstance.activateTabByHash();
        }
    });
});
