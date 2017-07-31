var Accordian = (function(options) {

        var _defaults = {
            listType: "UL",
            container: ".accordion",
            levels: []
        };

        options.listType = options.listType.toUpperCase() || _defaults.listType;
        options.container = options.container || _defaults.container;
        options.levels = options.levels || _defaults.levels;


		var counter = 0,
			topLevel = document.querySelectorAll(options.container + " > " + options.listType);
		

		//check if levels are already specified
        if(options.levels.length < 1) 
			setLevels(topLevel, setLevels);

		
		options.levels.forEach(function(level, index) {
			for(var i = 0; i < level.length; i++) {
				[].forEach.call(level[i].children, function(tab){
					setClickEvent(tab);
				});
			}
		});


		function setClickEvent(tab) {
			tab.addEventListener('click', function(e) {

				//cancelBubble stops multiple click events from firing
				e.cancelBubble = true;
				var parent = tab.parentElement;

				//see if any children are a new list
				[].forEach.call(tab.children, function(child) {
					if(child.nodeName == options.listType) {
						var tabContent = child;
						tabContent.style.height = getElemChildrenHeight(tabContent);
						tab.classList.toggle('active');
						tabContent.classList.toggle('active');
					}
				});

				var activeLists = document.querySelectorAll(options.container + " " + options.listType +  ".active");
				
				for(var i = activeLists.length - 1; i >= 0; i--) {
					activeLists[i].style.height = getElemChildrenHeight(activeLists[i]);
				}

				// [].forEach.call(activeLists, function(list) {
				// 	console.log(list)
				// 	list.style.height += getElemChildrenHeight(list);	
				// 	// console.log(list.style.height)	
				// });

				//if parent is active, can I recalculate the height of its list elements

				// if(parent.classList.contains('active')) {
				// 	console.log(parent);
				// 	parent.style.height = getElemChildrenHeight(parent);
				// }
			});
		}
		


		function getElemChildrenHeight(elem) {
			var height = 0;
			[].forEach.call(elem.children, function(child) {
				// console.log($(child).outerHeight())
				var style = getComputedStyle(child),
					marginTop = parseInt(style.marginTop),
					marginBottom = parseInt(style.marginBottom),
					outerHeight = child.offsetHeight;

					height += (marginTop + marginBottom + outerHeight);
			});
			return height + "px";
		}
        
    
        function setLevels(element, callback) {
			var array = [];
			
			[].forEach.call(element, function(el) {			
				if(el.nodeName == options.listType) {
					el.classList.add("level_" + (counter + 1));
					array.push(el);
				}			
			});

			var elem = array[counter];

			if(elem !== undefined) {
				var nextLevel = document.querySelectorAll("." + array[counter].classList + " > li > " + options.listType);
				counter++;

				if(nextLevel.length > 0)
					callback(nextLevel, callback);

			}
			options.levels.unshift(array);

		}
    });


    Accordian({
        container: ".accordion",
        listType: "ul",
        // levels: [".level_1", ".level_2", ".level_3"]
    });