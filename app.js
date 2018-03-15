import 'babel-polyfill';
import { Accordion } from './modules/Accordion';


const accordion = new Accordion({
    accordion: ".accordion",
    activeClass: "active",
    // singleOpen: false,
    transitionTime: 300,
    transitionType: 'ease-in-out',
	selectors: [".selector", ".sub-selector", ".sub-selector2"],
	scrollToOffset: 30
});