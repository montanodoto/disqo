import { useCallback, useState } from 'react';

import { VscSearch } from 'react-icons/vsc';

import NoteBuilder from 'components/NoteBuilder';
import Container from 'components/container';
import Skeleton from 'components/Skeleton';
import Button from 'components/Button';
import Chart from 'components/Chart';
import Input from 'components/Input';
import Note from 'components/Note';

import useDebounce from 'hooks/useDebounce';

import { StyledCRUDContainer, StyledNotesContainer, StyledChartContainer } from './styled';

import type { CRUDProps } from './types';

const SkeletonProps = `
width: 400px;
border-radius: 20px;
height: 115px;
margin-top: 1rem;
margin-left: 2rem;
padding: 1rem 2rem;
`;

function Crud({ initialNotes }: CRUDProps) {
  const [{ searchQuery, noteTitle, noteDescription, notes, loading, searchedNote }, setState] =
    useState({
      searchQuery: '',
      noteTitle: '',
      noteDescription: '',
      notes: initialNotes,
      loading: false,
      searchedNote: null,
    });

  const handleSearch = useCallback(async query => {
    const { success, data } = await (await fetch(`/api/crud?q=${query}`, { method: 'GET' })).json();

    if (success) {
      setState(prev => ({ ...prev, searchedNote: data, loading: false }));
    } else {
      setState(prev => ({ ...prev, searchedNote: null, loading: false }));
    }
  }, []);

  const debounced = useDebounce(handleSearch, 300);

  const handleChange = useCallback(
    ({ target: { name, value } }, type) => {
      setState(prevState => ({
        ...prevState,
        [name]: value,
        loading: type === 'CREATE' ? loading : true,
      }));

      if (name === 'searchQuery') {
        debounced(value);
      }
    },
    [debounced, loading],
  );

  const handleSubmit = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true }));
    const moment = (await import('moment')).default;

    const { data } = await (
      await fetch('/api/crud', {
        method: 'POST',
        body: JSON.stringify({
          data: { title: noteTitle, description: noteDescription },
        }),
      })
    ).json();

    setState(prev => ({
      ...prev,
      noteTitle: '',
      noteDescription: '',
      notes: [
        ...prev.notes,
        { ...data, createdAt: moment(data.createdAt).format('HH mm ss').replace(/\ /g, ':') },
      ],
      loading: false,
    }));
  }, [noteDescription, noteTitle]);

  const handleToggle = useCallback(
    (id, type) => {
      setState(prev => ({
        ...prev,
        notes:
          type === 'SEARCH_NOTE'
            ? prev.notes
            : notes.map(note => (note._id === id ? { ...note, editable: !note.editable } : note)),
        searchedNote:
          type === 'SEARCH_NOTE'
            ? { ...prev.searchedNote, editable: !prev.searchedNote.editable }
            : prev.searchedNote,
      }));
    },
    [notes],
  );

  const handleSave = useCallback(
    async (id, type) => {
      setState(prev => ({
        ...prev,
        loading: true,
        notes:
          type === 'SEARCH_NOTE'
            ? prev.notes
            : prev.notes.map(note => (note._id === id ? { ...note, editable: false } : note)),
        searchedNote:
          type === 'SEARCH_NOTE'
            ? { ...prev.searchedNote, editable: !prev.searchedNote.editable }
            : prev.searchedNote,
      }));

      const found =
        type === 'SEARCH_NOTE'
          ? { ...searchedNote, editable: false }
          : { ...notes.find(note => note._id === id), editable: false };

      await (
        await fetch(`/api/crud?id=${id}`, {
          method: 'PUT',
          body: JSON.stringify({
            data: found,
          }),
        })
      ).json();

      setState(prev => ({ ...prev, loading: false }));
    },
    [notes, searchedNote],
  );

  const handleEdit = useCallback(
    ({ id, key, value }, type) => {
      setState(prev => ({
        ...prev,
        notes:
          type === 'SEARCH_NOTE'
            ? notes
            : notes.map(note => (note._id === id ? { ...note, [key]: value } : note)),
        searchedNote:
          type === 'SEARCH_NOTE' ? { ...prev.searchedNote, [key]: value } : prev.searchedNote,
        loading: false,
      }));
    },
    [notes],
  );

  const handleDelete = useCallback(
    async (id, type) => {
      setState(prev => ({ ...prev, loading: true }));
      await fetch(`/api/crud?id=${id}`, { method: 'DELETE' });
      setState(prev => ({
        ...prev,
        loading: false,
        notes: notes.filter(note => note._id !== id),
        searchedNote: type === 'SEARCH_NOTE' ? null : searchedNote,
      }));
    },
    [notes, searchedNote],
  );

  return (
    <Container>
      <StyledCRUDContainer>
        <Input
          name="searchQuery"
          placeholder="Search Notes"
          id="search-input"
          value={searchQuery}
          onChange={e => handleChange(e, 'CREATE')}
          icon={<VscSearch />}
        />
        <NoteBuilder title="Create Note">
          <Input
            name="noteTitle"
            id="node-creator"
            label="Note Title"
            value={noteTitle}
            onChange={e => handleChange(e, 'CREATE')}
            margin="1rem 0"
            width="300px"
          />
          <Input
            name="noteDescription"
            id="node-description"
            value={noteDescription}
            type="textarea"
            label="Note"
            onChange={e => handleChange(e, 'CREATE')}
            margin="0 0 1rem 0"
            width="100%"
          />
          <Button disabled={!noteTitle || !noteDescription} text="Create" onClick={handleSubmit} />
        </NoteBuilder>
      </StyledCRUDContainer>
      <StyledNotesContainer>
        {searchedNote && (
          <Note
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
            title={searchedNote.title}
            description={searchedNote.description}
            id={searchedNote._id}
            editable={searchedNote.editable}
            handleSave={handleSave}
            type="SEARCH_NOTE"
          />
        )}
        {!searchedNote &&
          notes.map(({ title, description, _id: id, editable }) =>
            loading ? (
              <Skeleton key={id} styles={SkeletonProps} />
            ) : (
              <Note
                key={id}
                onToggle={handleToggle}
                onEdit={handleEdit}
                onDelete={handleDelete}
                title={title}
                description={description}
                id={id}
                editable={editable}
                handleSave={handleSave}
              />
            ),
          )}
      </StyledNotesContainer>
      <StyledChartContainer>
        <Chart data={notes} />
      </StyledChartContainer>
    </Container>
  );
}

export default Crud;
