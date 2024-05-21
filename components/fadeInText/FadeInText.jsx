import styles from "./styles.module.scss";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function FadeInText({ text, breakIndex = 0 }) {
  const animationRef = useRef();

  useEffect(() => {
    const splitTextEl = animationRef.current;
    const letters = splitTextEl.querySelectorAll(".gsap-fade-in-text-letter");
    gsap.fromTo(
      letters,
      { y: "100%", opacity: 0, autoAlpha: 0 },
      {
        y: 0,
        opacity: 1,
        autoAlpha: 1,
        duration: 1,
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
            <span
              className={`${styles.Word} gsap-fade-in-text-word`}
              key={`${word}${wordIdx}`}>
              {word.split("").map((letter, idx) => (
                <span className={`${styles.LetterWrapper}`} key={idx}>
                  <span className={`${styles.Letter} gsap-fade-in-text-letter`}>
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
