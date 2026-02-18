<!-- topNavL3.html (JavaScript portion) -->
<script>
document.addEventListener("DOMContentLoaded", function () {
    addTooltipIfTruncatedLines(".line-clamp");
});

function setupTabComponent(componentElement, componentId) {
    let tabs = componentElement.querySelectorAll(".tabs a, .tabs > div");
    const tabContent = componentElement.querySelectorAll(".tab-content");
    const tabContentContainers = componentElement.querySelectorAll(".tab-content-container");

    // Helper: Activate tab/content by index
    function activateTabByIndex(index) {
        tabs.forEach((t) => t.classList.remove("active"));
        componentElement.querySelectorAll('.navLink, .tab').forEach((t) => t.classList.remove('active'));
        tabContent.forEach((content) => content.classList.remove("active"));
        tabContentContainers.forEach((container) => container.classList.remove("active"));

        if (tabs[index]) {
            tabs[index].classList.add("active");
            if (tabs[index].classList.contains('navLink') || tabs[index].classList.contains('tab')) {
                tabs[index].classList.add('active');
            }
        }
        if (tabContent[index]) tabContent[index].classList.add("active");
        if (tabContentContainers[index]) tabContentContainers[index].classList.add("active");
    }

    // Helper: Activate tab/content by tabId (string, without #)
    function activateTabById(tabId) {
        tabs.forEach((t) => t.classList.remove("active"));
        componentElement.querySelectorAll('.navLink, .tab').forEach((t) => t.classList.remove('active'));
        tabContent.forEach((content) => content.classList.remove("active"));
        tabContentContainers.forEach((container) => container.classList.remove("active"));

        let tabToActivate = null;
        let contentIndex = -1;
        const normalizedTabId = (tabId || '').trim().toLowerCase();

        tabs.forEach((tab, i) => {
            let href = tab.getAttribute('href');
            let normalizedHref = href ? href.replace('#', '').trim().toLowerCase() : '';
            if (normalizedHref && normalizedHref === normalizedTabId) {
                tabToActivate = tab;
                contentIndex = i;
            }
        });

        let foundContentIndex = -1;
        tabContent.forEach((content, idx) => {
            let normalizedContentId = (content.id || '').trim().toLowerCase();
            if (normalizedContentId === normalizedTabId) {
                foundContentIndex = idx;
            }
        });

        if (!tabToActivate && tabs.length > 0 && !tabId) {
            tabToActivate = tabs[0];
            contentIndex = 0;
        }

        let activateIndex = foundContentIndex !== -1 ? foundContentIndex : contentIndex;
        if (tabToActivate && activateIndex !== -1 && tabContent[activateIndex] && tabContentContainers[activateIndex]) {
            tabToActivate.classList.add("active");
            if (tabToActivate.classList.contains('navLink') || tabToActivate.classList.contains('tab')) {
                tabToActivate.classList.add('active');
            }
            tabContent[activateIndex].classList.add("active");
            tabContentContainers[activateIndex].classList.add("active");
            return true;
        }
        return false;
    }

    // Activate tab based on hash if available
    function activateTabByHash() {
        const hash = window.location.hash.trim();
        if (hash && hash.length > 1) {
            const tabId = hash.replace('#', '');
            const found = activateTabById(tabId);
            if (!found) {
                return;
            }
        }

        if (!window.location.hash && tabs.length > 0) {
            activateTabByIndex(0);
        }
    }

    // Initial activation by hash
    activateTabByHash();

    // On click, use href/id mapping
    tabs.forEach((tab, idx) => {
        addTooltipIfTruncatedLines(".line-clamp");
        tab.addEventListener('click', (e) => {
            let href = ta

Kaustubh patil
2:33 PM
b.getAttribute("href");
            let hasUniqueHref = href && href !== '#' && href.trim() !== '';
            if (tab.tagName.toLowerCase() === 'a' && hasUniqueHref) {
                e.preventDefault();
                const tabId = href.replace('#', '');
                window.location.hash = tabId;
                activateTabById(tabId);
            } else {
                e.preventDefault();
                activateTabByIndex(idx);
            }
        });
    });

    componentElement.setupTabComponentInstance = {
        activateTabByHash
    };
}

// Auto-initialize all tabbed components on the page
document.querySelectorAll('.tab-container').forEach((el, idx) => {
    setupTabComponent(el, 'tab-component-' + (idx + 1));
});

// Listen for hash changes to support browser navigation
window.addEventListener('hashchange', function () {
    document.querySelectorAll('.tab-container').forEach((el) => {
        if (el.setupTabComponentInstance) {
            el.setupTabComponentInstance.activateTabByHash();
        }
    });
});

// Ensure tab activation runs after full page load
window.addEventListener('load', function () {
    document.querySelectorAll('.tab-container').forEach((el) => {
        if (el.setupTabComponentInstance) {
            el.setupTabComponentInstance.activateTabByHash();
        }
    });
});

window.setupTabComponent = setupTabComponent;
});  // end DOMContentLoaded (if the opening was at the top)

$(document).on("click", ".tabs", function (event) {
    const anchorTag = event.target.getAttribute("target");
    const contentType = anchorTag === "_blank" ? "external" : "internal";
    const eventModule = event.target.innerText;
    const subTitle = "sub tab";
    trackButtonEvent(eventModule, "", subTitle, "");
});

function trackButtonEvent(eventName, mainTitle, subTitle, contentType) {
    const evenInfo = {
        eventAction: 'click',
        eventSelection: eventName,
        eventModule: mainTitle,
        eventPageArea: subTitle,
        contentType: contentType
    };
    console.log(evenInfo);
    adobeAnalytics.setEventInfo(evenInfo);
    adobeAnalytics.trackEventAction();
}
</script>
