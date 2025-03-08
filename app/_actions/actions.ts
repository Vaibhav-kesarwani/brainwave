"use server";

import prisma from "@/db";

export async function getUserDetails(
  clerkId: string,
  email: string,
  name: string,
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId,
      },
      include: {
        folders: {
          include: {
            notes: true,
          },
        },
      },
    });
    if (!user) {
      const newUser = await prisma.user.create({
        data: {
          clerkId,
          email: email,
          name: name,
        },
        include: {
          folders: {
            include: {
              notes: true,
            },
          },
        },
      });
      return { success: true, data: newUser };
    }
    return { success: true, data: user };
  } catch (error) {
    console.log(error);
    return { success: false, data: null };
  }
}
