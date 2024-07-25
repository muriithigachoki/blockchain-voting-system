import {
  Button,
  Card,
  CardBody,
  Heading,
  Image,
  HStack,
} from "@chakra-ui/react";
import { Presidential } from "../../servicers/presidentService";

interface Props {
  index: number;
  presindetial: Presidential;
  voteForPresidential: (index: number) => void;
}
const MPsCard = ({ index, presindetial, voteForPresidential }: Props) => {
  return (
    <Card>
      <Image height="350px" objectFit="cover" src={presindetial.image} />
      <CardBody>
        <Heading>{presindetial.name}</Heading>
        <HStack justifyContent="space-between">
          <Button colorScheme="blue" onClick={() => voteForPresidential(index)}>
            Vote
          </Button>
          <Heading>votes: {presindetial.votes}</Heading>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default MPsCard;
