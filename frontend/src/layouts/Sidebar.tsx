import { Link } from "react-router-dom";
import { Button, Heading, Stack } from "@chakra-ui/react";

const Sidebar = () => {
  return (
    <>
      <Stack>
        <Heading color="blue" fontSize="lg">
          Cardidates
        </Heading>
        <Button textAlign="left" variant="link">
          <Link to="/presidentials">Presidential</Link>
        </Button>
        <Button textAlign="left" variant="link">
          <Link to="/governor">Governors</Link>
        </Button>
        <Button textAlign="left" variant="link">
          <Link to="/presidentials">Parliments</Link>
        </Button>
      </Stack>
    </>
  );
};

export default Sidebar;
