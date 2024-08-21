import React from "react";

interface POProps {
  params: {
    orderId: string;
  };
}

export default function ViewPackingOrderPage({ params }: POProps) {
  return <div>{params.orderId}</div>;
}
