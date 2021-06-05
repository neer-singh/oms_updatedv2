import React, { useState } from "react";
import { Container } from "react-bootstrap";
import deice from "../../assets/img/deice.png";
import "../Personaldetails/Personaldetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import EditDistributerDetails from "./EditDistributerDetails";
const Distributor = () => {
  const [EditModal, setEditModal] = useState(false);
  const ToggleEditModal = () => {
    setEditModal(!EditModal);
  };
  return (
    <>
      <Container
        style={{ background: "#F3F3F3" }}
        className="py-2 mobcontainer"
      >
        <div>
          <div className="mainBox">
            <div className="HeaddingPersonal">
              <div className="p-3">
                <p className="boxheaddinfPersonalDetails">Distributor:</p>
              </div>
              <div className="p-3">
                <FontAwesomeIcon
                  icon={faPencilAlt}
                  className="iconpenciolcolor"
                />
              </div>
            </div>
            <hr />

            <div className="px-3 moballcontentpadding">
              <div className="HeaddingPersonal">
                <div className="clsimgAndnamehedding">
                  <div>
                    <img
                      src={deice}
                      className="iconsizepersonalDetails mr-3 "
                    />
                  </div>

                  <p>ICON DISTRIBUTORS(PVT) - BENGALURU </p>
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </Container>
      <EditDistributerDetails show={EditModal} ToggleModal={ToggleEditModal} />
    </>
  );
};

export default Distributor;
