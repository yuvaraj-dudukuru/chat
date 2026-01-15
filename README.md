# Real-time Chat Application

## Overview

This is a full-stack real-time chat application built with modern web technologies. The application demonstrates best practices for implementing real-time bidirectional communication between clients and servers.

## Technology Stack

**Frontend:**
- React with TypeScript
- Tailwind CSS for styling
- Socket.io client library for real-time communication

**Backend:**
- Node.js with Express
- Socket.io for WebSocket support

## Features

- Real-time message delivery
- User authentication and registration
- Typing indicators
- Message read receipts
- User presence awareness
- Responsive design

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Install dependencies for both client and server:
   ```bash
   # Client
   cd client
   npm install
   
   # Server
   cd server
   npm install
   ```

2. Start the development servers:
   ```bash
   # Client
   npm start
   
   # Server
   npm start
   ```

The application will be available at `http://localhost:3000`.

## Development

This project uses Docker for containerized deployment. Refer to the `docker-compose.yml` for production setup instructions.
