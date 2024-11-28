import React, { useState } from 'react';
import {
  Box,
  Input,
  Button,
  VStack,
  Select,
  useToast,
  HStack,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

const CATEGORIES = ['work', 'personal', 'shopping', 'health', 'education'];

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('personal');
  const [dueDate, setDueDate] = useState('');
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast({
        title: 'Error',
        description: 'Task title cannot be empty',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const newTask = {
      id: uuidv4(),
      title: title.trim(),
      priority,
      category,
      dueDate: dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    onAddTask(newTask);
    setTitle('');
    setPriority('medium');
    setDueDate('');
  };

  return (
    <Box as="form" onSubmit={handleSubmit} width="100%">
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Task Title</FormLabel>
          <Input
            placeholder="Enter your task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            size="lg"
          />
        </FormControl>

        <HStack width="100%" spacing={4}>
          <FormControl>
            <FormLabel>Category</FormLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              size="lg"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Priority</FormLabel>
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              size="lg"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </Select>
          </FormControl>
        </HStack>

        <FormControl>
          <FormLabel>Due Date</FormLabel>
          <Input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            size="lg"
          />
        </FormControl>

        <Button
          colorScheme="blue"
          type="submit"
          size="lg"
          width="100%"
        >
          Add Task
        </Button>
      </VStack>
    </Box>
  );
};

export default TaskForm;
