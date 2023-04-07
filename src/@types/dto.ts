export interface ContactInputDTO {
  firstName: string
  lastName: string
  birth?: string
  phone?: string
  image?: string
  email?: string
  company?: string
  address?: string
  website?: string
  customField?: string
  dataCustomField?: string
}

export interface ContactOutputDTO {
  id: string
  firstName: string
  lastName: string
  birth: string
  phone: string
  image: string
  email: string
  company: string
  address: string
  website: string
  customField: string
  dataCustomField: string
}

export interface UserCreateDTO {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface UserLoginRequestDTO {
  email: string
  password: string
}

export interface userLoginResponseDTO {
  token: string
}
