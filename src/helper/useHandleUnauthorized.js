import { useRouter } from "next/navigation";
import { useAppContext } from "@/context";
import { logoutHandler } from ".";

const useHandleUnauthorized = () => {
  const router = useRouter();
  const { setUnAuthorixedPerson } = useAppContext();
  setUnAuthorixedPerson(true);
  logoutHandler();
  router.push(`/login`);
};

export default useHandleUnauthorized;
