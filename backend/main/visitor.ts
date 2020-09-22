import db from './db';
import { v4 as uuidv4 } from 'uuid';
import {queue} from './processing/processing';
import Processes from './processing/processes';

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
        const { rows } = await db.query('UPDATE visitors SET browser=$1, fingerprint=$2 WHERE id=$3 RETURNING *', [browser,{fingerprint},uuid]);
        if(rows.length > 0) {
            const visitor = rows[0];

            await queue.add(Processes.GEO, visitor);
        } 
        
    } catch (error) {
        console.log(error);
    }
}

const updateVisitorGeoInfo = async (geo: any, uuid: string) => {
    try {
        const { rows } = await db.query('UPDATE visitors SET geo=$1 WHERE id=$2 RETURNING *', [geo,uuid]);
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


export {Visitor, createVisitor, updateVisitorBrowserInfo, selectAllVisitors, updateVisitorGeoInfo};