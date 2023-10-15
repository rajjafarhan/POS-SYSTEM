import "./banner.css";
import img2 from "../../../../assets/logo1.png";
// import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <>
      <div
        style={{ backgroundColor: "#daeaf0" }}
        className="container-fluid banner "
      >
        <div className="row  banner">
          <div className="col-md-8 ">
            <div className="textbanner px-5">
              <h2>Unlocking Limitless Innovation</h2>
              <h3>Welcome to the Idea Vault</h3>
              <h5 style={{ marginTop: "4%" }}>
                {" "}
                <i
                  style={{ marginRight: "4%" }}
                  className="fa-solid fa-check my-2"
                ></i>
                Idea Poster
              </h5>
              <h5>
                <i
                  style={{ marginRight: "4%" }}
                  className="fa-solid fa-check my-2"
                ></i>{" "}
                Investor
              </h5>
              {/* <a href="/"> <Link to={"./aboutus"}>Explore</Link></a> */}
            </div>
          </div>
          <div
            className="col-md-4 bannerimg "
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="https://img.freepik.com/free-vector/bathroom-interior-realistic-design_1284-14400.jpg?w=826&t=st=1696772223~exp=1696772823~hmac=18cbeb7d46e562bc4794ce437d5bc9497eec9f411f400794d526228aeb470929"
              alt="uu"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Banner;
