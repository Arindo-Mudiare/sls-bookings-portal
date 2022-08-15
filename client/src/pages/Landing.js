import main from "../assets/svg/delivery-svgrepo-com.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <main>
        <nav>
          <Logo />
        </nav>
        <div className="container page">
          {/* info div */}
          <div className="info">
            <h1 className="sls-red">
              Welcome to<br></br> <span>SLS Portation</span>
            </h1>
            <p>
              Your one stop logistics service for you.<br></br>
              Your Dispatch and Haulage needs made easier, better, faster to
              your satisfaction. <br />
              <span className="sls-red">SLSPortation…..Fast Delivery</span>
            </p>
            <Link to="/login" className="btn btn-hero">
              Login/Register
            </Link>
          </div>
          {/* image container */}
          <img src={main} alt="SLS Booking Portal" className="img main-img" />
        </div>
      </main>
    </Wrapper>
  );
};

export default Landing;
