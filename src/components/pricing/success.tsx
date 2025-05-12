export default function Success() {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 text-lg">
          Thank you for your purchase. We've emailed you a receipt and activated your plan.
        </p>
      </div>
    );
  }
  