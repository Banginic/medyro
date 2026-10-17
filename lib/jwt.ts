import { SignJWT, jwtVerify } from "jose";
import { JWTPayload } from "jose";


const SECRET =  new TextEncoder().encode(process.env.JWT_SECRET || 'MY SECRET CODE')

const alg = 'HS256'
export async function generateToken(payload: JWTPayload){
    return await new SignJWT(payload)
    .setProtectedHeader({alg})
    .setExpirationTime('3d')
    .sign(SECRET)
}

export async function verifyToken (token: string){
    try{
        const { payload} = await jwtVerify(token, SECRET)
        return payload
    }catch(ex){
        console.log('Invalid token', ex)
        return null
    }
}