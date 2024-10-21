import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Register",
  description: "Cohort registration page",
});

const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default RegisterLayout;
