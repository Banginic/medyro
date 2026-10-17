import { Redis } from '@upstash/redis'

const token = process.env.UPSTASH_REDIS_REST_TOKEN;
const url = process.env.UPSTASH_REDIS_REST_URL;

if (!url || !token) {
throw new Error("Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN env variables");
}

export const redis = new Redis({ url, token });

//Helpful typed wrappers
export async function redisGet<T = string>(key: string): Promise<T | null> {
    const res = await redis.get(key)
    return (res as unknown ) as T | null;
}

export async function redisSet(key: string, value: unknown, ttlSeconds?: number){
    if(ttlSeconds){
        return redis.set(key, value, { ex: ttlSeconds });
    }
    return redis.set(key, value );
}

export async function redisDel(key: string){
    return redis.del(key);
}