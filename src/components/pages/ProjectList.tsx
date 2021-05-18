import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useGlobalState } from '../../App';
import { ProjectEntity } from '../../service/types/entities/entities';

interface Props {
    newProjectName: string;
    projects: ProjectEntity[];

    setNewProjectName: (e: string) => void;
    createProject: () => void;
}

function Presenter(props: Props) {
    const { newProjectName, projects, setNewProjectName, createProject } = props;
    const history = useHistory()

    return (
        <div>
            ProjectName:<br />
            <input type="text" value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} /><br />
            <button type="button" onClick={createProject}>add</button><br />

            {
                projects.map((v, k) => {
                    return (
                        <li key={k} onClick={() => {
                            history.push("/projects/" + v._id!)
                        }}>{v.name}</li>
                    )
                })
            }

        </div >
    )
}

export default function ProjectList() {
    const history = useHistory();
    const [client] = useGlobalState("client");
    const [token] = useGlobalState("token");
    const [projects, setProjects] = useState([] as ProjectEntity[]);
    const [newProjectName, setNewProjectName] = useState("");

    useEffect(() => {
        if (token === "") {
            history.replace("/");
            return;
        }
        syncProjects()
    }, [token])

    const syncProjects = async () => {
        try {
            const res = await client.projectFindAll();
            setProjects(res.projects as ProjectEntity[]);
        } catch (e) {
            alert(e);
        }
    }

    const createProject = () => {
        (async () => {
            try {
                await client.projectCreate({
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
        projects={projects}
        setNewProjectName={setNewProjectName}
        createProject={createProject}
    />
}