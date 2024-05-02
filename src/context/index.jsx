"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const appContext = createContext(0);

export function AppWrapper({ children }) {
  const router = useRouter();
  let [cartLength, setCartLength] = useState(0);
  let [deliveryAddress, setDeliveryAddress] = useState({});
  let [unauthorizedPerson, setUnAuthorixedPerson] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (unauthorizedPerson) {
      setOpen(true);
    }
  }, [unauthorizedPerson]);

  const loginHandler = () => {
    setOpen(false);
    router.push("/login");
  };
  return (
    <appContext.Provider
      value={{
        cartLength,
        setCartLength,
        setDeliveryAddress,
        deliveryAddress,
        unauthorizedPerson,
        setUnAuthorixedPerson,
      }}
    >
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unauthorized access</DialogTitle>
            <div className="flex flex-col gap-7 !mt-5">
              <div className="text-lg">
                Unauthorized access detected! Please log in to continue
                shopping.
              </div>
              <div className="flex justify-end gap-2">
                <Button size="sm" onClick={() => loginHandler()}>
                  Login
                </Button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </appContext.Provider>
  );
}

export function useAppContext() {
  return useContext(appContext);
}
