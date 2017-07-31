var Accordion = (function(options) {

	var _defaults = {
		listContainer: ".accordion",
		listType: "UL",
		listToggle: "LI",
		listClass: "toggle",
		listActive: "active",
		levels: []
	};

	options.listContainer = options.listContainer || _defaults.listContainer;
	options.listType = options.listType || _defaults.listType;
	options.listToggle = options.listToggle || _defaults.listToggle;
	options.listClass = options.listClass || _defaults.listClass;
	options.listActive = options.listActive || _defaults.listActive;
	options.levels = _defaults.levels;

	options.listType = options.listType.toUpperCase();
	options.listToggle = options.listToggle.toUpperCase();


	var containers = document.querySelectorAll(options.listContainer);

	var counter = 0,
		topLevel = document.querySelectorAll(options.listContainer + " > " + options.listType),
		container = document.querySelector(options.listContainer);
	


	//check if levels are already specified
	if(options.levels.length < 1) 
		setLevels(topLevel, setLevels);
	
	options.levels.forEach(function(level, index) {
		for(var i = 0; i < level.length; i++) {
			[].forEach.call(level[i].children, function(tab){
				setClickEvent(tab);
				
				//add a custom class to all list items that toggle an accordion
				for(var i = 0; i < tab.children.length; i++) {
					if(tab.children[i].nodeName == options.listType && !tab.classList.contains(options.listClass))	{	
						tab.classList.add(options.listClass);			
					}
				}
				
				for (var i = 0; i < tab.children.length; i++) {
					if(tab.children[i].nodeName == "A" && tab.classList.contains(options.listClass)) {
						tab.children[i].removeAttribute('href');
					}
				}
			});
		}
	});


	function setClickEvent(tab) {
		tab.addEventListener('click', function(e) {

			//stopPropogation and cancelBubble stops multiple click events from firing
			if (typeof e.stopPropagation == "function") 
				e.stopPropagation();
			else
				e.cancelBubble = true;

			var activeLists = [],
				activeTabs = [];

			//see if any children are a new list
			[].forEach.call(tab.children, function(child) {
				if(child.nodeName == options.listType) {
					child.style.height = getElemChildrenHeight(child);
					tab.classList.toggle(options.listActive);
					child.classList.toggle(options.listActive);

					activeLists = getParents(tab, options.listContainer + " " + options.listType + "." + options.listActive);
					activeTabs = getParents(tab, options.listContainer + " " + options.listToggle + "." + options.listActive);

					activeLists = activeLists.reverse();
					activeTabs = activeTabs.reverse();

					if(child.classList.contains(options.listActive)) {
						activeLists.push(child);			
					}
				}
			});

			var allActiveTabs = container.querySelectorAll(options.listContainer + " " + options.listToggle + "." + options.listActive);
			var allActiveLists = container.querySelectorAll(options.listContainer + " " + options.listType + "." + options.listActive);

			if(activeLists.length > 0) {
				for(var i = 0; i < allActiveTabs.length; i++) {
					for(var j = 0; j < activeTabs.length; j++) {
						if(allActiveTabs[i].innerHTML.indexOf(activeTabs[j].innerHTML) == -1) {
							allActiveTabs[i].classList.remove(options.listActive);
							allActiveLists[i].classList.remove(options.listActive);
						} else {
							allActiveTabs[i].classList.add(options.listActive);
							allActiveLists[i].classList.add(options.listActive);
							break;
						}
					}
				}
			}
			
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
			cloned.classList.remove(options.listActive);
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
	

	function setLevels(elemArr, callback) {
		var array = [];
		
		[].forEach.call(elemArr, function(el) {			
			if(el.nodeName == options.listType) {
				el.classList.add("level_" + (counter + 1));
				array.push(el);
			}			
		});

		var elem = array[0];
		counter++;

		if(elem !== undefined) {
			var nextLevel = document.querySelectorAll(options.listContainer + " " + "." + array[0].classList.value + " > " + options.listToggle + " > " + options.listType);

			if(nextLevel.length > 0)
				callback(nextLevel, callback);

		}
		options.levels.unshift(array);
	}


	var getParents = function ( elem, selector ) {

		// Element.matches() polyfill
		if (!Element.prototype.matches) {
			Element.prototype.matches =
				Element.prototype.matchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.msMatchesSelector ||
				Element.prototype.oMatchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				function(s) {
					var matches = (this.document || this.ownerDocument).querySelectorAll(s),
						i = matches.length;
					while (--i >= 0 && matches.item(i) !== this) {}
					return i > -1;
				};
		}

		// Setup parents array
		var parents = [];

		// Get matching parent elements
		for ( ; elem && elem !== document; elem = elem.parentNode ) {

			// Add matching parents to array
			if ( selector ) {
				if ( elem.matches( selector ) ) {
					parents.push( elem );
				}
			} else {
				parents.push( elem );
			}

		}

		return parents;

	};
	
});