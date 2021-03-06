import { scrollIt } from './SmoothScrolling';

export class Accordion {
    constructor(options) {
		//plugin properties
        this.accordion = Array.from(document.querySelectorAll(options.accordion));
        this.activeClass = options.activeClass || "active";
        this.singleOpen = options.singleOpen != undefined ? options.singleOpen : true;
		this.transitionTime = options.transitionTime || 300;
		this.transitionType = options.transitionType || 'linear';
		this.transitionEnd; // class variable for timer
		this.scrollToOffset = options.scrollToOffset || 0;

		this.accordion.forEach(accordion => {
			const elements = options.selectors.reduce((obj, selector, index) => {

				//obj with keys of index
				//property value is an array of elements with a css class equal to the selector			
				obj[index] = Array.from(accordion.querySelectorAll(selector));

				//check for exceptions in the markup
				obj[index].forEach(item => {
					//eliminate br elements introduced in wyziwyg markup
					if(item.nextElementSibling != null && item.nextElementSibling.nodeName == 'BR')
						item.parentNode.removeChild(item.nextElementSibling);

					//filter elements specified by the selector that don't have siblings with children (non-accordion items)
					if(item.nextElementSibling == null || item.nextElementSibling.children.length == 0) {
						obj[index] = obj[index].filter(elem => elem == item ? false : true)
					}
				});

				//set up the accordion
				obj[index].forEach(item => {
					//set data attribute values unique to each layer
					item.dataset.level = index;
					
					this.setSiblingStyles(item);
					
					//add event listener for each selector in the accordion
					item.addEventListener('click', (e) => {
						const targetLvl = e.target.dataset.level;
						elements[targetLvl].forEach(item => item == e.target ? this.toggle(item) : this.close(item));				
						this.setHeight(elements);
						this.isInViewport(e.target);
					})
				});		
				return obj;
			}, {});
		});
		
		//resize listener to change accordion height 
		//when switching to a smaller screen
		let resizeListener;
		window.addEventListener('resize', e => {
			clearTimeout(resizeListener);
			resizeListener = setTimeout(() => {
				this.setHeight();
			}, 100)
		})
	}


	toggle(elem) {
		//if only a single panel is allowed to be open, close all children panels
		if(this.singleOpen) {

			//when toggling a selector closed
			//toggle the child accordion items as well
			const activeChildren = Array.from(elem.nextElementSibling.querySelectorAll(`.${this.activeClass}`));
			if(activeChildren.length > 0) {
				activeChildren.forEach(child => child.classList.remove(this.activeClass));
			}
		}
		elem.classList.toggle(this.activeClass);
	}


    close(elem) {
        if (this.singleOpen) elem.classList.remove(this.activeClass);   
	}
	

    setHeight(elements) {
		const layerCount = Object.keys(elements).length
		//set the height for each layer of the accordion starting at the inner most layer
		for(let i = layerCount - 1; i >= 0; i--) { 
			elements[i].forEach(elem => {
				const sib = elem.nextElementSibling;

				//only change the height from 0 if it's the active accordion element
				//clone the node, append to elem, calc height, remove clone			
				if (elem.classList.contains(this.activeClass)) {
					const clone = sib.cloneNode(true);
					clone.style.height = 'auto';
					elem.parentNode.appendChild(clone);
					sib.style.height = clone.offsetHeight + "px";
					clone.parentNode.removeChild(clone);
				} else {
					sib.style.height = 0;
				}
			});
		}      
	}


	isInViewport(elem) {
		//instead of setting a transition on transition end use a timeout. 
		//Transition end would fire multiple times if the accordion has child accordion items.
		if(elem.classList.contains(this.activeClass)) {
			clearTimeout(this.transitionEnd)
	
			this.transitionEnd = setTimeout(() => {
				const rect = elem.getBoundingClientRect();
				const sibRect = elem.nextElementSibling.getBoundingClientRect();
	
				//if the selector scrolls out of the top of the viewport
				//or the accordion item is taller than the viewport
				//scroll the selector to the top of the viewport
				if(rect.top < 0 || rect.height + sibRect.height >= window.innerHeight) 
					scrollIt(elem, this.transitionTime, 'linear', this.scrollToOffset);
	
				//if the accordion item fits within the viewport
				//and mobile screen size
				//scroll the whole accordion item into view
				// else if (rect.height + sibRect.height < window.innerHeight && window.innerWidth < 768)
				// 	scrollIt(elem.nextElementSibling, this.transitionTime, 'linear', this.scrollToOffset);	
					
			}, this.transitionTime);
		}
	}

	
    setSiblingStyles(elem) {
		//set initial styles of accordion items
        const sib = elem.nextElementSibling;
        sib.style.overflow = 'hidden';
        sib.style.height = 0;
		sib.style.transition = `${this.transitionTime / 1000}s ${this.transitionType}`;
		elem.parentNode.classList.add('accordion-item');
    }
};