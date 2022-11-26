import styled from "styled-components";

const LayoutStyle = styled.div`
  padding-top: 64px;
`;

const Layout = ({ children }) => {
  return <LayoutStyle>{children}</LayoutStyle>;
};

export default Layout;
