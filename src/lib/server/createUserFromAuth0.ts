import { prisma } from "@/lib/prisma";
import { AdminRole, Prisma } from "@prisma/client";
import { AppRole } from "../auth/roles";

export async function createUserFromAuth0(auth0User: any) {
  try {
    const auth0Id = auth0User?.sub;
    if (!auth0Id) return null;

    const createdUser = await prisma.user.upsert({
      where: { auth_Id: auth0Id },
      update: {},
      create: {
        auth_Id: auth0Id,
        email: auth0User.email ?? null,
        fullName: auth0User.name ?? '',
        picture: auth0User.picture ?? null,
        createdAt: new Date()
      },
    });
    return createdUser
  } catch (error) {
    console.log(error)
    // Prisma-specific handling
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Prisma error creating user:", error.code);
    } else {
      console.error("Unknown error creating user:", error);
    }

    // Prevent app from crashing
    return null;
  }
}

export async function createAdminFromAuth0(authAdmin: any, role: AppRole) {
  try {
    const auth0Id = authAdmin?.sub;
    if (!auth0Id) return null;

    const createdAdmin = await prisma.admin.upsert({
      where: { auth_Id: auth0Id },
      update: {},
      create: {
        auth_Id: auth0Id,
        email: authAdmin.email ?? null,
        fullName: authAdmin.name ?? '',
        role: role.toUpperCase() as AdminRole,
        passwordHash: '',
        createdAt: new Date()
      },
    });
    return createdAdmin
  } catch (error) {
    console.log(error)
    // Prisma-specific handling
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Prisma error creating user:", error.code);
    } else {
      console.error("Unknown error creating user:", error);
    }

    // Prevent app from crashing
    return null;
  }
}