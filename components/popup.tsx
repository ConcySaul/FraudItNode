import React, { useEffect, useState } from 'react';
import styles from './signInPopUp.module.css';
import { sign } from 'crypto';
import axios from 'axios';

const Popup = ({ onClose }) => {

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verif, setVerif] = useState<string>("");

  type Credentials = Record<string, string>

  const signup = async () => {
    const payload: Credentials = {
      email: email,
      username: username,
      password: password,
      verif: verif
    }
    try {
      const res = await axios.post('/api/auth/signup', payload);
      console.log(res.data);
    }
    catch (e){}
  }

    return (
      <div className={styles.popupOverlay}>
        <div className={styles.popupContent}>
          <button className={styles.closeButton} onClick={onClose}>
            Fermer
          </button>
          <form>
            <input type="text" placeholder="email" onChange={e => {setEmail(e.target.value)}}/>
            <br />
            <input type="text" placeholder="nom d'utilisateur" onChange={e => {setUsername(e.target.value)}}/>
            <br />
            <input type="text" placeholder="mot de passe" onChange={e => {setPassword(e.target.value)}}/>
            <br />
            <input type="text" placeholder="verifier mot de passe" onChange={e => {setVerif(e.target.value)}}/>
            <br />
            <br />
            <button className={styles.closeButton} onClick={signup}>
            S'inscrire
          </button>
          </form>
        </div>
      </div>
    );
  };

export default Popup;