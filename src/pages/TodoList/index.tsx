import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Global, css } from "@emotion/react";
import { useQuery } from "react-query";
import { useOnClickOutside } from "usehooks-ts";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditIcon from "@mui/icons-material/AutoFixHighOutlined";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import ClearIcon from "@mui/icons-material/Clear";
import StraightIcon from "@mui/icons-material/Straight";
import SouthIcon from "@mui/icons-material/South";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {
  Container,
  Card,
  Header,
  AddSection,
  ListSection,
  List,
  Option,
  SortSection,
  FlexSection,
  StatusSection,
} from "./style.ts";

const TodoListGet = async () => {
  const res = axios.get("http://localhost:3000/todo");
  return res;
};

const PriorityColor = {
  0: "#7a7474",
  1: "#3fbe40",
  2: "#ffa500",
  3: "#de1c1c",
};

const PriorityOptions = [
  { label: "None", value: 0 },
  { label: "Low", value: 1 },
  { label: "Medium", value: 2 },
  { label: "High", value: 3 },
];

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [isEdit, setIsEdit] = useState("");
  const [updateVal, setUpdateVal] = useState(null);
  const [dateSort, setDateSort] = useState(null);
  const [priority, setPriority] = useState(0);
  const [prioritySort, setPrioritySort] = useState(null);
  const [date, setDate] = useState<string | null>("");
  const ref = useRef(null);
  const { data, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: TodoListGet,
  });

  const clearData = () => {
    setInputVal("");
    setPriority(0);
    setDate("");
  };
  const addHandler = async () => {
    try {
      await axios.post("http://localhost:3000/todo", {
        text: inputVal,
        created_date: date,
        priority: priority,
      });
      clearData();
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
    <Container>
      <Global
        styles={css`
          body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          div {
            box-sizing: border-box;
          }
        `}
      />
      <Card>
        <Header>TODO LIST</Header>
        <AddSection>
          <OutlinedInput
            value={inputVal}
            id="outlined-adornment-weight"
            className="add-section_input"
            aria-describedby="outlined-weight-helper-text"
            placeholder="add task..."
            onChange={(e) => {
              setInputVal(e.target.value);
            }}
          />
          <Select
            className="add-section_select"
            displayEmpty
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
            inputProps={{ "aria-label": "Without label" }}
          >
            {PriorityOptions.map(({ label, value }) => (
              <MenuItem value={value}>
                <FiberManualRecordIcon
                  sx={{ color: `${PriorityColor[value]}`, height: "15px" }}
                />
                {label}
              </MenuItem>
            ))}
          </Select>
          <OutlinedInput
            className="add-section_date"
            type="date"
            value={date}
            onChange={(e) => setDate(String(e.target.value))}
            id="outlined-adornment-weight"
            aria-describedby="outlined-weight-helper-text"
          />
          <Button
            className="add-section_button"
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
                sortHandler({ field: "priority", sort });
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
        {/* TODO: Can be split out */}
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
                  <FlexSection>
                    <StatusSection>
                      <FiberManualRecordIcon
                        sx={{
                          color: `${PriorityColor[todo.priority]}`,
                          height: "15px",
                        }}
                      />
                    </StatusSection>
                    <Typography sx={{ ml: "8px" }}>{todo.text}</Typography>
                  </FlexSection>
                  <FlexSection>
                    {todo?.created_date && (
                      <Typography
                        variant="body1"
                        component="div"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "15px",
                          marginRight: "10px",
                          color: "#726a6a",
                        }}
                      >
                        {todo?.created_date?.split("T")[0]}
                      </Typography>
                    )}
                    <EditIcon
                      sx={{ cursor: "pointer", color: "#3fbe40" }}
                      onClick={() => setIsEdit(todo.id)}
                    />
                    <DeleteIcon
                      sx={{ cursor: "pointer", color: "#de1c1c" }}
                      onClick={() => deleteHandler(todo.id)}
                    />
                  </FlexSection>
                </Option>
              );
            })}
          </List>
        </ListSection>
      </Card>
    </Container>
  );
};

export default TodoList;
