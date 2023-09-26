import {TextField} from "@mui/material";
import DangerZone from "./dangerZone";
import {useOutletContext} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {postEmail} from "../../functions/settings";

const AccountSettings = () => {
	const [basicInfo, setBasicInfo] = useOutletContext()
	const mutation = useMutation({
		mutationFn: postEmail,
		onSuccess: () => {
			alert("Email Saved Successfully!")
		}
	})
	const handleChange = (e) => {
		const {name, value} = e.target
		setBasicInfo({...basicInfo, [name]: value})
	}
	const submit = (e) => {
		e.preventDefault()
		mutation.mutate(basicInfo)

	}
	console.log(basicInfo)
	return (
		<div className="mms-4 bg-lgreen rounded shadow mw-75">
			<h2 className="m-4 x-font text-dgreen">Account Settings</h2>
			<div className="mx-4">
				<div className="d-flex flex-column my-3">
					<h3 className="x-font text-dgreen">Email</h3>
					<TextField
						value={basicInfo?.username}
						onChange={(e) => {
							handleChange(e)
						}}
						focused={basicInfo?.username !== ""}
						className="bg-white rounded shadow w-100"
						id="outlined-search"
						name="username"
						label="Email"
						type="search"
					/>
				</div>
				<div className="d-flex justify-content-center mt-4 ">
					<button onClick={submit} className="btn px-5 py-2 shadow fs-5 bg-dgreen text-light">
						{" "}
						Save
					</button>
				</div>
				<div className="d-flex flex-column justify-content-around my-3">
					<h3 className="x-font text-dgreen">Reset Password</h3>
					<TextField
						className="bg-white rounded shadow w-100 my-2"
						id="outlined-search"
						name="newPass"
						label="New Password"
						type="password"
					/>
					<TextField
						className="bg-white rounded shadow w-100 my-2"
						id="outlined-search"
						name="confirmPass"
						label="Confirm Password"
						type="password"
					/>
				</div>
			</div>
			<div className="d-flex justify-content-center mt-4 mb-4">
				<button className="btn px-5 py-2 shadow fs-5 bg-dgreen text-light">
					{" "}
					Save
				</button>
			</div>
			<DangerZone />
		</div>
	);
};

export default AccountSettings;
