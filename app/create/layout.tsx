import React, { ReactNode } from "react";

const LayoutCreate = ({ children }: { children: ReactNode }) => {
  return <div className="mt-10">{children}</div>;
};

export default LayoutCreate;
