import prisma from "@/lib/prisma";
import "dotenv/config";

async function main() {
  // await prisma.investmentCategory.createMany({
  //   data: [
  //     {
  //       code: "STARTER",
  //       name: "STARTER",
  //       priority: 1,
  //       minAmount: 100000,
  //       maxAmount: 499000,
  //       durationMonths: 18,
  //       description: "₦100k – ₦499k",
  //       isActive: true,
  //     },
  //     {
  //       code: "GROWTH",
  //       name: "GROWTH",
  //       priority: 2,
  //       minAmount: 500000,
  //       maxAmount: 1000000,
  //       durationMonths: 18,
  //       description: "₦500k – ₦1M",
  //       isActive: true,
  //     },
  //     {
  //       code: "PREMIUM",
  //       name: "PREMIUM",
  //       priority: 3,
  //       minAmount: 1000000,
  //       maxAmount: 5000000,
  //       durationMonths: 18,
  //       description: "₦1M – ₦5M",
  //       isActive: true,
  //     },
  //     {
  //       code: "ELITE",
  //       name: "ELITE",
  //       priority: 4,
  //       minAmount: 5000000,
  //       maxAmount: 10000000,
  //       durationMonths: 18,
  //       description: "₦5M – ₦10M",
  //       isActive: true,
  //     },
  //     {
  //       code: "EXECUTIVE",
  //       name: "EXECUTIVE",
  //       priority: 5,
  //       minAmount: 10000000,
  //       maxAmount: 50000000,
  //       durationMonths: 18,
  //       description: "₦10M+",
  //       isActive: true,
  //     },
  //   ],
  //   skipDuplicates: true,
  // });


  // await prisma.admin.create({
  //   data:{
  //     auth_Id: "google-auth0|26477294829489",
  //     fullName: "Ultimate Faloe",
  //     email: "ultimatefaloe@gmail.com",
  //     passwordHash: "y812^@YF^V&GYGgyy662t737fgy^TT@^fdf666"
  //   }
  // })

  await prisma.platformBankAccount.create({
    data: {
      bankName: "Zenith Bank",
      accountNumber: "1012345678",
      accountHolderName: "WATER GROOVE INVESTMENT TECHNOLOGIES LTD",
      isActive: true,
      isDefault: true,
      createdByAdminId: 'de1ec97c-2683-4339-a65b-c0a4e6e4aae0'
    }
  })
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
