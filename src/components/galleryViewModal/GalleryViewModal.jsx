/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Img from "../lazyLoadImage/Img";
import { baseImgUrl } from "@/utils/imgUrl";
import useFetch from "@/hooks/useFetch";
import Style from "./galleryViewModal.module.css";

const GalleryViewModal = (props) => {
  const { data, loading } = useFetch("/magazine/Gallery");

  const item = data?.data?.find((item) => item.id === props.itemId);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={Style.gallery}
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <img
            src={baseImgUrl + props?.image}
            className={`${Style.img} img-fluid`}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GalleryViewModal;
