import React, { useState } from 'react';
import {
  Box,
  Checkbox,
  Text,
  IconButton,
  HStack,
  useColorModeValue,
  Badge,
  VStack,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const hoverBgColor = useColorModeValue('gray.100', 'gray.600');

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'red',
      medium: 'orange',
      low: 'green',
    };
    return colors[priority] || 'gray';
  };

  const getCategoryColor = (category) => {
    const colors = {
      work: 'blue',
      personal: 'purple',
      shopping: 'cyan',
      health: 'green',
      education: 'yellow',
    };
    return colors[category] || 'gray';
  };

  const formatDueDate = (dueDate) => {
    if (!dueDate) return null;
    const date = new Date(dueDate);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  return (
    <Box
      p={4}
      bg={isHovered ? hoverBgColor : bgColor}
      borderRadius="md"
      transition="all 0.2s"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      position="relative"
      borderLeft="4px solid"
      borderLeftColor={`${getPriorityColor(task.priority)}.400`}
    >
      <HStack spacing={4} align="flex-start">
        <Checkbox
          isChecked={task.completed}
          onChange={(e) => onUpdate({ ...task, completed: e.target.checked })}
          size="lg"
        />
        <VStack align="stretch" flex="1" spacing={2}>
          <Text
            fontSize="md"
            fontWeight="medium"
            textDecoration={task.completed ? 'line-through' : 'none'}
            color={task.completed ? 'gray.500' : 'inherit'}
          >
            {task.title}
          </Text>
          <HStack spacing={2} flexWrap="wrap">
            <Badge colorScheme={getCategoryColor(task.category)}>
              {task.category}
            </Badge>
            <Badge colorScheme={getPriorityColor(task.priority)}>
              {task.priority}
            </Badge>
            {task.dueDate && (
              <Badge
                colorScheme={isOverdue(task.dueDate) && !task.completed ? 'red' : 'gray'}
              >
                {formatDueDate(task.dueDate)}
              </Badge>
            )}
          </HStack>
        </VStack>
        <IconButton
          icon={<DeleteIcon />}
          variant="ghost"
          colorScheme="red"
          size="sm"
          onClick={() => onDelete(task.id)}
          opacity={isHovered ? 1 : 0}
          transition="opacity 0.2s"
          aria-label="Delete task"
        />
      </HStack>
    </Box>
  );
};

export default TaskItem;
