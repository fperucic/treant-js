var config = {
                container: "#mass",
                animateOnInit: true,
                node: {
                    collapsable: true
                },
                animation: {
                    nodeAnimation: "easeOutBounce",
                    nodeSpeed: 700,
                    connectorsAnimation: "bounce",
                    connectorsSpeed: 700
                }
            },
node0 = {text: {samples: '# Samples: 29', percentage: '% Samples: 100.0%', average: 'Average mass: 853.55', condition: 'method?'}},
node1 = {parent: node0, text: {filter: 'method is not Subtractive', samples: 'Samples: 10', percentage: 'Percent: 34.48', average: 'Average: 292.12', condition: 'lead_time?'}, folders: ['config_2_10', 'config_2_7', 'config_2_7', 'config_1_10', 'config_3_2', 'config_3_2', 'config_3_5', 'config_3_5', 'config_1_7', 'config_1_7']},
node2 = {parent: node1, text: {filter: 'lead_time <= 55585.5', samples: 'Samples: 8', percentage: 'Percent: 27.59', average: 'Average: 203.18', condition: 'lead_time?'}, folders: ['config_2_10', 'config_2_7', 'config_2_7', 'config_1_10', 'config_3_5', 'config_3_5', 'config_1_7', 'config_1_7']},
node3 = {parent: node2, text: {filter: 'lead_time <= 33879.0', samples: 'Samples: 6', percentage: 'Percent: 20.69', average: 'Average: 162.98', condition: 'cost?'}, folders: ['config_2_10', 'config_1_10', 'config_3_5', 'config_3_5', 'config_1_7', 'config_1_7']},
node4 = {parent: node3, text: {filter: 'cost <= 47450.0', samples: 'Samples: 4', percentage: 'Percent: 13.79', average: 'Average: 137.59', condition: 'compliance?'}, folders: ['config_2_10', 'config_1_10', 'config_3_5', 'config_3_5']},
node5 = {parent: node4, text: {filter: 'compliance <= 0.0', samples: 'Samples: 3', percentage: 'Percent: 10.34', average: 'Average: nan', condition: 'cost?'}, folders: []},
node6 = {parent: node5, text: {filter: 'Filter: cost <= 39800.0', samples: '# Samples: 1', percentage: '% Samples: 3.45', average: 'Average mass: nan'}, folders: []},
node7 = {parent: node5, text: {filter: 'Filter: cost > 39800.0', samples: '# Samples: 2', percentage: '% Samples: 6.9', average: 'Average mass: nan'}, folders: []},
node8 = {parent: node4, text: {filter: 'Filter: compliance > 0.0', samples: '# Samples: 1', percentage: '% Samples: 3.45', average: 'Average mass: 137.59'}, folders: ['config_2_10', 'config_1_10', 'config_3_5', 'config_3_5']},
node9 = {parent: node3, text: {filter: 'Filter: cost > 47450.0', samples: '# Samples: 2', percentage: '% Samples: 6.9', average: 'Average mass: 213.76'}, folders: ['config_1_7', 'config_1_7']},
node10 = {parent: node2, text: {filter: 'Filter: lead_time > 33879.0', samples: '# Samples: 2', percentage: '% Samples: 6.9', average: 'Average mass: 323.8'}, folders: ['config_2_7', 'config_2_7']},
node11 = {parent: node1, text: {filter: 'Filter: lead_time > 55585.5', samples: '# Samples: 2', percentage: '% Samples: 6.9', average: 'Average mass: 647.89'}, folders: ['config_3_2', 'config_3_2']},
node12 = {parent: node0, text: {filter: 'method is Subtractive', samples: 'Samples: 19', percentage: 'Percent: 65.52', average: 'Average: 1149.0357894736837', condition: 'cost?'}, folders: ['config_2_5', 'config_2_2', 'config_2_3', 'config_2_4', 'config_1_5', 'config_1_2', 'config_3_1', 'config_1_3', 'config_1_4', 'config_2_1', 'config_2_6', 'config_2_8', 'config_2_9', 'config_1_1', 'config_1_6', 'config_1_8', 'config_1_9', 'config_3_4', 'config_3_3']},
node13 = {parent: node12, text: {filter: 'cost <= 76750.0', samples: 'Samples: 14', percentage: 'Percent: 48.28', average: 'Average: 961.97', condition: 'compliance?'}, folders: ['config_2_5', 'config_2_2', 'config_2_4', 'config_1_5', 'config_1_2', 'config_3_1', 'config_1_4', 'config_2_1', 'config_2_8', 'config_1_1', 'config_1_6', 'config_1_8', 'config_3_4', 'config_3_3']},
node14 = {parent: node13, text: {filter: 'Filter: compliance <= 0.0', samples: '# Samples: 11', percentage: '% Samples: 37.93', average: 'Average mass: nan'}, folders: []},
node15 = {parent: node13, text: {filter: 'compliance > 0.0', samples: 'Samples: 3', percentage: 'Percent: 10.34', average: 'Average: 961.9748571428572', condition: 'compliance?'}, folders: ['config_2_5', 'config_2_2', 'config_2_4', 'config_1_5', 'config_1_2', 'config_3_1', 'config_1_4', 'config_2_1', 'config_2_8', 'config_1_1', 'config_1_6', 'config_1_8', 'config_3_4', 'config_3_3']},
node16 = {parent: node15, text: {filter: 'Filter: compliance <= 0.0', samples: '# Samples: 1', percentage: '% Samples: 3.45', average: 'Average mass: nan'}, folders: []},
node17 = {parent: node15, text: {filter: 'Filter: compliance > 0.0', samples: '# Samples: 2', percentage: '% Samples: 6.9', average: 'Average mass: 961.97'}, folders: ['config_2_5', 'config_2_2', 'config_2_4', 'config_1_5', 'config_1_2', 'config_3_1', 'config_1_4', 'config_2_1', 'config_2_8', 'config_1_1', 'config_1_6', 'config_1_8', 'config_3_4', 'config_3_3']},
node18 = {parent: node12, text: {filter: 'cost > 76750.0', samples: 'Samples: 5', percentage: 'Percent: 17.24', average: 'Average: 1672.8064', condition: 'machine_type?'}, folders: ['config_2_3', 'config_1_3', 'config_2_6', 'config_2_9', 'config_1_9']},
node19 = {parent: node18, text: {filter: 'Filter: machine_type is not 2Axis', samples: '# Samples: 3', percentage: '% Samples: 10.34', average: 'Average mass: 1814.53'}, folders: ['config_2_3', 'config_1_3', 'config_2_6']},
node20 = {parent: node18, text: {filter: 'machine_type is 2Axis', samples: 'Samples: 2', percentage: 'Percent: 6.9', average: 'Average: 1460.2240000000002', condition: 'lead_time?'}, folders: ['config_2_9', 'config_1_9']},
node21 = {parent: node20, text: {filter: 'Filter: lead_time <= 22604.0', samples: '# Samples: 1', percentage: '% Samples: 3.45', average: 'Average mass: 1814.53'}, folders: ['config_1_9']},
node22 = {parent: node20, text: {filter: 'Filter: lead_time > 22604.0', samples: '# Samples: 1', percentage: '% Samples: 3.45', average: 'Average mass: 1105.92'}, folders: ['config_2_9']},
chart_config = [config, node0, node1, node2, node3, node4, node5, node6, node7, node8, node9, node10, node11, node12, node13, node14, node15, node16, node17, node18, node19, node20, node21, node22];