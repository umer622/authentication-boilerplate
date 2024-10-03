import prisma from "@/lib/prisma";
import bcrypt from 'bcrypt';

// getUserFromDB is a function that returns a user object from the database


export default async function getUserFromDB(email: string, password: string) {
    // get user from database using email and password
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if(!user){
        throw new Error('No user found with this email');
    }else{
        // Compare the password with the stored hash
        if (user.password === null) {
            throw new Error('User password is null');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Incorrect password');
        }

    }
    return null;
}

