import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      console.log(cookie.substring(name.length + 1))
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}
const handleLogOut = (e) => {
  e.preventDefault();
 toast.success("Ви вийшли зі свого аккаунту")
    document.cookie = `username=; path=/`;
    document.cookie = `token=; path=/`;
    setTimeout(function() {
        window.location.href = 'http://localhost:3000/';
      }, 3000);
}
class Navigation extends React.Component {
  
  render() {
    const token = getCookie('token');
      return(
    <div className="nav">
      <input type="checkbox" id="nav-check"/>
      <div className="nav-header">
        <div className="nav-title">
          Оренда авто
        </div>
      </div>
      <div className="nav-btn">
        <label for="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>
      
      <div className="nav-links">
        <a href="/" >Головна</a>
        <a href="/about" >Про нас</a>
        <a href="/contacts" >Контакти</a>
  
        {token ? (
          <React.Fragment>
            <a href="/logout" id="logout-btn" onClick={handleLogOut}>Вийти</a>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <a href="/login" id="login-btn">Вхід</a>
            <a href="/register" id="register-btn">Реєстрація</a>
          </React.Fragment>
          
        )}
        <ToastContainer />
    </div>
    </div>
    
  );
}
}
 
export default Navigation;