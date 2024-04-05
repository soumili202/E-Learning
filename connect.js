const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
 
async function connect() {
    try {
        await prisma.$connect()
        console.log('Connected to database')
    } catch (e) {
        console.error(`Error connecting to database: ${e}`)
    }
}

module.exports = connect;

