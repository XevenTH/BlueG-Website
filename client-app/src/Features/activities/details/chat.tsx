import { formatDistance } from 'date-fns/esm';
import { Field, FieldProps, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Comment, Header, Loader, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import { UseStore } from '../../../App/Containers/storeContainer';
import { Activity } from '../../../App/Models/Activity';

interface Props {
    activityId: string;
    activity: Activity;
}

export default observer(function ActivityDetailedChat({ activityId, activity }: Props) {
    const { commentStore } = UseStore();

    useEffect(() => {
        if (activityId) {
            commentStore.MakeConnection(activityId);
        }

        return () => {
            commentStore.clearComment();
        }
    }, [commentStore, activityId])


    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{ border: 'none' }}
            >
                <Header>Chat about this event</Header>
            </Segment>
            <Segment attached clearing>
                <Comment.Group>
                    {commentStore.comments.map(comment => (
                        <Comment key={comment.id}>
                            <Comment.Avatar src={comment.image || '/assets/user.png'} />
                            <Comment.Content>
                                <Comment.Author as={Link} to={`/profile/${comment.id}`} content={comment.displayName} />
                                <Comment.Metadata>
                                    <div>
                                        {formatDistance(
                                            new Date(comment.createdAt),
                                            new Date()
                                        )}
                                    </div>
                                </Comment.Metadata>
                                <Comment.Text style={{ whiteSpace: 'pre-wrap' }}>{comment.body}</Comment.Text>
                            </Comment.Content>
                        </Comment>
                    ))}
                </Comment.Group>
                {activity.isJoined &&
                    <Formik onSubmit={(value, { resetForm }) => commentStore.SendComment(value).then(() => resetForm())}
                        initialValues={{ body: '' }}
                        validationSchema={Yup.object({
                            body: Yup.string().required()
                        })}>
                        {({ isSubmitting, isValid, handleSubmit }) => (
                            <Form className='ui form'>
                                <Field name='body'>
                                    {(props: FieldProps) => (
                                        <div style={{ position: 'relative' }}>
                                            <Loader active={isSubmitting} />
                                            <textarea
                                                placeholder='Enter To Submit'
                                                rows={3}
                                                {...props.field}
                                                onKeyPress={e => {
                                                    if (e.key === 'Enter' && e.shiftKey) return;

                                                    if (e.key === 'Enter' && !e.shiftKey) {
                                                        e.preventDefault();
                                                        isValid && handleSubmit();
                                                    }
                                                }}
                                            />
                                        </div>
                                    )}
                                </Field>
                            </Form>
                        )}
                    </Formik>
                }
            </Segment>
        </>

    )
})