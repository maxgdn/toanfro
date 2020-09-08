const JavaScriptObfuscator = require('javascript-obfuscator');
import {build} from './rollit';

let _result = "";
const getScript = async () => {

    if(_result == "") {
        let result = await build();
        _result = result;
        return _result;
    } else {
        return _result;
    }
}

export {getScript};