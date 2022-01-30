import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Draggable } from "react-beautiful-dnd";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function BasicCard({ details, base }) {
  return (
    <Card sx={{ minWidth: 275, bgcolor: "#c9c9c9" }} elevation={0}>
      <CardContent>
        {details?.map(({ id, name, completed }, i) => (
          <Draggable draggableId={`${id}`} index={i} key={id}>
            {(provided) => (
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              >
                <Card sx={{ mb: 1 }}>
                  <CardContent>
                    {name}
                    {id}
                    {JSON.stringify(completed)}
                  </CardContent>
                </Card>
              </div>
            )}
          </Draggable>
        ))}
        {base}
      </CardContent>
    </Card>
  );
}
