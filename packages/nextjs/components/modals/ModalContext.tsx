"use client";

import React from "react";

type ModalType = {
  method: "createCohort" | "createCurriculum" | "showCurriculum" | undefined;
  data?: `0x${string}`;
};

export type ModalContextType = {
  setModal: React.Dispatch<React.SetStateAction<ModalType>>;
  openModal: () => any;
  modal: ModalType;
};

export const ModalContext = React.createContext<ModalContextType | null>(null);
export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = React.useState<ModalType>({ method: undefined });
  const openModal = () => {
    // @ts-ignore
    document.getElementById("modal")?.showModal();
  };
  return (
    <ModalContext.Provider
      value={{
        setModal,
        openModal,
        modal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
