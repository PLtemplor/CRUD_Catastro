import {Pool} from 'pg';

let conn:any

if (!conn) {

conn = new Pool({
        user: 'postgres',
        password: 'pctwo1d1',
        host: 'localhost',
        port: 5432,
        database: 'tasksdb'
    })
}

export { conn };

