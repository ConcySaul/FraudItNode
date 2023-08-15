import React, { useEffect, useState } from 'react';
import styles from './signInPopUp.module.css';
import { sign } from 'crypto';
import axios from 'axios';

const Popup = ({ onClose }) => {

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verif, setVerif] = useState<string>("");
  const [signin, setSignin] = useState(false);

  type Credentials = Record<string, string>

  const signUp = async () => {
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

  const signIn = async () => {
    const payload: Credentials = {
      email: email,
      password: password,
    }
    try {
      const res = await axios.post('/api/auth/signin', payload);
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
            <div>
              <input type="text" placeholder="email" onChange={e => {setEmail(e.target.value)}}/>
            </div>
            {
              !signin && (
                <div>
                 <input type="text" placeholder="nom d'utilisateur" onChange={e => {setUsername(e.target.value)}}/>
                </div>
              )
            }
            <div>
              <input type="text" placeholder="mot de passe" onChange={e => {setPassword(e.target.value)}}/>
            </div>
            {
              !signin && (
                <div>
                  <input type="text" placeholder="verifier mot de passe" onChange={e => {setVerif(e.target.value)}}/>
                </div>
              )
            }
            {
              signin ? <button className={styles.closeButton} onClick={() => signIn()}>Se connecter</button> : <button className={styles.closeButton} onClick={() => signUp()}>S'inscrire</button> 
            }
            {
              signin ? <button className={styles.closeButton} onClick={() => setSignin(!signin)}> Ou s'inscrire </button> : <button className={styles.closeButton} onClick={() => setSignin(!signin)}> Ou se connecter </button> 
            }
          </form>
        </div>
      </div>
    );
  };

export default Popup;