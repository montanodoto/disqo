export type NoteProps = {
  title: string;
  description: string;
  id: string;
  onEdit: (props: { id: string; key: string; value: string }, type: string) => void;
  onDelete: (id: string, type: string) => void;
  editable: boolean;
  onToggle: (id: string, type?: string) => void;
  handleSave: (id: string, type?: string) => void;
  type?: string;
};
