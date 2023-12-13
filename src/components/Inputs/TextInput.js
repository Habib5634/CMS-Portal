import React from 'react';

const TextInput = ({ label, id, name, value, onChange, icon: Icon , divClass,type,placeholder}) => {
  return (
    <div className={`  ${divClass} flex  flex-col  `}>
    <label className="text-emerald-500 font-medium">
      {label}<span className='text-red-500'>*</span>
    </label>
    <div className="flex items-center border mb-2 border-gray-500">
      {Icon && <Icon className="text-white p-0.5 w-8 h-8 bg-emerald-500" />}
      <input
      type={type}
      id={id}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full p-1 ml-3 text-emerald-500 outline-none bg-transparent `}
    />
    </div>
  </div>
  );
};

export default TextInput;