import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteAPI, getAPI } from "../../../libs/api";

export default function TrimsList() {
  const [trims, setTrims] = useState([]);
  const [vehicles, setVehicles] = useState({});

  useEffect(() => {
    const fetchTrims = async () => {
      try {
        const data = await getAPI("trims");
        setTrims(data);
      } catch (error) {
        console.log("Failed to load trims data", error);
      }
    };

    const fetchVehicles = async () => {
      try {
        const data = await getAPI("vehicles");
        const vehicleMap = data.reduce((acc, vehicle) => {
          acc[vehicle.id] = vehicle.model;
          return acc;
        }, {});
        setVehicles(vehicleMap);
      } catch (error) {
        console.log("Failed to load vehicles data", error);
      }
    };

    fetchTrims();
    fetchVehicles();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Trim?")) {
      try {
        await deleteAPI("trims", id);
        alert("Trim deleted successfully");
        setTrims(trims.filter((trim) => trim.id !== id));
      } catch (error) {
        console.error("Error deleting Trim:", error);
        alert(error.response.data.msg);
      }
    }
  };

  return (
    <div className="container mx-auto p-1">
      <div className="flex justify-end mb-4">
        <Link
          to="add"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Add Data
        </Link>
      </div>
      <div className="overflow-x-auto bg-white p-4 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Trim List</h2>
        <div className="overflow-x-auto ">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  Model
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  Trims
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  Trims Detail
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  OTR
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  OTR Price
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  Warranty Image
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  Background Image
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  Brochure
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {trims.map((trim) => (
                <tr key={trim.id}>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {vehicles[trim.vehicleId] || "Unknown Model"}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">{trim.trim}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {trim.trimDetail}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">{trim.otr}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    {trim.otrPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <a
                      href={trim.urlWarrantyImg}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <a
                      href={trim.urlBackgroundImg}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <a
                      href={trim.urlBrochure}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap flex space-x-2">
                    <Link
                      to={`/admin-hyundai/trims/edit/${trim.id}`}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-900 transition-colors duration-300"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(trim.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-900 transition-colors duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
