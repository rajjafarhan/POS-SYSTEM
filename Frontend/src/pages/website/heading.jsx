const Heading = ({ heading ,style }) => {
    console.log(style)
    return (
      <>
        <div className="container px-3 py-3 heading3 ">
          <h3 style={{style}} >{heading}</h3>
        </div>
      </>
    );
  };
export default Heading;  
