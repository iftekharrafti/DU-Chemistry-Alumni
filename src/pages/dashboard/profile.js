/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import DashboardLeftSide from "@/components/dashboard/dashboardLeftSide/DashboardLeftSide";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { BASE_URL } from "@/utils/api";
import axios from "axios";
import Style from "@/styles/dashboard/profile.module.css";
import Link from "next/link";
import { baseImgUrl } from "@/utils/imgUrl";
import { toast } from "react-toastify";

export default function Profile() {
  const [data, setData] = useState({});
  const router = useRouter()
  console.log(data?.blood)

  useEffect(() => {
    const cookieValue = Cookies.get("TOKEN_LOGIN");

    axios
      .get(BASE_URL + "/member_profile", {
        headers: {
          // Set your cookie in the request headers
          TOKEN_LOGIN: cookieValue,
        },
      })
      .then((response) => {
        if(response?.data?.status === 500){
          toast.error(response?.data?.message)
          router.push('/login');
        }
        setData(response?.data?.data);
      });
  }, []);
  return (
    <>
      <Head>
        <title>DASHBOARD::Profile::Dhaka University Chemistry Alumni Association</title>
        <meta name="description" content="{data?.admin?.nameen}" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./favicon.jpeg" />
      </Head>
      <main>
        {/* {loading ? (
          <div className="loadingContainer">
            <img src="./loading.gif" alt="" className="loadingGif" />
          </div>
        ) : ( */}
        <>
          <div className={`${Style.mainContainer} d-flex`}>
            {/* Dashboard Left Side and Header */}
            <DashboardLeftSide />

            {/* Main Content */}
            <div className={`${Style.content} px-4`}>
              {/* Profile Details Title */}
              <div
                className="headerTitle text-left mt-4"
                style={{ textAlign: "left", height: '7vh' }}
              >
                <h3 class="headerTitleMain " style={{ textAlign: "left" }}>
                  My Profile
                </h3>
              </div>
              <Row>
                <Col md={9} sm={12}>
                  <div className={Style.profileBox}>
                    <Row>
                      <Col md={2} sm={12} className="">
                        <div className={Style.imgUpdateButton}>
                          <img
                            src={baseImgUrl + data?.profile_image}
                            style={{
                              width: "150px",
                              height: "150px",
                              borderRadius: "50%",
                            }}
                          />
                          {/* <br /> */}
                          <Link
                            href="/dashboard/updateInfo"
                            className="text-center mt-2"
                          >
                            <Button>Edit Profile</Button>
                          </Link>
                        </div>
                      </Col>
                      <Col md={5} sm={12}>
                        <div className={`${Style.titleSubTitle}`}>
                          <div className="mb-3">
                            <h3 className={Style.title}>Full Name</h3>
                            <h5 className={Style.subTitle}>{data?.name}</h5>
                          </div>
                          <div className="mb-3">
                            <h3 className={Style.title}>Email Address</h3>
                            <h5 className={Style.subTitle}>{data?.email}</h5>
                          </div>
                          <div className="mb-3">
                            <h3 className={Style.title}>Degree Category</h3>
                            <h5 className={Style.subTitle}>
                              {data?.degree_category}
                            </h5>
                          </div>
                          <div className="mb-3">
                            <h3 className={Style.title}>Gender</h3>
                            <h5 className={Style.subTitle}>{data?.gender}</h5>
                          </div>
                          <div className="mb-3">
                            <h3 className={Style.title}>Country</h3>
                            <h5 className={Style.subTitle}>{data?.country}</h5>
                          </div>
                          <div className="mb-3">
                            <h3 className={Style.title}>Occupation</h3>
                            <h5 className={Style.subTitle}>
                              {data?.occupation}
                            </h5>
                          </div>
                          <div className="mb-3">
                            <h3 className={Style.title}>Designation</h3>
                            <h5 className={Style.subTitle}>
                              {data?.designation !== null
                                ? data?.designation
                                : "----"}
                            </h5>
                          </div>
                          <div className="mb-3">
                            <h3 className={Style.title}>Affiliation</h3>
                            <h5 className={Style.subTitle}>
                              {data?.affiliation !== null
                                ? data?.affiliation
                                : "----"}
                            </h5>
                          </div>
                          <div className="mb-3">
                            <h3 className={Style.title}>Academic Training</h3>
                            <h5 className={Style.subTitle}>
                              {data?.training !== null
                                ? data?.training
                                : "----"}
                            </h5>
                          </div>
                          <div className="mb-3">
                            <h3 className={Style.title}>Specific Areas of Expertise</h3>
                            <h5 className={Style.subTitle}>
                              {data?.expertise !== null
                                ? data?.expertise
                                : "----"}
                            </h5>
                          </div>
                        </div>
                      </Col>
                      <Col md={5} sm={12}>
                        <div className={Style.titleSubTitle}>
                          <div className="mb-3">
                            <h3 className={Style.title}>Category</h3>
                            <h5 className={Style.subTitle}>{data?.category}</h5>
                          </div>
                          <div className="mb-3">
                            <h3 className={Style.title}>Phone</h3>
                            <h5 className={Style.subTitle}>{data?.phone}</h5>
                          </div>
                          <div className="mb-3">
                            <h3 className={Style.title}>Passing Year</h3>
                            <h5 className={Style.subTitle}>
                              {data?.passing_year}
                            </h5>
                          </div>
                          <div className="mb-3">
                            <h3 className={Style.title}>Blood Group</h3>
                            <h5 className={Style.subTitle}>{data?.blood}</h5>
                          </div>
                          <div className="mb-3">
                            <h3 className={Style.title}>City</h3>
                            <h5 className={Style.subTitle}>{data?.city}</h5>
                          </div>
                          <div className="mb-3">
                            <h3 className={Style.title}>Organization</h3>
                            <h5 className={Style.subTitle}>
                              {data?.organization !== null
                                ? data?.organization
                                : "----"}
                            </h5>
                          </div>
                          <div className="mb-3">
                            <h3 className={Style.title}>Website Link</h3>
                            <h5 className={Style.subTitle}>
                              {data?.web_link !== null
                                ? data?.web_link
                                : "----"}
                            </h5>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </>
        {/* )} */}
      </main>
    </>
  );
}
