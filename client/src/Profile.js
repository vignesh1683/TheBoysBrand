import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from './assects/logo.png'
import { Link } from 'react-router-dom';
import './styles/Profile.css'

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone_number: "",
    Home_no: "",
    street_name: "",
    district: "",
    state: "",
    nation: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProfile(token);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const getProfile = async (token) => {
    try {
      const res = await axios.get("http://localhost:5000/get_profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
      setFormData(res.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post("http://localhost:5000/save_profile", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Profile saved successfully");
        navigate("/home");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to save profile:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <nav class="nav">
        <input type="checkbox" id="nav-check" />
        <div class="nav-header">
          <div class="nav-title">
            <Link to="/home">
              <img src={logo} alt="logo" className="logo" />
            </Link>
            <div className="menu">
              <Link to="/mens" className="navbar-button">
                Mens
              </Link>
              <Link to="/womens" className="navbar-button">
                Womens
              </Link>
            </div>
          </div>
        </div>
        <div class="nav-btn">
          <label for="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>

        <ul className="nav-list">
          <li className="search-container">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.45 19.9L13.2 13.65C12.7 14.0833 12.125 14.4167 11.475 14.65C10.825 14.8833 10.1834 15 9.55005 15C8.01287 15 6.71191 14.468 5.64717 13.4041C4.58242 12.3401 4.05005 11.0401 4.05005 9.50408C4.05005 7.96803 4.58202 6.66667 5.64597 5.6C6.70994 4.53333 8.00994 4 9.54597 4C11.082 4 12.3834 4.53238 13.45 5.59713C14.5167 6.66186 15.05 7.96282 15.05 9.5C15.05 10.1833 14.925 10.85 14.675 11.5C14.425 12.15 14.1 12.7 13.7 13.15L19.95 19.4L19.45 19.9ZM9.55005 14.3C10.9 14.3 12.0375 13.8375 12.9625 12.9125C13.8875 11.9875 14.35 10.85 14.35 9.5C14.35 8.15 13.8875 7.0125 12.9625 6.0875C12.0375 5.1625 10.9 4.7 9.55005 4.7C8.20005 4.7 7.06255 5.1625 6.13755 6.0875C5.21255 7.0125 4.75005 8.15 4.75005 9.5C4.75005 10.85 5.21255 11.9875 6.13755 12.9125C7.06255 13.8375 8.20005 14.3 9.55005 14.3Z"
                fill="black"
              />
            </svg>
            <input type="text" placeholder="Search" className="search-bar" />
          </li>
          <li className="prop">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.30005 17.6C7.15005 17 8.03755 16.525 8.96255 16.175C9.88755 15.825 10.9 15.65 12 15.65C13.1 15.65 14.1125 15.825 15.0375 16.175C15.9625 16.525 16.85 17 17.7 17.6C18.3834 16.9167 18.9375 16.1 19.3625 15.15C19.7875 14.2 20 13.15 20 12C20 9.78332 19.2209 7.89582 17.6625 6.33749C16.1042 4.77915 14.2167 3.99999 12 3.99999C9.78338 3.99999 7.89588 4.77915 6.33755 6.33749C4.77922 7.89582 4.00005 9.78332 4.00005 12C4.00005 13.15 4.21255 14.2 4.63755 15.15C5.06255 16.1 5.61672 16.9167 6.30005 17.6ZM12.0008 12.35C11.2003 12.35 10.525 12.0752 9.97505 11.5257C9.42505 10.9762 9.15005 10.3012 9.15005 9.50074C9.15005 8.70024 9.4248 8.02499 9.9743 7.47499C10.5238 6.92499 11.1988 6.64999 11.9993 6.64999C12.7998 6.64999 13.475 6.92474 14.025 7.47424C14.575 8.02374 14.85 8.69874 14.85 9.49924C14.85 10.2997 14.5753 10.975 14.0258 11.525C13.4763 12.075 12.8013 12.35 12.0008 12.35ZM12 20.7C10.7834 20.7 9.64588 20.475 8.58755 20.025C7.52922 19.575 6.60838 18.9583 5.82505 18.175C5.04172 17.3917 4.42505 16.4708 3.97505 15.4125C3.52505 14.3542 3.30005 13.2167 3.30005 12C3.30005 10.7833 3.52505 9.64582 3.97505 8.58749C4.42505 7.52915 5.04172 6.60832 5.82505 5.82499C6.60838 5.04165 7.52922 4.42499 8.58755 3.97499C9.64588 3.52499 10.7834 3.29999 12 3.29999C13.2167 3.29999 14.3542 3.52499 15.4125 3.97499C16.4709 4.42499 17.3917 5.04165 18.175 5.82499C18.9584 6.60832 19.575 7.52915 20.025 8.58749C20.475 9.64582 20.7 10.7833 20.7 12C20.7 13.2167 20.475 14.3542 20.025 15.4125C19.575 16.4708 18.9584 17.3917 18.175 18.175C17.3917 18.9583 16.4709 19.575 15.4125 20.025C14.3542 20.475 13.2167 20.7 12 20.7ZM12 20C12.9334 20 13.8625 19.8292 14.7875 19.4875C15.7125 19.1458 16.5 18.6833 17.15 18.1C16.5 17.5667 15.7375 17.1417 14.8625 16.825C13.9875 16.5083 13.0334 16.35 12 16.35C10.9667 16.35 10.0084 16.5042 9.12505 16.8125C8.24172 17.1208 7.48338 17.55 6.85005 18.1C7.50005 18.6833 8.28755 19.1458 9.21255 19.4875C10.1375 19.8292 11.0667 20 12 20ZM12 11.65C12.6 11.65 13.1084 11.4417 13.525 11.025C13.9417 10.6083 14.15 10.1 14.15 9.49999C14.15 8.89999 13.9417 8.39165 13.525 7.97499C13.1084 7.55832 12.6 7.34999 12 7.34999C11.4 7.34999 10.8917 7.55832 10.475 7.97499C10.0584 8.39165 9.85005 8.89999 9.85005 9.49999C9.85005 10.1 10.0584 10.6083 10.475 11.025C10.8917 11.4417 11.4 11.65 12 11.65Z"
                fill="black"
              />
            </svg>
            <Link to="/profile" className="navbar-button11">
              Profile
            </Link>
          </li>
          <li className="prop">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 19.25L11.45 18.75C9.83338 17.2667 8.49588 16 7.43755 14.95C6.37922 13.9 5.54588 12.9792 4.93755 12.1875C4.32922 11.3958 3.90422 10.6833 3.66255 10.05C3.42088 9.41668 3.30005 8.78335 3.30005 8.15001C3.30005 6.96668 3.70422 5.97085 4.51255 5.16251C5.32088 4.35418 6.31672 3.95001 7.50005 3.95001C8.38338 3.95001 9.20838 4.18751 9.97505 4.66251C10.7417 5.13751 11.4167 5.83335 12 6.75001C12.5834 5.83335 13.2584 5.13751 14.025 4.66251C14.7917 4.18751 15.6167 3.95001 16.5 3.95001C17.6834 3.95001 18.6792 4.35418 19.4875 5.16251C20.2959 5.97085 20.7 6.96668 20.7 8.15001C20.7 8.78335 20.5792 9.41668 20.3375 10.05C20.0959 10.6833 19.6709 11.3958 19.0625 12.1875C18.4542 12.9792 17.625 13.9 16.575 14.95C15.525 16 14.1834 17.2667 12.55 18.75L12 19.25ZM12 18.3C13.6 16.85 14.9167 15.6083 15.95 14.575C16.9834 13.5417 17.8 12.6458 18.4 11.8875C19 11.1292 19.4167 10.4583 19.65 9.87501C19.8834 9.29168 20 8.71668 20 8.15001C20 7.15001 19.6667 6.31668 19 5.65001C18.3334 4.98335 17.5 4.65001 16.5 4.65001C15.7 4.65001 14.9625 4.87918 14.2875 5.33751C13.6125 5.79585 12.9667 6.51668 12.35 7.50001H11.65C11.0167 6.50001 10.3667 5.77501 9.70005 5.32501C9.03338 4.87501 8.30005 4.65001 7.50005 4.65001C6.51672 4.65001 5.68755 4.98335 5.01255 5.65001C4.33755 6.31668 4.00005 7.15001 4.00005 8.15001C4.00005 8.71668 4.11672 9.29168 4.35005 9.87501C4.58338 10.4583 5.00005 11.1292 5.60005 11.8875C6.20005 12.6458 7.01672 13.5375 8.05005 14.5625C9.08338 15.5875 10.4 16.8333 12 18.3Z"
                fill="black"
              />
            </svg>
            <Link to="/wishlist" className="navbar-button11">
              wishlist
            </Link>
          </li>
          <li className="prop">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.80005 20.7C6.36672 20.7 6.00838 20.5583 5.72505 20.275C5.44172 19.9917 5.30005 19.6333 5.30005 19.2V8.79999C5.30005 8.36665 5.44172 8.00832 5.72505 7.72499C6.00838 7.44165 6.36672 7.29999 6.80005 7.29999H8.65005V6.64999C8.65005 5.71665 8.97505 4.92499 9.62505 4.27499C10.275 3.62499 11.0667 3.29999 12 3.29999C12.9334 3.29999 13.725 3.62499 14.375 4.27499C15.025 4.92499 15.35 5.71665 15.35 6.64999V7.29999H17.2C17.6334 7.29999 17.9917 7.44165 18.275 7.72499C18.5584 8.00832 18.7 8.36665 18.7 8.79999V19.2C18.7 19.6333 18.5584 19.9917 18.275 20.275C17.9917 20.5583 17.6334 20.7 17.2 20.7H6.80005ZM6.80005 20H17.2C17.4 20 17.5834 19.9167 17.75 19.75C17.9167 19.5833 18 19.4 18 19.2V8.79999C18 8.59999 17.9167 8.41665 17.75 8.24999C17.5834 8.08332 17.4 7.99999 17.2 7.99999H15.35V10.65C15.35 10.75 15.3167 10.8333 15.25 10.9C15.1834 10.9667 15.1 11 15 11C14.9 11 14.8167 10.9667 14.75 10.9C14.6834 10.8333 14.65 10.75 14.65 10.65V7.99999H9.35005V10.65C9.35005 10.75 9.31672 10.8333 9.25005 10.9C9.18338 10.9667 9.10005 11 9.00005 11C8.90005 11 8.81672 10.9667 8.75005 10.9C8.68338 10.8333 8.65005 10.75 8.65005 10.65V7.99999H6.80005C6.60005 7.99999 6.41672 8.08332 6.25005 8.24999C6.08338 8.41665 6.00005 8.59999 6.00005 8.79999V19.2C6.00005 19.4 6.08338 19.5833 6.25005 19.75C6.41672 19.9167 6.60005 20 6.80005 20ZM9.35005 7.29999H14.65V6.64999C14.65 5.89999 14.3959 5.27082 13.8875 4.76249C13.3792 4.25415 12.75 3.99999 12 3.99999C11.25 3.99999 10.6209 4.25415 10.1125 4.76249C9.60422 5.27082 9.35005 5.89999 9.35005 6.64999V7.29999Z"
                fill="black"
              />
            </svg>
            <Link to="/cart" className="navbar-button11">
              Cart
            </Link>
          </li>
          <li className="logout" onClick={() => handleLogout()}>
            Log Out
          </li>
        </ul>
      </nav>
      <div className="pcontent">
        <h2>Welcome, {user && user.username}!</h2>
        <p>Profile Details</p>
        {user ? (
          <div>
            <form onSubmit={handleSubmit} className="pform">
              <p>Personal Details</p>
              <div>
                <label>Username:</label>
                <br />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <br />
              </div>
              <div>
                <label>Email:</label>
                <br />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <br />
              </div>
              <div>
                <label>Phone number:</label>
                <br />
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                />
                <br />
              </div>
              <p>Address Details</p>
              <div>
                <label>Home no:</label>
                <br />
                <input
                  type="text"
                  name="Home_no"
                  value={formData.Home_no}
                  onChange={handleChange}
                  required
                />
                <br />
              </div>

              <div>
                <label>Street Name:</label>
                <br />
                <input
                  type="text"
                  name="street_name"
                  value={formData.street_name}
                  onChange={handleChange}
                  required
                />
                <br />
              </div>
              <div>
                <label>District:</label>
                <br />
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                />
                <br />
              </div>
              <div>
                <label>State:</label>
                <br />
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
                <br />
              </div>
              <div>
                <label>Nationality:</label>
                <br />
                <input
                  type="text"
                  name="nation"
                  value={formData.nation}
                  onChange={handleChange}
                  required
                />
                <br />
              </div>
              <br />
              <br />
              <button type="submit" className="save">
                Save Details
              </button>
            </form>
          </div>
        ) : (
          <p>No profile found for the user. Please create a profile.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
