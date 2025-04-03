import { useState } from "react";
import '../css/profile.css';


const ProfileFilter = ({ onFilter }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [location, setLocation] = useState(""); // City or State

    const handleSearch = () => {
        onFilter({ searchTerm, location });
    };

    return (
        <div className="filter-container">
            <input
                type="text"
                placeholder="Search by Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="filter-input"
            />
            <input
                type="text"
                placeholder="Search by City or State..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="filter-input"
            />
            <button className="filter-btn" onClick={handleSearch}>Filter</button>
        </div>
    );
};

export default ProfileFilter;
