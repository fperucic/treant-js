import { Tree } from "./Tree";

/**
 * Class: TreeStore
 * TreeStore is used for holding initialized Tree objects
 *  Its purpose is to avoid global variables and enable multiple Trees on the page.
 */
export class TreeStore {
  store: any[] = [];

  /**
   * @param {object} jsonConfig
   * @returns {Tree}
   */
  createTree(jsonConfig: any) {
    var nNewTreeId = this.store.length;
    this.store.push(new Tree(jsonConfig, nNewTreeId));
    return this.get(nNewTreeId);
  }

  /**
   * @param {number} treeId
   * @returns {Tree}
   */
  get(treeId: number) {
    return this.store[treeId];
  }

  /**
   * @param {number} treeId
   * @returns {TreeStore}
   */
  destroy(treeId: number) {
    var tree = this.get(treeId);
    if (tree) {
      tree._R.remove();
      var draw_area = tree.drawArea;

      while (draw_area.firstChild) {
        draw_area.removeChild(draw_area.firstChild);
      }

      var classes = draw_area.className.split(" "),
        classes_to_stay = [];

      for (var i = 0; i < classes.length; i++) {
        var cls = classes[i];
        if (cls !== "Treant" && cls !== "Treant-loaded") {
          classes_to_stay.push(cls);
        }
      }
      draw_area.style.overflowY = "";
      draw_area.style.overflowX = "";
      draw_area.className = classes_to_stay.join(" ");

      this.store[treeId] = null;
    }
    return this;
  }
}
