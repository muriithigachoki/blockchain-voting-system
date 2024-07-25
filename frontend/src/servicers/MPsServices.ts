import create from "./httpServices";
const county = localStorage.getItem("county")
console.log(county)

export default create(`/GovernorCandidate?value=${county}`)