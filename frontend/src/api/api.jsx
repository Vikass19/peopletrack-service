const BASE_URL = "https://peopletrack-service-backend.onrender.com";

export const getUserProfiles = async () => {
    try {
        const response = await fetch(`${BASE_URL}/geo_profiles/api/profiles/`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // No need to modify profile_picture if it's already an absolute URL
        return data.map(profile => ({
            ...profile,
            profile_picture: profile.profile_picture.startsWith("http")
                ? profile.profile_picture
                : `${BASE_URL}${profile.profile_picture}` // Handle relative URLs if any
        }));
    } catch (error) {
        console.error("Error fetching user profiles:", error);
        return [];
    }
};
