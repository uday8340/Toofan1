(function () {
    if (typeof document === 'undefined' || !document.documentElement) return;
    var style = '.tab-container{visibility:hidden}.tab-container.tabs-initialized{visibility:visible}';
    if (!document.body) {
        document.write('<style id="tab-no-flash">' + style + '</style>');
        return;
    }
    if (!document.getElementById('tab-no-flash')) {
        var el = document.createElement('style');
        el.id = 'tab-no-flash';
        el.textContent = style;
        (document.head || document.documentElement).appendChild(el);
    }
    // When script runs at end of body: hide and set correct tab immediately (same tick) so no flash
    var containers = document.querySelectorAll('.tab-container');
    var hash = (window.location.hash || '').trim();
    var tabId = hash.length > 1 ? hash.replace('#', '') : '';
    for (var c = 0; c < containers.length; c++) {
        var container = containers[c];
        container.style.visibility = 'hidden';
        var tabs = container.querySelectorAll('.tabs a, .tabs > div');
        var tabContent = container.querySelectorAll('.tab-content');
        var tabContentContainers = container.querySelectorAll('.tab-content-container');
        if (!tabs.length || !tabContent.length) { container.style.visibility = ''; continue; }
        var norm = (tabId || '').trim().toLowerCase();
        for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove('active');
        container.querySelectorAll('.navLink, .tab').forEach(function (t) { t.classList.remove('active'); });
        for (var j = 0; j < tabContent.length; j++) tabContent[j].classList.remove('active');
        for (var k = 0; k < tabContentContainers.length; k++) tabContentContainers[k].classList.remove('active');
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
        container.classList.add('tabs-initialized');
        container.style.visibility = '';
    }
})();
