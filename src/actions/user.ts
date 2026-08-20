'use server'

import prisma from '@/lib/prisma'

export async function getUserProfile(email: string) {
  if (!email) return null;
  
  try {
    let user = await prisma.user.findUnique({
      where: { email }
    })

    // Auto-cadastro do administrador principal caso não exista no banco
    if (!user && email === 'jfcnetto@gmail.com') {
      user = await prisma.user.create({
        data: {
          email,
          name: 'João Francisco',
          role: 'ADMIN'
        }
      })
    }

    return user;
  } catch (err) {
    console.error("Error fetching user profile:", err);
    return null;
  }
}

export async function createUser(data: { name: string, email: string, role: string }) {
  try {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        role: data.role
      }
    })
    return { success: true, user }
  } catch (err) {
    console.error("Error creating user:", err);
    return { success: false, error: "Erro ao criar usuário. O e-mail já pode estar cadastrado." }
  }
}

export async function listUsers() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return { success: true, users }
  } catch (err) {
    console.error("Error listing users:", err);
    return { success: false, error: "Erro ao listar usuários." }
  }
}

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: { id }
    })
    return { success: true }
  } catch (err) {
    console.error("Error deleting user:", err);
    return { success: false, error: "Erro ao excluir usuário." }
  }
}

export async function updateUser(id: string, data: { name: string, role: string }) {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        role: data.role
      }
    })
    return { success: true, user }
  } catch (err) {
    console.error("Error updating user:", err);
    return { success: false, error: "Erro ao atualizar usuário." }
  }
}
