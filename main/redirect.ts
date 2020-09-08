import db from './db';
import { v4 as uuidv4 } from 'uuid';

interface Redirect {
    id: string;
    redirect: string;
    date: Date;
}

const getRedirect = async (uuid: string): Promise<Redirect> => {
    try {
        const { rows } = await db.query('SELECT * FROM redirects WHERE id=$1', [uuid]);
        if(rows.length > 0) {
            return rows[0];
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}

const createRedirect = async (to: string) => {
    try {
        const uuid = await uuidv4();
        const { rows } = await db.query('INSERT INTO redirects(id,redirect) VALUES($1,$2) RETURNING *', [uuid, to]);
        console.log(rows[0]);
    } catch (error) {

    }
}

const selectAllRedirects = async () => {
    try {
        const { rows } = await db.query('SELECT * FROM redirects');
        if(rows.length > 0) {
            return rows;
        } else {
            return [];
        }
    } catch(error) {
        console.log(error);
    }
}

const removeRedirect = async (id: string) => {
    try {
        await db.query('DELETE FROM redirects WHERE id=$1',[id]);
    } catch(error) {
        console.log(error);
    }
}

//createRedirect("https://google.com");

export {Redirect, createRedirect, getRedirect, selectAllRedirects, removeRedirect};