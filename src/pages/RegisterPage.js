import AuthLayout from "../components/AuthLayout";
import Button from "../components/Button";
import Link from "../components/Link/Link";

import Onshore from "../assets/img/Onshore.jpg";

const RegisterPage = () => {
  return (
    <AuthLayout image={Onshore} pageTitle="Registration">
      <form className="form-container">
        <input className="input" placeholder="Name" />
        <input className="input" placeholder="Email" />
        <input className="input" placeholder="Password" />

        <div className="action-btn-container">
          <Link to="/login">Login</Link>
          <Button type="submit">Register</Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
