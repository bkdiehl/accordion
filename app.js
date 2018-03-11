import { Accordion } from './modules/accordion';

const accordion = new Accordion({
    accordion: ".accordion",
    activeClass: "active",
    // singleOpen: false,
    transition: 300,
    selectors: [".selector", ".sub-selector", ".sub-selector2"]
});