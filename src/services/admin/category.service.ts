import { prisma } from "@/lib/prisma"
import { resolveServerAuth } from "@/lib/server/auth0-server";
import { InvestmentCategorySchema } from "@/lib/zod"
import { ApiResponse, CategoryDto } from "@/types/type"
import { mapCategoryToDto } from "@/utils/mapper";

async function authorizeAdmin(adminId: string) {
  const authAdmin = await resolveServerAuth()
  if (authAdmin.user.id !== adminId) throw new Error("Unauthorized")
}
//create
export async function createCategoryService(data: CategoryDto): Promise<ApiResponse<null>> {
  try {

    const parsed = InvestmentCategorySchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues[0].message,
      };
    }

    await prisma.investmentCategory.create({
      data: parsed.data, // ✅ fully trusted
    });

    return {
      success: true,
      message: 'Category created',
    }
  } catch (error: any) {
    console.error(error)
    return {
      success: false,
      message: error.message,
    }
  }
}

//Update category
export async function updateCategoryService(id: string, data: CategoryDto): Promise<ApiResponse<null>> {
  try {

    const parsed = InvestmentCategorySchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues[0].message,
      };
    }

    await prisma.investmentCategory.update({
      where: {
        id
      },
      data: parsed.data,
    });

    return {
      success: true,
      message: 'Category Updated',
    }
  } catch (error: any) {
    console.error(error)
    return {
      success: false,
      message: error.message,
    }
  }
}

//disable
export async function disableCategoryService(id: string): Promise<ApiResponse<null>> {
  try {

    await prisma.investmentCategory.update({
      where: {
        id
      },
      data: { isActive: false }
    });

    return {
      success: true,
      message: 'Category disabled',
    }
  } catch (error: any) {
    console.error(error)
    return {
      success: false,
      message: error.message,
    }
  }
}

export async function listActiveCategoriesService(id: string): Promise<ApiResponse<CategoryDto[] | null>> {
  try {

    const list = await prisma.investmentCategory.findMany({
      where: { isActive: true },
      orderBy: { priority: "asc" },
    })

    if (!list) return { success: false, message: "Failed to retrieve categories" }

    return {
      success: true,
      message: 'Category disabled',
      data: list.length > 0 ? list.map(mapCategoryToDto) : []
    }
  } catch (error: any) {
    console.error(error)
    return {
      success: false,
      message: error.message,
    }
  }
}