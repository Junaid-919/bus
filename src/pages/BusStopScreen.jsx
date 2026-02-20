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
  <div className="flex flex-col items-center justify-center h-48 md:h-64">
    <Spin size={isMobile ? "default" : "large"} />
    <Text className="mt-2 md:mt-3 text-sm md:text-base text-blue-600 font-medium">
      Loading inspection data...
    </Text>
  </div>
) : (
  <div className="w-full overflow-x-auto mt-6">
    <div className="rounded-xl shadow-lg border border-blue-100 overflow-hidden">
      <table className="min-w-full">
        
        {/* Table Header */}
        <thead className="bg-gradient-to-r from-blue-600 to-indigo-600">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white">
              Service Number
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white">
              Arrival Time
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white">
              Next Arrival Time
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {busStop && busStop.length > 0 ? (
            busStop.map((service, index) => (
              <tr
                key={service.id}
                className={`transition duration-200 hover:bg-blue-50 ${
                  index % 2 === 0 ? "bg-white" : "bg-blue-50/40"
                }`}
              >
                <td className="px-6 py-4 text-sm font-medium text-blue-700">
                  {service.service_number}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {service.arrival_time}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {service.next_arrival_time}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                className="text-center py-8 text-gray-500 text-sm bg-white"
              >
                No inspection data available.
              </td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  </div>
)}
    </div>
  );
}

export default BusStopScreen;
