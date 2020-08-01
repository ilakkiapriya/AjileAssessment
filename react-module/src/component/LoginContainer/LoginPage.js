import React, { Component } from "react";
import "./LoginPage.css";


export default function LoginPage() {

  const [loginState, setLoginState] = React.useState({
    firstName: null, lastName: null, email: null, password: null,
    formErrors: {
      firstName: "", lastName: "",   email: "",   password: ""
    }
  });

  const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  
  const handleChange = e => {
    console.log("Handle change - loginState ", loginState);

    e.preventDefault();
    const { name, value } = e.target;
    //let newLoginState = { ...loginState };
    let newLoginState = loginState ;

    switch (name) {
      case "firstName":
        newLoginState.formErrors.firstName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "lastName":
        newLoginState.formErrors.lastName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        newLoginState.formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        newLoginState.formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }
    newLoginState[name] = value;
    setLoginState(newLoginState);
  };

  const handleSubmit = (e) => {
    console.log("Event is  " , e);

    if (formValid()) {
      console.log("login state is valid " , loginState);
      //this.setState(initialState);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  const formValid = () => {
    let valid = true;
    console.log("Validate login state  " , loginState);

    const { formErrors, ...rest } = loginState;
    console.log("formErrors  " , formErrors);
    console.log("rest  " , rest);

    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });
  
    // validate the form was filled out
    Object.values(rest).forEach(val => {
      val === null && (valid = false);
    });
  
    return valid;
  };
  


 const fetchFormField = (cname, clabel, ctype) => {
    return   (  <div className={cname}>
    <label htmlFor={cname}>{clabel}</label>
    <input
      className={loginState.formErrors[cname].length > 0 ? "error" : null}
      placeholder={clabel}
      type={ctype}
      name={cname}
      noValidate
      onChange={handleChange}
    />
    {loginState.formErrors[cname].length > 0 && (
      <span className="errorMessage">{loginState.formErrors[cname]}</span>
    )}
  </div> )

  };

  return (
    <div className="wrapper">
    <div className="form-wrapper">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} noValidate>
        {fetchFormField("firstName", "First Name", "text")}
        {fetchFormField("lastName", "Last Name", "text")}
        {fetchFormField("email", "Email", "email")}
        {fetchFormField("password", "Password", "password")}
        <div className="login">
              <button className="loginbutton" type="submit">Login</button>
        </div>
        <div className="register" >
              <button className="regbutton" type="register">Register</button>
        </div>
      </form>
    </div>
  </div>

  );

};