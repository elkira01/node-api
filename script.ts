// import { PrismaClient } from '@prisma/client'
//
// const prisma = new PrismaClient()
//
// async function main() {
//     await prisma.user.create({
//         data: {
//             name: 'El kira01',
//             tasks: {
//                 create: {
//                     title: 'My first task',
//                     description: '',
//                 },
//             },
//         },
//     })
//
//     const allUsers = await prisma.user.findMany()
//     console.dir(allUsers, { depth: null })
// }
//
// main()
//     .catch(async (e) => {
//         console.error(e)
//         process.exit(1)
//     })
//     .finally(async () => {
//         await prisma.$disconnect()
//     })

for (let i = 0; i< 5; i++){
    setTimeout(() => {
        console.log('Reached',i);
    }, 5000)
}