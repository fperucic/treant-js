
// img_examples/example4
var example1 = {
	chart: {
		container: "#OrganiseChart1",
		levelSeparation:	25,
		siblingSeparation:	15,
		subTeeSeparation:	15
	},
	
	nodeStructure: {
		text: {
			name: "C1"
		},
		children: [
			{	

				text:{
					name:  "c1_C1"
				},
				stackChildren: true,
				pseudo: true,
				children: [
					{
						text:{
							name: "c2_C1C1"
						},
						link: {
							href: "http://www.google.com"
							// target defaults to "_self"
						}
					},
					{
						innerHTML: "<ul> \
							<li> test </li> \
							<li> test </li> \
						</ul><img src='slika-manja.jpg' />"
					},
					{	
						link: {
							href: "http://www.google.com",
							target: "_blank"
						},
						text:{
							name: "c3_C1C1"
						}
					},
					{	
						link: {
							href: "http://www.google.com",
							target: "_blank"
						},
						text:{
							name: "c3_C1C1"
						}
					}
				]
			},
			{
				text:{
					name: "c2_C1"
				},
				connectors: {

					type: 'step',
					style: {
						'stroke': 'white',
						'arrow-end': 'block-wide-long',
						'arrow-start': 'block-wide-long',
						'stroke-width': 2
					}
				},
				children: [
					{
						HTMLclass: 'cyan',
						text: {
							name: "c1_C2C1"
						},
						connectors: {

							type: 'curve',
							style: {
								'stroke': 'white',
								'arrow-end': 'block-wide-long',
								'stroke-width': 2
							}
						},
						children: [
							{
								text:{
									name: "c1_C1C2C1"
								}
							},
							{
								text:{
									name: "c2_C1C2C1"
								}
							},
							{
								text:{
									name: "c3_C1C2C1"
								}
							}
								
						]
					}
				]
			},
			{
				text:{
					name: "c3_C1"
				},
				children: [
					{
						text:{
							name: "c1_C3C1"
						},
						HTMLid: "NodeID"
					},
					{
						text:{
							name: "c2_C3C1"
						}
					}
				]
			}
		]
	}
};


var example1b = {
	chart: {
		container: "#OrganiseChart1"
		// nodeAlign: "BOTTOM"
	},
	
	nodeStructure: {
		text: {
			name: "C1"
		},
		children: [
			{
				text:{
					name: "c2_C1"
				},
				connectors: {

					type: 'step',
					style: {
						'stroke': 'white',
						'arrow-end': 'block-wide-long',
						'arrow-start': 'block-wide-long',
						'stroke-width': 2
					}
				},
				children: [
					{
						HTMLclass: 'cyan',
						text: {
							name: "c1_C2C1"
						},
						connectors: {

							type: 'curve',
							style: {
								'stroke': 'white',
								'arrow-end': 'block-wide-long',
								'stroke-width': 2
							}
						},
						children: [
							{
								text:{
									name: "c1_C1C2C1"
								}
							},
							{
								text:{
									name: "c2_C1C2C1"
								}
							},
							{
								text:{
									name: "c3_C1C2C1"
								},
								stackChildren: true,
								children: [
								{
									text:{
										name: "c1_C1C2C1"
								}
							},
							{
								text:{
									name: "c2_C1C2C1"
								}
							}
								]
							}
								
						]
					}
				]
			},
			{	
				text:{
					name:  "c1_C1"
				},
				children: [
					{

						text:{
							name:  "c1_C1"
						},
						children: [
							{
								text:{
								name:  "c1_C1"
								},
								stackChildren: true,
								children: [

									{
										text:{
											name: "c2_C1C1"
										},
										link: {
											href: "http://www.google.com"
											// target defaults to "_self"
										}
									},
									{
										innerHTML: "<ul> \
											<li> test </li> \
											<li> test </li> \
										</ul><img src='slika-manja.jpg' />"
									},
									{	
										link: {
											href: "http://www.google.com",
											target: "_blank"
										},
										text:{
											name: "c3_C1C1"
										}
									},
									{	
										link: {
											href: "http://www.google.com",
											target: "_blank"
										},
										text:{
											name: "c3_C1C1"
										}
									}
								]
							}
						]
					}
				]
			},
			{
				text:{
					name: "c3_C1"
				},
				children: [
					{
						text:{
							name: "c1_C3C1"
						},
						HTMLid: "NodeID"
					},
					{
						text:{
							name: "c2_C3C1"
						}
					}
				]
			}
		]
	}
};

// #####################################
// ########### ALTERNATIVE CONFIG ######
// #####################################

var config = {
		container: "#OrganiseChart5"
		//rootOrientation:	'NORTH', // NORTH || EAST || WEST || SOUTH
		// levelSeparation:	30,
		// siblingSeparation:	30,
		// subTeeSeparation:	30,
	},
	rootNode = {
		text: {
			name: "C1"
		}
	},

	node11 = {
		parent: rootNode,
		text:{
			name:  "c1_C1"
		},
		stackChildren: true
	},
	node12 = {
		parent: rootNode,
		text:{
			name:  "c1_C2"
		},
		childrenDropLevel: 1
	},
	node13 = {
		parent: rootNode,
		text:{
			name:  "c1_C3"
		}
		// stackChildren: true,
	},

	node111 = {
		parent: node11,
		innerHTML: "<ul> \
			<li> test </li> \
			<li> test </li> \
		</ul>"
	},
	node112 = {
		parent: node11,
		text:{
			name: "c2_C1C1"
		},
		link: {
			href: "http://www.google.com"
			// target defaults to "_self"
		}
	},
	node113 = {
		parent: node11,
		link: {
			href: "http://www.google.com",
			target: "_blank"
		},
		text:{
			name: "c3_C1C1",
			HTMLclass: 'extra-title'
		}
	},

	node121 = {
		parent: node12,
		HTMLclass: 'cyan',
		text: {
			name: "c1_C2C1"
		},
		stackChildren: true,
		connectors: {
	
			type: 'curve',
			style: {
				'stroke': 'white',
				'arrow-end': 'block-wide-long',
				'stroke-width': 2
			}
		}
	},

	node131 = {
		parent: node13,
		text:{
			name: "c1_C3C1"
		},
		HTMLid: "NodeID"
	},
	node132 = {
		parent: node13,
		text:{
			name: "c2_C3C1"
		}
	},

	node1211 = {
		parent: node121,
		image: "image.png",
		text:{
			name: "c1_C1C2C1 jos malo textaaaaa"
		}
	},
	node1212 = {
		parent: node121,
		text:{
			name: "c2_C1C2C1"
		}
	},
	node1213 = {
		parent: node121,
		text:{
			name: "c3_C1C2C1"
		}
	},

	ALTERNATIVE = [
		config,
		rootNode,
		node11,
		node12,
		node13,
		node111,
		node112,
		node113,
		node121,
		node131,
		node132,
		node1211,
		node1212,
		node1213
	];
