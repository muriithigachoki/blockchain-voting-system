import axios, {CanceledError} from "axios";


export default axios.create({
    baseURL: "http://localhost:3002/api/v1"
})

export {CanceledError}