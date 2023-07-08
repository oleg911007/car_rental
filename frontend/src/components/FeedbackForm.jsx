import React, { useState } from 'react';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const FeedbackForm = () => {
  const [formData, setFormData] = useState({ name: '', mail: '', message: '' });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch('http://127.0.0.1:80/contacts', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        toast.success("Форму успішно надіслано!")
      } else {
        toast.error('Сталась помилка під час надсилання форми');
        throw new Error('Сталась помилка');
      }
    })
    .catch(error => {
      console.error('Сталась помилка:', error);
      toast.error('Сталась помилка під час надсилання форми');
    });
  };
    return ( 
        <>
        <main>
        <section>
      <h1>Контакти</h1>
        <p>Наша адреса: м. Київ, вул. Хрещатик, 123</p>
        <p>Телефон: +380 (44) 123-45-67</p>
        <p>Email: info@rentacar.com</p>
        <form onSubmit={handleSubmit}>
        <label>Ім'я:
        <input type="text" id="name" name="name" value={formData.name}
          onChange={handleInputChange} required/>
        </label>
        <label>Пошта:
        <input type="email" id="mail" name="mail" value={formData.mail}
          onChange={handleInputChange} required/>
        </label>
        <label>Повідомлення:
        <textarea rows="10" type="textarea" id="message" name="message" value={formData.message}
          onChange={handleInputChange} required></textarea>
        </label>
        <button type="submit">Відправити</button>
      </form>
      </section>
      </main>
      </>
     );
}
 
export default FeedbackForm;