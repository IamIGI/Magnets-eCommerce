import express from 'express';
import toDoNodeController from '../../controllers/toDoNode.controller';

const router = express.Router();

router.route('/all').get(toDoNodeController.getList);
router.route('/add').post(toDoNodeController.addToDo);
router.route('/delete/:id').delete(toDoNodeController.deleteToDo);
router.route('/edit').patch(toDoNodeController.editToDo);
router.route('/isDoneEdit').patch(toDoNodeController.editIsDone);

export = router;
