import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
    const dateFrom = url.searchParams.get('dateFrom');
    const dateTo = url.searchParams.get('dateTo');
    const searchValue = url.searchParams.get('searchValue');

    // 샘플 데이터
    const users = [
        { id: 1, name: 'Alice', age: 25, gender: 'female', date: '2024-06-01' },
        { id: 2, name: 'Bob', age: 32, gender: 'male', date: '2024-06-02' },
        { id: 3, name: 'Charlie', age: 28, gender: 'male', date: '2024-06-03' },
        { id: 4, name: 'Diana', age: 22, gender: 'female', date: '2024-06-04' },
        { id: 5, name: 'Eve fskadjf;ajsdkfj;asdjf;asldjfl;ksdjfk;jasd;lfj;lskdjfsdaf;jsd', age: 35, gender: 'female', date: '2024-06-05' },
        { id: 6, name: searchValue, age: 35, gender: 'female', date: dateFrom },
        { id: 6, name: dateFrom, age: 35, gender: 'female', date: dateTo }
    ];

    // 날짜 필터
    let filtered = users;
    if (dateFrom) {
        filtered = filtered.filter(u => u.date >= dateFrom);
    }
    if (dateTo) {
        filtered = filtered.filter(u => u.date <= dateTo);
    }

    // searchValue 필터 (이름에 포함되는지)
    if (searchValue) {
        filtered = filtered.filter(u => u.name.includes(searchValue));
    }

    return new Response(JSON.stringify(filtered), {
        headers: { 'Content-Type': 'application/json' }
    });
};