var crypto = require('crypto');
function checkSignature(params,token) {
	var key = [token,params.timestamp,params.nonce].sort().join('');
	var sha1 = crypto.createHash('sha1');
	sha1.update(key);
	return sha1.digest('hex') == params.signature;
};

module.exports = {
	checkSignature : checkSignature
}