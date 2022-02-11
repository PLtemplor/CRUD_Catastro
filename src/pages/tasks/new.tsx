import { Button, Card, Form, Grid, Icon, Confirm } from 'semantic-ui-react';
import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { Task } from 'src/interfaces/task';
import { useRouter } from "next/router";
import Layout from 'src/components/Layout';

export default function newPage() {

  const [task, setTask] = useState({
    numeroPredial: '',
    avaluo: '',
    nombre: '',
    departamento: '',
    munucipio: '',

  });
  const [openConfirm, setOpenConfirm] = useState(false)
  const router = useRouter();

  const handleChange = ({
    target: {name, value},
  }: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => setTask({...task, [name]: value});

  const createTask = async (task: Task) =>{
    await fetch('http://localhost:3000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
  }

  const loadTask = async (id: string) => {
   const res = await fetch('http://localhost:3000/api/tasks/' + id);
   const task = await res.json();
   setTask({numeroPredial: task.numeroPredial, avaluo: task.avaluo, nombre: task.nombre, departamento: task.departamento, munucipio: task.munucipio})
  }

  const updateTask =async (id:string, task: Task) => {
    await fetch("http://localhost:3000/api/tasks/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
  }

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault()

    try {
      if (typeof router.query.id === 'string') {
        updateTask(router.query.id, task)
      }else{
        await createTask(task)
      }
      router.push("/")
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (id:string) => {
    try {
      await fetch("http://localhost:3000/api/tasks/" + id,{
      method: "DELETE",
    });

    router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() =>{
    if (typeof router.query.id === 'string') {
      loadTask(router.query.id)
    }
  }, [router.query])

  return (
    <Layout>
      <Grid centered columns={3} verticalAlign="middle" style={{height: '70%'}}>
        <Grid.Column>
        <Card>
      <Card.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label htmlFor="numeroPredial">numeroPredial:</label>
            <input type="text" placeholder="Write your Num Predial" name="numeroPredial" onChange={handleChange} value={task.numeroPredial}/>
          </Form.Field>
          <Form.Field>
            <label htmlFor="avaluo">avaluo:</label>
            <input type="text" placeholder="Write appraise" name="avaluo" onChange={handleChange} value={task.avaluo}/>
          </Form.Field>
          <Form.Field>
            <label htmlFor="nombre">nombre:</label>
            <input type="text" placeholder="Write name" name="nombre" onChange={handleChange} value={task.nombre}/>
          </Form.Field>
          <Form.Field>
            <label htmlFor="departamento">departamento:</label>
            <input type="text" placeholder="Write department" name="departamento" onChange={handleChange} value={task.departamento}/>
          </Form.Field>
          <Form.Field>
            <label htmlFor="munucipio">munucipio:</label>
            <input type="text" placeholder="Write municipality" name="munucipio" onChange={handleChange} value={task.munucipio}/>
          </Form.Field>
          {
            router.query.id ? (
              <Button color='teal'>
                <Icon name="save" />
                Update
              </Button>
            ) : (
              <Button primary>
                <Icon name="save" />
                Save
              </Button>
            )
          }
        </Form>
      </Card.Content>
    </Card>

    {
      router.query.id  && (
        <Button color='red' onClick={() => setOpenConfirm(true)}>
          Delete
    </Button>
      )
    }

        </Grid.Column>
      </Grid>

      <Confirm
        header='Delete a task'
        content={`Are you sure you want to delete this task ${router.query.id}?`}
        open={openConfirm}
        onCancel={() => setOpenConfirm(false)}
        onConfirm={() => typeof router.query.id === 'string' && handleDelete(router.query.id)}
      />
    </Layout>
  )
}
