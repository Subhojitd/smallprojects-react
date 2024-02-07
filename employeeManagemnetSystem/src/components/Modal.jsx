import React, { useState } from "react";

function Modal({ onClose, onAddEmployee }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    contactNumber: "",
    dob: "",
    salary: "",
    address: "",
    imageUrl: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    // Convert the image file to a data URL
    const reader = new FileReader();
    reader.onload = () => {
      setFormData({ ...formData, imageUrl: reader.result });
    };
    reader.readAsDataURL(file);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.age ||
      !formData.email ||
      !formData.contactNumber ||
      !formData.dob ||
      !formData.salary ||
      !formData.address ||
      !formData.imageUrl
    ) {
      alert("Please fill in all the required fields.");
      return;
    }
    onAddEmployee({ ...formData, imageFile });
    onClose();
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-4 pt-5 pb-4 bg-slate-200 sm:p-6 sm:pb-4">
            <div className="text-center">
              <h3 className="text-xl font-semibold  leading-6 text-gray-900">
                Add Employee
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="mt-4 space-y-6">
              <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    id="age"
                    className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contactNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    id="contactNumber"
                    className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={formData.contactNumber}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="dob"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    id="dob"
                    className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="salary"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Salary
                  </label>
                  <input
                    type="number"
                    name="salary"
                    id="salary"
                    className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={formData.salary}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <textarea
                    name="address"
                    id="address"
                    rows="3"
                    className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={formData.address}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
