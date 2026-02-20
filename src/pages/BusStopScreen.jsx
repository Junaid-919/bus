import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import "./bus.css";
import "./busstop.css";


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
      {console.log("bus data in logs = "+JSON.stringify(busStop[0]))}

      {loading ? (
  <div className="loader-container">
    <Spin size={isMobile ? "default" : "large"} />
    <p className="loading-text">Loading inspection data...</p>
  </div>
) : (
  <div className="busstop-card">
    <div className="busstop-row">
      <span className="label">Bus Stop Number:</span>
      <span className="value">
        {busStop[0].busstop?.bus_stop_number}
      </span>
    </div>

    <div className="busstop-row">
      <span className="label">Bus Stop Name:</span>
      <span className="value">
        {busStop[0].busstop?.bus_stop_name}
      </span>
    </div>
  </div>
)}



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
</div>
  );

  
}



export default BusStopScreen;
