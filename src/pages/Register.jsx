import React, { useState, useEffect } from 'react'
import '../styles/Register.css';
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

function Register() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const load = async () => {
      const q = query(
        collection(db, "members"),
        orderBy("name")
      );

      const data = await getDocs(q);
      //setMembers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      const membersData = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));

      membersData.sort((a, b) =>
        a.name.localeCompare(b.name, 'mk', { sensitivity: 'base' })
      );

      setMembers(membersData);
    };

    load();
  }, []);

  return (
    <div className='register'>
    <div className="container" style={{ marginTop: "100px" }}>
     <h1 className="text-center mb-4">Регистар на членови</h1>

      <div className="table-responsive">
      <table className="table table-hover members-table">
        <thead>
          <tr>
            <th>Презиме и име</th>
            <th>Е-адреса</th>
            <th>Град</th>
          </tr>
        </thead>
        <tbody>
          {members.map(m => (
            <tr key={m.id}>
              <td>{m.name}</td>
              <td>{m.email}</td>
              <td>{m.city}</td>
            </tr>
          ))}
        </tbody>
      </table></div>
    </div></div>
  )
}

export default Register
