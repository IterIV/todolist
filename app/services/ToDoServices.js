class TaskServices {
  constructor(_baseURL) {
    this.baseUrl = _baseURL;
  }

  // CRUD
  // Create - Read - Update - Delete
  // Create : Tao moi - POST
  addTask(data) {
    return axios({
      method: "post",
      url: this.baseUrl,
      data,
    });
  }
  // Read : Đọc
  // Lay tat ca
  getAllTasks() {
    return axios({
      method: "get",
      url: this.baseUrl,
    });
  }
  // Lay 1 du lieu
  getTaskById(id) {
    return axios({
      method: "get",
      url: this.baseUrl + `/${id}`,
    });
  }
  //Update - Cập nhật - PUT
  updateTask(id, data) {
    return axios({
      method: "post",
      url: this.baseUrl + `/${id}`,
      data,
    });
  }
  // Delete - Xoa - DELETE
  deleteTask(id) {
    return axios({
      method: "delete",
      url: this.baseUrl + `/${id}`,
    });
  }
}
// export default TaskServices;
const taskServices = new TaskServices(
  "https://6135781a60d2900017c3bf96.mockapi.io/tasks"
);
export default taskServices;
