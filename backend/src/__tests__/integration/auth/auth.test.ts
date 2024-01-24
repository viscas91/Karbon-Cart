process.env.NODE_ENV = 'test';

import request from 'supertest';
import { app } from '../../../config/express.config';
import { sequelize } from '../../../config/db.config';
import { UserStatus } from '../../../utils/enums/user.utils';

let agent = request.agent(app);

describe('Express Config', () => {

  beforeAll(async () => {
    // Run migrations before all tests
    await sequelize.sync({ force: true }); // 'force: true' will recreate tables

    // verified email
    const verfiedUser = {
      firstName: 'Carina',
      lastName: 'Moll',
      username: 'carina',
      email: 'carinamoll@example.com',
      role: 'user',
      status: UserStatus.Active,
      avatar: 'avatar.jpg',
      password: 'password123',
      provider: 'email',
      isEmailVerified: true,
      passwordChangedAt: new Date(),
    };

    const inactiveUser = {
      firstName: 'Michael',
      lastName: 'Wood',
      username: 'michael',
      email: 'michael@example.com',
      role: 'user',
      status: UserStatus.InActive,
      avatar: 'avatar.jpg',
      password: 'password123',
      provider: 'email',
      isEmailVerified: true,
      passwordChangedAt: new Date(),
    };

    await agent
      .post('/api/v1/auth/register')
      .send(verfiedUser)

    await agent
      .post('/api/v1/auth/register')
      .send(inactiveUser)
  });

  afterAll(async () => {
    // Close the Sequelize connection after all tests
    await sequelize.close();
  });

  it('should correctly configure the app', async () => {
    const response = await agent.get('/');
    expect(response.status).toBe(200);
  });

  it('should register a new user and send verification email', async () => {
    const mockUser = {
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'john.doe@example.com',
      role: 'user',
      status: 'active',
      avatar: 'avatar.jpg',
      password: 'password123',
      provider: 'email',
      isEmailVerified: false,
      passwordChangedAt: new Date(),
    };

    const response = await agent
      .post('/api/v1/auth/register')
      .send(mockUser);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toContain('A new user John has been registered!');
  });

  it('Should not submit empty form', async () => {
    const mockUser = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      role: '',
      status: '',
      avatar: '',
      password: '',
      provider: '',
      isEmailVerified: false,
      passwordChangedAt: new Date(),
    };

    const response = await agent
      .post('/api/v1/auth/register')
      .send(mockUser);

    expect(response.status).toBe(400);
  });

  it('Should not login user that is not verfied', async () => {
    const user = {
      email: 'john.doe@example.com',
      password: 'password123'
    }

    const response = await agent
      .post('/api/v1/auth/login')
      .send(user)

    expect(response.status).toBe(400)
    expect(response.body.errors[0].message).toContain("You are not verified. Check you email, a verification link was sent when you registered");
  });

  it('Should login user that is verfied', async () => {

    const loginDetail = {
      email: 'carinamoll@example.com',
      password: 'password123'
    }

    const response = await agent
      .post('/api/v1/auth/login')
      .send(loginDetail)

    expect(response.status).toBe(200);
  });

  it('Should not login user with incorrect credentials', async () => {
    const loginDetails = {
      email: 'someuser@example.com',
      password: 'somepassword123'
    }
    const response = await agent
      .post('/api/v1/auth/login')
      .send(loginDetails);

    expect(response.status).toBe(400);
    expect(response.body.errors[0].message).toContain("Incorrect email or password");
  });

  it('Should not login user with incorrect credentials', async () => {
    const loginDetails = {
      email: 'carinamoll@example.com',
      password: 'somepassword123'
    }
    const response = await agent
      .post('/api/v1/auth/login')
      .send(loginDetails);

    expect(response.status).toBe(400);
    expect(response.body.errors[0].message).toContain("Incorrect email or password");
  });

  it("Shout not login user if user is not activated", async () => {
    const loginDetails = {
      email: 'michael@example.com',
      password: 'password123'
    }

    const response = await agent
      .post('/api/v1/auth/login')
      .send(loginDetails);

    expect(response.status).toBe(400);
    expect(response.body.errors[0].message).toContain("You account is not activated, check mail or contact support");
  });

  it("Should logout user", async () => {
    // const loginDetail = {
    //   email: 'carinamoll@example.com',
    //   password: 'password123'
    // }

    // await agent
    //   .post('/api/v1/auth/login')
    //   .send(loginDetail)

    const response = await agent
      .get('/api/v1/auth/logout')

    expect([200, 204]).toContain(response.status);
  });
});