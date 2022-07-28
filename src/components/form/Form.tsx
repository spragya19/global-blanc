import React from "react";
import {useState, useEffect} from "react"
import { Row, Container, Col } from "react-bootstrap";
// import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-input-2";
import { Field, Formik, Form, ErrorMessage } from "formik";
import "../form/Form.css";
import { Country, State, City }  from 'country-state-city';



import "react-phone-input-2/lib/bootstrap.css";

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

const Forms = () => {
  let State = require('country-state-city').State;

  const [Countries, setCountries] = useState(Country.getAllCountries())
  const [states, setStates] = useState([]);
    const [countr, setCountr]= useState('');
  const initialValues = { 
    
    firstName: "" ,
    lastName: "",
  email: "",
  buisnessName: "",
  phoneNumber: "",
  address: "",
  postCode:"",
  country: "",
  state: "",
  city: "",
 };


    
    useEffect(() => {
        
    }, [countr])


 console.log(Country.getAllCountries())
 console.log(State.getAllStates())
 
  return (
    <>
      <div>
        <Formik
          initialValues={{...initialValues}}
          onSubmit={(values, { resetForm }) => {
            try {
              resetForm();
            } catch (e) {
              Error("e");
            }
          }}
        >
         
          {({ errors, touched,values, isValidating, setFieldValue,handleChange,handleSubmit ,setValues}) => (
            <Form onSubmit={handleSubmit}>
              <section className="form">
                <Container>
                  <div className="form-content-bg">
                    <Row>
                      <Col xs={12}>
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
                              name= "lastName"
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
                              onChange= {(event:any)=>{
                                const country = event.target.value;
                                setFieldValue("country", country);
                                const selectedCountry = Countries.find(count => count.name === country);
                                setStates(State.getAllStates()(selectedCountry?.isoCode));
                          
                              }}
                              className="form-control"
                              placeholder="Country"
                              value={values.country}
                             
                              
                          >
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
                              onChange={setFieldValue}
                              name= "state"
                              values={values.state}
                             >
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
                            />
                          </div>
                        </div>
                      </Col>
                     
                    </Row>
                    <div className="text-center mt-4">
                    <button type="submit" className="btn btn-success ">Invest</button>

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
