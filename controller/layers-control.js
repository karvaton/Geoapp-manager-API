import db from "../db.js";

export const TABLE = 'test.user_data';

export async function getUserData(req, res) {
    // const client = await db.connect();
    try {
        const { login } = req.params;
        const layers = (
            await db.query(
                `SELECT * FROM ${TABLE} WHERE login = '${login}'`
            )
        ).rows;
        res.status(200).json(layers);
    } catch (error) {
        res.status(500).send(error);
    } finally {
        // client.release();
    }
}

export async function getData(req, res) {
    // const client = await db.connect();
    try {
        const layers = (await db.query(`SELECT * FROM ${TABLE}`)).rows;
        res.status(200).json(layers);
    } catch (error) {
        res.status(500).send(error);
    } finally {
        // client.release();
    }
}

export async function loadData(login, layers = []) {
    // const client = await db.connect();    
    if (layers.length) {
        const layerValues = layers.map(({access, id, name, style = '', title, workspace, parameters = [], filters = '' }, index) => 
            `('${id}','${login}', '${name}', '${workspace}', '${title || name}', '${access}', '${JSON.stringify(parameters)}', '${filters}', '${style}', ${index})`
        ).join(",");

        const query = `INSERT INTO ${TABLE}
            (lid, login, layer_name, workspace, title, access, parameters, filters, style, order_id)
            VALUES ${layerValues}`;

        try {
            await db.query(query);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            // client.release();
        }
    }
}