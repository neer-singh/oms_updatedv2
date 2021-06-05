import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";

import pendingpayment from "../../assets/img/pendingpayment.png";

import { ErrorMessage, Field, Formik } from "formik";
import Dolar from "../../assets/img/Dolar.png";
import ButtonLoading from "../FormComponent/ButtonLoading";
import ErrorMsg from "../FormComponent/ErrorMsg";

const EditTargetDetailModal = (props) => {
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
              skd_amount: {
                min_amount: "",
                max_amount: "",
              },
              quaterly_amount: {
                min_amount: "",
                max_amount: "",
              },
              annual_amount: {
                min_amount: "",
                max_amount: "",
              },
            }}
            onSubmit={(values) => {
              FormHandle(values);
            }}
            // validationSchema={FormSchema}
          >
            {({ errors, touched, values, handleSubmit }) => (
              <div className="AddDealerForm">
                <Form onSubmit={handleSubmit} className="mobileFormSize">
                  <h4 className="text-center py-3">Edit Targets Details</h4>

                  <div className="InputFormGroup">
                    <div className="Inputlable">
                      <div>
                        <img src={pendingpayment} className="InputIcon mr-3 " />
                      </div>
                      <label>SKD Amount:</label>
                    </div>
                    <div>
                      <div className="FormGroupCustomFieldBlock">
                        <Field
                          type="text"
                          placeholder="Enter Min Amount"
                          className="FormGroupCustomField"
                          name="skd_amount.min_amount"
                        />
                        <ErrorMessage
                          name="skd_amount.min_amount"
                          component={ErrorMsg}
                        />
                      </div>
                      <div className="FormGroupCustomFieldBlock my-3">
                        <Field
                          type="text"
                          placeholder="Enter Max Amount"
                          className="FormGroupCustomField"
                          name="skd_amount.max_amount"
                        />
                        <ErrorMessage
                          name="skd_amount.max_amount"
                          component={ErrorMsg}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="InputFormGroup">
                    <div className="Inputlable">
                      <div>
                        <img src={Dolar} className="InputIcon mr-3 " />
                      </div>
                      <label>Quaterly Amount:</label>
                    </div>
                    <div>
                      <div className="FormGroupCustomFieldBlock">
                        <Field
                          type="text"
                          placeholder="Enter Min Amount"
                          className="FormGroupCustomField"
                          name="quaterly_amount.min_amount"
                        />
                        <ErrorMessage
                          name="quaterly_amount.min_amount"
                          component={ErrorMsg}
                        />
                      </div>
                      <div className="FormGroupCustomFieldBlock my-3">
                        <Field
                          type="text"
                          placeholder="Enter Max Amount"
                          className="FormGroupCustomField"
                          name="quaterly_amount.max_amount"
                        />
                        <ErrorMessage
                          name="quaterly_amount.max_amount"
                          component={ErrorMsg}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="InputFormGroup">
                    <div className="Inputlable">
                      <div>
                        <img src={Dolar} className="InputIcon mr-3 " />
                      </div>
                      <label>Annual Amount:</label>
                    </div>
                    <div>
                      <div className="FormGroupCustomFieldBlock">
                        <Field
                          type="text"
                          placeholder="Enter Min Amount"
                          className="FormGroupCustomField"
                          name="annual_amount.min_amount"
                        />
                        <ErrorMessage
                          name="annual_amount.min_amount"
                          component={ErrorMsg}
                        />
                      </div>
                      <div className="FormGroupCustomFieldBlock my-3">
                        <Field
                          type="text"
                          placeholder="Enter Max Amount"
                          className="FormGroupCustomField"
                          name="annual_amount.max_amount"
                        />
                        <ErrorMessage
                          name="annual_amount.max_amount"
                          component={ErrorMsg}
                        />
                      </div>
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

export default EditTargetDetailModal;
