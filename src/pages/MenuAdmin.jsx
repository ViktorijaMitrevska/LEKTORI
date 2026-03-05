import { useState, useEffect } from "react";
//import { db, storage } from "../firebase";
import { db } from "../firebase";
import { query, orderBy,collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { updateDoc ,serverTimestamp} from "firebase/firestore";
//import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function MenuAdmin() {
  const [isHover, setIsHover] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const eventsCollection = collection(db, "events");


 
  const loadEvents = async () => {
  const q = query(
    collection(db, "events"),
    orderBy("createdAt", "desc")
  );

  const data = await getDocs(q);
    setEvents(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

   useEffect(() => {
    loadEvents();
  }, []);

  const uploadImage = async () => {
    if (!imageFile) return "";

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "eventsImages");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dmcoyrw5m/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  const uploadImages = async () => {
    if (imageFiles.length === 0) return [];

    const uploadPromises = imageFiles.map(file => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "eventsImages");

      return fetch(
        "https://api.cloudinary.com/v1_1/dmcoyrw5m/image/upload",
        {
          method: "POST",
          body: formData,
        }
      )
        .then(res => res.json())
        .then(data => data.secure_url);
    });

    return Promise.all(uploadPromises);
  };


  // const createEvent = async (e) => {
  //   e.preventDefault(); 

  //   try {
  //     await addDoc(eventsCollection, {
  //       ...eventData,
  //       createdAt: new Date(),
  //     });

  //     setEventData({ title: "", description: "", date: "" });

  //     loadEvents();
  //     alert("Event created successfully!");
  //   } catch (error) {
  //     console.error(error);
  //     alert("Error creating event");
  //   }
  // };
const createEvent = async () => {
  try {
    const imageUrls = await uploadImages();

    await addDoc(collection(db, "events"), {
      title: eventData.title,
      description: eventData.description,
      date: eventData.date,
      images: imageUrls,
      createdAt: new Date()
    });

    setEventData({ title: "", description: "", date: "" });
    setImageFiles([]);
    loadEvents();
    alert("Настанот е креиран!");
  } catch (err) {
    console.error(err);
    alert("Грешка при креирање");
  }
};

  const deleteEvent = async (id) => {
    await deleteDoc(doc(db, "events", id));
    loadEvents();
  };

  const updateEvent = async () => {
  try {
    const eventRef = doc(db, "events", editingId);

    await updateDoc(eventRef, {
      title: eventData.title,
      description: eventData.description,
      date: eventData.date,
    });

    setEditingId(null);
    setEventData({ title: "", description: "", date: "" });
    loadEvents();

    alert("Настанот е успешно ажуриран!");
  } catch (error) {
    console.error(error);
    alert("Грешка при ажурирање");
  }
};

  return (
    <div style={{ padding: "20px",marginTop: "100px" }}>
      <div className="forma p-4 p-md-5 shadow rounded">
         <h1>Креирај нов настан</h1>

        <div className="form-outline mb-4">
            <input
              className="form-control form-control-lg"
              placeholder="Наслов"
              value={eventData.title}
              onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
            />
        </div>
        
        <div className="form-outline mb-4">
          <textarea
              className="form-control form-control-lg"
              placeholder="Опис (Tab за индентација)"
              value={eventData.description}
              onChange={(e) =>
                setEventData({ ...eventData, description: e.target.value })
              }
              onKeyDown={(e) => {
                // Allow Tab key to insert tab character for indentation
                if (e.key === 'Tab') {
                  e.preventDefault();
                  const textarea = e.target;
                  const start = textarea.selectionStart;
                  const end = textarea.selectionEnd;
                  const value = textarea.value;
                  const newValue = value.substring(0, start) + '\t' + value.substring(end);
                  setEventData({ ...eventData, description: newValue });
                  // Set cursor position after the tab
                  setTimeout(() => {
                    textarea.selectionStart = textarea.selectionEnd = start + 1;
                  }, 0);
                }
              }}
              rows="6"
            />
        </div>
      
        <div className="form-outline mb-4">
          <input
            type="date"
            value={eventData.date}
            onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
          />
        </div>
        
        <div className="form-outline mb-4">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setImageFiles([...e.target.files])}
          />
        </div> 

        <button className="btn btn-primary btn-lg btn-block w-100 login-btn"
          type = "button"
          onClick={editingId ? updateEvent : createEvent}
          style={{backgroundColor: isHover ? "#8a0a0a" : "#640202",}}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}>
           {editingId ? "Зачувај промени" : "Креирај настан"}
        </button>

      </div>
      

      <hr />

      <div className=' container ' style={{marginTop: "100px"}}>
        <div className="d-flex flex-column align-items-center ">
          <h1 className="text-center mb-4">Последни соопштенија и активности</h1>

            <div className="w-100" style={{ maxWidth: "700px"}}>
              <div className="p-4 p-md-5 shadow rounded">
                {events.map((evt) => (
                  <div key={evt.id} style={{ marginBottom: "20px" }}>
                    <h3>{evt.title}</h3>
                    <small className="text-muted">{evt.date}</small>
                    <hr/>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{evt.description}</p>
                    {evt.imageUrl && (
                      <img
                        src={evt.imageUrl}
                        alt="event"
                        style={{ width: "200px", borderRadius: "10px", marginTop: "10px" }}
                      />
                    )}

                  <br />
                  <button
                    onClick={() => deleteEvent(evt.id)}
                    style={{ margin: "10px", backgroundColor: "red", color: "white" }}
                  >
                    Отстрани
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(evt.id);
                      setEventData({
                        title: evt.title,
                        description: evt.description,
                        date: evt.date,
                      });
                    }}
                    style={{ margin: "10px", backgroundColor: "green", color: "white" }}
                  >
                    Уреди
                  </button>

                </div>
                ))}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default MenuAdmin;
