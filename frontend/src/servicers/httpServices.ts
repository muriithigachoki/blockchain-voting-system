import apiCLient from "./apiCLient"


class HttpService {
    endpoint: string;

    constructor(endpoint: string){
        this.endpoint = endpoint;
    }


    getAll<T>(){
        const controller = new AbortController();
       const request = apiCLient
        .get<T[]>(this.endpoint, {signal: controller.signal})
        return {request, cancle: () => controller.abort()}
    }

    create<T>(data: T){
        console.log(data)
        return apiCLient.post(this.endpoint, data)
    }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;