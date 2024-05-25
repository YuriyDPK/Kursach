const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Создаем пользователей
  await prisma.user.createMany({
    data: [
      {
        username: "user1",
        email: "user1@example.com",
        password: "password",
        role: "user",
        phone: "1234567890",
      },
      {
        username: "user2",
        email: "user2@example.com",
        password: "password",
        role: "user",
        phone: "1234567891",
      },
      {
        username: "user3",
        email: "user3@example.com",
        password: "password",
        role: "manager",
        phone: "1234567892",
      },
    ],
  });

  // Создаем бренды
  await prisma.brand.createMany({
    data: [{ name: "Brand1" }, { name: "Brand2" }, { name: "Brand3" }],
  });

  // Создаем дилеров
  await prisma.dealer.createMany({
    data: [
      { name: "Dealer1", address: "Address1", phone: "1234567893" },
      { name: "Dealer2", address: "Address2", phone: "1234567894" },
      { name: "Dealer3", address: "Address3", phone: "1234567895" },
    ],
  });

  // Получаем созданных пользователей, бренды и дилеров
  const users = await prisma.user.findMany();
  const brands = await prisma.brand.findMany();
  const dealers = await prisma.dealer.findMany();

  // Создаем автомобили
  await prisma.car.createMany({
    data: [
      {
        make: "Make1",
        model: "Model1",
        year: 2021,
        price: 10000,
        mileage: 1000,
        description: "Description1",
        sellerId: users[0].id,
        brandId: brands[0].id,
        dealerId: dealers[0].id,
      },
      {
        make: "Make2",
        model: "Model2",
        year: 2022,
        price: 20000,
        mileage: 2000,
        description: "Description2",
        sellerId: users[1].id,
        brandId: brands[1].id,
        dealerId: dealers[1].id,
      },
      {
        make: "Make3",
        model: "Model3",
        year: 2023,
        price: 30000,
        mileage: 3000,
        description: "Description3",
        sellerId: users[2].id,
        brandId: brands[2].id,
        dealerId: dealers[2].id,
      },
    ],
  });

  // Создаем услуги
  await prisma.service.createMany({
    data: [
      { name: "Service1", description: "Description1", price: 100 },
      { name: "Service2", description: "Description2", price: 200 },
      { name: "Service3", description: "Description3", price: 300 },
    ],
  });

  // Создаем механиков
  await prisma.mechanic.createMany({
    data: [
      { name: "Mechanic1", phone: "1234567896" },
      { name: "Mechanic2", phone: "1234567897" },
      { name: "Mechanic3", phone: "1234567898" },
    ],
  });

  // Получаем созданные услуги и механиков
  const services = await prisma.service.findMany();
  const mechanics = await prisma.mechanic.findMany();

  // Создаем записи об услугах механиков
  await prisma.appointment.createMany({
    data: [
      {
        userId: users[0].id,
        serviceId: services[0].id,
        date: new Date(),
        status: "pending",
      },
      {
        userId: users[1].id,
        serviceId: services[1].id,
        date: new Date(),
        status: "confirmed",
      },
      {
        userId: users[2].id,
        serviceId: services[2].id,
        date: new Date(),
        status: "declined",
      },
    ],
  });

  // Создаем части автомобилей
  await prisma.part.createMany({
    data: [
      { name: "Part1", price: 50, description: "Description1", carId: 1 },
      { name: "Part2", price: 100, description: "Description2", carId: 2 },
      { name: "Part3", price: 150, description: "Description3", carId: 3 },
    ],
  });

  // Создаем отзывы
  await prisma.review.createMany({
    data: [
      { content: "Review1", rating: 5, userId: users[0].id, carId: 1 },
      { content: "Review2", rating: 4, userId: users[1].id, carId: 2 },
      { content: "Review3", rating: 3, userId: users[2].id, carId: 3 },
    ],
  });

  // Создаем записи об обслуживании автомобилей
  await prisma.maintenance.createMany({
    data: [
      {
        carId: 1,
        mechanicId: mechanics[0].id,
        date: new Date(),
        details: "Details1",
      },
      {
        carId: 2,
        mechanicId: mechanics[1].id,
        date: new Date(),
        details: "Details2",
      },
      {
        carId: 3,
        mechanicId: mechanics[2].id,
        date: new Date(),
        details: "Details3",
      },
    ],
  });

  // Создаем страховые полисы
  await prisma.insurance.createMany({
    data: [
      { companyName: "Company1", policyNumber: "Policy1", carId: 1 },
      { companyName: "Company2", policyNumber: "Policy2", carId: 2 },
      { companyName: "Company3", policyNumber: "Policy3", carId: 3 },
    ],
  });

  // Создаем запросы
  await prisma.inquiry.createMany({
    data: [
      { message: "Inquiry1", userId: users[0].id, carId: 1 },
      { message: "Inquiry2", userId: users[1].id, carId: 2 },
      { message: "Inquiry3", userId: users[2].id, carId: 3 },
    ],
  });

  // Создаем транзакции
  await prisma.transaction.createMany({
    data: [
      { date: new Date(), amount: 1000, carId: 1, buyerId: users[0].id },
      { date: new Date(), amount: 2000, carId: 2, buyerId: users[1].id },
      { date: new Date(), amount: 3000, carId: 3, buyerId: users[2].id },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
