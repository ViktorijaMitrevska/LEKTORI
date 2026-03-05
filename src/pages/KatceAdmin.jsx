import { useState, useEffect } from "react";
import { db } from "../firebase";
import { query, orderBy, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { updateDoc, serverTimestamp } from "firebase/firestore";

function KatceAdmin() {
  const [isHover, setIsHover] = useState(false);
  const [languageCorner, setCorner] = useState([]);
  const [cornerData, setCornerData] = useState({
    title: "",
    description: "",
    date: "",
  });

  const [editingId, setEditingId] = useState(null);

  const languageCornerCollection = collection(db, "languageCorner");

  // Function to parse text and convert bullet points to lists
  const formatDescription = (text) => {
    if (!text) return null;
    
    const lines = text.split('\n');
    const elements = [];
    let currentList = [];
    let currentParagraph = [];

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={`p-${elements.length}`} style={{ whiteSpace: 'pre-wrap', marginBottom: '1rem' }}>
            {currentParagraph.join('\n')}
          </p>
        );
        currentParagraph = [];
      }
    };

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`ul-${elements.length}`} style={{ marginBottom: '1rem', paddingLeft: '20px' }}>
            {currentList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      // Check if line starts with bullet point (-, *, •, or number with dot)
      if (trimmedLine.match(/^[-*•]\s+/) || trimmedLine.match(/^\d+\.\s+/)) {
        flushParagraph();
        // Remove bullet character and add to list
        const listItem = trimmedLine.replace(/^[-*•]\s+/, '').replace(/^\d+\.\s+/, '');
        currentList.push(listItem);
      } else if (trimmedLine === '') {
        // Empty line - flush both paragraph and list
        flushList();
        flushParagraph();
      } else {
        // Regular text line
        flushList();
        currentParagraph.push(line);
      }
    });

    // Flush any remaining content
    flushList();
    flushParagraph();

    return elements.length > 0 ? <div>{elements}</div> : null;
  };

 const loadLanguageCorner = async () => {
  const q = query(
    collection(db, "languageCorner"),
    orderBy("createdAt", "desc")
  );

  const data = await getDocs(q);
  setCorner(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
};


  useEffect(() => {
    loadLanguageCorner();
  }, []);

    const createLanguageCorner = async () => {
    try {
        await addDoc(collection(db, "languageCorner"), {
        title: cornerData.title,
        description: cornerData.description,
        date: cornerData.date,
        createdAt: new Date()
        });

        setCornerData({ title: "", description: "", date: "" });
        loadLanguageCorner(); 

        alert("Додаден е нов текст!");
    } catch (err) {
        console.error(err);
        alert("Грешка при додавање");
    }
    };

  const deleteLanguageCorner = async (id) => {
    await deleteDoc(doc(db, "languageCorner", id));
    loadLanguageCorner();
  };

  const updateLanguageCorner = async () => {
  try {
    const cornerRef = doc(db, "languageCorner", editingId);

    await updateDoc(cornerRef, {
      title: cornerData.title,
      description: cornerData.description,
      date: cornerData.date,
    });

    setEditingId(null);
    setCornerData({ title: "", description: "", date: "" });
    loadLanguageCorner();

    alert("Текстот е успешно ажуриран!");
  } catch (error) {
    console.error(error);
    alert("Грешка при ажурирање");
  }
};

  return (
    <div style={{ padding: "20px",marginTop: "100px" }}>
      <div className="forma p-4 p-md-5 shadow rounded">
         <h1>Додај нов текст!</h1>

        <div className="form-outline mb-4">
            <input
              className="form-control form-control-lg"
              placeholder="Наслов"
              value={cornerData.title}
              onChange={(e) => setCornerData({ ...cornerData, title: e.target.value })}
            />
        </div>
        
        <div className="form-outline mb-4">
          <textarea
              className="form-control form-control-lg"
              placeholder="Опис (можете да користите - или * за листа, Tab за индентација)"
              value={cornerData.description}
              onChange={(e) =>
                setCornerData({ ...cornerData, description: e.target.value })
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
                  setCornerData({ ...cornerData, description: newValue });
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
            value={cornerData.date}
            onChange={(e) => setCornerData({ ...cornerData, date: e.target.value })}
          />
        </div>

        <button className="btn btn-primary btn-lg btn-block w-100 login-btn"
          type = "button"
         onClick={editingId ? updateLanguageCorner : createLanguageCorner}
          style={{backgroundColor: isHover ? "#8a0a0a" : "#640202",}}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}>
           {editingId ? "Зачувај промени" : "Додај"}
        </button>

      </div>
      

      <hr />

      <div className=' container ' style={{marginTop: "100px"}}>
        <div className="d-flex flex-column align-items-center ">
          <h1 className="text-center mb-4">Јазично катче</h1>

            <div className="w-100" style={{ maxWidth: "700px"}}>
              <div className="p-4 p-md-5 shadow rounded">
                {languageCorner.map((evt) => (
                  <div key={evt.id} style={{ marginBottom: "20px" }}>
                    <h3>{evt.title}</h3>
                    <small className="text-muted">{evt.date}</small>
                    <hr/>
                    <div>{formatDescription(evt.description)}</div>
                  <br />
                  <button
                    onClick={() => deleteLanguageCorner(evt.id)}
                    style={{ margin: "10px", backgroundColor: "red", color: "white" }}
                  >
                    Отстрани
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(evt.id);
                      setCornerData({
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

export default KatceAdmin;
