import React, { useEffect, useState } from 'react';
import Head from "next/head";
import styles from './navbar.module.css';
import Link from 'next/link';
import axios from 'axios';
import Popup from '../../components/popup';

type Stations = {
  [key: string]: string[];
}

const index = () => {
    const [search, setSearch] = useState("");
    const [stations, setStations] = useState<Stations | undefined>(undefined);
    const [isPopupOpen, setPopupOpen] = useState(false);

    const openPopup = () => {
      setPopupOpen(true);
    };
  
    const closePopup = () => {
      setPopupOpen(false);
    };

    const handleSearch = async (search: String) => {
      const payload = {
        search: search
      } 
      try {
        const response = await axios.post('/api/lines', payload);
        (response.data.message) ? setStations(undefined) : setStations(response.data.stations);
      }
      catch (e){}
    }

    const printStation = () => {
      return (
        <select>
          {
            Object.keys(stations).map((station) => (
              <option>{station} {
                stations[station].map((line, index) => (
                  line
                ))
              }
              </option>
          ))
          }
          </select>
        );
    }

  return (
    <>
    <Head>
        <title>FraudItSafe</title>
    </Head>
      <header className={styles.header}>
        <div className={styles.divBoxSlogan}>
          <h2 className={styles.slogan}>Don't buy any tickets</h2>
          <h2 className={styles.slogan}>Fraud in all serenity</h2>
        </div>
      </header>


      <nav className={styles.nav}>
          <div className={styles.divBoxTitle}>
            <h1 className={styles.title}>FraudItSafe</h1>
            <ul>
              <li><Link href={'#'}>Check</Link></li>
              <li><Link href={'#'}>Alerts</Link></li>
              <li onClick={openPopup}><Link href={'#'}>SignIn</Link></li>
            </ul>
          </div>
      </nav>

      {isPopupOpen && <Popup onClose={closePopup} />}
      
      <main className={styles.main}>
        <div className={styles.search}>
          <div className={styles.sloganSearch}>
            <h2>find them before </h2>
            <h2>they find you</h2>
          </div>
          <div className={styles.form}>
            <input type="text" placeholder="where are they" onChange={(event) => {
                handleSearch(event.target.value);
              }
            }
            />
            <svg width="32px" height="32px" viewBox="0 0 24 24" fill="#eaeaea" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clipPath="url(#clip0_15_152)"> <rect width="32" height="32" fill="#eaeaea"></rect> <circle cx="10.5" cy="10.5" r="6.5" stroke="#101B21" strokeLinejoin="round"></circle> <path d="M19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L19.6464 20.3536ZM20.3536 19.6464L15.3536 14.6464L14.6464 15.3536L19.6464 20.3536L20.3536 19.6464Z" fill="#101B21"></path> </g> <defs> <clipPath id="clip0_15_152"> <rect width="24" height="24" fill="white"></rect> </clipPath> </defs> </g></svg>
          </div>
          {
            stations && printStation()
          }
        </div>
        <div className={styles.result}>
        </div>
      </main>
    </>
  );
}

export default index;