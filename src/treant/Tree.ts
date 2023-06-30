import { ImageLoader } from "./ImageLoader";
import { NodeDB } from "./NodeDB";
import { UTIL } from "./Util";
import Raphael from "../../vendor/raphael.no-deps";

/**
 * Tree constructor.
 * @param {object} jsonConfig
 * @param {number} treeId
 * @constructor
 */
export class Tree {
  protected util: UTIL = new UTIL();
  protected imageLoader: ImageLoader = new ImageLoader();

  initJsonConfig: any;
  initTreeId: number = 0;
  id: number = 0;
  drawArea: any;
  nodeDB: any;
  connectionStore: any;
  loaded: boolean = false;
  _R: any;
  lastNodeOnLevel: any;
  levelMaxDim: any;
  CONFIG: any = {
    maxDepth: 100,
    rootOrientation: "NORTH", // NORTH || EAST || WEST || SOUTH
    nodeAlign: "CENTER", // CENTER || TOP || BOTTOM
    levelSeparation: 30,
    siblingSeparation: 30,
    subTeeSeparation: 30,

    hideRootNode: false,

    animateOnInit: false,
    animateOnInitDelay: 500,

    padding: 15, // the difference is seen only when the scrollbar is shown
    scrollbar: "native", // "native" || "fancy" || "None" (PS: "fancy" requires jquery and perfect-scrollbar)

    connectors: {
      type: "curve", // 'curve' || 'step' || 'straight' || 'bCurve'
      style: {
        stroke: "black",
      },
      stackIndent: 15,
    },

    node: {
      // each node inherits this, it can all be overridden in node config

      // HTMLclass: 'node',
      // drawLineThrough: false,
      // collapsable: false,
      link: {
        target: "_self",
      },
    },

    animation: {
      // each node inherits this, it can all be overridden in node config
      nodeSpeed: 450,
      nodeAnimation: "linear",
      connectorsSpeed: 450,
      connectorsAnimation: "linear",
    },

    callback: {
      onCreateNode: function (treeNode: any, treeNodeDom: any) {}, // this = Tree
      onCreateNodeCollapseSwitch: function (
        treeNode: any,
        treeNodeDom: any,
        switchDom: any
      ) {}, // this = Tree
      onAfterAddNode: function (
        newTreeNode: any,
        parentTreeNode: any,
        nodeStructure: any
      ) {}, // this = Tree
      onBeforeAddNode: function (parentTreeNode: any, nodeStructure: any) {}, // this = Tree
      onAfterPositionNode: function (
        treeNode: any,
        nodeDbIndex: any,
        containerCenter: any,
        treeCenter: any
      ) {}, // this = Tree
      onBeforePositionNode: function (
        treeNode: any,
        nodeDbIndex: any,
        containerCenter: any,
        treeCenter: any
      ) {}, // this = Tree
      onToggleCollapseFinished: function (treeNode: any, bIsCollapsed: any) {}, // this = Tree
      onAfterClickCollapseSwitch: function (nodeSwitch: any, event: any) {}, // this = TreeNode
      onBeforeClickCollapseSwitch: function (nodeSwitch: any, event: any) {}, // this = TreeNode
      onTreeLoaded: function (rootTreeNode: any) {}, // this = Tree
    },
  };

  constructor(jsonConfig: any, treeId: number) {
    this.reset(jsonConfig, treeId);
  }

  /**
   * @param {object} jsonConfig
   * @param {number} treeId
   * @returns {Tree}
   */
  reset(jsonConfig: any, treeId: number) {
    this.initJsonConfig = jsonConfig;
    this.initTreeId = treeId;

    this.id = treeId;

    this.CONFIG = this.util.extend(this.CONFIG, jsonConfig.chart);
    this.drawArea = this.util.findEl(this.CONFIG.container, true);
    if (!this.drawArea) {
      throw new Error(
        'Failed to find element by selector "' + this.CONFIG.container + '"'
      );
    }

    this.util.addClass(this.drawArea, "Treant");

    // kill of any child elements that may be there
    this.drawArea.innerHTML = "";

    this.nodeDB = new NodeDB(jsonConfig.nodeStructure, this);

    // key store for storing reference to node connectors,
    // key = nodeId where the connector ends
    this.connectionStore = {};

    this.loaded = false;

    this._R = Raphael(this.drawArea, 100, 100);

    return this;
  }

  /**
   * @returns {Tree}
   */
  reload() {
    this.reset(this.initJsonConfig, this.initTreeId).redraw();
    return this;
  }

  /**
   * @returns {NodeDB}
   */
  getNodeDb() {
    return this.nodeDB;
  }

  /**
   * @param {TreeNode} parentTreeNode
   * @param {object} nodeDefinition
   * @returns {TreeNode}
   */
  addNode(parentTreeNode: any, nodeDefinition: any) {
    this.CONFIG.callback.onBeforeAddNode.apply(this, [
      parentTreeNode,
      nodeDefinition,
    ]);

    const oNewNode: any = this.nodeDB.createNode(
      nodeDefinition,
      parentTreeNode.id,
      this
    );
    oNewNode.createGeometry(this);

    // oNewNode.parent().createSwitchGeometry( this );

    this.positionTree();

    this.CONFIG.callback.onAfterAddNode.apply(this, [
      oNewNode,
      parentTreeNode,
      nodeDefinition,
    ]);

    return oNewNode;
  }

  /**
   * @returns {Tree}
   */
  redraw() {
    this.positionTree();
    return this;
  }

  /**
   * @param {function} callback
   * @returns {Tree}
   */
  positionTree(callback?: any) {
    var self = this;

    if (this.imageLoader.isNotLoading()) {
      var root = this.root();

      this.resetLevelData();

      this.firstWalk(root, 0);
      this.secondWalk(root, 0, 0, 0);

      this.positionNodes();

      if (this.CONFIG.animateOnInit) {
        setTimeout(function () {
          root.toggleCollapse();
        }, this.CONFIG.animateOnInitDelay);
      }

      if (!this.loaded) {
        this.util.addClass(this.drawArea, "Treant-loaded"); // nodes are hidden until .loaded class is added
        if (Object.prototype.toString.call(callback) === "[object Function]") {
          callback(self);
        }
        self.CONFIG.callback.onTreeLoaded.apply(self, [root]);
        this.loaded = true;
      }
    } else {
      setTimeout(function () {
        self.positionTree(callback);
      }, 10);
    }
    return this;
  }

  /**
   * In a first post-order walk, every node of the tree is assigned a preliminary
   * x-coordinate (held in field node->prelim).
   * In addition, internal nodes are given modifiers, which will be used to move their
   * children to the right (held in field node->modifier).
   * @param {TreeNode} node
   * @param {number} level
   * @returns {Tree}
   */
  firstWalk(node: any, level: number) {
    node.prelim = null;
    node.modifier = null;

    this.setNeighbors(node, level);
    this.calcLevelDim(node, level);

    var leftSibling = node.leftSibling();

    if (node.childrenCount() === 0 || level == this.CONFIG.maxDepth) {
      // set preliminary x-coordinate
      if (leftSibling) {
        node.prelim =
          leftSibling.prelim +
          leftSibling.size() +
          this.CONFIG.siblingSeparation;
      } else {
        node.prelim = 0;
      }
    } else {
      //node is not a leaf,  firstWalk for each child
      for (var i = 0, n = node.childrenCount(); i < n; i++) {
        this.firstWalk(node.childAt(i), level + 1);
      }

      var midPoint = node.childrenCenter() - node.size() / 2;

      if (leftSibling) {
        node.prelim =
          leftSibling.prelim +
          leftSibling.size() +
          this.CONFIG.siblingSeparation;
        node.modifier = node.prelim - midPoint;
        this.apportion(node, level);
      } else {
        node.prelim = midPoint;
      }

      // handle stacked children positioning
      if (node.stackParent) {
        // handle the parent of stacked children
        node.modifier +=
          this.nodeDB.get(node.stackChildren[0]).size() / 2 +
          node.connStyle.stackIndent;
      } else if (node.stackParentId) {
        // handle stacked children
        node.prelim = 0;
      }
    }
    return this;
  }

  /*
   * Clean up the positioning of small sibling subtrees.
   * Subtrees of a node are formed independently and
   * placed as close together as possible. By requiring
   * that the subtrees be rigid at the time they are put
   * together, we avoid the undesirable effects that can
   * accrue from positioning nodes rather than subtrees.
   */
  apportion(node: any, level: number) {
    var firstChild = node.firstChild(),
      firstChildLeftNeighbor = firstChild.leftNeighbor(),
      compareDepth = 1,
      depthToStop = this.CONFIG.maxDepth - level;

    while (
      firstChild &&
      firstChildLeftNeighbor &&
      compareDepth <= depthToStop
    ) {
      // calculate the position of the firstChild, according to the position of firstChildLeftNeighbor

      var modifierSumRight = 0,
        modifierSumLeft = 0,
        leftAncestor = firstChildLeftNeighbor,
        rightAncestor = firstChild;

      for (var i = 0; i < compareDepth; i++) {
        leftAncestor = leftAncestor.parent();
        rightAncestor = rightAncestor.parent();
        modifierSumLeft += leftAncestor.modifier;
        modifierSumRight += rightAncestor.modifier;

        // all the stacked children are oriented towards right so use right variables
        if (rightAncestor.stackParent !== undefined) {
          modifierSumRight += rightAncestor.size() / 2;
        }
      }

      // find the gap between two trees and apply it to subTrees
      // and matching smaller gaps to smaller subtrees

      var totalGap =
        firstChildLeftNeighbor.prelim +
        modifierSumLeft +
        firstChildLeftNeighbor.size() +
        this.CONFIG.subTeeSeparation -
        (firstChild.prelim + modifierSumRight);

      if (totalGap > 0) {
        var subtreeAux = node,
          numSubtrees = 0;

        // count all the subtrees in the LeftSibling
        while (subtreeAux && subtreeAux.id !== leftAncestor.id) {
          subtreeAux = subtreeAux.leftSibling();
          numSubtrees++;
        }

        if (subtreeAux) {
          var subtreeMoveAux = node,
            singleGap = totalGap / numSubtrees;

          while (subtreeMoveAux.id !== leftAncestor.id) {
            subtreeMoveAux.prelim += totalGap;
            subtreeMoveAux.modifier += totalGap;

            totalGap -= singleGap;
            subtreeMoveAux = subtreeMoveAux.leftSibling();
          }
        }
      }

      compareDepth++;

      firstChild =
        firstChild.childrenCount() === 0
          ? node.leftMost(0, compareDepth)
          : (firstChild = firstChild.firstChild());

      if (firstChild) {
        firstChildLeftNeighbor = firstChild.leftNeighbor();
      }
    }
  }

  /*
   * During a second pre-order walk, each node is given a
   * final x-coordinate by summing its preliminary
   * x-coordinate and the modifiers of all the node's
   * ancestors.  The y-coordinate depends on the height of
   * the tree.  (The roles of x and y are reversed for
   * RootOrientations of EAST or WEST.)
   */
  secondWalk(node: any, level: number, X: number, Y: number) {
    if (level > this.CONFIG.maxDepth) {
      return;
    }

    var xTmp = node.prelim + X,
      yTmp = Y,
      align = this.CONFIG.nodeAlign,
      orient = this.CONFIG.rootOrientation,
      levelHeight,
      nodesizeTmp;

    if (orient === "NORTH" || orient === "SOUTH") {
      levelHeight = this.levelMaxDim[level].height;
      nodesizeTmp = node.height;
      if (node.pseudo) {
        node.height = levelHeight;
      } // assign a new size to pseudo nodes
    } else if (orient === "WEST" || orient === "EAST") {
      levelHeight = this.levelMaxDim[level].width;
      nodesizeTmp = node.width;
      if (node.pseudo) {
        node.width = levelHeight;
      } // assign a new size to pseudo nodes
    }

    node.X = xTmp;

    if (node.pseudo) {
      // pseudo nodes need to be properly aligned, otherwise position is not correct in some examples
      if (orient === "NORTH" || orient === "WEST") {
        node.Y = yTmp; // align "BOTTOM"
      } else if (orient === "SOUTH" || orient === "EAST") {
        node.Y = yTmp + (levelHeight - nodesizeTmp); // align "TOP"
      }
    } else {
      node.Y =
        align === "CENTER"
          ? yTmp + (levelHeight - nodesizeTmp) / 2
          : align === "TOP"
          ? yTmp + (levelHeight - nodesizeTmp)
          : yTmp;
    }

    if (orient === "WEST" || orient === "EAST") {
      var swapTmp = node.X;
      node.X = node.Y;
      node.Y = swapTmp;
    }

    if (orient === "SOUTH") {
      node.Y = -node.Y - nodesizeTmp;
    } else if (orient === "EAST") {
      node.X = -node.X - nodesizeTmp;
    }

    if (node.childrenCount() !== 0) {
      if (node.id === 0 && this.CONFIG.hideRootNode) {
        // ako je root node Hiden onda nemoj njegovu dijecu pomaknut po Y osi za Level separation, neka ona budu na vrhu
        this.secondWalk(node.firstChild(), level + 1, X + node.modifier, Y);
      } else {
        this.secondWalk(
          node.firstChild(),
          level + 1,
          X + node.modifier,
          Y + levelHeight + this.CONFIG.levelSeparation
        );
      }
    }

    if (node.rightSibling()) {
      this.secondWalk(node.rightSibling(), level, X, Y);
    }
  }

  /**
   * position all the nodes, center the tree in center of its container
   * 0,0 coordinate is in the upper left corner
   * @returns {Tree}
   */
  positionNodes() {
    var self = this,
      treeSize = {
        x: self.nodeDB.getMinMaxCoord("X", null, null),
        y: self.nodeDB.getMinMaxCoord("Y", null, null),
      },
      treeWidth = treeSize.x.max - treeSize.x.min,
      treeHeight = treeSize.y.max - treeSize.y.min,
      treeCenter = {
        x: treeSize.x.max - treeWidth / 2,
        y: treeSize.y.max - treeHeight / 2,
      };

    this.handleOverflow(treeWidth, treeHeight);

    var containerCenter = {
        x: self.drawArea.clientWidth / 2,
        y: self.drawArea.clientHeight / 2,
      },
      deltaX = containerCenter.x - treeCenter.x,
      deltaY = containerCenter.y - treeCenter.y,
      // all nodes must have positive X or Y coordinates, handle this with offsets
      negOffsetX = treeSize.x.min + deltaX <= 0 ? Math.abs(treeSize.x.min) : 0,
      negOffsetY = treeSize.y.min + deltaY <= 0 ? Math.abs(treeSize.y.min) : 0,
      i,
      len,
      node;

    // position all the nodes
    for (i = 0, len = this.nodeDB.db.length; i < len; i++) {
      node = this.nodeDB.get(i);

      self.CONFIG.callback.onBeforePositionNode.apply(self, [
        node,
        i,
        containerCenter,
        treeCenter,
      ]);

      if (node.id === 0 && this.CONFIG.hideRootNode) {
        self.CONFIG.callback.onAfterPositionNode.apply(self, [
          node,
          i,
          containerCenter,
          treeCenter,
        ]);
        continue;
      }

      // if the tree is smaller than the draw area, then center the tree within drawing area
      node.X +=
        negOffsetX +
        (treeWidth < this.drawArea.clientWidth ? deltaX : this.CONFIG.padding);
      node.Y +=
        negOffsetY +
        (treeHeight < this.drawArea.clientHeight
          ? deltaY
          : this.CONFIG.padding);

      var collapsedParent = node.collapsedParent(),
        hidePoint = null;

      if (collapsedParent) {
        // position the node behind the connector point of the parent, so future animations can be visible
        hidePoint = collapsedParent.connectorPoint(true);
        node.hide(hidePoint);
      } else if (node.positioned) {
        // node is already positioned,
        node.show();
      } else {
        // inicijalno stvaranje nodeova, postavi lokaciju
        node.nodeDOM.style.left = node.X + "px";
        node.nodeDOM.style.top = node.Y + "px";
        node.positioned = true;
      }

      if (
        node.id !== 0 &&
        !(node.parent().id === 0 && this.CONFIG.hideRootNode)
      ) {
        this.setConnectionToParent(node, hidePoint); // skip the root node
      } else if (!this.CONFIG.hideRootNode && node.drawLineThrough) {
        // drawlinethrough is performed for for the root node also
        node.drawLineThroughMe();
      }

      self.CONFIG.callback.onAfterPositionNode.apply(self, [
        node,
        i,
        containerCenter,
        treeCenter,
      ]);
    }
    return this;
  }
  /**
   * Create Raphael instance, (optionally set scroll bars if necessary)
   * @param {number} treeWidth
   * @param {number} treeHeight
   * @returns {Tree}
   */
  handleOverflow(treeWidth: number, treeHeight: number) {
    var viewWidth =
        treeWidth < this.drawArea.clientWidth
          ? this.drawArea.clientWidth
          : treeWidth + this.CONFIG.padding * 2,
      viewHeight =
        treeHeight < this.drawArea.clientHeight
          ? this.drawArea.clientHeight
          : treeHeight + this.CONFIG.padding * 2;

    this._R.setSize(viewWidth, viewHeight);

    if (this.CONFIG.scrollbar === "resize") {
      this.util.setDimensions(this.drawArea, viewWidth, viewHeight);
    } else if (
      !this.util.isjQueryAvailable() ||
      this.CONFIG.scrollbar === "native"
    ) {
      if (this.drawArea.clientWidth < treeWidth) {
        // is overflow-x necessary
        this.drawArea.style.overflowX = "auto";
      }

      if (this.drawArea.clientHeight < treeHeight) {
        // is overflow-y necessary
        this.drawArea.style.overflowY = "auto";
      }
    }
    // Fancy scrollbar relies heavily on jQuery, so guarding with if ( $ )
    else if (this.CONFIG.scrollbar === "fancy") {
      var jq_drawArea: any = $(this.drawArea);
      if (jq_drawArea.hasClass("ps-container")) {
        // znaci da je 'fancy' vec inicijaliziran, treba updateat
        jq_drawArea.find(".Treant").css({
          width: viewWidth,
          height: viewHeight,
        });

        jq_drawArea.perfectScrollbar("update");
      } else {
        var mainContainer = jq_drawArea.wrapInner('<div class="Treant"/>'),
          child = mainContainer.find(".Treant");

        child.css({
          width: viewWidth,
          height: viewHeight,
        });

        mainContainer.perfectScrollbar();
      }
    } // else this.CONFIG.scrollbar == 'None'

    return this;
  }

  /**
   * @param {TreeNode} treeNode
   * @param {boolean} hidePoint
   * @returns {Tree}
   */
  setConnectionToParent(treeNode: any, hidePoint: boolean) {
    var stacked = treeNode.stackParentId,
      connLine,
      parent = stacked ? this.nodeDB.get(stacked) : treeNode.parent(),
      pathString = hidePoint
        ? this.getPointPathString(hidePoint)
        : this.getPathString(parent, treeNode, stacked);

    if (this.connectionStore[treeNode.id]) {
      // connector already exists, update the connector geometry
      connLine = this.connectionStore[treeNode.id];
      this.animatePath(connLine, pathString);
    } else {
      connLine = this._R.path(pathString);
      this.connectionStore[treeNode.id] = connLine;

      // don't show connector arrows por pseudo nodes
      if (treeNode.pseudo) {
        delete parent.connStyle.style["arrow-end"];
      }
      if (parent.pseudo) {
        delete parent.connStyle.style["arrow-start"];
      }

      connLine.attr(parent.connStyle.style);

      if (treeNode.drawLineThrough || treeNode.pseudo) {
        treeNode.drawLineThroughMe(hidePoint);
      }
    }
    treeNode.connector = connLine;
    return this;
  }

  /**
   * Create the path which is represented as a point, used for hiding the connection
   * A path with a leading "_" indicates the path will be hidden
   * See: http://dmitrybaranovskiy.github.io/raphael/reference.html#Paper.path
   * @param {object} hidePoint
   * @returns {string}
   */
  getPointPathString(hidePoint: any) {
    return [
      "_M",
      hidePoint.x,
      ",",
      hidePoint.y,
      "L",
      hidePoint.x,
      ",",
      hidePoint.y,
      hidePoint.x,
      ",",
      hidePoint.y,
    ].join(" ");
  }

  /**
   * This method relied on receiving a valid Raphael Paper.path.
   * See: http://dmitrybaranovskiy.github.io/raphael/reference.html#Paper.path
   * A pathString is typically in the format of "M10,20L30,40"
   * @param path
   * @param {string} pathString
   * @returns {Tree}
   */
  animatePath(path: any, pathString: string) {
    if (path.hidden && pathString.charAt(0) !== "_") {
      // path will be shown, so show it
      path.show();
      path.hidden = false;
    }

    // See: http://dmitrybaranovskiy.github.io/raphael/reference.html#Element.animate
    path.animate(
      {
        path:
          pathString.charAt(0) === "_" ? pathString.substring(1) : pathString, // remove the "_" prefix if it exists
      },
      this.CONFIG.animation.connectorsSpeed,
      this.CONFIG.animation.connectorsAnimation,
      function () {
        if (pathString.charAt(0) === "_") {
          // animation is hiding the path, hide it at the and of animation
          path.hide();
          path.hidden = true;
        }
      }
    );
    return this;
  }

  /**
   *
   * @param {TreeNode} from_node
   * @param {TreeNode} to_node
   * @param {boolean} stacked
   * @returns {string}
   */
  getPathString(from_node: any, to_node: any, stacked: boolean) {
    var startPoint = from_node.connectorPoint(true),
      endPoint = to_node.connectorPoint(false),
      orientation = this.CONFIG.rootOrientation,
      connType = from_node.connStyle.type,
      P1: any = {},
      P2: any = {};

    if (orientation === "NORTH" || orientation === "SOUTH") {
      P1.y = P2.y = (startPoint.y + endPoint.y) / 2;

      P1.x = startPoint.x;
      P2.x = endPoint.x;
    } else if (orientation === "EAST" || orientation === "WEST") {
      P1.x = P2.x = (startPoint.x + endPoint.x) / 2;

      P1.y = startPoint.y;
      P2.y = endPoint.y;
    }

    // sp, p1, pm, p2, ep == "x,y"
    var sp = startPoint.x + "," + startPoint.y,
      p1 = P1.x + "," + P1.y,
      p2 = P2.x + "," + P2.y,
      ep = endPoint.x + "," + endPoint.y,
      pm = (P1.x + P2.x) / 2 + "," + (P1.y + P2.y) / 2,
      pathString: any,
      stackPoint;

    if (stacked) {
      // STACKED CHILDREN

      stackPoint =
        orientation === "EAST" || orientation === "WEST"
          ? endPoint.x + "," + startPoint.y
          : startPoint.x + "," + endPoint.y;

      if (connType === "step" || connType === "straight") {
        pathString = ["M", sp, "L", stackPoint, "L", ep];
      } else if (connType === "curve" || connType === "bCurve") {
        var helpPoint, // used for nicer curve lines
          indent = from_node.connStyle.stackIndent;

        if (orientation === "NORTH") {
          helpPoint = endPoint.x - indent + "," + (endPoint.y - indent);
        } else if (orientation === "SOUTH") {
          helpPoint = endPoint.x - indent + "," + (endPoint.y + indent);
        } else if (orientation === "EAST") {
          helpPoint = endPoint.x + indent + "," + startPoint.y;
        } else if (orientation === "WEST") {
          helpPoint = endPoint.x - indent + "," + startPoint.y;
        }
        pathString = ["M", sp, "L", helpPoint, "S", stackPoint, ep];
      }
    } else {
      // NORMAL CHILDREN
      if (connType === "step") {
        pathString = ["M", sp, "L", p1, "L", p2, "L", ep];
      } else if (connType === "curve") {
        pathString = ["M", sp, "C", p1, p2, ep];
      } else if (connType === "bCurve") {
        pathString = ["M", sp, "Q", p1, pm, "T", ep];
      } else if (connType === "straight") {
        pathString = ["M", sp, "L", sp, ep];
      }
    }

    return pathString.join(" ");
  }

  /**
   * Algorithm works from left to right, so previous processed node will be left neighbour of the next node
   * @param {TreeNode} node
   * @param {number} level
   * @returns {Tree}
   */
  setNeighbors(node: any, level: number) {
    node.leftNeighborId = this.lastNodeOnLevel[level];
    if (node.leftNeighborId) {
      node.leftNeighbor().rightNeighborId = node.id;
    }
    this.lastNodeOnLevel[level] = node.id;
    return this;
  }

  /**
   * Used for calculation of height and width of a level (level dimensions)
   * @param {TreeNode} node
   * @param {number} level
   * @returns {Tree}
   */
  calcLevelDim(node: any, level: number) {
    // root node is on level 0
    this.levelMaxDim[level] = {
      width: Math.max(
        this.levelMaxDim[level] ? this.levelMaxDim[level].width : 0,
        node.width
      ),
      height: Math.max(
        this.levelMaxDim[level] ? this.levelMaxDim[level].height : 0,
        node.height
      ),
    };
    return this;
  }

  /**
   * @returns {Tree}
   */
  resetLevelData() {
    this.lastNodeOnLevel = [];
    this.levelMaxDim = [];
    return this;
  }

  /**
   * @returns {TreeNode}
   */
  root() {
    return this.nodeDB.get(0);
  }
}
