/* component for to add or update a task */
import { useEffect, useState } from "react"
import {useNavigate, useParams } from 'react-router-dom'
import { createTask, getAccountIdByUsername, getTask, updateTask } from "../services/TaskService"

const TaskComponent = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState(0)
    const [terminationDate, setTerminationDate] = useState('')
    const [isDone, setIsDone] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false);

    /* id is extracted from URL */
    const {id} = useParams();

    const [errors, setErrors] = useState<Record<string, string>>({});

    const navigator = useNavigate();

    /* useEffect is executed, if the id in the URL changes, so only if a task should be updated */
    useEffect(() => {
        const fetchTaskData = async () => {
            if (id) {
                /* get current task */
                try {
                    const response = await getTask(id);
                    setName(response.data.name);
                    setDescription(response.data.description);
                    setPriority(response.data.priority);
                    setTerminationDate(response.data.terminationDate.split('T')[0]);
                    setIsDone(response.data.isDone);
                } catch (error) {
                    console.error(error);
                }
            }
        };
    
        fetchTaskData();
    }, [id]);

    const saveOrUpdateTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        if (validateForm()) {
          setIsSubmitting(true);
      
          try {
            const accountId = await getAccountIdByUsername();
      
            const task = {
              name,
              description,
              priority,
              terminationDate,
              isDone,
              account: `/accounts/${accountId}`
            };
      
            /* if the URL contains an id, a task should be updated, otherwise a new task should be created */
            if (id) {
              await updateTask(id, task);
            } else {
              await createTask(task);
            }
      
            navigator('/tasks');
          } catch (error) {
            console.error(error);
          } finally {
            setIsSubmitting(false);
          }
        }
    };
      
    function pageTitle() {
        if(id) {
            return <h2 className='text-center'>Edit task</h2>
        } else {
            return <h2 className='text-center'>Add task</h2>
        }
    }

    const buttonTitle = () => {
        return id ? 
            <button className='btn btn-primary' type="submit" disabled={isSubmitting}>Edit</button> :
            <button className='btn btn-success' type="submit" disabled={isSubmitting}>Add</button>;
    };

    function validateForm(): boolean {
        const newErrors: Record<string, string> = {};
      
        if (!name.trim()) newErrors.name = 'Required field';
        if (!description.trim()) newErrors.description = 'Required field';
        if (!terminationDate.trim()) newErrors.terminationDate = 'Required field';
      
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

  return (
    <div className='container'> 
        <br></br>
        <div className='row'>
            <div className='card col-md-5 offset-md-3 offset-md-3'>
                {
                    pageTitle()
                }
                <div className='card-body'>
                    <form onSubmit={saveOrUpdateTask}>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Name</label>
                            <input
                                type='text'
                                placeholder='Enter a name'
                                name='name'
                                value={name}
                                className={`form-control ${ errors.name ? 'is-invalid': ''}`}
                                onChange={(e) => setName(e.target.value)}
                            >
                            </input>
                            { errors.name && <div className='invalid-feedback'> { errors.name} </div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Description</label>
                            <input
                                type='text'
                                placeholder='Enter a description'
                                name='description'
                                value={description}
                                className={`form-control ${ errors.description ? 'is-invalid': ''}`}
                                onChange={(e) => setDescription(e.target.value)}
                            >
                            </input>
                            { errors.description && <div className='invalid-feedback'> { errors.description} </div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Priority</label>
                                <select
                                    name='priority'
                                    value={priority}
                                    className={'form-control'}
                                    onChange={(e) => setPriority(parseInt(e.target.value))}
                                >
                                    <option value={0}>Low</option>
                                    <option value={1}>Medium</option>
                                    <option value={2}>High</option>
                                </select>
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Termination date</label>
                            <input
                                type='date'
                                name='terminationDate'
                                value={terminationDate}
                                className={`form-control ${ errors.terminationDate ? 'is-invalid': ''}`}
                                onChange={(e) => setTerminationDate(e.target.value)}
                            >
                            </input>
                            { errors.terminationDate && <div className='invalid-feedback'> { errors.terminationDate} </div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Task done?</label>
                            <select
                                name='isDone'
                                value={isDone.toString()}
                                className='form-control'
                                onChange={(e) => setIsDone(e.target.value === 'true')}
                            >
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </div>
                            {
                                buttonTitle()
                            }
                    </form>
                </div>
            </div>
        </div>
         
    </div>
  )
}

export default TaskComponent