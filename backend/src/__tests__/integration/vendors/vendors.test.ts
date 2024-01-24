import request from "supertest";
import { sequelize } from "../../../config/db.config";
import { app } from "../../../config/express.config";

let agent = request.agent(app);

describe('Testing categories', () => {
    beforeAll(async () => {
        // Run migrations before all tests
        await sequelize.sync({ force: true }); // 'force: true' will recreate tables
    });
      
    afterAll(async () => {
        // Close the Sequelize connection after all tests
        await sequelize.close();
    });

    it('Should create vendor', () => {
        
    });

});