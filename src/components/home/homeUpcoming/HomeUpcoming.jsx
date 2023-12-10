import React from "react";
import { Container, Row } from "react-bootstrap";
import UpcomingEvent from "@/components/upcomingEvent/UpcomingEvent";

const HomeUpcoming = ({upcomingData}) => {
  return (
    <div>
      <div className="headerTitle">
        <h3 class="headerTitleMain">Upcoming Events</h3>
      </div>
      {/* Upcoming Event Details */}
      <Container className="mt-3">
        <Row className="mb-4">
          {upcomingData?.data?.slice(0,3).map((item) => (
            <UpcomingEvent key={item.id} item={item} />
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default HomeUpcoming;
