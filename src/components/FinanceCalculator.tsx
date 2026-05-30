"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import {
  FINANCE_ESTIMATE_EVENT,
  type FinanceEstimateDetail,
} from "@/lib/site-data";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(Math.max(0, value));
}

function calculateMonthlyPayment(
  amountFinanced: number,
  annualRate: number,
  termMonths: number,
) {
  if (amountFinanced <= 0 || termMonths <= 0) return 0;
  if (annualRate <= 0) return amountFinanced / termMonths;

  const monthlyRate = annualRate / 100 / 12;
  const denominator = 1 - Math.pow(1 + monthlyRate, -termMonths);
  if (denominator <= 0) return 0;

  return (amountFinanced * monthlyRate) / denominator;
}

const TERM_OPTIONS = [24, 36, 48, 60, 72, 84] as const;

type FinanceCalculatorProps = {
  defaultVehiclePrice?: number;
};

export default function FinanceCalculator({
  defaultVehiclePrice = 30000,
}: FinanceCalculatorProps) {
  const [vehiclePrice, setVehiclePrice] = useState(defaultVehiclePrice);
  const [downPayment, setDownPayment] = useState(3000);
  const [interestRate, setInterestRate] = useState(10);
  const [termMonths, setTermMonths] = useState(60);
  const [selectedVehicleName, setSelectedVehicleName] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const handler = (event: Event) => {
      const custom = event as CustomEvent<FinanceEstimateDetail>;
      const detail = custom.detail;
      if (!detail) return;

      setVehiclePrice(detail.vehiclePrice);
      setDownPayment(
        Math.min(Math.max(0, detail.downPayment), detail.vehiclePrice),
      );
      setInterestRate(detail.interestRate);
      setTermMonths(detail.termMonths);
      setSelectedVehicleName(detail.vehicleName);
    };

    window.addEventListener(FINANCE_ESTIMATE_EVENT, handler);
    return () => window.removeEventListener(FINANCE_ESTIMATE_EVENT, handler);
  }, []);

  const safeVehiclePrice = Math.max(0, vehiclePrice);
  const safeDownPayment = Math.min(
    Math.max(0, downPayment),
    safeVehiclePrice,
  );

  const results = useMemo(() => {
    const amountFinanced = Math.max(safeVehiclePrice - safeDownPayment, 0);
    const monthlyPayment = calculateMonthlyPayment(
      amountFinanced,
      interestRate,
      termMonths,
    );

    return { amountFinanced, monthlyPayment };
  }, [safeVehiclePrice, safeDownPayment, interestRate, termMonths]);

  const sliderPercent =
    safeVehiclePrice > 0 ? (safeDownPayment / safeVehiclePrice) * 100 : 0;

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-black/50 py-3 pl-8 pr-4 text-white outline-none transition focus:border-[#d4af37]/60 focus:ring-1 focus:ring-[#d4af37]/30";

  const handleVehiclePriceChange = (raw: string) => {
    const next = Math.max(0, Number(raw) || 0);
    setVehiclePrice(next);
    setDownPayment((prev) => Math.min(prev, next));
    setSelectedVehicleName(null);
  };

  const handleDownPaymentChange = (raw: string) => {
    const next = Math.max(0, Number(raw) || 0);
    setDownPayment(Math.min(next, safeVehiclePrice));
  };

  const handleDownPaymentSlider = (raw: string) => {
    setDownPayment(Math.min(Number(raw), safeVehiclePrice));
  };

  const handleInterestRateChange = (raw: string) => {
    if (raw === "") {
      setInterestRate(0);
      return;
    }
    const next = Number(raw);
    if (!Number.isNaN(next) && next >= 0) {
      setInterestRate(next);
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-8">
      {selectedVehicleName && (
        <p className="mb-5 rounded-xl border border-[#d4af37]/25 bg-[#d4af37]/10 px-4 py-3 text-sm font-semibold text-[#e6c35c]">
          Estimate for: {selectedVehicleName}
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <div>
            <label
              htmlFor="vehicle-price"
              className="mb-2 block text-sm font-medium text-white/70"
            >
              Vehicle Price
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d4af37]/70">
                $
              </span>
              <input
                id="vehicle-price"
                type="number"
                min={0}
                step={500}
                value={vehiclePrice}
                onChange={(e) => handleVehiclePriceChange(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label
                htmlFor="down-payment"
                className="text-sm font-medium text-white/70"
              >
                Down Payment
              </label>
              <span className="text-sm font-semibold text-[#d4af37]">
                {formatCurrency(safeDownPayment)}
              </span>
            </div>

            <div className="relative mb-3">
              <input
                type="range"
                min={0}
                max={safeVehiclePrice || 0}
                step={500}
                value={safeDownPayment}
                onChange={(e) => handleDownPaymentSlider(e.target.value)}
                disabled={safeVehiclePrice <= 0}
                className="finance-slider w-full"
                style={
                  { "--slider-percent": `${sliderPercent}%` } as CSSProperties
                }
              />
            </div>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d4af37]/70">
                $
              </span>
              <input
                id="down-payment"
                type="number"
                min={0}
                max={safeVehiclePrice}
                step={500}
                value={safeDownPayment}
                onChange={(e) => handleDownPaymentChange(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="interest-rate"
              className="mb-2 block text-sm font-medium text-white/70"
            >
              Interest Rate
            </label>
            <div className="relative">
              <input
                id="interest-rate"
                type="number"
                min={0}
                step={0.01}
                value={interestRate}
                onChange={(e) => handleInterestRateChange(e.target.value)}
                className={`${inputClass} pr-10`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#d4af37]/70">
                %
              </span>
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-white/70">Term</p>
            <div className="flex flex-wrap gap-2">
              {TERM_OPTIONS.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setTermMonths(term)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    termMonths === term
                      ? "bg-[#d4af37] text-black"
                      : "border border-white/15 text-white/70 hover:border-[#d4af37]/50 hover:text-[#d4af37]"
                  }`}
                >
                  {term} mo
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-[#d4af37]/25 bg-gradient-to-br from-[#d4af37]/10 via-transparent to-blue-950/40 p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
              Estimated Monthly Payment
            </p>
            <p className="mt-4 text-5xl font-black tracking-tight text-white">
              {formatCurrency(results.monthlyPayment)}
              <span className="text-lg font-medium text-white/45"> /mo</span>
            </p>

            <dl className="mt-6 space-y-2.5 border-t border-white/10 pt-5 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-white/50">Vehicle Price</dt>
                <dd className="font-semibold text-white">
                  {formatCurrency(safeVehiclePrice)}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-white/50">Down Payment</dt>
                <dd className="font-semibold text-white">
                  {formatCurrency(safeDownPayment)}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-white/50">Amount Financed</dt>
                <dd className="font-semibold text-[#d4af37]">
                  {formatCurrency(results.amountFinanced)}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-white/50">Interest Rate</dt>
                <dd className="font-semibold text-white">{interestRate}%</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-white/50">Term</dt>
                <dd className="font-semibold text-white">{termMonths} months</dd>
              </div>
            </dl>
          </div>

          <p className="mt-6 border-t border-white/10 pt-5 text-xs leading-5 text-white/40">
            Estimates only. Actual rates and payments depend on credit approval,
            lender terms, taxes, fees, and vehicle condition.
          </p>
        </div>
      </div>
    </div>
  );
}
