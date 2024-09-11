# Getting Started with Accounting Application

Dockerized React application with Node.js (Express) and ImmuDB. It allows to create account records in ImmuDB Vault and read it.

## Development

For development, there are separate Dockerfiles for client, server and also nginx server which is configured as a reverse proxy server.

1.  Set up environment variables by creating `.env` from `.env.example`

2.  Start server and client:

```
    docker compose up --build
```

3.  Navigate to http://localhost:8000 in your browser to use the application

## Production

For production, project uses the Dockerfile at the root of the repo. It creates a static build of the client React app and runs Express inside server, which handles both the API and serving of React files.

1.  Set up environment variables by creating `.env` from `.env.example`

2.  Build server and client for production:

```
        docker compose -f docker-compose.prod.yml up
```
