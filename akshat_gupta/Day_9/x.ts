type call = {
    d: Number,
    e: number
}
let x:call = {d:9,e:9};
Object.entries(x).forEach((val) => {
    console.log(val[0]);
})
let a = {
    "_id": "5ef4a412aab3841847750ce8",
    "name": "John Doe",
    "trips": 250,
    "airline": [
        {
            "id": 5,
            "name": "Eva Air",
            "country": "Taiwan",
            "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/EVA_Air_logo.svg/250px-EVA_Air_logo.svg.png",
            "slogan": "Sharing the World, Flying Together",
            "head_quaters": "376, Hsin-Nan Rd., Sec. 1, Luzhu, Taoyuan City, Taiwan",
            "website": "www.evaair.com",
            "established": "1989"
        }
    ],
    "__v": 0
}
type entry = {
	_id: string;
	name: string;
	trips: number;
	airline: Array<aline>;
	__v: number;
}

type aline = {
	id: number,
	name: string,
	country: string,
	logo: string,
	head_quaters: string,
	website: string,
	established: string
}
let b = {
    "_id": "5ef4a412aab3841847750ce8",
    "name": "John Doe",
    "trips": 250,
    "airline": [
        {
            "id": 5,
            "name": "Eva Air",
            "country": "Taiwan",
            "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/EVA_Air_logo.svg/250px-EVA_Air_logo.svg.png",
            "slogan": "Sharing the World, Flying Together",
            "head_quaters": "376, Hsin-Nan Rd., Sec. 1, Luzhu, Taoyuan City, Taiwan",
            "website": "www.evaair",
            "established": "1989"
        }
    ],
    "__v": 0
}
let f:entry = a;
f = b;
console.log(f);