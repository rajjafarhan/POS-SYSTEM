import axios from "axios";

export const postVendorReceipt = (data) => {
	const token = localStorage.getItem("token");
	const bearer = "Bearer " + token;
	return axios.post("http://localhost:3000/api/vendor", data, {
		headers: {
			authorization: `Bearer ${token}`,
		},
	});
};

export const fetchVendorReceipts = async ({queryKey}) => {
	const offSet = queryKey[1];
	let query = "aisPsqSjMUDTj387Ol"
	if (queryKey[2] !== ''){

		 query = queryKey[2];
	}
	const token = localStorage.getItem("token");
	const bearer = "Bearer " + token;
	const res = await axios.get(`http://localhost:3000/api/vendor/${offSet}/${query}`, {
		headers: {
			authorization: bearer,
		},
	});


	return res;
};
