/* eslint-disable no-console */
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import LoginPage from './LoginPage';

const StudentJoinShema = z.object({
  name: z.string().min(1, 'Name is required').max(15, 'Max length is 15'),
  code: z
    .string()
    .min(1, 'Code is required')
    .regex(/^[0-9]+$/, 'Code must contain only digits')
    .length(6, 'Code length must be 6'),
});

type LoginForm = z.infer<typeof StudentJoinShema>;

const StudentJoinPage: React.FC = () => {
  const defaultValues: LoginForm = {
    name: '',
    code: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(StudentJoinShema),
    defaultValues,
    mode: 'onBlur',
  });

  const onSubmit = handleSubmit((data) => {
    if (data.name && data.code) {
      console.log(data);
      // TODO: make it when add quiz logic
      /*
      const { name, code } = data;
      examSocket.createSocket({
            role: ExamRole.STUDENT,
            examCode: code,
            studentName: name,
          });
      navigate(Routes.WAITING_PAGE);
      */
    }
  });

  return (
    <LoginPage
      firstFieldProps={{
        label: 'Name',
        placeholder: 'Enter name',
        variant: 'outlined',
        fullWidth: true,
        required: true,
        ...register('name'),
        error: !!errors.name,
        helperText: errors.name?.message,
      }}
      secondFieldProps={{
        label: 'Code',
        placeholder: 'Enter code',
        variant: 'outlined',
        fullWidth: true,
        inputProps: {
          maxLength: 6,
        },
        required: true,
        ...register('code'),
        error: !!errors.code,
        helperText: errors.code?.message,
      }}
      submitButtonText="Join"
      onSubmit={onSubmit}
    />
  );
};

export default StudentJoinPage;
