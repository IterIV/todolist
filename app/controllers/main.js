import taskServices from "../services/ToDoServices.js";
// import TaskServices from "../services/ToDoServices.js";
// const taskServices = new TaskServices(".........");
// !Create
// function getELE(name) {
//   return document.querySelector(name);
// }
// const getELE = (name) => {
//   return document.querySelector(name);
// };
const getELE = (name) => document.querySelector(name);
const addNewTask = (data) => {
  // Check data

  //   const data = {
  //     name: name,
  //     desc: desc,
  //     time: time,
  //     tags: tags,
  //   };
  // API POST
  //   const promises = taskServices.addTask(data);
  //   promises.then((response) => {
  //     console.log(response.data);
  //   });
  //   promises.catch((error) => console.log(error));
  taskServices
    .addTask(data)
    .then((response) => {
      console.log(response.data);
      //   Set loading to false
      loading(false);
      //   Reset
      resetData();
      //   Hide modal
      showModal("modal__add");
    })
    .catch((error) => {
      loading(false);
      console.log(error);
    });
};
const resetData = () => {
  getELE("#name").value = "";
  getELE("#desc").value = "";
  getELE("#time").value = "";
  getELE("#tags").value = "";
};
const loading = (status) => {
  getELE("#name").disabled = status;
  getELE("#desc").disabled = status;
  getELE("#time").disabled = status;
  getELE("#tags").disabled = status;
  getELE("#btnAdd").disabled = status;
};
getELE("#btnAdd").addEventListener("click", () => {
  const name = getELE("#name").value;
  const desc = getELE("#desc").value;
  const time = getELE("#time").value;
  const tags = getELE("#tags").value;
  const data = { name, desc, time, tags };
  loading(true);
  addNewTask(data);
});

// ! Read
// Render All Task to UI
const renderTask = (task) => {
  window.showInfo = showInfo;
  return `
    <div class="content__item" onclick="showInfo('${task.id}')">
        <div class="item__left">
            <span class="material-symbols-outlined">task_alt</span>
        </div>
        <div class="item__right">
            <div class="item__name">${task.name}</div>
            <div class="item__time">
                <span class="material-symbols-outlined">event</span>
                <p>${task.time}</p>
            </div>
        </div>
    </div>
  `;
};
const renderAllTask = () => {
  taskServices
    .getAllTasks()
    .then((response) => {
      const data = response.data;
      const newArr = data.map((task) => renderTask(task));
      getELE(".content__list").innerHTML = newArr.join("\n");
    })
    .catch((error) => {
      console.log(error);
    });
};
renderAllTask();

// Get Information 1 task
const renderModal = (task) => {
  const listTag = task.tags.split(",");
  const listSpan = listTag.map(
    (item) => `<span class="list__tag__item">${item}</span>`
  );
  console.log("list span", listSpan);
  return ` <div class="modal__top">
    <div class="modal__top__left">
      <span class="material-symbols-outlined">task_alt</span>
    </div>
    <div class="modal__top__right">
      <p class="task__name">${task.name}</p>
      <p class="task__desc">${task.desc}</p>
      <div class="list__tag">
        ${listSpan.join("\n")}
      </div>
      <div class="task__time">
        <span class="material-symbols-outlined">event</span>
        <p>${task.time}</p>
      </div>
    </div>
  </div>`;
};
const showInfo = (id) => {
  taskServices
    .getTaskById(id)
    .then((response) => {
      const data = response.data;
      console.log(data);
      const modal = renderModal(data);
      getELE(".modal.modal__detail .modal__content").innerHTML = modal;
      showModal("modal__detail");
    })
    .catch((error) => {
      console.log(error);
    });
};

// EDIT
// Buoc 1: getTaskById -> data
// Buoc 2: render data -> modal (functiopn Showinfo => thay v?? g???n gi?? tr??? cho c??c tag p v?? span th?? s??? g???n gi?? tr??? cho input)
// Buoc 3: ng?????i d??ng s??? ch???nh s???a d??? li???u
// B?????c 4: Th???c hi???n l??u d??? li???u => updateTask(id, data) data => l???y input.
// B?????c 5: chuy???n ????? loading -> true
// B?????c 6: th??nh c??ng -> loading false ???n modal || kh??ng th??nh c??ng loading - false v?? ti???p t???c ch???nh s???a ko ???n modal
// B?????c 7: load l???i danh s??ch c??ng vi???c => renderAllTask() => l???y l???i to??n b??? d??? li???u m???i

// Delte
// Giao di???n ch??? c?? 1 modal confirm
// B?????c 1: confirm h???i ng?????i d??ng c?? mu???n x??a hay kh??ng => hi???n th??? modal confirm v?? truy???n id v??o button ok c???a modal confirm ????? th???c thi l???nh deleteTask(id)
// B?????c 2: chueyern ch??? ????? loading -> disbaled 2 button c???a confirm
// B?????c 3: kh??ng th??nh c??ng -> hi???n th??? l???i, ???n modal confirm
//   Th??nh c??ng -> aarn modal confirm
// B?????c 4: load l???i danh s??ch > renderAllTask() => l???y l???i to??n b??? d??? li???u m???i
