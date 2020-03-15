;( function() {
	var options = {
		selectedElBackgroundColor: "grey"
	};
	var treantJs = null, selectedEl = null, selectedNodeTree = null;
	
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
		},{
			id: 'removeBtn',
			text: 'remove',
			callback: function(el){
				console.log(el);
			}
		}
	];
	var treantGui = function(idDiv, treant){
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
	window.treantGui = treantGui;
})();