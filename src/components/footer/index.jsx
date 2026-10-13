import { FiArrowUpRight, FiInstagram } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import styles from "./styles.module.css";

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.inner}>
      <div className={styles.brandBlock}>
        <a className={styles.brand} href={`${import.meta.env.BASE_URL}#top`} aria-label="Morrow and Made, back to top">
          <span className={styles.mark}>m.</span><span>Morrow <em>& Made</em></span>
        </a>
        <p>Objects for slower mornings and ordinary rituals.</p>
      </div>
      <div className={styles.links} aria-label="Store links">
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><FiInstagram /></a>
        <a href="https://github.com/a2rp" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
      </div>
    </div>
    <div className={styles.bottom}>
      <span>© {new Date().getFullYear()} Morrow & Made · Frontend demo</span>
      <a href="https://www.ashishranjan.net" target="_blank" rel="noreferrer">Made by Ashish Ranjan <FiArrowUpRight aria-hidden="true" /></a>
    </div>
  </footer>
);

export default Footer;
