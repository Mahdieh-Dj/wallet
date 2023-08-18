import { PrismaClient } from "@prisma/client";

const main = async () => {
	const db = new PrismaClient();

	const createdUser = await db.user.create({
		data: {
			name: "mahdie",
		},
	});

	await db.wallet.create({
		data: {
			user_id: createdUser.id,
			balance: 120000000,
		},
	});

	return;
};

main()
	.then(() => {
		console.log("DB seeding completed✅");
		process.exit(0);
	})
	.catch(e => {
		console.log(e);
		process.exit(1);
	});
