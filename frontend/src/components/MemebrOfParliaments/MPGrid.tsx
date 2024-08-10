import { Heading, SimpleGrid } from "@chakra-ui/react";
import CandidatesContainer from "../CandidatesContainer";
import CardSkeleton from "../CardSkeleton";
import presidentialVotingService from "../../servicers/presidentialVotingService";
import useMps from "../../hooks/useMPs";
import MPsCard from "./MPsCard";

interface VoteForPresidential {
  userId: number;
  candidateIndex: number;
}

const MPsGrid = () => {
  const { MPsCandidates, error, isLoading, setMPsCandidate } = useMps();

  const voteForPresidential = (candidateIndex: number) => {
    const id = localStorage.getItem("userId");

    const currentUserId = parseInt(id);
    setMPsCandidate(
      MPsCandidates.map((candidate, index) =>
        index === candidateIndex
          ? { ...candidate, votes: candidate.votes++ }
          : candidate
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
        {MPsCandidates.map((Candidate, index) => (
          <CandidatesContainer key={index}>
            <MPsCard
              candidate={Candidate}
              index={index}
              voteForPresidential={(index: number) =>
                voteForPresidential(index)
              }
            />
          </CandidatesContainer>
        ))}
      </SimpleGrid>
    </>
  );
};

export default MPsGrid;
