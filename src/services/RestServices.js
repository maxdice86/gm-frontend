import axios from "axios";

const RECORDS_API_BASE_URL = "http://localhost:8080/api/v2/records";

export async function getRecords() {
  return await axios.get(RECORDS_API_BASE_URL);
}
export async function getGroupedRecords() {
  return await axios.get(RECORDS_API_BASE_URL + "/views");
}

export async function getClientReord(path) {
  return await axios.get(RECORDS_API_BASE_URL + "/" + path);
}

export async function createClientReord(record) {
  return await axios.post(RECORDS_API_BASE_URL + "/create", record);
}

export async function deleteRecords(projects) {
  return await axios.delete(RECORDS_API_BASE_URL + "/delete", {
    data: projects,
  });
}
