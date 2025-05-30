"use server"

import { cookies } from "next/headers"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1"

export async function registerUser(userData: {
  userName: string
  email: string
  password: string
  confirmPassword: string
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    const data = await response.json()

    if (!response.ok || data.statusCode < 200 || data.statusCode >= 300) {
  return {
    success: false,
    message: data.message || "Registration failed",
  }
}


    return {
      success: true,
      data: data.data,
      message: data.message,
    }
  } catch (error) {
    console.error("Registration error:", error)
    return {
      success: false,
      message: "An error occurred during registration",
    }
  }
}

export async function loginUser(credentials: {
  email: string
  password: string
}) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })

    const data = await response.json()

    if (!response.ok || data.statusCode !== 200) {
      return {
        success: false,
        message: data.message || "Login failed",
      }
    }

    return {
      success: true,
      data: data.data,
    }
  } catch (error) {
    console.error("Login error:", error)
    return {
      success: false,
      message: "An error occurred during login",
    }
  }
}

export async function logout() {
  const cookieStore = await cookies()
  const allCookies = cookieStore.getAll()

  // Delete each cookie
  allCookies.forEach((cookie) => {
    cookieStore.delete(cookie.name)
  })
}
