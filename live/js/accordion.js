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
					
					for(var i = 0; i < tab.children.length; i++) {
						if(tab.children[i].nodeName == options.listType && !tab.classList.contains(options.listClass)) 
							tab.classList.add(options.listClass)		
					}
				});
			}
		});


		function setClickEvent(tab) {
			tab.addEventListener('click', function(e) {

				//cancelBubble stops multiple click events from firing
				e.cancelBubble = true;

				//see if any children are a new list
				[].forEach.call(tab.children, function(child) {
					if(child.nodeName == options.listType) {
						child.style.height = getElemChildrenHeight(child);
						tab.classList.toggle('active');
						child.classList.toggle('active');
					}
				});

				//get a list of all the currently active tabContent
				var activeLists = document.querySelectorAll(options.container + " " + options.listType +  ".active");
				
				//start at the bottom of the tree and work our way up
				for(var i = activeLists.length - 1; i >= 0; i--) {
					activeLists[i].style.height = getElemChildrenHeight(activeLists[i]);
				}
			});
		}
		


		function getElemChildrenHeight(elem) {
			var height = 0;
			[].forEach.call(elem.children, function(child) {
				//since the element height change has a transition time, we must clone the element to calculate the final height
				var cloned = child.cloneNode(true);			
				cloned.style.height = "auto";
				cloned.classList.remove('active');
				elem.append(cloned);

				var style = getComputedStyle(cloned),
					marginTop = parseInt(style.marginTop),
					marginBottom = parseInt(style.marginBottom),
					outerHeight = cloned.offsetHeight;

				//don't forget to remove the clone from the document
				cloned.remove();

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
		listClass: "toggle"
    });