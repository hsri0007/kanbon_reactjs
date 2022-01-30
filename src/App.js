import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import SelectInput from "@mui/material/Select/SelectInput";
import { useCallback, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import BasicCard from "./Card";

function App() {
  const [input, setInput] = useState("");
  const [state, setState] = useState([
    {
      id: 1,
      name: "hello",
      completed: true,
    },
    {
      id: 2,
      name: "harry",
      completed: false,
    },
    {
      id: 3,
      name: "pavan",
      completed: true,
    },
    {
      id: 4,
      name: "hayo",
      completed: false,
    },
  ]);

  const notcompletedstate = state.filter((res) => res.completed === false);
  const completedstate = state.filter((res) => res.completed === true);

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = () => {
    const obj = {
      name: input,
      id: state.length + 2,
      completed: false,
    };
    setState([...state, obj]);
  };

  return (
    <DragDropContext
      onDragEnd={(res) => {
        let source;
        let destination;
        console.log(res);
        if (res.source.droppableId === "completedtask") {
          source = completedstate[res.source.index];
        }
        if (res.source.droppableId === "notcompletedtask") {
          source = notcompletedstate[res.source.index];
        }
        if (res.destination.droppableId === "completedtask") {
          destination = {
            destination: res.destination.index,
            location: "completedtask",
          };
          // completedstate[res.source.index]
        }
        if (res.destination.droppableId === "notcompletedtask") {
          destination = {
            destination: res.destination.index,
            location: "notcompletedtask",
          };
          // completedstate[res.source.index]
        }

        console.log({ source, destination });

        if (JSON.stringify(destination).length > 0) {
          console.log("there");
        }
        if (true) {
          if (destination.location === "notcompletedtask") {
            console.log("yes");
            setState((prev) =>
              prev.map((re) =>
                re.id === source.id ? { ...re, completed: false } : re
              )
            );
          }
          if (destination.location === "completedtask") {
            console.log("yes");
            setState((prev) =>
              prev.map((re) =>
                re.id === source.id ? { ...re, completed: true } : re
              )
            );
          }
        }
      }}
    >
      <Container>
        <Typography variant="h2">Jira Task Manager</Typography>
        <Grid>
          <TextField size="small" onChange={handleChange} />
          <Button variant="outlined" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
        <Grid container sx={{ paddingTop: "50px" }} spacing={1}>
          <Grid item xs={6}>
            <Typography variant="h5">Need to be completed</Typography>
            <Droppable droppableId="notcompletedtask">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <BasicCard
                    details={notcompletedstate}
                    base={provided.placeholder}
                  />
                </div>
              )}
            </Droppable>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5">completed</Typography>
            <Droppable droppableId="completedtask">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <BasicCard
                    details={completedstate}
                    base={provided.placeholder}
                  />
                </div>
              )}
            </Droppable>
          </Grid>
        </Grid>
      </Container>
    </DragDropContext>
  );
}

export default App;
