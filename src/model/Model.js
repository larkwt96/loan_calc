class Model {
  constructor(loan_amount, loan_rate, down_payment, minimum_payment) {
    this.loan_amount = loan_amount;
    this.loan_rate = loan_rate;
    this.down_payment = down_payment;
    this.minimum_payment = minimum_payment
  }

  run() {
    let total_principal = 1000;
    let total_interest = 500;
    let total_payment = total_principal + total_interest;
    let monthly_payment = total_payment / 120;
    return {
      monthly_payment,
      total_principal,
      total_interest,
      total_payment,
    };
  }
}

export default Model;