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

    it('Create category with valid values', async () => {
        let cat = {
            title: 'cat 1',
            icon: 'someico.ico'
        }

        const response = await agent
            .post('/api/v1/categories/create')
            .send(cat)

        expect(response.status).toBe(201)
    });

    it('Does not create category with invalid values', async () => {
        let cat = {
            title: '',
            icon: ''
        }

        const response = await agent
            .post('/api/v1/categories/create')
            .send(cat)

        expect(response.status).toBe(400)
    });

    it('Throws error if category already exists', async () => {
        let cat = {
            title: 'cat 1',
            icon: 'someico.ico'
        }

        const response = await agent
            .post('/api/v1/categories/create')
            .send(cat)

        expect(response.status).toBe(400)
        expect(response.body.errors[0].message).toBe('Category already exists.')
    });
    
    // it('Category is not created with invalid datatypes', async () => {
    //     let cat = {
    //         title: 1,
    //         icon: 1
    //     }

    //     const response = await agent
    //         .post('/api/v1/categories/create')
    //         .send(cat)

    //     console.log(response.body)

    //     expect(response.status).toBe(400)
    //     expect(response.body.errors[0].message).toBe('Category could not be created.')
    // });

    it('category is deleted by slug', async () => {
        let cat_slug = 'cat-1';

        const response = await agent
            .delete(`/api/v1/categories/${cat_slug}`)

        expect(response.status).toBe(204);
    });

    it('Cannot delete category that does not exist', async () => {
        let cat_slug = 'some-cat-1';

        const response = await agent
            .delete(`/api/v1/categories/${cat_slug}`)

        expect(response.status).toBe(404);
        expect(response.body.errors[0].message).toBe('Category Not Found');
    });

    it('Should list all categories', async () => {
        let cat = {
            title: 'cat 1',
            icon: 'someico.ico'
        }

        await agent
            .post('/api/v1/categories/create')
            .send(cat)

        const response = await agent.get('/api/v1/categories')
    });

    it('Category is updated', async () => {
        let cat = {
            title: 'cat 1',
            icon: 'someico.ico'
        }

        await agent
            .post('/api/v1/categories/create')
            .send(cat)

        let cat2 = {
            title: 'cat-2',
            icon: 'someotherion'
        }
        const response = await agent
            .patch('/api/v1/categories/2')
            .send(cat2)
        console.log(response.body)

        expect(response.status).toBe(200)
    });

    it('Cannot update category that does not exists', async () => {
        let cat2 = {
            title: 'cat-3',
            icon: 'cat-3.icon'
        }

        const response = await agent
            .patch('/api/v1/categories/1')
        
        expect(response.status).toBe(404);
        expect(response.body.errors[0].message).toBe('Category does not exist');
    });

    it('Get single category by id', async () => {
        const response = await agent.get('/api/v1/categories/2')

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });

    it('Cannot get category by id which does not exist', async () => {
        const response = await agent.get('/api/v1/categories/3');

        expect(response.status).toBe(404);
        expect(response.body.errors[0].message).toBe('Category not found.')
    });
});