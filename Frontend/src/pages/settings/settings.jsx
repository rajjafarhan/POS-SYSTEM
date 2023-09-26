import {TextField} from "@mui/material";
import "./settings.css";
import {useMutation} from "@tanstack/react-query";
import {postbasicinfo } from "../../functions/settings";
import { useOutletContext } from "react-router-dom";

const BasicInfo = () => {
	const [basicInfo,setBasicInfo] = useOutletContext()
	const mutation = useMutation({
		mutationFn: postbasicinfo,
		onSuccess: () => {
			alert("basic info saved successfuly");
		},
	});
	const handleChange = (e) => {
		const {name, value} = e.target;
		setBasicInfo({...basicInfo, [name]: value});
	};

	const submit = (e) => {
		e.preventDefault();
		mutation.mutate(basicInfo);
	};
	return (
		<div className="mms-4 bg-lgreen rounded shadow mw-75">
			<h2 className="m-4 x-font text-dgreen">Basic Info</h2>
			<div>
				<div className="d-flex fd-c justify-content-around mmy-3">
					<TextField
						value={basicInfo?.shopName}
						focused={basicInfo?.shopName !== ""}
						onChange={(e) => {
							handleChange(e)
						}}
						className="bg-white rounded shadow textfield_w"
						id="outlined-search"
						name="shopName"
						label="Shop Name"
						type="search"
					/>
					<TextField
						value={basicInfo?.ownerName}
						focused={basicInfo?.ownerName !== ""}
						onChange={(e) => {
							handleChange(e)
						}}
						className="bg-white rounded shadow textfield_w"
						id="outlined-search"
						name="ownerName"
						label="Owner Name"
						type="search"
					/>
				</div>
				<div className="d-flex fd-c justify-content-around mmy-5">
					<TextField
						focused={basicInfo?.shopAdd !== ""}
						value={basicInfo?.shopAdd}
						onChange={(e) => {
							handleChange(e)
						}}
						className="bg-white rounded shadow textfield_w"
						id="outlined-search"
						name="shopAdd"
						label="Shop Address"
						type="search"
					/>
					<TextField
						value={basicInfo?.contactNo}
						focused={basicInfo?.contactNo !== ""}
						onChange={(e) => {
							handleChange(e)
						}}
						className="bg-white rounded shadow textfield_w"
						id="outlined-search"
						name="contactNo"
						label="Shop Contact No"
						type="search"
					/>
				</div>
			</div>
			<div className="d-flex justify-content-center mt-4">
				<button
					onClick={submit}
					className="btn px-5 py-2 shadow fs-5 bg-dgreen text-light"
				>
					{" "}
					Save
				</button>
			</div>
		</div>
	);
};

export default BasicInfo;
