import React from "react";
import Image from "next/image";
import Link from "next/link";

import Logo from "public/img/logo/logo.png";

const Footer = () => {
  return (
    <footer>
      
      <div className="footer__copyright grey-bg">
        <div className="container">
          <div className="copyright__inner">
            <div className="copyright__logo">
              <Link href="/">
                <Image src={Logo} alt="logo not found" />
              </Link>
            </div>
            <div className="copyright__text">
              <p>Copyright © 2023 Tick-!t All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
