import React from 'react';

const backgroundStyle = {
  backgroundImage: "url('https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1718&q=80')",
  height: '100vh'
};

const BackgroundImage = () => {
  return (
    <div className="bg-image" style={backgroundStyle}>
      {/* Content goes here */}
    </div>
  );
}

export default BackgroundImage;