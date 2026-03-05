import React from 'react'
import '../styles/Footer.css';

function Footer() {
  return (
    <div className='footer'> 
     
      <p style={{marginTop:'12px'}}>&copy;Здружение на лекторите на РСМ</p>
       <div className='socialMedia' style={{paddingLeft: '10px', marginLeft:'10px'}}>
          <a href="https://www.facebook.com/p/%D0%97%D0%B4%D1%80%D1%83%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%BD%D0%B0-%D0%BB%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%B8%D1%82%D0%B5-%D0%BD%D0%B0-%D0%9C%D0%B0%D0%BA%D0%B5%D0%B4%D0%BE%D0%BD%D0%B8%D1%98%D0%B0-61581877217090/" target="_blank" rel="noopener noreferrer">
        <i className="bi bi-facebook"style={{ fontSize: "25px", color: "#313335ff" }}></i>
      </a>
      </div >
    </div>
  )
}

export default Footer
