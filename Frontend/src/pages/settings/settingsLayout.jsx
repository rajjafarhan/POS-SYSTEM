import {Outlet} from "react-router-dom";
import {Link} from "react-router-dom";
import {useLocation} from "react-router-dom";
import { useState,useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBasicInfo } from "../../functions/settings";

const SettingsLayout = ({children}) => {
	const loc = useLocation();
	const pathName = loc.pathname;

	const {data, isSuccess} = useQuery(['basicInfo'], fetchBasicInfo)
	const [basicInfo, setBasicInfo] = useState({});
	console.log(data)
	useEffect(() => {
		setBasicInfo(data?.data?.row)
	}, [data])
	return (
		<div className="container settings_main">
			<div>
				<h1 className="x-font text-dgreen">Settings</h1>
			</div>
			<div className="d-flex set-mob me-4 my-4">
				<div className="bg-dgreen setnav-mob text-dgreen rounded snav_h shadow mw-25">
					<div>
						<div className="my-4">
							<Link to={"/pos/settings/basicinfo"}>
								<li
									className={`${pathName === "/pos/settings/basicinfo"
											? "bg_sl"
											: "bg-dgreen"
										} my-2 fs-5 text-light s_hover py-2 ps-3 w-100 h-100`}
								>
									Basic Info
								</li>
							</Link>
							<Link to={"/pos/settings/accsettings"}>
								<li
									className={`${pathName === "/pos/settings/accsettings"
											? "bg_sl "
											: "bg-dgreen"
										} my-2 fs-5 text-white s_hover py-2 ps-3 w-100 h-100`}
								>
									Account Settings
								</li>
							</Link>
						</div>
					</div>
				</div>
				<Outlet context={[basicInfo,setBasicInfo]}/>
			</div>
		</div>
	);
};

export default SettingsLayout;
