import { onOpen, onClose } from "@/redux/features/login/loginSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.login);

  return {
    isOpen,
    onOpen: () => dispatch(onOpen()),
    onClose: () => dispatch(onClose()),
  };
};
