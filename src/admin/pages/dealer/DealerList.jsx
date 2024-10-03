import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteAPI, getAPI } from "../../../libs/api";

export default function DealerList() {
  const [dealers, setDealers] = useState([]);

  useEffect(() => {
    fetchDealers();
  }, []);

  const fetchDealers = async () => {
    try {
      const data = await getAPI("dealer");
      setDealers(data);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this data?")) {
      try {
        await deleteAPI("dealer", id);
        alert("Dealer deleted successfully");
        setDealers(dealers.filter((dealer) => dealer.id !== id));
      } catch (error) {
        console.error("Error deleting dealer:", error);
      }
    }
  };

  return (
    <div className="ps-10 mx-auto">
      <h2 className="text-2xl font-bold mb-4">Dealer List</h2>
      <div className="mb-4">
        <Link
          to="add"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Data
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-gray-200 shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="py-2 px-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="py-2 px-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="py-2 px-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                WhatsApp
              </th>
              <th className="py-2 px-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {dealers.map((dealer) => (
              <tr key={dealer.id}>
                <td className="py-2 px-3 border-b">{dealer.id}</td>
                <td className="py-2 px-3 border-b">{dealer.name}</td>
                <td className="py-2 px-3 border-b">{dealer.address}</td>
                <td className="py-2 px-3 border-b">{dealer.whatsapp}</td>
                <td className="py-2 px-3 border-b">
                  <Link
                    to={`edit/${dealer.id}`}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(dealer.id)}
                    className="text-red-500 hover:underline"
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
  );
}
