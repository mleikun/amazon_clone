import React from "react";
import { IoMenuOutline } from "react-icons/io5";
import styles from "./header.module.css";

function LowerHeader() {
  return (
    <div className={styles.lowerHeader__container}>
      <ul className={styles.lowerHeader__list}>
        <li className={styles.lowerHeader__item}>
          <IoMenuOutline className={styles.lowerHeader__icon} />
          <p>All</p>
        </li>
        <li className={styles.lowerHeader__item}>
          <a href="/" className={styles.lowerHeader__link}>
            Today's Deals
          </a>
        </li>
        <li className={styles.lowerHeader__item}>
          <a href="/customer-service" className={styles.lowerHeader__link}>
            Customer Service
          </a>
        </li>
        <li className={styles.lowerHeader__item}>
          <a href="/registry" className={styles.lowerHeader__link}>
            Registry
          </a>
        </li>
        <li className={styles.lowerHeader__item}>
          <a href="/gift-cards" className={styles.lowerHeader__link}>
            Gift Cards
          </a>
        </li>
        <li className={styles.lowerHeader__item}>
          <a href="/sell" className={styles.lowerHeader__link}>
            Sell
          </a>
        </li>
      </ul>
    </div>
  );
}

export default LowerHeader;
