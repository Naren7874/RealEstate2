# 🏡 RealEstate – Real Estate Buying and Renting Platform

RealEstate is a responsive and modern web application built to streamline the process of finding, buying, or renting properties. It provides a user-friendly interface, real-time listing updates, and powerful search and communication tools to make property hunting more efficient and engaging.


## 🚨 Problem Statement

- Finding a property to buy or rent is often time-consuming.
- Existing platforms lack advanced search and comprehensive property information.
- Communication between buyers, sellers, and renters is limited.


## ✅ Our Solution

DreamHomes addresses these issues by offering:

- 🔍 Advanced search filters (city, price, property type, location, etc.)
- 🗺️ Interactive maps using Leaflet for better property visualization
- 💬 Seamless messaging and inquiry features for direct communication


## ⚙️ Core Functionality

- **Buy or Rent Options:** Users can choose whether to browse properties for sale or rent directly from the homepage.
- **Advanced Filters:** Apply filters like city, price range, property type, and exact location to narrow down listings.
- **Comprehensive Listings:** 
  - Property description
  - Images
  - Size (including number of bedrooms and bathrooms etc)
  - Nearby places
  - Pet allowance, utilities, income requirements and policies
- **Interactive Map View:** Listings include a Leaflet-powered map showing the exact location to help users assess surroundings and accessibility.
- **Geographic Exploration:** Visual and spatial tools simplify decision-making for buyers and renters.


## 👤 User Features

- **Post a Property:** Users can list properties with price, location, type, and images.
- **Save Favorites:** Logged-in users can view and save listings they’re interested in.
- **Detailed Info:** Listings include amenities, policies, and high-quality images.
- **Interactive Mapping:** Leaflet integration helps users explore neighborhoods visually.
- **Messaging & Chat:** Enables direct inquiries and negotiations with property owners.


## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Real-Time Communication:** Socket.IO
- **Maps:** Leaflet.js
- **Image Uploads:** Cloudinary


## 🚀 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/srishtisingh56/RealEstate.git

# Navigate to the frontend and install dependencies
cd frontend
npm install

# Start the frontend
npm run dev

# In a new terminal, navigate to backend and install dependencies
cd ../backend
npm install

# Start the backend
npm run dev
