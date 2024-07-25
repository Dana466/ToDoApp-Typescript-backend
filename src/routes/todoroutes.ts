import { Router } from "express";
import { getToDo,saveToDo, deleteToDo, updateToDo } from "../controllers/todocontrollers";
import auth from "../authenticationMiddlware/auth";
import { RequestWithUserId } from "../authenticationMiddlware/auth";
const router:Router =Router()

//router.get('/', getToDo)
router.get('/',auth,async(req,res) =>{

    try {
        await getToDo(req as RequestWithUserId, res);
      } catch (error) {
        res.status(500).json({ error: 'Error getting todos from the database' });
      }

})


router.post('/createtask',auth, async(req,res) =>{

    try {
        await saveToDo(req as RequestWithUserId, res);
      } catch (error) {
        res.status(400).json({ error: 'Error creating todo' });
      }
})
//router.post('/createtask',saveToDo)
router.delete('/deletetask/:id',deleteToDo)
router.put('/updatetask/:id',updateToDo)
export default router;
