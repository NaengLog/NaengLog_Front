import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getBoard, updateBoard } from "../../../api/board/Board.api";

const WriteConatiner = styled.div`
  position: absolute;
  top: 175px;
  left: 320px;
  width: 800px;
  height: 680px;
  /* border: 1px solid black; */
`;

const WriteStyle = styled.div`
  input {
    border: none;
    font-size: 20px;

    outline: none;
  }

  .top {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .title {
    margin-top: 10px;
    margin-left: 20px;

    width: 580px;
    height: 50px;

    &::placeholder {
      left: 100px;

      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      font-size: 25px;
      line-height: 30px;

      color: rgba(0, 0, 0, 0.5);
    }
  }

  .title_line {
    width: 800px;
    height: 1px;

    border: 1px solid #000000;
  }

  .content {
    width: 800px;
    height: 500px;

    margin-top: 40px;
    border: 2px solid #000000;
    border-radius: 5px;

    font-family: "Inter";
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 30px;

    &::placeholder {
      position: absolute;
      top: 20px;
      left: 20px;

      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      font-size: 25px;
      line-height: 30px;

      color: rgba(0, 0, 0, 0.5);
    }
  }
  textarea {
    padding: 20px;
    resize: none;
  }

  .file {
    margin-top: 10px;
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

const Update = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [board, setBoard] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    getBoardItem();
  }, []);

  const onChangeBoard = (e) => {
    setBoard({
      ...board,
      [e.target.name]: e.target.value,
    });
  };

  const navigateWrite = async () => {
    const response = await updateBoard(id, board, token);
    if (response === 400) {
      alert("자신이 작성한 게시물만 수정이 가능합니다.");
    } else if (response === 403) {
      alert("로그인을 해주세요.");
    }
    navigate("/");
  };

  const getBoardItem = async () => {
    const result = await getBoard(id);
    setBoard((prev) => {
      return {
        ...prev,
        title: result.title,
        content: result.content,
      };
    });
  };

  return (
    <WriteConatiner>
      <WriteStyle>
        <div className="top">
          <div>
            <input
              type="text"
              placeholder="제목"
              name="title"
              className="title"
              value={board && board.title}
              onChange={onChangeBoard}
            />
            <div className="title_line"></div>
          </div>
        </div>
        <div>
          <textarea
            type="text"
            placeholder="내용"
            name="content"
            className="content"
            value={board && board.content}
            onChange={onChangeBoard}
          />
        </div>
      </WriteStyle>
      <WriteButton onClick={navigateWrite}>수정</WriteButton>
    </WriteConatiner>
  );
};

export default Update;
