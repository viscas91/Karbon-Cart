import bcrypt from 'bcrypt';

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