/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Container, Dropdown } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import Style from "./dashboard.module.css";
import Link from "next/link";
import { baseImgUrl } from "@/utils/imgUrl";
import Cookies from "js-cookie";
import { BiSolidEditLocation } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { RiLockPasswordFill } from "react-icons/ri";
import { useRouter } from "next/router";

const DashboardHeader = ({ open, setOpen }) => {
  const [itemValue, setItemValue] = useState(null);
  const router = useRouter();

  const handleControlSidebar = () => {
    setOpen(!open);
  };

  // Logout button
  const handleLogout = () => {
    Cookies.remove("TOKEN_LOGIN");
    localStorage.removeItem("user-info");
    router.push("/");
  };

  useEffect(() => {
    const storedValue = localStorage?.getItem("user-info");
    if (storedValue) {
      const parseData = JSON.parse(storedValue);
      setItemValue(parseData);
    }
  }, []);

  return (
    <div className={`${Style.dashboardHeader} pt-2`}>
      <div className="d-flex justify-content-between">
        <div>
          <div className="d-flex d-block">
            <button
              className={`${Style.barIcon} btn px-1 py-0 open-btn ms-4`}
              onClick={handleControlSidebar}
            >
              <FaBars className="fs-4" />
            </button>
              <span class="ps-3 fs-4 fw-bold text-black">DUCAA</span>
          </div>
        </div>
        <div>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" className={Style.dropdown} style={{margin: 0, padding: 0, background: 'transparent',  border: 'none'}}>
              {
                itemValue?.profile_image !== null ? (
                  <img
                src={baseImgUrl + itemValue?.profile_image}
                className={Style.dropdownImg}
                alt=""
              />
                ) : (
                  <img
                src="./default.png"
                className={Style.dropdownImg}
                alt=""
              />
                )
              }
              
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item>
                <Link href="/dashboard/profile" className="text-decoration-none text-black d-flex align-items-center"><CgProfile className="me-1" /> Profile</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link href="/dashboard/updateInfo" className="text-decoration-none text-black d-flex align-items-center"><BiSolidEditLocation className="me-1" /> Update Profile</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link href="/dashboard/changePassword" className="text-decoration-none text-black d-flex align-items-center"><RiLockPasswordFill className="me-1" /> Change Password</Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>
              <span className="d-flex align-items-center"><FiLogOut className="me-1" /> Log out</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
