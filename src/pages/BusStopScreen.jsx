import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";


function BusStopScreen() {
  const [searchParams] = useSearchParams();
  const bus_stop_number = searchParams.get("bus_stop_number");

  const [busStop, setBusStop] = useState([]);
  const [loading, setLoading] = useState(false);


      const fetchData = async () => {
      try {

          console.log("bus")
          setLoading(true);

          const response = await fetch(
            `https://backend-vercel-zeta-eight.vercel.app/api/busstops/number/${bus_stop_number}`
          );


          console.log("status:", response.status);
          const data = await response.json();   // ✅ await here
          console.log("data:", data);   

          setBusStop(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };

  useEffect(() => {
    fetchData();

  }, [bus_stop_number]);

  if (loading) return <h3>Loading...</h3>;
  if (!busStop) return <h3>No data found</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Bus Stop Details</h2>
      {console.log("bus data in logs = "+JSON.stringify(busStop))}



      <button onClick={fetchData} style={{ marginBottom: "20px" }}>
        Refresh
      </button>

      <h3>Bus Services</h3>

{loading ? (
  <div className="loader-container">
    <Spin size={isMobile ? "default" : "large"} />
    <p className="loading-text">Loading inspection data...</p>
  </div>
) : (
  <div className="table-wrapper">
    <table className="bus-table">
      <thead>
        <tr>
          <th>Service Number</th>
          <th>Arrival Time</th>
          <th>Next Arrival Time</th>
        </tr>
      </thead>

      <tbody>
        {busStop && busStop.length > 0 ? (
          busStop.map((service) => (
            <tr key={service.id}>
              <td className="service-number">
                {service.service_number}
              </td>
              <td>{service.arrival_time}</td>
              <td>{service.next_arrival_time}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" className="no-data">
              No inspection data available.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
)}

        <style>
    .loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 250px;
}

.loading-text {
  margin-top: 12px;
  font-size: 16px;
  color: #2563eb;
  font-weight: 500;
}

/* Wrapper for responsiveness */
.table-wrapper {
  width: 100%;
  overflow-x: auto;
  margin-top: 20px;
}

/* Main Table Styling */
.bus-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* Header */
.bus-table thead {
  background: linear-gradient(to right, #2563eb, #4f46e5);
  color: white;
}

.bus-table th {
  padding: 14px;
  text-align: left;
  font-size: 14px;
}

/* Body Cells */
.bus-table td {
  padding: 14px;
  border-bottom: 1px solid #f1f1f1;
  font-size: 14px;
  color: #333;
}

/* Zebra Effect */
.bus-table tbody tr:nth-child(even) {
  background-color: #f9fbff;
}

/* Hover Effect */
.bus-table tbody tr:hover {
  background-color: #e8f0ff;
  transition: 0.2s ease-in-out;
}

/* Highlight Service Number */
.service-number {
  font-weight: 600;
  color: #2563eb;
}

/* No Data */
.no-data {
  text-align: center;
  padding: 20px;
  color: #777;
}

/* Responsive */
@media (max-width: 768px) {
  .bus-table th,
  .bus-table td {
    padding: 10px;
    font-size: 13px;
  }

  .loading-text {
    font-size: 14px;
  }
}
  </style>
    </div>
  );
}



export default BusStopScreen;
