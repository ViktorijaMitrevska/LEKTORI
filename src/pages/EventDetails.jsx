import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import '../styles/EventDetails.css';

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const loadEvent = async () => {
      const docRef = doc(db, "events", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setEvent(docSnap.data());
      }
    };

    loadEvent();
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="events" style={{ padding: "40px"}}>
        <div className="container mx-auto" style={{maxWidth:"900px", padding:"10px"}}>
            <div className=" w-100  " >
                <h1>{event.title}</h1>
                <hr/>
                <p>{event.date}</p>
                <p style={{ whiteSpace: 'pre-wrap', fontSize:'20px' }}>{event.description}</p>
                {event.images && event.images.length > 0 && (
                    <div className="gallery" >
                    {event.images.map((img, index) => (
                        <img
                        key={index}
                        src={img}
                        alt={`event-${index}`}
                        
                        />
                    ))}
                    </div>
                )}
            </div>
        </div>
        
     
    </div>
  );
}

export default EventDetails; 
