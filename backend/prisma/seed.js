const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash('Admin@123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@pujasewa.com' },
    update: {},
    create: {
      email: 'admin@pujasewa.com',
      phone: '9800000000',
      passwordHash: adminPassword,
      role: 'ADMIN',
      isVerified: true,
      profile: {
        create: { fullName: 'System Admin' }
      }
    },
  });
  console.log('✅ Seeded admin user');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
