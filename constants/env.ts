
export const env = {
    admin_url: process.env.ADMIN_URL || process.env.NEXT_PUBLIC_ADMIN_URL,
    api_url: process.env.API_URL || process.env.NEXT_PUBLIC_API_URL,
    lang: process.env.LANGUAGE || process.env.NEXT_PUBLIC_LANGUAGE || 'en' ,
}