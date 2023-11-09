import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prismadb from '@/libs/prismadb';

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { message: "You are not logged in" },
                { status: 401 }
            );
        };
        const currentUser = await prismadb.user.findUnique({
            where: {
                email: session.user?.email || "",
            },
        });
        if (!currentUser) {
            return NextResponse.json({ message: "You are not logged in" }, { status: 401 });
        }
        const { body } = await request.json();
        const post = await prismadb.post.create({
            data: {
                body,
                userId: currentUser.id,
            },
        });
        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "An Error occured" }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const userId = new URL(request.url).searchParams.get('userId');
        let _args: any = {
            include: {
                user: true,
                comments: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        };
        if (userId && typeof userId === 'string') {
            _args = {
                where: {
                    userId,
                },
                ..._args,
            };
        }
        const posts = await prismadb.post.findMany(_args);
        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "An Error occured" }, { status: 500 });
    }
}