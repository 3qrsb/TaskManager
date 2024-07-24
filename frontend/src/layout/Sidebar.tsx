import React, { useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  VStack,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  MdAddTask,
  MdOutlineNoteAdd,
  MdOutlineDashboard,
  MdOutlineCalendarMonth,
} from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleToggle = () => setIsCollapsed(!isCollapsed);

  const iconSize = 13;
  const bgHover = useColorModeValue("blue.200", "gray.700");
  const bgColor = useColorModeValue("gray.100", "gray.800");

  const sections = [
    { icon: MdOutlineDashboard, label: "Dashboard" },
    { icon: MdAddTask, label: "Tasks" },
    { icon: MdOutlineNoteAdd, label: "Note" },
    { icon: MdOutlineCalendarMonth, label: "Calendar" },
    { icon: FaRegTrashAlt, label: "Trash" },
  ];

  return (
    <Box
      as="nav"
      bg={bgColor}
      w={isCollapsed ? "60px" : "200px"}
      transition="width 0.2s"
      h="100vh"
      p={4}
      shadow="md"
      position="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <Tooltip
        label={isCollapsed ? "Expand" : "Collapse"}
        placement="right"
        hasArrow
      >
        <IconButton
          icon={
            isCollapsed ? (
              <FaChevronRight size={iconSize} />
            ) : (
              <FaChevronLeft size={iconSize} />
            )
          }
          aria-label="Toggle Sidebar"
          onClick={handleToggle}
          position="absolute"
          top={10}
          right={isCollapsed ? "-11px" : "-11px"}
          size="sm"
          bg={bgColor}
          zIndex="10"
          className="toggle-btn"
          opacity={isOpen ? 1 : 0}
          _hover={{ bg: bgHover }}
          transition="opacity 0.2s"
          minWidth={5}
          height={10}
        />
      </Tooltip>
      <Flex direction="column" align={isCollapsed ? "center" : "flex-start"}>
        <VStack spacing={4} align={isCollapsed ? "center" : "flex-start"}>
          {sections.map((section) => (
            <Flex
              key={section.label}
              align="center"
              w="full"
              cursor="pointer"
              _hover={{ bg: bgHover }}
              p={2}
              borderRadius="md"
            >
              <section.icon size="24" />
              {!isCollapsed && (
                <Text ml={4} fontSize="md">
                  {section.label}
                </Text>
              )}
            </Flex>
          ))}
        </VStack>
      </Flex>
    </Box>
  );
};

export default Sidebar;
