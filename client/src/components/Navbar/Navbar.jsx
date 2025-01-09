import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [user, setUser] = useState(localStorage.getItem("userId") || null);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const getUser = async () => {
    try {
      const res = await axios.get("https://vihaan007-xxnf.onrender.com/users/getUser", {
        headers: {
          Authorization: `${localStorage.getItem("userId")}`,
        },
      });
      setUsername(res.data.user.userName);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const toggleActiveClass = () => setIsActive(!isActive);

  const removeActive = () => setIsActive(false);

  const handleLogOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");  // Using React Router for navigation
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav className={styles.navbar}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <img className="w-34 h-14 mr-2" src={logo} alt="logo" />
          </Link>
          {/* Menu */}
          <NavbarMenu
            isActive={isActive}
            removeActive={removeActive}
            user={user}
            username={username}
            handleLogOut={handleLogOut}
          />
          {/* Hamburger Icon for Mobile */}
          <div
            className={`${styles.hamburger} ${isActive ? styles.active : ""}`}
            onClick={toggleActiveClass}
            aria-label="Toggle navigation"
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </div>
        </nav>
      </header>
    </div>
  );
}

function NavbarMenu({ isActive, removeActive, user, username, handleLogOut }) {
  return (
    <ul className={`${styles.navMenu} ${isActive ? styles.active : ""}`}>
      <li onClick={removeActive}>
        <Link to="/" className={styles.navLink}>
          Home
        </Link>
      </li>
      {!user ? (
        <>
          <li onClick={removeActive}>
            <Link to="/login" className={styles.navLink}>
              Login
            </Link>
          </li>
          <li onClick={removeActive}>
            <Link to="/signup" className={styles.navLink}>
              Signup
            </Link>
          </li>
        </>
      ) : (
        <>
          <li onClick={removeActive}>
            <span className={styles.navLink}>Welcome, {username}</span>
          </li>
          <li onClick={removeActive}>
            <button onClick={handleLogOut} className={styles.navLink}>
              Logout
            </button>
          </li>
        </>
      )}
    </ul>
  );
}

export default Navbar;
