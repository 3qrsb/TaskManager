import React from "react";
import { Input, Textarea, Select, Grid, GridItem } from "@chakra-ui/react";
import { Task } from "../../redux/tasksSlice";

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
  <Grid templateColumns="150px 1fr" gap={4}>
    <GridItem>Title:</GridItem>
    <GridItem>
      <Input
        value={taskData.title || ""}
        onChange={(e) => handleInputChange("title", e.target.value)}
      />
    </GridItem>

    <GridItem>Description:</GridItem>
    <GridItem>
      <Textarea
        value={taskData.description || ""}
        onChange={(e) => handleInputChange("description", e.target.value)}
      />
    </GridItem>

    <GridItem>Stage:</GridItem>
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

    <GridItem>Category:</GridItem>
    <GridItem>
      <Select
        value={taskData.category || ""}
        onChange={(e) => handleInputChange("category", e.target.value)}
      >
        <option value="" disabled>
          Select a category
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.title}
          </option>
        ))}
      </Select>
    </GridItem>

    <GridItem>Due Date:</GridItem>
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
  </Grid>
);

export default TaskFormFields;
