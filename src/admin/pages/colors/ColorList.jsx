import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteAPI, getAPI } from "../../../libs/api";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function ColorList() {
  const [colors, setColors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const data = await getAPI("colormodel");
        setColors(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };

    fetchColors();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      try {
        await deleteAPI("color", id);
        setColors(colors.filter((color) => color.id !== id));
      } catch (error) {
        console.error("Error deleting color:", error);
      }
    }
  };

  const indexOfLastColor = currentPage * itemsPerPage;
  const indexOfFirstColor = indexOfLastColor - itemsPerPage;
  const currentColors = colors
    .sort((a, b) => b.id - a.id)
    .slice(indexOfFirstColor, indexOfLastColor);

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="ps-10">
      <div className="flex justify-end mb-4">
        <Link
          to="add"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Add Data
        </Link>
      </div>
      <div className="overflow-x-auto bg-white p-4 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Color List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 border-b">Image</th>
                <th className="py-2 border-b">Background Color</th>
                <th className="py-2 border-b">Description</th>
                <th className="py-2 border-b">Vehicle ID</th>
                <th className="py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentColors.map((color) => (
                <tr key={color.id}>
                  <td className="py-2 border-b text-center">
                    <img
                      src={color.urlcolorsImage}
                      alt={color.descColor}
                      className="w-16 h-16 object-cover mx-auto"
                    />
                  </td>
                  <td className="py-2 border-b text-center">
                    {color.backgroundColor}
                  </td>
                  <td className="py-2 border-b text-center">
                    {color.descColor}
                  </td>
                  <td className="py-2 border-b text-center">{color.model}</td>
                  <td className="py-2 border-b text-center">
                    <Link
                      to={`/admin-hyundai/colors/edit/${color.id}`}
                      className="text-blue-500 mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(color.id)}
                      className="text-red-500"
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
      <div className="flex justify-center items-center mt-4 space-x-4">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
          className="bg-blue-600 text-white px-2 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
        >
          <FaArrowLeft />
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages}
          className="bg-blue-600 text-white px-2 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
