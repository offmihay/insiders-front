import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { Task } from "../api/tasks";

type Props = {
  data: Task;
  onEditClick: () => void;
  onDeleteClick: () => void;
};

const labels = {
  TO_DO: "To Do",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
  NONE: "None",
};

const TaskCard = (props: Props) => {
  const { data, onEditClick, onDeleteClick } = props;
  return (
    <Card sx={{ minWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {data.description}
          </Typography>
          <div className="label-status mt-2">
            <Typography variant="body2" sx={{ color: "white" }}>
              {labels[data.status]}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" onClick={onEditClick}>
          Edit
        </Button>
        <Button size="small" onClick={onDeleteClick}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default TaskCard;
