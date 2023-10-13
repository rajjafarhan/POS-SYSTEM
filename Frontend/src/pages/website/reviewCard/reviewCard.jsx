const ReviewCard = ({ reviewBody, imgSrc, name, starCount }) => {
    return (
      <div className="reviewcard bg-light shadow-lg ">
        <div className="h-100 w-100 container position-relative">
          <p>{reviewBody}</p>
          <div className="position-absolute d-flex  align-items-center">
            <img className="mx-2 rounded-circle " src={imgSrc} alt="" />
            <div className="d-flex flex-column align-items-start justify-content-around">
              <p className="p-0 fs-4 m-0">{name}</p>
              <div className="d-flex">
                {Array.from({ length: starCount }, (_, index) => (
                  <i
                    key={index}
                    className="mx-1 fs-5 text-warning fa-solid fa-star"
                  ></i>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ReviewCard;
  