/**
 * NodeDB is used for storing the nodes. Each tree has its own NodeDB.
 * @param {object} nodeStructure
 * @param {Tree} tree
 * @constructor
 */

import { TreeNode } from "./TreeNode";
import { UTIL } from "./Util";

export class NodeDB {
  protected util: UTIL = new UTIL();
  db: any;

  constructor(nodeStructure: any, tree: any) {
    this.reset(nodeStructure, tree);
  }

  /**
   * @param {object} node
   * @param {number} parentId
   */
  private iterateChildren(node: any, parentId: number, tree?: any) {
    var newNode = this.createNode(node, parentId, tree, null);

    if (node.children) {
      // pseudo node is used for descending children to the next level
      if (node.childrenDropLevel && node.childrenDropLevel > 0) {
        while (node.childrenDropLevel--) {
          // pseudo node needs to inherit the connection style from its parent for continuous connectors
          var connStyle = this.util.cloneObj(newNode.connStyle);
          newNode = this.createNode("pseudo", newNode.id, tree, null);
          newNode.connStyle = connStyle;
          newNode.children = [];
        }
      }

      var stack =
        node.stackChildren && !this.hasGrandChildren(node) ? newNode.id : null;

      // children are positioned on separate levels, one beneath the other
      if (stack !== null) {
        newNode.stackChildren = [];
      }

      for (var i = 0, len = node.children.length; i < len; i++) {
        if (stack !== null) {
          console.log('createNode');
          newNode = this.createNode(node.children[i], newNode.id, tree, stack);
          if (i + 1 < len) {
            // last node cant have children
            newNode.children = [];
          }
        } else {          
          console.log('iterateChildren');
          console.log(node.children);
          this.iterateChildren(node.children[i], newNode.id, tree);
        }
      }
    }
  }

  /**
   * @param {object} nodeStructure
   * @param {Tree} tree
   * @returns {NodeDB}
   */
  reset(nodeStructure: any, tree: any) {
    this.db = [];

    var self = this;

    if (tree.CONFIG.animateOnInit) {
      nodeStructure.collapsed = true;
    }
    console.log(tree);

    this.iterateChildren(nodeStructure, -1, tree); // root node

    // this.createGeometries(tree);

    return this;
  }

  /**
   * @param {Tree} tree
   * @returns {NodeDB}
   */
  createGeometries(tree: any) {
    var i = this.db.length;

    while (i--) {
      this.get(i).createGeometry(tree);
    }
    return this;
  }

  /**
   * @param {number} nodeId
   * @returns {TreeNode}
   */
  get(nodeId: number) {
    return this.db[nodeId]; // get TreeNode by ID
  }

  /**
   * @param {function} callback
   * @returns {NodeDB}
   */
  walk(callback: any) {
    var i = this.db.length;

    while (i--) {
      callback.apply(this, [this.get(i)]);
    }
    return this;
  }

  /**
   *
   * @param {object} nodeStructure
   * @param {number} parentId
   * @param {Tree} tree
   * @param {number} stackParentId
   * @returns {TreeNode}
   */
  createNode(
    nodeStructure: any,
    parentId: number,
    tree: any,
    stackParentId: number | null
  ) {
    var node = new TreeNode(
      nodeStructure,
      this.db.length,
      parentId,
      tree,
      stackParentId
    );

    this.db.push(node);

    // skip root node (0)
    if (parentId >= 0) {
      var parent = this.get(parentId);

      // todo: refactor into separate private method
      if (nodeStructure.position) {
        if (nodeStructure.position === "left") {
          parent.children.push(node.id);
        } else if (nodeStructure.position === "right") {
          parent.children.splice(0, 0, node.id);
        } else if (nodeStructure.position === "center") {
          parent.children.splice(
            Math.floor(parent.children.length / 2),
            0,
            node.id
          );
        } else {
          // edge case when there's only 1 child
          var position = parseInt(nodeStructure.position);
          if (parent.children.length === 1 && position > 0) {
            parent.children.splice(0, 0, node.id);
          } else {
            parent.children.splice(
              Math.max(position, parent.children.length - 1),
              0,
              node.id
            );
          }
        }
      } else {
        parent.children.push(node.id);
      }
    }

    if (stackParentId) {
      this.get(stackParentId).stackParent = true;
      this.get(stackParentId).stackChildren.push(node.id);
    }

    return node;
  }

  getMinMaxCoord(dim: any, parent: any, MinMax: any) {
    // used for getting the dimensions of the tree, dim = 'X' || 'Y'
    // looks for min and max (X and Y) within the set of nodes
    parent = parent || this.get(0);

    MinMax = MinMax || {
      // start with root node dimensions
      min: parent[dim],
      max: parent[dim] + (dim === "X" ? parent.width : parent.height),
    };

    var i = parent.childrenCount();

    while (i--) {
      var node = parent.childAt(i),
        maxTest = node[dim] + (dim === "X" ? node.width : node.height),
        minTest = node[dim];

      if (maxTest > MinMax.max) {
        MinMax.max = maxTest;
      }
      if (minTest < MinMax.min) {
        MinMax.min = minTest;
      }

      this.getMinMaxCoord(dim, node, MinMax);
    }
    return MinMax;
  }

  /**
   * @param {object} nodeStructure
   * @returns {boolean}
   */
  hasGrandChildren(nodeStructure: any) {
    var i = nodeStructure.children.length;
    while (i--) {
      if (
        nodeStructure.children[i].children &&
        nodeStructure.children[i].children.length > 0
      ) {
        return true;
      }
    }
    return false;
  }
}
