import Model from './Model';

const loan = {
  loan_amounts: [20000],
  loan_rates: [4.55],
  down_payment: 0,
  minimum_payment: 50,
  loan_term: 120,
};
const model = new Model(loan);
const model_plan = model.run();
const model_run = model.run_payment_plan(model_plan.monthly_payment * 100);

it('initiates without crashing', () => {
  new Model(loan);
});

it('calculates monthly payment accurately', () => {
  expect(model_plan.monthly_payment).toBeCloseTo(207.76, 2);
});

it('calculates total principal accurately', () => {
  expect(model_plan.total_principal).toBeCloseTo(20000, 2);
});

it('calculates total interest accurately', () => {
  expect(model_plan.total_interest).toBeCloseTo(4931.09, 1)
});

it('calculates total payment accurately', () => {
  expect(model_plan.total_payment).toBeCloseTo(24931.09, 1)
});

it('calculates total cost accurately', () => {
  const paid = model_run.months * model_plan.monthly_payment + model_run.amount / 100;
  expect(paid).toBeCloseTo(model_plan.total_payment, 1);
});

it('calculates total months accurately', () => {
  expect(model_run.months).toBeCloseTo(120, 5);
});

const multi_loan = {
  loan_amounts: [5000, 4000, 2000, 1000, 7000],
  loan_rates: [4.55, 5.44, 2.33, 7.00, 2.0],
  down_payment: 0,
  minimum_payment: 50,
  loan_term: 120,
};
const multi_model = new Model(multi_loan);
const multi_model_plan = model.run();
const multi_model_run = model.run_payment_plan(model_plan.monthly_payment * 100);


test('multi plan is defined', () => {
  expect(multi_model_plan).toBeDefined();
});

test('multi run is defined', () => {
  expect(multi_model_run).toBeDefined();
});

test('getTargetLoan works', () => {
  const amounts = multi_model.loan_amounts.slice();
  expect(multi_model.getTargetLoan()).toBe(3);
  amounts[3] = 0;
  expect(multi_model.getTargetLoan(amounts)).toBe(1);
});

test('make_payment pay part loan works', () => {
  const { loan_amounts } = multi_model;
  let amounts = multi_model.make_payment(loan_amounts.slice(), 500 * 100);
  expect(amounts[3]).toBe(500 * 100);
});

test('make_payment almost overflow works', () => {
  const { loan_amounts } = multi_model;
  let amounts = multi_model.make_payment(loan_amounts.slice(), 1000 * 100);
  expect(amounts[3]).toBe(0);
  expect(amounts[1]).toBe(4000 * 100);
})

test('make_payment overflow works', () => {
  const { loan_amounts } = multi_model;
  let amounts = multi_model.make_payment(loan_amounts.slice(), 1500 * 100);
  expect(amounts[3]).toBe(0);
  expect(amounts[1]).toBe(3500 * 100);
})

test('make_payment double overflow works', () => {
  const { loan_amounts } = multi_model;
  let amounts = multi_model.make_payment(loan_amounts.slice(), 7500 * 100);
  expect(amounts[3]).toBe(0);
  expect(amounts[1]).toBe(0);
  expect(amounts[0]).toBe(2500 * 100);
})

test('make_payment finish works', () => {
  const { loan_amounts } = multi_model;
  const amounts = loan_amounts.slice();
  const total = multi_model.sum(amounts);
  const finals = multi_model.make_payment(amounts, total);
  // all zero
  for (const amount of finals) {
    expect(amount).toBe(0);
  }
})

test('make_payment overflow finish works', () => {
  const { loan_amounts } = multi_model;
  const amounts = loan_amounts.slice();
  const total = multi_model.sum(amounts);
  const finals = multi_model.make_payment(amounts, total + 47);
  let found = false;
  // all but one zero
  for (const amount of finals) {
    if (amount !== 0) {
      expect(found).toBeFalsy();
      expect(amount).toBe(-47);
      found = true;
    }
  }
});

test('make_payment overflow finish works for single loan', () => {
  const { loan_amounts } = model;
  const amounts = loan_amounts.slice();
  const total = model.sum(amounts);
  const finals = model.make_payment(amounts, total + 47);
  expect(finals[0]).toBe(-47);
});

it('handles zero case', () => {
  const loan = {
    loan_amounts: [0],
    loan_rates: [4.55],
    down_payment: 0,
    minimum_payment: 50,
    loan_term: 120,
  };
  const model = new Model(loan);
  const model_plan = model.run();
  const model_run = model.run_payment_plan(model_plan.monthly_payment * 100);
  expect(model_plan.monthly_payment).toBeCloseTo(0, 2);
  expect(model_plan.total_principal).toBeCloseTo(0, 2);
  expect(model_plan.total_interest).toBeCloseTo(0, 1)
  expect(model_plan.total_payment).toBeCloseTo(0, 1)
  const paid = model_run.months * model_plan.monthly_payment + model_run.amount / 100;
  expect(paid).toBeCloseTo(model_plan.total_payment, 1);
  expect(model_run.months).toBeCloseTo(0, 5);
});;

it('handles multi zero case', () => {
  const loan = {
    loan_amounts: [0, 0, 0, 0],
    loan_rates: [4.5, 4.51, 4.53, 4.25],
    down_payment: 0,
    minimum_payment: 50,
    loan_term: 120,
  };
  const model = new Model(loan);
  const model_plan = model.run();
  const model_run = model.run_payment_plan(model_plan.monthly_payment * 100);
  expect(model_plan.monthly_payment).toBeCloseTo(0, 2);
  expect(model_plan.total_principal).toBeCloseTo(0, 2);
  expect(model_plan.total_interest).toBeCloseTo(0, 1)
  expect(model_plan.total_payment).toBeCloseTo(0, 1)
  const paid = model_run.months * model_plan.monthly_payment + model_run.amount / 100;
  expect(paid).toBeCloseTo(model_plan.total_payment, 1);
  expect(model_run.months).toBeCloseTo(0, 5);
});

it('handles min payment enough case', () => {
  const loan = {
    loan_amounts: [25, 0, 0, 0],
    loan_rates: [4.5, 4.51, 4.53, 4.25],
    down_payment: 0,
    minimum_payment: 50,
    loan_term: 120,
  };
  const model = new Model(loan);
  const model_plan = model.run();
  const model_run = model.run_payment_plan(model_plan.monthly_payment * 100);
  expect(model_plan.monthly_payment).toBeCloseTo(25, 2);
  expect(model_plan.total_principal).toBeCloseTo(25, 2);
  expect(model_plan.total_interest).toBeCloseTo(0, 1)
  expect(model_plan.total_payment).toBeCloseTo(25, 1)
  const paid = model_run.months * model_plan.monthly_payment + model_run.amount / 100;
  expect(paid).toBeCloseTo(model_plan.total_payment, 1);
  expect(model_run.months).toBeCloseTo(1, 5);
});

it('handles no min payment small amount case', () => {
  const loan = {
    loan_amounts: [25, 0, 0, 0],
    loan_rates: [4.5, 4.51, 4.53, 4.25],
    down_payment: 0,
    minimum_payment: 0,
    loan_term: 120,
  };
  const model = new Model(loan);
  const model_plan = model.run();
  const model_run = model.run_payment_plan(model_plan.monthly_payment * 100);
  expect(model_plan.monthly_payment).toBeLessThan(25);
  expect(model_plan.total_principal).toBeCloseTo(25, 2);
  expect(model_plan.total_interest).toBeGreaterThan(0)
  expect(model_plan.total_payment).toBeGreaterThan(25)
  const paid = model_run.months * model_plan.monthly_payment + model_run.amount / 100;
  expect(paid).toBeCloseTo(model_plan.total_payment, 1);
});

it('handles multi monthly payment where min is enough', () => {
  // todo
  const loan = {
    loan_amounts: [25, 36, 42, 10],
    loan_rates: [4.5, 4.51, 4.53, 4.25],
    down_payment: 0,
    minimum_payment: 50,
    loan_term: 120,
  };
  const model = new Model(loan);
  const model_plan = model.run();
  const model_run = model.run_payment_plan(model_plan.monthly_payment * 100);
  expect(model_plan.monthly_payment).toBeCloseTo(25 + 36 + 42 + 10, 2);
  expect(model_plan.total_principal).toBeCloseTo(25 + 36 + 42 + 10, 2);
  expect(model_plan.total_interest).toBeCloseTo(0, 1)
  expect(model_plan.total_payment).toBeCloseTo(25 + 36 + 42 + 10, 1)
  const paid = model_run.months * model_plan.monthly_payment + model_run.amount / 100;
  expect(paid).toBeCloseTo(model_plan.total_payment, 1);
  expect(model_run.months).toBeCloseTo(1, 5);
});