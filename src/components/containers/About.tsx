import React from "react";
import Image from "next/image";
import Link from "next/link";

import one from "public/img/about/1.png";
import two from "public/img/about/2.png";
import three from "public/img/about/3.png";

const About = () => {
  return (
    <section className="work__area grey-bg pt-120 pb-60" id="about">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section__title-wrapper text-center mb-70">
              <div className="section__subtitle-3">
                <span>HOW DOES IT WORKS</span>
              </div>
              <div className="section__title-3 mb-20">Dealing with Your Ticket Is Effortless</div>
              <p>
              Streamlined Parjking & Traffic Ticket Solutions
              </p>
            </div>
          </div>
        </div>
        <div className="row " data-aos="fade-up" data-aos-delay="300">
          <div className="work__item-grid">
            <div className="work__item mb-60">
              <div className="work__flow-shape"></div>
              <div className="work__thumb">
                <Image src={one} alt="image not found" />
              </div>
              <div className="work__content">
                <h3>
                  <Link href="/">Snap & Send</Link>
                </h3>
                <p>
                Capture your ticket or use the app to uncover associated fines from NYC&apos;s servers.
                </p>
              </div>
            </div>
            <div className="work__item mb-60">
              <div className="work__flow-shape"></div>
              <div className="work__thumb">
                <Image src={two} alt="image not found" />
              </div>
              <div className="work__content">
                <h3>
                  <Link href="/">Evidence Review</Link>
                </h3>
                <p>
                Share your proof through the app. Our experts spot errors to strengthen your case.

                </p>
              </div>
            </div>
            <div className="work__item mb-60" >
              <div className="work__thumb">
                <Image src={three} alt="image not found" />
              </div>
              <div className="work__content">
                <h3>
                  <Link href="/">Full Representation</Link>
                </h3>
                <p>
                Relax – our team manages your dispute from start to finish, keeping you informed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
