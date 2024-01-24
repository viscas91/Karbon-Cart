// Import your types and modules
import { registerUser } from "../../../controllers/auth/registerController";
import { User } from "../../../models/mysql/User";
import { VerifyResetToken } from "../../../models/mysql/VerifyResetTokenModel";
import { sendEmail } from "../../../utils/sendMail";
import { Password } from "../../../services/password";
import crypto from 'crypto'

// Mock the imported modules
jest.mock("../../../models/mysql/User");
jest.mock("../../../models/mysql/VerifyResetTokenModel");
jest.mock("../../../utils/sendMail", () => ({
    sendEmail: jest.fn().mockResolvedValue(undefined), // Mocking the sendEmail function
  }));
jest.mock("../../../services/password");
jest.mock("crypto")

describe("registerUser", () => {
  it("should register a new user and send a verification email", async () => {
    // Mocking request and response objects
    const req: any = {
      body: {
        id: 1,
        firstName: 'Carina',
            lastName: 'Moll',
            username: 'carina',
            email: 'carinamoll@example.com',
            avatar: 'avatar.jpg',
            password: 'password123',
            provider: 'email',
            isEmailVerified: true,
            passwordChangedAt: expect.any(Date),
      },
    };

    const next = jest.fn()

    const res: any = {
      status: jest.fn(),
      json: jest.fn(),
    };

    // Mocking the User model's findOne and create methods
    (User.findOne as jest.Mock).mockResolvedValue(null);
    (User.create as jest.Mock).mockResolvedValue({
            id: 1,
            firstName: 'Carina',
            lastName: 'Moll',
            username: 'carina',
            email: 'carinamoll@example.com',
            avatar: 'avatar.jpg',
            password: 'password123',
            provider: 'email',
            isEmailVerified: true,
            passwordChangedAt: new Date(),
    });
    
    const defaultToken = 'somedefaulttoken';

    (crypto.randomBytes as jest.Mock).mockReturnValue({
        toString: () => defaultToken,
      });

    const createDate = new Date('2024-01-15T13:33:17.668Z');
    // Mocking the VerifyResetToken model's create method
    (VerifyResetToken.create as jest.Mock).mockResolvedValue({
      userId: 1,
      token: defaultToken,
      createdAt: createDate,
    });

    // Mocking the Password service's toHash method
    (Password.toHash as jest.Mock).mockResolvedValue("password123"); 

    // Mocking the sendEmail function
    (sendEmail as jest.Mock).mockImplementation(async () => {
        // Implement your mock logic here, for example, return a resolved promise
        return Promise.resolve();
      });

    // Call the registerUser function
    await registerUser(req, res, next);

    // Assert that the expected methods were called
    expect(User.findOne).toHaveBeenCalledWith({
      where: { username: "carina" },
    });

    expect(User.create).toHaveBeenCalledWith({
        firstName: 'Carina',
        lastName: 'Moll',
        username: 'carina',
        email: 'carinamoll@example.com',
        avatar: 'avatar.jpg',
        password: 'password123',
        provider: 'email',
        isEmailVerified: true,
        passwordChangedAt: expect.any(Date),
    });

    expect(User.create).toHaveBeenCalled();

    expect(VerifyResetToken.create).toHaveBeenCalledWith({
      userId: 1,
      token: 'somedefaulttoken',
      createdAt: expect.any(Date),
    });

    expect(sendEmail).toHaveBeenCalledWith({
      email: "carinamoll@example.com",
      subject: "Account Activation",
      template: "./emails/template/accountVerification.handlebars",
      payload: {
        name: "Carina",
        link: `${process.env.DOMAIN}/api/v1/auth/verify/somedefaulttoken/1`,
      },
    });

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "A new user Carina has been registered! A Verification email has been sent to your account. Please verify within 15 minutes",
    });
  });
});
