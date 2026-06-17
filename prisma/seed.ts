import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('Admin@123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@pujasewa.com' },
    update: {},
    create: {
      email: 'admin@pujasewa.com',
      phone: '9800000000',
      passwordHash: adminPassword,
      role: 'ADMIN',
      isVerified: true,
      profile: { create: { fullName: 'System Admin' } },
    },
  });
  console.log('Admin created:', admin.email);

  // Create event types
  const events = [
    'Marriage', 'Bratabandha', 'Nwaran', 'Pasni', 'Griha Pravesh',
    'Satyanarayan Puja', 'Rudrabhishek', 'Shraddha', 'Funeral Rituals',
    'Lakshmi Puja', 'Saraswati Puja', 'Birthday Puja', 'Vehicle Puja',
    'Office Opening', 'Custom Event'
  ];
  for (const name of events) {
    await prisma.eventType.upsert({
      where: { name },
      update: {},
      create: { name, isActive: true },
    });
  }
  console.log('Event types seeded');

  // Create sample packages
  await prisma.package.upsert({
    where: { id: 'basic-marriage' },
    update: {},
    create: {
      id: 'basic-marriage',
      name: 'Basic Marriage Package',
      price: 25000,
      includesItems: ['Pandit Fee', 'Basic Puja Samagri'],
      isActive: true,
    },
  });
  console.log('Packages seeded');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
