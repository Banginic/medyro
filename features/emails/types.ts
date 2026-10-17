export interface ContactEmailType {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}
export interface RegistrationEmailType {
  name: string;
  email: string;
  phone?: string;
  address: string;
  occupation: string;
 
}

export interface RecieverType {
  name: string;
  email: string;
}

export interface GiveEmailType {
  name: string;
  email: string;
  phone: string;
  address: string;
  amount: number;
}
