import bcrypt from "bcryptjs";
import { prisma } from "./prisma-client";

async function seed() {
    const users = [
        {
            email: 't@t.com',
            password: '12345678',
        },
        {
            email: 'teste@t.com',
            password: '12345678',
        },
        {
            email: 'test@t.com',
            password: '12345678',
        }
    ];

    for (const user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 10);

        await prisma.user.create({
            data: {
                email: user.email,
                password: hashedPassword,
            },
        });
    }

    console.log("Users seeded successfully!");
}

seed()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
