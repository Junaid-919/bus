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

       {loading ? (
          <div className="flex flex-col items-center justify-center h-48 md:h-64">
            <Spin size={isMobile ? "default" : "large"} />
            <Text className="mt-2 md:mt-3 text-sm md:text-base">
              Loading inspection data...
            </Text>
          </div>
        ) : (<p><strong>Bus Stop Number:</strong> {busStop?.busstop.bus_stop_number}</p>
      <p><strong>Bus Stop Name:</strong> {busStop?.busstop.bus_stop_name}</p>)}

      <button onClick={fetchData} style={{ marginBottom: "20px" }}>
        Refresh
      </button>

      <h3>Bus Services</h3>

       {loading ? (
          <div className="flex flex-col items-center justify-center h-48 md:h-64">
            <Spin size={isMobile ? "default" : "large"} />
            <Text className="mt-2 md:mt-3 text-sm md:text-base">
              Loading inspection data...
            </Text>
          </div>
        ) : (<table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Service Number</th>
            <th>Arrival Time</th>
            <th>Next Arrival Time</th>
          </tr>
        </thead>
        <tbody>
          {busStop?.map((service) => (
            <tr key={service.id}>
              <td>{service.service_number}</td>
              <td>{service.arrival_time}</td>
              <td>{service.next_arrival_time}</td>
            </tr>
          ))}
        </tbody>
      </table>)}
    </div>
  );
}

export default BusStopScreen;
