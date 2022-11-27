import React from 'react'
import Template, {
  TemplateTitle, TemplateLineAction, TemplateData,
  TemplateSearch, TemplateModal, TemplateModalTitle,
  TemplateModalBody, TemplateModalAction
} from '../../components/Template';
import SearchBar from '../../components/SearchBar';
import LineAction from '../../components/LineAction';
import ClassBlock from '../../components/ClassBlock';
const Class = () => {
  const count = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
  return (
    <Template>
      <TemplateSearch>
        <SearchBar />
      </TemplateSearch>
      <TemplateTitle>SE100 - Object Oreienetdf sddasdasdadsadasdsad</TemplateTitle>
      <TemplateLineAction>
        <LineAction
          name={"New block"}
        // click={openModal}
        />
      </TemplateLineAction>
      <TemplateData>
        {
          count.map((item, index) => {
            return <ClassBlock  key={index} name={`Let ${index +1} - Hafasdkdsakjhdkasjhdhkjashdsjakd`}/>
          })
        }

      </TemplateData>
    </Template>
  )
}

export default Class