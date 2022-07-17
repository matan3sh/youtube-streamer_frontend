import { useState } from "react";
import { Button, Group, Modal, Text, Progress } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { ArrowBigUpLine } from "tabler-icons-react";
import { useMutation } from "react-query";
import { uploadVideo } from "../api";
import EditVideo from "./EditVideo";

function UploadVideo() {
  const [opened, setOpened] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);

  const mutation = useMutation(uploadVideo);

  const config = {
    onUploadProgress: (progressEvent: any) => {
      const percent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setProgress(percent);
    },
  };

  const upload = (files: File[]) => {
    const formData = new FormData();
    formData.append("vide", files[0]);
    mutation.mutate({ formData, config });
  };

  return (
    <>
      <Modal
        opened={opened}
        closeOnClickOutside={false}
        onClose={() => setOpened(false)}
        title="Upload Video"
        size={"xl"}>
        {progress === 0 && (
          <Dropzone
            onDrop={(files) => upload(files)}
            accept={[MIME_TYPES.mp4]}
            multiple={false}>
            {(status) => (
              <Group
                position="center"
                spacing="xl"
                style={{
                  minHeight: "50vh",
                  justifyContent: "center",
                }}
                direction="column">
                <ArrowBigUpLine />
                <Text>Drag video here or click to find</Text>
              </Group>
            )}
          </Dropzone>
        )}

        {progress > 0 && (
          <Progress size="xl" label={`${progress}%`} value={progress} mb="xl" />
        )}

        {mutation.data && (
          <EditVideo setOpened={setOpened} videoId={mutation.data.videoId} />
        )}
      </Modal>

      <Button onClick={() => setOpened(true)}>Upload Video</Button>
    </>
  );
}

export default UploadVideo;
