import db from "../db.js";

export const TABLE = 'test.users';

export async function getUsers() {
    return (
        await db.query(`SELECT * FROM ${TABLE} WHERE id >= 0`)
    ).rows;
}

export async function getUser(login) {
    return (
        await db.query(`SELECT * FROM ${TABLE} WHERE login = '${login}'`)
    ).rows[0];
}