import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Img from "../lazyLoadImage/Img";
import { baseImgUrl } from "@/utils/imgUrl";
import Style from "./quickViewModal.module.css";
import Table from "react-bootstrap/Table";

const QuickViewModal = (props) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className={Style.title}>
          {props?.item?.category}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column align-items-center">
          <div className="mb-3">
            <Img
              src={baseImgUrl + props?.item?.profile_image}
              className={Style.cardImg}
            />
          </div>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Name of Member</th>
                <td colSpan={2}>{props?.item?.name}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="py-2 px-1">Occupation</th>
                <td colSpan={2}>{props?.item?.occupation}</td>
              </tr>
              <tr>
                <th className="py-2 px-1">Country</th>
                <td colSpan={2}>{props?.item?.country}</td>
              </tr>
              <tr>
                <th className="py-2 px-1">City</th>
                <td colSpan={2}>{props?.item?.city}</td>
              </tr>
              <tr>
                <th className="py-2 px-1">Blood Group</th>
                {props?.item?.blood_status === "show" && (
                  <td colSpan={2}>{props?.item?.blood}</td>
                )}
              </tr>
              <tr>
                <th className="py-2 px-1">Phone Number</th>
                {props?.item?.phone_status === "show" && (
                  <td colSpan={2}>{props?.item?.phone}</td>
                )}
              </tr>
              <tr>
                <th className="py-2 px-1">Email</th>
                {props?.item?.email_status === "show" && (
                  <td colSpan={2}>{props?.item?.email}</td>
                )}
              </tr>
            </tbody>
          </Table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuickViewModal;
