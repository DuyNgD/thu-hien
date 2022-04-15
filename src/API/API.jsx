export const getListUserInfo = () => {
  let listUserInfo = [];

  if (isLocalStorageExisted())
    listUserInfo = JSON.parse(localStorage.getItem("userInfo"))

  return listUserInfo;
}

export const saveListUserInfo = async (listUserInfo) => {
  // Map key to each user info
  listUserInfo = await listUserInfo.map((info, idx) => {
    info.key = (idx + 1).toString();

    return info;
  });

  localStorage.setItem("userInfo", JSON.stringify(listUserInfo));
}

export const clearListUserInfo = () => {
  localStorage.setItem("userInfo", "[]");
}

const isLocalStorageExisted = () => {
  if (!localStorage.getItem("userInfo"))
    localStorage.setItem("userInfo", "[]");

  try {
    JSON.parse(localStorage.getItem("userInfo"));
  } catch (e) {
    localStorage.setItem("userInfo", "[]");
  }

  return true;
};