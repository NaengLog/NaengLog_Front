import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { creatBoard } from "../../api/board/Board.api";

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

const Write = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState();
  const [image, setImage] = useState(null);
  const token = localStorage.getItem("token");

  const onChangeImage = (e) => {
    let file = e.target.files[0];
    setImage(file);
  };

  const onChangeBoard = (e) => {
    setBoard({
      ...board,
      [e.target.name]: e.target.value,
    });
  };

  const navigateWrite = async () => {
    let frm = null;
    if (image) {
      frm = new FormData();
      frm.append("preview", image);
    }
    const response = await creatBoard(frm, board, token);
    if (response === 403) {
      alert("로그인을 해주세요.");
    }
    navigate("/");
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
            onChange={onChangeBoard}
          />
        </div>
        <div>
          <input type="file" className="file" onChange={onChangeImage} />
        </div>
      </WriteStyle>
      <WriteButton onClick={navigateWrite}>작성</WriteButton>
    </WriteConatiner>
  );
};

export default Write;
