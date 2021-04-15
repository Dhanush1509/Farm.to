import React,{ useState, useContext, useEffect} from "react";
import {
  Navbar,
  Nav,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import logo from "../../logo.png";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Button from "@material-ui/core/Button";
import AuthContext from "../context/Auth/AuthContext";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));
const useStyles2 = makeStyles({
  list: {
    width: 200,
  },
  fullList: {
    width: "auto",
  },
});

function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <h2
            className="navbar__icon navbar__drawer"
            onClick={toggleDrawer(anchor, true)}
          >
            <IconButton>
              <GiHamburgerMenu>{anchor}</GiHamburgerMenu>
            </IconButton>
          </h2>

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </>
  );
}

const Appbar = () => {
   const classes = useStyles2();
   const {userInfo}=useContext(AuthContext)
   const [anchorEl, setAnchorEl] = React.useState(null);

   const handleClick = (event) => {
     setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
     setAnchorEl(null);
   };
  return (
    <>
      <Navbar bg="light" expand="lg" className="appbar__navbar">
        <TemporaryDrawer />
        <Navbar.Brand className="p-0 navbar__brand">
          <LinkContainer to="/" className="navbar__icon">
            <img
              src={logo}
              width="100"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </LinkContainer>
        </Navbar.Brand>

        <Nav className="ml-auto appbar__nav">
          {userInfo && userInfo.length > 0 ? (
            <>
              <LinkContainer to="/home" className="navbar__icon">
                <h2>
                  <IconButton>
                    <AiOutlineSearch />
                  </IconButton>
                </h2>
              </LinkContainer>
              <LinkContainer to="/" className="navbar__icon">
                <h2>
                  <IconButton>
                    <IoMdNotificationsOutline />
                  </IconButton>
                </h2>
              </LinkContainer>
              <div className="navbar__icon" onClick={handleClick}>
                <h2>
                  <IconButton>
                    <CgProfile />
                  </IconButton>
                </h2>
              </div>

              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <LinkContainer to={`/user/${userInfo[0]._id}`}>
                  <MenuItem>Profile</MenuItem>
                </LinkContainer>
                <LinkContainer to="/weather">
                  <MenuItem>Weather</MenuItem>
                </LinkContainer>

                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <div className={classes.root}>
                <LinkContainer to="/login" className="navbar__icon mr-3 my-3">
                  <Button> LOGIN </Button>
                </LinkContainer>

                <LinkContainer to="/register" className="navbar__icon my-3">
                  <Button> REGISTER </Button>
                </LinkContainer>
              </div>
            </>
          )}
        </Nav>
      </Navbar>
    </>
  );
};

export default Appbar;
