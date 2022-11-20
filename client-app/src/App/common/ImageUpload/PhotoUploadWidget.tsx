import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, Grid, Header } from "semantic-ui-react";
import CropperWidget from "./CropperWidget";
import Dropzone from "./DropZone";

interface Props {
    uploading: boolean;
    PhotoUploadHandler: (file: Blob) => void;
}

export default observer(function PhotoUploadWidget({ PhotoUploadHandler, uploading }: Props) {
    const [Files, SetFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    function OnCrop() {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => PhotoUploadHandler(blob!))
        }
    }

    useEffect(() => {
        return () => {
            Files.forEach((file: any) => URL.revokeObjectURL(file.preview))
        }
    }, [Files])

    return (
        <Grid>
            <Grid.Column width={4}>
                <Header sub color="teal" content='Step 1 - Add Photo' />
                <Dropzone setFiles={SetFiles} />
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4}>
                <Header sub color="teal" content='Step 2 - Resize Photo' />
                {Files && Files.length > 0 &&
                    (<CropperWidget imagePreview={Files[0].preview} setCropper={setCropper} />)
                }
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4}>
                <Header sub color="teal" content='Step 1 - Preview & Upload' />
                {Files && Files.length > 0 &&
                    <>
                        <div className='img-preview' style={{ minHeight: 200, overflow: 'hidden' }} />
                        <Button.Group widths={2}>
                            <Button loading={uploading} onClick={OnCrop} positive icon='check' />
                            <Button disabled={uploading} onClick={() => SetFiles([])} icon='close' />
                        </Button.Group>
                    </>
                }
            </Grid.Column>
        </Grid>
    )
})