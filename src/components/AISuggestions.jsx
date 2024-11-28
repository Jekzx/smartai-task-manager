import React, { useState } from 'react';
import {
  Box,
  Button,
  Text,
  VStack,
  useToast,
  Spinner,
  Badge,
  List,
  ListItem,
  IconButton,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { v4 as uuidv4 } from 'uuid';
import { GoogleGenerativeAI } from '@google/generative-ai';

const AISuggestions = ({ onAddTask, tasks }) => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);
  const toast = useToast();

  const generateSuggestions = async () => {
    setLoading(true);
    setError(null);
    
    // Check if API key is configured
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      setError('Gemini API key is not configured. Please add your API key to the .env file.');
      setLoading(false);
      return;
    }

    try {
      // Initialize Gemini AI
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // Create a prompt based on existing tasks
      const existingTasksContext = tasks.length > 0
        ? tasks.slice(0, 5).map(task => task.title).join('\n')
        : 'Example task: Review project documentation';

      const prompt = `Based on these existing tasks:
${existingTasksContext}

Please suggest 3 related tasks that might be helpful. Return them in this exact JSON format:
[
  {
    "title": "task title here",
    "category": "one of: work, personal, shopping, health, or education",
    "priority": "one of: low, medium, high"
  }
]

Ensure the response is ONLY the JSON array, with no additional text.`;

      console.log('Sending request to Gemini...');
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      console.log('Gemini Response:', text);

      try {
        const suggestedTasks = JSON.parse(text);
        if (Array.isArray(suggestedTasks) && suggestedTasks.length > 0) {
          setSuggestions(suggestedTasks);
        } else {
          throw new Error('Invalid response format from AI');
        }
      } catch (parseError) {
        console.error('Error parsing Gemini response:', parseError);
        throw new Error('Failed to parse AI suggestions');
      }
    } catch (error) {
      console.error('Error generating suggestions:', error);
      setError(error.message || 'Error generating suggestions. Please try again.');
      toast({
        title: 'Error',
        description: error.message || 'Failed to generate suggestions',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddSuggestion = (suggestion) => {
    const newTask = {
      id: uuidv4(),
      title: suggestion.title,
      category: suggestion.category,
      priority: suggestion.priority,
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: null,
    };
    onAddTask(newTask);
    setSuggestions(suggestions.filter(s => s.title !== suggestion.title));
  };

  return (
    <Box w="100%" p={4} borderRadius="lg" bg="white" boxShadow="sm">
      <VStack spacing={4} align="stretch">
        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {error}
          </Alert>
        )}
        
        <Button
          onClick={generateSuggestions}
          colorScheme="teal"
          isLoading={loading}
          loadingText="Generating suggestions..."
        >
          Get AI Suggestions
        </Button>
        
        {loading && (
          <Box textAlign="center" py={4}>
            <Spinner size="xl" color="teal.500" />
            <Text mt={2} color="gray.500">
              Generating smart suggestions...
            </Text>
          </Box>
        )}
        
        {suggestions.length > 0 && (
          <List spacing={3}>
            {suggestions.map((suggestion, index) => (
              <ListItem
                key={index}
                p={3}
                bg="gray.50"
                borderRadius="md"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Text fontWeight="medium">{suggestion.title}</Text>
                  <Box>
                    <Badge colorScheme="purple" mr={2}>
                      {suggestion.category}
                    </Badge>
                    <Badge
                      colorScheme={
                        suggestion.priority === 'high'
                          ? 'red'
                          : suggestion.priority === 'medium'
                          ? 'orange'
                          : 'green'
                      }
                    >
                      {suggestion.priority}
                    </Badge>
                  </Box>
                </Box>
                <IconButton
                  icon={<AddIcon />}
                  colorScheme="green"
                  size="sm"
                  onClick={() => handleAddSuggestion(suggestion)}
                  aria-label="Add suggestion"
                />
              </ListItem>
            ))}
          </List>
        )}
      </VStack>
    </Box>
  );
};

export default AISuggestions;
