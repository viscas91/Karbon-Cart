import { sequelize } from "./config/db.config";
import { app } from "./config/express.config";
import { systemLogs } from "./utils/Logger";

async function initializeDatabase() {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
  
      // Synchronize the database by creating tables based on the models
      await sequelize.sync({ force: false }); // Set force: true to drop tables and recreate them (use with caution)
  
      console.log('Database synchronized.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  initializeDatabase();
  
app.listen(3000, () => {
console.log(`
==================================
🚀 Server running on port ${3000}!🚀
==================================
`)
systemLogs.info(`
==================================
🚀 Server running on port ${3000}!🚀
==================================
`)
}).on('error', (err) => {
  console.error('Server error:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Handle the error or log additional information
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Handle the error or log additional information
});