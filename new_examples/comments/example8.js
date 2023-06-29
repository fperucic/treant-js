var config = {
        container: "#OrganiseChart8",
        levelSeparation:    70,
        siblingSeparation:  60,
        nodeAlign: "BOTTOM",
        connectors: {
            type: "step",
            style: {
                "stroke-width": 2,
                "stroke": "#ccc",
                "stroke-dasharray": "--", //"", "-", ".", "-.", "-..", ". ", "- ", "--", "- .", "--.", "--.."
                "arrow-end": "classic-wide-long"
            }
        }
    },

    first_post = {
        innerHTML: "#first-post"
    },

    first_reply = {
        parent: first_post,
        innerHTML: "#first-reply"
    },

    second_reply = {
        parent: first_post,
        innerHTML: "#second-reply"
    }

    second_reply_reply = {
        parent: second_reply,
        innerHTML: "#second-reply-reply"
    },

tree_structure = [
    config, first_post, first_reply, second_reply, second_reply_reply
];


/* ALTERNATIVE tree_structure CONFIG, same result as above

    var tree_structure = {
        chart: {
            container: "#OrganiseChart8",
            levelSeparation:    70,
            siblingSeparation:  60,
            nodeAlign: "BOTTOM",
            connectors: {
                type: "step",
                style: {
                    "stroke-width": 2,
                    "stroke": "#ccc",
                    "stroke-dasharray": "--",
                    "arrow-end": "classic-wide-long"
                }
            }
        },
        nodeStructure: {
            innerHTML: "#first-post",
            children: [
                {
                    innerHTML: "#first-reply"
                },
                {
                    innerHTML: "#second-reply",
                    children: [
                        {
                            innerHTML: "#second-reply-reply"
                        }
                    ]
                }
            ]
        }
    };

*/


