import React from 'react'
import PropTypes from 'prop-types'
import MarkdownEditor from '@uiw/react-markdown-editor';
import Template, {
    TemplateTitle, TemplateLineAction, TemplateData,
    TemplateSearch, TemplateModal, TemplateModalTitle,
    TemplateModalBody, TemplateModalAction
} from '../../components/Template';
const ClassDetail = props => {
    return (
        <Template>

            <div className="classdetail-title">
                {
                    props.title ? props.title : "Introduction to OOADD"
                }
            </div>

            <TemplateData>
                <div className=" classdetail-md">
                    <MarkdownEditor
                        value='Hello Word!'
                        visible
                        height='480px'
                    />
                </div>

            </TemplateData>
        </Template>

    )
}

ClassDetail.propTypes = {
    title: PropTypes.string
}

export default ClassDetail