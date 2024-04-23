import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function UpdateLocation() {
  return (
    <div className="text-center">
      <Dialog>
        <DialogTrigger>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>Delivery Pincode :- 362011</TooltipTrigger>
              <TooltipContent>
                <p>Click to change Pincode</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose your location</DialogTitle>
            <div className="flex flex-col gap-7 !mt-5">
              <div>
                <Label htmlFor="" className="h-4 inline">
                  Enter an Indian pincode
                </Label>
                <div className="relative">
                  <Input placeholder="" className="w-full" />
                  <Search className="absolute top-[10px] right-3 w-5 h-5" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button size="sm">Update</Button>
                <Button size="sm" variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UpdateLocation;
