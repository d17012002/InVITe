import React from "react";
export async function getServerSideProps(context) {
  const { eventId } = context.query;

  // Pass the payment data as props to the page component
  return {
    props: {
      eventId,
    },
  };
}

export default function payment({ eventId }) {
  return (
    <div>
      payment {eventId}
      <h1 className="m-2 text-gray-700 font-bold text-4xl">
        In<span className="text-red-500">VIT</span>e✨
      </h1>
    </div>
  );
}
