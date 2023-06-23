import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";

import { Dropdown, Space } from "antd";

async function handleLogout() {
  localStorage.clear();
  window.location.replace("/");
}

const items = [
  {
    label: (
      <Link to={"/"} className="text-lg font-bold ">
        {localStorage.getItem("uname")}
      </Link>
    ),
    key: "0",
  },
  {
    type: "divider",
  },
  {
    label: (
      <button className="logout-btn" onClick={() => handleLogout()}>
        Logout
      </button>
    ),
    key: "2",
  },
];

export default function Navbar() {

  return (
    <div className="navbar ">
      <div className="user-control text-white font-bold" title="User _info">
        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
        >
          <div className="bg-black">
            <AiOutlineUser className="text-3xl" />
          </div>
        </Dropdown>
      </div>
    </div>
  );
}
