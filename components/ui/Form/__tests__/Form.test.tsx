/**
 * @jest-environment jsdom
 */

import * as z from 'zod';

import { Button } from '../../Elements/Button';
import {
  rtlRender,
  screen,
  waitFor,
  userEvent
} from '../../../../utils/test-utils';

import { Form } from '../Form';
import { InputField } from '../InputField';
import { TextAreaField } from '../TextAreaField';

const testData = {
  title: "60 minute interview",
  slug: "60-minute-interview",
  description: "Interview with Joe Doe",
};

const schema = z.object({
  title: z.string().min(1, 'Required'),
  slug: z.string(),
  description: z.string(),
});

test('should render and submit a create form component', async () => {
  const handleSubmit = jest.fn();

  rtlRender(
    <Form<typeof testData, typeof schema>
      onSubmit={handleSubmit}
      schema={schema}
      id="my-form"
    >
      {({ register, formState }) => (
        <>
          <InputField
            label="Title"
            error={formState.errors['title']}
            registration={register('title')}
          />
          <InputField
            label="Slug"
            error={formState.errors['slug']}
            registration={register('slug')}
          />
          <TextAreaField
            label="Description"
            error={formState.errors['description']}
            registration={register('description')}
          />

          <Button name="submit" type="submit" className="w-full">
            Submit
          </Button>
        </>
      )}
    </Form>
  );

  userEvent.type(screen.getByLabelText(/title/i), testData.title);
  userEvent.type(screen.getByLabelText(/slug/i), testData.slug);
  userEvent.type(screen.getByLabelText(/description/i), testData.description);

  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() =>
    expect(handleSubmit).toHaveBeenCalledWith(testData, expect.anything())
  );
});

test('should fail submission if validation fails', async () => {
  const handleSubmit = jest.fn();

  rtlRender(
    <Form<typeof testData, typeof schema>
      onSubmit={handleSubmit}
      schema={schema}
      id="my-form"
    >
      {({ register, formState }) => (
        <>
          <InputField
            label="Title"
            error={formState.errors['title']}
            registration={register('title')}
          />

          <Button name="submit" type="submit" className="w-full">
            Submit
          </Button>
        </>
      )}
    </Form>
  );

  userEvent.click(screen.getByRole('button', { name: /submit/i }));

  await screen.findByRole(/alert/i, { name: /required/i });

  expect(handleSubmit).toHaveBeenCalledTimes(0);
});
