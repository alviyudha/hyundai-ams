import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function CardImg({ models, loading }) {
  const navigate = useNavigate();

  const handleImageClick = (vehicle) => {
    navigate(`/models/${vehicle.Link}`, {
      state: { id: vehicle.uuid, trimId: vehicle.trimId },
    });
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex w-52 flex-col gap-4 items-center justify-center">
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {models.map((vehicle, index) => (
        <div
          key={index}
          className="hover:shadow-lg hover:shadow-hyundai transition-all duration-700 text-center"
        >
          <div onClick={() => handleImageClick(vehicle)}>
            <img
              src={vehicle.urlImgView || "https://placehold.co/600x400"}
              alt="Description"
              width={500}
              height={300}
            />
            <h3 className="uppercase text-hyundai font-semibold">
              {vehicle.model}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}

CardImg.propTypes = {
  type: PropTypes.string.isRequired,
  models: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      Link: PropTypes.string.isRequired,
      urlImgView: PropTypes.string,
      model: PropTypes.string.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CardImg;
