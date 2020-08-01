import React from 'react'
//import Cookies from 'universal-cookie'
// import ReactGA from 'react-ga'
// ReactGA.initialize('UA-171764678-1');
// ReactGA.pageview(window.location.pathname + window.location.search);

class Footer extends React.Component {
  render() {
    return (
      
      <footer className="footer bg-info border-top">
        <div className="container">
          <ul className="foote_bottom_ul_amrc">
            <li><a href="/">Home</a></li>
            <li><a href="/">Privacy Policy</a></li>
            <li><a href="/">Terms & Conditions</a></li>
          </ul>
          <p className="text-center"> © Copyright 2020. All Rights Reserved.</p>
          <ul className="social_footer_ul">
            <li><a href="/"><i className="fa fa-facebook"></i></a></li>
            <li><a href="/"><i className="fa fa-twitter"></i></a></li>
            <li><a href="/"><i className="fa fa-linkedin"></i></a></li>
            <li><a href="/"><i className="fa fa-instagram"></i></a></li>
          </ul>
        </div>
      </footer>
    );
  }
}

export default Footer;
