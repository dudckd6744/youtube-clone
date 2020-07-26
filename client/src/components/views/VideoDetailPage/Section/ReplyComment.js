import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {

    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComment, setOpenReplyComment] = useState(false)

    useEffect(() => {
        
        var commentNumber = 0;

        props.commentList.map((comment)=>{
            if(comment.responseTo === props.parentCommentId)
                commentNumber ++
        })
        setChildCommentNumber(commentNumber)
    }, [props.commentList])

    const renderReplyComment = (parentCommentId) => 
        props.commentList.map((comment, index)=> (
            <React.Fragment>
            {   
                comment.responseTo === parentCommentId &&
                    <div style={{width:'80%', marginLeft:'40px'}}>
                        <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={props.videoId} />
                        <ReplyComment refreshFunction={props.refreshFunction} commentList={props.commentList} postId={props.videoId} parentCommentId={comment._id}/>
                    </div>
            }
            </React.Fragment>
        ))
        const onHadleChange =() => {
            setOpenReplyComment(!OpenReplyComment)
        }

    return (
        <div>
            {ChildCommentNumber > 0 &&
            <p style={{ fontSize: '14px', margin:0, color:'gray'}} onClick ={onHadleChange}>
                View {ChildCommentNumber} more comment(s)
            </p>
            }
            {OpenReplyComment &&
                renderReplyComment(props.parentCommentId)
            }

        </div>
    )
}

export default ReplyComment
