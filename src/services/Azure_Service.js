const host = "https://deploybackend-production.up.railway.app/";
var uploadFile = async (file) => {
  const formdata = new FormData();
  formdata.append("file", file);
  const res = await fetch(
    `${host}/azure/upload`,
    {
      method: "post",
      body: formdata,
    }
  );
  const data = await res.text();
  return data;
};
export { uploadFile };
