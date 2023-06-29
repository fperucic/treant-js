import "./Treant.css";
import { JSONconfig } from "./JSONConfig";
import { TreeStore } from "./TreeStore";

/**
 * Chart constructor.
 */
export class Treant {  
  protected jsonConfigService: JSONconfig = new JSONconfig();
  protected treeStore: TreeStore = new TreeStore();

  tree: any;

  constructor(
    jsonConfig: any,
    callback?: any,
    jQuery?: any
  ) {
    if (jsonConfig instanceof Array) {
      jsonConfig = this.jsonConfigService.make(jsonConfig);
    }

    // optional
    // if (jQuery) {
    //   $ = jQuery;
    // }

    this.tree = this.treeStore.createTree(jsonConfig);
    this.tree.positionTree(callback);
  }

  destroy() {
    this.treeStore.destroy(this.tree.id);
  }
}
