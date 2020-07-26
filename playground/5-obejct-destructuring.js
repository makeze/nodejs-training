const objectExample = {
    name: 'simple',
    type: 'object',
    extras: 'none',
    valid: true,
};

console.log(objectExample);

const {name: objectName, type, extras, timestamp = Date.now() } = objectExample;

console.log(objectName);
console.log(type);
console.log(extras);
console.log(timestamp);

const operation = (objectType, { name = 'name', extras='extras' } = {}) => {
    console.log(objectType, name, extras);
};

operation('read', objectExample);
operation('read');