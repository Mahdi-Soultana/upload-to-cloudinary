const form = document.querySelector("form");
const file = document.querySelector("#file");
const img = document.querySelector("img");
const button = document.querySelector("button");
const notification = document.querySelector(".result");
const url = document.querySelector("#url");
const close = document.querySelector(".close");
const audio = document.querySelector("audio");
const inputs = [...document.querySelectorAll("input")];
inputs.forEach((input) => {
  input.addEventListener("input", () => disableBtn(inputs));
});
function disableBtn(inputs) {
  const isDisabled = inputs.every((input) => !!input.value.trim());
  button.disabled = !isDisabled;
}

let value;
let isValid = true;

file.addEventListener("input", (e) => {
  e.preventDefault();
  const file = e.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const types = ["data:image/", "data:audio/"];

      if (reader.result.includes(types[0])) {
        img.src = reader.result;
        value = reader.result;
      }
      if (reader.result.includes(types[1])) {
        img.src =
          "https://image.shutterstock.com/image-vector/audio-file-line-icon-outline-260nw-472254040.jpg";
        audio.src = reader.result;
        value = reader.result;
        audio.classList.add("block");
      }
    };
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { name, email, file } = e.target;

  if (name.value && email.value && file.files.length) {
    try {
      button.disabled = true;
      const data = await fetch("/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: name.value,
          name: email.value,
          file: value,
        }),
      }).then((res) => res.json());
      notification.classList.add("block");
      url.textContent = data.secure_url || "notttttt workkng";
      url.href = data.secure_url;

      button.disabled = false;
      name.value = "";
      email.value = "";
      file.files.lenght = 0;
      disableBtn(inputs);
    } catch (e) {
      disableBtn(inputs);
    }
  } else {
    disableBtn(inputs);
  }
});

close.addEventListener("click", () => {
  notification.classList.remove("block");
});
