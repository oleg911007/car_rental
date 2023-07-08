import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ username: '',mail:'', password: '',confirm_password:''});
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = {username:formData.username, password:formData.password,mail: formData.mail}
    if (formData.password === formData.confirm_password) {
      fetch('http://127.0.0.1:80/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    .then(response => {
        if (response.ok) {
          toast.success("User registered successfully")
            setTimeout(function() {
              window.location.href = "http://localhost:3000/";
            }, 3000);
            
        } else if(response.status === 409) {
          toast.warning("User already exist")
        }
        else{
          toast.error("Error, please try again later")
        }
      })
    } else {
      toast.error("Паролі не співпадають")
    }
  };
  return ( 
        <>
        <main>
      <h1>Реєстрація</h1>
      <form name="register-form" onSubmit={handleSubmit}>
        <label for="name">Ім'я
        <input type="text" id="username" name="username" value={formData.username}
          onChange={handleInputChange} required />
        </label>
        <label >Електронна пошта
        <input type="email" id="mail" name="mail" value={formData.mail}
          onChange={handleInputChange}required />
        </label>
        <label>Пароль
        <input type="password" id="password" name="password" value={formData.password}
          onChange={handleInputChange} required />
        </label>
        <label>Підтвердження паролю
        <input
          type="password"
          id="confirm-password"
          name="confirm_password"
          value={formData.confirm_password}
          onChange={handleInputChange}
          required
        />
        </label>

        <button type="submit">Зареєструватись</button>
      </form>
    </main>
        </>
     );
}
 
export default RegisterForm;