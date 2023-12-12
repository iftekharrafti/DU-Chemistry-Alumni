import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BiSolidEditLocation } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import { AiFillDashboard, AiFillHome } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { FaMoneyCheck } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import Style from "./dashboardLeftSide.module.css";
import DashboardHeader from "../dashboardHeader/DashboardHeader";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const DashboardLeftSide = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState("");
  const [open, setOpen] = useState(false);

  // Collect path name and show the active button
  useEffect(() => {
    const { pathname } = router;
    setActiveItem(pathname);
  }, [router]);

  const handleLogout = () => {
    Cookies.remove("TOKEN_LOGIN");
    localStorage.removeItem("user-info");
    router.push("/");
  };

  return (
    <>
    {/* Dashboard Header */}
      <DashboardHeader open={open} setOpen={setOpen} />

      {/* Dashboard Left Side bar */}
      <div
        className={`${Style.sidebar} ${open ? Style.active : null}`}
        id="side_nav"
      >

        <ul className="list-unstyled px-2 pt-4">
          <li className="">
            <Link
              href="/dashboard"
              className={`${Style.link} ${
                activeItem === "/dashboard" ? Style.active : ""
              } text-decoration-none px-3 py-2 d-block d-flex align-items-center`}
            >
              <AiFillDashboard className="me-1" /> Dashboard
            </Link>
          </li>
          <li className="">
            <Link
              href="/"
              className={`${Style.link} ${
                activeItem === "/" ? Style.active : ""
              } text-decoration-none px-3 py-2 d-block d-flex align-items-center`}
            >
              <AiFillHome className="me-1" /> Home
            </Link>
          </li>
          <li className="">
            <Link
              href="/dashboard/bookingCategory"
              className={`${Style.link} ${
                activeItem === "/dashboard/bookingCategory" ? Style.active : ""
              } text-decoration-none px-3 py-2 d-block d-flex align-items-center`}
            >
              <MdCategory className="me-1" /> Booking Category
            </Link>
          </li>
          <li className="">
            <Link
              href="/dashboard/payment"
              className={`${Style.link} ${
                activeItem === "/dashboard/payment" ? Style.active : ""
              } text-decoration-none px-3 py-2 d-block d-flex align-items-center`}
            >
              <FaMoneyCheck className="me-1" /> Payment
            </Link>
          </li>
          <li className="">
            <Link
              href="/dashboard/updateInfo"
              className={`${Style.link} ${
                activeItem === "/dashboard/updateInfo" ? Style.active : ""
              } text-decoration-none px-3 py-2 d-block d-flex align-items-center`}
            >
              <BiSolidEditLocation className="me-1" /> Update Profile
            </Link>
          </li>


        </ul>
      </div>
    </>
  );
};

export default DashboardLeftSide;
