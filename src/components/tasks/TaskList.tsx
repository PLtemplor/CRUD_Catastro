import { Card } from "semantic-ui-react";
import { Task } from "src/interfaces/task";
import { useRouter } from 'next/router';

interface Props{
    tasks: Task[];
}

function TaskList({ tasks }: Props) {
    const router = useRouter();

    return(
    <Card.Group>
        {tasks.map((task) =>(
            <Card key={task.id} onClick={() => router.push(`/tasks/edit/${task.id}`)}>
                <Card.Content>
                    <Card.Content>{task.numeroPredial}</Card.Content>
                    <Card.Header>{task.avaluo}</Card.Header>
                    <Card.Content>{task.nombre}</Card.Content>
                    <Card.Content>{task.departamento}</Card.Content>
                    <Card.Content>{task.munucipio}</Card.Content>
                    {task.created_on &&(
                        <Card.Meta>{new Date(task.created_on).toLocaleDateString()}</Card.Meta>
                    )}
                </Card.Content>
            </Card>
        ))}
    </Card.Group>
    );
}

export default TaskList