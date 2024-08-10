import { useState, useEffect } from "react";
import { CanceledError } from "../servicers/apiCLient";
import governorService from "../servicers/governorService";

export interface Governor{
    county: string,
    username: string,
    image: string,
    votes: number
  }

const useGovernor = () => {
    const [governorCandidates, setGovernorCandidates] = useState<Governor[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false)
  
    useEffect(() => {
      setLoading(true)
        const {request, cancle} = governorService.getAll<Governor>();
        request
        .then((res) => {
            setGovernorCandidates(res.data)
            setLoading(false)
        })
        .catch((error) =>{
          if(error instanceof CanceledError) return;
          setError(error.message)
          setLoading(false)
        });
  
      return () => cancle();
    }, []);
return { governorCandidates, error, isLoading, setGovernorCandidates}
}

export default useGovernor