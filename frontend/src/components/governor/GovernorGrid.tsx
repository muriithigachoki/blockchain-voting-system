import { Heading, SimpleGrid } from "@chakra-ui/react";
import CandidatesContainer from "../CandidatesContainer";
import CardSkeleton from "../CardSkeleton";
import GovernorCard from "./GovernorCard";
import useGovernor from "../../hooks/useGovernor";
import governorVoting from "../../servicers/governorVoting";

const GovernorGrid = () => {
  const { governorCandidates, error, isLoading, setGovernorCandidates } =
    useGovernor();

  const voteForGovernor = (candidateIndex: number) => {
    console.log(candidateIndex);
    setGovernorCandidates(
      governorCandidates.map((candidate, index) =>
        index === candidateIndex
          ? { ...candidate, votes: candidate.votes++ }
          : candidate
      )
    );
    const id = localStorage.getItem("userId");
    const currentUserId = parseInt(id);
    governorVoting
      .create({
        county: localStorage.getItem("county"),
        userId: currentUserId,
        candidateIndex: candidateIndex,
      })
      .then((res) => {
        alert(
          `${res.status} ${res.statusText} voted for governor successfully`
        );
        window.location.reload();
      })
      .catch((err) => alert(`you have already voted for governor`));
  };
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  if (error) return <p className="text-danger">{error}</p>;
  return (
    <>
      <Heading color="white" padding={7}>
        Governors Candidates
      </Heading>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={6} padding="10px">
        {isLoading &&
          skeletons.map((skeleton) => (
            <CandidatesContainer key={skeleton}>
              <CardSkeleton />
            </CandidatesContainer>
          ))}
        {governorCandidates.map((governor, index) => (
          <CandidatesContainer key={index}>
            <GovernorCard
              governor={governor}
              index={index}
              voteForGovernor={(index) => voteForGovernor(index)}
            />
          </CandidatesContainer>
        ))}
      </SimpleGrid>
    </>
  );
};

export default GovernorGrid;
