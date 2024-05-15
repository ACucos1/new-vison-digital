import styles from "./styles.module.scss";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function SplitText({ text, breakIndex = 0 }) {
  const animationRef = useRef();

  useEffect(() => {
    const splitTextEl = animationRef.current;
    const letters = splitTextEl.querySelectorAll(".gsap-split-text-letter");
    gsap.fromTo(
      letters,
      { y: "100%" },
      {
        y: 0,
        stagger: 0.65 / letters.length,
        delay: 0.25,
        scrollTrigger: {
          trigger: letters,
          start: "top 100%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <span ref={animationRef}>
      {text.split(" ").map((word, wordIdx) => {
        return (
          <>
            {breakIndex > 0 && wordIdx == breakIndex && <br />}
            <span className={styles.Word} key={`${word}${wordIdx}`}>
              {word.split("").map((letter, idx) => (
                <span className={`${styles.LetterWrapper}`} key={idx}>
                  <span className={`${styles.Letter} gsap-split-text-letter`}>
                    {letter}
                  </span>
                </span>
              ))}
            </span>{" "}
          </>
        );
      })}
    </span>
  );
}
