import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";
import { AppDispatch } from "../../types/app";
import { useDispatch } from "react-redux";
import { addDuck } from "../../store/slices/duckSlice";
import { setViewMode } from "../../store/slices/viewSlice";
import txt from "./txt.json";

type FormValues = {
  name: string;
  coords: {
    lat: number;
    lon: number;
  };
};

const AddDuckForm: FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = data => {
    dispatch(addDuck(data));
    dispatch(setViewMode("map"));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <TextField
        label="Name"
        variant="outlined"
        {...register("name", { required: txt.nameRequire })}
        error={!!errors.name}
        helperText={errors.name ? errors.name.message : ""}
        className="w-9/12"
      />
      <TextField
        label="Latitude"
        variant="outlined"
        type="number"
        inputProps={{ step: "any" }}
        {...register("coords.lat", {
          required: txt.LongitudeRequire,
          valueAsNumber: true,
        })}
        error={!!errors.coords?.lat}
        helperText={errors.coords?.lat ? errors.coords.lat.message : ""}
        className="w-9/12"
      />
      <TextField
        label="Longitude"
        variant="outlined"
        type="number"
        inputProps={{ step: "any" }}
        {...register("coords.lon", {
          required: txt.LongitudeRequire,
          valueAsNumber: true,
        })}
        error={!!errors.coords?.lon}
        helperText={errors.coords?.lon ? errors.coords.lon.message : ""}
        className="w-9/12"
      />
      <Button
        type="submit"
        style={{
          backgroundColor: "#fbbf24",
          color: "#451a03",
          fontWeight: "bold",
        }}
      >
        {txt.btnTitle}
      </Button>
    </Box>
  );
};

export default AddDuckForm;