import { customAxios } from "../util/CustomAxios";

export const creatBoard = async (preview, data, token) => {
  try {
    let response = await customAxios.post(`/upload/attachments`, preview, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    });

    await customAxios.post(
      `/post/write`,
      {
        title: data.title,
        content: data.content,
        attachments: [response.data],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
  } catch (e) {
    return e.response.status;
  }
};

export const getBoardList = async (page) => {
  let response = await customAxios.get(
    `/post/list?page=${page}&size=10&sort=postId,desc`
  );
  return response.data.list;
};

export const getLatestPostList = async () => {
  let response = await customAxios.get(
    `/post/list?page=0&size=5&sort=postId,desc`
  );
  return response.data.list;
};

export const getBoard = async (postId) => {
  const response = await customAxios.get(`/post/view/${postId}`);
  return response.data;
};

export const updateBoard = async (postId, data, token) => {
  try {
    await customAxios.patch(
      `/post/update/${postId}`,
      {
        title: data.title,
        content: data.content,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
  } catch (e) {
    return e.response.status;
  }
};

export const getImage = async (attachmentUrl) => {
  const response = await customAxios.get(attachmentUrl);
  return response.data;
};
