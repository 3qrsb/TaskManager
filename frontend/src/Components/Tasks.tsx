import React, { useState, useEffect } from "react";
import { Container, List, Segment } from "semantic-ui-react";

interface Task {
  id: number;
  title: string;
  description: string;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:8000/task/tasks/");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTasks(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <Segment>
        <List divided relaxed>
          {tasks.map((task) => (
            <List.Item key={task.id}>
              <List.Content>
                <List.Header>{task.title}</List.Header>
                <List.Description>{task.description}</List.Description>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Segment>
    </Container>
  );
};

export default Tasks;
