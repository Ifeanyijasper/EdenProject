import { DateString } from "./date";

const searchObj = (text, data, setData, type) => {
    let filteredKeys = Object.keys(data).filter((p) => {
        if(p === undefined) {
            return null;
        }
        let _services = `${DateString(p).toLowerCase()}`;
        let _text = text.toLowerCase();
        return _services.indexOf(_text) > -1;
    });

    const filteredData = Object.keys(data).filter(key => filteredKeys.includes(key))
        .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
        }, {});
    setData(filteredData);
};

export default searchObj;