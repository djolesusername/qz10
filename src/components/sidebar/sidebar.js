import Toggle from "../../toggle";
import React, { PureComponent } from "react";
import logo from "../../assets/logo.svg";
import profilePic from "../../assets/image-avatar.jpg";
import "../../toggle.css";
import "./sidebar.css";
import { Link, BrowserRouter } from "react-router-dom";

export default class Sidebar extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <div className="logo-holder">
          <div className="logo-holder1"></div>
          <div className="logo-holder2">
            <BrowserRouter forceRefresh={true}>
              <Link to="/">
                <img src={logo} className="logo" alt="Logo" />
              </Link>
            </BrowserRouter>
          </div>
        </div>
        <div className="navbar-bottom">
          <Toggle />
          <a href="/">
            {" "}
            <img src={profilePic} alt="profilePic" className="profilePicture" />
          </a>
        </div>
      </React.Fragment>
    );
  }
}
