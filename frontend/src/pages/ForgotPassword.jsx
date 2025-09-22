import React, { useState } from "react";



const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  c

  const handleSubmit = async (e) => {
    e.preventDefault();

  };

  return (
    <div className=" w-screen flex items-center text-black justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">Forgot Password</h2>

        {successMessage && <p className="text-green-600 text-sm text-center mb-3">{successMessage}</p>}
        {errorMessage && <p className="text-red-600 text-sm text-center mb-3">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-200 btn
              ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
