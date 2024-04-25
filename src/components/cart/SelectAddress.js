import React from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const SelectAddress = () => {
  return (
    <div>
      <RadioGroup defaultValue="option-one">
        {[1, 1, 1].map((item, i) => {
          return (
            <div className="flex items-center space-x-2">
              <Label htmlFor={`option${i}`} className='border p-2 flex gap-2'>
                <RadioGroupItem value={`option${i}`} id={`option${i}`} />
                <div>
                  <div>Biren Bhalodiya</div>
                  <div>Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016</div>
                  <div></div>
                </div>
              </Label>
            </div>
          )
        })}
      </RadioGroup>
    </div>
  )
}

export default SelectAddress