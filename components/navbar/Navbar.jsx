import SplitText from "../splitText/SplitText";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import styles from "./styles.module.scss";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const tlRef = useRef();

  const handleBurgerClick = () => {
    setMenuOpen((prev) => {
      const ret = !prev;

      if (ret) {
        tlRef.current.play();
      } else {
        tlRef.current.reverse(0.37);
      }

      return ret;
    });
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    tlRef.current = gsap.timeline({
      paused: true,
      onReverseComplete: () => {
        // gsap.set(".gsap-menu, .gsap-menu li", { clearProps: "all" });
      },
    });
    tlRef.current
      .to(".gsap-menu", { x: 0, borderRadius: 0, duration: 0.3 })
      .fromTo(
        ".gsap-menu li",
        { opacity: 0, autoAlpha: 0 },
        { opacity: 1, autoAlpha: 1, stagger: 0.025 }
      );
  }, [tlRef]);

  // useEffect(() => {
  //   if (menuOpen) {
  //     tlRef.current.play();
  //   } else {
  //     // tlRef.current.reverse(0.1);
  //   }
  // }, [menuOpen]);

  return (
    <nav className={styles.Navbar}>
      <div className={styles.Logo}>
        <SplitText text={"VISON DIGITAL"} breakIndex={1} />
      </div>

      <div
        className={`${styles.BurgerWrapper} ${menuOpen ? styles.Open : ""}`}
        onClick={handleBurgerClick}>
        <div className={styles.BurgerBar} />
        <div className={styles.BurgerBar} />
        <div className={styles.BurgerBar} />
      </div>

      <div className={`${styles.Menu} gsap-menu`}>
        <ul className={`regular-text-large`}>
          <li>
            <a href='#clients' onClick={handleLinkClick}>
              Our Work
            </a>
          </li>
          <li>
            <a href='#services' onClick={handleLinkClick}>
              Services
            </a>
          </li>

          <li>
            <a href='#contact' onClick={handleLinkClick}>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
