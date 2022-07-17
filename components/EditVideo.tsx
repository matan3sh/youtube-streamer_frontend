import { Button, Stack, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { AxiosError, AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";
import { useMutation } from "react-query";
import { updateVideo } from "../api";
import { Video } from "../types";

type input = Parameters<typeof updateVideo>["0"];

function EditVideo({
  videoId,
  setOpened,
}: {
  videoId: string;
  setOpened: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      published: true,
    },
  });

  const mutation = useMutation<AxiosResponse<Video>, AxiosError, input>(
    updateVideo,
    {
      onSuccess: () => {
        setOpened(false);
      },
    }
  );

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        mutation.mutate({ videoId, ...values })
      )}>
      <Stack>
        <TextInput
          label="Title"
          required
          placeholder="My awesome video"
          {...form.getInputProps("title")}
        />

        <TextInput
          label="Description"
          required
          {...form.getInputProps("description")}
        />

        <Switch label="Published" {...form.getInputProps("published")} />
        <Button type="submit">Save</Button>
      </Stack>
    </form>
  );
}

export default EditVideo;
