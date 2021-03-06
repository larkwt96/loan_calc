class Model {
  constructor({ loan_amounts, loan_rates, down_payment, minimum_payment, loan_term = 120 }) {
    this.loan_amounts = loan_amounts.map(v => this.toCent(v));
    // loan_rate is given percent per year, converted to decimal per month
    this.loan_rates = loan_rates.map(v => v / 100 / 12);
    //console.log({ this_loan_rates: this.loan_rates, loan_rates })
    this.down_payment = this.toCent(down_payment);
    this.minimum_payment = this.toCent(minimum_payment);
    this.loan_term = Math.max(1, Math.ceil(loan_term));
  }

  toCent(amount) {
    return Math.ceil(amount * 100);
  }

  /**
   * Returns the sum of the elements in an array.
   * 
   * @param {Array} arr Array of numbers
   */
  sum(arr) {
    return arr.reduce((total, val) => total + val, 0);
  }

  /**
   * Returns the index of the maximum number.
   * 
   * @param {Array} arr An array of numbers
   */
  getTargetLoan(amounts = this.loan_amounts) {
    let max_ind = -1;
    for (let i = 0; i < amounts.length; i++) {
      if (amounts[i] <= 0) {
        continue; // ignore
      } else if (max_ind === -1) {
        max_ind = i; // init
      } else if (this.loan_rates[i] > this.loan_rates[max_ind]) {
        max_ind = i; // update
      }
    }
    return max_ind;
  }

  /**
   * pay minimum and return remaining payment amount
   * 
   * @param {Array} amounts Stores remaining loan balance
   * @param {number} payment Amount of payment, assumes capable of paying minimum payments
   */
  pay_minimum(amounts, payment) {
    for (let i = 0; i < amounts.length; i++) {
      amounts[i] -= this.minimum_payment;
      payment -= this.minimum_payment;
      if (amounts[i] < 0) {
        payment += -amounts[i];
        amounts[i] = 0;
      }
    }
    return { postMinimum: amounts, remainingPayment: payment };
  }

  /**
   * make payment and apply interest
   * 
   * @param {Array} amounts Array of loan amounts
   * @param {number} payment Amount paid
   */
  step(amounts, payment) {
    const { postMinimum, remainingPayment } = this.pay_minimum(amounts.slice(), payment)
    const postPayment = this.make_payment(postMinimum, remainingPayment);
    return postPayment.map((currentBalance, index) => {
      if (currentBalance <= 0) {
        return currentBalance;
      } else {
        return Math.ceil(currentBalance + amounts[index] * this.loan_rates[index])
      }
    });
  }

  /**
   * Make payment
   */
  make_payment(amounts, payment) {
    let targetLoan = this.getTargetLoan(amounts);
    if (targetLoan === -1) {
      targetLoan = 0;
    }
    while (targetLoan !== -1 && payment > 0) {
      amounts[targetLoan] -= payment;
      payment = 0;
      const newTargetLoan = this.getTargetLoan(amounts);
      if (amounts[targetLoan] < 0 && newTargetLoan !== -1) {
        payment = -amounts[targetLoan];
        amounts[targetLoan] = 0;
        targetLoan = newTargetLoan;
      } else {
        break;
      }
    }
    return amounts;
  }

  run_payment_plan(monthly_payment) {
    let amounts = this.make_payment(this.loan_amounts.slice(), this.down_payment);
    let months = 0;
    if (this.sum(amounts) <= 0) {
      return { amount: this.sum(amounts), months };
    }
    for (months = 1; months <= this.loan_term; months++) {
      amounts = this.step(amounts, monthly_payment);
      if (this.sum(amounts) <= 0) {
        break;
      }
    }
    return { amount: this.sum(amounts), months };
  }

  find_payment_plan() {
    // mo payment is under
    const total_principal = this.sum(this.loan_amounts) - this.down_payment;
    let monthly_payment = Math.floor(total_principal / this.loan_term);
    // check if minimum payment is solution
    const unpaidLoans = this.loan_amounts.filter((v) => v > 0);
    const minimum_payment = this.minimum_payment * unpaidLoans.length;
    if (monthly_payment < minimum_payment) {
      monthly_payment = minimum_payment;
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
    const monthly_payment = this.find_payment_plan();
    const { amount, months } = this.run_payment_plan(monthly_payment);
    const total_payment = months * monthly_payment + amount;
    return { monthly_payment: monthly_payment / 100, total_payment: total_payment / 100 };
  }

  run() {
    const total_principal = (this.sum(this.loan_amounts) - this.down_payment) / 100;
    let { monthly_payment, total_payment } = this.calc_monthly_payment();
    const total_interest = total_payment - total_principal;
    if (monthly_payment > total_payment) {
      monthly_payment = total_payment;
    }
    const results = {
      monthly_payment,
      total_principal,
      total_interest,
      total_payment,
    };
    return results;
  }
}

export default Model;