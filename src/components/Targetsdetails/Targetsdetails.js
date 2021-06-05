import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";

import Dolar from "../../assets/img/Dolar.png";
import pendingpayment from "../../assets/img/pendingpayment.png";
import { Field, Formik } from "formik";

import "../Personaldetails/Personaldetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import EditTargetDetailModal from "./EditTargetDetailModal";
const TargetsDetails = () => {
  const [EditModal, setEditModal] = useState(false);
  const ToggleEditModal = () => {
    setEditModal(!EditModal);
  };
  const FormHandle = (values) => {
    console.log(values);
  };
  return (
    <>
      <Container
        style={{ background: "#F3F3F3" }}
        className="py-2 mobcontainer"
      >
        <Formik
          initialValues={{
            skd_amount: "₹ 15873.00 / 20000.00",
            quaterly_amount: "₹ 45000.00 / 1 lakh",
            annual_amount: "₹ 8.3 / 10 lakh",
          }}
          onSubmit={(values) => {
            FormHandle(values);
          }}
          // validationSchema={FormSchema}
        >
          {({ errors, touched, values, handleSubmit }) => (
            <Form>
              <div className="mainBox">
                <div className="HeaddingPersonal">
                  <div className="p-3">
                    <p className="boxheaddinfPersonalDetails">
                      Targets Details
                    </p>
                  </div>
                  <div
                    onClick={() => {
                      setEditModal(true);
                    }}
                    type="button"
                    className="p-3"
                  >
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
                          src={pendingpayment}
                          className="iconsizepersonalDetails mr-3 "
                        />
                      </div>

                      <p>SKD Amount:</p>
                    </div>
                    <div className=" clsflex1">
                      <Field
                        readOnly={true}
                        className="dealerinputsty"
                        type="text"
                        value={values.skd_amount}
                        name="skd_amount"
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="HeaddingPersonal">
                    <div className="clsimgAndnamehedding">
                      <div>
                        <img
                          src={Dolar}
                          className="iconsizepersonalDetails mr-3 "
                        />
                      </div>

                      <p>Quaterly Amount:</p>
                    </div>
                    <div className=" clsflex1">
                      <Field
                        readOnly={true}
                        className="dealerinputsty"
                        type="text"
                        value={values.quaterly_amount}
                        name="quaterly_amount"
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="HeaddingPersonal">
                    <div className="clsimgAndnamehedding">
                      <div>
                        <img
                          src={Dolar}
                          className="iconsizepersonalDetails mr-3 "
                        />
                      </div>

                      <p>Annual Amount :</p>
                    </div>
                    <div className=" clsflex1">
                      <Field
                        readOnly={true}
                        className="dealerinputsty"
                        type="text"
                        value={values.annual_amount}
                        name="annual_amount"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
      <EditTargetDetailModal show={EditModal} ToggleModal={ToggleEditModal} />
    </>
  );
};

export default TargetsDetails;
