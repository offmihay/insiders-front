import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { Status, Task } from "../api/tasks";
import { OutlinedInput } from "@mui/material";

type FormData = {
  name: string;
  description: string;
  status: Status;
};

type FormProps = {
  onSave: (data: FormData) => void;
  data?: Task;
};

const ModalForm: React.FC<FormProps> = ({ onSave, data }) => {
  const [state, setState] = useState<Partial<FormData>>(
    data || {
      status: Status.NONE,
    }
  );

  const handleSave = () => {
    if (state && state.name && state.description && state.status) {
      onSave({
        name: state.name,
        description: state.description,
        status: state.status,
      });
    }
  };

  return (
    <div className="modal-container">
      <div className="modal flex flex-col gap-4">
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ color: "text.secondary" }}
        >
          Create
        </Typography>
        <div>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Name
          </Typography>
          <OutlinedInput
            value={state?.name}
            onChange={(e) =>
              setState((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Name"
            className="w-full h-10 mt-2"
          />
        </div>
        <div>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Description
          </Typography>
          <OutlinedInput
            value={state?.description}
            onChange={(e) =>
              setState((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Description"
            className="w-full h-10 mt-2"
          />
        </div>
        <div>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Status
          </Typography>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={state?.status}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                status: e.target.value as Status,
              }))
            }
            displayEmpty
            className="w-full h-10 mt-2"
          >
            <MenuItem value={Status.NONE}>
              <em>None</em>
            </MenuItem>
            <MenuItem value={Status.DONE}>Done</MenuItem>
            <MenuItem value={Status.IN_PROGRESS}>In progress</MenuItem>
            <MenuItem value={Status.TO_DO}>To do</MenuItem>
          </Select>
        </div>
        <div className="flex-1 flex items-end">
          <Button
            variant="contained"
            onClick={handleSave}
            className="w-full"
            disabled={
              !state.name || !state.description || state.status === Status.NONE
            }
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
