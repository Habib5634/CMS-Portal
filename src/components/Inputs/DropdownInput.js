import React from 'react';

const DropdownInput = ({ label, id, name, value, onChange, options, icon: Icon, className }) => {
  return (
    <div className='flex w-1/2 flex-col  '>
      <label className="text-emerald-500 font-medium">
        {label}<span className='text-red-500'>*</span>
      </label>
      <div className="flex items-center border mb-2 border-gray-500">
        {Icon && <Icon className="text-white w-8 h-8 p-0.5 bg-emerald-500" />}
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full p-1  text-emerald-500 outline-none bg-transparent ${className}`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DropdownInput;
