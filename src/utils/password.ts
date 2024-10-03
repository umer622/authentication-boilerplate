


// logic for hashing password
import bcrypt from "bcrypt";


export async function compare(password: string, hash: string) {
    return bcrypt.compare(password, hash);
}

export async function hashPassword(password: string) {
    return bcrypt.hash(password, 10);
}

