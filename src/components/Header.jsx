import React from "react";
import HighlightIcon from "@mui/icons-material/Highlight";

function Header(props) {
  return (
    <header>
      <h1>
        <HighlightIcon />
        Keeper
        <button onClick={props.logout} className="logout-btn">Logout</button>
      </h1>
      
    </header>
  );
}

export default Header;
