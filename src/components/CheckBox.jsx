const CheckBox = ({ todo, setTodoList }) => {
  return (
    <>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => {
          fetch(`http://localhost:3000/todo/${todo.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: !todo.completed }),
          }).then(() => {
            setTodoList((prev) => prev.map((el) => (el.id === todo.id ? { ...el, completed: !el.completed } : el)))
          })
        }}
      />
    </>
  )
}

export default CheckBox
