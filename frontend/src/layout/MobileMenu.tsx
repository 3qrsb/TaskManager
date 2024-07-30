import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
  VStack,
} from "@chakra-ui/react";
import SearchBar from "../components/Searchbar";
import ColorModeSwitch from "../components/ColorModeSwitch";

const MobileMenu = ({ isOpen, onClose }: any) => {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <VStack align="start" spacing={4}>
              <SearchBar onSearch={(query: string) => console.log(query)} />
              <Button variant="ghost" onClick={onClose}>
                Home
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Tasks
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Profile
              </Button>
              <ColorModeSwitch />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default MobileMenu;
