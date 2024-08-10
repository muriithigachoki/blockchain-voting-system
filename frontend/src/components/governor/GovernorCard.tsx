import {
  Card,
  CardBody,
  Heading,
  HStack,
  Button,
  Image,
} from "@chakra-ui/react";
import { Governor } from "../../hooks/useGovernor";

interface Props {
  governor: Governor;
  index: number;
  voteForGovernor: (candidateIndex: number) => void;
}

const GovernorCard = ({ index, governor, voteForGovernor }: Props) => {
  return (
    <Card>
      <Image height="350px" objectFit="cover" src={governor.image} />
      <CardBody>
        <Heading>{governor.username}</Heading>
        <HStack justifyContent="space-between">
          <Button onClick={() => voteForGovernor(index)} colorScheme="blue">
            Vote
          </Button>
          <Heading>votes: {governor.votes}</Heading>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default GovernorCard;
