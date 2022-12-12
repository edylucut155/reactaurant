import React from "react";
import Logo from "../../lib/logo/Logo";
import LogoutButton from "../../components/auth/LogoutButton";
import Action from "../../components/dashboard/Action";

const Dashboard = () => {
  return (
    <div>
      <div className="landing-img"></div>
      <div className="modal-well">
        <div className="mid-board">
          <Logo />
          <h1 className="title-style">Dashboard</h1>
          <Action />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
