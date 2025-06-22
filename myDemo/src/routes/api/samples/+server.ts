import type { RequestHandler } from '@sveltejs/kit';
import sql from 'mssql';
import { getMssqlPool } from '$lib/server/db/mssql';

export const GET: RequestHandler = async ({ url }) => {
    const dateFrom = url.searchParams.get('dateFrom');
    const dateTo = url.searchParams.get('dateTo');
    const searchValue = url.searchParams.get('searchValue');

    try {
        // 공용 pool 사용
        const pool = await getMssqlPool();

        // 프로시저 실행
        const result = await pool
            .request()
            .input('dateFrom', sql.NVarChar, dateFrom)
            .input('dateTo', sql.NVarChar, dateTo)
            .input('searchValue', sql.NVarChar, searchValue)
            .execute('USP_Sample_GetList');

        // 결과 반환
        return new Response(JSON.stringify(result.recordset), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    } finally {
        
    }
};