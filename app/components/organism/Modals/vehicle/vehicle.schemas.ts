import { z } from "zod";

export const tVehicleSchema = z.object({
    station_id: z.string().uuid().optional(),
    color: z.string().optional(),
    seats: z.number().optional(),
    plate: z.string().optional(),
    transmission: z.string().optional(), 
    year: z.number().optional(),
    make: z.string().optional(),
    model: z.string().optional(),
    hourly_rate: z.number().optional(),
    // tracking_device_id: z.string().optional(),
    status: z.enum(["ACTIVE", "INACTIVE", "BLOCKED"]).optional(),
    pictures: z.array(z.string()).optional(),
})


export type vehicle_data = z.infer<typeof tVehicleSchema>

export type vehicle_form_errors = z.inferFlattenedErrors<typeof tVehicleSchema>