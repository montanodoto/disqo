/* eslint-disable @typescript-eslint/no-unused-vars */
import moment from 'moment';

import Crud from 'templates/crud';

import Notes from 'models';

import connectMongo from 'utils/connectDb';

export async function getServerSideProps() {
  await connectMongo();
  const notes = await Notes.find();

  const initialNotes = notes.map(doc => {
    const note = doc.toObject();
    note._id = note._id.toString();
    note.createdAt = new Date(doc.createdAt).getTime(); // moment(doc.createdAt).format('HH mm ss').replace(/\ /g, ':');
    note.updatedAt = null;
    note.editable = false;
    const { searchTitle, searchDescription, ...rest } = note;
    return rest;
  });

  return {
    props: {
      initialNotes,
    },
  };
}

function Page(props) {
  return <Crud {...props} />;
}

export default Page;
