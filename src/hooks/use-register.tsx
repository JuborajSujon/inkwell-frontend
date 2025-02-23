import { onOpen, onClose } from "@/redux/features/register/registerSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

export const useRegister = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.register);

  return {
    isOpen,
    onOpen: () => dispatch(onOpen()),
    onClose: () => dispatch(onClose()),
  };
};
