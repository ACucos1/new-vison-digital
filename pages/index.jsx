import SplitText from "@/components/splitText/SplitText";
import FadeInText from "@/components/fadeInText/FadeInText";
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
    const myForm = e.target;
    if (!form.checkValidity()) return;
    const formData = new FormData(myForm);

    fetch("/", {
      method: "POST",
      body: new URLSearchParams(formData).toString(),
    });

    e.preventDefault();
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
            <a href='#contact'>
              <button className='btn-primary gsap-fade-in'>Get In Touch</button>
            </a>
          </div>
          <div className={styles.Mirror}></div>
          <div className={`${styles.MirrorText} regular-text-med`}>
            <FadeInText text='Mirror, Mirror on the wall...' />
          </div>
        </section>

        <section className={styles.ServiceDetails} id='services'>
          <div className={`${styles.TagLine} regular-text-large`}>
            <SplitText
              text='We take care of your website so you can take care of your business'
              breakIndex={6}
            />
          </div>

          <div className={styles.ServicesWrapper}>
            <div className={styles.ServicesColumn}>
              {[
                "Hosting Fees Included",
                "Unlimited Edits",
                "24/7 Customer Service",
              ].map((text) => (
                <div className={`${styles.Service} regular-text-small`}>
                  <FadeInText text={text} />
                </div>
              ))}
            </div>
            <div className={styles.ServicesColumn}>
              {[
                "40+ Hours of design & development",
                "100 Google Page Speed Score",
                "Google Analytics",
              ].map((text) => (
                <div className={`${styles.Service} regular-text-small`}>
                  <FadeInText text={text} />
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.Description} regular-text-xsmall`}>
            <FadeInText
              text='We handle all the ins and outs of managing your website, so you don’t have to. You own your domain, content, listing, and profiles. Cancel anytime with no fees or hassle.'
              // breakIndex={18}
            />
          </div>

          {/* <a href='#contact'>
            <button className='btn-primary'>Get In Touch</button>
          </a> */}
        </section>

        <section className={styles.Packages}>
          <div className={styles.Mirror}></div>
          <div className={`${styles.Package}`}>
            <div className={`${styles.PackageHeader} regular-text-large`}>
              <SplitText text='Basic' />
            </div>
            <div className={`${styles.PackagePrice} regular-text-large`}>
              <FadeInText text='$99 per month' />
            </div>
            <div className={`regular-text-med`}>
              <FadeInText text='12 month minimum' />
            </div>
            {[
              "Hosting Fees Included",
              "1 Page",
              "24/7 Support",
              "3 Revisions",
              "Google Analyitics",
            ].map((text) => (
              <div className={`${styles.Service} regular-text-small`}>
                <FadeInText text={text} />
              </div>
            ))}
          </div>

          <div className={`${styles.Package}`}>
            <div className={`${styles.PackageHeader} regular-text-large bold`}>
              <SplitText text='Standard' />
            </div>
            <div className={`${styles.PackagePrice} regular-text-large`}>
              <FadeInText text='$150 per month' />
            </div>
            <div className={`regular-text-med`}>
              <FadeInText text='12 month minimum' />
            </div>
            {[
              "Hosting Fees Included",
              "5 Pages",
              "24/7 Support",
              "Unlimited Edits",
              "Google Analyitics",
            ].map((text) => (
              <div className={`${styles.Service} regular-text-small`}>
                <FadeInText text={text} />
              </div>
            ))}
          </div>

          <div className={`${styles.Package}`}>
            <div className={`${styles.PackageHeader} regular-text-large`}>
              <SplitText text='E-Commerce' />
            </div>
            <div className={`${styles.PackagePrice} regular-text-large`}>
              <FadeInText text='$5000' />
            </div>
            <div className={`regular-text-med`}>
              <FadeInText text='min. upfront cost' />
            </div>
            {[
              "Custom Designed",
              "Custom coded Shopify Integration",
              "Easy to Edit",
            ].map((text) => (
              <div className={`${styles.Service} regular-text-small`}>
                <FadeInText text={text} />
              </div>
            ))}
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
            <FadeInText text="We're proud to have worked with businesses across a wide variety of industries. Whether you're a burgeoning family business or you're a bigger player looking to launch their latest offer with pizzaz, we want to hear form you!" />
          </div>
          <a href='#contact'>
            <button className='btn-primary gsap-fade-in'>Get In Touch</button>
          </a>
        </section>

        {/* <section className={styles.Expo2} id='LearnMore'>
          <div className={`${styles.Header} regular-text-large`}>
            <SplitText text='No upfront cost.' />
          </div>
          <div className={styles.Mirror}></div>
          <div className={styles.Services}>
            <div className={`${styles.ServiceHeader} regular-text-med`}>
              <SplitText text='$0 down, $150 per month, 12 month minimum contract' />
            </div>
            <div className={`${styles.ServiceDesc} regular-text-small`}>
              <SplitText text='$0 down for a standard 5 page business website' />
            </div>
            <a href='/services'>
              <button className='btn-primary gsap-fade-in'>Learn More</button>
            </a>
          </div>
        </section> */}

        <section className={styles.Contact} id='contact'>
          <div className={styles.ContactInner}>
            <div className={styles.CallToAction}>
              <div className={`${styles.Header} regular-text-large`}>
                <SplitText text="Let's Get Started" />
              </div>
              <div className={`${styles.Description} regular-text-small`}>
                <FadeInText
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
                  <FadeInText text='+1 416 697 1428' />
                </div>
              </div>
            </div>
            <form
              onSubmit={handleFormSubmit}
              method='POST'
              action='/'
              data-netlify='true'
              name='contact'
              className='regular-text-small gsap-fade-in'>
              <input type='hidden' name='form-name' value='contact' />
              <div className={`regular-text-med`}>
                <p>Project Submission Form</p>
              </div>
              <div className={styles.NameWrapper}>
                <label htmlFor='fname' hidden></label>
                <input
                  name='fname'
                  type='text'
                  placeholder='First Name'
                  required
                />
                <label htmlFor='lname' hidden></label>
                <input name='lname' type='text' placeholder='Last Name' />
              </div>
              <label htmlFor='companyname' hidden></label>
              <input
                name='companyname'
                type='text'
                placeholder='Company Name'
              />
              <label htmlFor='email' hidden></label>
              <input name='email' type='email' placeholder='Email' required />
              <label htmlFor='proposal'>Project Proposal/RFP</label>
              <input
                type='file'
                name='proposal'
                placeholder='Project Proposal/RFP'
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
            <FadeInText text={"VISON DIGITAL"} breakIndex={1} />
          </div>
          <div className={`${styles.PhoneNumber} regular-text-small`}>
            <Image
              className={`gsap-fade-in`}
              width={24}
              height={24}
              src='/images/phone.svg'
            />
            <FadeInText text='+1 416 697 1428' />
          </div>
          <div className='regular-text-xsmall'>
            <FadeInText
              text='21 Karl Fraser Rd Unit N 0007 Toronto, ON M3C 3R6'
              breakIndex={7}
            />
          </div>
        </footer>
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  return { props: {} };
};
