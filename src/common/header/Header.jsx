import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.div`
  position: fixed;
  width: 1920px;
  height: 90px;
  left: 0;
  top: 0;

  background: #ffffff;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);

  display: flex;
  justify-content: space-between;
  align-items: Center;

  a {
    text-decoration: none;
    color: black;
  }
`;
const LogoArea = styled.h1`
  position: absolute;
  width: 159px;
  height: 42px;
  margin-left: 240px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 35px;
  line-height: 42px;

  color: #795b5b;
`;
const ProfileArea = styled.div`
  position: absolute;
  width: 200px;
  height: 24px;
  margin-left: 1500px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;

  color: #000000;

  .name {
    display: flex;
    align-items: center;
  }

  .logout {
    margin-top: 5px;
    margin-left: 10px;
    font-size: 10px;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState(null);

  const navigateHome = () => {
    navigate("/");
  };

  const getName = () => {
    setName(localStorage.getItem("name"));
  };

  const logout = () => {
    localStorage.clear();
    setName(null);
  };

  useEffect(() => {
    getName();
  }, [location.pathname]);

  return (
    <HeaderContainer>
      <LogoArea onClick={navigateHome}>Naeglog</LogoArea>
      <ProfileArea>
        {name ? (
          <div className="name">
            {name}
            <div className="logout" onClick={logout}>
              로그아웃
            </div>
          </div>
        ) : (
          <a href="/user/login">로그인</a>
        )}
      </ProfileArea>
    </HeaderContainer>
  );
};

export default Header;
