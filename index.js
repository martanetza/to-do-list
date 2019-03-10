function remove(id) {
  fetch("https://cartoon-0a3f.restdb.io/rest/to-do-list/" + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c7cee44cac6621685acbae4	",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(data => console.log(data));
}

function get() {
  fetch("https://cartoon-0a3f.restdb.io/rest/to-do-list", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c7cee44cac6621685acbae4	",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(data => data.forEach(showData));
  // remove("5c7cec4c307bb3000000f47e");
}
get();
function showData(e) {
  console.log("test");
  const template = document.querySelector("template").content;

  let copy = template.cloneNode(true);
  copy.querySelector(".line").dataset.id = e._id;
  copy.querySelector(".task").textContent = e.task;
  copy.querySelector(".dueDate").textContent = e.date;
  copy.querySelector(".assignee").textContent = e.assignee;
  copy.querySelector(".notes").textContent = e.notes;
  copy.querySelector("button").addEventListener("click", () => {
    event.target.parentElement.parentElement.remove();
    remove(e._id);
    // console.log(event.target.parentElement.parentElement);
  });

  document.querySelector("tbody").appendChild(copy);
  // remove();
}

const form = document.querySelector("form");
console.log(form.elements.movie);

document
  .querySelector("input[type=submit]")
  .addEventListener("click", event => {
    event.preventDefault();
    const data = {
      task: form.elements.task.value,
      date: form.elements.date.value,
      assignee: form.elements.assignee.value,
      notes: form.elements.notes.value
    };

    console.log(data);
    if (form.elements.assignee.checkValidity()) {
      document
        .querySelector(".assignee_span")
        .classList.remove("assignee_comment");
    } else {
      document
        .querySelector(".assignee_span")
        .classList.add("assignee_comment");
    }
    if (form.checkValidity()) {
      document.querySelectorAll("input, textarea").forEach(e => {
        e.value = "";
      });
      post(data);
    } else {
      alert("Please fill out all required fields ");
    }
  });
// console.log(postData);
function post(data) {
  const postData = JSON.stringify(data);

  fetch("https://cartoon-0a3f.restdb.io/rest/to-do-list", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c7cee44cac6621685acbae4",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())
    .then(data => showData(data));
  //   get();
}
