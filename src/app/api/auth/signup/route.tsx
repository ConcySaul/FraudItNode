import { NextResponse, NextRequest} from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
    const body = await request.json();
    const email: string = body.email;
    const username: string = body.username;
    const password: string = body.password;
    const verif: string = body.verif;

    const getUsername = await prisma.user.findUnique({
        where: {
            username: username,
        },
        select: {
            username: true,
        }
    });

    const getEmail = await prisma.user.findUnique({
        where: {
            email: email,
        },
        select: {
            email: true,
        }
    });

    if (password != verif){
        return NextResponse.json({message: "Wrong verification"}, {status: 401})
    }
    else if (!email){
        return NextResponse.json({message: "Empty email"}, {status: 401})
    }
    else if (!password){
        return NextResponse.json({message: "Empty password"}, {status: 401})
    }
    else if (!username){
        return NextResponse.json({message: "Empty username"}, {status: 401})
    }
    else if (getEmail){
        return NextResponse.json({message: "Email already used"}, {status: 401})
    }
    else if (getUsername){
        return NextResponse.json({message: "Username already used"}, {status: 401})
    }
    else {
        const saltRounds: Number = 10; 
        const hashedPassword: string = await bcrypt.hash(password, saltRounds);
        const challengeId = await uuidv4();
        const newUser = await prisma.user.create({
            data: {
                email: email,
                username: username,
                password: hashedPassword,
                challengeId: challengeId
            }
        })
        const allUser = await prisma.user.findMany();
        return NextResponse.json({message: "Account created"}, {status: 200});
    }

}