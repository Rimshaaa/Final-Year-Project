import { useGetFeaturedInfoQuery } from "../../redux/api";
import "./featuredinfo.css";
import { Link, useNavigate } from "react-router-dom";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

export default function Featuredinfo() {
  const { data, isLoading } = useGetFeaturedInfoQuery();
  console.log({ data });

  const totalUsers = data?.users?.restaurant + data?.users?.supplier;
  const totalContracts =
    data?.contracts?.pending +
    data?.contracts?.rejected +
    data?.contracts?.accepted;
  const totalOrders =
    data?.orders?.pending + data?.orders?.dispatched + data?.orders?.received;

  return (
    <div className="featured">
      <Link to="/restaurant" className="featureditem">
        <span className="featuredTitle">Users</span>
        <div className="featuredMoneyContainer">
          <span style={{ fontWeight: "bold" }} className="featuredMoney">
            {isLoading ? <HourglassEmptyIcon /> : totalUsers}
          </span>
        </div>
        <span className="featuredSub">
          Restaurants: {data?.users?.restaurant}
        </span>
        {" | "}
        <span className="featuredSub">Suppliers: {data?.users?.supplier}</span>
        <span className="featuredSub" style={{ display: "block" }}>
          this month
        </span>
      </Link>
      <Link to="/contract" className="featureditem">
        <span className="featuredTitle">Contracts</span>
        <div className="featuredMoneyContainer">
          <span style={{ fontWeight: "bold" }} className="featuredMoney">
            {isLoading ? <HourglassEmptyIcon /> : totalContracts}
          </span>
        </div>
        <span className="featuredSub">Pending: {data?.contracts?.pending}</span>
        {" | "}
        <span className="featuredSub">
          Accepted: {data?.contracts?.accepted}
        </span>
        {" | "}
        <span className="featuredSub">
          Rejected: {data?.contracts?.rejected}
        </span>
        <span className="featuredSub" style={{ display: "block" }}>
          this month
        </span>
      </Link>
      <Link to="/orders" className="featureditem">
        <span className="featuredTitle">Orders</span>
        <div className="featuredMoneyContainer">
          <span style={{ fontWeight: "bold" }} className="featuredMoney">
            {isLoading ? <HourglassEmptyIcon /> : totalOrders}
          </span>
        </div>
        <span className="featuredSub">Pending: {data?.orders?.pending}</span>
        {" | "}
        <span className="featuredSub">
          Accepted: {data?.orders?.dispatched}
        </span>
        {" | "}
        <span className="featuredSub">Rejected: {data?.orders?.received}</span>
        <span className="featuredSub" style={{ display: "block" }}>
          this month
        </span>
      </Link>
    </div>
  );
}
