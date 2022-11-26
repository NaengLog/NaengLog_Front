import { useRef } from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getBoardList } from "../../api/board/Board.api";
import Item from "./item/Item";

const ListContainer = styled.div`
  position: absolute;

  top: 100px;
  left: 320px;

  width: 958px;
  height: 100vh - 100px;
  z-index: -1;

  overflow: scroll;
`;

const Home = () => {
  const [item, setItem] = useState([]);
  const count = useRef(0);
  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [endData, setEndData] = useState(false);

  useEffect(() => {
    // getItem();
  }, []);

  const getMoreItem = async () => {
    if (endData) {
      return;
    }
    setIsLoaded(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    await getItem();
    setIsLoaded(false);
  };

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await getMoreItem();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  const getItem = async () => {
    const value = await getBoardList(count.current++);
    console.log(count);
    if (value.length === 0) {
      setEndData(true);
    }
    setItem((prev) => [...prev, ...value]);
  };

  return (
    <ListContainer>
      {item.map((value) => (
        <Item data={value}></Item>
      ))}
      <div ref={setTarget}>{isLoaded && <div>Loading</div>}</div>
    </ListContainer>
  );
};

export default Home;
