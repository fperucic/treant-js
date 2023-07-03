import { Container } from "inversify";
import { ImageLoader } from "../treant/ImageLoader";
import { DI_LIST } from "../treant/InjectableList";
import { NodeDB, NodeDBState } from "../treant/NodeDB";
import { ChartConfigType, Treant } from "../treant/Treant";
import { Tree } from "../treant/Tree";
import { TreeNode } from "../treant/TreeNode";
import { TreeStore } from "../treant/TreeStore";
import { UTIL } from "../treant/Util";

export class GraphJS {
    private treant: Treant;
    private chartConfig: ChartConfigType;

    constructor(chartConfig: ChartConfigType) {
        const container = new Container();
        container.bind(DI_LIST.treeStore).to(TreeStore).inSingletonScope();
        container.bind(DI_LIST.util).to(UTIL).inSingletonScope();
        container.bind(DI_LIST.imageLoader).to(ImageLoader).inSingletonScope();
        container.bind(DI_LIST.nodeDB).to(NodeDB).inSingletonScope();
        container.bind(DI_LIST.nodeDBState).to(NodeDBState).inSingletonScope();
        container.bind(DI_LIST.treeNode).to(TreeNode);
        container.bind(DI_LIST.tree).to(Tree);
        container.bind(DI_LIST.treant).to(Treant);
        this.treant = container.get<Treant>(DI_LIST.treant);
        this.chartConfig = chartConfig;
    }

    draw() {
        this.treant.init(this.chartConfig);
    }
}