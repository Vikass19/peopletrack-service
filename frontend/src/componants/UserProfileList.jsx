import { useEffect, useState } from "react";
import { getUserProfiles } from "../api/api.jsx";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import ProfileFilter from "./ProfileFilter";
import "../css/userprofile.css";
import { FaMapMarkerAlt, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const GOOGLE_MAP_API_KEY = "AIzaSyASNJ-q-NBUfqYSRpf9c8TNJ-dOnmsIRPg";
const mapContainerStyle = { width: "100%", height: "400px", borderRadius: "10px" };
const defaultCenter = { lat: 20.5937, lng: 78.9629 }; // Default (India)

const UserProfileList = () => {
    const [profiles, setProfiles] = useState([]);
    const [filteredProfiles, setFilteredProfiles] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const profilesPerPage = 6;
    const navigate = useNavigate();

    const { isLoaded, loadError } = useJsApiLoader({ googleMapsApiKey: GOOGLE_MAP_API_KEY });

    useEffect(() => {
        const fetchProfiles = async () => {
            setLoading(true);
            try {
                const data = await getUserProfiles();
                setProfiles(data);
                setFilteredProfiles(data);
            } catch (error) {
                console.error("Error fetching profiles:", error);
            }
            setLoading(false);
        };
        fetchProfiles();
    }, []);

    const handleFilter = ({ searchTerm, location }) => {
        setLoading(true);
        setTimeout(() => {
            const lowerSearch = searchTerm.toLowerCase();
            const lowerLocation = location.toLowerCase();

            const filtered = profiles.filter((profile) =>
                (profile.first_name.toLowerCase().includes(lowerSearch) ||
                profile.last_name.toLowerCase().includes(lowerSearch)) &&
                (profile.city.toLowerCase().includes(lowerLocation) ||
                profile.state.toLowerCase().includes(lowerLocation))
            );

            setFilteredProfiles(filtered);
            setCurrentPage(1);
            setLoading(false);
        }, 1000);
    };

    const handleButtonClick = (action, profile) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            if (action === "map") setSelectedProfile(profile);
            if (action === "summary") navigate(`/profile/${profile.id}`);
        }, 1000);
    };

    const indexOfLastProfile = currentPage * profilesPerPage;
    const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
    const currentProfiles = filteredProfiles.slice(indexOfFirstProfile, indexOfLastProfile);

    return (
        <div className="profile-container">
            <h1 className="profile-heading">User Profiles</h1>
            <ProfileFilter onFilter={handleFilter} />

            {loading && (
                <div className="loading">
                    <div className="loading-circle"></div>
                </div>
            )}

            <div className="profile-grid">
                {!loading && currentProfiles.length > 0 ? (
                    currentProfiles.map((profile) => (
                        <div key={profile.id} className="profile-card">
                            <img src={profile.profile_picture} alt={profile.first_name} className="profile-image" />
                            <div className="profile-content">
                                <h2 className="profile-name">{profile.first_name} {profile.last_name}</h2>
                                <p className="profile-bio">{profile.bio}</p>
                                <p className="profile-location">{profile.city}, {profile.state}</p>

                                <div className="profile-button-container">
                                    <button className="profile-button" onClick={() => handleButtonClick("map", profile)}>
                                        View on Map <FaMapMarkerAlt className="arrow-icon" />
                                    </button>
                                    
                                    <button className="profile-button profile-summary" onClick={() => handleButtonClick("summary", profile)}>
                                        Summary
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (!loading && <p className="no-profile">No profiles found!</p>)}
            </div>

            <div className="pagination">
                <button className="page-btn" onClick={() => setCurrentPage(prev => prev - 1)} disabled={currentPage === 1}>
                    <FaArrowLeft /> Prev
                </button>
                <span className="page-number">Page {currentPage} of {Math.ceil(filteredProfiles.length / profilesPerPage)}</span>
                <button className="page-btn" onClick={() => setCurrentPage(prev => prev + 1)} disabled={currentPage >= Math.ceil(filteredProfiles.length / profilesPerPage)}>
                    Next <FaArrowRight />
                </button>
            </div>

            {isLoaded && selectedProfile && (
                <div className="map-container">
                    <h2 className="map-heading">Location of {selectedProfile.first_name}</h2>
                    {selectedProfile.latitude && selectedProfile.longitude ? (
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            center={{ 
                                lat: parseFloat(selectedProfile.latitude) || defaultCenter.lat, 
                                lng: parseFloat(selectedProfile.longitude) || defaultCenter.lng 
                            }}
                            zoom={13}
                        />
                    ) : (
                        <p className="map-error">Invalid location data.</p>
                    )}
                </div>
            )}

            {loadError && <p className="map-error">Error loading Google Maps.</p>}
        </div>
    );
};

export default UserProfileList;