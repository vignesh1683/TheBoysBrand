import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "./assects/logo.png";
import front from "./assects/front.jpg";
import "./styles/Home.css";
import plain from "./assects/plain_heart.png";
import active from "./assects/color_heart.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const images = [front, front, front];
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const openModal1 = () => {
    setModalOpen1(true);
  };
  const closeModal1 = () => {
    setModalOpen1(false);
  };
  const [products, setProductsMens] = useState([]);
  const [products1, setProductsWomens] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    fetchProducts("tshirt", "mens");
    fetchProducts("sarees", "womens");
  }, []);

  const fetchProducts = async (category, gender) => {
    try {
      let apiUrl = "";
      if (gender === "mens") {
        apiUrl = `http://localhost:5000/products/mens/${category}`;
        const response = await axios.get(apiUrl);
        setProductsMens(response.data.map(parseProduct));
      } else if (gender === "womens") {
        apiUrl = `http://localhost:5000/products/women/${category}`;
        const response = await axios.get(apiUrl);
        setProductsWomens(response.data.map(parseProduct));
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const parseProduct = (product) => ({
    ...product,
    gender: parseGender(product.gender),
  });

  const parseGender = (gender) => {
    return gender.split(".")[1];
  };

  const handleClick = (category, gender) => {
    setSelectedItem(category);
    fetchProducts(category, gender);
  };

  const [wishlist, setWishlist] = useState([]);
  const addToWishlist = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    console.log(productId);
    try {
      const res = await axios.post(
        "http://localhost:5000/user_wishlist_add",
        {
          productid: productId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWishlist(res.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState("");

  const selectColor = (color) => {
    setSelectedColor(color);
  };
  const selectSize = (size) => {
    setSelectedSize(size);
  };
  const addToBag = async (productId) => {
    if (!selectedColor || !selectedSize || !quantity) {
      alert("Please select color, size, and enter quantity");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    console.log(productId);
    let data = {
      product_id: productId,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
    };
    console.log(data);
    const response = await axios.post(
      "http://localhost:5000/user_bag_add",
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response.status);
    window.location.reload();
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
              style={{ marginLeft: "20px" }}
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
              style={{ marginLeft: "20px" }}
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
              style={{ marginLeft: "13px" }}
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
      <div className="carousel">
        <div className="carousel-inner">
          <img src={images[currentIndex]} alt={currentIndex} />
        </div>
        <div className="carousel-buttons">
          <button className="carousel-prev" onClick={goToPrevSlide}>
            &lt;
          </button>
          <button className="carousel-next" onClick={goToNextSlide}>
            &gt;
          </button>
        </div>
      </div>
      <div className="mens">
        <div className="category">
          <p>MEN'S WARE</p>
          <div className="underscore"></div>
          <div className="plist">
            <h4
              className={selectedItem === "tshirt" ? "selected" : ""}
              onClick={() => {
                handleClick("tshirt", "mens");
              }}
            >
              TSHIRT
            </h4>
            <h4
              className={selectedItem === "pant" ? "selected" : ""}
              onClick={() => {
                handleClick("pant", "mens");
              }}
            >
              PANTS
            </h4>
            <h4
              className={selectedItem === "shorts" ? "selected" : ""}
              onClick={() => {
                handleClick("shorts", "mens");
              }}
            >
              SHORTS
            </h4>
          </div>
        </div>
        <div className="productlist">
          {products.map((product) => (
            <div
              className="products-list-container"
              key={product.product_detail_id}
            >
              <div className="pic">
                <div>
                  <div className="content">
                    <div className="content-overlay"></div>
                    <img
                      src={`${product.image}`}
                      alt="mens_dress"
                      className="m3"
                    ></img>
                    <div className="image-container">
                      <img src={plain} alt="wishlist" className="plain"></img>
                      <img
                        src={active}
                        alt="active"
                        className="active"
                        onClick={() => addToWishlist(product.product_detail_id)}
                      ></img>
                    </div>
                    <div
                      className="content-details fadeIn-bottom"
                      onClick={openModal}
                    >
                      <h3>Quick View</h3>
                    </div>
                    {modalOpen && (
                      <div className="modal">
                        <span className="close" onClick={closeModal}>
                          &times;
                        </span>
                        <div className="modal-content">
                          <img
                            src={`${product.image}`}
                            alt="mens_dress"
                            className="model-side-img"
                          />
                          <img
                            src={`${product.image}`}
                            className="model-side-img1"
                            alt="mens_dress"
                          />
                          <img
                            src={`${product.image}`}
                            className="model-side-img2"
                            alt="mens_dress"
                          />
                          <img
                            src={`${product.image}`}
                            className="model-main-img"
                            alt="mens_dress"
                          />
                        </div>
                        <div className="modal-detail">
                          <h2>
                            {`${product.model}-${product.gender}`.toUpperCase()}
                          </h2>
                          <h3>Category Detail</h3>
                          <h5>#TBB{product.product_detail_id}</h5>
                          <div className="mcolor">
                            <h4>Available Colors</h4>
                            <div className="color-box">
                              <div className="circle-container0">
                                <div
                                  className={`circles black ${
                                    selectedColor === "Red" ? "selected" : ""
                                  }`}
                                  onClick={() => selectColor("Red")}
                                ></div>
                                <div className="color-name">Red</div>
                              </div>
                              <div className="circle-container1">
                                <div
                                  className={`circles black ${
                                    selectedColor === "Blue" ? "selected" : ""
                                  }`}
                                  onClick={() => selectColor("Blue")}
                                ></div>
                                <div className="color-name">Blue</div>
                              </div>
                              <div className="circle-container1">
                                <div
                                  className={`circles black ${
                                    selectedColor === "Black" ? "selected" : ""
                                  }`}
                                  onClick={() => selectColor("Black")}
                                ></div>
                                <div className="color-name">Black</div>
                              </div>
                            </div>
                          </div>

                          <div className="size">
                            <h4>Available Size</h4>
                            <div className="circle-container">
                              <div
                                className={`circles black ${
                                  selectedSize === "S" ? "selected" : ""
                                }`}
                                onClick={() => selectSize("S")}
                              >
                                S
                              </div>
                              <div
                                className={`circles black ${
                                  selectedSize === "M" ? "selected" : ""
                                }`}
                                onClick={() => selectSize("M")}
                              >
                                M
                              </div>
                              <div
                                className={`circles black ${
                                  selectedSize === "L" ? "selected" : ""
                                }`}
                                onClick={() => selectSize("L")}
                              >
                                L
                              </div>
                            </div>
                          </div>

                          <div className="details">
                            <p className="price-details">
                              <p>RS.{product.price} </p>
                              <span className="discounted-price">
                                RS.2500
                              </span>{" "}
                              80%
                            </p>
                            <input
                              type="number"
                              id="quantity"
                              placeholder="Enter quantity"
                              value={quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                            />

                            <div className="button-container">
                              <button
                                className="button add-to-bag"
                                onClick={() =>
                                  addToBag(product.product_detail_id)
                                }
                              >
                                Add to Bag
                              </button>
                              <button class="button more-details">
                                More Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="container">
                    <div className="circle"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                  </div>
                  <div className="text">
                    <p className="product-name">
                      {`${product.model}-${product.gender}`.toUpperCase()}
                    </p>
                    <p className="price-details">
                      <p>RS.{product.price} </p>
                      <span className="discounted-price">RS.2500</span> 80%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="view">
        <button className="view-all" onClick={() => navigate("/Mens")}>
          View All
        </button>
      </div>
      <div className="mens">
        <div className="category">
          <p>WOMEN'S WARE</p>
          <div className="underscore"></div>
          <div className="plist">
            <h4
              onClick={() => {
                handleClick("sarees", "womens");
              }}
            >
              SAREES
            </h4>
            <h4
              onClick={() => {
                handleClick("Kurtis", "womens");
              }}
            >
              KURTHIS
            </h4>
            <h4
              onClick={() => {
                handleClick("short", "womens");
              }}
            >
              SHORTS
            </h4>
          </div>
        </div>
        <div className="productlist">
          {products1.map((product) => (
            <div
              className="products-list-container"
              key={product.product_detail_id}
            >
              <div className="pic">
                <div>
                  <div className="content">
                    <div className="content-overlay"></div>
                    <img
                      src={`${product.image}`}
                      alt="mens_dress"
                      className="m3"
                    ></img>
                    <div className="image-container">
                      <img src={plain} alt="wishlist" className="plain"></img>
                      <img
                        src={active}
                        alt="active"
                        className="active"
                        onClick={() => addToWishlist(product.product_detail_id)}
                      ></img>
                    </div>
                    <div
                      className="content-details fadeIn-bottom"
                      onClick={openModal1}
                    >
                      <h3>Quick View</h3>
                    </div>
                    {modalOpen1 && (
                      <div className="modal">
                        <span className="close" onClick={closeModal1}>
                          &times;
                        </span>
                        <div className="modal-content">
                          <img
                            src={`${product.image}`}
                            className="model-side-img2"
                            alt="mens_dress"
                          />
                          <img
                            src={`${product.image}`}
                            alt="mens_dress"
                            className="model-side-img"
                          />
                          <img
                            src={`${product.image}`}
                            className="model-side-img1"
                            alt="mens_dress"
                          />
                          <img
                            src={`${product.image}`}
                            className="model-main-img"
                            alt="mens_dress"
                          />
                        </div>
                        <div className="modal-detail">
                          <h2>
                            {`${product.model}-${product.gender}`.toUpperCase()}
                          </h2>
                          <h3>Category Detail</h3>
                          <h5>#TBB{product.product_detail_id}</h5>
                          <div className="mcolor">
                            <h4>Available Colors</h4>
                            <div className="color-box">
                              <div className="circle-container0">
                                <div
                                  className={`circles black ${
                                    selectedColor === "Red" ? "selected" : ""
                                  }`}
                                  onClick={() => selectColor("Red")}
                                ></div>
                                <div className="color-name">Red</div>
                              </div>
                              <div className="circle-container1">
                                <div
                                  className={`circles black ${
                                    selectedColor === "Blue" ? "selected" : ""
                                  }`}
                                  onClick={() => selectColor("Blue")}
                                ></div>
                                <div className="color-name">Blue</div>
                              </div>
                              <div className="circle-container1">
                                <div
                                  className={`circles black ${
                                    selectedColor === "Black" ? "selected" : ""
                                  }`}
                                  onClick={() => selectColor("Black")}
                                ></div>
                                <div className="color-name">Black</div>
                              </div>
                            </div>
                          </div>

                          <div className="size">
                            <h4>Available Size</h4>
                            <div className="circle-container">
                              <div
                                className={`circles black ${
                                  selectedSize === "S" ? "selected" : ""
                                }`}
                                onClick={() => selectSize("S")}
                              >
                                S
                              </div>
                              <div
                                className={`circles black ${
                                  selectedSize === "M" ? "selected" : ""
                                }`}
                                onClick={() => selectSize("M")}
                              >
                                M
                              </div>
                              <div
                                className={`circles black ${
                                  selectedSize === "L" ? "selected" : ""
                                }`}
                                onClick={() => selectSize("L")}
                              >
                                L
                              </div>
                            </div>
                          </div>
                          <div className="details">
                            <p className="price-details">
                              <p>RS.{product.price} </p>
                              <span className="discounted-price">
                                RS.2500
                              </span>{" "}
                              80%
                            </p>
                            <input
                              type="number"
                              id="quantity"
                              placeholder="Enter quantity"
                              value={quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                            />
                            <div className="button-container">
                              <button
                                class="button add-to-bag"
                                onClick={() =>
                                  addToBag(product.product_detail_id)
                                }
                              >
                                Add to Bag
                              </button>
                              <button class="button more-details">
                                More Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="container">
                    <div className="circle"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                  </div>
                  <div className="text">
                    <p className="product-name">
                      {`${product.model}-${product.gender}`.toUpperCase()}
                    </p>
                    <p className="price-details">
                      <p>RS.{product.price} </p>
                      <span className="discounted-price">RS.2500</span> 80%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="view">
        <button className="view-all" onClick={() => navigate("/Womens")}>
          View All
        </button>
      </div>
      <div className="footer">
        <div className="footer-content">
          <div className="fleft">
            <img src={logo} alt="logo" className="footlogo"></img>
            <div className="social">
              find us online
              <div className="social-app">
                <span>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.625 29.5V29.75H20.875H28.25C29.0773 29.75 29.75 29.0773 29.75 28.25V3.75C29.75 2.92272 29.0773 2.25 28.25 2.25H3.75C2.92272 2.25 2.25 2.92272 2.25 3.75V28.25C2.25 29.0773 2.92272 29.75 3.75 29.75H17H17.25V29.5V20.375V20.125H17H13.1875V16.75H17H17.25V16.5V12.3235C17.25 10.8703 17.8397 9.48705 18.9165 8.42774C19.9621 7.39922 21.3613 6.8125 22.75 6.8125C23.3197 6.8125 24.5414 6.93123 25.3125 7.03104V10.1875H22.75C21.5431 10.1875 20.625 11.1056 20.625 12.3125V16.5V16.75H20.875H25.0611L24.655 20.125H20.875H20.625V20.375V29.5ZM3.75 0.25H28.25C30.1798 0.25 31.75 1.8202 31.75 3.75V28.25C31.75 30.1798 30.1798 31.75 28.25 31.75H3.75C1.8202 31.75 0.25 30.1798 0.25 28.25V3.75C0.25 1.8202 1.8202 0.25 3.75 0.25Z"
                      fill="black"
                      stroke="#FAFBFC"
                      stroke-width="0.5"
                    />
                  </svg>
                </span>
                <span>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M31.2375 7.07221C31.6666 8.75398 31.6904 10.4085 31.7127 12.0402C31.7288 13.2082 31.7456 14.5913 31.7488 15.9975V16.0023C31.7456 17.4085 31.7288 18.7916 31.7127 19.9596C31.6904 21.5913 31.6668 23.2456 31.2375 24.9276C30.7468 26.8502 29.7842 28.4006 28.3794 29.5459L28.3794 29.5459C26.9203 30.7356 25.085 31.4323 23.0671 31.5551C20.9142 31.6861 18.702 31.7499 16.3149 31.7499C16.2089 31.7499 16.1035 31.7499 15.9975 31.7494L15.9957 31.7494C13.4921 31.7555 11.1798 31.6919 8.93169 31.5551C6.91381 31.4323 5.07846 30.7356 3.61941 29.5459C2.21485 28.4006 1.25195 26.8502 0.761279 24.9276C0.332221 23.2458 0.308377 21.5915 0.28611 19.9596L0.286109 19.9596C0.270002 18.7918 0.253419 17.4089 0.250001 16.0028C0.253419 14.5909 0.270002 13.208 0.286109 12.0402L0.28611 12.0402C0.308377 10.4085 0.332214 8.75425 0.761279 7.07223C1.25195 5.1496 2.21485 3.59924 3.61941 2.45391C5.07846 1.26421 6.9138 0.567542 8.93193 0.444761C11.18 0.308151 13.4929 0.244306 16.0018 0.2504L16.003 0.250398C18.5074 0.245037 20.819 0.308153 23.0671 0.444762C25.085 0.567541 26.9203 1.26421 28.3794 2.45392L28.3794 2.45393C29.7842 3.59923 30.7468 5.14957 31.2375 7.07221ZM31.2375 7.07221L31.4797 7.01041M31.2375 7.07221C31.2375 7.07222 31.2375 7.07222 31.2375 7.07223L31.4797 7.01041M31.4797 7.01041C31.9172 8.72525 31.9404 10.4088 31.9626 12.0368C31.9788 13.205 31.9956 14.5893 31.9988 15.997M31.4797 7.01041C30.977 5.04068 29.9873 3.44229 28.5373 2.26016L31.9988 15.997M31.9988 15.997V16.0028C31.9956 17.4106 31.9788 18.7948 31.9626 19.963L31.9626 19.9633C31.9404 21.5912 31.9174 23.2744 31.4797 24.9894C30.977 26.9591 29.9873 28.5575 28.5373 29.7397L31.9988 15.997ZM27.1155 27.9959L27.1155 27.9959C25.9613 28.9371 24.5553 29.4609 22.9456 29.5588C20.739 29.6929 18.4683 29.7553 15.9964 29.7494C13.5312 29.7555 11.2597 29.6929 9.05319 29.5585C9.05318 29.5585 9.05317 29.5585 9.05316 29.5585L9.06836 29.309C7.50586 29.214 6.15112 28.7069 5.04126 27.8022L27.1155 27.9959ZM27.1155 27.9959C28.1879 27.1213 28.9206 25.9182 29.2996 24.4331C29.6712 22.9766 29.6925 21.419 29.7127 19.9468L29.7129 19.9323C29.7287 18.7717 29.7454 17.396 29.7488 16.0005L29.7488 15.9993M27.1155 27.9959L29.7488 15.9993M29.7488 15.9993C29.7454 14.6036 29.7287 13.2282 29.7129 12.0675L29.7127 12.053C29.6925 10.5809 29.6712 9.02319 29.2996 7.56652L29.0574 7.62833M29.7488 15.9993L29.0574 7.62833M29.0574 7.62833L29.2996 7.56651C28.9206 6.08136 28.1879 4.87827 27.1155 4.00368L27.1155 4.00365M29.0574 7.62833L27.1155 4.00365M27.1155 4.00365C25.9613 3.0627 24.5553 2.53889 22.9456 2.44105M27.1155 4.00365L22.9456 2.44105M22.9456 2.44105C20.739 2.30667 18.4682 2.24478 16.0022 2.25015C13.5307 2.24429 11.2597 2.30667 9.05316 2.44105H22.9456ZM15.9368 23.5624C11.7672 23.5624 8.37427 20.1697 8.37427 15.9999C8.37427 11.8301 11.7672 8.43741 15.9368 8.43741C20.1066 8.43741 23.4993 11.8301 23.4993 15.9999C23.4993 20.1697 20.1066 23.5624 15.9368 23.5624ZM15.9368 10.4374C12.8695 10.4374 10.3743 12.9326 10.3743 15.9999C10.3743 19.0672 12.8695 21.5624 15.9368 21.5624C19.0043 21.5624 21.4993 19.0672 21.4993 15.9999C21.4993 12.9326 19.0043 10.4374 15.9368 10.4374ZM22.9993 7.56241C22.9993 6.66486 23.7269 5.93741 24.6243 5.93741C25.5218 5.93741 26.2493 6.66484 26.2493 7.56241C26.2493 8.45998 25.5218 9.18741 24.6243 9.18741C23.7269 9.18741 22.9993 8.45996 22.9993 7.56241Z"
                      fill="black"
                      stroke="#FAFBFC"
                      stroke-width="0.5"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div className="policy">
            <h4>Policies</h4>
          Terms of service<br/>
          Privacy Policy<br/>
          Refund Policy<br/>
            Shipping Policy
          </div>
          <div className="contact">
            <h4>Contact Us</h4>
          Phone: 044-000000000<br/>
          Email: email@gmail.com<br/>
          Address:<br/> 
          </div>
        </div>
        <div className="rights">© Copyright Whirldata. All Rights Reserved</div>
      </div>
    </div>
  );
}

export default Home;
