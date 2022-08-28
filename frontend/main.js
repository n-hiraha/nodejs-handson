const baseUrl = "http://localhost:3000";
const list = document.querySelector(".todos");
const addTodo = document.querySelector(".add");

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

const CreateTodo = async (values) => {
  console.log(values, "values");
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
            </li>
            `;
      temp += html;
    });
    list.innerHTML = temp;
  } catch (err) {
    console.error(`[GetTodo Error]`, err);
  }
};

const main = () => {
  GetTodo();
};

main();
