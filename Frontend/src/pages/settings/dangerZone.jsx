import Modal from "../../components/modal/modal";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {deleteAccount} from "../../functions/settings";
import { useNavigate } from "react-router-dom";

const DangerZone = () => {
	const navigate = useNavigate()
	const mutation = useMutation({
		mutationFn: deleteAccount,
		onSuccess: (data) => {
			alert("Account Deleted successfully!")
			console.log(data)
    localStorage.removeItem("token");
    localStorage.removeItem("name");
			navigate('/auth/login')

		},
		onError:()=>{
			alert("Password is incorrect!")
		}
	})
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPass, setShowPass] = useState(false);
	const [password,setPassword] = useState("")

  return (
    <div className="shadow bg-dzone px-4 pb-4 mt-5 rounded mb-0 b-red">
      {" "}
      <h1 className="x-font text-danger mb-0 py-3">Danger Zone !</h1>
      <div>
        <h2 className="x-font text-danger"> Delete Account</h2>
        <p className="text-dgreen">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <button
          onClick={() => {
            setShowDeleteModal(true);
          }}
          className="btn btn-danger"
        >
          Delete Account
        </button>
      </div>
      {showDeleteModal && (
        <Modal>
          <section className="bg-white rounded p-4 h_20rem">
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="text-dgreen pe-4">Are You Sure? </h1>
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setShowPass(false);
                  }}
                  className="text-dark btn-close border-0 bg-white fs-4"
                  type="button"
                  aria-label="Close"
                ></button>
              </div>
              <div>
                <p className="fs-5">
                  All your shop data will be permanently deleted.
                </p>
                <div className="d-flex justify-content-center align-items-center">
                  <button
                    onClick={() => {
                      setShowPass(true);
                    }}
                    className="btn btn-danger px-5 mx-3"
                  >
                    Yes
                  </button>
                  <button
                    className="px-5 btn btn-danger mx-3"
                    onClick={() => {
                      setShowDeleteModal(false);
                      setShowPass(false);
                    }}
                  >
                    No
                  </button>
                </div>
                {showPass && (
                  <>
                    {" "}
                    <h2 className="text-dgreen mt-4">Enter Your Password</h2>
                    <input
                      type="password"
                      className="mb-3 py-2 w-100 px-2"
                      placeholder="Password"
			value={password}
			onChange={(e) => {
				setPassword(e.target.value)
			}}
                    />
                    <div className="d-flex justify-content-center">
                      <button className="btn btn-danger " onClick={() => {
			      mutation.mutate({password})
		      }}>Confirm</button>
                    </div>{" "}
                  </>
                )}
              </div>
            </div>
          </section>
        </Modal>
      )}
    </div>
  );
};

export default DangerZone;
