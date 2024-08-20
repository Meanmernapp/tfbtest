import React from "react";

const TextField = ({
  name,
  label,
  type = "text",
  required = false,
  register,
  errors,
  ...rest
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-base font-medium leading-6 mb-2"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        {...register(name, { required })}
        {...rest}
        className={`block w-full rounded-md px-3 py-2.5  ring-1 ring-[#6B7280] placeholder:text-gray-400 focus:ring-2 focus:ring-[#fff] sm:text-sm sm:leading-6 dark:bg-[#0F172A] bg-gray-300`}
      />
      {errors[name] && (
        <span className="text-rose-500">{errors[name].message}</span>
      )}
    </div>
  );
};

export default TextField;
