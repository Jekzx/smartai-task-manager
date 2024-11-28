import { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Container,
  Heading,
  VStack,
  useToast,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
  HStack,
} from '@chakra-ui/react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import AISuggestions from './components/AISuggestions';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const toast = useToast();

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTask) => {
    setTasks([newTask, ...tasks]);
    toast({
      title: 'Task added',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map((task) => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    toast({
      title: 'Task deleted',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const overdue = tasks.filter(task => 
      task.dueDate && 
      new Date(task.dueDate) < new Date() && 
      !task.completed
    ).length;

    return { total, completed, overdue };
  };

  const stats = getTaskStats();

  return (
    <ChakraProvider>
      <Box minH="100vh" bg="gray.100" py={16}>
        <Container maxW="container.md">
          <VStack spacing={8}>
            <Box textAlign="center">
              <Heading as="h1" size="xl" mb={2}>
                Smart Task Manager
              </Heading>
              <Text color="gray.600" fontSize="lg">
                Organize your tasks efficiently with AI-powered suggestions
              </Text>
              <HStack spacing={4} justify="center" mt={4}>
                <Badge colorScheme="blue" p={2} borderRadius="md">
                  Total: {stats.total}
                </Badge>
                <Badge colorScheme="green" p={2} borderRadius="md">
                  Completed: {stats.completed}
                </Badge>
                {stats.overdue > 0 && (
                  <Badge colorScheme="red" p={2} borderRadius="md">
                    Overdue: {stats.overdue}
                  </Badge>
                )}
              </HStack>
            </Box>

            <Tabs width="100%" colorScheme="blue" variant="enclosed-colored">
              <TabList>
                <Tab>Add Task</Tab>
                <Tab>AI Suggestions</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <TaskForm onAddTask={handleAddTask} />
                </TabPanel>
                <TabPanel>
                  <AISuggestions onAddTask={handleAddTask} tasks={tasks} />
                </TabPanel>
              </TabPanels>
            </Tabs>

            <TaskList
              tasks={tasks}
              onTaskUpdate={handleUpdateTask}
              onTaskDelete={handleDeleteTask}
            />
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
