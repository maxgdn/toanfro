const path = require('path');
import { Reader } from '@maxmind/geoip2-node';
import {updateVisitorGeoInfo} from '../../visitor';

const geoDbPath = path.join(__dirname + '../../../../../geodb');

const asnPath = 'GeoLite2-ASN.mmdb';
const cityPath = 'GeoLite2-City.mmdb';

const createReader = async (target: string) => {
    return await Reader.open(path.join(geoDbPath,target), {});
}

const lookup = async (ip: string) => {
    try {
        let reader = await createReader(asnPath);
        const asn = reader.asn(ip);
        reader = await createReader(cityPath);
        const city = reader.city(ip);
        
        //asn
        const asnFinal = asn;

        //geoinfo

        //@ts-ignore
        const code = {code: city.continent.code};
        //@ts-ignore
        const countryISO = {countryISO: city.country.isoCode};
        //@ts-ignore
        const continent = {continent: city.continent.names.en};
        //@ts-ignore
        const countryName = {countryName: city.country.names.en};
        //@ts-ignore
        const location = city.location;
        //@ts-ignore
        const postal = city.postal;
        //@ts-ignore
        const traits = city.traits;

        const geoFinal = Object.assign({},code,continent,countryISO,countryName,location,postal,traits);

        return Object.assign({},asnFinal,geoFinal);
    } catch (error) {
        console.log(error);
        return null;
    }
}

const run = async (uuid: string, ip: string) => {
    const result = await lookup(ip);
    console.log(uuid);
    console.log(ip);
    await updateVisitorGeoInfo(result, uuid);
};

export {run};