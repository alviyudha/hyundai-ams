import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postAPI } from "../../../libs/api";

export default function FormAddVehicles() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    model: "",
    year: "",
    type: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postAPI("vehicles", formData, {
        "Content-Type": "application/json",
      });

      alert("Vehicle added successfully");
      navigate("/admin-hyundai/vehicles");
    } catch (error) {
      setErrorMsg(error.response.data?.msg || "Error adding vehicle");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">Add Vehicle</h2>
        <form onSubmit={handleSubmit}>
          {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="model">
              Model
            </label>
            <input
              type="text"
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="year">
              Year
            </label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="type">
              Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="">Select Type</option>
              <option value="EV">EV</option>
              <option value="SUV">SUV</option>
              <option value="MPV">MPV</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Add Vehicle
          </button>
        </form>
      </div>
    </div>
  );
}
