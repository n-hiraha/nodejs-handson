const baseUrl = "http://localhost:3000";
const list = document.querySelector(".todos");
const addTodo = document.querySelector(".add");
const editTodo = document.querySelector(".edit");

console.log(editTodo, "todo");

// 追加
addTodo.addEventListener("submit", async (e) => {
  e.preventDefault();
  const values = {
    name: addTodo.name.value.trim(),
    description: addTodo.description.value.trim(),
  };
  const data = await CreateTodo(values);

  if (!data.status) {
    return console.error(`CreateTodo Error`);
  }

  // ok
  return console.log("ok");
});

// 編集
editTodo.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(editTodo.id.value.trim(), "id");

  const values = {
    id: editTodo.id.value.trim(),
    name: editTodo.name.value.trim(),
    description: addTodo.description.value.trim(),
  };

  const data = await EditTodo(values);
  console.log(data, "__data");

  if (!data.status) {
    return console.error(`CreateTodo Error`);
  }

  // ok
  return console.log("ok");
});

const CreateTodo = async (values) => {
  console.log(values, "__values");
  const res = await axios.post(`${baseUrl}/todo/add`, values);
  return await res.data;
};

const GetTodo = async () => {
  try {
    const res = await axios.get(baseUrl);
    const data = await res.data;
    let temp = "";
    data.todo.forEach((todo) => {
      const html = `
            <li>
                <h3>${todo.name}</h3>
                <span>${todo.description}</span>

                <input type='button' value=${todo.id} onClick="DeleteTodo(event)">削除</input>
            </li>
            `;
      temp += html;
    });
    list.innerHTML = temp;
  } catch (err) {
    console.error(`[GetTodo Error]`, err);
  }
};

// 編集
const EditTodo = async (values) => {
  try {
    //  リクエスト
    const res = await axios.put(`${baseUrl}/todo`, values);
    return await res.data;

    //  ハンドリング
  } catch (err) {
    console.error(`[DeleteTodo Error]`, err);
  }
};

// 削除
const DeleteTodo = async (event) => {
  const todoId = event.target.value;

  try {
    //  リクエスト
    const res = await axios.delete(`${baseUrl}/todo?id=${todoId}`);
    console.log(res);

    //  ハンドリング
  } catch (err) {
    console.error(`[DeleteTodo Error]`, err);
  }
};

const main = () => {
  GetTodo();
};

main();
