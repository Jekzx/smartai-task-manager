import React from 'react';
import { Box, VStack, Text, useColorModeValue } from '@chakra-ui/react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onTaskUpdate, onTaskDelete }) => {
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Box
      w="100%"
      bg={bgColor}
      borderRadius="lg"
      p={4}
      boxShadow="sm"
      minH="300px"
    >
      <VStack spacing={4} align="stretch">
        {tasks.length === 0 ? (
          <Text color="gray.500" textAlign="center">
            No tasks yet. Add your first task!
          </Text>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdate={onTaskUpdate}
              onDelete={onTaskDelete}
            />
          ))
        )}
      </VStack>
    </Box>
  );
};

export default TaskList;
