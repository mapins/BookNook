export interface UserData {
  user_id?: number
  user_handle: string
  email_address: string
  password: string
  first_name: string
  last_name: string
}

export interface LoginData {
  email_address: string
  password: string
}

export interface AuthState {
  user: UserData | null
  isAuthenticated: boolean
}
