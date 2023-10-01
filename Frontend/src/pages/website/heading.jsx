const Heading = ({ heading }) => {
    return (
      <>
        <div className="container d-flex justify-content-center p-2">
          <h1  style={{fontFamily:"font-family: 'Poppins', sans-serif;" ,fontSize:"3rem", fontWeight:"15rem" }}>{heading}</h1>
        </div>
      </>
    );
  };
export default Heading;  