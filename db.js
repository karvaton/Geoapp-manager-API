import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { PGHOST, PGPORT, PGDB, PGUSER, PGPASSWORD } = process.env;

export default new pg.Pool({
    host: PGHOST,
    port: PGPORT,
    database: PGDB,
    user: PGUSER,
    password: PGPASSWORD,
});
