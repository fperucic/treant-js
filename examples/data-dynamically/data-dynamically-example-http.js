
function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'json-data-sample.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

var config = {
    container: "#data-dynamically-example",

    connectors: {
        type: 'step'
    },
    node: {
        HTMLclass: 'nodeExample1'
    }
}

loadJSON(function (response) {
    // Parse JSON string into object
    var json_data = JSON.parse(response);
    var jModel = eval(json_data);
    //console.log(jModel);
    var offset = 1;
    var chart_config = new Array(jModel.length + offset);
    chart_config[0] = config;
    for (k = 0; k < jModel.length; k++) {
        var varname = jModel[k]["id"];
        eval('var ' + varname + '= new Object()');
        eval(varname + '.text = new Object();');
        eval(varname + '.id = jModel[k]["id"];');
        eval(varname + '.text.name = jModel[k]["name"];');
        eval(varname + '.text.title = jModel[k]["title"];');
        if (jModel[k]["parent"] != null) {
            eval(varname + '.parent = jModel[k]["parent"];');
        }
        eval(varname + '.image = jModel[k]["image"];');
        if (k > 0) {
            eval(varname + '.stackChildren = true;');
        }
        eval('chart_config[k+offset] = ' + varname + ';');
    }
    for (j = 1; j < chart_config.length; j++) {
        if (chart_config[j]["parent"] != "null") {
            for (i = 1; i < chart_config.length; i++) {
                if (chart_config[j]["parent"] == chart_config[i]["id"]) {
                    chart_config[j]["parent"] = chart_config[i];
                }
            }
        }
    }
    Treant(chart_config);

});