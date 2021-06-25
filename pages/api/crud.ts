/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextApiRequest, NextApiResponse } from 'next';

import Notes from 'models';

import dbConnect from 'utils/connectDb';

const withDelay = cb => setTimeout(() => cb(), 400);

export default async function handler(
  { method, query, body }: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const note = await Notes.findOne({ searchTitle: query.q.toString().toLowerCase() });
        const { searchTitle, searchDescription, ...data } = note.toObject();

        withDelay(() => res.status(200).json({ success: true, data }));
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const { data } = JSON.parse(body);

        const createdNote = await Notes.create({
          ...data,
          searchTitle: data.title.toLowerCase(),
          searchDescription: data.description.toLowerCase(),
        });
        const { searchTitle, searchDescription, ...notes } = createdNote.toObject();

        withDelay(() =>
          res.status(201).json({
            success: true,
            data: notes,
          }),
        );
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const { data } = JSON.parse(body);

        const updatedNotes = await Notes.findByIdAndUpdate(
          query.id,
          {
            ...data,
            searchTitle: data.title.toLowerCase(),
            searchDescription: data.description.toLowerCase(),
          },
          { new: true },
        );

        const { searchTitle, searchDescription, ...notes } = updatedNotes.toObject();

        withDelay(() => res.status(201).json({ success: true, data: notes }));
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case 'DELETE':
      try {
        await Notes.findByIdAndRemove(query.id);
        withDelay(() => res.status(202).json({ success: true }));
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      break;
  }
}
