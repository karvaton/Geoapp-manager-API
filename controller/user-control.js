import db from "../db.js";
import { loadData, TABLE as DATA_TABLE } from "./layers-control.js";
import * as usersModel from '../models/users.model.js';
export const TABLE = 'test.users';

const ip = process.env.PGHOST;

export async function getUsers(req, res) {
    // const client = await db.connect();
    try {
        const users = await usersModel.getUsers();
        const usersData = users.map(({db_conn, ...user}) => user);
        res.status(200).json(usersData);
    } catch (error) {
        console.log(error);
        res.status(500).send(null);
    } finally {
        // client.release();
    }
}

export async function getUsersFullData(req, res) {
    // const client = await db.connect();
    try {
        const users = await usersModel.getUsers();
        const layers = (await db.query(`SELECT * FROM ${DATA_TABLE}`)).rows;
        const usersData = users.map(({ db_conn, ...user }) => ({
            ...user,
            layers: layers.filter(({ login }) => login === user.login),
        }));
        res.status(200).json(usersData);
    } catch (error) {
        console.log(error);
        res.status(500).send(null);
    } finally {
        // client.release();
    }
}

export async function getUser(req, res) {
    // const client = await db.connect();
    try {
        const { login } = req.params;
        const user = await usersModel.getUser(login);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send(null);
    } finally {
        // client.release();
    }
}


export async function createUser(req, res) {
    // const client = await db.connect();
    try {
        const { login, name, password, email, layers, status, print, entry } = req.body;
        if (entry.host === "localhost") {
            entry.host = ip;
        }
        await db.query(
            `INSERT INTO ${TABLE} 
            (login, name, password, email, status, print, db_conn)
            VALUES ($1, $2, md5($3), $4, $5, $6, $7)`,
            [login, name, password, email, status, print, JSON.stringify(entry)]
        );
        await loadData(login, layers);
        res.status(200).json({ message: "Користувача створено" });
    } catch (error) {
        console.log(error);
        res.json({ message: "Не вдалося створити користувача" });
    } finally {
        // db.release();
    }
}

export async function update(req, res) {
    // const client = await db.connect();
    try {
        const { login } = req.params;
        const { fields } = req.body;
        const updates = fields.map((field) => {
            let [key, value] = Object.entries(field)[0];
            return `${key} = ${value}`;
        });
        const user = (
            await db.query(`
                UPDATE ${TABLE}
                SET ${updates.join(",")}
                WHERE login = '${login}' RETURNING  *
            `)
        ).rows[0];
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.json({ message: "Не оновити дані" });
    } finally {
        // client.release();
    }
}

export async function deleteUser(req, res) {
    // const client = await db.connect();
    try {
        const { login } = req.params;

        await db.query(`DELETE FROM ${DATA_TABLE} WHERE login = '${login}'`)
        const user = (
            await db.query(
                `DELETE FROM ${TABLE} WHERE login = '${login}' RETURNING *`
            )
        ).rows[0];
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.json({ message: "Не вдалося видалити корисутвача" });
    } finally {
        // client.release();
    }
}