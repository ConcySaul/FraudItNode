import { NextResponse, NextRequest} from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'
import { useQuery } from 'react-query';

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
    const body = await request.json();
    const email: string = body.email;
    const password: string = body.password;

    const getEmail = await prisma.user.findUnique({
        where: {
            email: email,
        },
        select: {
            email: true,
            password: true,
            id: true,
            username: true
        }
    });

    if (!getEmail) {
        return NextResponse.json({message: "No such email"}, {status: 401});
    }
    if (!(await bcrypt.compare(password, getEmail?.password))) {
        return NextResponse.json({message: "Wrong password"}, {status: 401})
    }
    else {
        const payload = {sub: getEmail.id, username: getEmail.username};
        const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRE});
        cookies().set('auth', token);
        return NextResponse.json({message: "signed in"}, {status: 200});
    }
}