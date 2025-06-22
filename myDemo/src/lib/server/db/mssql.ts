import sql from 'mssql';
import { env } from '$env/dynamic/private';

let pool: sql.ConnectionPool | null = null;

export async function getMssqlPool() {
    const config: sql.config = {
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        server: env.DB_SERVER || 'localhost', // 빈 문자열 대신 기본값 사용
        database: env.DB_DATABASE,
        options: {
            encrypt: env.DB_ENCRYPT === 'true'
        }
    };

    // console.log('Connecting to MSSQL with config:', {
    //     user: config.user,
    //     server: config.server,
    //     database: config.database
    // });

    // 이미 연결되어 있으면 재사용
    if (pool && pool.connected) {
        return pool;
    }
    pool = await sql.connect(config);
    return pool;
}