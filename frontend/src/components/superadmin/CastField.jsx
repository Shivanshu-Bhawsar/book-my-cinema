import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../../redux/reducer/movieSlice";
import { toast } from "react-hot-toast";

const CastField = ({ name, label, editCrew, disabled }) => {
  const dispatch = useDispatch();
  const { movie } = useSelector((state) => state.movie);
  const [castName, setCastName] = useState("");
  const [profession, setProfession] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  const handleAddRequirement = () => {
    if (castName && profession) {
      const newEntry = { name: castName, profession };
      const updatedList = [...requirementList, newEntry];
      setRequirementList(updatedList);
      setCastName("");
      setProfession("");
      dispatch(setFormData({ name, value: updatedList }));
    } else {
      toast.error("Both fields are required");
    }
  };

  const handleRemoveRequirement = (index) => {
    const updatedRequirementList = [...requirementList];
    updatedRequirementList.splice(index, 1);
    setRequirementList(updatedRequirementList);
    dispatch(setFormData({ name, value: updatedRequirementList }));
  };

  useEffect(() => {
    if (editCrew) {
      setRequirementList(movie?.crew || []);
    }
  }, [editCrew, movie]);

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex flex-col sm:flex-row gap-0 sm:gap-5">
        <input
          type="text"
          id={`${name}-name`}
          value={castName}
          disabled={disabled}
          onChange={(e) => setCastName(e.target.value)}
          placeholder="Enter name"
          className="w-full mt-2 p-2 text-sm text-gray-700 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          id={`${name}-profession`}
          value={profession}
          disabled={disabled}
          onChange={(e) => setProfession(e.target.value)}
          placeholder="Enter profession"
          className="w-full mt-2 p-2 text-sm text-gray-700 border border-gray-300 rounded-lg"
        />
      </div>
      <button
        type="button"
        disabled={disabled}
        onClick={handleAddRequirement}
        className="w-fit font-semibold text-rose-500 mt-3 ml-1 flex items-start"
      >
        Add
      </button>

      {requirementList.length > 0 && (
        <ul className="mt-2 list-inside list-disc">
          {requirementList.map((requirement, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <span>
                {requirement.name} - {requirement.profession}
              </span>
              <button
                type="button"
                disabled={disabled}
                onClick={() => handleRemoveRequirement(index)}
                className="mt-1 ml-3 text-xs font-medium text-red-500"
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CastField;
