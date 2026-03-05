import React from 'react'
import '../styles/Menu.css';

import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Menu() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

 useEffect(() => {
  const load = async () => {
    const q = query(
      collection(db, "events"),
      orderBy("createdAt", "desc")
    );

    const data = await getDocs(q);
    setEvents(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  load();
}, []);

  return (
    <div className='menu'style={{ fontFamily: "'Roboto', sans-serif" }}>
      <div className='container' style={{marginTop: "100px"}}>
        <div className="d-flex flex-column align-items-center ">
          <h1 className="text-center mb-4">Соопштенија и активности</h1>
          
          <div className="w-100" style={{ maxWidth: "800px"}}>
            {events.map(evt => (
              <div key={evt.id} className="p-4 p-md-5 shadow rounded" style={{ marginBottom:"50px"}}>
                <div 
                  className='event'
                  onClick={()=>navigate(`/event/${evt.id}`)}
                >
                  <img
                    src={evt.images?.[0] ||"https://via.placeholder.com/300x200"}
                    alt="event"
                    style={{objectFit: "cover", maxHeight: "500px", marginBottom:"20px"}}
                    className='img-fluid'
                  />
                  <h3>{evt.title}</h3>
                  <hr/>
                  <small className="text-muted">{evt.date}</small>
                
                  {/* <p>{evt.description}</p> */}
                </div> 
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;


