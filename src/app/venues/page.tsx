"use client";
import { Input } from "@/components/ui/input";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useState } from "react";
import Navbar from "../components/Navbar";

const data = [
  {
    id: 1,
    name: "John Doe Turf",
    city: "Lucknow",
    rating: 4.5,
    sport: "⚽ Football",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2022/12/GT/XH/CW/2451824/cricket-turf.jpg",
    address: "70 Bright St, Lucknow",
    phone: "+91 9876543210",
    email: "johndoe@example.com",
    price: 150,
    addGuestPrice: 20,
    latitude: 30.264417,
    longitude: 78.080472,
  },
  {
    id: 2,
    name: "Jane Smith Turf",
    city: "Lucknow",
    rating: 4.7,
    sport: "🏀 Basketball",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOfEKiZgLi3sQ_Yc_vWq6AHQYJ7RVOQgwOhw&s",
    address: "80 Bright St, Lucknow",
    phone: "+91 9876543211",
    email: "janesmith@example.com",
    price: 200,
    addGuestPrice: 30,
    latitude: 30.264417,
    longitude: 78.080472,
  },
];

export default function Bookings() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [location, setLocation] = useState("Lucknow, Uttar Pradesh");

  const handleToggle = () => {
    setIsSearching((prev) => !prev);
  };

  const scrollToVenues = () => {
    const venueSection = document.getElementById("venues-section");
    if (venueSection) {
      venueSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (<>
    <Navbar/>
    <SidebarInset>
      <header className="flex h-16 items-center px-4">
        <h1 className="text-2xl font-bold text-black-600">
          PlayNue - Now in Lucknow, Uttar Pradesh
        </h1>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Box: Welcome Message */}
          <div className="rounded-xl bg-green-600 p-6 text-white shadow-md">
            <h2 className="text-2xl font-semibold">
              Welcome to PlayNue in Lucknow!
            </h2>
            <p className="mt-4 text-sm">
              We are excited to launch our platform in the vibrant city of
              Lucknow. Explore top-rated sports venues and make your bookings
              with ease. Enjoy a hassle-free experience at the best locations!
            </p>
            <button
              onClick={scrollToVenues}
              className="mt-4 bg-white text-green-600 py-2 px-4 rounded-lg shadow-md hover:bg-gray-100"
            >
              Explore Venues Below
            </button>
          </div>

          {/* Second Box: City Info & Map */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcSH-hY03lKzhlwt78INPqQrftsrQ_dnR6U5YAZx3N8U4xGT7RrLgidyXPIdqtgTD4l56k_u1AmPvwD9m6OUoc67lhz8N1CPnVwk3FdRWA"
              alt="Lucknow City"
              className="w-full h-64 object-fit"
            />
            <div className="p-4 bg-gray-800 text-white">
              <h2 className="text-xl font-semibold">
                Discover Sports in Lucknow
              </h2>
              <p className="mt-2 text-sm">
                Find the best sports venues in Lucknow, from cricket turfs to
                badminton courts. We offer you a wide range of choices to match
                your enthusiasm and energy.
              </p>
            </div>
          </div>
        </div>

        <div className="min-h-[250vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
          <div
            style={{ padding: "30px" }}
            className="grid auto-rows-min gap-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
          >
            {data.map((item) => (
              <div
                key={item.id}
                className={`relative aspect-[4/3] rounded-xl overflow-hidden p-4 text-black shadow-lg transition-transform duration-300 ${
                  hoveredItem === item.id ? "scale-105" : "scale-100"
                }`}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <img
                  src={item.image}
                  alt={`${item.name}'s image`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-4 flex flex-col justify-end">
                  <p className="text-white text-lg font-bold">{item.name}</p>
                  <p className="text-white text-sm">City: {item.city}</p>
                  <p className="text-white text-sm">Rating: {item.rating} ⭐</p>
                  <p className="text-white text-xl">{item.sport}</p>
                  {hoveredItem === item.id && (
                    <Link href={`/component/Venue/${item.id}`}>
                      <button className="mt-2 bg-green-500 text-white w-full py-1 rounded-lg shadow-md">
                        Book Now
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SidebarInset>
    </>
  );
}

// 1cff347d-6685-4b9d-9940-f64f646bd683