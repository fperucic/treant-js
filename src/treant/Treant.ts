import "./Treant.css";
import { JSONconfig } from "./JSONConfig";
import { TreeStore } from "./TreeStore";
import { inject, injectable } from "inversify";
import { DI_LIST } from "./InjectableList";
import "reflect-metadata";

/**
 * Chart constructor.
 */
@injectable()
export class Treant {
  protected jsonConfigService: JSONconfig = new JSONconfig();
  jsonConfig: any[] = [];

  tree: any;

  constructor(
    @inject(DI_LIST.treeStore) public treeStore: TreeStore) { }

  destroy() {
    this.treeStore.destroy(this.tree.id);
  }

  init(
    jsonConfig: any,
    callback?: any,
    jQuery?: any
  ) {
    if (jsonConfig instanceof Array) {
      this.jsonConfig = this.jsonConfigService.make(jsonConfig);
    } else {
      this.jsonConfig = jsonConfig;
    }
    // optional
    if (jQuery) {
      $ = jQuery;
    }
    this.tree = this.treeStore.createTree(this.jsonConfig);
    this.tree.positionTree(callback);
  }
}
