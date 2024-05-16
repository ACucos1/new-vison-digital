import SplitText from "@/components/splitText/SplitText";
import Navbar from "@/components/navbar/Navbar";
import styles from "@/styles/Home.module.scss";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const animationRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const myForm = e.target;
    const formData = new FormData(myForm);

    fetch("/", {
      method: "POST",
      body: new URLSearchParams(formData).toString(),
    })
      .then(console.log("Form Submitted"))
      .catch((err) => console.log(err));
  };

  //Client Section Animation
  useEffect(() => {
    const mainEl = animationRef.current;
    if (mainEl) {
      const clients = mainEl.querySelectorAll(".gsap-clients-wrapper > *");
      clients.forEach((client) => {
        const onMouseEnter = (event) => {
          const selector = client.querySelector(".gsap-client-selector");
          let middle = event.target.offsetTop + event.target.offsetHeight / 2;
          const y = event.pageY;
          // console.log(middle, y);
          // gsap.set(selector, { y: "100%", height: 0 });
          if (y < middle) {
            gsap.set(selector, { top: 0, bottom: "unset" });
            gsap.to(selector, {
              height: "100%",
              duration: 0.3,
            });
          } else {
            gsap.set(selector, { top: "unset", bottom: 0 });
            gsap.to(selector, {
              top: "unset",
              bottom: 0,
              height: "100%",
              duration: 0.3,
            });
          }
        };

        const onMouseExit = (event) => {
          const selector = client.querySelector(".gsap-client-selector");
          let middle = event.target.offsetTop + event.target.offsetHeight / 2;
          const y = event.pageY;

          if (y < middle) {
            gsap.set(selector, { top: 0, bottom: "unset" });
            gsap.to(selector, {
              // height: 0,
              y: "-100%",
              duration: 0.3,
              onComplete: () => {
                gsap.set(selector, { y: 0, height: 0 });
              },
            });
          } else {
            gsap.set(selector, { top: "unset", bottom: 0 });
            gsap.to(selector, {
              height: 0,
              duration: 0.3,
              onComplete: () => {
                gsap.set(selector, { y: 0 });
              },
            });
          }
        };

        client.addEventListener("mouseenter", onMouseEnter);
        client.addEventListener("mouseleave", onMouseExit);

        return () => {
          client.removeEventListener("mouseenter", onMouseEnter);
          client.removeEventListener("mouseleave", onMouseExit);
        };
      });
    }
  }, []);

  //Fade in Animation
  useEffect(() => {
    gsap.utils.toArray(".gsap-fade-in").forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 25, autoAlpha: 0 },
        {
          opacity: 1,
          y: 0,
          autoAlpha: 1,
          duration: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: element,
            start: "top 100%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <>
      <Head>
        <title>Vison Digital - Toronto Web Design</title>
        <meta
          name='description'
          content='Toronto based web design and development Agency. Offering design, development, SEO management services and more.'
        />
        <meta name='og:site_name' content='Vison Digital' />
        <meta
          name='og:description'
          content='Toronto based Web design and development agency. Offering design, development, SEO management services and more.'
        />
        <meta name='og:title' content='Vison Digital' />
        <meta name='og:image' content='../public/images/opengraph_image.png' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <main className={`${styles.Main}`} ref={animationRef}>
        <section className={styles.Hero} id='hero'>
          <div className={`${styles.Tagline} regular-text-large`}>
            <SplitText text='Web Design Toronto' />
          </div>

          <div className={`${styles.Description} regular-text-med`}>
            <SplitText text='We’re a boutique web design agency specializing in creating bespoke experiences for your brand.' />
            <div className={styles.CtaGroup}>
              <a href='#contact'>
                <button className={`btn-primary gsap-fade-in`}>
                  Get In Touch
                </button>
              </a>
              <a href='#clients'>
                <button className={`btn-secondary gsap-fade-in`}>
                  Our Work
                </button>
              </a>
            </div>
            <div className={`${styles.PhoneNumber} regular-text-small`}>
              <Image
                className={`gsap-fade-in`}
                width={24}
                height={24}
                src='/images/phone.svg'
              />
              <SplitText text='+1 416 697 1428' />
            </div>
          </div>

          <div className={styles.ContinueArrow}>
            <a href='#expo'>
              <Image
                className='gsap-fade-in'
                src='/images/continue_arrow.svg'
                width={70}
                height={40}
              />
            </a>
          </div>
        </section>

        <section className={styles.Expo1} id='expo'>
          <div className={`${styles.Description} regular-text-large`}>
            <SplitText text='We build custom websites that reflect your brand’s unique identity' />
            <button className='btn-primary gsap-fade-in'>Get In Touch</button>
          </div>
          <div className={styles.Mirror}></div>
          <div className={`${styles.MirrorText} regular-text-med`}>
            <SplitText text='Mirror, Mirror on the wall...' />
          </div>
        </section>

        <section
          className={`${styles.Clients} gsap-clients-wrapper`}
          id='clients'>
          <div className={`${styles.Header} regular-text-large`}>
            <SplitText text='Some of our Happy Clients' />
            <div
              className={`${styles.ClientSelector} gsap-client-selector`}></div>
          </div>
          <a href='https://pabloscoffeehouse.com' target='_blank'>
            <div className={`${styles.ClientName} regular-text-med`}>
              <SplitText text="Pablo's Coffee House" />
              <div
                className={`${styles.ClientSelector} gsap-client-selector`}></div>
            </div>
          </a>
          <a href='https://tribewire.webflow.io' target='_blank'>
            <div className={`${styles.ClientName} regular-text-med`}>
              <SplitText text='TribeWire Media' />
              <div
                className={`${styles.ClientSelector} gsap-client-selector`}></div>
            </div>
          </a>
          <a href='https://marinasmusicstudio.com' target='_blank'>
            <div className={`${styles.ClientName} regular-text-med`}>
              <SplitText text="Marina's Music Studio" />
              <div
                className={`${styles.ClientSelector} gsap-client-selector`}></div>
            </div>
          </a>

          <div className={`${styles.Description} regular-text-small`}>
            <SplitText text="We're proud to have worked with businesses across a wide variety of industries. Whether you're a burgeoning family business or you're a bigger player looking to launch their latest offer with pizzaz, we want to hear form you!" />
          </div>
          <a href='#contact'>
            <button className='btn-primary gsap-fade-in'>Get In Touch</button>
          </a>
        </section>

        <section className={styles.Expo2} id='services'>
          <div className={`${styles.Header} regular-text-large`}>
            <SplitText text='What we do' />
          </div>
          <div className={styles.Mirror}></div>
          <div className={styles.Services}>
            <div className={`${styles.Service} regular-text-med`}>
              <SplitText text='Web Design' />
            </div>
            <div className={`${styles.Service} regular-text-med`}>
              <SplitText text='Web Development' />
            </div>
            <div className={`${styles.Service} regular-text-med`}>
              <SplitText text='Branding & Strategy' />
            </div>
            <div className={`${styles.Service} regular-text-med`}>
              <SplitText text='SEO Management' />
            </div>
            <a href='#contact'>
              <button className='btn-primary gsap-fade-in'>Get In Touch</button>
            </a>
          </div>
        </section>

        <section className={styles.Contact} id='contact'>
          <div className={styles.ContactInner}>
            <div className={styles.CallToAction}>
              <div className={`${styles.Header} regular-text-large`}>
                <SplitText text="Let's Get Started" />
              </div>
              <div className={`${styles.Description} regular-text-small`}>
                <SplitText
                  text='Tell us more about your project here or give us a call, and we’ll get back to you with
a high-level estimate and scope of work.'
                />
                <div className={`${styles.PhoneNumber} regular-text-med`}>
                  <Image
                    className={`gsap-fade-in`}
                    width={48}
                    height={48}
                    src='/images/phone.svg'
                  />
                  <SplitText text='+1 416 697 1428' />
                </div>
              </div>
            </div>
            <form
              name='contact'
              method='POST'
              action='/'
              data-netlify='true'
              onSubmit={handleFormSubmit}
              className={`${styles.ContactForm} regular-text-small gsap-fade-in`}>
              <div className={`regular-text-med`}>
                <SplitText text='Project Submission Form' />
              </div>
              <div className={styles.NameWrapper}>
                <input type='text' placeholder='First Name' required />
                <input type='text' placeholder='Last Name' />
              </div>
              <input type='text' placeholder='Company Name' />
              <input type='email' placeholder='Email' required />
              <input
                type='file'
                name='Project Proposal/RFP'
                accept='.pdf, .docx, .doc'
                required
              />
              <input className='btn-primary' type='submit' value='Submit' />
            </form>
          </div>
        </section>

        <div className={styles.Quote}>
          <div className={styles.QuoteWrapper}>
            <div className={`regular-text-med`}>
              <SplitText text='“Design is the silent ambassador of your brand.”' />
            </div>
            <div className={`regular-text-med`}>
              <SplitText text='-Paul Rand' />
            </div>
          </div>
        </div>

        <footer className={styles.Footer}>
          <div className={styles.Logo}>
            <SplitText text={"VISON DIGITAL"} breakIndex={1} />
          </div>
          <div className={`${styles.PhoneNumber} regular-text-small`}>
            <Image
              className={`gsap-fade-in`}
              width={24}
              height={24}
              src='/images/phone.svg'
            />
            <SplitText text='+1 416 697 1428' />
          </div>
          <div className='regular-text-xsmall'>
            <SplitText
              text='21 Karl Fraser Rd Unit N 0007 Toronto, ON M3C 3R6'
              breakIndex={7}
            />
          </div>
        </footer>
      </main>
    </>
  );
}
