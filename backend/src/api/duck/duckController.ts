import { AppError, asyncErrorCatcher } from "../../services/errorService";
import duckService from "./duckService";
import { v4 as uuid } from "uuid";

export const getDucks = asyncErrorCatcher(async (req, res, next) => {
  const data = await duckService.query();

  res.status(200).json({
    status: "success",
    requestedAt: new Date().toISOString(),
    results: data.length,
    data,
  });
});

export const addDuck = asyncErrorCatcher(async (req, res, next) => {
  const newDuck = req.body;

  if (!newDuck.name) throw new AppError("Name is required", 400);
  if (!newDuck.coords || !newDuck.coords.lat || !newDuck.coords.lng)
    throw new AppError("Coords are required", 400);

  newDuck.id = uuid();
  const data = await duckService.create(newDuck);

  res.status(200).json({
    status: "success",
    requestedAt: new Date().toISOString(),
    data,
  });
});
