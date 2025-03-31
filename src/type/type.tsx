 interface ParkingTicket {
  plate: string;
  state: string;
  summons_number: string;
  issue_date: string;
  violation_time: string;
  violation: string;
  county: string;
  fine_amount: number;
  penalty_amount: number;
  interest_amount: number;
  reduction_amount: number;
  payment_amount: number;
  amount_due: number;
  summons_image: {
    url: string;
  };
}
export default ParkingTicket;