import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import viewIcon from "../../../assets/view.png";

const ItemStyle = styled.div`
  width: 257px;
  height: 100px;

  margin-top: 20px;
  border-radius: 5px;

  .itemImage {
    margin-left: 5px;
    border-radius: 5px;
    width: 90px;
  }

  .viewIcon {
    width: 15px;
  }

  .info {
    display: flex;
  }

  .content {
    margin-top: 20px;
    margin-left: 10px;
  }

  .container {
    display: flex;
    margin-top: 15px;
  }

  .title {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 17px;

    color: #282f36;
  }

  .date {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 15px;
    /* identical to box height */

    color: #93969a;
  }

  .view {
    display: flex;
    margin-left: 8px;

    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    /* identical to box height */

    color: #282f36;
  }
`;

const SideItem = ({ data }) => {
  const navigate = useNavigate();
  const [image, setImage] = useState();

  const navigateView = () => {
    navigate(`/view/${data.postId}`);
  };

  useEffect(() => {
    getImage();
  }, [data]);

  const getImage = () => {
    const value = "http://localhost:8080" + data.attachmentUrls[0];
    setImage(value);
    console.log("request");
  };

  return (
    <ItemStyle>
      <div className="info">
        <img src={image} alt="itemImage" className="itemImage" />
        <div className="content">
          <div className="title" onClick={navigateView}>
            {data.title}
          </div>
          <div className="container">
            <div className="date">{data.createdAt}</div>
            <div className="view">
              <img src={viewIcon} alt="iconf" className="viewIcon" />
              {data.view}
            </div>
          </div>
        </div>
      </div>
    </ItemStyle>
  );
};

export default SideItem;
