import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// Mock hotel data
const hotels = [
  { id: 1, name: "123 Main Street, Cityville, Countryland", position: [51.505, -0.09] },
  { id: 2, name: "456 Park Avenue, Townburg, Countryland", position: [51.51, -0.1] },
  { id: 3, name: "789 Ocean View Drive, Beachtown, Countryland", position: [51.515, -0.11] },
];

const HotelMap = () => {
  return (
    <div className="max-w-7xl mx-auto my-8">
        <h2 className="text-6xl font-Playfair mb-4">Where You Can Find Us</h2>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {hotels.map((hotel) => (
          <Marker key={hotel.id} position={hotel.position}>
            <Popup>{hotel.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default HotelMap;
