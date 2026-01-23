const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('🌱 正在初始化角色数据...')
  
  const roles = [
    { name: 'ADMIN', canInvite: true },
    { name: 'USER', canInvite: false },
    { name: 'INVITER', canInvite: true },
  ]

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: { canInvite: role.canInvite },
      create: role,
    })
  }

  console.log('✅ 角色初始化完成')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
