"use client";

import { useState, useEffect, useRef } from "react";
import { Checkbox } from "../ui/checkbox";

export default function MultiSelectDropdown({
  formFieldName,
  options,
  onChange,
  prompt = "Select",
}) {
  const [isJsEnabled, setIsJsEnabled] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const optionsListRef = useRef(null);

  useEffect(() => {
    setIsJsEnabled(true);
  }, []);

  const handleChange = (e) => {
    const isChecked = e.target.checked;
    const option = e.target.value;

    const selectedOptionSet = new Set(selectedOptions);

    if (isChecked) {
      selectedOptionSet.add(option);
    } else {
      selectedOptionSet.delete(option);
    }

    const newSelectedOptions = Array.from(selectedOptionSet);

    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions);
  };

  const isSelectAllEnabled = selectedOptions.length < options.length;

  const handleSelectAllClick = (e) => {
    e.preventDefault();

    const optionsInputs = optionsListRef.current.querySelectorAll("input");
    optionsInputs.forEach((input) => {
      input.checked = true;
    });

    setSelectedOptions([...options]);
    onChange([...options]);
  };

  const isClearSelectionEnabled = selectedOptions.length > 0;

  const handleClearSelectionClick = (e) => {
    e.preventDefault();

    const optionsInputs = optionsListRef.current.querySelectorAll("input");
    optionsInputs.forEach((input) => {
      input.checked = false;
    });

    setSelectedOptions([]);
    onChange([]);
  };

  return (
    <label className="relative">
      <input type="checkbox" className="hidden peer" />

      <div className="cursor-pointer justify-between items-center inline-flex bg-bgsecondary md:max-w-80 min-w-60 w-full rounded px-3 py-2 after:content-['▼'] after:text-xs after:ml-1 after:inline-flex after:items-center peer-checked:after:-rotate-180 after:transition-transform">
        <div className="flex gap-1 flex-wrap">
          {/* {isJsEnabled && selectedOptions.length > 0 ? (
            selectedOptions.map((item) => <div key={item.id} className="">{item}</div>)
          ) : prompt} */}
          {prompt}
          {isJsEnabled && selectedOptions.length > 0 && (
            <span className="ml-1 text-primary">{`(${selectedOptions.length} selected)`}</span>
          )}

        </div>
      </div>


      <div className="absolute z-50 bg-white border transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto w-full max-h-60">
        {/* {isJsEnabled && (
          <ul>
            <li>
              <button
                onClick={handleSelectAllClick}
                disabled={!isSelectAllEnabled}
                className="w-full text-left px-2 py-1 text-blue-600 disabled:opacity-50"
              >
                {"Select All"}
              </button>
            </li>
            <li>
              <button
                onClick={handleClearSelectionClick}
                disabled={!isClearSelectionEnabled}
                className="w-full text-left px-2 py-1 text-blue-600 disabled:opacity-50"
              >
                {"Clear selection"}
              </button>
            </li>
          </ul>
        )} */}
        <ul ref={optionsListRef}>
          {options.map((option, i) => {
            return (
              <li key={option}>
                <label
                  className={`flex whitespace-nowrap cursor-pointer px-3 py-[6px] transition-colors bg-opacity-5 hover:bg-[#975bec40] [&:has(input:checked)]:bg-[#975bec40] gap-1 items-center`}
                >
                  <input
                    id='myCheckbox'
                    type="checkbox"
                    name={formFieldName}
                    value={option}
                    className="cursor-pointer bg-black text-black accent-color-[#975bec]"
                    onChange={handleChange}
                  />
                  <span className="ml-1">{option}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </label>
  );
}