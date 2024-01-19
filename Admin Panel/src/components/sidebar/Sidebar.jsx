import "./sidebar.css";
import {
  LineStyle,
  TrendingUp,
  PermIdentity,
  Store,
  AttachMoney,
  Assessment,
  Mail,
} from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReportIcon from "@mui/icons-material/Report";
import { NavLink } from "react-router-dom";
import { BarChart } from "recharts";
export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <div className="sidebarList">
            <NavLink to="/admin" className="sidebarListItem ">
              <LineStyle className="sidebarIcon" />
              Home
            </NavLink>

            {/* <NavLink to="/pfadata" className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              PFA data
            </NavLink> */}
          </div>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <div className="sidebarList">
            <NavLink to="/restaurant" className="sidebarListItem">
              <PermIdentity className="sidebarIcon" />
              Restaurants
            </NavLink>
            <NavLink to="/supplier" className="sidebarListItem  ">
              <Store className="sidebarIcon" />
              Suppliers
            </NavLink>

            <NavLink to="/contract" className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              Contracts
            </NavLink>
            <NavLink to="/orders" className="sidebarListItem">
              <ShoppingCartIcon className="sidebarIcon" />
              Orders
            </NavLink>
            <NavLink to="/disputes" className="sidebarListItem">
              <ReportIcon className="sidebarIcon" />
              File Disputes
            </NavLink>
            {/* <NavLink to="/newUser" className="sidebarListItem">
              <Assessment className="sidebarIcon" />
              Accounts
            </NavLink>
            <NavLink to="" className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Report
            </NavLink> */}
          </div>
        </div>
        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <div className="sidebarList">
            <NavLink to="" className="sidebarListItem active">
              <Mail className="sidebarIcon" />
              Mail
            </NavLink>
          </div>
        </div> */}
      </div>
    </div>
  );
}
