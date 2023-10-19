import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useOnClickOutside } from "usehooks-ts";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import ClearIcon from "@mui/icons-material/Clear";
import StraightIcon from "@mui/icons-material/Straight";
import SouthIcon from "@mui/icons-material/South";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

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
  width: 70%;
  height: 100%;
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

const SortSection = styled.div`
  width: 86%;
  display: flex;
  justify-content: end;
  margin-top: 3px;
`;

const TodoListGet = async () => {
  const res = axios.get("http://localhost:3000/todo");
  return res;
};

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [isEdit, setIsEdit] = useState("");
  const [updateVal, setUpdateVal] = useState(null);
  const [dateSort, setDateSort] = useState(null);
  const [prioritySort, setPrioritySort] = useState(null);
  const ref = useRef(null);
  const { data, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: TodoListGet,
  });
  const addHandler = async () => {
    try {
      await axios.post("http://localhost:3000/todo", { text: inputVal });
      setInputVal("");
      refetch();
    } catch (e) {}
  };

  const deleteHandler = async (id) => {
    await axios.delete(`http://localhost:3000/todo/${id}`);
    refetch();
  };

  const updateHandler = async (id) => {
    try {
      await axios.put(`http://localhost:3000/todo/${id}`, { text: updateVal });
      refetch();
    } catch (e) {
      //
    }
  };

  const sortHandler = async ({ field, sort }) => {
    try {
      const res = await axios.post("http://localhost:3000/sort", {
        field,
        sort,
      });
      res?.data?.data && setTodoList(res?.data?.data);
    } catch (e) {}
  };

  const handleClickOutside = () => {
    setIsEdit("");
    setUpdateVal(null);
  };

  useOnClickOutside(ref, handleClickOutside);

  useEffect(() => {
    data?.data && setTodoList(data?.data?.data);
    setIsEdit("");
    setUpdateVal(null);
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
            sx={{ height: "40px", width: "25%" }}
            onChange={(e) => {
              setInputVal(e.target.value);
            }}
          />
          <Select
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{ height: "40px", margin: "0px 6px", width: "15%" }}
          >
            <MenuItem value={0}>
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>
              <FiberManualRecordIcon sx={{ color: "green",height: "15px" }}/>
               Low
            </MenuItem>
            <MenuItem value={2}>
              <FiberManualRecordIcon sx={{ color: "orange", height: "15px" }} />
              Medium
            </MenuItem>
            <MenuItem value={3}>
              <FiberManualRecordIcon sx={{ color: "red", height: "15px" }} />
              High
            </MenuItem>
          </Select>
          <OutlinedInput
            type="date"
            value={inputVal}
            id="outlined-adornment-weight"
            aria-describedby="outlined-weight-helper-text"
            sx={{ height: "40px", width: "20%", marginRight: "6px" }}
          />
          <Button
            variant="contained"
            size="small"
            sx={{ textTransform: "none" }}
            onClick={addHandler}
          >
            add
          </Button>
        </AddSection>
        <SortSection>
          <div>
            <Button
              sx={{
                textTransform: "none",
                borderRadius: "30px",
                height: "30px",
              }}
              onClick={() => {
                const sort = !dateSort
                  ? "asc"
                  : dateSort === "asc"
                  ? "desc"
                  : "asc";
                setDateSort(sort);
                sortHandler({ field: "created_date", sort });
              }}
              endIcon={
                !dateSort || dateSort === "asc" ? (
                  <StraightIcon />
                ) : (
                  <SouthIcon />
                )
              }
            >
              Date
            </Button>
            <Button
              sx={{
                textTransform: "none",
                borderRadius: "30px",
                height: "30px",
              }}
              onClick={() => {
                const sort = !prioritySort
                  ? "asc"
                  : prioritySort === "asc"
                  ? "desc"
                  : "asc";
                setPrioritySort(sort);
                // sortHandler({ field: "priority", sort });
              }}
              endIcon={
                !prioritySort || prioritySort === "asc" ? (
                  <StraightIcon />
                ) : (
                  <SouthIcon />
                )
              }
            >
              Priority
            </Button>
          </div>
        </SortSection>
        <ListSection>
          <List>
            {todoList.map((todo) => {
              return isEdit === todo.id ? (
                <Option key={todo.id} ref={ref}>
                  <OutlinedInput
                    value={updateVal}
                    id="outlined-adornment-weight"
                    aria-describedby="outlined-weight-helper-text"
                    sx={{
                      height: "30px",
                      width: "80%",
                      backgroundColor: "#ffff",
                    }}
                    onChange={(e) => setUpdateVal(e.target.value)}
                    defaultValue={todo.text}
                  />
                  <div>
                    <SaveAsIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => updateHandler(todo.id)}
                    />
                    <ClearIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        setIsEdit("");
                        setUpdateVal(null);
                      }}
                    />
                  </div>
                </Option>
              ) : (
                <Option key={todo.id}>
                  <Typography sx={{ ml: "8px" }}>{todo.text}</Typography>
                  <div>
                    <EditIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => setIsEdit(todo.id)}
                    />
                    <DeleteIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => deleteHandler(todo.id)}
                    />
                  </div>
                </Option>
              );
            })}
          </List>
        </ListSection>
      </Box>
    </Box>
  );
};

export default TodoList;
