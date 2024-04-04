const host = process.env.REACT_APP_HOST;
var uploadFile = async (file) => {
  const formdata = new FormData();
  formdata.append("file", file);
  const res = await fetch(`${host}/azure/upload`, {
    method: "post",
    body: formdata,
  });
  const data = await res.text();
  return data;
};

var uploadAudio = async (blob) => {
  const formdata = new FormData();
  formdata.append("file", blob, "audio.mp3");
  const res = await fetch(`${host}/azure/upload`, {
    method: "post",
    body: formdata,
  });
  const data = await res.text();
  return data;
};

export { uploadFile, uploadAudio };
