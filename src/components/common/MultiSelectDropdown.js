import { useState, useEffect, useRef } from "react";

export default function MultiSelectDropdown({
  formFieldName,
  options,
  onChange,
  prompt = "Select",
}) {
  const [isJsEnabled, setIsJsEnabled] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const optionsListRef = useRef(null);

  useEffect(() => {
    setIsJsEnabled(true);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

    setSelectedOptions(Array.from(selectedOptionSet));
    onChange(Array.from(selectedOptionSet));
  };

  const handleSelectAllClick = (e) => {
    e.preventDefault();
    const optionsInputs = optionsListRef.current.querySelectorAll("input");
    optionsInputs.forEach((input) => {
      input.checked = true;
    });
    setSelectedOptions([...options]);
    onChange([...options]);
  };

  const handleClearSelectionClick = (e) => {
    e.preventDefault();
    const optionsInputs = optionsListRef.current.querySelectorAll("input");
    optionsInputs.forEach((input) => {
      input.checked = false;
    });
    setSelectedOptions([]);
    onChange([]);
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <label className="relative" ref={dropdownRef}>
      <div className="cursor-pointer justify-between items-center inline-flex bg-bgsecondary md:max-w-80 min-w-60 w-full rounded px-3 py-2" onClick={toggleDropdown}>
        <div className="flex gap-1 flex-wrap">
          {prompt}
          {isJsEnabled && selectedOptions.length > 0 && (
            <span className="ml-1 text-primary">{`(${selectedOptions.length} selected)`}</span>
          )}
        </div>
        <span className="after:content-['▼'] after:text-xs after:ml-1 after:inline-flex after:items-center"></span>
      </div>

      {isOpen && (
        <div className="absolute z-50 bg-white border transition-opacity opacity-100 pointer-events-auto w-full max-h-60">
          <ul ref={optionsListRef}>
            {options.map((option, i) => (
              <li key={option}>
                <label className="flex whitespace-nowrap cursor-pointer px-3 py-[6px] transition-colors bg-opacity-5 hover:bg-[#975bec40] [&:has(input:checked)]:bg-[#975bec40] gap-1 items-center">
                  <input
                    type="checkbox"
                    name={formFieldName}
                    value={option}
                    className="cursor-pointer bg-black text-black accent-color-[#975bec]"
                    onChange={handleChange}
                  />
                  <span className="ml-1">{option}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </label>
  );
}
