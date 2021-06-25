import StyledNoteBuilder from './styled';

import type { NoteBuilderProps } from './types';

function NoteBuilder({ title = 'Create Note', children }: NoteBuilderProps) {
  return (
    <StyledNoteBuilder>
      <h3>{title}</h3>
      {children}
    </StyledNoteBuilder>
  );
}

export default NoteBuilder;
