import React from "react";
import ParkingTicket from '@/type/type';

interface SummonProps {
  ticket: ParkingTicket;
}

const Summon: React.FC<SummonProps> = ({ ticket }) => {
  return (
    <div id="ticket-card" className="ticket-card">
      <table className="ticket-table">
        <tbody>
          <tr>
            <td>Summons#:</td>
            <td>{ticket.summons_number}</td>
          </tr>
          <tr>
            <td>Issue date:</td>
            <td>{ticket.issue_date}</td>
          </tr>
          <tr>
            <td>Violation Time:</td>
            <td>{ticket.violation_time}</td>
          </tr>
          <tr>
            <td>Violation:</td>
            <td>{ticket.violation}</td>
          </tr>
          {/* <tr>
            <td>County:</td>
            <td>{ticket.county}</td>
          </tr> */}
          <tr>
            <td>Fine:</td>
            <td>${ticket.fine_amount}</td>
          </tr>
          <tr>
            <td>Penalty:</td>
            <td>${ticket.penalty_amount}</td>
          </tr>
          {/* <tr>
            <td>Interest Amount:</td>
            <td>${ticket.interest_amount}</td>
          </tr>
          <tr>
            <td>Reduction Amount:</td>
            <td>${ticket.reduction_amount}</td>
          </tr> */}
          <tr>
            <td>Payment:</td>
            <td>${ticket.payment_amount}</td>
          </tr>
          <tr>
            <td>Amount Due:</td>
            <td>${ticket.amount_due}</td>
          </tr>
        </tbody>
      </table>
      <iframe
        src={ticket.summons_image.url}
        height="200"
        width="300"
        title="Iframe"
      ></iframe>
      {ticket.amount_due > 0 && (
        <button className="solid__btn">Make Payment</button>
      )}
      <a
        href={ticket.summons_image.url}
        target="_blank"
        rel="noopener noreferrer"
        className="border__btn"
      >
        Download Summon Image
      </a>
    
    </div>
  );
};

export default Summon;
