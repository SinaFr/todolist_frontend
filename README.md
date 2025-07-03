# Introduction

This app is a todo list, where users can create an account and login to create, update and delete tasks.
The application has a backend and a frontend. This README is about the frontend.

# Technologies

- **Frontend**: React (Type Script)
- **Authentification**: JWT
- **Build-Tools**: Node, npm

# Getting started

## Requirements

- Node.js 18+

## Project Setup

- Clone Project

## Start frontend

To start the frontend enter in the frontend root directory:

```bash
npm run dev
```

It is also possible to configure Docker Compose and start it with:

```bash
docker-compose up -- build
```

# Authentification

The login takes place via /login, JWT is stored as HTTP-Only-Cookie (jwt).
The token is send automatically with every request. Users, that are not logged in get 401 Unauthorized.
