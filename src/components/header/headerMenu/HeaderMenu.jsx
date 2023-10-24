/* eslint-disable @next/next/no-img-element */
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

  useEffect(() => {
    const { pathname } = router;
    setActiveItem(pathname);
  }, [router]);

  return (
    <Navbar collapseOnSelect expand="lg" className={Style.navbar}>
      <Container>
        <Navbar.Brand className={Style.menuBrand}>
          <Link href="/">
            <img className={Style.logo} src="./logo.png" alt="" />
          </Link>
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
            {/* Home Link */}
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
            {/* Organization Link */}
            <Nav className={`${Style.dropdown}`}>
              <NavDropdown
                title="Organization"
                id="basic-nav-dropdown"
                className={Style.customDropdown}
                show={isOrganizationDropdownOpen}
                onMouseEnter={handleOrganizationMouseEnter}
                onMouseLeave={handleOrganizationMouseLeave}
              >
                {/* Journey Link */}
                <NavDropdown.Item className={`${Style.dropdownItem} py-2 px-3`}>
                  <Link
                    href="/journey"
                    className={Style.link}
                    onClick={() => {
                      setExpanded(false);
                      setIsOrganizationDropdownOpen(false);
                    }}
                  >
                    Journey of DUCAA
                  </Link>
                </NavDropdown.Item>
                {/* Execute Comitte */}
                <NavDropdown.Item className={`${Style.dropdownItem} py-2 px-3`}>
                  <Link
                    href="/executive"
                    className={Style.link}
                    onClick={() => {
                      setExpanded(false);
                      setIsOrganizationDropdownOpen(false);
                    }}
                  >
                    Executive Comittee
                  </Link>
                </NavDropdown.Item>
                {/* Life Member Link */}
                <NavDropdown.Item className={`${Style.dropdownItem} py-2 px-3`}>
                  <Link
                    href="/lifeMember"
                    className={Style.link}
                    onClick={() => {
                      setExpanded(false);
                      setIsOrganizationDropdownOpen(false);
                    }}
                  >
                    Life Member
                  </Link>
                </NavDropdown.Item>
                {/* General Member Link */}
                <NavDropdown.Item className={`${Style.dropdownItem} py-2 px-3`}>
                  <Link
                    href="/general"
                    className={Style.link}
                    onClick={() => {
                      setExpanded(false);
                      setIsOrganizationDropdownOpen(false);
                    }}
                  >
                    Member
                  </Link>
                </NavDropdown.Item>
                {/* Ex president secretary link */}
                <NavDropdown.Item className={`${Style.dropdownItem} py-2 px-3`}>
                  <Link
                    href="/exLeader"
                    className={Style.link}
                    onClick={() => {
                      setExpanded(false);
                      setIsOrganizationDropdownOpen(false);
                    }}
                  >
                    Pass Leaders
                  </Link>
                </NavDropdown.Item>
                {/* Documents Link */}
                <NavDropdown.Item className={`${Style.dropdownItem} py-2 px-3`}>
                  <Link
                    href="/document"
                    className={Style.link}
                    onClick={() => {
                      setExpanded(false);
                      setIsOrganizationDropdownOpen(false);
                    }}
                  >
                    DUCCA Documents
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className={`${Style.dropdown}`}>
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
                    onClick={() => {
                      setExpanded(false);
                      setIsNewsDropdownOpen(false);
                    }}
                  >
                    Notice Board
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item className={`${Style.dropdownItem} py-2 px-3`}>
                  <Link
                    href="/upcomingEvent"
                    className={Style.link}
                    onClick={() => {
                      setExpanded(false);
                      setIsNewsDropdownOpen(false);
                    }}
                  >
                    Upcoming Events
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item className={`${Style.dropdownItem} py-2 px-3`}>
                  <Link
                    href="/pastEvent"
                    className={Style.link}
                    onClick={() => {
                      setExpanded(false);
                      setIsNewsDropdownOpen(false);
                    }}
                  >
                    Past Events
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

              {/* Gallery Link */}
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
            {/* Contact */}
            <Nav>
              <Link
                href="/contact"
                className={`${activeItem === "/contact" ? Style.active : ""} ${
                  Style.link
                }`}
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
              <Link href="/application">
                <Button className="mb-2" size="sm" onClick={() => setExpanded(false)}>
                  Membership Application
                </Button>
              </Link>
              <br />
              <Link href="/login" onClick={() => setExpanded(false)}>
                <Button size="sm">Login</Button>
              </Link>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderMenu;
