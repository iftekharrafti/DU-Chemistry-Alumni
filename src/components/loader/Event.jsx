import React from "react";
import Skeleton from "react-loading-skeleton";
import ImagePlaceholder from "@/assets/images/image.json";
import Lottie from "lottie-react";
import "react-loading-skeleton/dist/skeleton.css";
import { Col, Container, Row } from "react-bootstrap";
const EventSkeleton = () => {
  return (
    <Container className="section">
        <Row>
        <Col md={5} className="mx-auto mt-3 mb-3">
          <Skeleton />
        </Col>
      </Row>
      <Row>
        <Col md={10} lg={10} sm={12} className="p-2 mb-2 mx-auto">
            <Skeleton count={3} />
        </Col>
      </Row>
      <Row>
        <Col md={10} lg={10} sm={12} className="p-2 mb-2 mx-auto">
            <Skeleton count={3} />
        </Col>
      </Row>
      <Row>
        <Col md={10} lg={10} sm={12} className="p-2 mb-2 mx-auto">
            <Skeleton count={3} />
        </Col>
      </Row>
      <Row>
        <Col md={10} lg={10} sm={12} className="p-2 mb-2 mx-auto">
            <Skeleton count={3} />
        </Col>
      </Row>
    </Container>
  );
};

export default EventSkeleton;
