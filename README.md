# Naukri Clone

A modern clone of Naukri.com, India's leading job portal, built with React, TypeScript, and Node.js.

## Features

- **Job Search**: Search for jobs by keyword, location, company, and more
- **Company Profiles**: Browse company information and job listings
- **Resume Database**: Access a database of candidate resumes
- **Services**: Explore premium services for recruiters
- **User Authentication**: Register and login functionality for job seekers and recruiters
- **Recruiter Dashboard**: Post and manage job listings

## Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- React Router
- Context API for state management

### Backend

- Node.js
- Express
- MongoDB
- JWT Authentication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/naukri-clone.git
cd naukri-clone
```

2. Install frontend dependencies

```bash
npm install
```

3. Install backend dependencies

```bash
cd backend
npm install
```

4. Create a `.env` file in the backend directory with the following variables:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

5. Start the development servers

Frontend:

```bash
npm run dev
```

Backend:

```bash
cd backend
npm run dev
```

## Project Structure

```
naukri-clone/
├── backend/              # Backend code
│   ├── src/
│   │   ├── controllers/ # Request handlers
│   │   ├── models/      # Database models
│   │   ├── routes/      # API routes
│   │   └── middleware/  # Custom middleware
│   └── package.json
├── src/                 # Frontend code
│   ├── components/      # Reusable components
│   ├── pages/           # Page components
│   ├── context/         # Context providers
│   └── App.tsx          # Main application component
└── package.json
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- This project is a clone of [Naukri.com](https://www.naukri.com/)
- Built for educational purposes only
