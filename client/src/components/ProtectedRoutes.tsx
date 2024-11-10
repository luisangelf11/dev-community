import React from "react";
import { Navigate } from "react-router-dom";
import { useStore } from "../context/useStore";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoutes({ children }: Props) {
  const { auth } = useStore();
  if (auth === null) return <Navigate to="/login" />;
  else return <>{children}</>;
}
