 var json_data = [
    {
        "id": "ceo",
        "name": "Mark Hill",
        "title": "Chief executive officer",
        "contact": "Tel: 01 213 123 134",
        "image": "../headshots/2.jpg"
    },
    {
        "id": "cto",
        "parent": "ceo",
        "name": "Joe Linux",
        "title": "Chief Technology Officer",
        "image": "../headshots/1.jpg"
    },
    {
        "id": "cbo",
        "parent": "ceo",
        "name": "Linda May",
        "title": "Chief Business Officer",
        "image": "../headshots/5.jpg"
    },
    {
        "id": "cdo",
        "parent": "ceo",
        "name": "John Green",
        "title": "Chief accounting officer",
        "image": "../headshots/6.jpg"
    },
    {
        "id": "ciso",
        "parent": "cto",
        "name": "Michael Rubin",
        "title": "Chief Innovation Officer",
        "image": "../headshots/9.jpg"
    },
    {
        "id": "ciso2",
        "parent": "cbo",
        "name": "Alice Lopez",
        "title": "Chief Communications Officer",
        "image": "../headshots/7.jpg"
    },
    {
        "id": "cio2",
        "parent": "cdo",
        "name": "Erica Reel",
        "title": "Chief Customer Officer",
        "image": "../headshots/10.jpg"
    },
    {
        "id": "ciso3",
        "parent": "cbo",
        "name": "Mary Johnson",
        "title": "Chief Brand Officer",
        "image": "../headshots/4.jpg"
    },
    {
        "id": "ciso4",
        "parent": "cbo",
        "name": "Kirk Douglas",
        "title": "Chief Business Development Officer",
        "image": "../headshots/11.jpg"
    }
];
var config = {
    container: "#data-dynamically-example",

    connectors: {
        type: 'step'
    },
    node: {
        HTMLclass: 'nodeExample1'
    }
}

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
    if (k>0){
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