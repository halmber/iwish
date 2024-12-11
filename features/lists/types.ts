import { Wish } from "../wishes/types";

export type List = {
  id: string;
  name: string;
  type: string;
  description: string;
  createdAt: string;
  visibility: "private" | "public";

  items: Wish[];
};
