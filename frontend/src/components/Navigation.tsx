import { FC } from 'react';
// import { Link } from 'react-router-dom';
import { FidgetSpinner } from 'react-loader-spinner'

const Navigation: FC = () => {
  return (
    <header>
      <FidgetSpinner
       backgroundColor="#4D36F6"
       height="40"
       width="40"
       ariaLabel="fidget-spinner-loading"
       wrapperStyle={{}}
       wrapperClass="fidget-spinner-wrapper"
        visible={true}
        />
      <div className="logo mylogo">Expense Tracker 
      </div>
      {/* <nav>
        <ul>
          <li>
            <Link className="nav_link" to="/">
              Wallet
            </Link>
          </li>
          <li>
            <Link className="nav_link" to="/view-all-expense">
              View All Expense
            </Link>
          </li>
          <li>
            <Link className="nav_link" to="/create-expense">
              Create Expense
            </Link>
          </li>
          <li>
            <Link className="nav_link" to="/view-expense">
              View Expense
            </Link>
          </li>
          <li>
            <Link className="nav_link" to="/update-expense">
              Update Expense
            </Link>
          </li>
          <li>
            <Link className="nav_link" to="/delete-expense">
              Delete Expense
            </Link>
          </li>
        </ul>
      </nav> */}
    </header>
  );
};

export default Navigation;