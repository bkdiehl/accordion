export class Accordion {
    constructor(options) {
        this.accordion = document.querySelector(options.accordion);
        this.activeClass = options.activeClass || "active";
        this.singleOpen = options.singleOpen != undefined ? options.singleOpen : true;
        this.transition = options.transition;
        this.elements = options.selectors.reduce((obj, selector, index) => {
            obj[index] = Array.from(this.accordion.querySelectorAll(selector));
            obj[index].forEach(item => {
                item.dataset.level = index;

                //initial selector sibling element style (accordion items)
                this.setSiblingStyles(item);

                item.addEventListener('click', (e) => {
                    const targetLvl = e.target.dataset.level;
                    this.elements[targetLvl].forEach(item => item == e.target ? this.toggle(item, targetLvl) : this.close(item));
                })
            });
            return obj;
        }, {});
    }
    toggle(elem, targetLvl) {
        //toggle activeClass
        elem.classList.toggle(this.activeClass);

        //set height
        this.setHeight(elem);

        //if target is a sub level of the accordion
        if (targetLvl > 0) {
            let current = elem;
            //while the element we're working with isn't the main accordion element
            while (current != this.accordion) {
                current = current.parentNode; //get the parent element
                Array.from(current.children).forEach(child => { //so that we can check it's children for an accordion trigger
                    if (!isNaN(child.dataset.level) && child.dataset.level == targetLvl - 1 && child.nextElementSibling.contains(elem)) { //make sure that the element is of a previous target level
                        this.setHeight(child);
                        targetLvl--;
                    }
                })
            }
        }
    }
    close(elem) {
        if (this.singleOpen) {
            elem.classList.remove(this.activeClass);
            this.setHeight(elem);
        }
    }
    setHeight(elem) {
        //get array of sibling child elements
        const sib = elem.nextElementSibling;
        const children = Array.from(sib.children);

        //only change the height from 0 if it's the active accordion element
        if (elem.classList.contains(this.activeClass)) {
            //clone the node, append to elem, calc height, remove clone				
            const clone = sib.cloneNode(true);
            clone.style.height = 'auto';
            elem.appendChild(clone);
            sib.style.height = clone.offsetHeight + "px";
            clone.remove();
        } else {
            sib.style.height = 0;
        }
    }
    setSiblingStyles(elem) {
        //initial styles
        const sib = elem.nextElementSibling;
        sib.style.overflow = 'hidden';
        sib.style.height = 0;
        sib.style.transition = `${this.transition / 1000}s`;
    }
}