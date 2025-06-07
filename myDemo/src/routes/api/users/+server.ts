import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
    const users = [
        { id: 1, name: 'Alice', age: 25, gender: 'female' },
        { id: 2, name: 'Bob', age: 32, gender: 'male' },
        { id: 3, name: 'Charlie', age: 28, gender: 'male' },
        { id: 4, name: 'Diana', age: 22, gender: 'female' },
        { id: 5, name: 'Eve fskadjf;ajsdkfj;asdjf;asldjfl;ksdjfk;jasd;lfj;lskdjfsdaf;jsd', age: 35, gender: 'female' }
    ];
    return new Response(JSON.stringify(users), {
        headers: { 'Content-Type': 'application/json' }
    });
};