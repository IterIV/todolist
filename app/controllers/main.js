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
// Buoc 2: render data -> modal (functiopn Showinfo => thay vì gắn giá trị cho các tag p và span thì sẽ gắn giá trị cho input)
// Buoc 3: người dùng sẽ chỉnh sửa dữ liệu
// Bước 4: Thực hiện lưu dữ liệu => updateTask(id, data) data => lấy input.
// Bước 5: chuyển độ loading -> true
// Bước 6: thành công -> loading false ẩn modal || không thành công loading - false và tiếp tục chỉnh sửa ko ẩn modal
// Bước 7: load lại danh sách công việc => renderAllTask() => lấy lại toàn bọ dữ liệu mới

// Delte
// Giao diện chỉ có 1 modal confirm
// Bước 1: confirm hỏi người dùng có muốn xóa hay không => hiển thị modal confirm và truyền id vào button ok của modal confirm để thực thi lệnh deleteTask(id)
// Bước 2: chueyern chế độ loading -> disbaled 2 button của confirm
// Bước 3: không thành công -> hiển thị lỗi, ẩn modal confirm
//   Thành công -> aarn modal confirm
// Bước 4: load lại danh sách > renderAllTask() => lấy lại toàn bọ dữ liệu mới
