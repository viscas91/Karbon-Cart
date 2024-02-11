import bcrypt from 'bcrypt';
import crypto from 'crypto';

export async function generateRandomPassword(length: number = 12) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:,.<>?';
    const randomBytes = await crypto.randomBytes(length);
    let password = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = randomBytes.readUInt8(i) % characters.length;
        password += characters.charAt(randomIndex);
    }

    return password;
}

export class Password {
    static async toHash(password: string) {
    
        let salt = await bcrypt.genSalt(10);
        
        const pwd = await bcrypt.hash(password, salt)

        return pwd;
    }

    static async compare(storedPassword: string, suppliedPassword: string){
        return await bcrypt.compare(suppliedPassword, storedPassword);
    }
}