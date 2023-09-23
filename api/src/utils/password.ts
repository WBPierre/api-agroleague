import bcrypt from "bcrypt";

export const hashPassword = async function(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const verifyPassword = async function(password: string, hash: string): Promise<any>{
    return await bcrypt.compare(password, hash);
}