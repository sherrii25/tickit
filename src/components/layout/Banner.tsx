import React,{ useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HeroShape3 from "public/img/shape/hero-shape-3.png";
import HeroShape4 from "public/img/shape/hero-shape-4.png";
import Hero from "public/img/hero/hero-thumb-1.png";
import HeroShapeDot from "public/img/shape/dot.png";
import Modal from "../containers/Modal"


const Banner = () => {

  const [openModal,setOpenModal] = useState(false);

  return (
    <section className="hero__area hero__hight d-flex align-items-center p-relative">
      <div className="hero__shape-3">
        <Image src={HeroShape3} alt="Hero-shape-3" />
      </div>
      <div className="hero__shape-4">
        <Image src={HeroShape4} alt="Hero-shape-4" />
      </div>
      <div className="container-fluid">
        <div className="hero__main-wrapper">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6 col-md-6">
              <div className="hero__content-wrapper">
                <div className="hero__content">
                  <h2 className="" data-aos="fade-up" data-aos-delay="500">
                  Join the Fight Against Your Tickets Today!
                  </h2>
                  <p className="" data-aos="fade-up" data-aos-delay="600">
                  Wave Goodbye to Ticket Stress
                  </p>
                </div>
              </div>
                <div className="hero__btn-link">
                    <button type="submit" className="solid__btn" onClick={()=>{setOpenModal(true)}}>
                      Fight Now 
                    </button>
                    <Link className="border__btn" href="#about">
                    Learn more &#8594;
                    </Link>
                </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6">
              <div className="hero__thumb-wrapper mb-60">
                <div className="hero__thumb w-img">
                  <Image src={Hero} alt="Fighting Dog Illustration" />
                </div>
                <div className="hero__shape-1">
                  <Image
                    className="parallaxed"
                    src={HeroShapeDot}
                    alt="Hero-Shape-Dot"
                  />
                </div>
                <div className="hero__shape-2">
                  <Image
                    className="parallaxed"
                    src={HeroShapeDot}
                    alt="Hero-Shape-Dot"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openModal && <Modal closeModal={setOpenModal}/>}
    </section>
  );
};

export default Banner;
