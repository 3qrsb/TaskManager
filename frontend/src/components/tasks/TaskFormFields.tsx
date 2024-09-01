import React from "react";
import {
  Input,
  Textarea,
  Select,
  Grid,
  GridItem,
  HStack,
  Switch,
  Divider,
  Icon,
  Box,
  Button,
} from "@chakra-ui/react";
import { LiaTasksSolid } from "react-icons/lia";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { HiFlag } from "react-icons/hi";
import { CiShoppingTag, CiEdit, CiWarning } from "react-icons/ci";
import { Task } from "../../redux/tasksSlice";
import { getPriorityColorScheme } from "../../utils/taskUtils";

interface TaskFormFieldsProps {
  taskData: Partial<Task>;
  categories: { id: number; title: string }[];
  handleInputChange: (field: keyof Task, value: any) => void;
  isEditMode?: boolean;
}

const TaskFormFields: React.FC<TaskFormFieldsProps> = ({
  taskData,
  categories,
  handleInputChange,
  isEditMode = true,
}) => (
  <Grid templateColumns={{ base: "1fr", md: "150px 1fr" }} gap={4}>
    <GridItem colSpan={2} mt={4} mb={2}>
      <Input
        placeholder="Title"
        value={taskData.title || ""}
        onChange={(e) => handleInputChange("title", e.target.value)}
      />
    </GridItem>

    <GridItem colSpan={2}>
      <Divider />
    </GridItem>

    <GridItem display="flex" alignItems="flex-start">
      <Icon as={CiEdit} mr={2} boxSize={5} />
      <Box as="label">Description</Box>
    </GridItem>
    <GridItem>
      <Textarea
        value={taskData.description || ""}
        onChange={(e) => handleInputChange("description", e.target.value)}
        resize="none"
        height="85px"
        overflowY="auto"
      />
    </GridItem>

    {isEditMode && (
      <>
        <GridItem display="flex" alignItems="center">
          <Icon as={LiaTasksSolid} mr={2} boxSize={5} />
          <Box as="label">Stage</Box>
        </GridItem>
        <GridItem>
          <Select
            value={taskData.stage || ""}
            onChange={(e) => handleInputChange("stage", e.target.value)}
            isDisabled={!isEditMode}
          >
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </Select>
        </GridItem>
      </>
    )}

    <GridItem display="flex" alignItems="center">
      <Icon as={CiShoppingTag} mr={2} boxSize={5} />
      <Box as="label">Category</Box>
    </GridItem>
    <GridItem>
      <Select
        value={taskData.category || ""}
        onChange={(e) =>
          handleInputChange(
            "category",
            e.target.value === "none" ? null : e.target.value
          )
        }
      >
        <option value="none">Select a category</option>

        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.title}
          </option>
        ))}
      </Select>
    </GridItem>

    <GridItem display="flex" alignItems="center">
      <Icon as={HiOutlineCalendarDays} mr={2} boxSize={5} />
      <Box as="label">Due Date</Box>
    </GridItem>
    <GridItem>
      <Input
        type="date"
        value={
          taskData.completion_date
            ? new Date(taskData.completion_date).toISOString().substr(0, 10)
            : ""
        }
        onChange={(e) => handleInputChange("completion_date", e.target.value)}
      />
    </GridItem>

    <GridItem display="flex" alignItems="center">
      <Icon as={CiWarning} mr={2} boxSize={5} />
      <Box as="label">Priority</Box>
    </GridItem>
    <GridItem>
      <HStack spacing={4}>
        {[
          { label: "Low", value: 1 },
          { label: "Medium", value: 2 },
          { label: "High", value: 3 },
        ].map((priority) => (
          <Button
            key={priority.value}
            onClick={() => {
              if (Number(taskData.priority) === priority.value) {
                handleInputChange("priority", null);
              } else {
                handleInputChange("priority", priority.value);
              }
            }}
            colorScheme={getPriorityColorScheme(priority.value)}
            variant={
              Number(taskData.priority) === priority.value ? "solid" : "outline"
            }
            size="sm"
            borderRadius={9}
          >
            {priority.label}
          </Button>
        ))}
      </HStack>
    </GridItem>

    <GridItem display="flex" alignItems="center">
      <Icon
        as={HiFlag}
        mr={2}
        color={taskData.isFlagged ? "red" : ""}
        boxSize={5}
      />
      <Box as="label">Flag</Box>
    </GridItem>
    <GridItem>
      <Switch
        isChecked={taskData.isFlagged}
        onChange={(e) => handleInputChange("isFlagged", e.target.checked)}
      />
    </GridItem>

    <GridItem colSpan={2}>
      <Divider />
    </GridItem>
  </Grid>
);

export default TaskFormFields;
