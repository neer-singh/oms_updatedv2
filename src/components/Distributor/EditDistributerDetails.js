import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";

import deice from "../../assets/img/deice.png";

import { ErrorMessage, Field, Formik } from "formik";

import ButtonLoading from "../FormComponent/ButtonLoading";
import ErrorMsg from "../FormComponent/ErrorMsg";

const EditDistributerDetails = (props) => {
  const [SuccessMsg, setSuccessMsg] = useState("");
  const [errorMsg, seterrorMsg] = useState("");
  const [FormLoading, setFormLoading] = useState(false);

  const FormHandle = (values) => {
    console.log(values);
  };

  return (
    <>
      <Modal
        contentClassName="AdddealerContainer AddDealerModalContent"
        centered
        show={props.show}
        onHide={props.ToggleModal}
      >
        <div>
          <Modal.Title className="modaltitle text-center pt-0"></Modal.Title>
          <Formik
            initialValues={{
              credit_term: "",
            }}
            onSubmit={(values) => {
              FormHandle(values);
            }}
            // validationSchema={FormSchema}
          >
            {({ errors, touched, values, handleSubmit }) => (
              <div className="AddDealerForm">
                <Form onSubmit={handleSubmit} className="mobileFormSize">
                  <h4 className="text-center py-3">Edit Distributor Detail</h4>

                  <div className="InputFormGroup">
                    <div className="Inputlable">
                      <div>
                        <img src={deice} className="InputIcon mr-3 " />
                      </div>
                      <label>Credit Term:</label>
                    </div>
                    <div className="FormGroupCustomFieldBlock">
                      <Field
                        type="text"
                        // placeholder="Enter Dealer Name"
                        className="FormGroupCustomField"
                        name="credit_term"
                      />
                      <ErrorMessage name="credit_term" component={ErrorMsg} />
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      props.ToggleModal();
                    }}
                    className="text-center py-3"
                  >
                    <ButtonLoading
                      title={"Save"}
                      Btntype={"button"}
                      loading={FormLoading}
                      className={"btnstyAddDealer"}
                    />
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
};

export default EditDistributerDetails;
