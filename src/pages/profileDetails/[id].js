/* eslint-disable @next/next/no-img-element */
import { baseImgUrl } from "@/utils/imgUrl";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Style from "@/styles/profileDetails.module.css";
import Head from "next/head";
import axios from "axios";
import { BASE_URL } from "@/utils/api";

const ProfileDetails = () => {
  const [data, setData] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    axios
      .get(BASE_URL +   `/viewmember/${id}`)
      .then((response) => {
        if(response?.data?.status === 500){
          toast.error(response?.data?.message)
          router.push('/login');
        }
        setData(response?.data?.data[0]);
      });
  }, []);
  return (
    <>
        <Head>
        <title>{data?.name}</title>
        <meta name="description" content="Profile Details" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.jpeg" />
      </Head>
      <main>
      <div style={{ background: "#EDF0F2", padding: "1px 0 30px 0" }}>
      <Container>
        <div
          style={{ background: "#fff", padding: "25px 25px", margin: "40px 0" }}
        >
          <Row>
            <Col md={4} sm={12}>
              <img
                src={baseImgUrl + data?.profile_image}
                className={Style.profileImg}
                alt="instructor"
                // className="img-fluid"
                style={{ width: "100%" }}
              />
              <div style={{ background: "#EDF0F2", marginBottom: "30px" }}>
                <div
                  className="w-100 text-center text-white py-1"
                  style={{ background: "#1D6AF8" }}
                >
                  <h3 style={{ fontFamily: "Merriweather" , fontSize: '20px'}}>
                    {data?.name}
                  </h3>
                </div>
                <div className="ps-3 py-4">
                  <div className="d-flex">
                    <h3 className={Style.title}>Occupation:</h3>
                    <span className={Style.titleSpan}>
                      {data?.occupation}
                    </span>
                  </div>
                  <div className="d-flex">
                    <h3 className={Style.title}>Country:</h3>
                    <span className={Style.titleSpan}>
                      {data?.country}
                    </span>
                  </div>
                  <div className="d-flex">
                    <h3 className={Style.title}>City:</h3>
                    <span className={Style.titleSpan}>{data?.city}</span>
                  </div>
                  <div className="d-flex">
                    <h3 className={Style.title}>Blood:</h3>
                    <span className={Style.titleSpan}>{data?.blood}</span>
                  </div>
                  <div className="d-flex">
                    <h3 className={Style.title}>Phone:</h3>
                    <span className={Style.titleSpan}>{data?.phone}</span>
                  </div>
                  <div className="d-flex">
                    <h3 className={Style.title}>Email:</h3>
                    <span className={Style.titleSpan}>{data?.email}</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={8} sm={12}>
              <div>
                <h3 className={Style.title}>Academic Training</h3>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit accusantium sapiente necessitatibus eos quas? Repellendus id commodi recusandae natus facilis consequatur, ullam quo nisi molestiae voluptate distinctio corporis omnis! Voluptate perspiciatis porro ullam corrupti adipisci. Iste sapiente repudiandae unde culpa fugiat! Dolor quidem aliquam dicta omnis, rerum possimus nesciunt fugit doloribus illo quisquam accusantium cupiditate veniam culpa ducimus harum enim laborum voluptatem autem nisi? Sint non iure porro dignissimos dolorum quia vero recusandae libero commodi culpa nisi deserunt repellendus quod, doloribus atque assumenda cupiditate incidunt at. Tenetur, necessitatibus. Placeat, voluptatum! Ipsam placeat quasi eum explicabo magnam odit, quisquam quas ex.
                </p>
              </div>
              <div>
                <h3 className={Style.title}>Expertise</h3>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit unde neque maxime dicta sit blanditiis eaque ipsum, ex libero tempora sequi beatae! Nemo, voluptatibus? Mollitia laborum beatae reiciendis nemo, omnis asperiores ex rerum ullam ipsum fugit qui in quam amet vel quos? Placeat sit impedit recusandae quam adipisci nihil odit optio aliquid vel numquam neque odio consectetur, deserunt facilis magni expedita quaerat aut, esse, laboriosam est fuga reiciendis iusto omnis. Voluptates quisquam recusandae cum incidunt officia consequuntur magnam, iusto, amet eligendi odit, temporibus ea rem? Veritatis iure dolores blanditiis, quibusdam ipsum, voluptas, repudiandae facere reprehenderit ducimus excepturi tempora provident porro!
                </p>
              </div>
              <div>
                <h3 className={Style.title}>Affiliation</h3>
                <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit unde neque maxime dicta sit blanditiis eaque ipsum, ex libero tempora sequi beatae! Nemo, voluptatibus? Mollitia laborum beatae reiciendis nemo, omnis asperiores ex rerum ullam ipsum fugit qui in quam amet vel quos? Placeat sit impedit recusandae quam adipisci nihil odit optio aliquid vel numquam neque odio consectetur, deserunt facilis magni expedita quaerat aut, esse, laboriosam est fuga reiciendis iusto omnis. Voluptates quisquam recusandae cum incidunt officia consequuntur magnam, iusto, amet eligendi odit, temporibus ea rem? Veritatis iure dolores blanditiis, quibusdam ipsum, voluptas, repudiandae facere reprehenderit ducimus excepturi tempora provident porro!
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
      </main>
    </>
    
  );
};

export default ProfileDetails;
