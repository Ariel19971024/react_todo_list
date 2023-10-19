import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import styled from "@emotion/styled";

const Header = styled.div`
  width: 100%;
  height: 15%;
  text-align: center;
  line-height: 150px;
  font-family: monospace;
  font-size: 50px;
  font-weight: 600;
  background-image: linear-gradient(to left, #1530c3, #cfd5fe);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
`;
const AddSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;
const ListSection = styled.div`
  width: 100%;
  height: 65%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const List = styled.div`
  width: 60%;
  height: 88%;
  overflow-y: scroll;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const Option = styled.div`
  width: 99%;
  margin: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 45px;
  background: #eceff0;
  &:hover {
    opacity: 0.7;
  }
`;

const TodoListGet = async () => {
  const res = axios.get("http://localhost:3000/todo");
  return res;
};

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const { data } = useQuery({
    queryKey: ["todos"],
    queryFn: TodoListGet,
  });
  const addHandler = async () => {
    try {
      await axios.post("http://localhost:3000/todo", { text: inputVal });
      setInputVal("");
      const res = await axios.get("http://localhost:3000/todo");
      setTodoList(res.data);
    } catch (e) {}
  };

  const deleteHandler = async (id) => {
    console.log(id)
  };

  useEffect(() => {
    data && setTodoList(data?.data);
  }, [data]);

  return (
    <Box
      sx={{
        bgcolor: "#cfe8fc",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "#ffff",
          height: "70%",
          width: "50%",
          borderRadius: "15px",
          boxShadow:
            "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;",
        }}
      >
        <Header>TODO LIST</Header>
        <AddSection>
          <OutlinedInput
            value={inputVal}
            id="outlined-adornment-weight"
            aria-describedby="outlined-weight-helper-text"
            sx={{ height: "48px", width: "60%" }}
            endAdornment={
              <Button
                variant="contained"
                size="small"
                sx={{ textTransform: "none" }}
                onClick={addHandler}
              >
                add
              </Button>
            }
            onChange={(e) => {
              setInputVal(e.target.value);
            }}
          />
        </AddSection>
        <ListSection>
          <List>
            {todoList.map((todo) => (
              <Option key={todo.id}>
                <Typography sx={{ ml: "8px" }}>{todo.text}</Typography>
                <div>
                  <EditIcon sx={{ cursor: "pointer" }} />
                  <DeleteIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => deleteHandler(todo.id)}
                  />
                </div>
              </Option>
            ))}
          </List>
        </ListSection>
      </Box>
    </Box>
  );
};

export default TodoList;
