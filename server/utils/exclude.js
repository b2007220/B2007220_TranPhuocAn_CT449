module.exports = function (obj, keys = []) {
	return Object.fromEntries(Object.entries(obj).filter(([key]) => !keys.includes(key)));
};
