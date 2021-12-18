// Expand (uncollapse) all nodes.
function orgChartExpandAll() {
    orgChartShowAll();
    for (var ii = 1; ii < chart_config.length; ii++) {
        if (chart_config[ii].collapsable === true) {
            chart_config[ii].collapsed = false;
        }
    }
    var chart = new Treant(chart_config);
}

// Collapse all nodes but the top-level node and its direct children.
function orgChartCollapseAll() {
    orgChartShowAll();
    for (var ii = 1; ii < chart_config.length; ii++) {
        if (chart_config[ii].parentIndex == -1) {
            chart_config[ii].collapsed = false;
        } else {
            if (chart_config[ii].collapsable === true) {
                chart_config[ii].collapsed = true;
            }
        }
    }
    var chart = new Treant(chart_config);
}

function orgChartSearch() {
    orgChartHideAll();

    // Grab the search string.
    var str = document.getElementById("searchStr").value.toLowerCase();
    if (str === "") {
        return;
    }

    orgChartSetParentIds(1);

    orgChartCollapseAll();

    // Search all records for the string.
    var foundNodes = [];
    for (var ii = 1; ii < chart_config.length; ii++) {
        if (typeof chart_config[ii].text === "undefined") {
            continue;
        }
        if (typeof chart_config[ii].text.title === "undefined") {
            continue;
        }
        var title = chart_config[ii].text.title + "";
        title = title.toLowerCase();
        if (title.includes(str)) {
            foundNodes.push(ii);
        }

        var name = chart_config[ii].text.name + "";
        name = name.toLowerCase();
        if (name.includes(str)) {
            foundNodes.push(ii);
        }
    }

    if (foundNodes.length == 0) {
        return;
    }

    // We found one or more nodes, start by hiding everything.
    orgChartHideAll();

    // For each node found to contain the string, uncollapse and unhide
    // it and its ancestors.
    for (var ii = 0; ii < foundNodes.length; ii++) {
        orgChartUncollapseTree(foundNodes[ii]);
    }

    // Re-draw the chart.
    var chart = new Treant(chart_config);
}

// Given an index to a node, find its parent and uncollapse it.
// Repeat all the way to the top.
function orgChartUncollapseTree(startAtIndex) {
    orgChartShowNode(startAtIndex);
    while (1) {
        var thisNode = chart_config[startAtIndex];
        var parentIndex = thisNode.parentIndex;
        if (parentIndex === -1) break;
        var parentNode = chart_config[parentIndex];
        if (typeof parentNode.collapsed != "undefined") {
            parentNode.collapsed = false;
        }
        orgChartShowNode(parentIndex);
        startAtIndex = parentIndex;
    }
}

// Loop through all nodes under the root.  Root is assumed
// to be at index "1".  Each node that has children, set
// their "parentIndex" to the current node.
function orgChartSetParentIds(currentNodeIndex) {
    chart_config[1].parentIndex = -1
    for (var currentNodeIndex = 1; currentNodeIndex < chart_config.length; currentNodeIndex++) {
        var thisNode = chart_config[currentNodeIndex];
        if (typeof thisNode.children === "undefined") continue;
        if (thisNode.children.length > 0) {
            for (var ii = 0; ii < thisNode.children.length; ii++) {
                var childNodeIndex = orgChartGetIndexOfNode(thisNode.children[ii], currentNodeIndex);
                if (childNodeIndex < 0) continue;
                var childNode = chart_config[childNodeIndex]
                chart_config[childNodeIndex].parentIndex = currentNodeIndex;
            }
        }
    }
}

// Given a node, find its index in the chart_config[] array.  If
// not found, return negative.
function orgChartGetIndexOfNode(thisNode, startIndex) {
    for (var ii = startIndex; ii < chart_config.length; ii++) {
        var iiNode = chart_config[ii];
        if (iiNode == thisNode) {
            return ii;
        }
    }
    return -1;
}

// Add class "faded" to all but top-level node.
function orgChartHideAll() {
    for (var ii = 1; ii < chart_config.length; ii++) {
        if (chart_config[ii].parentIndex == -1) {
            if (String(chart_config[ii].HTMLclass).indexOf("faded") > 0) {
                var str = String(chart_config[ii].HTMLclass).replace("faded", "");
            }
        } else {
            orgChartHideNode(ii);
        }
    }
}

// Add the class "faded" to the node at the given index.
function orgChartHideNode(nodeIndex) {
    // Never hide top-level node.
    if (nodeIndex === 1) return;
    if (String(chart_config[nodeIndex].HTMLclass).indexOf("faded") < 0) {
        chart_config[nodeIndex].HTMLclass += " faded";
    }
}

// Remove class "faded" from all nodes.
function orgChartShowAll() {
    for (var ii = 1; ii < chart_config.length; ii++) {
        orgChartShowNode(ii);
    }
}

// Remove the class "faded" from the node at the given index.
function orgChartShowNode(nodeIndex) {
    var str = String(chart_config[nodeIndex].HTMLclass).replace("faded", "");
    chart_config[nodeIndex].HTMLclass = str;
}
