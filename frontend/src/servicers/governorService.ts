import create from "./httpServices";
const county = localStorage.getItem("county");
const constituency = localStorage.getItem("constituency");

export default create(`/MPCandidate?county=${county}&constituency${constituency}`)