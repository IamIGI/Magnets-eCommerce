import ToDoModel from '../models/ToDoNode';

const updateIndexesWhenNewItem = async () => {
  await ToDoModel.updateMany(
    {},
    {
      $inc: {
        index: 1,
      },
    }
  );
};

export default { updateIndexesWhenNewItem };
