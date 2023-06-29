var config = {
        container: "#OrganiseChart1",
        rootOrientation:  'NORTH', // NORTH || EAST || WEST || SOUTH
        hideRootNode: true,
        // levelSeparation: 30,
        siblingSeparation:   40,
        subTeeSeparation:    30,
        
        connectors: {
            type: 'curve'
        },
        node: {
            HTMLclass: 'nodeExample1'
        }
    },
    root = {},

    cto = {
        parent: root,
        text:{
            name: "Joe Linux",
            title: "Board member",
            contact: "email: we@aregreat.com"
        },
        stackChildren: true,
        HTMLid: "coo"
    },
    cbo = {
        parent: root,
        stackChildren: true,
        text:{
            name: "Linda May",
            title: "Board member",
            contact: "email: we@aregreat.com"
        },
        HTMLid: "cbo"
    },
    cdo = {
        parent: root,
        text:{
            name: "John Green",
            title: "Board member, CEO",
            contact: "email: we@aregreat.com"
        },
        HTMLid: "cdo"
    },
    cio = {
        parent: cto,
        text:{
            name: "Ron Blomquist",
            title: "Chief Information Security Officer",
            contact: "email: we@aregreat.com"
        },
        HTMLid: "cio"
    },
    ciso = {
        parent: cto,
        text:{
            name: "Michael Rubin",
            title: "Chief Innovation Officer",
            contact: "email: we@aregreat.com"
        },
        HTMLid: "ciso"
    },
    cio2 = {
        parent: cdo,
        text:{
            name: "Erica Reel",
            title: "Chief Customer Officer",
            contact: "email: we@aregreat.com"
        },
        link: {
            href: "www.google.com"
        },
        HTMLid: "cio2"
    },
    ciso2 = {
        parent: cbo,
        text:{
            name: "Alice Lopez",
            title: "Chief Communications Officer",
            contact: "email: we@aregreat.com"
        },
        HTMLid: "ciso2"
    },
    ciso3 = {
        parent: cbo,
        text:{
            name: "Mary Johnson",
            title: "Chief Brand Officer",
            contact: "email: we@aregreat.com"
        },
        HTMLid: "ciso2"
    },
    ciso4 = {
        parent: cbo,
        text:{
            name: "Kirk Douglas",
            title: "Chief Business Development Officer",
            contact: "email: we@aregreat.com"
        },
        HTMLid: "ciso2"
    }

    ALTERNATIVE = [
        config,
        root,
        cto,
        cbo,
        cdo,
        cio,
        ciso,
        cio2,
        ciso2,
        ciso3,
        ciso4
    ];