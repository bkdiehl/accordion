/*
 TO DO
 1. SEE IF YOU NEED TO MOVE THE VIEWPORT IF THE CLICKED ELEMENT MOVES OUT OF VIEWPORT
 2. ADD A STYLES OBJECT TO MORE EASILY APPLY/UNDERSTAND THE STYLES THAT ARE BEING ADDED/REMOVED
*/
import { scrollIt } from './SmoothScrolling';

export class Accordion {
    constructor(options) {
		//plugin properties
        this.accordion = document.querySelector(options.accordion);
        this.activeClass = options.activeClass || "active";
        this.singleOpen = options.singleOpen != undefined ? options.singleOpen : true;
		this.transitionTime = options.transitionTime || 300;
		this.transitionType = options.transitionType || 'linear';
		this.transitionEnd; // class variable for timer
		this.scrollToOffset = options.scrollToOffset || 0;
        this.elements = options.selectors.reduce((obj, selector, index) => {
            obj[index] = Array.from(this.accordion.querySelectorAll(selector));
            obj[index].forEach(item => {
                item.dataset.level = index;

                //initial selector sibling element style (accordion items)
                this.setSiblingStyles(item);

                item.addEventListener('click', (e) => {
                    const targetLvl = e.target.dataset.level;
					this.elements[targetLvl].forEach(item => item == e.target ? this.toggle(item) : this.close(item));	
					console.time('clone')				
					this.setHeight();
					this.isInViewport(e.target);
					console.timeEnd('clone')
				})
			});		
            return obj;
		}, {});
		this.layerCount = Object.keys(this.elements).length;
		
		//resize event to change accordion height when switching to a smaller screen
		let resizeListener;
		window.addEventListener('resize', e => {
			clearTimeout(resizeListener);
			resizeListener = setTimeout(() => {
				this.setHeight();
			}, 100)
		})
	}
	toggle(elem) {
		if(this.singleOpen) { //if only a single panel is allowed to be open, close all children panels
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
    setHeight() {
		for(let i = this.layerCount - 1; i >= 0; i--) { // for each layer of the accordion starting at the inner most layer
			this.elements[i].forEach(elem => {
				const sib = elem.nextElementSibling;

				//only change the height from 0 if it's the active accordion element
				if (elem.classList.contains(this.activeClass)) {
					//clone the node, append to elem, calc height, remove clone			
					const clone = sib.cloneNode(true);
					clone.style.height = null;
					elem.appendChild(clone);
					sib.style.height = clone.offsetHeight + "px";
					clone.remove();
				} else {
					sib.style.height = 0;
				}
			});
		}      
	}
	isInViewport(elem) {
		clearTimeout(this.transitionEnd)
		this.transitionEnd = setTimeout(() => {
			const rect = elem.getBoundingClientRect();

			if(rect.top < 0)
				scrollIt(elem, this.transitionTime, 'linear', this.scrollToOffset);	
				
				console.log(elem, this.transitionTime, 'linear', this.scrollToOffset)
		}, this.transitionTime)
	}
    setSiblingStyles(elem) {
        //initial styles
        const sib = elem.nextElementSibling;
        sib.style.overflow = 'hidden';
        sib.style.height = 0;
		sib.style.transition = `${this.transitionTime / 1000}s ${this.transitionType}`;
    }
}

var getElemDistance = function ( elem ) {
    var location = 0;
    if (elem.offsetParent) {
        do {
            location += elem.offsetTop;
            elem = elem.offsetParent;
        } while (elem);
    }
    return location >= 0 ? location : 0;
};