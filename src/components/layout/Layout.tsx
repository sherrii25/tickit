import React, { Fragment } from "react";
import Head from "next/head";

import Header from "./Header";
import Footer from "./Footer";

type layoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children}: layoutProps) => {
  return (
    <Fragment>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <title>Tick-!t | Traffic Ticket Solution</title>
        <meta name="keywords" content="traffic, ticket, solution" />
        <meta name="description" content="Traffic Ticket Solution" />
      </Head>
      <div >
        <Header />
        <main>{children}</main>
        <Footer/>
      </div>
    </Fragment>
  );
};

export default Layout;
