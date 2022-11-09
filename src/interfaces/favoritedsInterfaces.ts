import { users } from "@prisma/client";

export interface IRequestFavoriteds extends Omit<users, "id" > {}
