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

        // console.log("data1 - "+ response)
        // console.log("data2 - "+ JSON.stringify(response))
        // console.log("data3 - "+JSON.stringify(response.json()))

          // const data = await response.json();
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

      <p><strong>Bus Stop Number:</strong> {busStop.bus_stop_number}</p>
      <p><strong>Bus Stop Name:</strong> {busStop.bus_stop_name}</p>

      <button onClick={fetchData} style={{ marginBottom: "20px" }}>
        Refresh
      </button>

      <h3>Bus Services</h3>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Service Number</th>
            <th>Arrival Time</th>
            <th>Next Arrival Time</th>
          </tr>
        </thead>
        <tbody>
          {busStop.bussservice?.map((service) => (
            <tr key={service.id}>
              <td>{service.service_number}</td>
              <td>{service.arrival_time}</td>
              <td>{service.next_arrival_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BusStopScreen;
