import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import "./dashboardCard.css";

// KPI tile: label, big value, and an optional change vs the previous month.
// `change` is a percentage (or null when there is nothing to compare with);
// `goodWhenUp` says whether a rise should be shown in green or red.
const DashboardCard = ({ label, value, icon, tone = "brand", change, goodWhenUp = true, hint }) => {
  const hasChange = change !== null && change !== undefined && isFinite(change);
  const up = hasChange && change >= 0;
  const good = up === goodWhenUp;
  return (
    <div className={`dash_card dash_${tone}`}>
      <div className="dash_card_top">
        <p className="dash_label">{label}</p>
        <span className="dash_icon">
          <FontAwesomeIcon icon={icon} />
        </span>
      </div>
      <p className="dash_value">{value}</p>
      <p className="dash_hint">
        {hasChange ? (
          <span className={good ? "dash_good" : "dash_bad"}>
            <FontAwesomeIcon icon={up ? faArrowUp : faArrowDown} /> {Math.abs(change).toFixed(1)}%
          </span>
        ) : null}{" "}
        {hint}
      </p>
    </div>
  );
};

export default DashboardCard;
