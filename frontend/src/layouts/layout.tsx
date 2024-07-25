import { Grid, GridItem, Show } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import "./Layout.css";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
          md: `"nav nav" "side main"`,
        }}
        templateColumns={{
          base: "1fr",
          md: "200px 1fr",
        }}
      >
        <GridItem bg="gray" area="nav" className="fixed-nav" marginBottom={60}>
          <NavBar />
        </GridItem>
        <Show above="md">
          <GridItem
            area="side"
            className="fixed-sidebar"
            // paddingX={2}
            marginTop="55px"
          >
            <Sidebar />
          </GridItem>
        </Show>

        <GridItem area="main" marginTop="90px">
          <Outlet />
        </GridItem>
      </Grid>
    </>
  );
};

export default Layout;
