import { userData } from "../../dummydata";
import Chart from "../../components/charts/Chart";
import { useNavigate } from "react-router-dom";
import "./pfaData.css";

function PfaData() {
  const history = useNavigate();

  const handleClick = () => {
    history("/fdaapprove");
  };

  return (
    <div className="container2">
      <div className="container1">
        <div className="featureditem1" onClick={handleClick}>
          <div className="featuredTitle1">PFA Approved</div>
          <span className="featuredMoney">25 </span>
        </div>

        <div className="featureditem2">
          <div className="featuredTitle1">PFA Disapproved</div>
          <div className="featuredMoney">35</div>
        </div>

        <div className="featureditem3">
          <div className="featuredTitle1">In Progress</div>
          <span className="featuredMoney">10</span>
        </div>
      </div>

      <div className="data">
        <Chart
          data={userData}
          title="User Analytics"
          grid
          dataKey="Active User"
        />
      </div>
    </div>
  );
}

export default PfaData;
