import "./seachBar.css";

const SearchBar = ({text, setcurr, refetch, value, setValue, width }) => {
  return (
    <div className="s-div">
      <form className="form">
        <p>
          <svg
            width="17"
            height="16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="search"
          >
            <path
              d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
              stroke="currentColor"
              stroke-width="1.333"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </p>
        <input
          className={`input input-s ${width}`}
          placeholder={text ? text : "Search"}
          value={value}
          onChange={(e) => {
              if (setcurr){
                  setcurr(1)
              }
            setValue(e.target.value);
          }}
          required=""
          type="text"
        />
        
      </form>
    </div>
  );
};

export default SearchBar;
