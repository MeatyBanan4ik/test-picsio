export const getUniqueFlatArr = arr => Array.from(new Set(arr.flatMap(item => Object.keys(item))));

export default getUniqueFlatArr;
