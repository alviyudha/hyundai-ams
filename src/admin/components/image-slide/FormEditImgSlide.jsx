import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAPI, updateAPI } from "../../../libs/api";

export default function FormEditImgSlide() {
  const [imageslide, setImageSlide] = useState(null);
  const [backgroundImg, setBackgroundImg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchImageSlide = async () => {
      try {
        const data = await getAPI(`imgslide/${id}`);
        setImageSlide(data);
        setBackgroundImg(data.urlImage);
      } catch (error) {
        console.error("Error fetching imgslide:", error);
        setErrorMsg("Failed to fetch image slide.");
      }
    };

    fetchImageSlide();
  }, [id]);

  const handleFileChange = (e) => {
    setImageSlide(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", imageslide);

    try {
      await updateAPI("imgslide", id, formData);
      console.log("Image slide updated successfully");
      navigate("/admin-hyundai/image-slide");
    } catch (error) {
      console.error("Error updating image slide:", error);
      if (error.response && error.response.data && error.response.data.msg) {
        setErrorMsg(error.response.data.msg);
      } else {
        setErrorMsg("An error occurred while updating the image slide.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">Edit Image Slide</h2>
        {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="image">
              Image Slide Home
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
            {backgroundImg && (
              <div className="mt-2">
                <img
                  src={backgroundImg}
                  alt="Background"
                  className="w-full h-48 object-cover rounded"
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Update Image
          </button>
        </form>
      </div>
    </div>
  );
}
