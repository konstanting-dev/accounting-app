import { configureApp } from './app';
import dotenv from 'dotenv';

const port = process.env.SERVER_PORT || 4000;

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1); // Exit with error code
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection:', reason);
  process.exit(1);
});

(async () => {
  try {
    const app = await configureApp();
    return app.listen(port);
  } catch (error) {
    console.error('Server startup failed!');
    console.error(error);
  }
})();
