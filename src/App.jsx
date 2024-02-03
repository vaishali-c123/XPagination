import "./styles.css";
import { useState } from "react";
import { useEffect } from "react";

export default function App() {
  const [totalData, setTotalData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [currentD, setCurrentD] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    currentData();
  }, [currentPage, totalData]);

  const currentData = () => {
    const lastData = currentPage * recordsPerPage;
    const firstData = lastData - recordsPerPage;
    const sliced = totalData.slice(firstData, lastData);
    setCurrentD(() => {
      return sliced;
    });
  };

  async function getData() {
    try {
      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const data = await response.json();
      setTotalData(data);
    } catch (error) {
      alert("failed to fetch data");
    }
  }

  return (
    <div className="container">
      <h1>Employee Data Table</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentD.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttonCon">
        <button
          className="buttonPN"
          onClick={() => {
            setCurrentPage((prev) => {
              if (prev === 1) {
                return prev;
              } else {
                return prev - 1;
              }
            });
            currentData();
          }}
        >
          Previous
        </button>
        <button className="number">{currentPage}</button>
        <button
          className="buttonPN"
          onClick={() => {
            const final = Math.floor(totalData.length / recordsPerPage) + 1;
            setCurrentPage((prev) => {
              if (prev === final) {
                return prev;
              } else {
                return prev + 1;
              }
            });
            currentData();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
