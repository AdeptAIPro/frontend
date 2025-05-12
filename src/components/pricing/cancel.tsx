export default function Cancel() {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Payment Failed or Canceled</h1>
        <p className="text-gray-600 text-lg">
          Something went wrong or you canceled the payment. Please try again.
        </p>
      </div>
    );
  }
  