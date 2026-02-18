(function applyHashToTabContainersEarly() {
    var hash = (window.location.hash || '').trim();
    var tabId = hash.length > 1 ? hash.replace('#', '') : '';
    var containers = document.querySelectorAll('.tab-container');
    containers.forEach(function(container) {
        var tabs = container.querySelectorAll('.tabs a, .tabs > div');
        var tabContent = container.querySelectorAll('.tab-content');
        var tabContentContainers = container.querySelectorAll('.tab-content-container');
        if (!tabs.length || !tabContent.length) return;
        var normalizedTabId = (tabId || '').trim().toLowerCase();
        var tabToActivate = null, contentIndex = -1;
        if (normalizedTabId) {
            tabs.forEach(function(tab, i) {
                var href = tab.getAttribute('href');
                var normalizedHref = href ? href.replace('#', '').trim().toLowerCase() : '';
                if (normalizedHref && normalizedHref === normalizedTabId) {
                    tabToActivate = tab;
                    contentIndex = i;
                }
            });
        }
        var foundContentIndex = -1;
        tabContent.forEach(function(content, idx) {
            var normalizedContentId = (content.id || '').trim().toLowerCase();
            if (normalizedContentId === normalizedTabId) foundContentIndex = idx;
        });
        if (!tabToActivate && tabs.length > 0 && !normalizedTabId) {
            tabToActivate = tabs[0];
            contentIndex = 0;
        }
        var activateIndex = foundContentIndex !== -1 ? foundContentIndex : contentIndex;
        if (tabToActivate && activateIndex >= 0 && tabContent[activateIndex] && tabContentContainers[activateIndex]) {
            tabToActivate.classList.add('active');
            tabContent[activateIndex].classList.add('active');
            tabContentContainers[activateIndex].classList.add('active');
        } else if (!normalizedTabId && tabs[0] && tabContent[0] && tabContentContainers[0]) {
            tabs[0].classList.add('active');
            tabContent[0].classList.add('active');
            tabContentContainers[0].classList.add('active');
        }
    });
})();
