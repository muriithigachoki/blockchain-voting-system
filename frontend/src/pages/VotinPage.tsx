import { Grid, GridItem } from "@chakra-ui/react";
import PresidentialGrid from "../components/Presidetials/PresidetialGrid";

const VotinPage = () => {
  return (
    <>
      <Grid>
        <GridItem>
          <PresidentialGrid />
        </GridItem>
        <GridItem></GridItem>
        <GridItem></GridItem>
      </Grid>
    </>
  );
};

export default VotinPage;
