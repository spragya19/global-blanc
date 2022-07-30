import React from "react";
import { useState, useEffect } from "react";
import { Row, Container, Col } from "react-bootstrap";
// import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-input-2";
import { Field, Formik, Form, ErrorMessage } from "formik";
import "../form/Form.css";
import { Country, State, City } from "country-state-city";

import "react-phone-input-2/lib/bootstrap.css";
import { ICity } from "country-state-city/dist/lib/interface";

interface MyFormValues {
  firstName: string;
  lastName: string;
  email: string;
  buisnessName: string;
  phoneNumber: number;
  address: string;
  postCode: number;
  country: string;
}

interface State {
  name: string;
  isoCode: string;
}
interface City {
  name: string;
}

const Forms = () => {
  const [Countries, setCountries] = useState(Country.getAllCountries());
  const [states, setStates] = useState<State[]>([]);
  const [countr, setCountr] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    buisnessName: "",
    phoneNumber: "",
    address: "",
    postCode: "",
    country: "",
    state: "",
    city: "",
  };

 

  return (
    <>
      <div>
        <Formik
          initialValues={{ ...initialValues }}
          onSubmit={(values, { resetForm }) => {
            try {
              resetForm();
            } catch (e) {
              Error("e");
            }
          }}
        >
          {({
            errors,
            touched,
            values,
            isValidating,
            setFieldValue,
            handleChange,
            handleSubmit,
            setValues,
          }) => (
            <Form onSubmit={handleSubmit}>
              <section className="form">
                <Container>
                  <div className="form-content-bg">
                    <Row>
                      <Col xs={12}>
                        <h3>Global balc</h3>
                        <div className="row g-3">
                          <div className="col-sm">
                            <label htmlFor="">First Name</label>
                            <input
                              type="text"
                              name="firstName"
                              className="form-control"
                              placeholder="First Name"
                              aria-label="City"
                            />
                          </div>
                          <div className="col-sm">
                            <label htmlFor="">Last Name</label>
                            <Field
                              type="text"
                              className="form-control"
                              name="lastName"
                              placeholder="Last Name"
                              aria-label="State"
                            />
                          </div>
                          <div className="col-sm">
                            <label htmlFor="">Email</label>
                            <Field
                              type="text"
                              name="email"
                              className="form-control"
                              placeholder="Email"
                              aria-label="Zip"
                            />
                          </div>
                        </div>
                      </Col>
                      <span />
                      <Col xs={12} className="mt-4">
                        <div className="row g-3">
                          <div className="col-sm">
                            <label htmlFor="">Buisness Name</label>
                            <Field
                              type="text"
                              name="buisnessName"
                              className="form-control"
                              placeholder="Buisness Name"
                              aria-label="City"
                            />
                          </div>
                          <div className="col-sm">
                            <label htmlFor="">Phone Number (Work)</label>
                            <PhoneInput
                              placeholder="Enter phone number"
                              inputStyle={{ width: "100%", height: "40px" }}
                            />
                          </div>
                          <div className="col-sm">
                            <label htmlFor="">Phone Number (Home)</label>
                            <PhoneInput
                              placeholder="Enter phone number"
                              inputStyle={{ width: "100%", height: "40px" }}
                            />
                          </div>
                        </div>
                      </Col>
                      <Col xs={12} className="mt-4">
                        <div className="row g-3">
                          <div className="col-sm-8">
                            <label htmlFor="">Address</label>
                            <Field
                              type="text"
                              className="form-control"
                              name="address"
                              placeholder="Address"
                              aria-label="City"
                            />
                          </div>
                          <div className="col-sm">
                            <label htmlFor="">Post Code</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Post code"
                              aria-label="City"
                            />
                          </div>
                        </div>
                      </Col>
                      <Col xs={12} className="mt-4">
                        <div className="row g-3">
                          <div className="col-sm">
                            <label htmlFor="">Country</label>
                            <Field
                              as="select"
                              onChange={(event: any) => {
                                const country = event.target.value;
                                setFieldValue("country", country);
                                const selectedCountry = Countries.find(
                                  (count) => count.name === country
                                );

                                if (selectedCountry?.isoCode) {
                                  setCountr(selectedCountry?.isoCode);
                                }

                                if (selectedCountry?.isoCode) {
                                  console.log(">>>>>>>", selectedCountry);

                                  const statesByCountry =
                                    State.getStatesOfCountry(
                                      selectedCountry?.isoCode
                                    );

                                  const states = statesByCountry.map(
                                    (item) => ({
                                      name: item.name,
                                      isoCode: item.isoCode,
                                    })
                                  );

                                  setStates(states);
                                }
                              }}
                              className="form-control"
                              placeholder="Country"
                              value={values.country}
                            >
                              <option>Select Country</option>
                              {Countries.map((option, index: number) => (
                                <option key={index} value={option.name}>
                                  {option.name}
                                </option>
                              ))}
                            </Field>
                          </div>
                          <div className="col-sm">
                            <label htmlFor="">State</label>
                            <Field
                              as="select"
                              type="text"
                              className="form-control"
                              placeholder="State"
                              aria-label="State"
                              name="state"
                              values={values.state}
                              onChange={(event: any) => {
                                const State = event.target.value;
                                setFieldValue("state", State);

                                const selectedState = states.find(
                                  (count: State) => count.name === State
                                );

                                if (selectedState?.isoCode) {
                                  console.log(
                                    ">>>>>>>",
                                    selectedState,
                                    values.country
                                  );
                                  const citiesByStates: ICity[] =
                                    City.getCitiesOfState(
                                      countr,
                                      selectedState?.isoCode
                                    );

                                  console.log(">>>>cities By", citiesByStates);
                                  const cities = citiesByStates.map((item) => ({
                                    name: item.name,
                                  }));
                                  setCities(cities);
                                }
                              }}
                            >
                              <option>Select State</option>
                              {states?.map((option: any, index: number) => (
                                <option key={index} value={option.name}>
                                  {option.name}
                                </option>
                              ))}
                            </Field>
                          </div>
                          <div className="col-sm">
                            <label htmlFor=""> City </label>
                            <Field
                              as="select"
                              type="text"
                              className="form-control"
                              placeholder="City"
                              aria-label="Zip"
                              values={values.city}
                              name="city"
                              onChange={(event: any) => {
                                const City = event.target.value;

                                console.log(">>>>city", City);
                                setFieldValue("city", City);
                              }}
                            >
                              <option>Select City</option>
                              {cities?.map((option: any, index: number) => (
                                <option key={index} value={option.name}>
                                  {option.name}
                                </option>
                              ))}
                            </Field>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <div className="text-center mt-4">
                      <button type="submit" className="btn btn-success ">
                        Invest
                      </button>
                    </div>
                  </div>
                </Container>
              </section>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Forms;
