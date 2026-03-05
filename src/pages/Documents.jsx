// import React from 'react'; 
import '../styles/Documents.css';
import Statut from '../assets/statut.png';
import Cenovnik from '../assets/cenovnik.png';
import Programa from '../assets/programa.png';
import Zakon from '../assets/zakon.png';
import Pristapnica from '../assets/pristapnica.png';
import Potvrda from '../assets/potvrda.png';
import ImageBook from '../assets/Untitled_design.png';

function Documents() {
  const docs = [
    { title: 'Статут', img: Statut, pdf: '/statut.pdf' },
    { title: 'Ценовник', img: Cenovnik, pdf: '/cenovnik.pdf' },
    { title: 'Програма', img: Programa, pdf: '/programa.pdf' },
    { title: 'Закон', img: Zakon, pdf: '/zakon.pdf' },
    { title: 'Пристапница', img: Pristapnica, pdf: '/pristapnica.pdf' },
    { title: 'Потврда', img: Potvrda, pdf: '/potvrda.pdf' },
  ];

  return (
    <div className="documents" >
      <div className="content">
        {docs.map((doc, index) => (
          <div className="delba text-center my-4" key={index}>
            <h2>{doc.title}</h2>
            <a href={doc.pdf} target="_blank" rel="noopener noreferrer">
              <img src={doc.img} alt={doc.title} className="img-fluid rounded shadow-sm" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Documents;
