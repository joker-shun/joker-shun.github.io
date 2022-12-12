import React, { FC, useCallback } from "react";
import { Layout } from "@fineui/react";

interface Props {
  jumpElementId: string;
  title: string;
}
const layoutProps = {
  style: {
    position: "fixed",
    right: 0,
    top: 300,
    width: 24,
    height: 100,
    color: "gray",
    padding: "12px 0px 12px 5px",
    cursor: "pointer",
    zIndex: 20,
    backgroundColor: "#fff",
    borderRadius: "12px 0px 0px 12px",
  },
};
const CNodeJumper: FC<Props> = ({ jumpElementId, title }) => {
  const jumpTop = useCallback(() => {
    document
      .getElementById(jumpElementId)
      .scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <Layout onClick={jumpTop} {...layoutProps}>
      <span>{title}</span>
    </Layout>
  );
};

export default CNodeJumper;
