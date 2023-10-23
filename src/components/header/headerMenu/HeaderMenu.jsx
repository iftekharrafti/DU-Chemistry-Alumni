import Link from "next/link";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Style from "./headerMenu.module.css";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import { Button, NavDropdown } from "react-bootstrap";
import { FiPhoneCall } from "react-icons/fi";
import { BsFillEnvelopeFill } from "react-icons/bs";

const HeaderMenu = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState("");
  const [isOrganizationDropdownOpen, setIsOrganizationDropdownOpen] =
    useState(false);
  const [isNewsDropdownOpen, setIsNewsDropdownOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleOrganizationMouseEnter = () => {
    setIsOrganizationDropdownOpen(true);
  };

  const handleOrganizationMouseLeave = () => {
    setIsOrganizationDropdownOpen(false);
  };

  const handleNewsMouseEnter = () => {
    setIsNewsDropdownOpen(true);
  };

  const handleNewsMouseLeave = () => {
    setIsNewsDropdownOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isOrganizationDropdownOpen);
  };

  const { data, loading } = useFetch("/home/csfdu");

  useEffect(() => {
    const { pathname } = router;
    setActiveItem(pathname);
  }, [router]);

  return (
    <Navbar collapseOnSelect expand="lg" className={Style.navbar}>
      <Container>
        <Navbar.Brand className={Style.menuBrand}>
          <img className={Style.logo} src="./logo.png" alt="" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className={`${isOrganizationDropdownOpen ? "show" : ""} `}
          in={expanded}
        >
          <Nav
            className={`${Style.nav} ms-auto justify-content-end d-flex menu-right p-0`}
          >
            <Nav>
              <Link
                href="/"
                className={`${activeItem === "/" ? Style.active : ""} ${
                  Style.link
                }`}
                onClick={() => setExpanded(false)}
              >
                Home
              </Link>
            </Nav>
            <Nav
              className={`${Style.dropdown}`}
            >
              <NavDropdown
                title="Organization"
                id="basic-nav-dropdown"
                className={Style.customDropdown}
                show={isOrganizationDropdownOpen}
                onMouseEnter={handleOrganizationMouseEnter}
                onMouseLeave={handleOrganizationMouseLeave}
              >
                <NavDropdown.Item className={`${Style.dropdownItem} py-2 px-3`}>
                  <Link
                    href="/journey"
                    className={Style.link}
                    onClick={() => setExpanded(false)}
                  >
                    Journey of DUCAA
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item className={`${Style.dropdownItem} py-2 px-3`}>
                  <Link
                    href="/executive"
                    className={Style.link}
                    onClick={() => setExpanded(false)}
                  >
                    Executive Comitte
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item className={`${Style.dropdownItem} py-2 px-3`}>
                  <Link
                    href="/lifeMember"
                    className={Style.link}
                    onClick={() => setExpanded(false)}
                  >
                    Life Member
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item className={`${Style.dropdownItem} py-2 px-3`}>
                  <Link
                    href="/general"
                    className={Style.link}
                    onClick={() => setExpanded(false)}
                  >
                    Member
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item className={`${Style.dropdownItem} py-2 px-3`}>
                  <Link
                    href="/expre"
                    className={Style.link}
                    onClick={() => setExpanded(false)}
                  >
                    Pass Leaders
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item className={`${Style.dropdownItem} py-2 px-3`}>
                  <Link
                    href="/expre"
                    className={Style.link}
                    onClick={() => setExpanded(false)}
                  >
                    DUCCA Documents
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav
              className={`${Style.dropdown}`}
            >
              <NavDropdown
                title="News & Events"
                id="basic-nav-dropdown"
                className={Style.customDropdown}
                show={isNewsDropdownOpen}
                onMouseEnter={handleNewsMouseEnter}
                onMouseLeave={handleNewsMouseLeave}
              >
                <NavDropdown.Item className={`${Style.dropdownItem} py-2 px-3`}>
                  <Link
                    href="/notice"
                    className={Style.link}
                    onClick={() => setExpanded(false)}
                  >
                    Notice Board
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item className={`${Style.dropdownItem} py-2 px-3`}>
                  <Link
                    href="/general"
                    className={Style.link}
                    onClick={() => setExpanded(false)}
                  >
                    Upcoming Events
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item className={`${Style.dropdownItem} py-2 px-3`}>
                  <Link
                    href="/general"
                    className={Style.link}
                    onClick={() => setExpanded(false)}
                  >
                    Post Events
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Nav>
              <Link
                href="/gallery"
                className={`${activeItem === "/gallery" ? Style.active : ""} ${
                  Style.link
                }`}
                onClick={() => setExpanded(false)}
              >
                Gallery
              </Link>
            </Nav>
            <Nav>
              <Link
                href="/contact"
                className={`${
                  activeItem === "/executive" ? Style.active : ""
                } ${Style.link}`}
                onClick={() => setExpanded(false)}
              >
                Contact Us
              </Link>
            </Nav>
            <Nav>
              <Link
                href="/Miscellaneous"
                className={`${activeItem === "/magazine" ? Style.active : ""} ${
                  Style.link
                }`}
                onClick={() => setExpanded(false)}
              >
                Miscellaneous
              </Link>
            </Nav>
          </Nav>
          <div className={Style.topHeader}>
            <div className="mb-2">
              <div className="mb-2">
                <FiPhoneCall className={`${Style.icon} me-1`} />
                +74837483748
              </div>
              <div>
                <BsFillEnvelopeFill className={`${Style.icon} me-1`} />
                jekono@gmail.com
              </div>
            </div>
            <div>
              <Button className="mb-2" size="sm">Membership Application</Button> <br />
              <Button size="sm">Login</Button>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderMenu;
