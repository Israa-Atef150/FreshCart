import React from 'react';

const AboutUs = () => {
  return (
    <div style={{ margin: '20px', textAlign: 'center' }}>
       <img src="https://atozksa.com/en/images/slider-about.png" alt="" /> 
      <section style={styles.styletext}>
        
        <p style={styles.textStyle} > <h2>Our Story</h2> This is the story of how our company was founded...</p>
        <img src="https://images.pexels.com/photos/7807785/pexels-photo-7807785.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Our Story" style={styles.imageStyle} />
      </section>
     
    
    </div>
  );
};

const styles = {

 
  memberImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
  },
  buttonStyle: {
    backgroundColor: '#000',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
  },
  statsSection: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  statCard: {
    margin: '10px',
    textAlign: 'center',
  },
 
  textStyle: {
    maxWidth: '400px', // تحديد أقصى عرض للفقرة
  }, 
  styletext:{
    display: 'flex',
    alignItems: 'center',
    gap: '20px', 
  }
};

export default AboutUs;