import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteTask, getAccountIdByUsername, listTasks, updateTask } from '../services/TaskService';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Task } from '../types';

const ListTaskComponent = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [sortDoneCriteria, setDoneSortCriteria] = useState<'id' | 'name' | 'terminationDate' | 'priority'>('id');
    const [sortOpenCriteria, setOpenSortCriteria] = useState<'id' | 'name' | 'terminationDate' | 'priority'>('id');

    const navigator = useNavigate();

    /* tasks are loaded */
    useEffect(() => {
        getAllTasks();
    }, []);

    async function getAllTasks() {
        try {
            const accountId = await getAccountIdByUsername();
            if (!accountId) {
              throw new Error("Account ID is null");
            }
            const response = await listTasks(accountId);
            const tasksData = response.data;
            console.log("Tasks fetched:", tasksData);
    
            const cleanedTasks = tasksData;

            setTasks(cleanedTasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }
    
    function addNewTask() {
        navigator('/add-task')
    }

    function editTask(taskId: string) {
        navigator(`/update-task/${taskId}`)
    }

    function removeTask(taskId: string) {
        deleteTask(taskId).then(() => {
            getAllTasks();
        }).catch(error => {
            console.error(error);
        })
    }

    function setTaskToDone(task: Task, taskId: string) {
        task.isDone = true;
        updateTask(taskId, task).then(() => {
            getAllTasks();
        }).catch(error => {
            console.error(error);
        })
    }

    /* function to sort tasks based on selected criterion */
    const sortTasks = (tasks: Task[], criterion: 'id' | 'name' | 'terminationDate' | 'priority') => {
        /* copy the tasks array to avoid mutation */
        const sortedTasks = [...tasks]; 
        
        switch (criterion) {
            case 'id':
                sortedTasks.sort((a, b) => parseInt(a.id!) - parseInt(b.id!));
                break;
            case 'name':
                sortedTasks.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'terminationDate':
                sortedTasks.sort((a, b) => new Date(a.terminationDate).getTime() - new Date(b.terminationDate).getTime());
                break;
            case 'priority':
                sortedTasks.sort((a, b) => a.priority - b.priority);
                break;
            default:
                break;
        }
        return sortedTasks;
    };
            
    /* handle the change in sorting criterion for done tasks */
    const handleDoneSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDoneSortCriteria(event.target.value as 'id' | 'name' | 'terminationDate' | 'priority');
    };

    /* handle the change in sorting criterion for not done tasks */
    const handleOpenSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setOpenSortCriteria(event.target.value as 'id' | 'name' | 'terminationDate' | 'priority');
    };
            
    /* render sorted tasks */
    const sortedDoneTasks = sortTasks(tasks, sortDoneCriteria).filter(task => task.isDone);
    const sortedOpenTasks = sortTasks(tasks, sortOpenCriteria).filter(task => !task.isDone);

    return (
        <div className="container">
            <h2>Tasks</h2>
            <br></br>   
            {/* Open Tasks Table */}
            {sortedOpenTasks.length > 0 && (
                <div>
                    <h4>Open tasks</h4>
                    {/* dropdown for selecting sorting criteria */}
                    <div>
                        <label htmlFor="sortCriteria">Sort: </label>
                        &nbsp;
                        <select id="sortCriteria" value={sortOpenCriteria} onChange={handleOpenSortChange}>
                            <option value="id">Id</option>
                            <option value="name">Name</option>
                            <option value="terminationDate">Termination date</option>
                            <option value="priority">Priority</option>
                        </select>
                    </div>

                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Priority</th>
                                <th>Termination date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                
                                sortedOpenTasks.map(task =>
                                    <tr key={task.id}>
                                        <td>{task.id}</td>
                                        <td>{task.name}</td>
                                        <td>{task.description}</td>
                                        <td>{task.priority}</td>
                                        <td>{task.terminationDate}</td>
                                        <td>
                                            {/* checkbox for marking as done */}
                                            <button
                                                onClick={() => setTaskToDone(task, task.id!)}
                                                className="btn btn-success btn-sm"
                                            >
                                                <i className={'fas fa-check-square'}></i> Done
                                            </button>
                                            
                                            {/* button for updating */}
                                            <button
                                                onClick={() => editTask(task.id!)}
                                                className="btn btn-primary btn-sm"
                                                style={{ marginLeft: '10px' }}
                                            >
                                                <i className="fas fa-edit"></i> Edit
                                            </button>

                                            {/* button for deleting */}
                                            <button
                                                onClick={() => removeTask(task.id!)}
                                                className="btn btn-danger btn-sm"
                                                style={{ marginLeft: '10px' }}
                                            >
                                                <i className="fas fa-trash"></i> Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            )}
            {/* Done Tasks Table */}
            {sortedDoneTasks.length > 0 && (
                <div>
                    <h4>Done Tasks</h4>
                    {/* dropdown for selecting sorting criteria */}
                    <div>
                        <label htmlFor="sortCriteria">Sort: </label>
                        &nbsp;
                        <select id="sortCriteria" value={sortDoneCriteria} onChange={handleDoneSortChange}>
                            <option value="id">Id</option>
                            <option value="name">Name</option>
                            <option value="terminationDate">Termination date</option>
                            <option value="priority">Priority</option>
                        </select>
                    </div>

                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Priority</th>
                                <th>Termination date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                sortedDoneTasks.map(task =>
                                    <tr key={task.id}>
                                        <td>{task.id}</td>
                                        <td>{task.name}</td>
                                        <td>{task.description}</td>
                                        <td>{task.priority}</td>
                                        <td>{task.terminationDate}</td>
                                        <td>
                                            {/* button for updating */}
                                            <button
                                                onClick={() => editTask(task.id!)}
                                                className="btn btn-primary btn-sm"
                                            >
                                                <i className="fas fa-edit"></i> Edit
                                            </button>

                                            {/* button for deleting */}
                                            <button
                                                onClick={() => removeTask(task.id!)}
                                                className="btn btn-danger btn-sm"
                                                style={{ marginLeft: '10px' }}
                                            >
                                                <i className="fas fa-trash"></i> Delete
                                            </button>
                                        </td>
                                    </tr>)
                            }
                        </tbody>
                    </table> 
                </div>
            )}
            <button onClick={addNewTask} className="btn btn-success">
                <i className="fas fa-plus"></i> Add {/* plus icon for Add */}
            </button>
        </div>
    )}

export default ListTaskComponent