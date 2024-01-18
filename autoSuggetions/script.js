// Mock Server
const FAILURE_COUNT = 10;
const LATENCY = 200;

function getRandomBool(n) {
  const threshold = 1000;
  if (n > threshold) n = threshold;
  return Math.floor(Math.random() * threshold) % n === 0;
}

function getSuggestions(text) {
  var pre = "pre";
  var post = "post";
  var results = [];
  if (getRandomBool(2)) {
    results.push(pre + text);
  }
  if (getRandomBool(2)) {
    results.push(text);
  }
  if (getRandomBool(2)) {
    results.push(text + post);
  }
  if (getRandomBool(2)) {
    results.push(pre + text + post);
  }
  return new Promise((resolve, reject) => {
    const randomTimeout = Math.random() * LATENCY;
    setTimeout(() => {
      if (getRandomBool(FAILURE_COUNT)) {
        reject();
      } else {
        resolve(results);
      }
    }, randomTimeout);
  });
}

// ======================================>

// Actual Code

(function () {
  const input = document.getElementById("search");
  const suggetionArea = document.getElementById("suggetion-area");

  const processeData = async (value) => {
    suggetionArea.innerHTML = "";
    if (!value) return;

    try {
      const res = await getSuggestions(value);
      if (res.length > 0) {
        const list = document.createElement("ul");
        res.forEach((e) => {
          const listItem = document.createElement("li");
          listItem.style.listStyle = "none";
          listItem.style.cursor = "pointer";
          listItem.innerText = e;
          list.appendChild(listItem);

          // Add hover effect using CSS
          listItem.addEventListener("mouseenter", () => {
            listItem.style.backgroundColor = "#fff";
            listItem.style.padding = "6px";
            listItem.style.borderRadius = "5px";
          });

          listItem.addEventListener("mouseleave", () => {
            listItem.style.backgroundColor = "";
            listItem.style.padding = "6px";
          });
        });

        suggetionArea.innerHTML = "";
        suggetionArea.appendChild(list);
      }
    } catch (error) {
      console.log("Errorrrrrrrr" + error);
    }
  };

  const onFocus = () => {
    suggetionArea.style.display = "block";
  };
  const onBlur = (e) => {
    if (e.target === input || e.target === suggetionArea) return;
    suggetionArea.style.display = "none";
  };
  const onChange = (e) => {
    const { value } = e.target;
    processeData(value);
  };
  const onClick = (e) => {
    if (e.target === suggetionArea) return;
    const text = e.target.innerText;
    input.value = text;
    input.focus();
  };

  input.addEventListener("focus", onFocus);
  window.addEventListener("click", onBlur);
  input.addEventListener("keyup", onChange);
  suggetionArea.addEventListener("click", onClick);
})();
