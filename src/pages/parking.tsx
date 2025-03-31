import React, { useState, FormEvent } from "react";
import Layout from "@/components/layout/Layout";
import Summon from "@/components/containers/Summon";
import ParkingTicket from '@/type/type';

const Parking: React.FC = () => {
  const [search, setSearch] = useState("");
  const [foundTickets, setFoundTickets] = useState<ParkingTicket[]>([]);
  const [ticketNotFound, setTicketNotFound] = useState(false);

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const plateSearch = search.toString().toUpperCase();

    try {
      const res = await fetch(
        `https://data.cityofnewyork.us/resource/nc67-uf89.json?plate=${plateSearch}`
      );
      const data: ParkingTicket[] = await res.json();

      if (data.length > 0) {
        setFoundTickets(data);
        setTicketNotFound(false);
      } else {
        setFoundTickets([]);
        setTicketNotFound(true);
      }
    } catch (error) {
      console.log(error);
      setFoundTickets([]);
      setTicketNotFound(true);
    }
      // Reset the input field after search
    setSearch("");
  };
  
  return (
    <Layout>
      <div className="pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-4 col-lg-12 text-center">
              <h2 className="mb-35">Find Your Parking Ticket</h2>

              <form className="searchForm" onSubmit={handleSearch}>
                <label htmlFor="search">Enter Your Plate Number: </label>
                <div className="searchBar">
                  <input
                    className="search-input"
                    type="text"
                    name="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button type="submit" className="solid__btn">Search</button>
                </div>
               
              </form>
            </div>
          </div>
          {foundTickets.length > 0 && (
            <div className="plateInfo">
              <div>
                <p>Plate#: {foundTickets[0].plate} </p>
                <p>State: {foundTickets[0].state} </p>
                <p>Total Tickets Found: {foundTickets.length}</p>
                <p className="unpaidAmount">
                  Unpaid Amount:{" $"}
                  {+foundTickets
                    .filter((ticket) => ticket.amount_due > 0)
                    .reduce((a, b) => a + +b.amount_due, 0)
                    .toFixed(2)}
                </p>
              </div>
              
              <div className="paymentBtn">
                <button className="border__btn">Make Payment</button>
                <button className="border__btn">Dispute</button>
              </div>
            </div>
          )}
          <div className="ticket-container">
            {foundTickets.length > 0 ? (
              foundTickets.map((ticket) => (
                <Summon key={ticket.summons_number} ticket={ticket} />
              ))
            ) : (
              <p>{ticketNotFound ? "No Ticket Found!" : ""}</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Parking;
