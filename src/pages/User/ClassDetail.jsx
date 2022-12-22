import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import MarkdownEditor from '@uiw/react-markdown-editor';

import Template, {
    TemplateTitle, TemplateLineAction, TemplateData,
    TemplateSearch, TemplateModal, TemplateModalTitle,
    TemplateModalBody, TemplateModalAction
} from '../../components/Template';
import onImagePasted from '../../utils/onImagePasted'
import { useFetchAllAssignedCourses } from '../../redux/course/hook';
import { useParams } from 'react-router-dom';
import { useFetchAllBlocks } from '../../redux/block/hook';
import { useRole } from '../../redux/user/hook';
import MyButton from '../../components/MyButton';


const ClassDetail = props => {
    useFetchAllAssignedCourses()

    const { courseId } = useParams("courseId")
    const Role = useRole()
    const Blocks = useFetchAllBlocks(courseId)

    const [value, setValue] = useState("")
    const [valueImage, setValueImage] = useState("")


    const onChange = (e) => {
        console.log(value);
        setValue(e)
    }

    const Drop = (e) => {
        e.preventDefault();

        var imageUrl = e.dataTransfer.getData('text/html');

        if (imageUrl) {
            let src = new DOMParser().parseFromString(imageUrl, "text/html")
                .querySelector('img').src;
            if (src)
                onImagePasted(src, setValue)
        }
        else {
            var file = e.dataTransfer.files

            if (FileReader && file) {
                var fr = new FileReader();
                fr.onload = function () {
                    onImagePasted(fr.result, setValue)

                }
                fr.readAsDataURL(file[0]);
            }
        }
    }
    const DragOver = (e) => {
        e.preventDefault();
    }
    const DragLeave = (e) => {
        e.preventDefault();
    }
    const DragEnter = (e) => {
        e.preventDefault();
    }
    const Paste = (e) => {
        e.preventDefault();
        var file = e.clipboardData.files

        if (FileReader && file) {
            var fr = new FileReader();
            fr.onload = function () {
                onImagePasted(fr.result, setValue)
            }
            fr.readAsDataURL(file[0]);
        }
    }

    return (
        <Template>
            <div className="classdetail-title">
                <div className='classdetail-title-txt'>
                    {
                        props.title ? props.title : "Introduction to OOADD"
                    }
                </div>
                <MyButton size="lg" >Save</MyButton>
            </div>

            <div className=" classdetail-md">
                <MarkdownEditor
                    draggable={true}
                    id="textareamd"
                    value={value}
                    visible
                    height='480px'
                    onChange={onChange}

                    // onPaste={async (event) => {
                    //     await onImagePasted(event.clipboardData, setValue);
                    // }}
                    // onDrag={async (event) => {
                    //     await onImagePasted(event.dataTransfer, setValue);
                    // }}
                    onPaste={Paste}
                    onDrop={Drop}
                    onDragEnter={DragEnter}
                    onDragOver={DragOver}
                    onDragLeave={DragLeave}
                />
            </div>

        </Template>

    )
}

ClassDetail.propTypes = {
    title: PropTypes.string
}

export default ClassDetail