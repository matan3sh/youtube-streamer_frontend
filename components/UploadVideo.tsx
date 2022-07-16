import { useState } from "react";
import { Button, Group, Modal, Text } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { ArrowBigUpLine } from "tabler-icons-react";

function UploadVideo() {
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <>
      <Modal
        opened={opened}
        closeOnClickOutside={false}
        onClose={() => setOpened(false)}
        title="Upload Video"
        size={"xl"}>
        <Dropzone
          onDrop={(files) => {}}
          accept={[MIME_TYPES.mp4]}
          multiple={false}>
          {(status) => (
            <Group>
              <ArrowBigUpLine />
              <Text>Drag video here or click to find</Text>
            </Group>
          )}
        </Dropzone>
      </Modal>

      <Button onClick={() => setOpened(true)}>Upload Video</Button>
    </>
  );
}

export default UploadVideo;
