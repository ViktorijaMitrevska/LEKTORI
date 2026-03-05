import React from 'react'
import '../styles/Contatct.css';
import Image from '../assets/contactBook.png';


function Contact() {
  return (
    <div className='contact'
    style = {{backgroundImage: `url(${Image})`}}>
        <div className='container-fluid' >
             <div className="row justify-content-center">
      <div className="col-11 col-sm-10 col-md-8 col-lg-5 infoContact">
            <div className="d-flex flex-column align-items-center justify-content-center ">
                <h1 className='text-center '>Контактирајте нè!</h1>
                <div className='pictureItem col-12 col-lg-8' >
                    <i className="bi bi-telephone-inbound-fill"  style={{ fontSize: "40px" }}></i>
                     <p>+38970660911</p>
                </div>

                <div className='pictureItem col-12 col-lg-8' >
                    <i className="bi bi-envelope-at-fill"  style={{ fontSize: "40px" }}></i>
                    <p>lektori.rsm@yahoo.com <br/>prashaj.lektor@gmail.com</p>
                </div>

                <div className='pictureItem col-12 col-lg-8' >
                    <i className="bi bi-geo-alt-fill"  style={{ fontSize: "40px" }}></i>
                    <p>ул. „Григор Прличев“ бр. 5, <br/>ИМЈ „Крсте Мисирков“  – Скопје</p>
                </div>
            </div></div>
            </div>
        </div>

        
    </div>
  )
}

export default Contact
