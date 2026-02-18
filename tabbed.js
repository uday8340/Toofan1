(function setTabsFromHashImmediately() {
    var hash = (window.location.hash || '').trim();
    var tabId = hash.length > 1 ? hash.replace('#', '') : '';
    var containers = document.querySelectorAll('.tab-container');
    for (var c = 0; c < containers.length; c++) {
        var container = containers[c];
        var tabs = container.querySelectorAll('.tabs a, .tabs > div');
        var tabContent = container.querySelectorAll('.tab-content');
        var tabContentContainers = container.querySelectorAll('.tab-content-container');
        if (!tabs.length || !tabContent.length) continue;
        // 1) Clear any default .active from HTML so first tab never flashes
        for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove('active');
        container.querySelectorAll('.navLink, .tab').forEach(function(t) { t.classList.remove('active'); });
        for (var j = 0; j < tabContent.length; j++) tabContent[j].classList.remove('active');
        for (var k = 0; k < tabContentContainers.length; k++) tabContentContainers[k].classList.remove('active');
        // 2) Set only the tab that matches hash (or first if no hash)
        var norm = (tabId || '').trim().toLowerCase();
        var tabToActivate = null, contentIdx = -1;
        if (norm) {
            for (var i = 0; i < tabs.length; i++) {
                var href = (tabs[i].getAttribute('href') || '').replace('#', '').trim().toLowerCase();
                if (href === norm) { tabToActivate = tabs[i]; contentIdx = i; break; }
            }
        }
        var foundIdx = -1;
        for (var j = 0; j < tabContent.length; j++) {
            if ((tabContent[j].id || '').trim().toLowerCase() === norm) { foundIdx = j; break; }
        }
        if (!tabToActivate && !norm && tabs[0]) { tabToActivate = tabs[0]; contentIdx = 0; }
        var idx = foundIdx >= 0 ? foundIdx : contentIdx;
        if (tabToActivate && idx >= 0 && tabContent[idx] && tabContentContainers[idx]) {
            tabToActivate.classList.add('active');
            tabContent[idx].classList.add('active');
            tabContentContainers[idx].classList.add('active');
        } else if (!norm && tabs[0] && tabContent[0] && tabContentContainers[0]) {
            tabs[0].classList.add('active');
            tabContent[0].classList.add('active');
            tabContentContainers[0].classList.add('active');
        }
    }
})();
