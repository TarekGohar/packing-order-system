interface OrderProps {
  params: {
    orderId: string;
  };
  searchParams: {
    edit: string;
  };
}

export default async function page({ params, searchParams }: OrderProps) {
  return (
    <div>
      {params.orderId} {"edit" in searchParams ? "edit" : "view"}
    </div>
  );
}
