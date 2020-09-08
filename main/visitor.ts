import db from './db';
import { v4 as uuidv4 } from 'uuid';

interface Visitor {
    uuid: string;
    redirect_uuid: string;
    browser: any;
    fingerprint: any;
    headers: any;
    ip_addr: string;
    date: Date;
}

const createVisitor = async (redirect_uuid: string, headers: any, ip_addr: string) => {
    try {
        const uuid = await uuidv4();
        const { rows } = await db.query('INSERT INTO visitors(id,redirect_id,headers,ip_addr) VALUES($1,$2,$3,$4) returning id', [uuid, redirect_uuid,headers, ip_addr]);
        console.log(rows);
        if(rows.length > 0) {
            return rows[0].id;
        } else {
            return null;
        }
    } catch (error) {

    }
}

const updateVisitorBrowserInfo = async (browser: any, fingerprint: any, uuid: string) => {
    try {
        const { rows } = await db.query('UPDATE visitors SET browser=$1, fingerprint=$2 WHERE id=$3', [browser,{fingerprint},uuid]);
        
    } catch (error) {
        console.log(error);
    }
}

const selectAllVisitors = async () => {
    try {
        const { rows } = await db.query('SELECT * from visitors');
        if(rows.length > 0) {
            return rows;
        } else {
            return [];
        }
    } catch(error) {
        console.log(error);
    }
}


export {Visitor, createVisitor, updateVisitorBrowserInfo, selectAllVisitors};