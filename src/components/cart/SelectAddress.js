import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const SelectAddress = ({ shippingAddress,selectAddressHandler,selectedShippingAdd }) => {
  console.log("shippingAddress", shippingAddress);
  console.log("selectedShippingAdd", selectedShippingAdd);
  return (
    <div>
      <RadioGroup chec={selectedShippingAdd} onValueChange={(event)=>selectAddressHandler(event)} className="grid sm:grid-cols-2">
        {shippingAddress && shippingAddress.length > 0 ? (
          shippingAddress.map((response, index) => {
            const {
              addLet,
              addLong,
              address1,
              address2,
              city,
              fullName,
              id,
              isBillingAddress,
              landmark,
              phoneNo,
              pincode,
              state,
              status,
              userId,
            } = response;
            return (
              <div className="items-center space-x-2 cursor-pointer">
                <Label
                  htmlFor={`option${index}`}
                  className="border px-2 py-3 flex gap-2 rounded-none"
                >
                  <RadioGroupItem
                    value={id}
                    checked={selectedShippingAdd === id}
                    id={`option${index}`}
                    className="radio_button"
                  />
                  <div className="grid gap-1">
                    <div className="text-lg font-semibold leading-none mb-1">
                      {fullName}
                    </div>
                    <div className="text-[#444] leading-tight">
                      {`${address1}, ${address2},${city} ${state}-${pincode}`}
                    </div>
                    <div className="mt-1 text-[#444]">{phoneNo}</div>
                  </div>
                </Label>
              </div>
            );
          })
        ) : (
          <div className="text-[#5D5F5F] text-center">No Address Found</div>
        )}
      </RadioGroup>
    </div>
  );
};

export default SelectAddress;
