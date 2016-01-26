interface Chart {
    container: string;
    rootOrientation?: RootOrientationType;
    nodeAlign?: NodeAlignType;
    levelSeparation?: number;
    siblingSeparation?: number;
    subTeeSeparation?: number;
    hideRootNode?: boolean;
    animateOnInit?: boolean;
    animateOnInitDelay?: number;
    scrollbar?: ScrollbarType;
    padding?: number;
    connectors?: {
        type: string;
        style: any;
        stackIndent: number;
    };
    node?: {
        HTMLclass: string;
        drawLineThrough: boolean;
        collapsable: boolean;
        link: any;
    };
    animation?: {
        nodeSpeed: number;
        nodeAnimation: string;
        connectorsSpeed: number;
        connectorsAnimation: string;
    };
}

declare enum RootOrientationType {
    NORTH,
    EAST,
    WEST,
    SOUTH
}

declare enum NodeAlignType {
    CENTER,
    TOP,
    BOTTOM
}

declare enum ScrollbarType {
    native,
    fancy,
    NONE
}

interface NodeStructure {
    text?: {
        name?: string | any;
        title?: string | any;
        desc?: string | any;
        contact?: string | any;
    };
    link?: any;
    image?: string;
    innerHTML?: string;
    childrenDropLevel?: number;
    pseudo?: boolean;
    connectors?: any;
    collapsable?: boolean;
    collapsed?: boolean;
    HTMLclass?: string;
    HTMLid?: string;
    stackChildren?: boolean;
    drawLineThrough?: boolean;
    children?: NodeStructure[];
}

interface treantConfig {
    chart: Chart;
    nodeStructure: NodeStructure;
}

interface Treant_Instance { }

interface TreantFactory {
    new (jsonConfig: treantConfig, callback: () => void): Treant_Instance;
}

declare var Treant: TreantFactory;