import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prismadb from "@/libs/prismadb";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "You are not logged in." }, { status: 401 });
        }
        const users = await prismadb.user.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "An Error occured" }, { status: 500 });
    }
}