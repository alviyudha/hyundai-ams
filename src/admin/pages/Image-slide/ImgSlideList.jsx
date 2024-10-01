import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteAPI, getAPI } from "../../../libs/api";
export default function ImgSlideList() {
  const [imgslide, setImgSlide] = useState([]);

  useEffect(() => {
    const fetchimgslide = async () => {
      try {
        const data = await getAPI("imgslide");
        setImgSlide(data);
      } catch (error) {
        console.error("Error fetching imgslide:", error);
      }
    };

    fetchimgslide();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this data?")) {
      try {
        await deleteAPI("imgslide", id);
        setImgSlide(imgslide.filter((color) => color.id !== id));
      } catch (error) {
        console.error("Error deleting Data:", error);
      }
    }
  };
  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Image Slide Home</h2>
      <div className="mb-4">
        <Link
          to="add"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Data
        </Link>
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-6xl">
          <h2 className="text-2xl font-bold mb-6">Image Slide Home List</h2>
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 border-b text-center">Image Slide</th>
              </tr>
            </thead>
            <tbody>
              {imgslide.map((imgslides) => (
                <tr key={imgslides.id}>
                  <td className="py-2 border-b text-center">
                    <img
                      src={imgslides.urlImage}
                      alt={imgslides.image}
                      className="w-auto h-16 object-cover mx-auto"
                    />
                  </td>
                  <td className="py-2 border-b text-center">
                    <Link
                      to={`/admin-hyundai/image-slide/edit/${imgslides.id}`}
                      className="text-blue-500 mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(imgslides.id)}
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
    </div>
  );
}
