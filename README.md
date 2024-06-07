# LumenTask Frontend

This project is the frontend for the LumenTask application, a task management
tool designed to streamline project workflows and enhance productivity. The
frontend is built using modern web technologies to provide a smooth and
efficient user experience.

## Project Overview

The LumenTask Frontend is developed with React, offering a robust and dynamic
interface for users to manage their tasks. The application includes several key
features:

- Task creation and management
- Real-time updates
- User authentication
- Responsive design

## Features

### Task Management

Users can create, edit, and delete tasks. Each task can be assigned to a
specific project and includes the following fields:

- **Title**
- **Description**
- **Due Date**
- **Priority**
- **Status**

### Real-Time Updates

The application uses WebSockets to provide real-time updates to the task list,
ensuring that users always have the most up-to-date information.

### User Authentication

User authentication is handled through JWT tokens, ensuring secure access to the
application. Users can register, log in, and manage their sessions securely.

### Responsive Design

The application is fully responsive, providing an optimal experience on both
desktop and mobile devices.

## Technical Details

### Project Structure

The project follows a modular structure to keep the codebase organized and
maintainable. Key directories include:

- `src/components`: Reusable UI components
- `src/pages`: Application pages
- `src/services`: API service modules
- `src/store`: Redux store configuration

### Routing

React Router is used for managing navigation within the application. Key routes
include:

- `/login`: User login page
- `/register`: User registration page
- `/tasks`: Task management dashboard
- `/tasks/:id`: Task details page

### State Management

Redux is used for state management, ensuring a consistent and predictable state
across the application. Key features include:

- **Task List**: Centralized task data
- **User Authentication**: Managed through Redux state

## Getting Started

### Prerequisites

- **Node.js** (LTS version recommended)
- **npm** or **yarn**

### Installation

Clone the repository and install dependencies:

git clone https://github.com/AleksMarkov/LumenTask-front.git cd LumenTask-front
npm install

### Running the Application

Start the development server:

npm start

Visit `http://localhost:3000` in your browser to view the application.

### Building for Production

To build the application for production, run:

npm run build

The production-ready files will be in the `build` directory.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to
discuss any changes.

## License

This project is licensed under the MIT License.

Contributions are welcome! Please submit a pull request or open an issue to
discuss any changes.
