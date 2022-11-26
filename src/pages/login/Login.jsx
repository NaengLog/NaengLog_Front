import React from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loginRequest } from "../../api/board/User.api";

const LoginContainer = styled.div`
  width: 650px;
  height: 555px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  margin: 0 auto;
  margin-top: 172px;

  h1 {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 50px;
    line-height: 61px;
    /* identical to box height */

    color: #795b5b;
  }

  input {
    border: none;
    outline: none;
    border-bottom: 2px solid #000000;

    width: 650px;
    height: 80px;

    padding: 0;
    margin: 0;

    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
  }

  button {
    width: 650px;
    height: 80px;

    background: #ffffff;
    border: 2px solid #000000;
    border-radius: 20px;

    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 36px;

    color: #000000;
  }
  div {
    text-align: center;

    p {
      font-family: "Inter";
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 22px;
      /* identical to box height */

      color: #000000;
      margin-top: 10px;
    }
  }
`;

const Login = () => {
  const id = useRef();
  const pw = useRef();
  const navigate = useNavigate();

  const login = async () => {
    const response = await loginRequest(id.current.value, pw.current.value);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("name", response.data.name);
    navigate("/");
  };

  return (
    <LoginContainer>
      <h1>로그인</h1>
      <input
        type="text"
        name=""
        id=""
        placeholder="아이디를 입력해주세요"
        ref={id}
      />
      <input
        type="password"
        name=""
        id=""
        ref={pw}
        placeholder="비밀번호를 입력해주세요"
      />
      <div>
        <button onClick={login}>LOGIN</button>
        <p>
          회원이 아닌신가요? <Link to="/user/register">회원가입</Link>
        </p>
      </div>
    </LoginContainer>
  );
};

export default Login;
