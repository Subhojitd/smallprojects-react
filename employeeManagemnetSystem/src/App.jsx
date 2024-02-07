import "./App.css";
import Employee from "./assets/employee.svg";
import CheckList from "./assets/check-list.svg";
import Info from "./assets/information-square.svg";
import Add from "./assets/add-01.svg";
import Delete from "./assets/delete-02.svg";
import { useEffect, useState } from "react";
import Modal from "./components/Modal";

function App() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("./src/data.json");
      const data = await res.json();
      console.log(data);
      setEmployees(data);
    }
    fetchData();
  }, []);

  const handleEmployeeClick = (emp) => {
    setSelectedEmployee(emp);
  };

  const handleAddEmployee = (employeeData) => {
    // Logic to add a new employee
    setEmployees([...employees, employeeData]);
  };

  const handleDeleteEmployee = (empId) => {
    // Filter out the employee with the specified ID
    const updatedEmployees = employees.filter((emp) => emp.id !== empId);
    // Update the employees state with the filtered array
    setEmployees(updatedEmployees);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="w-screen h-screen gap-4 flex flex-col items-center  justify-center bg-slate-950">
        {/* Heading */}
        <div className="">
          <h1 className=" text-4xl text-white flex gap-4 items-center justify-center">
            Manage your employee{" "}
            <img className="w-10 -mt-2" src={Employee} alt="" />{" "}
          </h1>
        </div>

        {/*  */}
        <div className="w-[900px] h-[450px] flex border-2 border-slate-200 rounded-2xl">
          <div className="w-[35%] h-full border-r-2 border-slate-200">
            <div className="bg-blue-800 rounded-tl-2xl w-full  flex justify-between pr-3 border-b border-slate-200  ">
              <p className="bg-blue-800  rounded-tl-2xl text-xl px-5 py-2 text-white  flex gap-2 items-center   ">
                Employee list{" "}
                <img className="w-6 mt-1" src={CheckList} alt="" />
              </p>
              <button onClick={toggleModal}>
                <img className="w-6 mt-1 cursor-pointer" src={Add} alt="" />
              </button>
            </div>
            {/* employee list */}

            <div className="w-full h-[89%] overflow-y-scroll overflow-x-hidden p-2">
              {employees.map((emp) => {
                return (
                  <div
                    key={emp.id}
                    className={`flex items-center justify-between text-white bg-slate-800 w-[95%] m-2 p-2 rounded-md  cursor-pointer ${
                      selectedEmployee === emp ? "bg-blue-800" : ""
                    }`}
                    onClick={() => handleEmployeeClick(emp)}
                  >
                    <p className="">{emp.firstName}</p>
                    <button
                      className="p-1 rounded-full hover:bg-slate-600 "
                      onClick={() => handleDeleteEmployee(emp.id)}
                    >
                      <img src={Delete} alt="" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-[65%]">
            {/* Employee info */}
            <div className="bg-blue-800  rounded-tr-2xl text-xl w-full px-5 py-2 text-white border-b border-slate-200 flex gap-3 items-center justify-center">
              Employee information{" "}
              <img className="w-6 mt-1" src={Info} alt="" />
            </div>
            <div className="h-[80%] w-full  p-4 flex items-center justify-center">
              {selectedEmployee && (
                <div className="flex w-full  items-center justify-evenly text-white">
                  <img
                    className="w-48"
                    src={selectedEmployee.imageUrl}
                    alt=""
                  />
                  <div>
                    <p>
                      Name:{" "}
                      <span className="text-orange-300 text-sm mx-1">{`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}</span>
                    </p>
                    <p>
                      Age:{" "}
                      <span className="text-orange-300 text-sm mx-1">
                        {selectedEmployee.age}
                      </span>
                    </p>
                    <p>
                      Email:{" "}
                      <span className="text-orange-300 text-sm mx-1">
                        {selectedEmployee.email}
                      </span>
                    </p>
                    <p>
                      Contact Number:{" "}
                      <span className="text-orange-300 text-sm mx-1">
                        {selectedEmployee.contactNumber}
                      </span>
                    </p>
                    <p>
                      DOB:{" "}
                      <span className="text-orange-300 text-sm mx-1">
                        {selectedEmployee.dob}
                      </span>
                    </p>
                    <p>
                      Salary:{" "}
                      <span className="text-orange-300 text-sm mx-1">
                        {selectedEmployee.salary}
                      </span>
                    </p>
                    <p>
                      Address:{" "}
                      <span className="text-orange-300 text-sm mx-1">
                        {selectedEmployee.address}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={toggleModal} onAddEmployee={handleAddEmployee} />
      )}
    </>
  );
}

export default App;
