import mercedes from './../images/mercedes.jpeg';
import bmw from './../images/bmw.jpg';
import audi from './../images/audi.jpg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
class CarMenu extends React.Component {
  handleBMWClick() {
    const tokenMatch = document.cookie.match(/token=([^;]+)/);
  const token = tokenMatch ? tokenMatch[1] : null;
  if (token !== null) {
  const username = document.cookie.match(/username=([^;]+)/)[1];
  const body = {
    car: "BMW",
    username: username
  };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    fetch('http://127.0.0.1:80/rent', {
method: 'POST',
headers: headers,
body:JSON.stringify(body),})
.then(response => {
  if (response.ok) {
    toast.success('Ви надіслали заявку за бронювання. Незабаром з вами зв\'яжеться наш оператор');
  } else {
    toast.error('Сталась помилка під час бронювання');
    throw new Error('Сталась помилка');
  }
})
.catch(error => {
  console.error('Сталась помилка:', error);
  toast.error('Сталась помилка під час бронювання');
});

} else {
toast.warning('Авторизуйтесь для бронювання');
}
  }
  handleAudiClick() {
    const tokenMatch = document.cookie.match(/token=([^;]+)/);
  const token = tokenMatch ? tokenMatch[1] : null;
  if (token !== null) {
  const username = document.cookie.match(/username=([^;]+)/)[1];
  const body = {
    car: "audi",
    username: username
  };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    fetch('http://127.0.0.1:80/rent', {
method: 'POST',
headers: headers,
body:JSON.stringify(body),})
.then(response => {
  if (response.ok) {
    toast.success('Ви надіслали заявку за бронювання. Незабаром з вами зв\'яжеться наш оператор');
  } else {
    toast.error('Сталась помилка під час бронювання');
    throw new Error('Сталась помилка');
  }
})
.catch(error => {
  console.error('Сталась помилка:', error);
  toast.error('Сталась помилка під час бронювання');
});

} else {
toast.warning('Авторизуйтесь для бронювання');
}
  }
  handleMercedesClick() {
    const tokenMatch = document.cookie.match(/token=([^;]+)/);
    const token = tokenMatch ? tokenMatch[1] : null;
    if (token !== null) {
    const username = document.cookie.match(/username=([^;]+)/)[1];
    const body = {
      car: "mercedes-benz",
      username: username
    };
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      fetch('http://127.0.0.1:80/rent', {
  method: 'POST',
  headers: headers,
  body:JSON.stringify(body),})
  .then(response => {
    if (response.ok) {
      toast.success('Ви надіслали заявку за бронювання. Незабаром з вами зв\'яжеться наш оператор');
    } else {
      toast.error('Сталась помилка під час бронювання');
      throw new Error('Сталась помилка');
    }
  })
  .catch(error => {
    console.error('Сталась помилка:', error);
    toast.error('Сталась помилка під час бронювання');
  });

} else {
  toast.warning('Авторизуйтесь для бронювання');
}
  }
  render() {
  return (
    <main>
    <section>
      <h2>Доступні автомобілі</h2>
      <ul className="car-list" >
        <li>
          <img src={mercedes} alt="Mercedes-benz"/>
          <h3>Mercedes-benz</h3>
          <p>Ціна: 1000 грн/день</p>
          <button variant="contained" id = "rent_mercedes" onClick={this.handleMercedesClick}>забронювати</button>
        </li>
      
        <li>
          <img src={bmw} alt="BMW"/>
          <h3>BMW</h3>
          <p>Ціна: 1500 грн/день</p>
          <button variant="contained" id = "rent_bmw" onClick={this.handleBMWClick}>забронювати</button>
        </li>
      
        <li>
          <img src={audi} alt="audi"/>
          <h3>Audi</h3>
          <p>Ціна: 2000 грн/день</p>
          <button variant="contained" id = "rent_audi" onClick={this.handleAudiClick}>забронювати</button>
        </li>
      </ul>
    </section>
    </main>
  );
}
}
export default CarMenu;
