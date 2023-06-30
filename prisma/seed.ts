import { hashPassword } from '@/lib/auth';
import { db } from '@/lib/db';
import { INVOICE_STATUS } from '@prisma/client';

const getRandomTaskStatus = () => {
  const statuses = [INVOICE_STATUS.SENT, INVOICE_STATUS.NOT_SENT];

  return statuses[Math.floor(Math.random() * statuses.length)];
};

async function main() {
  const user = await db.user.upsert({
    where: { email: 'user@email.com' },
    update: {},
    create: {
      email: 'user@email.com',
      firstName: 'User',
      lastName: 'Person',
      password: await hashPassword('password'),
      clients: {
        create: new Array(6).fill(1).map((_, i) => ({
          name: `Client ${i}`,
          address: `${i}${i}${i} Street Avenue`,
          email: `name${i}@email.com`,
          phoneNumber: `${i}${i}${i}-${i}${i}${i}-${i}${i}${i}${i}`,
        })),
      },
    },
    include: {
      clients: true,
    },
  });

  const invoices = await Promise.all(
    user.clients.map((client) =>
      db.invoice.createMany({
        data: new Array(3).fill(1).map((_, i) => {
          return {
            ownerId: user.id,
            clientId: client.id,
            status: getRandomTaskStatus(),
            due: `0${i}/0${i}/2023`,
          };
        }),
      })
    )
  );
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
