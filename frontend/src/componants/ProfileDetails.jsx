import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserProfiles } from "../api/api";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaStar, FaArrowLeft } from "react-icons/fa";
import "../css/profiledetails.css";

const GOOGLE_MAP_API_KEY = "AIzaSyASNJ-q-NBUfqYSRpf9c8TNJ-dOnmsIRPg";
const mapContainerStyle = { width: "100%", height: "400px", borderRadius: "10px" };
const defaultCenter = { lat: 20.5937, lng: 78.9629 }; // Default (India)

const ProfileDetails = () => {
    const { id } = useParams();  
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [showMap, setShowMap] = useState(false);

    const { isLoaded, loadError } = useJsApiLoader({ googleMapsApiKey: GOOGLE_MAP_API_KEY });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getUserProfiles();
                const user = data.find((p) => p.id === parseInt(id));
                setProfile(user);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };
        fetchProfile();
    }, [id]);

    if (!profile) return <p>Loading user data...</p>;

    return (
        <div className="profile-details-container">
            {/* Circular Go Back Button */}
            <button className="go-back-btn" onClick={() => navigate("/")}>
                <FaArrowLeft className="back-icon" />
            </button>

            <h1>{profile.first_name} {profile.last_name}</h1>
            <img src={profile.profile_picture} alt={profile.first_name} className="profile-details-image" />
            
            <p className="profile-info"><FaStar className="info-icon" /><strong>Interest:</strong> {profile.interest}</p>
            <p className="profile-info"><FaMapMarkerAlt className="info-icon" /><strong>Location:</strong> {profile.city}, {profile.state}</p>
            <p className="profile-info"><FaEnvelope className="info-icon" /><strong>Email:</strong> {profile.email}</p>
            <p className="profile-info"><FaPhone className="info-icon" /><strong>Phone:</strong> {profile.phone_number}</p>

            {/* View on Map Button */}
            <button className="view-map-btn" onClick={() => setShowMap(!showMap)}>
                {showMap ? "Hide Map" : "View on Map"} <FaMapMarkerAlt className="arrow-icon" />
            </button>

            {/* Google Map */}
            {isLoaded && showMap && profile.latitude && profile.longitude && (
                <div className="map-container">
                    <h2 className="map-heading">Location of {profile.first_name}</h2>
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={{ 
                            lat: parseFloat(profile.latitude) || defaultCenter.lat, 
                            lng: parseFloat(profile.longitude) || defaultCenter.lng 
                        }}
                        zoom={13}
                    >
                        <Marker position={{ lat: parseFloat(profile.latitude), lng: parseFloat(profile.longitude) }} />
                    </GoogleMap>
                </div>
            )}

            {loadError && <p className="map-error">Error loading Google Maps.</p>}
        </div>
    );
};

export default ProfileDetails;
