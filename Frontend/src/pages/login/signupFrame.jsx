import { Link } from "react-router-dom";

const SignupFrame = () => {
    return (
        <div className="bg-white shadow p-5  pt-5 mx-5">
          <div>
            <h1 className="text-dgreen x-font">SignUp</h1>
            <div className="mt-5">
              <div>
                <div className="input-container">
                  <input type="text" className="text-black inp_u" name="email" />
                  <label>Name</label>
                </div>
                <div className="input-container">
                  <input type="text" className="text-black" name="password" />
                  <label>Last Name</label>
                </div>
                <div className="input-container">
                  <input type="email" className="text-black" name="password" />
                  <label>Email</label>
                </div>
                <div className="input-container">
                  <input type="password" className="text-black" name="password" />
                  <label>Password</label>
                </div>
              </div>
              <div>
                <button className=" my-3 w-50 mx-auto mustard std-btn">
                 SignUp
                </button>
                <p>Already have an Account? <Link to={'/auth/login'}>Login</Link></p>
              </div>
            </div>
          </div>
        </div>
      );
}

export default SignupFrame;