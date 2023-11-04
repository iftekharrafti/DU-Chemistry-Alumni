import React from "react";
import Skeleton from "react-loading-skeleton";
import ImagePlaceholder from "@/assets/images/image.json";
import Lottie from "lottie-react";
import "react-loading-skeleton/dist/skeleton.css";
import { Col, Container, Row } from "react-bootstrap";
const FeaturesSkeleton = () => {
  return (
    <Container className="section">
      <Row>
        <Col md={12} lg={12} sm={12} className="p-2">
          <div className="card shadow-sm">
            <div className="card-body">
              <Row>
                <Col md={4}>
                  <Lottie
                    className="w-100"
                    animationData={ImagePlaceholder}
                    loop={true}
                  />
                </Col>
                <Col md={8}>
                  <Skeleton count={3} />
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={12} lg={12} sm={12} className="p-2">
          <div className="card shadow-sm">
            <div className="card-body">
              <Row>
                <Col md={4}>
                  <Lottie
                    className="w-100"
                    animationData={ImagePlaceholder}
                    loop={true}
                  />
                </Col>
                <Col md={8}>
                  <Skeleton count={3} />
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FeaturesSkeleton;
