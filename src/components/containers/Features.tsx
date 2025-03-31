import React, { useState } from "react";
import Image from "next/image";

import Two from "public/img/features/02.png";

const Features = () => {
  const [imgTab, setImgTab] = useState(0);
  return (
    <section className="features__area p-relative features-bg pt-120 pb-30 cus-faq">
      <div className="container">
        <div className="row " data-aos="fade-up" data-aos-delay="300">
          <div className="col-xl-6 col-lg-6">
            <div className="features__thumb-wrapper mb-60">
              <div className="features__thumb">
                <Image src={Two} alt="image not found" />
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="features__content-wrapper">
              <div className="section__title-wrapper mb-25">
                <span className="section__subtitle">
                  <span>FIGHT</span> WITH TICK-!T
                </span>
                <h2 className="section__title">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="bd-faq__wrapper mb-60">
                <div
                  className="bd-faq__accordion"
                  data-aos="fade-left"
                  data-aos-duration="1000"
                >
                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingOne">
                        <button
                          type="button"
                          className={
                            (imgTab == 0 ? "  " : " collapsed") +
                            " accordion-button"
                          }
                          onClick={() => setImgTab(imgTab === 0 ? -1 : 0)}
                        >
                         Can I resubmit my dispute if I lost the initial one?
                        </button>
                      </h2>
                      <div
                        id="collapseOne"
                        className={`accordion-collapse collapse${
                          imgTab === 0 ? " show " : ""
                        }`}
                      >
                        <div className="accordion-body">
                          <p>
                          No, if your violation is upheld, you won&apos;t be able to appeal it again through WinIt. You can attempt a personal appeal, but our specialists advise against it, as it&apos;s unlikely to succeed.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingTwo">
                        <button
                          className={
                            (imgTab == 1 ? "  " : " collapsed") +
                            " accordion-button"
                          }
                          onClick={() => setImgTab(imgTab === 1 ? -1 : 1)}
                        >
                          What&apos;s the estimated processing time for ticket disputes?
                        </button>
                      </h2>
                      <div
                        id="collapseTwo"
                        className={`accordion-collapse collapse${
                          imgTab === 1 ? " show " : ""
                        }`}
                      >
                        <div className="accordion-body">
                          <p>
                          Processing time varies based on violation type and city hearing schedule. Generally, it takes around 20 business days from submission in the app to receive a court decision.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <button
                          className={
                            (imgTab == 2 ? "  " : " collapsed") +
                            " accordion-button"
                          }
                          onClick={() => setImgTab(imgTab === 2 ? -1 : 2)}
                        >
                          Is a physical copy of my ticket necessary for submission?
                        </button>
                      </h2>
                      <div
                        id="collapseThree"
                        className={`accordion-collapse collapse${
                          imgTab === 2 ? " show " : ""
                        }`}
                      >
                        <div className="accordion-body">
                          <p>
                          While not mandatory, submitting the original ticket is suggested. If you lack it, you can still submit with the 10-digit ticket ID, or a clear image of a pre-penalty notice showing the violation number.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingFour">
                        <button
                          className={
                            (imgTab == 3 ? "  " : " collapsed") +
                            " accordion-button"
                          }
                          onClick={() => setImgTab(imgTab === 3 ? -1 : 3)}
                        >
                          When should I submit my ticket for dispute?
                        </button>
                      </h2>
                      <div
                        id="collapseFour"
                        className={`accordion-collapse collapse${
                          imgTab === 3 ? " show " : ""
                        }`}
                      >
                        <div className="accordion-body">
                          <p>
                          Submit as soon as possible to avoid penalty fees. Aim for at least 7 business days before the 30-day deadline. Keep in mind, once submitted, the penalty cycle is paused until your ticket&apos;s hearing.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
