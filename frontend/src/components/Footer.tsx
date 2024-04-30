import { FC } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';



const Footer: FC = () => {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <footer>

      <Stack direction="row" spacing={2}>
        <Item>
          <Link className="nav_link" to="/">
            Wallet
          </Link>
        </Item>
        <Item>
          <Link className="nav_link" to="/view-all-expense">
            View All Expense
          </Link>
        </Item>
        <Item>
          <Link className="nav_link" to="/create-expense">
            Create Expense
          </Link>
        </Item>
        <Item>
          <Link className="nav_link" to="/view-expense">
            View Expense
          </Link>
        </Item>
        <Item>
          <Link className="nav_link" to="/update-expense">
            Update Expense
          </Link>
        </Item>
        <Item>
          <Link className="nav_link" to="/delete-expense">
            Delete Expense
          </Link>
        </Item>
      </Stack>
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
    </footer>
  );
};

export default Footer;