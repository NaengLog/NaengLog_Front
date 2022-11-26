import styled from "styled-components";
import SideItem from "./item/SideItem";
import latestPostIcon from "../../assets/latest.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLatestPostList } from "../../api/board/Board.api";

const SideBarContainer = styled.div`
  position: fixed;
  width: 280px;
  height: 500px;
  left: 1350px;
  top: 140px;

  display: flex;
  flex-direction: column;
`;

const SearchContainer = styled.div`
  width: 273px;
  padding-left: 20px;
  border-radius: 5px;

  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
`;

const SearchArea = styled.input`
  width: 250px;
  height: 44px;
  border: none;

  &::placeholder {
    left: 100px;
  }
`;

const WriteButton = styled.button`
  width: 70px;
  height: 44px;
  border: none;

  margin-top: 46px;

  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.25);
  border-radius: 5px;

  color: #757575;
`;

const LatestPostArea = styled.div`
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 23px;

  color: #292930;

  padding-top: 46px;

  width: 183px;
  height: 23px;

  .latest {
    display: flex;
  }

  .latestPostIcon {
    margin-right: 5px;
    width: 20px;
  }
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [item, setItem] = useState([]);

  const navigateWrite = () => {
    if (location.pathname === "/") {
      navigate("/write");
    } else {
      navigate(`/update/${location.pathname.split("/")[2]}`);
    }
  };

  useEffect(() => {
    getLatestItem();
  }, [location.pathname]);

  const getLatestItem = async () => {
    const result = await getLatestPostList();
    setItem(result);
  };

  return (
    <SideBarContainer>
      <SearchContainer>
        <SearchArea placeholder="Search"></SearchArea>
      </SearchContainer>
      <LatestPostArea>
        <div className="latest">
          <img
            src={latestPostIcon}
            alt="latestPostIcon"
            className="latestPostIcon"
          />
          Latest Post
        </div>
        {item.map((value) => (
          <SideItem data={value}></SideItem>
        ))}
        <WriteButton
          onClick={navigateWrite}
          style={
            (location.pathname === "/write") | "update"
              ? { display: "none" }
              : { display: "block" }
          }
        >
          {location.pathname === "/" ? "Write" : "Update"}
        </WriteButton>
      </LatestPostArea>
    </SideBarContainer>
  );
};

export default Sidebar;
