const form = document.querySelector("form");
const file = document.querySelector("#file");
const img = document.querySelector("img");
const button = document.querySelector("button");
const notification = document.querySelector(".result");
const url = document.querySelector("#url");
const closeBtns = document.querySelectorAll(".close");
const errorDiv = document.querySelector(".error");
const audio = document.querySelector("audio");
const inputs = [...document.querySelectorAll("input")];
let error;
inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    disableBtn(inputs);
    if (e.target.id === "email") {
      let h3 = errorDiv.querySelector("h3");
      if (!e.target.value.includes("@gmail.co")) {
        console.log("email");
        errorDiv.classList.add("block");
        h3.textContent = "your email must end with : @gmail.com";
        error = true;
      } else {
        error = false;
        h3.textContent = "";
        errorDiv.classList.remove("block");
      }
    }
  });
});
function disableBtn(inputs) {
  const isDisabled = inputs.every((input) => !!input.value.trim() && !error);
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
      const types = ["data:image/", "data:audio/", "data:video/"];
      console.log(reader.result);
      if (reader.result.includes(types[0])) {
        img.src = reader.result;
        value = reader.result;
      } else if (reader.result.includes(types[1])) {
        img.src =
          "https://image.shutterstock.com/image-vector/audio-file-line-icon-outline-260nw-472254040.jpg";
        audio.src = reader.result;
        value = reader.result;
        audio.classList.add("block");
      } else if (reader.result.includes(types[2])) {
        img.src =
          "https://png.pngtree.com/element_our/20190528/ourlarge/pngtree-video-icon-image_1128393.jpg";
        value = reader.result;
      } else {
        img.src =
          "https://previews.123rf.com/images/timhester/timhester1910/timhester191000082/135721172-document-or-file-icon-in-simple-vector.jpg";
        value = reader.result;
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
      url.textContent = data.secure_url || "try again !";
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

[...closeBtns].forEach((close) => {
  close.addEventListener("click", () => {
    notification.classList.remove("block");
    errorDiv.classList.remove("block");
  });
});
