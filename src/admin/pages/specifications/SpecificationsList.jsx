import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteAPI, getAPI } from "../../../libs/api";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Importing arrow icons

export default function SpecificationList() {
  const [specifications, setSpecifications] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchSpecifications = async () => {
      try {
        const data = await getAPI("modeldetail");
        setSpecifications(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      } catch (error) {
        console.error("Error fetching specifications:", error);
        setError("Failed to fetch specifications.");
      }
    };
    fetchSpecifications();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this specification?"
    );

    if (confirmed) {
      try {
        await deleteAPI("specification", id);
        setSpecifications(specifications.filter((spec) => spec.idSpek !== id));
      } catch (error) {
        console.error("Error deleting specification:", error);
        setError("Failed to delete specification.");
      }
    }
  };

  const indexOfLastSpec = currentPage * itemsPerPage;
  const indexOfFirstSpec = indexOfLastSpec - itemsPerPage;

  const currentSpecs = specifications
    .sort((a, b) => b.idSpek - a.idSpek)
    .slice(indexOfFirstSpec, indexOfLastSpec);

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (error) {
    return <p className="text-red-600 text-center mt-4">{error}</p>;
  }

  return (
    <div className="ps-10 mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Specification List</h2>
        <Link
          to="add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
        >
          Add Specification
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
          <thead className="bg-blue-100">
            <tr>
              {[
                "NO",
                "Cars",
                "Head Title 1",
                "Text 1",
                "Head Title 2",
                "Text 2",
                "Head Title 3",
                "Text 3",
                "Head Title 4",
                "Text 4",
                "Head Title 5",
                "Text 5",
                "Image View",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-2 py-2 text-left text-gray-700 font-medium text-sm uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentSpecs.length > 0 ? (
              currentSpecs.map((specification) => (
                <tr
                  key={specification.idSpek}
                  className="hover:bg-gray-100 transition-all"
                >
                  <td className="border px-2 py-2 text-gray-600 text-center">
                    {specification.idSpek}
                  </td>
                  <td className="border px-2 py-2 text-gray-600 whitespace-nowrap">
                    {`${specification.model} - ${specification.trim} (${specification.year})`}
                  </td>
                  <td className="border px-2 py-2 font-semibold text-gray-800">
                    {specification.headTitle1}
                  </td>
                  <td className="border px-2 py-2 text-gray-600 whitespace-nowrap">
                    {specification.text1}
                  </td>
                  <td className="border px-2 py-2 font-semibold text-gray-800">
                    {specification.headTitle2}
                  </td>
                  <td className="border px-2 py-2 text-gray-600 whitespace-nowrap">
                    {specification.text2}
                  </td>
                  <td className="border px-2 py-2 font-semibold text-gray-800">
                    {specification.headTitle3}
                  </td>
                  <td className="border px-2 py-2 text-gray-600 whitespace-nowrap">
                    {specification.text3}
                  </td>
                  <td className="border px-2 py-2 font-semibold text-gray-800">
                    {specification.headTitle4}
                  </td>
                  <td className="border px-2 py-2 text-gray-600 whitespace-nowrap">
                    {specification.text4}
                  </td>
                  <td className="border px-2 py-2 font-semibold text-gray-800">
                    {specification.headTitle5}
                  </td>
                  <td className="border px-2 py-2 text-gray-600 whitespace-nowrap">
                    {specification.text5}
                  </td>
                  <td className="border px-2 py-2 text-center">
                    <img
                      src={specification.urlImgView}
                      alt={specification.imgView}
                      className="h-16 w-auto rounded-md shadow-md"
                    />
                  </td>
                  <td className="border px-2 py-2">
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/admin-hyundai/specifications/edit/${specification.idSpek}`}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(specification.idSpek)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="14"
                  className="text-center py-4 text-gray-500 font-medium"
                >
                  No specifications available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
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
