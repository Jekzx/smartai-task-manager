# 🚀 Smart Task Manager with AI

A modern, AI-powered task management application built with React and Google's Gemini AI. This application helps you organize your tasks efficiently with intelligent task suggestions and a clean, intuitive interface.

## ✨ Features

### 🎯 Core Features
- **Task Management**
  - Create, update, and delete tasks
  - Set task priorities (Low, Medium, High)
  - Categorize tasks (Work, Personal, Shopping, Health, Education)
  - Set due dates for tasks
  - Mark tasks as completed

### 🤖 AI Integration
- **Smart Task Suggestions**
  - AI-powered task recommendations based on your existing tasks
  - Context-aware suggestions using Google's Gemini AI
  - One-click task addition from suggestions

### 💫 User Experience
- **Modern UI/UX**
  - Clean and responsive design
  - Real-time updates
  - Intuitive task organization
  - Visual priority indicators
  - Category color coding

### 📊 Task Tracking
- Task completion statistics
- Overdue task monitoring
- Category-based organization
- Priority-based visual indicators

## 🛠️ Technologies Used

- **Frontend Framework**: React with Vite
- **UI Components**: Chakra UI
- **AI Integration**: Google Gemini AI
- **State Management**: React Hooks
- **Styling**: Chakra UI + Custom CSS
- **Data Persistence**: Local Storage
- **Development**: 
  - ESLint for code quality
  - GitHub Actions for deployment
  - GitHub Pages for hosting

## 🚀 Live Demo

Check out the live demo: [Smart Task Manager](https://jekzx.github.io/smartai-task-manager/)

## 🏗️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Jekzx/smartai-task-manager.git
   cd smartai-task-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the root directory
   - Add your Gemini API key:
     ```
     VITE_GEMINI_API_KEY=your_gemini_api_key_here
     ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🎮 How to Use

1. **Adding Tasks**
   - Click on "Add Task" tab
   - Enter task title
   - Select category and priority
   - Set due date (optional)
   - Click "Add Task"

2. **Getting AI Suggestions**
   - Click on "AI Suggestions" tab
   - Click "Get AI Suggestions"
   - Review suggested tasks
   - Click the "+" button to add suggestions you like

3. **Managing Tasks**
   - Check the checkbox to mark tasks as complete
   - Hover over tasks to see delete option
   - Tasks are automatically saved to local storage

4. **Task Organization**
   - Tasks are organized by creation date
   - Color-coded by priority and category
   - Overdue tasks are highlighted

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

Created by [Jekzx](https://github.com/Jekzx)

---

⭐️ If you find this project useful, please consider giving it a star on GitHub!
