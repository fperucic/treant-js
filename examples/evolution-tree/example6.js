var tree_structure = {
    chart: {
        container: "#OrganiseChart6",
        levelSeparation:    25,
        siblingSeparation:  70,
        subTeeSeparation:   70,
        nodeAlign: "BOTTOM",
        scrollbar: "fancy",
        padding: 35,
        node: { HTMLclass: "evolution-tree" },
        connectors: {
            type: "curve",
            style: {
                "stroke-width": 2,
                "stroke-linecap": "round",
                "stroke": "#ccc"
            }
        }
    },

    nodeStructure: {
        text: { name: "LIFE" },
        HTMLclass: "the-parent",
        children: [
            {
                text: { name: "true bacteria" },
                image: "img/truebacteria.png"
            },
            {
                pseudo: true,
                children: [
                    {
                        text: { name: "archea bacteria" },
                        image: "img/archaebacteria.png"
                    },
                    {
                        text: { name: "EUKARYOTES" },
                        HTMLclass: "the-parent",
                        children: [
                            {
                                text: { name: "protocists" },
                                image: "img/protoctis.png"
                            },
                            {
                                pseudo: true,
                                children: [
                                    {
                                        text: { name: "PLANTS" },
                                        HTMLclass: "the-parent",
                                        children: [
                                            {
                                                pseudo: true,
                                                children: [
                                                    {
                                                        pseudo: true,
                                                        children: [
                                                            {
                                                                pseudo: true,
                                                                children: [
                                                                    {
                                                                        text: { name: "flowering seed plants" },
                                                                        image: "img/cvijece2.png"
                                                                    },
                                                                    {
                                                                        text: { name: "non-flowering seed plants" },
                                                                        image: "img/ne_cvijece.png"
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                               text: { name: "ferns and fern allies" },
                                                                image: "img/ferns.png"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: { name: "mosses and allies" },
                                                        image: "img/mosses.png"
                                                    }
                                                ]
                                            },
                                            {
                                                text: { name: "green algae" },
                                                image: "img/greenalgae.png"
                                            }
                                        ]
                                    },
                                    {
                                        pseudo: true,
                                        children: [
                                            {
                                                text: { name: "fungi and lichens" },
                                                image: "img/fungi.png"
                                            },
                                            {
                                                text: { name: "ANIMALS" },
                                                HTMLclass: "the-parent",
                                                children: [
                                                    {
                                                        text: { name: "sponges" },
                                                        image: "img/spuzva.png"
                                                    },
                                                    {
                                                        pseudo: true,
                                                        children: [
                                                            {
                                                                text: { name: "cnidarians" },
                                                                image: "img/cnidarians.png"
                                                            },
                                                            {
                                                                pseudo: true,
                                                                childrenDropLevel: 1,
                                                                children: [
                                                                    {
                                                                        pseudo: true,
                                                                        children: [
                                                                            {
                                                                                text: { name: "echinoderms" },
                                                                                image: "img/zvezda.png"
                                                                            },
                                                                            {
                                                                                text: { name: "VERTEBRATES" },
                                                                                HTMLclass: "the-parent",
                                                                                children: [
                                                                                    {
                                                                                        text: { name: "cartilaginous fish" },
                                                                                        image: "img/cartilaginousfish.png"
                                                                                    },
                                                                                    {
                                                                                        text: { name: "bony fish" },
                                                                                        image: "img/bonyfish.png"
                                                                                    },
                                                                                    {
                                                                                        text: { name: "TETRAPODS" },
                                                                                        HTMLclass: "the-parent",
                                                                                        children: [
                                                                                            {
                                                                                                text: { name: "amphibians" },
                                                                                                image: "img/zaba.png"
                                                                                            },
                                                                                            {
                                                                                                text: { name: "AMNIOTES" },
                                                                                                HTMLclass: "the-parent",
                                                                                                children: [
                                                                                                    {
                                                                                                        pseudo: true,
                                                                                                        children: [
                                                                                                            {
                                                                                                                text: { name: "turtles" },
                                                                                                                image: "img/kornjaca.png"
                                                                                                            },
                                                                                                            {
                                                                                                                pseudo: true,
                                                                                                                children: [
                                                                                                                    {
                                                                                                                        text: { name: "snakes and lizards" },
                                                                                                                        image: "img/zmijurina.png"
                                                                                                                    },
                                                                                                                    {
                                                                                                                        text: { name: "crocodiles and birds" },
                                                                                                                        image: "img/ptica.png"
                                                                                                                    }
                                                                                                                ]
                                                                                                            }
                                                                                                        ]
                                                                                                    },
                                                                                                    {
                                                                                                        text: { name: "mammals" },
                                                                                                        image: "img/slon.png"
                                                                                                    }
                                                                                                ]
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        text: { name: "ARTHROPODS" },                                                                      
                                                                        HTMLclass: "the-parent",
                                                                        children: [
                                                                            {
                                                                                text: { name: "chelicerates" },
                                                                                image: "img/chelirates.png"
                                                                            },
                                                                            {
                                                                                pseudo: true,
                                                                                stackChildren: true,
                                                                                children: [
                                                                                    {
                                                                                        text: { name: "crustaceans" },
                                                                                        image: "img/rak.png"
                                                                                    },
                                                                                    {
                                                                                        text: { name: "insects and myriapods" },
                                                                                        image: "img/insekti.png"
                                                                                    }
                                                                                ]
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        pseudo: true,
                                                                        children: [
                                                                            {
                                                                                text: { name: "flatworms" },
                                                                                image: "img/flatare.png"
                                                                            },
                                                                            {
                                                                                text: { name: "lophophorates" },
                                                                                image: "img/lophoprates.png"
                                                                            }

                                                                        ]
                                                                    },
                                                                    {
                                                                        pseudo: true,
                                                                        childrenDropLevel: 1,
                                                                        stackChildren: true,
                                                                        children: [
                                                                            {
                                                                                text: { name: "rotifers" },
                                                                                image: "img/rotfiers.png"
                                                                            },
                                                                            {
                                                                                text: { name: "roundworms" },
                                                                                image: "img/roundworms.png"
                                                                            }
                                                                        ]
                                                                    },
                                                                    {
                                                                        pseudo: true,
                                                                        childrenDropLevel: 1,
                                                                        stackChildren: true,
                                                                        children: [
                                                                            {
                                                                                text: { name: "mollusks" },
                                                                                image: "img/mosculs.png"
                                                                            },
                                                                            {
                                                                                text: { name: "segmented worms" },
                                                                                image: "img/segmentedworms.png"
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
};