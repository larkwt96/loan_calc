class Model {
  constructor({ loan_amount, loan_rate, down_payment, minimum_payment, loan_term = 120 }) {
    this.loan_amount = Math.ceil(loan_amount * 100);
    this.loan_rate = loan_rate / 100 / 12;  // loan_rate is given as percent, converted to decimal per month
    this.down_payment = Math.ceil(down_payment * 100);
    this.minimum_payment = Math.ceil(minimum_payment * 100);
    this.loan_term = Math.ceil(loan_term);
  }

  /**
   * Assume amount and payment are in cents.
   */
  step(amount, payment) {
    let left = amount - payment;
    if (left <= 0) { // if payed off
      return left;
    } else {
      return Math.ceil(left + amount * this.loan_rate); // add interest
    }
  }

  run_payment_plan(monthly_payment) {
    let amount = this.loan_amount - this.down_payment;
    let months = 0;
    if (amount <= 0) {
      return { amount, months };
    }
    for (months = 1; months <= this.loan_term; months++) {
      amount = this.step(amount, monthly_payment);
      if (amount <= 0) {
        break;
      }
    }
    return { amount, months };
  }

  find_payment_plan() {
    // mo payment is under
    let monthly_payment = Math.floor((this.loan_amount - this.down_payment) / this.loan_term);
    if (monthly_payment < this.minimum_payment) {
      monthly_payment = this.minimum_payment;
    }
    if (this.run_payment_plan(monthly_payment).amount <= 0) {
      return monthly_payment;
    }
    let step = 1e5;
    while (step > 1e-1) {
      while (this.run_payment_plan(monthly_payment + step).amount > 0) {
        // adjust monthly payment if not high enough
        monthly_payment += step;
      }
      // adjust step size by factor of 10 (log)
      step = step / 10;
    }
    step *= 10;
    return Math.floor(monthly_payment + step);
  }

  calc_monthly_payment() {
    let monthly_payment = this.find_payment_plan();
    let { amount, months } = this.run_payment_plan(monthly_payment);
    let total_payment = months * monthly_payment + amount;

    // adjust to dollar
    monthly_payment /= 100;
    total_payment /= 100;
    return { monthly_payment, total_payment };
  }

  run() {
    let total_principal = (this.loan_amount - this.down_payment) / 100;
    let { monthly_payment, total_payment } = this.calc_monthly_payment();
    let total_interest = total_payment - total_principal;
    if (monthly_payment > total_payment) {
      monthly_payment = total_payment;
    }
    return {
      monthly_payment,
      total_principal,
      total_interest,
      total_payment,
    };
  }
}

export default Model;