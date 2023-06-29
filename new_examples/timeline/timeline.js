
var simple_chart_config = {
	chart: {
		container: "#OrganiseChart-simple",
		hideRootNode: true,
		connectors: {
			type: 'step',
			style: {
				"arrow-end": "classic-wide-long",
				"stroke-width": 2,
				"stroke": "#665B57"
			}
		},
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
	
	nodeStructure: {
		text: { name: "Parent node" },
		children: [
			{	
				HTMLclass: "timeline main-date",
				text: { desc: "", name: "01.01.2014" },
				children: [
					{
						text: { name: "Event 1" },
					},
					{
						text: { name: "Event 2" }
					}
				]
			},
			{	
				HTMLclass: "main-date",
				text: { name: "12.02.2014" },
				collapsed: true,
				children: [
					{
						text: { name: "Event 1" }
					},
					{
						text: { name: "Event 2" }
					}
				]
			},
			{
				HTMLclass: "main-date",
				text: { name: "23.02.2014" },
				children: [
					{
						text: { name: "Event 1" }
					},
					{
						text: { name: "Event 2" }
					}
				]
			},
			{
				HTMLclass: "main-date",
				text: { name: "03.06.2014" }
			}
		]
	}
};
