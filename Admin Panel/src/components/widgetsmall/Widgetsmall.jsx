import React from "react";
import "./widgetsmall.css";
import { Visibility } from "@mui/icons-material";

export default function Widgetsmall() {
  return (
    <div className="Widgetsmall">
      <span className="WidgetsmallTitle">New joined members</span>
      <ul className="WidgetsmallList">
        <li className="WidgetsmallListitem">
          <img
            src="https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg"
            alt=""
            className="Widgetsmallimage"
          />
          <div className="WidgetsmallUser">
            <span className="WidgetsmallUsername">Ali khan</span>
            <span className="WidgetsmallUserTitle">nestle supplier</span>
          </div>
          <button className="WidgetsmallButton">
            <Visibility />
            Display
          </button>
        </li>
        <li className="WidgetsmallListitem">
          <img
            src="https://images.pexels.com/photos/6112353/pexels-photo-6112353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
            className="Widgetsmallimage"
          />
          <div className="WidgetsmallUser">
            <span className="WidgetsmallUsername">Sara khan</span>
            <span className="WidgetsmallUserTitle">kns supplier</span>
          </div>
          <button className="Widgetsmallbutton">
            <Visibility />
            Display
          </button>
        </li>
        <li className="WidgetsmallListitem">
          <img
            src="https://images.pexels.com/photos/2955376/pexels-photo-2955376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
            className="Widgetsmallimage"
          />
          <div className="WidgetsmallUser">
            <span className="WidgetsmallUsername">Rana Mohib</span>
            <span className="WidgetsmallUserTitle">Basha Istabul</span>
          </div>
          <button className="Widgetsmallbutton">
            <Visibility />
            Display
          </button>
        </li>
        <li className="WidgetsmallListitem">
          <img
            src="https://images.pexels.com/photos/6065888/pexels-photo-6065888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
            className="Widgetsmallimage"
          />
          <div className="WidgetsmallUser">
            <span className="WidgetsmallUsername">Rana Fahad</span>
            <span className="WidgetsmallUserTitle">Eggspectation</span>
          </div>
          <button className="Widgetsmallbutton">
            <Visibility />
            Display
          </button>
        </li>
        <li className="WidgetsmallListitem">
          <img
            src="https://images.pexels.com/photos/2122947/pexels-photo-2122947.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
            className="Widgetsmallimage"
          />
          <div className="WidgetsmallUser">
            <span className="WidgetsmallUsername">Fawad khan</span>
            <span className="WidgetsmallUserTitle">GreenLand </span>
          </div>
          <button className="Widgetsmallbutton">
            <Visibility />
            Display
          </button>
        </li>
        <li className="WidgetsmallListitem">
          <img
            src="https://images.pexels.com/photos/5382268/pexels-photo-5382268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
            className="Widgetsmallimage"
          />
          <div className="WidgetsmallUser">
            <span className="WidgetsmallUsername">Fahad Mustafa</span>
            <span className="WidgetsmallUserTitle">Shakespears</span>
          </div>
          <button className="Widgetsmallbutton">
            <Visibility />
            Display
          </button>
        </li>
        <li className="WidgetsmallListitem">
          <img
            src="https://images.pexels.com/photos/3030325/pexels-photo-3030325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
            className="Widgetsmallimage"
          />
          <div className="WidgetsmallUser">
            <span className="WidgetsmallUsername">Atif Aslam</span>
            <span className="WidgetsmallUserTitle">Shanfood</span>
          </div>
          <button className="Widgetsmallbutton">
            <Visibility className="Widgetsmallicon" />
            Display
          </button>
        </li>
      </ul>
    </div>
  );
}
