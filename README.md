# File Sharing App

A modern file sharing application built with React and Node.js that allows users to upload files and share them via QR codes or unique codes.

## Features

- File upload with drag and drop
- QR code generation for easy sharing
- Unique code generation for file access
- Modern and responsive UI
- Secure file sharing

## Tech Stack

- Frontend: React.js
- Backend: Node.js, Express.js
- File Handling: Multer
- QR Code Generation: QRCode
- Styling: CSS

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation


1. Install server dependencies:
```bash
cd server
npm install
```

2. Install client dependencies:
```bash
cd ../client
npm install
```

### Running the Application

1. Start the server:
```bash
cd server
npm start
```

2. Start the client:
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Environment Variables

### Client (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

### Server (.env)
```
PORT=5000
NODE_ENV=development
```

## Deployment

The application can be deployed on Vercel:

1. Frontend: Set the `REACT_APP_API_URL` environment variable to your deployed backend URL
2. Backend: Set the `NODE_ENV` environment variable to 'production'
