import {build} from './rollit';

let _result = "";

build().then(v => {
    _result = v;
});

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