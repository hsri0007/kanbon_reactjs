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
      completed: true
    },
    {
      id: 2,
      name: "harry",
      completed: false
    },
    {
      id: 3,
      name: "pavan",
      completed: true
    },
    {
      id: 4,
      name: "hayo",
      completed: false
    }
  ]);
  const [state2, setState2] = useState([]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = () => {
    const obj = {
      name: input,
      id: state.length + 2,
      completed: false
    };
    setState([...state, obj]);
  };

  return (
    <DragDropContext
      onDragEnd={(res) => {
        const { source, destination } = res;

        if (!destination) return;
        if (
          destination.droppableId === source.droppableId &&
          destination.index === source.index
        )
          return;

        let add,
          active = state,
          completed = state2;

        if (source.droppableId === "stateList") {
          add = active[source.index];
          active.splice(source.index, 1);
        } else {
          add = completed[source.index];
          completed.splice(source.index, 1);
        }
        if (destination.droppableId === "stateList") {
          active.splice(destination.index, 0, add);
        } else {
          completed.splice(destination.index, 0, add);
        }
        setState(active);
        setState2(completed);
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
            <Droppable droppableId="stateList">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <BasicCard details={state} base={provided.placeholder} />
                </div>
              )}
            </Droppable>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5">completed</Typography>
            <Droppable droppableId="stateList2">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <BasicCard details={state2} base={provided.placeholder} />
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
