import create from "./httpServices";

export interface Presidential{
    name: string,
    image: string,
    votes: number
  }

//createVoters =(data: formData) =>{
//         return apiCLient.post("/createVoter", data)
//     }
// }

export default create("PresidentialCandidate")