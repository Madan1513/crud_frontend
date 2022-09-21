import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing-conatiner">
      <div>This is the Landing Page of the application.</div>
      <br />
      <br />
      <Link to="home">Click to view CRUD page</Link>
    </div>
  );
};

export default Landing;
