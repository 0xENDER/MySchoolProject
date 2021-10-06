/*

    Manage all the variable that could affect performance

*/


// Define the "performanceVariables" global object
window.performanceVariables = {

    isLowPerforming: (
        (window.platform.hardware.memory.capacity != null && window.platform.hardware.memory.capacity <= 4) ||
        (window.platform.hardware.CPU.logicalProcessors != null && window.platform.hardware.CPU.logicalProcessors < 4)
    ),

    hasCustomScrollbar: false,
    supportsPassiveEvent: false,
    maxSuggestionsCardLoad: 0,
    maxSuggestionsRowsLoad: 0

};

// Update the page rendering mode!
document.documentElement.dataset.renderingMode = (window.performanceVariables.isLowPerforming) ? "low" : "high";

// Check if the page has a custom scrollbar or not
window.performanceVariables.hasCustomScrollbar = !(window.platform.device.isTablet || window.platform.device.isMobile);

// Update the passive event variable
try {

    var opts = Object.defineProperty({}, 'passive', {

        get: function() {

            window.performanceVariables.supportsPassiveEvent = true;

        }

    });

    window.addEventListener("testPassive", null, opts);
    window.removeEventListener("testPassive", null, opts);

} catch {}

// Update all the variables
if (window.performanceVariables.isLowPerforming) {

    window.performanceVariables.maxSuggestionsCardLoad = 4;
    window.performanceVariables.maxSuggestionsRowsLoad = 2;

} else {

    window.performanceVariables.maxSuggestionsCardLoad = 12;
    window.performanceVariables.maxSuggestionsRowsLoad = 4;

}