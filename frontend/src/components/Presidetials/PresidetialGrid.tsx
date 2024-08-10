import { Heading, SimpleGrid } from "@chakra-ui/react";
import usePresidentials from "../../hooks/usePresidentials";
import PresidetialCard from "./PresidetialCard";
import CandidatesContainer from "../CandidatesContainer";
import CardSkeleton from "../CardSkeleton";
import presidentialVotingService from "../../servicers/presidentialVotingService";

interface VoteForPresidential {
  userId: number;
  candidateIndex: number;
}

const PresidentialGrid = () => {
  const { PresidentialCandidates, error, isLoading, setPresidetialCandidates } =
    usePresidentials();

  const voteForPresidential = (candidateIndex: number) => {
    const id = localStorage.getItem("userId");

    const currentUserId = parseInt(id);
    setPresidetialCandidates(
      PresidentialCandidates.map((presidential, index) =>
        index === candidateIndex
          ? { ...presidential, votes: presidential.votes++ }
          : presidential
      )
    );

    presidentialVotingService
      .create<VoteForPresidential>({
        userId: currentUserId,
        candidateIndex: candidateIndex,
      })
      .then((res) => alert(res.statusText))
      .catch((error) =>
        alert(`${error.message} you have already voted for president`)
      );
  };

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  if (error) return <p className="text-danger">{error}</p>;
  return (
    <>
      <Heading color="white" padding={7}>
        Presidential Candidates
      </Heading>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={6} padding="10px">
        {isLoading &&
          skeletons.map((skeleton) => (
            <CandidatesContainer key={skeleton}>
              <CardSkeleton />
            </CandidatesContainer>
          ))}
        {PresidentialCandidates.map((presidential, index) => (
          <CandidatesContainer key={index}>
            <PresidetialCard
              presindetial={presidential}
              index={index}
              voteForPresidential={(index) => voteForPresidential(index)}
            />
          </CandidatesContainer>
        ))}
      </SimpleGrid>
    </>
  );
};

export default PresidentialGrid;
