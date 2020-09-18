import * as Koa from 'koa';
import { v4 as uuidv4 } from 'uuid';

const cors = require('@koa/cors');
const router = require('@koa/router');
const koaBody = require('koa-body');

import {getRedirect, Redirect, selectAllRedirects, createRedirect, removeRedirect, modifyRedirect} from './redirect';
import {Visitor, createVisitor, updateVisitorBrowserInfo, selectAllVisitors} from './visitor';

import * as settings from '../settings.json';

const appPublic = new Koa();
const appPrivate = new Koa();

const routerPublic = router();
const routerPrivate = router();

import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import {getScript} from './scriptcreate';
import App from './app/app';

const to = async (ctx) => {
    try {
        console.log("HIT");
        const id = ctx.params.id;
        const redirect: Redirect = await getRedirect(id);
        const clientIP = ctx.request.ip;
        const visitorId = await createVisitor(redirect.id,ctx.headers, clientIP);
        const script = await getScript();
        
        console.log(script);
        
        ctx.status = 200;
        ctx.body = ReactDOMServer.renderToStaticMarkup(<App script={script} uuid={visitorId} to={redirect.redirect}/>);
    } catch(error) {
        console.log(error);
        ctx.redirect('/');
    }
    
}

const checkup = async (ctx) => {
    const body = ctx.request.body;
    console.log('updated');
    console.log(body);
    updateVisitorBrowserInfo(body.bowser,body.fingerprint,body.id);
    ctx.status = 200;
}

routerPublic.get('/to/:id',to)
      .get('/to', to)
      .post('/checkup', checkup);


const allRedirects = async (ctx) => {
    ctx.body = await selectAllRedirects();
    ctx.status = 200;
}

const getOne = async (ctx) => {
    const id = ctx.params.id;
    const res = await getRedirect(id);
    ctx.body = res;
    ctx.status = 200;
}

const makeRedirect = async (ctx) => {
    console.log(ctx.request);
    const to = ctx.request.body.redirect;
    const reason = ctx.request.body.reason;
    await createRedirect(to, reason);
    ctx.status = 200;
}

const updateRedirect = async (ctx) => {
    const id = ctx.params.id;
    const redirect = ctx.body.redirect;
    await modifyRedirect(id,redirect);
    ctx.status = 200;
}

const deleteRedirect = async (ctx) => {
    const id = ctx.params.id;
    await removeRedirect(id);
    ctx.status = 200;
}

const allVisitors = async (ctx) => {
    ctx.body = await selectAllVisitors();
    ctx.status = 200;
}

const getSettings = async (ctx) => {
    ctx.body = settings;
    ctx.status = 200;
}

routerPrivate.get('/redirects', allRedirects)
            .get('/redirect/:id', getOne)
            .put('/redirect/:id', updateRedirect)
            .post('/redirect', makeRedirect)
            .delete('/redirect/:id', deleteRedirect)
            .get('/visitors', allVisitors)
            .get('/settings', getSettings)
             

appPublic.use(koaBody({ jsonLimit: '1mb'}));
appPublic.use(routerPublic.routes());
appPublic.listen(3000);


// appPrivate.use(async (ctx) => {
//     ctx.set('Access-Control-Allow-Origin', '*');
//     ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
//   })

appPrivate.use(cors());
appPrivate.use(koaBody({ jsonLimit: '1mb'}));
appPrivate.use(routerPrivate.routes());
appPrivate.listen(3001);

