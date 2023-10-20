const Heading = ({ id,heading ,style }) => {
    console.log(style)
    return (
      <>
        <div id={id} className="container px-3 py-4 heading3 ">
          <h3 style={{style}} >{heading}</h3>
        </div>
      </>
    );
  };
export default Heading;  
