import React, { useState, useMemo } from "react";
const billingOptions = [
  {
    type: "monthly",
    label: "Monthly Billing",
  },
  {
    type: "yearly",
    label: "Yearly Billing",
    savingsPercentage: 20, // Example savings percentage
  },
];

const Policy = () => {
  const [selectedOption, setSelectedOption] = useState("monthly");

  const handleOptionChange = (option) => {
    setSelectedOption(option.type);
  };

  const billingOptions = useMemo(
    () => [
      {
        type: "monthly",
        label: "Monthly Billing",
      },
      {
        type: "yearly",
        label: "Yearly Billing",
        savingsPercentage: 20, // Example savings percentage
      },
    ],
    []
  );

  const selectedBillingOption = billingOptions.find(
    (option) => option.type === selectedOption
  );

  const savingsPercentage = useMemo(() => {
    if (selectedBillingOption && selectedBillingOption.type === "yearly") {
      return selectedBillingOption.savingsPercentage || 0;
    }
    return 0;
  }, [selectedBillingOption]);

  return (
    <div className="sm:flex sm:flex-col sm:align-center p-10">
      <div className="relative self-center bg-slate-200 rounded-lg p-0.5 flex">
        {billingOptions.map((option) => (
          <button
            key={option.type}
            type="button"
            className={`relative w-1/2 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8 ${
              selectedOption === option.type
                ? "bg-slate-50 border-slate-50 text-slate-900"
                : "border-transparent text-slate-900"
            }`}
            onClick={() => handleOptionChange(option)}
          >
            {option.label}
            {option.type === "yearly" && (
              <span> - Save {savingsPercentage}%</span>
            )}
          </button>
        ))}
      </div>
      <div class="mt-12 space-y-3 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 md:max-w-5xl md:mx-auto xl:grid-cols-3">
        <div class="border border-slate-200 rounded-lg shadow-sm divide-y divide-slate-200">
          <div class="p-6">
            <h2 class="text-xl leading-6 font-bold text-slate-900">Starter</h2>
            <p class="mt-2 text-base text-slate-700 leading-tight">
              For new makers who want to fine-tune and test an idea.
            </p>
            <p class="mt-8">
              <span class="text-4xl font-bold text-slate-900 tracking-tighter">
                $0
              </span>

              <span class="text-base font-medium text-slate-500">/mo</span>
            </p>
            <a
              href="/sign-up"
              class="mt-8 block w-full bg-slate-900 rounded-md py-2 text-sm font-semibold text-white text-center"
            >
              Join as a Starter
            </a>
          </div>
          <div class="pt-6 pb-8 px-6">
            <h3 class="text-sm font-bold text-slate-900 tracking-wide uppercase">
              What's included
            </h3>
            <ul role="list" class="mt-4 space-y-3">
              <li class="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 h-5 w-5 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span class="text-base text-slate-700">
                  1 landing page included
                </span>
              </li>
              <li class="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 h-5 w-5 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span class="text-base text-slate-700">1,000 visits/mo</span>
              </li>
              <li class="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 h-5 w-5 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span class="text-base text-slate-700">
                  Access to all UI blocks
                </span>
              </li>
              <li class="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 h-5 w-5 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span class="text-base text-slate-700">
                  50 conversion actions included
                </span>
              </li>
              <li class="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 h-5 w-5 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span class="text-base text-slate-700">
                  5% payment commission
                </span>
              </li>
              <li class="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 h-5 w-5 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span class="text-base text-slate-700">
                  Real-time analytics
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div class="border border-slate-200 rounded-lg shadow-sm divide-y divide-slate-200">
          <div class="p-6">
            <h2 class="text-xl leading-6 font-bold text-slate-900">Superior</h2>
            <p class="mt-2 text-base text-slate-700 leading-tight">
              For creators with multiple ideas who want to efficiently test and
              refine them.
            </p>
            <p class="mt-8">
              <span class="text-4xl font-bold text-slate-900 tracking-tighter">
                $8
              </span>

              <span class="text-base font-medium text-slate-500">/mo</span>
            </p>
            <a
              href="/sign-up"
              class="mt-8 block w-full bg-slate-900 rounded-md py-2 text-sm font-semibold text-white text-center"
            >
              Join as a Superior
            </a>
          </div>
          <div class="pt-6 pb-8 px-6">
            <h3 class="text-sm font-bold text-slate-900 tracking-wide uppercase">
              What's included
            </h3>
            <ul role="list" class="mt-4 space-y-3">
              <li class="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 h-5 w-5 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span class="text-base text-slate-700">All Free features</span>
              </li>
              <li class="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 h-5 w-5 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span class="text-base text-slate-700">
                  5 landing pages included
                </span>
              </li>
              <li class="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 h-5 w-5 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span class="text-base text-slate-700">50,000 visits/mo</span>
              </li>
              <li class="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 h-5 w-5 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span class="text-base text-slate-700">
                  1,000 conversion actions included
                </span>
              </li>
              <li class="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 h-5 w-5 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span class="text-base text-slate-700">
                  1% payment commission
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div class="border border-slate-200 rounded-lg shadow-sm divide-y divide-slate-200">
          <div class="p-6">
            <h2 class="text-xl leading-6 font-bold text-slate-900">Shipper</h2>
            <p class="mt-2 text-base text-slate-700 leading-tight">
              For productive shippers who want to work more efficiently.
            </p>
            <p class="mt-8">
              <span class="text-4xl font-bold text-slate-900 tracking-tighter">
                $15
              </span>

              <span class="text-base font-medium text-slate-500">/mo</span>
            </p>
            <a
              href="/sign-up"
              class="mt-8 block w-full bg-slate-900 rounded-md py-2 text-sm font-semibold text-white text-center"
            >
              Join as a Shipper
            </a>
          </div>
          <div class="pt-6 pb-8 px-6">
            <h3 class="text-sm font-bold text-slate-900 tracking-wide uppercase">
              What's included
            </h3>
            <ul role="list" class="mt-4 space-y-3">
              <li class="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 h-5 w-5 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span class="text-base text-slate-700">
                  All Standard features
                </span>
              </li>
              <li class="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 h-5 w-5 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span class="text-base text-slate-700">
                  20 landing pages included
                </span>
              </li>
              <li class="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 h-5 w-5 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span class="text-base text-slate-700">200,000 visits/mo</span>
              </li>
              <li class="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 h-5 w-5 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span class="text-base text-slate-700">
                  5,000 conversion actions included
                </span>
              </li>
              <li class="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="flex-shrink-0 h-5 w-5 text-green-400"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
                <span class="text-base text-slate-700">
                  No payment commission
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
