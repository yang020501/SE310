import React from 'react'
import Template, {
  TemplateTitle, TemplateLineAction, TemplateDataGrid,
  TemplateSearch, TemplateModal, TemplateModalTitle,
  TemplateModalBody, TemplateModalAction
} from '../../components/Template';
import MyDataGrid from '../../components/MyDataGrid'
import SearchBar from '../../components/SearchBar';
import LineAction from '../../components/LineAction';

const Accounts = () => {
  return (
    <Template>
      <TemplateSearch>
        <SearchBar />
      </TemplateSearch>
      <TemplateLineAction>
        <LineAction
          name={"Change Lecturer"}

        />
      </TemplateLineAction>
      <TemplateDataGrid>
        <MyDataGrid />
      </TemplateDataGrid>
      <TemplateModal
        // open={open}
        size="lg"
        form={false}
      >
        <TemplateModalTitle>
          <SearchBar data={[]} />
        </TemplateModalTitle>
        <TemplateModalBody>
          <MyDataGrid />
        </TemplateModalBody>
        <TemplateModalAction
          size="lg"
        />
      </TemplateModal>
    </Template>
  )
}

export default Accounts