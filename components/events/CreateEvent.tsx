import { PlusIcon } from '@heroicons/react/outline';
import * as z from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../../utils/supabaseClient';

import { Button } from '@/components/ui/Elements';
import {
  Form,
  FormDrawer,
  InputField,
  TextAreaField
} from '@/components/ui/Form';

import { slugify } from '../../utils/slugify';

const schema = z.object({
  title: z.string().min(1, 'Required'),
  slug: z.string(),
  description: z.string(),
  length: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: 'Expected number, received a string'
  })
});

type EventValues = {
  title: string;
  slug: string;
  description: string;
  length: number;
};

export function CreateEvent(): JSX.Element {
  return (
    <FormDrawer
      isDone={false}
      triggerButton={
        <Button size="sm" startIcon={<PlusIcon className="h-4 w-4" />}>
          Create Event
        </Button>
      }
      title="Create Event"
      submitButton={
        <Button form="create-event" type="submit" size="sm" isLoading={false}>
          Submit
        </Button>
      }
    >
      <Form<EventValues, typeof schema>
        id="create-event"
        onSubmit={async (values) => {
          console.log('SUBMITTED VALUES', values);
          const res = await supabase
            .from('events')
            .insert({ id: uuidv4(), ...values });
          console.log('RSSULT >>>> ', res);
        }}
        schema={schema}
      >
        {({ register, formState, setValue }) => (
          <>
            <InputField
              label="Title"
              error={formState.errors['title']}
              registration={register('title', {
                onChange: (e) => setValue('slug', slugify(e.target.value))
              })}
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
            <InputField
              label="Length"
              type="number"
              error={formState.errors['length']}
              registration={register('length')}
            />
          </>
        )}
      </Form>
    </FormDrawer>
  );
}
