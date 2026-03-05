import React from 'react'
import { Link } from 'react-router-dom';
import BannerImage from '../assets/bookBackground.jpg';
import '../styles/Home.css';

function Home() {
  return (
    <div className='home'
    style={{ backgroundImage: `url(${BannerImage})` }}
    >
        <div className="headerContainer">
          <h1>Здружение на лекторите на РСМ</h1>
          <Link to="/menu">
          <button >Дознај повеќе!</button>
          </Link>
      </div>
    </div>
  )
}

export default Home
