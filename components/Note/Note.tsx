import { VscEdit, VscTrash } from 'react-icons/vsc';

import Input from 'components/Input';
import Button from 'components/Button';

import StyledNote from './styled';

import type { NoteProps } from './types';

function Note({
  title,
  description,
  id,
  onDelete,
  onEdit,
  editable,
  onToggle,
  handleSave,
  type,
}: NoteProps) {
  const onChange = ({ target: { name: key, value } }) => onEdit({ id, key, value }, type);

  return (
    <StyledNote>
      <div>
        {editable ? <Input name="title" onChange={onChange} value={title} /> : <h3>{title}</h3>}
        <div>
          {!editable && (
            <>
              <VscEdit size="22" onClick={() => onToggle(id, type)} />
              <VscTrash size="22" onClick={() => onDelete(id, type)} />
            </>
          )}
        </div>
      </div>
      {editable ? (
        <Input
          width="350px"
          wrapperStyles=""
          name="description"
          type="textarea"
          onChange={onChange}
          value={description}
        />
      ) : (
        <p>{description}</p>
      )}
      {editable && <Button margin="1rem 0" onClick={() => handleSave(id, type)} text="Save" />}
    </StyledNote>
  );
}

export default Note;
