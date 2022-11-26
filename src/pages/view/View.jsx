import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getBoard } from "../../api/board/Board.api";
import viewIcon from "../../assets/view.png";

const ViewContainer = styled.div`
  position: absolute;

  top: 140px;
  left: 530px;

  width: 600px;
  height: 800px;
`;

const ViewStyle = styled.div`
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title {
    margin-top: 10px;
    font-size: 30px;
  }

  .itemImage {
    margin-top: 60px;
    width: 370px;
    height: 425px;
  }

  .content {
    margin-top: 60px;
  }

  .info {
    display: flex;
    align-items: center;
    margin-top: 100px;
  }

  .date {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 25px;
    line-height: 30px;

    color: rgba(40, 47, 54, 0.8);
  }

  .author {
    margin-left: 250px;

    font-family: "Roboto";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;

    color: rgba(40, 47, 54, 0.8);
  }

  .view {
    margin-left: 100px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    color: rgba(40, 47, 54, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .viewIcon {
    margin-right: 10px;
    width: 20px;
  }
`;

const View = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [item, setItem] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    getBoardItem();
  }, []);

  const getBoardItem = async () => {
    const response = await getBoard(id);
    setItem(response);
    setImage(`http://localhost:8080${response.attachmentUrls[0]}`);
  };

  return (
    <ViewContainer>
      <ViewStyle>
        {item && (
          <>
            <div className="container">
              <div className="title">{item.title}</div>
              <img src={image} alt="itemImage" className="itemImage" />
              <div className="content">{item.content}</div>
            </div>
            <div className="info">
              <div className="date">{item.createdAt}</div>
              <div className="author">{item.author}</div>
              <div className="view">
                <img src={viewIcon} alt="viewIcon" className="viewIcon" />
                {item.view}
              </div>
            </div>
          </>
        )}
      </ViewStyle>
    </ViewContainer>
  );
};

export default View;
