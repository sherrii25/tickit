import React, { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import Modal from "../containers/Modal"

import Logo from "public/img/logo/logo.png";

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  
  useEffect(() => {
    const handleResizeHeader = (): void => {
      setToggleMenu(false);
    };

    window.addEventListener("resize", handleResizeHeader);

    return () => {
      window.removeEventListener("resize", handleResizeHeader);
    };
  }, []);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [openModal,setOpenModal] = useState(false);

  return (
    <Fragment>
      <div className="fix">
        <div className={(toggleMenu ? " info-open" : " ") + " offcanvas__info"}>
          <div className="offcanvas__wrapper">
            <div className="offcanvas__content">
              <div className="offcanvas__top mb-40 d-flex justify-content-between align-items-center">
                <div className="offcanvas__logo">
                  <Link href="/">
                    <Image src={Logo} alt="logo" priority />
                  </Link>
                </div>
                <div className="offcanvas__close">
                  <button
                    aria-label="Close"
                    onClick={() => setToggleMenu(false)}
                  >
                    <i className="fal fa-times"></i>
                  </button>
                </div>
              </div>
              <div className="offcanvas__search mb-25">
                <form action="/">
                  <input
                    type="text"
                    placeholder="What are you searching for?"
                    required
                  />
                  <button type="submit">
                    <i className="far fa-search"></i>
                  </button>
                </form>
              </div>
              <div className="mobile-menu fix mb-40 mean-container">
                <div className="mean-bar d-block d-lg-none">
                  <nav className="mean-nav">
                    <ul>
                      <li>
                        <Link href="/">Home</Link>
                      </li>
                      <li>
                        <Link href="#about">About</Link>
                      </li>
                      <li>
                        <Link href="#service">Services</Link>
                      </li>
                      <li>
                        <Link href="#contact">Contact</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="offcanvas__contact mt-30 mb-20">
                <h4>Contact Info</h4>
                <ul>
                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon mr-15">
                      <i className="fal fa-map-marker-alt"></i>
                    </div>
                    <div className="offcanvas__contact-text">
                      <Link href="/">
                        6823 Fort Hamilton Parkway, Brooklyn, NY 11219
                      </Link>
                    </div>
                  </li>
                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon mr-15">
                      <i className="far fa-phone"></i>
                    </div>
                    <div className="offcanvas__contact-text">
                      <Link href="tel:+1 (646) 645-4178" aria-label="Contact Us">
                      +1 (646) 645-0000
                      </Link>
                    </div>
                  </li>
                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon mr-15">
                      <i className="fal fa-envelope"></i>
                    </div>
                    <div className="offcanvas__contact-text">
                      <Link href="tel:+1(646)645-4178" aria-label="Contact Us">
                        <span className="mailto:info@cubiko.com">
                          info@cubiko.com
                        </span>
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="offcanvas__social">
                <ul>
                  <li>
                    <Link href="/">
                      <i className="fab fa-facebook-f"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <i className="fab fa-twitter"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <i className="fab fa-youtube"></i>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <i className="fab fa-linkedin"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={(toggleMenu ? " overlay-open" : " ") + " offcanvas__overlay"}
        onClick={() => setToggleMenu(false)}
      ></div>
      <div className="offcanvas__overlay-white"></div>
      <header>
        <div
          id="header-sticky"
          className={
            (scrolled ? " sticky" : " ") + " header__area header__transparent"
          }
        >
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-2 col-lg-2 col-6">
                <div className="header__logo">
                  <Link href="/">
                    <Image src={Logo} priority alt="logo not found" />
                  </Link>
                </div>
              </div>
              <div className="col-xl-7 col-lg-9 d-none d-lg-block">
                <div className="menu__main-wrapper d-flex justify-content-center">
                  <div className="main-menu d-none d-none d-lg-block">
                    <nav id="mobile-menu">
                      <ul>
                      <li>
                          <Link href="/">Home</Link>
                        </li>
                        <li>
                          <Link href="#about">About</Link>
                        </li>
                        <li>
                          <Link href="#service">Services</Link>
                        </li>

                        <li>
                          <Link href="#contact">Contact</Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-1 col-6">
                <div className="header__right d-flex align-items-center justify-content-end">
                  <div className="header__btn d-none d-xl-block">
                    <button className="border__btn" onClick={()=>{
                      setOpenModal(true)
                    }}>
                      Fight Now
                    </button>
                    {openModal && <Modal closeModal={setOpenModal}/>}
                  </div>
                  <div className="header__toggle d-lg-none">
                    <button
                      className="sidebar__active"
                      aria-label="Toggle Sidebar"
                      onClick={handleToggleMenu}
                    >
                      <div className="bar-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </button>
                  </div>
                  <div className="header__hamburger d-none d-lg-block ml-60">
                    <button
                      className="humbager__icon sidebar__active"
                      aria-label="Hamburger"
                      onClick={handleToggleMenu}
                    >
                      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 14C12.2091 14 14 12.2091 14 10C14 7.79086 12.2091 6 10 6C7.79086 6 6 7.79086 6 10C6 12.2091 7.79086 14 10 14Z" fill="#828282"/><path d="M24 14C26.2091 14 28 12.2091 28 10C28 7.79086 26.2091 6 24 6C21.7909 6 20 7.79086 20 10C20 12.2091 21.7909 14 24 14Z" fill="#828282"/><path d="M38 14C40.2091 14 42 12.2091 42 10C42 7.79086 40.2091 6 38 6C35.7909 6 34 7.79086 34 10C34 12.2091 35.7909 14 38 14Z" fill="#828282"/><path d="M10 28C12.2091 28 14 26.2091 14 24C14 21.7909 12.2091 20 10 20C7.79086 20 6 21.7909 6 24C6 26.2091 7.79086 28 10 28Z" fill="#828282"/><path d="M24 28C26.2091 28 28 26.2091 28 24C28 21.7909 26.2091 20 24 20C21.7909 20 20 21.7909 20 24C20 26.2091 21.7909 28 24 28Z" fill="#828282"/><path d="M38 28C40.2091 28 42 26.2091 42 24C42 21.7909 40.2091 20 38 20C35.7909 20 34 21.7909 34 24C34 26.2091 35.7909 28 38 28Z" fill="#828282"/><path d="M10 42C12.2091 42 14 40.2091 14 38C14 35.7909 12.2091 34 10 34C7.79086 34 6 35.7909 6 38C6 40.2091 7.79086 42 10 42Z" fill="#828282"/><path d="M24 42C26.2091 42 28 40.2091 28 38C28 35.7909 26.2091 34 24 34C21.7909 34 20 35.7909 20 38C20 40.2091 21.7909 42 24 42Z" fill="#828282"/><path d="M38 42C40.2091 42 42 40.2091 42 38C42 35.7909 40.2091 34 38 34C35.7909 34 34 35.7909 34 38C34 40.2091 35.7909 42 38 42Z" fill="#828282"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
