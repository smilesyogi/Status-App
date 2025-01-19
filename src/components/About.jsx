import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const About = () => {
  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f7fc' }}>
      {/* Image Slider */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <Slider {...sliderSettings} style={{ width: '100%', maxWidth: '1200px' }}>
          <div>
            <img
              src="https://png.pngtree.com/illustrations/20190321/ourlarge/pngtree-blue-technology-gradient-vector-png-image_31378.jpg"
              alt="Slider Image 1"
              style={{ width: '100%', borderRadius: '8px' }}
            />
          </div>
          <div>
            <img
              src="https://png.pngtree.com/illustrations/20190329/ourmid/pngtree-technology-future-science-experiment-png-image_39533.jpg"
              alt="Slider Image 2"
              style={{ width: '100%', borderRadius: '8px' }}
            />
          </div>
          <div>
            <img
              src="https://png.pngtree.com/illustrations/20190321/ourlarge/pngtree-office-technology-the-internet-cartoon-png-image_31433.jpg"
              alt="Slider Image 3"
              style={{ width: '100%', borderRadius: '8px' }}
            />
          </div>
        </Slider>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#4CAF50' }}>About Us</h1>
        <p style={{ fontSize: '18px', color: '#333', maxWidth: '800px', margin: '0 auto' }}>
          Welcome to our status page application! This platform is designed to provide real-time updates on the operational status of various services, ensuring transparency and reliability for our users.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px', width: '45%' }}>
          <h2 style={{ color: '#333' }}>Our Mission</h2>
          <p style={{ fontSize: '16px', color: '#555' }}>
            Our mission is to empower businesses with the tools needed to monitor their service health and communicate effectively with their customers. By providing detailed insights and status tracking, we aim to build trust and enhance user experience.
          </p>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px', width: '45%' }}>
          <h2 style={{ color: '#333' }}>Key Features</h2>
          <ul style={{ fontSize: '16px', color: '#555' }}>
            <li>Real-time status updates</li>
            <li>Customizable service monitoring</li>
            <li>Detailed performance analytics</li>
            <li>Admin management for service updates</li>
          </ul>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#333' }}>Contact Us</h2>
        <p style={{ fontSize: '16px', color: '#555' }}>
          For any inquiries, feel free to reach out at{' '}
          <a href="mailto:chandewar.yogesh@gmail.com" style={{ color: '#4CAF50', textDecoration: 'none' }}>
            chandewar.yogesh@gmail.com
          </a>.
        </p>
      </div>

      {/* Image Cards for Services */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '30%' }}>
          <img
            src="https://betterstack.com/assets/v2/og_status-page-166e34cd60e48297752bf8df543bd39816229ba100297e81a39e8353a9fd553f.jpg"
            alt="Service 1"
            style={{ borderRadius: '8px 8px 0 0', width: '100%', height: '200px', objectFit: 'cover' }}
          />
          <div style={{ padding: '15px' }}>
            <h3 style={{ color: '#333' }}>Service 1</h3>
            <p style={{ fontSize: '14px', color: '#555' }}>
              Get real-time status updates and analytics on the health of your services.
            </p>
          </div>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '30%' }}>
          <img
            src="https://betterstack.com/assets/v2/incident-management/iceberg-4-c2fdbde3f760d442d2847ea667f843d97ccdff289f621cd5eafc986a42ae51ca.jpg"
            alt="Service 2"
            style={{ borderRadius: '8px 8px 0 0', width: '100%', height: '200px', objectFit: 'cover' }}
          />
          <div style={{ padding: '15px' }}>
            <h3 style={{ color: '#333' }}>Service 2</h3>
            <p style={{ fontSize: '14px', color: '#555' }}>
              Customizable service monitoring to meet your business needs.
            </p>
          </div>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '30%' }}>
          <img
            src="https://betterstack.com/assets/uptime/status-page/status-page-illustration-4cd4cac4c0787526f731d7807194ef9880e112dfb3783b1deff82a0854dd7536.png"
            alt="Service 3"
            style={{ borderRadius: '8px 8px 0 0', width: '100%', height: '200px', objectFit: 'cover' }}
          />
          <div style={{ padding: '15px' }}>
            <h3 style={{ color: '#333' }}>Service 3</h3>
            <p style={{ fontSize: '14px', color: '#555' }}>
              Performance analytics to give you insights into your service operations.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;
