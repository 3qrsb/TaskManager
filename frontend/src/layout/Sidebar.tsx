import React, { useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  MdAddTask,
  MdOutlineNoteAdd,
  MdOutlineDashboard,
  MdOutlineCalendarMonth,
} from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link as RouterLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const handleToggle = () => setIsCollapsed(!isCollapsed);

  const iconSize = 24;
  const bgHover = useColorModeValue("blue.200", "blue.700");
  const bgColor = useColorModeValue("gray.200", "gray.900");
  const activeBg = useColorModeValue("blue.400", "blue.600");
  const activeTextColor = useColorModeValue("white", "gray.800");

  const sections = [
    { icon: MdOutlineDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: MdAddTask, label: "Tasks", path: "/tasks" },
    { icon: MdOutlineNoteAdd, label: "Notes", path: "/note" },
    { icon: MdOutlineCalendarMonth, label: "Calendar", path: "/calendar" },
    { icon: FaRegTrashAlt, label: "Trash", path: "/trash" },
  ];

  return (
    <Box
      as="nav"
      bg={bgColor}
      w={{ base: "100%", md: isCollapsed ? "60px" : "200px" }}
      transition="width 0.3s"
      minH={{ base: "auto", md: "100vh" }}
      maxH="100vh"
      p={{ base: "2", md: "4" }}
      position={{ base: "relative", md: "sticky" }}
      top="0"
      overflowY={{ base: "auto", md: "hidden" }}
    >
      <Flex
        justify={isCollapsed ? "center" : "flex-end"}
        mb={4}
        display={{ base: "none", md: "flex" }}
        align={isCollapsed ? "center" : "flex-start"}
      >
        <Tooltip
          label={isCollapsed ? "Expand" : "Collapse"}
          placement="right"
          openDelay={1000}
        >
          <IconButton
            icon={isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
            aria-label="Toggle Sidebar"
            onClick={handleToggle}
            variant="ghost"
            _hover={{ bg: useColorModeValue("gray.300", "gray.600") }}
          />
        </Tooltip>
      </Flex>

      <Flex
        direction={{ base: "row", md: "column" }}
        align="center"
        justify={{ base: "space-around", md: "flex-start" }}
        gap={3}
        p={{ base: "1", md: "0" }}
      >
        {sections.map((section) => {
          const isActive = location.pathname === section.path;
          return (
            <Flex
              key={section.label}
              align="center"
              justify={isCollapsed ? "center" : "flex-start"}
              cursor="pointer"
              _hover={{ bg: bgHover }}
              bg={isActive ? activeBg : "transparent"}
              color={isActive ? activeTextColor : "inherit"}
              w="100%"
              px={
                isCollapsed ? { base: "3", md: "5" } : { base: "4", md: "16px" }
              }
              py="10px"
              borderRadius="md"
              as={RouterLink}
              to={section.path}
              direction="row"
              transition="background-color 0.3s ease"
              position="relative"
            >
              <Box
                boxSize={`${iconSize}px`}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <section.icon size={iconSize} />
              </Box>
              {!isCollapsed && (
                <Text ml={4} fontSize="md" whiteSpace="nowrap">
                  {section.label}
                </Text>
              )}
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
};

export default Sidebar;
