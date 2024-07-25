import { useState, useEffect } from "react";
import { CanceledError } from "../servicers/apiCLient";
import governorService from "../servicers/governorService";

export interface MemberOfParliament{
    county: string,
    constituency: string,
    username: string,
    image: string,
    votes: number
  }

const useMps = () => {
    const [MPsCandidates, setMPsCandidate] = useState<MemberOfParliament[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false)
  
    useEffect(() => {
      setLoading(true)
        const {request, cancle} = governorService.getAll<MemberOfParliament>();
        request
        .then((res) => {
            setMPsCandidate(res.data)
            setLoading(false)
        })
        .catch((error) =>{
          if(error instanceof CanceledError) return;
          setError(error.message)
          setLoading(false)
        });
  
      return () => cancle();
    }, []);
return { MPsCandidates, error, isLoading,  setMPsCandidate}
}

export default useMps