import Model from './Model';

const loan = {
  loan_amount: [20000],
  loan_rate: [4.55],
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
  loan_amount: [20000],
  loan_rate: [4.55],
  down_payment: 0,
  minimum_payment: 50,
  loan_term: 120,
};
const multi_model = new Model(loan);
const multi_model_plan = model.run();
const multi_model_run = model.run_payment_plan(model_plan.monthly_payment * 100);
