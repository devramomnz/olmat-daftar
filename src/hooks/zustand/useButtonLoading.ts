import { create } from "zustand";

interface IOrderFilter {
  isButtonLoading: boolean;
}

const buttonLoading = create<IOrderFilter>(() => ({
  isButtonLoading: false,
}));

export const useButtonLoading = () => {
  const isButtonLoading = buttonLoading((e) => e.isButtonLoading);

  function setIsButtonLoading(setOrderFilter: boolean) {
    buttonLoading.setState({
      isButtonLoading: setOrderFilter,
    });
  }

  return { isButtonLoading, setIsButtonLoading };
};
