export default function getDurationInMilliseconds (start: any) :number {
	const NS_PER_SEC = 1e9;
	const NS_TO_MS = 1e6;
	const diff = process.hrtime(start);
	return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}

// exports.parseJWT = function (token: String){
// 	let base64Payload = token.split('.')[1];
// 	let payload = Buffer.from(base64Payload, 'base64');
// 	return JSON.parse(payload.toString());
// }