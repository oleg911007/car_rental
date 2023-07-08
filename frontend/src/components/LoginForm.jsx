import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';
const LoginForm = () => {


  const [formData, setFormData] = useState({ username: '', password: ''});
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:80/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.text().then((error) => {
            throw new Error(error);
          });
        }
      })
      .then((data) => {
        document.cookie = `token=${data.token}; path=/`;
        document.cookie = `username=${data.username}; path=/`;
        toast.success("User logged in successfully");
        setTimeout(function() {
          window.location.href ="/";
        }, 4000);
      })
      .catch((error) => {
        toast.error(error.message);
      });
    }
    return ( 
    <>
    <h1>Вхід на сайт</h1>
    <form onSubmit={handleSubmit}>
      <label>Ім'я користувача:
      <input type="text" id="username" name="username" value={formData.username}
          onChange={handleInputChange} required/>
      </label>
      <label>Пароль:
      <input type="password" id="password" name="password" value={formData.password}
          onChange={handleInputChange} required/>
      </label>
      <button type="submit">Увійти</button>
    </form>

    </> );
}
 
export default LoginForm;