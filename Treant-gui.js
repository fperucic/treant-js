;( function() {
	// init options begin
	var options = {
		selectedElBackgroundColor: "grey"
	};
	// init options end
	// init defaults values begin
	var treantJs = null, selectedEl = null, selectedNodeTree = null
	, treantGui;
	// init defaults values end
	// callbacks begin
	var selectFunc = function(nodeEl){
	  if (selectedEl != null){
		  selectedEl.css("background-color", "");
	  }	  
	  var nodeName = $(nodeEl).find(".node-name");
	  nodeName.css("background-color", options.selectedElBackgroundColor);
	  selectedEl = nodeName;
	};	
	var addNodeFun = function(){
		var newNodeText = $("#addNodeText").val();
		treantJs.tree.addNode(selectedNodeTree, { text: { name: newNodeText } });
		$('#modalWin').dialog( "close" );
	}	
	// callbacks end
	// GUI buttons begin
	var buttons = [{
			id: 'addBtn',
			text: 'add',
			callback: function(el){
				if (selectedEl != null){
					var nodeText = $(selectedEl).text()
					, tree = treantJs.tree.getNodeDb().db;														
					for(var key in tree){
						var nodeTree = tree[key];
						if(nodeTree.text.name == nodeText){
							selectedNodeTree = nodeTree;
							$('#modalWin').dialog( "open" );
							break;
						}						
					}					
				}
			}
		}/*,{
			id: 'removeBtn',
			text: 'remove',
			callback: function(el){
				if (selectedEl != null){
					var nodeText = $(selectedEl).text()
					, tree = treantJs.tree.getNodeDb().db;																			
					for(var key in tree){
						var nodeTree = tree[key];
						if(nodeTree.text.name == nodeText){
							console.log(tree);
							console.log(nodeTree);
							console.log(nodeTree.parentId);
							console.log(nodeTree.lookupNode(nodeTree.parentId));
							//selectedNodeTree = nodeTree;
							//$('#modalWin').dialog( "open" );
							break;
						}						
					}
				}
			}
		}*/,{
			id: 'exportNodeStructureBtn',
			text: 'exrpot NodeStructure',
			callback: function(){
				var data = JSON.stringify(treantGui.prototype.exportNodeStructure());				
				$('#modalWin').html(data);
				$('#modalWin').dialog({title: "Export NodeStructure"});
				$('#modalWin').dialog( "open" );
			}
		}
	];
	// GUI buttons end
	// init GUI elements and callbacks
	treantGui = function(idDiv, treant){
		var guiDiv = $('#' + idDiv);		
		treantJs = treant;		
		$('.node').each(function() {
		  $( this ).click(
			function(){
				selectFunc(this);
			}
		  );
		});
		for(var key in buttons){
			var btnData = buttons[key];
			var btn = document.createElement('button');
			btn.setAttribute("id", btnData.id);
			btn.innerHTML = btnData.text;
			btn.addEventListener("click", btnData.callback);
			guiDiv.append(btn);
			var modalWin = document.createElement('div')
			, addNodeBtn = document.createElement('button');
			modalWin.setAttribute("id", "modalWin");
			modalWin.setAttribute("title", "Add node");
			modalWin.innerHTML = "<span>Child for parent:</span><input id=\"addNodeText\" name=text />";
			addNodeBtn.addEventListener("click", addNodeFun);
			addNodeBtn.innerHTML = "Save";
			modalWin.appendChild(addNodeBtn);
			guiDiv.append(modalWin);
			$(modalWin).dialog({
			  autoOpen: false
			});
		}
	};
	treantGui.prototype = {
		exportNodeStructure: function(root, nodeStructure){			
			var root = root || treantJs.tree.root()
			, nodeStructure = nodeStructure || {text: root.text, children: []};			
			if (typeof root.children != "undefined"){
				var children = root.children;
				for(var key in children){
					var child = treantJs.tree.getNodeDb().db[children[key]]
					, childNode = { text: child.text, children: [] };										
					if (typeof child.children != "undefined"){
						this.exportNodeStructure(child, childNode);
					}
					nodeStructure.children.push(childNode);
				}
			}
			return nodeStructure;
		}
	};
	window.treantGui = treantGui;
})();