import "./Treant.css";
import { JSONconfig } from "./JSONConfig";
import { TreeStore } from "./TreeStore";
import { inject, injectable } from "inversify";
import { DI_LIST } from "./InjectableList";
import "reflect-metadata";
import { Tree } from "./Tree";
import { NodeDB } from "./NodeDB";

export enum callbackFunction {
  onCreateNode,
  onCreateNodeCollapseSwitch,
  onAfterAddNode,
  onBeforeAddNode,
  onAfterPositionNode,
  onBeforePositionNode,
  onToggleCollapseFinished,
  onAfterClickCollapseSwitch,
  onBeforeClickCollapseSwitch,
  onTreeLoaded
}

export type rootOrientationType = 'NORTH' | 'EAST' | 'WEST' | 'SOUTH';

export type nodeAlignType = 'CENTER' | 'TOP' | 'BOTTOM';

export type scrollbarType = 'native' | 'fancy' | 'None';

export type connectorType = { type: 'curve' | 'bCurve' | 'step' | 'straight', style: { [key: string]: number }, stackIndent: number };

export type nodeType = { HTMLclass: string, drawLineThrough: boolean, collapsable: boolean, link: { target: '_self' } };

export type animationType = {
  nodeSpeed: number,
  connectorsSpeed: number,
  connectorsAnimation: string
};

export interface ChartInterface {
  container: string;
  callback: { [key in callbackFunction]: () => void };
  rootOrientation: rootOrientationType;
  nodeAlign: nodeAlignType;
  levelSeparation: number;
  siblingSeparation: number;
  subTeeSeparation: number;
  hideRootNode: boolean;
  animateOnInit: boolean;
  animateOnInitDelay: number;
  scrollbar: scrollbarType;
  padding: number;
  connectors: Partial<connectorType>;
  node: Partial<nodeType>;
  animation: animationType;
}

export type nodeText = {
  name: string | Record<string, string>;
  title: string | Record<string, string>;
  desc: string | Record<string, string>;
  contact: string | Record<string, string>;
  data: string;
};

export type nodeLink = {
  href: string,
  target: string
};

export interface NodeInterface {
  text: Partial<nodeText>,
  link: Partial<nodeLink>,
  image: string;
  innerHTML: string;
  childrenDropLevel: number;
  pseudo: boolean;
  connectors: connectorType;
  collapsable: boolean;
  collapsed: boolean;
  HTMLclass: string;
  HTMLid: string;
  stackChildren: boolean;
  drawLineThrough: boolean;
  children?: Partial<NodeInterface>[];
}

export type ChartStructure = {
  chart: Partial<ChartInterface>,
  nodeStructure: Partial<NodeInterface>;
}

export type ChartConfigType = Array<Partial<ChartInterface> | Partial<NodeInterface>> | ChartStructure;

/**
 * Chart constructor.
 */
@injectable()
export class Treant {
  protected jsonConfigService: JSONconfig = new JSONconfig();
  jsonConfig: ChartConfigType;

  tree: Promise<Tree> | null = null;

  constructor(
    @inject(DI_LIST.treeStore) public treeStore: TreeStore,
    @inject(DI_LIST.nodeDB) public nodeDB: NodeDB) { }

  destroy() {
    this.tree.then((tree) =>
      this.treeStore.destroy(tree.id)
    );
  }

  init(
    jsonConfig: ChartConfigType,
    callback?: any,
    jQuery?: any
  ) {
    console.log('jsonConfig instanceof Array');
    console.log(jsonConfig instanceof Array);
    if (jsonConfig instanceof Array) {
      this.jsonConfig = this.jsonConfigService.make(jsonConfig);
    } else {
      this.jsonConfig = jsonConfig;
    }
    // optional
    if (jQuery) {
      $ = jQuery;
    }
    this.tree = new Promise((resolve, reject) =>
      setTimeout(() => resolve(this.treeStore.createTree(this.jsonConfig)), 200)
    );
    Promise.all([this.tree, this.nodeDB.nodeDBState.dbReady]).then(
      ([tree, dbReady]) => {
        if (dbReady) {
          tree.positionTree(callback);
        }
      }
    );
  }
}
