import { Queue, Worker } from 'bullmq';
import Processes from './processes';
import {updateVisitorGeoInfo} from '../visitor';

import {run} from './geolookup';

const qName = 'queue';

const queue = new Queue(qName);

const worker = new Worker(qName, async (job) => {
    const visitor = job.data;
    console.log("DATA");
    console.log(visitor);

    switch(job.name) {
        case Processes.GEO:
            await run(visitor.id,'1.1.1.1');
            break;
        
    }
});

worker.on('completed', (job) => {
    console.log(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
    console.log(`${job.id} has failed with ${err.message}`);
});

export {queue};