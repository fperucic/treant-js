var config = {
        container: "#custom-colored",

        nodeAlign: "BOTTOM",
        
        connectors: {
            type: 'step'
        },
        node: {
            HTMLclass: 'nodeExample1'
        }
    },
    ceo = {
        text: {
            name: "Mark Hill",
            title: "Chief executive officer",
            contact: "Tel: 01 213 123 134",
        },
        image: "../headshots/2.jpg"
    },

    cto = {
        parent: ceo,
        HTMLclass: 'light-gray',
        text:{
            name: "Joe Linux",
            title: "Chief Technology Officer",
        },
        image: "../headshots/1.jpg"
    },
    cbo = {
        parent: ceo,
        childrenDropLevel: 2,
        HTMLclass: 'blue',
        text:{
            name: "Linda May",
            title: "Chief Business Officer",
        },
        image: "../headshots/5.jpg"
    },
    cdo = {
        parent: ceo,
        HTMLclass: 'gray',
        text:{
            name: "John Green",
            title: "Chief accounting officer",
            contact: "Tel: 01 213 123 134",
        },
        image: "../headshots/6.jpg"
    },
    cio = {
        parent: cto,
        HTMLclass: 'light-gray',
        text:{
            name: "Ron Blomquist",
            title: "Chief Information Security Officer"
        },
        image: "../headshots/8.jpg"
    },
    ciso = {
        parent: cto,
        HTMLclass: 'light-gray',
        text:{
            name: "Michael Rubin",
            title: "Chief Innovation Officer",
            contact: "we@aregreat.com"
        },
        image: "../headshots/9.jpg"
    },
    cio2 = {
        parent: cdo,
        HTMLclass: 'gray',
        text:{
            name: "Erica Reel",
            title: "Chief Customer Officer"
        },
        link: {
            href: "http://www.google.com"
        },
        image: "../headshots/10.jpg"
    },
    ciso2 = {
        parent: cbo,
        HTMLclass: 'blue',
        text:{
            name: "Alice Lopez",
            title: "Chief Communications Officer"
        },
        image: "../headshots/7.jpg"
    },
    ciso3 = {
        parent: cbo,
        HTMLclass: 'blue',
        text:{
            name: "Mary Johnson",
            title: "Chief Brand Officer"
        },
        image: "../headshots/4.jpg"
    },
    ciso4 = {
        parent: cbo,
        HTMLclass: 'blue',
        text:{
            name: "Kirk Douglas",
            title: "Chief Business Development Officer"
        },
        image: "../headshots/11.jpg"
    },

    chart_config = [
        config,
        ceo,cto,cbo,
        cdo,cio,ciso,
        cio2,ciso2,ciso3,ciso4
    ];

    // Another approach, same result
    // JSON approach

/*
    var chart_config = {
        chart: {
            container: "#custom-colored",

            nodeAlign: "BOTTOM",

            connectors: {
                type: 'step'
            },
            node: {
                HTMLclass: 'nodeExample1'
            }
        },
        nodeStructure: {
            text: {
                name: "Mark Hill",
                title: "Chief executive officer",
                contact: "Tel: 01 213 123 134",
            },
            image: "../headshots/2.jpg",
            children: [
                {   
                    text:{
                        name: "Joe Linux",
                        title: "Chief Technology Officer",
                    },
                    image: "../headshots/1.jpg",
                    HTMLclass: 'light-gray',
                    children: [
                        {
                            text:{
                                name: "Ron Blomquist",
                                title: "Chief Information Security Officer"
                            },
                            HTMLclass: 'light-gray',
                            image: "../headshots/8.jpg"
                        },
                        {
                            text:{
                                name: "Michael Rubin",
                                title: "Chief Innovation Officer",
                                contact: "we@aregreat.com"
                            },
                            HTMLclass: 'light-gray',
                            image: "../headshots/9.jpg"
                        }
                    ]
                },
                {
                    childrenDropLevel: 2,
                    text:{
                        name: "Linda May",
                        title: "Chief Business Officer",
                    },
                    HTMLclass: 'blue',
                    image: "../headshots/5.jpg",
                    children: [
                        {
                            text:{
                                name: "Alice Lopez",
                                title: "Chief Communications Officer"
                            },
                            HTMLclass: 'blue',
                            image: "../headshots/7.jpg"
                        },
                        {
                            text:{
                                name: "Mary Johnson",
                                title: "Chief Brand Officer"
                            },
                            HTMLclass: 'blue',
                            image: "../headshots/4.jpg"
                        },
                        {
                            text:{
                                name: "Kirk Douglas",
                                title: "Chief Business Development Officer"
                            },
                            HTMLclass: 'blue',
                            image: "../headshots/11.jpg"
                        }
                    ]
                },
                {
                    text:{
                        name: "John Green",
                        title: "Chief accounting officer",
                        contact: "Tel: 01 213 123 134",
                    },
                    HTMLclass: 'gray',
                    image: "../headshots/6.jpg",
                    children: [
                        {
                            text:{
                                name: "Erica Reel",
                                title: "Chief Customer Officer"
                            },
                            link: {
                                href: "http://www.google.com"
                            },
                            HTMLclass: 'gray',
                            image: "../headshots/10.jpg"
                        }
                    ]
                }
            ]
        }
    };

*/