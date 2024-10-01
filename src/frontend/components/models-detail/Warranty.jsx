import PropTypes from "prop-types";

function Warranty({ warranty }) {
  return (
    <div className="container mx-auto text-center py-8">
      <h3 className="font-bold mb-5 text-2xl">Warranty</h3>
      <div className="shadow-lg">
        <img
          src={warranty}
          alt="warranty Hyundai"
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>
    </div>
  );
}

Warranty.propTypes = {
  warranty: PropTypes.string.isRequired, // warranty harus berupa string
};
export default Warranty;
