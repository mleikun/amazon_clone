import React, { useContext } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaMapMarkerAlt } from "react-icons/fa";
import styles from "./header.module.css";
import LowerHeader from "./LowerHeader";
import { DataContext } from "../../DataProvider/DataProvider";
import { auth } from "../../../Util/firebase";

function Header() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  return (
    <section className={styles.fixed}>
      <section>
        <header className={styles.header__container}>
          <div className={styles.header__logoSection}>
            <Link to="/" className={styles.header__logoLink}>
              <img
                src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
                alt="Amazon Logo"
                className={styles.header__logo}
              />
            </Link>
            <div className={styles.header__delivery}>
              <FaMapMarkerAlt className={styles.header__locationIcon} />
              <div className={styles.header__deliveryInfo}>
                <p className={styles.header__deliveryText}>Delivered to</p>
                <span className={styles.header__deliveryLocation}>
                  Ethiopia
                </span>
              </div>
            </div>
          </div>
          <div className={styles.header__search}>
            <select className={styles.header__searchSelect}>
              <option value="all">All</option>
            </select>
            <input
              type="text"
              placeholder="Search product"
              className={styles.header__searchInput}
            />
            <div className={styles.header__searchIcon}>
              <CiSearch size={18} color="black" />
            </div>
          </div>
          <div className={styles.header__rightSection}>
            <div className={styles.header__flagSection}>
              <img
                src="https://cdn.britannica.com/12/12-050-81DC7939/Flag-Ethiopia.jpg"
                alt="Ethiopian flag"
                className={styles.header__flag}
              />
              <select className={styles.header__languageSelect}>
                <option value="en">EN</option>
              </select>
            </div>
            <div className={styles.header__links}>
              <Link to={!user && "/auth"} className={styles.header__link}>
                <div>
                  {user ? (
                    <>
                      <p>Hello {user?.email?.split("@")[0]}</p>
                      <span onClick={() => auth.signOut()}>Sign Out</span>
                    </>
                  ) : (
                    <>
                      <p className={styles.header__linkText}>Hello, Sign In</p>
                      <span className={styles.header__linkSubtext}>
                        Account & Lists
                      </span>
                    </>
                  )}
                </div>
              </Link>
              <Link to="/orders" className={styles.header__link}>
                <p className={styles.header__linkText}>Returns</p>
                <span className={styles.header__linkSubtext}>& Orders</span>
              </Link>
              <Link to="/cart">
                <div className={styles.header__cart}>
                  <FaShoppingCart className={styles.header__cartIcon} />
                  <span className={styles.header__cartCount}>{totalItem}</span>
                </div>
              </Link>
            </div>
          </div>
        </header>
        <LowerHeader />
      </section>
    </section>
  );
}

export default Header;
