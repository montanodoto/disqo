export type Note = {
  title: string;
  description: string;
  _id?: string;
  editable: boolean;
};

export type Notes = Note[];

export type CRUDProps = {
  initialNotes: Notes;
};
