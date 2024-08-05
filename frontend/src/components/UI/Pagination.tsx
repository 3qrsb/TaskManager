import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [jumpPage, setJumpPage] = useState<number>(currentPage);

  const pages = [];

  const handleJumpToPage = () => {
    if (jumpPage >= 1 && jumpPage <= totalPages) {
      onPageChange(jumpPage);
    }
    onClose();
  };

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 2 && i <= currentPage + 2)
    ) {
      pages.push(i);
    } else if (i === currentPage - 3 || i === currentPage + 3) {
      pages.push("...");
    }
  }

  return (
    <Box mt={4}>
      <HStack spacing={2}>
        <IconButton
          icon={<ChevronLeftIcon />}
          aria-label="Previous"
          onClick={() => onPageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
        />
        {pages.map((page, index) =>
          page === "..." ? (
            <Button key={index} onClick={onOpen}>
              ...
            </Button>
          ) : (
            <Button
              key={page}
              onClick={() => onPageChange(page as number)}
              colorScheme={page === currentPage ? "blue" : "gray"}
            >
              {page}
            </Button>
          )
        )}
        <IconButton
          icon={<ChevronRightIcon />}
          aria-label="Next"
          onClick={() => onPageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages}
        />
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Jump to Page</ModalHeader>
          <ModalBody>
            <Input
              type="number"
              value={jumpPage}
              onChange={(e) => setJumpPage(parseInt(e.target.value))}
              min={1}
              max={totalPages}
              placeholder={`Enter page number (1-${totalPages})`}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleJumpToPage}>
              Go
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Pagination;
