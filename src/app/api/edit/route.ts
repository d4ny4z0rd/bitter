import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prismadb from "@/libs/prismadb";

export async function PATCH(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: "You are not logged in." }, { status: 401 });
        }
        const currentUser = await prismadb.user.findUnique({
            where: {
                email: session.user?.email || "",
            },
        });
        if (!currentUser) {
            return NextResponse.json({ message: "You are not logged in." }, { status: 401 });
        }
        const { name, username, bio, profileImage, coverImage } = await request.json();
        if (!name || !username) throw new Error("Missing Fields");
        const updatedUser = await prismadb.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                name,
                username,
                bio,
                profileImage,
                coverImage
            },
        });
        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "An error occured" }, { status: 500 });
    }
}