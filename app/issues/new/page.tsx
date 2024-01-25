import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const {register, control, handleSubmit} = useForm<IssueForm>();

  return (
    <div className='max-w-xl space-y-3'>
    <form 
      className='max-w-xl space-y-3' 
      onSubmit={handleSubmit(async (data) => {
        await axios.post('/api/issues', data);
        router.push('/issues');
      })}>
      <TextField.Root>
        <TextField.Input placeholder='Title' />
        <TextField.Input placeholder='Title' {...register('title')} />
      </TextField.Root>
      <SimpleMDE placeholder='Description' />
      <Controller
        name="description"
        control={control}
        render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
       />
      <Button>Submit New Issue</Button>
    </form>
    </div>
  )
}