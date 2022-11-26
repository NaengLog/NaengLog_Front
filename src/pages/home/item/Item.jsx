import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import viewIcon from "../../../assets/view.png";

const ItemStyle = styled.div`
  width: 958px;
  height: 350px;

  margin-top: 50px;
  border-radius: 10px;
  border: 1px solid white;

  .title {
    margin-left: 37.47%;
    margin-top: 60px;

    font-family: "DM Sans";
    font-style: normal;
    font-weight: 500;
    font-size: 28px;
    line-height: 36px;
    display: flex;
    align-items: center;

    color: #292930;
  }

  .content {
    margin-left: 37.47%;
    margin-top: 20px;

    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    /* or 162% */

    color: #333333;
  }

  .info {
    margin-top: 90px;
    margin-left: 37.47%;
  }

  .author {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;

    color: rgba(40, 47, 54, 0.8);
  }

  .container {
    display: flex;

    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;

    color: rgba(40, 47, 54, 0.8);
  }

  .itemImage {
    position: absolute;
    border-radius: 5px;

    display: flex;
    flex-direction: center;
    align-items: center;

    width: 250px;
    height: 300px;

    margin-top: 20px;
    margin-left: 20px;
  }

  .view {
    margin-left: 20px;
    display: flex;
  }

  .viewIcon {
    margin-right: 5px;
    width: 15px;
  }

  .date {
    margin-top: 10px;

    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;

    color: rgba(40, 47, 54, 0.8);
  }
`;

const Item = ({ data }) => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const navigateView = () => {
    navigate(`/view/${data.postId}`);
  };
  useEffect(() => {
    getImage();
  }, []);

  const getImage = async () => {
    const value = "http://localhost:8080" + data.attachmentUrls[0];
    setImage(value);
  };

  return (
    <ItemStyle>
      <img src={image} alt="itemImage" className="itemImage" />
      <div className="title" onClick={navigateView}>
        {data.title}
      </div>
      <div className="content">{data.content}</div>
      <div className="info">
        <div className="container">
          <div className="author">{data.author}</div>
          <div className="view">
            <img src={viewIcon} alt="view" className="viewIcon" />
            {data.view}
          </div>
        </div>
        <div className="date">{data.createdAt}</div>
      </div>
    </ItemStyle>
  );
};

export default Item;
