import bcrypt from "bcryptjs";
import { prisma } from "./prisma-client";

async function seed() {
    const users = [
        {
            email: 't@t.com',
            password: '12345678',
            urlContent: [
                {
                    url: 'https://www.google.com',
                    content: 'Google',
                },
                {
                    url: 'https://www.facebook.com',
                    content: 'Facebook',
                },
                {
                    url: 'https://www.twitter.com',
                    content: 'Twitter',
                },
            ]
        },
        {
            email: 'teste@t.com',
            password: '12345678',
            urlContent: [
                {
                    url: 'https://www.google.com',
                    content: 'Google',
                },
                {
                    url: 'https://www.facebook.com',
                    content: 'Facebook',
                },
                {
                    url: 'https://www.twitter.com',
                    content: 'Twitter',
                },
            ]
        },
        {
            email: 'test@t.com',
            password: '12345678',
            urlContent: [
                {
                    url: 'https://www.google.com',
                    content: 'Google',
                },
                {
                    url: 'https://www.facebook.com',
                    content: 'Facebook',
                },
                {
                    url: 'https://www.twitter.com',
                    content: 'Twitter',
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
