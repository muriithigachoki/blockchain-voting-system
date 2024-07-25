import { useState, useEffect } from "react";
import { CanceledError } from "../servicers/apiCLient";
import votersService, { Presidential } from "../servicers/presidentService";

const usePresidentials = () => {
    const [PresidentialCandidates, setPresidetialCandidates] = useState<Presidential[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false)
  
    useEffect(() => {
      setLoading(true)
        const {request, cancle} = votersService.getAll<Presidential>();
        request
        .then((res) => {
            setPresidetialCandidates(res.data)
            setLoading(false)
        })
        .catch((error) =>{
          if(error instanceof CanceledError) return;
          setError(error.message)
          setLoading(false)
        });
  
      return () => cancle();
    }, []);

return {PresidentialCandidates, error, isLoading, setPresidetialCandidates}
}

export default usePresidentials