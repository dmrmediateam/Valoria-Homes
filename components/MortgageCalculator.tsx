"use client";

import { useMemo, useState } from "react";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

const numberFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

function formatCurrency(value: number) {
  return currencyFormatter.format(Number.isFinite(value) ? value : 0);
}

function formatNumber(value: number) {
  return numberFormatter.format(Number.isFinite(value) ? value : 0);
}

function parseInput(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(450000);
  const [downPayment, setDownPayment] = useState(67500);
  const [interestRate, setInterestRate] = useState(6.25);
  const [loanTermYears, setLoanTermYears] = useState(30);
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.2);
  const [homeInsuranceAnnual, setHomeInsuranceAnnual] = useState(1800);
  const [hoaMonthly, setHoaMonthly] = useState(0);
  const [pmiRate, setPmiRate] = useState(0.7);

  const calculations = useMemo(() => {
    const safeHomePrice = Math.max(homePrice, 0);
    const safeDownPayment = Math.min(Math.max(downPayment, 0), safeHomePrice);
    const loanAmount = Math.max(safeHomePrice - safeDownPayment, 0);
    const months = Math.max(loanTermYears, 1) * 12;
    const monthlyRate = Math.max(interestRate, 0) / 100 / 12;

    const monthlyPrincipalInterest =
      monthlyRate === 0
        ? loanAmount / months
        : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
          (Math.pow(1 + monthlyRate, months) - 1);

    const monthlyPropertyTax = (safeHomePrice * Math.max(propertyTaxRate, 0)) / 100 / 12;
    const monthlyInsurance = Math.max(homeInsuranceAnnual, 0) / 12;
    const downPaymentPercent = safeHomePrice > 0 ? (safeDownPayment / safeHomePrice) * 100 : 0;
    const monthlyPmi = downPaymentPercent < 20 ? (loanAmount * Math.max(pmiRate, 0)) / 100 / 12 : 0;
    const totalMonthly = monthlyPrincipalInterest + monthlyPropertyTax + monthlyInsurance + Math.max(hoaMonthly, 0) + monthlyPmi;
    const totalInterest = monthlyPrincipalInterest * months - loanAmount;

    return {
      loanAmount,
      downPaymentPercent,
      monthlyPrincipalInterest,
      monthlyPropertyTax,
      monthlyInsurance,
      monthlyPmi,
      totalMonthly,
      totalInterest
    };
  }, [downPayment, hoaMonthly, homeInsuranceAnnual, homePrice, interestRate, loanTermYears, pmiRate, propertyTaxRate]);

  return (
    <div className="mt-10 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-card fade-in-up">
      <div className="border-b border-slate-200 bg-brand-blue px-4 py-3 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-white">Mortgage Calculator</p>
      </div>
      <div className="grid gap-8 p-4 sm:grid-cols-2 sm:p-6">
        <div>
          <h2 className="font-heading text-2xl text-brand-blue">Estimate Monthly Cost</h2>
          <p className="mt-3 text-sm leading-relaxed text-brand-body">
            Adjust values to compare scenarios for your modular home budget.
          </p>
          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-body">Home Price</span>
              <input
                type="number"
                min={0}
                value={homePrice}
                onChange={(event) => setHomePrice(parseInput(event.target.value))}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-brand-body focus:border-brand-blue focus:outline-none"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-body">Down Payment</span>
              <input
                type="number"
                min={0}
                value={downPayment}
                onChange={(event) => setDownPayment(parseInput(event.target.value))}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-brand-body focus:border-brand-blue focus:outline-none"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-body">Interest Rate (%)</span>
              <input
                type="number"
                min={0}
                step="0.01"
                value={interestRate}
                onChange={(event) => setInterestRate(parseInput(event.target.value))}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-brand-body focus:border-brand-blue focus:outline-none"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-body">Loan Term (Years)</span>
              <input
                type="number"
                min={1}
                value={loanTermYears}
                onChange={(event) => setLoanTermYears(parseInput(event.target.value))}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-brand-body focus:border-brand-blue focus:outline-none"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-body">Property Tax Rate (% yearly)</span>
              <input
                type="number"
                min={0}
                step="0.01"
                value={propertyTaxRate}
                onChange={(event) => setPropertyTaxRate(parseInput(event.target.value))}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-brand-body focus:border-brand-blue focus:outline-none"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-body">Home Insurance (Yearly)</span>
              <input
                type="number"
                min={0}
                value={homeInsuranceAnnual}
                onChange={(event) => setHomeInsuranceAnnual(parseInput(event.target.value))}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-brand-body focus:border-brand-blue focus:outline-none"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-body">HOA Fees (Monthly)</span>
              <input
                type="number"
                min={0}
                value={hoaMonthly}
                onChange={(event) => setHoaMonthly(parseInput(event.target.value))}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-brand-body focus:border-brand-blue focus:outline-none"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-body">PMI Rate (%)</span>
              <input
                type="number"
                min={0}
                step="0.01"
                value={pmiRate}
                onChange={(event) => setPmiRate(parseInput(event.target.value))}
                className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-brand-body focus:border-brand-blue focus:outline-none"
              />
            </label>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-xl text-brand-blue">Payment Breakdown</h3>
          <div className="mt-4 rounded-md border border-slate-200 bg-brand-offwhite p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-body">Estimated Total Monthly Payment</p>
            <p className="mt-2 font-heading text-4xl text-brand-blue">{formatCurrency(calculations.totalMonthly)}</p>
            <p className="mt-1 text-xs text-brand-body">Principal, interest, taxes, insurance, HOA, and PMI where applicable</p>
          </div>

          <dl className="mt-5 space-y-3 text-sm text-brand-body">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <dt>Loan Amount</dt>
              <dd className="font-semibold text-brand-blue">{formatCurrency(calculations.loanAmount)}</dd>
            </div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <dt>Down Payment</dt>
              <dd className="font-semibold text-brand-blue">{formatNumber(calculations.downPaymentPercent)}%</dd>
            </div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <dt>Principal + Interest</dt>
              <dd className="font-semibold text-brand-blue">{formatCurrency(calculations.monthlyPrincipalInterest)}</dd>
            </div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <dt>Property Tax</dt>
              <dd className="font-semibold text-brand-blue">{formatCurrency(calculations.monthlyPropertyTax)}</dd>
            </div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <dt>Home Insurance</dt>
              <dd className="font-semibold text-brand-blue">{formatCurrency(calculations.monthlyInsurance)}</dd>
            </div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <dt>HOA</dt>
              <dd className="font-semibold text-brand-blue">{formatCurrency(hoaMonthly)}</dd>
            </div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <dt>PMI</dt>
              <dd className="font-semibold text-brand-blue">{formatCurrency(calculations.monthlyPmi)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt>Total Interest (Life of Loan)</dt>
              <dd className="font-semibold text-brand-blue">{formatCurrency(calculations.totalInterest)}</dd>
            </div>
          </dl>

          <p className="mt-5 text-xs leading-relaxed text-brand-body">
            This is an estimate only and does not include lender-specific fees, closing costs, or underwriting criteria.
          </p>
        </div>
      </div>
    </div>
  );
}
