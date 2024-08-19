import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import ColorModeSwitch from "../components/ColorModeSwitch";

const MobileMenu = ({ isOpen, onClose }: any) => {
  const drawerBg = useColorModeValue("background.light", "background.dark");
  const headerBg = useColorModeValue("primary.500", "primary.700");
  const buttonHoverBg = useColorModeValue("primary.100", "primary.300");
  const textColor = useColorModeValue("text.light", "text.dark");

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent bg={drawerBg}>
          <DrawerHeader bg={headerBg} color="white" borderBottomWidth="1px">
            Menu
          </DrawerHeader>
          <DrawerBody>
            <VStack align="start" spacing={4}>
              <Button
                variant="ghost"
                onClick={onClose}
                _hover={{ bg: buttonHoverBg }}
                color={textColor}
              >
                Home
              </Button>
              <Button
                variant="ghost"
                onClick={onClose}
                _hover={{ bg: buttonHoverBg }}
                color={textColor}
              >
                Tasks
              </Button>
              <Button
                variant="ghost"
                onClick={onClose}
                _hover={{ bg: buttonHoverBg }}
                color={textColor}
              >
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
