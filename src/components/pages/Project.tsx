import { create } from 'domain';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import { useGlobalState } from '../../App';
import { ProjectEntity, TaskEntity } from '../../service/types/entities/entities';

interface Props {
    newProjectName: string;
    project: ProjectEntity;
    tasks: TaskEntity[];

    setNewProjectName: (e: string) => void;
    createProject: () => void;
}

function Presenter(props: Props) {
    const { newProjectName, project, tasks, setNewProjectName, createProject } = props;
    const history = useHistory()

    return (
        <div>
            ProjectName:<br />
            <input type="text" value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} /><br />
            <button type="button" onClick={createProject}>add</button><br />

            <p>{project.name}</p>
            {
                tasks.map((v, k) => {
                    return (
                        <li key={k} >{v.title}</li>
                    )
                })
            }

        </div >
    )
}

export default function Project() {
    const history = useHistory();
    const [client] = useGlobalState("client");
    const [token, setToken] = useGlobalState("token");
    const [project, setProject] = useState({} as ProjectEntity);
    const [tasks, setTasks] = useState([] as TaskEntity[]);
    const [newProjectName, setNewProjectName] = useState("");
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (token === "") {
            history.replace("/");
            return;
        }
        syncProjects()
    }, [token])

    const syncProjects = async () => {
        try {
            const res = await client.projectFindWithTasks(id);
            setProject({
                ...res.project as ProjectEntity,
            });
            setTasks([
                ...res.tasks as TaskEntity[],
            ]);
        } catch (e) {
            alert(e);
        }
    }

    const createProject = () => {
        (async () => {
            try {
                const res = await client.projectCreate({
                    name: newProjectName,
                })
                syncProjects();
            } catch (e) {
                alert(e);
            }
        })()
    }

    return <Presenter
        newProjectName={newProjectName}
        project={project}
        tasks={tasks}
        setNewProjectName={setNewProjectName}
        createProject={createProject}
    />
}