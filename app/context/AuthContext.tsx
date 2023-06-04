"use client"

import { SessionProvider } from "next-auth/react"

interface AuthContext {
  children: React.ReactNode
}

const AuthContext: React.FC<AuthContext> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default AuthContext
