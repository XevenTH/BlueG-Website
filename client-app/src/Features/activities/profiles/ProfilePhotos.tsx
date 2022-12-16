import { observer } from "mobx-react-lite"
import { SyntheticEvent, useState } from "react"
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react"
import PhotoUploadWidget from "../../../App/common/ImageUpload/PhotoUploadWidget"
import { UseStore } from "../../../App/Containers/storeContainer"
import { Photo, Profile } from "../../../App/Models/profile"

interface Props {
    profile: Profile
}

export default observer(function ProfilePhotos({ profile }: Props) {
    const { ProfileStore: { isLoggedUser, UploadPhoto, uploading, SetMainPhoto, deletePhoto } } = UseStore();
    const [addImageButton, setImageButton] = useState(true);
    const [target, setTarget] = useState("");

    function PhotoUploadHandler(file: Blob) {
        UploadPhoto(file).then(() => setImageButton(!addImageButton));
    }

    function SetNamePhotoHandler(Photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        SetMainPhoto(Photo);
    }

    function SetDeletehandler(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        deletePhoto(photo);
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16} >
                    <Header icon='image' content='Photos' floated='left' />
                    {isLoggedUser &&
                        <Button onClick={() => setImageButton(!addImageButton)}
                            floated='right' labelPosition='right'
                            icon={addImageButton ? 'plus' : 'cancel'}
                            content={addImageButton ? 'Add' : 'Cancel'}
                            color={addImageButton ? 'green' : 'red'} />
                    }
                </Grid.Column>
                <Grid.Column width={16} >
                    {!addImageButton ?
                        (
                            <PhotoUploadWidget uploading={uploading} PhotoUploadHandler={PhotoUploadHandler} />
                        )
                        :
                        (
                            <>
                                <Card.Group itemsPerRow={5}>
                                    {profile.photos?.map(p =>
                                        <Card key={p.id}>
                                            <Image src={p.url} />
                                            {isLoggedUser &&
                                                <Button.Group widths={2} style={{marginTop: '10px'}}>
                                                    <Button
                                                        name={'Main' + p.id}
                                                        color='green'
                                                        content='Main'
                                                        loading={target === 'Main' + p.id && uploading}
                                                        disabled={p.isMain}
                                                        onClick={e => SetNamePhotoHandler(p, e) }
                                                    />
                                                    <Button.Or />
                                                    <Button 
                                                    name={p.id}
                                                    color='red' 
                                                    icon='trash'
                                                    loading={target === p.id && uploading}
                                                    disabled={p.isMain}
                                                    onClick={e => SetDeletehandler(p, e)}
                                                    />
                                                </Button.Group>
                                            }
                                        </Card>
                                    )}
                                </Card.Group>
                            </>
                        )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})