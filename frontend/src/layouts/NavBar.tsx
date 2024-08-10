import { HStack, Image } from "@chakra-ui/react";
import logo from "../../src/assets/logo.jpg";
import ColorModeSwitch from "../components/ColorModeSwitch";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const NavBar = () => {
  const { isAutheticated } = useAuth();
  return (
    <HStack
      padding="10px"
      border="2px solid gray"
      borderRadius={20}
      justifyContent="space-between"
    >
      <Image
        src={logo}
        boxSize="55px"
        borderRadius="30px"
        marginTop="1px"
        marginBottom="1px"
      />
      <HStack justifyContent="space-between">
        <NavLink to="/" className="mx-5">
          Home
        </NavLink>
        <NavLink to="/presidentials" className="mx-5">
          Vote
        </NavLink>
        <NavLink to="/register">Register Voters</NavLink>
      </HStack>
      <HStack className="mx-4">
        {isAutheticated ? (
          <NavLink to="/login">Logout</NavLink>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
        <ColorModeSwitch />
      </HStack>
    </HStack>
  );
};

export default NavBar;
