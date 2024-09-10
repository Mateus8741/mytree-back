import bcrypt from "bcryptjs";
import { prisma } from "./prisma-client";

async function seed() {
    await prisma.user.deleteMany();

    const users = [
        {
            email: 't@t.com',
            password: '12345678',
            content: [
                {
                    urlContent: 'https://www.google.com',
                    contentName: 'Google',
                },
                {
                    urlContent: 'https://www.facebook.com',
                    contentName: 'Facebook',
                },
                {
                    urlContent: 'https://www.twitter.com',
                    contentName: 'Twitter',
                },
            ]
        },
        {
            email: 'teste@t.com',
            password: '12345678',
            content: [
                {
                    urlContent: 'https://www.google.com',
                    contentName: 'Google',
                },
                {
                    urlContent: 'https://www.facebook.com',
                    contentName: 'Facebook',
                },
                {
                    urlContent: 'https://www.twitter.com',
                    contentName: 'Twitter',
                },
            ]
        },
        {
            email: 'test@t.com',
            password: '12345678',
            content: [
                {
                    urlContent: 'https://www.google.com',
                    contentName: 'Google',
                },
                {
                    urlContent: 'https://www.facebook.com',
                    contentName: 'Facebook',
                },
                {
                    urlContent: 'https://www.twitter.com',
                    contentName: 'Twitter',
                },
            ]
        }
    ];

    for (const user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 10);

        await prisma.user.create({
            data: {
                email: user.email,
                password: hashedPassword,
                content: {
                    createMany: {
                        data: user.content,
                    },
                },
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
