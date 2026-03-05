import React from 'react'
import '../styles/Katce.css';

import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs,query, orderBy } from "firebase/firestore";

function Katce() {
    const [languageCorner, setLanguageCorner] = useState([]);

    useEffect(() => {
        const loadLanguageCorner = async () => {
            const q = query(
                collection(db,"languageCorner"),
                orderBy("createdAt", "desc")
            );
            const data = await getDocs(q);
            setLanguageCorner(
                data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        };

        loadLanguageCorner();
    }, []);

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
           
            if (trimmedLine.match(/^[-*•]\s+/) || trimmedLine.match(/^\d+\.\s+/)) {
                flushParagraph();
              
                const listItem = trimmedLine.replace(/^[-*•]\s+/, '').replace(/^\d+\.\s+/, '');
                currentList.push(listItem);
            } else if (trimmedLine === '') {
               
                flushList();
                flushParagraph();
            } else {
                
                flushList();
                currentParagraph.push(line);
            }
        });

       
        flushList();
        flushParagraph();

        return elements.length > 0 ? <div>{elements}</div> : null;
    };
    return (
    <div className='katce' style={{ fontFamily: "'Roboto', sans-serif" }}>
        <div className='container' style={{marginTop: "100px"}}>
            <div className="d-flex flex-column align-items-center ">
                <h1 className="text-center mb-4">Јазично катче <br/> (во чест на Благоја Корубин)</h1>
                
                <div className="w-100" style={{ maxWidth: "800px"}}>
                    {languageCorner.map((evt) => (
                        <div key={evt.id} className="p-4 p-md-5 shadow rounded" style={{ marginBottom:"50px"}}>
                            <h3>{evt.title}</h3>
                            <hr/>
                            <small className="text-muted">{evt.date}</small>
                            <div style={{fontSize:'clamp(18px, 2vw, 20px)'}}>{formatDescription(evt.description)}</div> 
                            

                </div> 
            ))}
                </div>
            </div>
        </div>
    </div>
     );
}

export default Katce;